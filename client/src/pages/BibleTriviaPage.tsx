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
  checkTriviaAnswer,
  CheckAnswerResult,
} from "@/services/triviaService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowLeft, Home } from "lucide-react";
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
  const [answerResult, setAnswerResult] = useState<CheckAnswerResult | null>(null);
  const [checkingAnswer, setCheckingAnswer] = useState(false);

  // Stats / leaderboard
  const [stats, setStats] = useState<TriviaStats | null>(null);
  const [leaderboard, setLeaderboard] = useState<TriviaStats[]>([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(true);

  // Power-ups (track what was used this game)
  const [powerUpsInGame, setPowerUpsInGame] = useState<PowerUpState>({
    secondChanceUsed: false,
    removeTwoUsed: false,
    revealedScripture: false,
  });
  
  // Track cumulative power-up consumption for backend
  const [powerUpsConsumed, setPowerUpsConsumed] = useState({
    secondChance: 0,
    removeTwo: 0,
    revealScripture: 0,
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
      
      setPowerUpsConsumed({
        secondChance: 0,
        removeTwo: 0,
        revealScripture: 0,
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

  async function handleCheckAnswer() {
    if (selectedIndex === null || phase !== "question" || checkingAnswer) return;
    
    setCheckingAnswer(true);
    
    try {
      // Server-side answer validation - answer key never leaves the server
      const result = await checkTriviaAnswer(currentQuestion.id, selectedIndex);
      
      setAnswerResult(result);
      setLastAnswerCorrect(result.isCorrect);
      setHasCheckedAnswer(true);
      
      if (result.isCorrect) {
        setCorrectCount((prev) => prev + 1);
      } else if (mode === "survival") {
        finishGame();
      }
    } catch (err) {
      console.error("Error checking answer:", err);
      setErrorMessage("Failed to check answer. Please try again.");
    } finally {
      setCheckingAnswer(false);
    }
  }

  function finishGame() {
    setPhase("results");
    const categories = questions
      .map((q) => q.category)
      .filter((c): c is NonNullable<typeof c> => Boolean(c));
    const uniqueCats = Array.from(new Set(categories));

    // For survival mode, totalCount is the actual questions answered (not the full quiz length)
    const actualTotalCount = mode === "survival" ? currentQuestionIndex + 1 : questions.length;

    recordTriviaResult({
      mode,
      level: currentLevelConfig?.key,
      correctCount,
      totalCount: actualTotalCount,
      categoriesHit: uniqueCats,
      powerUpsUsed: powerUpsConsumed,
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
    setPowerUpsConsumed((p) => ({ ...p, secondChance: p.secondChance + 1 }));
    if (!stats) return;
    setStats({
      ...stats,
      powerUps: { ...stats.powerUps, secondChance: stats.powerUps.secondChance - 1 },
    });
  }

  async function useRemoveTwo() {
    if (!canUseRemoveTwo || !currentQuestion) return;
    
    // Get correct answer from server to identify wrong options
    try {
      const result = await checkTriviaAnswer(currentQuestion.id, 0); // Just to get correctIndex
      const wrongOptions = availableChoices.filter(
        (idx) => idx !== result.correctIndex
      );
      const toRemove = wrongOptions.slice(0, 2);
      const remaining = availableChoices.filter((idx) => !toRemove.includes(idx));
      setAvailableChoices(remaining);
      setPowerUpsInGame((s) => ({ ...s, removeTwoUsed: true }));
      setPowerUpsConsumed((p) => ({ ...p, removeTwo: p.removeTwo + 1 }));
      if (!stats) return;
      setStats({
        ...stats,
        powerUps: { ...stats.powerUps, removeTwo: stats.powerUps.removeTwo - 1 },
      });
    } catch (err) {
      console.error("Error using Remove Two power-up:", err);
    }
  }

  function useRevealScripture() {
    if (!canUseRevealScripture) return;
    setPowerUpsInGame((s) => ({ ...s, revealedScripture: true }));
    setPowerUpsConsumed((p) => ({ ...p, revealScripture: p.revealScripture + 1 }));
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
    <FeatureBoundary featureName="Bible Trivia">
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="max-w-7xl mx-auto py-6 px-4">
          {/* Header with back and home buttons */}
          <div className="mb-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {onNavigate && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onNavigate("more")}
                  className="rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                  data-testid="button-back"
                  aria-label="Go back"
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
            {onNavigate && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onNavigate("home")}
                className="rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                data-testid="button-home"
                aria-label="Go home"
              >
                <Home className="h-5 w-5" />
              </Button>
            )}
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

              <Card className="shadow-xl border-2 bg-gradient-to-br from-white via-amber-50/30 to-white dark:from-slate-800 dark:via-amber-900/10 dark:to-slate-800">
                <CardHeader className="border-b border-amber-200/50 dark:border-amber-700/30 bg-gradient-to-r from-amber-50/50 to-orange-50/30 dark:from-slate-700/50 dark:to-slate-700/30">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex flex-col">
                      <span className="text-xs uppercase tracking-wide font-semibold text-amber-700 dark:text-amber-400">
                        {headerTitle}
                      </span>
                      <span className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                        {headerSubtitle}
                      </span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Score</span>
                      <span className="text-lg font-bold text-amber-600 dark:text-amber-400">
                        {correctCount}<span className="text-sm text-slate-500">/{questions.length || 0}</span>
                      </span>
                    </div>
                  </div>
                  {mode === "classic" && (
                    <CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-100 mt-2">
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
                      <div className="flex items-center justify-between py-2 px-3 bg-amber-50/50 dark:bg-amber-900/20 rounded-lg border border-amber-100 dark:border-amber-800/30">
                        <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                          Question {questionNumber} of {questions.length}
                        </span>
                        {currentQuestion.reference && (
                          <span className="text-xs italic text-slate-600 dark:text-slate-300">
                            {currentQuestion.reference}
                          </span>
                        )}
                      </div>

                      <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-700/30 dark:to-slate-800/30 p-4 rounded-xl border border-slate-200 dark:border-slate-600">
                        <p className="text-lg leading-relaxed text-slate-800 dark:text-slate-100 font-medium">
                          {currentQuestion.text}
                        </p>
                      </div>

                      <div className="space-y-3 mt-4">
                        {currentQuestion.choices.map((choice, index) => {
                          if (!availableChoices.includes(index)) {
                            return (
                              <Button
                                key={index}
                                variant="outline"
                                className="w-full justify-start text-left whitespace-normal opacity-40 cursor-not-allowed h-auto py-3 px-4"
                                disabled
                                data-testid={`option-${index}`}
                              >
                                <span className="mr-3 font-bold text-base">
                                  {String.fromCharCode(65 + index)}.
                                </span>
                                <span className="text-sm">{choice}</span>
                              </Button>
                            );
                          }

                          const isSelected = index === selectedIndex;
                          const isCorrect = hasCheckedAnswer && answerResult && index === answerResult.correctIndex;
                          const isWrong = hasCheckedAnswer && isSelected && !isCorrect;

                          return (
                            <Button
                              key={index}
                              type="button"
                              variant={
                                isCorrect || isWrong
                                  ? "ghost"
                                  : isSelected
                                  ? "default"
                                  : "outline"
                              }
                              className={cn(
                                "w-full justify-start text-left whitespace-normal h-auto py-3 px-4 transition-all",
                                isCorrect && "!bg-emerald-600 hover:!bg-emerald-700 !border-emerald-700 !text-white shadow-lg shadow-emerald-500/30",
                                isWrong && "!bg-rose-600 hover:!bg-rose-700 !border-rose-700 !text-white shadow-lg shadow-rose-500/30",
                                isSelected && !hasCheckedAnswer && "border-amber-500 bg-amber-50 dark:bg-amber-900/20"
                              )}
                              onClick={() => handleOptionClick(index)}
                              disabled={hasCheckedAnswer}
                              data-testid={`option-${index}`}
                            >
                              <span className="mr-3 font-bold text-base">
                                {String.fromCharCode(65 + index)}.
                              </span>
                              <span className="text-sm font-medium">{choice}</span>
                            </Button>
                          );
                        })}
                      </div>

                      {hasCheckedAnswer && lastAnswerCorrect !== null && (
                        <div className={cn(
                          "mt-4 p-4 rounded-xl border-2",
                          lastAnswerCorrect 
                            ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-700" 
                            : "bg-rose-50 dark:bg-rose-900/20 border-rose-300 dark:border-rose-700"
                        )}>
                          <p className={cn(
                            "text-base font-semibold mb-2",
                            lastAnswerCorrect ? "text-emerald-700 dark:text-emerald-400" : "text-rose-700 dark:text-rose-400"
                          )}>
                            {lastAnswerCorrect
                              ? "✓ Excellent! That's correct!"
                              : mode === "survival"
                              ? "✗ Incorrect – That ends your survival run"
                              : "✗ Not quite right"}
                          </p>
                          
                          <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-600">
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                              Correct answer:
                            </p>
                            {answerResult && (
                              <>
                                <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-2">
                                  {String.fromCharCode(65 + answerResult.correctIndex)}. {answerResult.correctAnswer}
                                </p>
                                
                                {answerResult.reference && (
                                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                                    <span className="font-semibold">Scripture: </span>
                                    {answerResult.reference}
                                  </p>
                                )}
                                
                                {answerResult.explanation && (
                                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                                    {answerResult.explanation}
                                  </p>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Power-up: Remove 2 */}
                      {stats && phase === "question" && !hasCheckedAnswer && canUseRemoveTwo && (
                        <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/30 rounded-lg">
                          <p className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-2">
                            Need help? Use a power-up:
                          </p>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={useRemoveTwo}
                            disabled={!canUseRemoveTwo}
                            data-testid="powerup-remove-two"
                            className="bg-white dark:bg-slate-700 border-amber-300 dark:border-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/30"
                          >
                            🎯 Remove 2 Wrong Answers ({stats.powerUps.removeTwo} available)
                          </Button>
                        </div>
                      )}

                      <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-600 mt-4">
                        <Button
                          variant="default"
                          size="lg"
                          className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-semibold"
                          onClick={handleCheckAnswer}
                          disabled={selectedIndex === null || hasCheckedAnswer}
                          data-testid="button-check-answer"
                        >
                          {hasCheckedAnswer ? "✓ Answer Checked" : "Check Answer"}
                        </Button>

                        {phase === "question" && mode !== "survival" && (
                          <Button
                            size="lg"
                            className="flex-1 bg-blue-600 hover:bg-blue-700 font-semibold"
                            onClick={handleNextQuestion}
                            disabled={!hasCheckedAnswer}
                            data-testid="button-next-question"
                          >
                            {questionNumber === questions.length ? "See Results →" : "Next Question →"}
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
