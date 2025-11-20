import { useEffect, useMemo, useState } from "react";
import {
  fetchBibleTriviaQuestions,
  TriviaLevel,
  TriviaQuestion,
  TriviaMode,
  getTriviaStats,
  recordTriviaResult,
  getTriviaLeaderboard,
  TriviaStats,
} from "@/services/triviaService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { FeatureBoundary } from "@/components/FeatureBoundary";

type GamePhase = "loading" | "question" | "results" | "idle";

type Tab = "classic" | "daily" | "survival" | "speed";

interface PowerUpState {
  secondChanceUsed: boolean;
  removeTwoUsed: boolean;
  revealedScripture: boolean;
}

const LEVELS: { key: TriviaLevel; label: string; titleOnPass: string }[] = [
  { key: "beginner", label: "Beginner", titleOnPass: "Bible Student" },
  { key: "intermediate", label: "Intermediate", titleOnPass: "Bible Scholar" },
  { key: "advanced", label: "Advanced", titleOnPass: "Bible Expert" },
];

interface BibleTriviaPageProps {
  onNavigate?: (page: string) => void;
  language?: string;
}

function BibleTriviaPage({ onNavigate, language = "en" }: BibleTriviaPageProps) {
  const [tab, setTab] = useState<Tab>("classic");

  // Game state
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [mode, setMode] = useState<TriviaMode>("classic");
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [phase, setPhase] = useState<GamePhase>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [hasCheckedAnswer, setHasCheckedAnswer] = useState(false);
  const [availableChoices, setAvailableChoices] = useState<number[]>([]);

  // Stats / leaderboard
  const [stats, setStats] = useState<TriviaStats | null>(null);
  const [leaderboard, setLeaderboard] = useState<TriviaStats[]>([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(true);

  // Power-ups
  const [powerUpsInGame, setPowerUpsInGame] = useState<PowerUpState>({
    secondChanceUsed: false,
    removeTwoUsed: false,
    revealedScripture: false,
  });

  const currentLevelConfig = LEVELS[currentLevelIndex];
  const currentQuestion = questions[currentQuestionIndex];

  // Load initial stats and leaderboard
  useEffect(() => {
    (async () => {
      try {
        setLoadingStats(true);
        const s = await getTriviaStats();
        setStats(s);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingStats(false);
      }
    })();

    (async () => {
      try {
        setLoadingLeaderboard(true);
        const lb = await getTriviaLeaderboard();
        setLeaderboard(lb);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingLeaderboard(false);
      }
    })();
  }, []);

  // When tab changes, reset and start appropriate mode
  useEffect(() => {
    if (tab === "classic") {
      setMode("classic");
      setCurrentLevelIndex(0);
      startGame("classic", "beginner");
    } else if (tab === "daily") {
      setMode("daily");
      startGame("daily", "intermediate");
    } else if (tab === "survival") {
      setMode("survival");
      setCurrentLevelIndex(2);
      startGame("survival", "advanced");
    } else if (tab === "speed") {
      setMode("speed");
      setCurrentLevelIndex(1);
      startGame("speed", "intermediate");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  async function startGame(gameMode: TriviaMode, level: TriviaLevel) {
    try {
      setPhase("loading");
      setErrorMessage(null);
      setQuestions([]);
      setCurrentQuestionIndex(0);
      setSelectedIndex(null);
      setCorrectCount(0);
      setLastAnswerCorrect(null);
      setHasCheckedAnswer(false);
      setAvailableChoices([]);

      setPowerUpsInGame({
        secondChanceUsed: false,
        removeTwoUsed: false,
        revealedScripture: false,
      });

      const fetched = await fetchBibleTriviaQuestions(level, 10);
      if (!fetched.length) throw new Error("No questions returned from trivia API");

      setQuestions(fetched);
      setAvailableChoices(fetched[0].choices.map((_, idx) => idx));
      setPhase("question");
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message ?? "Unable to load trivia questions.");
      setPhase("idle");
    }
  }

  function handleOptionClick(index: number) {
    if (phase !== "question") return;
    if (!availableChoices.includes(index)) return;
    setSelectedIndex(index);
    setHasCheckedAnswer(false);
    setLastAnswerCorrect(null);
  }

  function handleCheckAnswer() {
    if (selectedIndex === null || phase !== "question") return;
    const isCorrect = selectedIndex === currentQuestion.correctIndex;
    setLastAnswerCorrect(isCorrect);
    setHasCheckedAnswer(true);
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    } else if (mode === "survival") {
      finishGame();
    }
  }

  function finishGame() {
    setPhase("results");
    const categories = questions
      .map((q) => q.category)
      .filter((c): c is NonNullable<typeof c> => Boolean(c));
    const uniqueCats = Array.from(new Set(categories));

    recordTriviaResult({
      mode,
      level: currentLevelConfig?.key,
      correctCount,
      totalCount: questions.length,
      categoriesHit: uniqueCats,
    })
      .then((updated) => {
        setStats(updated);
        return getTriviaLeaderboard();
      })
      .then((lb) => setLeaderboard(lb))
      .catch((err) => console.error("recordTriviaResult error:", err));
  }

  function handleNextQuestion() {
    if (!hasCheckedAnswer) return;
    const isLast = currentQuestionIndex === questions.length - 1;
    if (mode !== "survival" && isLast) {
      finishGame();
    } else if (!isLast) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setSelectedIndex(null);
      setHasCheckedAnswer(false);
      setLastAnswerCorrect(null);
      setAvailableChoices(questions[nextIndex].choices.map((_, idx) => idx));
      setPowerUpsInGame({
        secondChanceUsed: false,
        removeTwoUsed: false,
        revealedScripture: false,
      });
    }
  }

  function handleTryAgain() {
    startGame(mode, currentLevelConfig.key);
  }

  function handleNextClassicLevel() {
    const passed = correctCount >= 9;
    if (!passed || mode !== "classic") return;
    const nextIndex = currentLevelIndex + 1;
    if (nextIndex >= LEVELS.length) return;
    setCurrentLevelIndex(nextIndex);
    startGame("classic", LEVELS[nextIndex].key);
  }

  const passedLevel = correctCount >= 9;
  const isFinalClassicLevel = currentLevelIndex === LEVELS.length - 1 && mode === "classic";

  // Power-ups
  const canUseSecondChance =
    stats && stats.powerUps.secondChance > 0 && !powerUpsInGame.secondChanceUsed;
  const canUseRemoveTwo =
    stats && stats.powerUps.removeTwo > 0 && !powerUpsInGame.removeTwoUsed;
  const canUseRevealScripture =
    stats && stats.powerUps.revealScripture > 0 && !powerUpsInGame.revealedScripture;

  function useSecondChance() {
    if (!canUseSecondChance) return;
    setLastAnswerCorrect(null);
    setHasCheckedAnswer(false);
    setPowerUpsInGame((s) => ({ ...s, secondChanceUsed: true }));
    if (!stats) return;
    setStats({
      ...stats,
      powerUps: { ...stats.powerUps, secondChance: stats.powerUps.secondChance - 1 },
    });
  }

  function useRemoveTwo() {
    if (!canUseRemoveTwo || !currentQuestion) return;
    const wrongOptions = availableChoices.filter(
      (idx) => idx !== currentQuestion.correctIndex
    );
    const toRemove = wrongOptions.slice(0, 2);
    const remaining = availableChoices.filter((idx) => !toRemove.includes(idx));
    setAvailableChoices(remaining);
    setPowerUpsInGame((s) => ({ ...s, removeTwoUsed: true }));
    if (!stats) return;
    setStats({
      ...stats,
      powerUps: { ...stats.powerUps, removeTwo: stats.powerUps.removeTwo - 1 },
    });
  }

  function useRevealScripture() {
    if (!canUseRevealScripture) return;
    setPowerUpsInGame((s) => ({ ...s, revealedScripture: true }));
    if (!stats) return;
    setStats({
      ...stats,
      powerUps: {
        ...stats.powerUps,
        revealScripture: stats.powerUps.revealScripture - 1,
      },
    });
  }

  const headerTitle = useMemo(() => {
    switch (tab) {
      case "classic":
        return "Bible Trivia – Classic Levels";
      case "daily":
        return "Daily Bible Challenge";
      case "survival":
        return "Survival Mode – Don't Miss!";
      case "speed":
        return "Speed Round – Beat the Clock";
      default:
        return "Bible Trivia";
    }
  }, [tab]);

  const headerSubtitle = useMemo(() => {
    switch (tab) {
      case "classic":
        return `${currentLevelConfig.label} Level – score 9/10 to advance`;
      case "daily":
        return "One unique challenge today. Keep your streak alive!";
      case "survival":
        return "How many can you get right in a row?";
      case "speed":
        return "Answer quickly and accurately.";
    }
  }, [tab, currentLevelConfig?.label]);

  const questionNumber = currentQuestionIndex + 1;

  return (
    <FeatureBoundary>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="max-w-7xl mx-auto py-6 px-4">
          {/* Header with back button */}
          <div className="mb-6 flex items-center gap-4">
            {onNavigate && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onNavigate("home")}
                data-testid="button-back"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Bible Trivia
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Test your biblical knowledge across multiple game modes
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
            {/* LEFT: Game panel */}
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <Button
                  size="sm"
                  variant={tab === "classic" ? "default" : "outline"}
                  onClick={() => setTab("classic")}
                  data-testid="tab-classic"
                >
                  Classic Levels
                </Button>
                <Button
                  size="sm"
                  variant={tab === "daily" ? "default" : "outline"}
                  onClick={() => setTab("daily")}
                  data-testid="tab-daily"
                >
                  Daily Challenge
                </Button>
                <Button
                  size="sm"
                  variant={tab === "survival" ? "default" : "outline"}
                  onClick={() => setTab("survival")}
                  data-testid="tab-survival"
                >
                  Survival
                </Button>
                <Button
                  size="sm"
                  variant={tab === "speed" ? "default" : "outline"}
                  onClick={() => setTab("speed")}
                  data-testid="tab-speed"
                >
                  Speed
                </Button>
              </div>

              <Card className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex flex-col">
                      <span className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        {headerTitle}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {headerSubtitle}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Correct: <span className="font-semibold">{correctCount}</span>
                      {questions.length ? ` / ${questions.length}` : null}
                    </span>
                  </div>
                  {mode === "classic" && (
                    <CardTitle className="text-lg font-semibold">
                      {currentLevelConfig.label} Level
                    </CardTitle>
                  )}
                </CardHeader>

                <CardContent className="space-y-4">
                  {phase === "loading" && (
                    <div className="flex flex-col items-center justify-center py-12">
                      <Loader2 className="animate-spin mb-4 h-8 w-8" />
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Loading Bible Trivia questions…
                      </p>
                    </div>
                  )}

                  {phase !== "loading" && !currentQuestion && (
                    <p className="text-sm text-rose-600">
                      {errorMessage ?? "No question available right now."}
                    </p>
                  )}

                  {phase !== "loading" && currentQuestion && (
                    <>
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                        <span>
                          Question {questionNumber} of {questions.length}
                        </span>
                        {currentQuestion.reference && (
                          <span className="italic">
                            {powerUpsInGame.revealedScripture
                              ? `Scripture: ${currentQuestion.reference}`
                              : "Scripture hidden (use Reveal Scripture)"}
                          </span>
                        )}
                      </div>

                      <p className="text-base text-slate-800 dark:text-slate-200 mt-1">
                        {currentQuestion.text}
                      </p>

                      <div className="space-y-2 mt-3">
                        {currentQuestion.choices.map((choice, index) => {
                          if (!availableChoices.includes(index)) {
                            return (
                              <Button
                                key={index}
                                variant="outline"
                                className="w-full justify-start text-left whitespace-normal opacity-40 cursor-not-allowed"
                                disabled
                                data-testid={`option-${index}`}
                              >
                                <span className="mr-2 font-semibold">
                                  {String.fromCharCode(65 + index)}.
                                </span>
                                <span>{choice}</span>
                              </Button>
                            );
                          }

                          const isSelected = index === selectedIndex;
                          const isCorrect = hasCheckedAnswer && index === currentQuestion.correctIndex;
                          const isWrong = hasCheckedAnswer && isSelected && !isCorrect;

                          return (
                            <Button
                              key={index}
                              type="button"
                              variant={
                                isCorrect
                                  ? "default"
                                  : isWrong
                                  ? "destructive"
                                  : isSelected
                                  ? "default"
                                  : "outline"
                              }
                              className={cn(
                                "w-full justify-start text-left whitespace-normal",
                                isCorrect && "bg-emerald-500 hover:bg-emerald-600",
                                isWrong && "bg-rose-500 hover:bg-rose-600"
                              )}
                              onClick={() => handleOptionClick(index)}
                              disabled={hasCheckedAnswer}
                              data-testid={`option-${index}`}
                            >
                              <span className="mr-2 font-semibold">
                                {String.fromCharCode(65 + index)}.
                              </span>
                              <span>{choice}</span>
                            </Button>
                          );
                        })}
                      </div>

                      {hasCheckedAnswer && lastAnswerCorrect !== null && (
                        <p
                          className={cn(
                            "text-sm mt-2",
                            lastAnswerCorrect ? "text-emerald-600" : "text-rose-600"
                          )}
                        >
                          {lastAnswerCorrect
                            ? "✓ Correct! Well done."
                            : mode === "survival"
                            ? "✗ That ends your run in Survival mode – check your results below."
                            : "✗ Not quite right – keep going, you're learning!"}
                        </p>
                      )}

                      {/* Power-ups row */}
                      {stats && phase === "question" && !hasCheckedAnswer && (
                        <div className="flex flex-wrap gap-2 text-xs mt-3">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={useSecondChance}
                            disabled={!canUseSecondChance}
                            data-testid="powerup-second-chance"
                          >
                            Second Chance ({stats.powerUps.secondChance})
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={useRemoveTwo}
                            disabled={!canUseRemoveTwo}
                            data-testid="powerup-remove-two"
                          >
                            Remove 2 ({stats.powerUps.removeTwo})
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={useRevealScripture}
                            disabled={!canUseRevealScripture}
                            data-testid="powerup-reveal-scripture"
                          >
                            Reveal Scripture ({stats.powerUps.revealScripture})
                          </Button>
                        </div>
                      )}

                      <div className="flex gap-3 pt-4">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={handleCheckAnswer}
                          disabled={selectedIndex === null || hasCheckedAnswer}
                          data-testid="button-check-answer"
                        >
                          {hasCheckedAnswer ? "Answer checked" : "Check answer"}
                        </Button>

                        {phase === "question" && mode !== "survival" && (
                          <Button
                            className="flex-1"
                            onClick={handleNextQuestion}
                            disabled={!hasCheckedAnswer}
                            data-testid="button-next-question"
                          >
                            {questionNumber === questions.length ? "See results" : "Next question"}
                          </Button>
                        )}
                      </div>
                    </>
                  )}

                  {phase === "results" && (
                    <div className="mt-4 space-y-3 border-t pt-4">
                      <p className="text-lg font-semibold">
                        You answered <span className="text-emerald-600">{correctCount}</span> out of{" "}
                        {questions.length} correctly.
                      </p>

                      {mode === "classic" && (
                        <>
                          {passedLevel ? (
                            <p className="text-emerald-700 font-semibold">
                              🎉 Congratulations! You passed the {currentLevelConfig.label} level!
                            </p>
                          ) : (
                            <p className="text-sky-700 font-semibold">
                              Great job! Try again and aim for at least 9/10 to advance.
                            </p>
                          )}

                          <div className="flex flex-wrap gap-3 pt-1">
                            <Button
                              variant="outline"
                              onClick={handleTryAgain}
                              data-testid="button-try-again"
                            >
                              Try this level again
                            </Button>
                            {!isFinalClassicLevel && (
                              <Button
                                onClick={handleNextClassicLevel}
                                disabled={!passedLevel}
                                data-testid="button-next-level"
                              >
                                {passedLevel
                                  ? `Go to ${LEVELS[currentLevelIndex + 1].label} level`
                                  : `Score 9/10 to unlock next level`}
                              </Button>
                            )}
                            {isFinalClassicLevel && passedLevel && (
                              <span className="text-sm text-emerald-700 font-semibold">
                                🌟 You've completed all levels – you're a Bible Expert!
                              </span>
                            )}
                          </div>
                        </>
                      )}

                      {mode === "daily" && (
                        <>
                          {correctCount >= 9 ? (
                            <p className="text-emerald-700 font-semibold">
                              🌅 Daily Crown earned! You kept your streak alive.
                            </p>
                          ) : (
                            <p className="text-sky-700 font-semibold">
                              Great effort today! Come back tomorrow and aim for 9/10.
                            </p>
                          )}
                          <Button
                            variant="outline"
                            onClick={handleTryAgain}
                            data-testid="button-try-again"
                          >
                            Play today's challenge again
                          </Button>
                        </>
                      )}

                      {mode === "survival" && (
                        <>
                          <p className="text-slate-700 text-sm">
                            Survival mode ends at your first miss. See how high you can go next time!
                          </p>
                          <Button
                            variant="outline"
                            onClick={handleTryAgain}
                            data-testid="button-try-again"
                          >
                            Try Survival mode again
                          </Button>
                        </>
                      )}

                      {mode === "speed" && (
                        <>
                          <p className="text-slate-700 text-sm">
                            Speed Round pushes you to answer quickly. Challenge yourself again!
                          </p>
                          <Button
                            variant="outline"
                            onClick={handleTryAgain}
                            data-testid="button-try-again"
                          >
                            Replay Speed Round
                          </Button>
                        </>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* RIGHT: Dashboard / Streak / Mastery / Leaderboard */}
            <div className="space-y-4">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-base">Your Bible Trivia Journey</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  {loadingStats && (
                    <p className="text-slate-500 text-xs flex items-center gap-2">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      Loading stats…
                    </p>
                  )}
                  {stats && (
                    <>
                      <p>
                        Title:{" "}
                        <span className="font-semibold">
                          {stats.highestTitle === "None" ? "Getting Started" : stats.highestTitle}
                        </span>
                      </p>
                      <p>
                        Daily streak:{" "}
                        <span className="font-semibold">{stats.dailyStreak}</span> days
                      </p>
                      <p>
                        Daily crowns earned:{" "}
                        <span className="font-semibold">{stats.dailyCrowns}</span>
                      </p>

                      <div className="mt-2 space-y-1">
                        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                          Bible Mastery
                        </p>
                        {Object.entries(stats.mastery).map(([key, value]) => (
                          <div key={key} className="space-y-0.5">
                            <div className="flex justify-between text-xs">
                              <span className="capitalize">
                                {key.replace(/([A-Z])/g, " $1")}
                              </span>
                              <span>{value}%</span>
                            </div>
                            <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                              <div
                                className="h-full bg-emerald-500"
                                style={{ width: `${value}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-3 space-y-1">
                        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                          Power-Ups
                        </p>
                        <p>
                          Second Chance:{" "}
                          <span className="font-semibold">{stats.powerUps.secondChance}</span>
                        </p>
                        <p>
                          Reveal Scripture:{" "}
                          <span className="font-semibold">{stats.powerUps.revealScripture}</span>
                        </p>
                        <p>
                          Remove 2 Options:{" "}
                          <span className="font-semibold">{stats.powerUps.removeTwo}</span>
                        </p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-base">Friends & Family Challenge</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Compare your streak and crowns with others who are playing.
                  </p>
                  {loadingLeaderboard && (
                    <p className="text-slate-500 text-xs flex items-center gap-2">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      Loading leaderboard…
                    </p>
                  )}
                  {!loadingLeaderboard && leaderboard.length === 0 && (
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      No players yet. You can be first!
                    </p>
                  )}
                  {!loadingLeaderboard && leaderboard.length > 0 && (
                    <div className="space-y-1">
                      {leaderboard.map((entry, index) => (
                        <div
                          key={entry.userId}
                          className="flex items-center justify-between text-xs py-1 border-b border-slate-100 dark:border-slate-700 last:border-0"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-semibold w-4 text-right">
                              {index + 1}.
                            </span>
                            <span>{entry.displayName}</span>
                          </div>
                          <div className="text-right">
                            <div>🔥 Streak: {entry.dailyStreak}</div>
                            <div>👑 Crowns: {entry.dailyCrowns}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </FeatureBoundary>
  );
}

export default BibleTriviaPage;
