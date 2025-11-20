import { useEffect, useState } from "react";
import { fetchBibleTriviaQuestions, TriviaLevel, TriviaQuestion } from "@/services/triviaService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Trophy,
  BookOpen,
  Brain,
  Star,
  Award,
  Sparkles,
} from "lucide-react";
import { FeatureBoundary } from "@/components/FeatureBoundary";

type GamePhase = "loading" | "question" | "results" | "error";

type LevelKey = "beginner" | "intermediate" | "advanced";

interface LevelConfig {
  key: LevelKey;
  label: string;
  titleOnPass: string;
  color: string;
  icon: typeof BookOpen;
  gradient: string;
  description: string;
}

const LEVELS: LevelConfig[] = [
  {
    key: "beginner",
    label: "Beginner",
    titleOnPass: "Bible Student",
    color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    icon: BookOpen,
    gradient: "from-green-400 to-emerald-500",
    description: "Basic Bible knowledge",
  },
  {
    key: "intermediate",
    label: "Intermediate",
    titleOnPass: "Bible Scholar",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    icon: Brain,
    gradient: "from-blue-400 to-cyan-500",
    description: "Deeper understanding",
  },
  {
    key: "advanced",
    label: "Advanced",
    titleOnPass: "Bible Expert",
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
    icon: Star,
    gradient: "from-purple-400 to-pink-500",
    description: "Expert knowledge",
  },
];

function toTriviaLevel(level: LevelKey): TriviaLevel {
  return level;
}

function awardProfileTitle(title: string) {
  console.log("🏆 Awarded trivia title:", title);
  // TODO: Integrate with user profile system when ready
}

interface BibleTriviaPageProps {
  onNavigate?: (page: string) => void;
  language?: string;
}

function BibleTriviaPage({ onNavigate, language = "en" }: BibleTriviaPageProps) {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [phase, setPhase] = useState<GamePhase>("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [hasCheckedAnswer, setHasCheckedAnswer] = useState(false);

  const currentLevelConfig = LEVELS[currentLevelIndex];
  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    startLevel("beginner");
  }, []);

  async function startLevel(levelKey: LevelKey) {
    try {
      setPhase("loading");
      setErrorMessage(null);
      setQuestions([]);
      setCurrentQuestionIndex(0);
      setSelectedIndex(null);
      setCorrectCount(0);
      setLastAnswerCorrect(null);
      setHasCheckedAnswer(false);

      const triviaLevel = toTriviaLevel(levelKey);
      const fetched = await fetchBibleTriviaQuestions(triviaLevel, 10);

      if (!fetched.length) {
        throw new Error("No questions returned from trivia API");
      }

      setQuestions(fetched);
      setPhase("question");
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message ?? "Unable to load trivia questions.");
      setPhase("error");
    }
  }

  function handleOptionClick(index: number) {
    if (phase !== "question" || hasCheckedAnswer) return;
    setSelectedIndex(index);
  }

  function handleCheckAnswer() {
    if (selectedIndex === null || phase !== "question" || hasCheckedAnswer) return;

    const isCorrect = selectedIndex === currentQuestion.correctIndex;
    setLastAnswerCorrect(isCorrect);
    setHasCheckedAnswer(true);

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }
  }

  function handleNextQuestion() {
    if (!hasCheckedAnswer) return;

    const isLast = currentQuestionIndex === questions.length - 1;
    if (isLast) {
      setPhase("results");
      const passed = correctCount >= 9;
      if (passed) {
        awardProfileTitle(currentLevelConfig.titleOnPass);
      }
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedIndex(null);
      setHasCheckedAnswer(false);
      setLastAnswerCorrect(null);
    }
  }

  function handleTryAgain() {
    const levelKey = currentLevelConfig.key;
    startLevel(levelKey);
  }

  function handleNextLevel() {
    const passed = correctCount >= 9;
    if (!passed) return;

    const isLastLevel = currentLevelIndex === LEVELS.length - 1;
    if (isLastLevel) return;

    const nextIndex = currentLevelIndex + 1;
    const nextLevelKey = LEVELS[nextIndex].key;
    setCurrentLevelIndex(nextIndex);
    startLevel(nextLevelKey);
  }

  const passedLevel = correctCount >= 9;
  const isFinalLevel = currentLevelIndex === LEVELS.length - 1;

  if (phase === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 pb-20">
        <div className="bg-white dark:bg-gray-900 px-4 py-6 border-b border-gray-200 dark:border-gray-700 ios-safe-top">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate?.("home")}
              className="h-11 w-11 bg-accent/50 dark:bg-accent/30 hover:bg-accent dark:hover:bg-accent shadow-lg hover:shadow-xl transition-all duration-300 rounded-full"
              data-testid="button-back-to-home"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-foreground">
                Bible Trivia
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Loading questions...
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mb-4" />
          <p className="text-sm text-gray-600 dark:text-gray-400">Loading Bible Trivia questions…</p>
        </div>
      </div>
    );
  }

  if (phase === "error") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 pb-20">
        <div className="bg-white dark:bg-gray-900 px-4 py-6 border-b border-gray-200 dark:border-gray-700 ios-safe-top">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate?.("home")}
              className="h-11 w-11 bg-accent/50 dark:bg-accent/30 hover:bg-accent dark:hover:bg-accent shadow-lg hover:shadow-xl transition-all duration-300 rounded-full"
              data-testid="button-back-to-home"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-foreground">
                Bible Trivia
              </h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 px-4">
          <p className="text-red-600 dark:text-red-400 font-semibold">Something went wrong.</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{errorMessage}</p>
          <Button onClick={() => startLevel(currentLevelConfig.key)} data-testid="button-retry">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (phase === "results") {
    const LevelIcon = currentLevelConfig.icon;

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 pb-20">
        <div className="bg-white dark:bg-gray-900 px-4 py-6 border-b border-gray-200 dark:border-gray-700 ios-safe-top">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onNavigate?.("home")}
                className="h-11 w-11 bg-accent/50 dark:bg-accent/30 hover:bg-accent dark:hover:bg-accent shadow-lg hover:shadow-xl transition-all duration-300 rounded-full"
                data-testid="button-back-to-home"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-foreground">Results</h1>
            </div>
            <Badge className={currentLevelConfig.color} data-testid="badge-current-level">
              <LevelIcon className="w-3 h-3 mr-1" />
              {currentLevelConfig.label}
            </Badge>
          </div>
        </div>

        <div className="p-6 max-w-2xl mx-auto">
          <Card className="mb-6">
            <CardHeader className="text-center">
              <div
                className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-br ${currentLevelConfig.gradient} rounded-full flex items-center justify-center`}
              >
                <Award className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl mb-2">
                {passedLevel ? "Great Job! 🎉" : "Keep Going! 💪"}
              </CardTitle>
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {correctCount}/{questions.length}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                You answered <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{correctCount}</span> out of{" "}
                {questions.length} questions correctly.
              </p>
            </CardHeader>
          </Card>

          {passedLevel ? (
            <Card className={`mb-6 bg-gradient-to-br ${currentLevelConfig.gradient} text-white border-0`}>
              <CardContent className="p-6 text-center">
                <Trophy className="w-12 h-12 mx-auto mb-3" />
                <h2 className="text-xl font-bold mb-2">Congratulations!</h2>
                <p className="text-sm opacity-90 mb-2">
                  You passed the {currentLevelConfig.label} level!
                </p>
                <p className="text-sm font-semibold opacity-95 mt-3 pt-3 border-t border-white/30">
                  You've earned the title{" "}
                  <span className="font-bold">{currentLevelConfig.titleOnPass}</span>
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card className="mb-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-6 text-center">
                <p className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                  Great job! Keep going – you're growing in God's Word.
                </p>
                <p className="text-sm text-blue-800 dark:text-blue-400">
                  Try again and aim for at least <span className="font-semibold">9 out of 10</span>{" "}
                  correct to advance.
                </p>
              </CardContent>
            </Card>
          )}

          <div className="space-y-3">
            <Button
              onClick={handleTryAgain}
              className="w-full h-12 font-semibold"
              variant="outline"
              data-testid="button-try-again"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Try {currentLevelConfig.label} Level Again
            </Button>

            {!isFinalLevel && (
              <Button
                onClick={handleNextLevel}
                disabled={!passedLevel}
                className="w-full h-12 font-semibold"
                data-testid="button-next-level"
              >
                {passedLevel ? (
                  <>
                    <Star className="w-4 h-4 mr-2" />
                    Go to {LEVELS[currentLevelIndex + 1].label} Level
                  </>
                ) : (
                  <>Score 9/10 to unlock next level</>
                )}
              </Button>
            )}

            {isFinalLevel && passedLevel && (
              <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                <CardContent className="p-4 text-center">
                  <p className="font-semibold">
                    🌟 You've completed all levels and are a{" "}
                    <span className="font-bold">Bible Expert</span>!
                  </p>
                </CardContent>
              </Card>
            )}

            <Button
              onClick={() => onNavigate?.("home")}
              variant="outline"
              className="w-full h-12 font-semibold"
              data-testid="button-home"
            >
              Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return null;
  }

  const questionNumber = currentQuestionIndex + 1;
  const LevelIcon = currentLevelConfig.icon;
  const questionProgressPercent = (questionNumber / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 pb-20">
      <div className="bg-white dark:bg-gray-900 px-4 py-4 border-b border-gray-200 dark:border-gray-700 ios-safe-top">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate?.("home")}
              className="h-9 w-9"
              data-testid="button-back"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <span className="text-sm font-medium">
                Question {questionNumber}/{questions.length}
              </span>
              <Badge className={currentLevelConfig.color} data-testid="badge-level">
                <LevelIcon className="w-3 h-3 mr-1" />
                {currentLevelConfig.label}
              </Badge>
            </div>
          </div>

          <div className="text-sm font-medium">
            Score: <strong>{correctCount}</strong>
          </div>
        </div>

        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${currentLevelConfig.gradient} transition-all duration-300`}
            style={{ width: `${questionProgressPercent}%` }}
          />
        </div>
      </div>

      <div className="p-6 max-w-2xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg leading-relaxed">{currentQuestion.text}</CardTitle>
            {currentQuestion.reference && (
              <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">
                Scripture: {currentQuestion.reference}
              </p>
            )}
          </CardHeader>
          <CardContent className="space-y-3">
            {currentQuestion.choices.map((choice, index) => {
              const isSelected = index === selectedIndex;
              const isCorrect = index === currentQuestion.correctIndex;
              const showResult = hasCheckedAnswer;

              return (
                <button
                  key={index}
                  onClick={() => handleOptionClick(index)}
                  disabled={hasCheckedAnswer}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                    showResult
                      ? isCorrect
                        ? "border-green-500 bg-green-50 dark:bg-green-900/30"
                        : isSelected
                        ? "border-red-500 bg-red-50 dark:bg-red-900/30"
                        : "border-gray-200 dark:border-gray-700"
                      : isSelected
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                      : "border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  } ${hasCheckedAnswer ? "cursor-not-allowed" : "cursor-pointer"}`}
                  data-testid={`button-option-${index}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                        showResult
                          ? isCorrect
                            ? "bg-green-500 text-white"
                            : isSelected
                            ? "bg-red-500 text-white"
                            : "bg-gray-100 dark:bg-gray-800"
                          : isSelected
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 dark:bg-gray-800"
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="flex-1">{choice}</span>
                    {showResult && isCorrect && (
                      <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                    )}
                    {showResult && isSelected && !isCorrect && (
                      <span className="text-red-600 dark:text-red-400 font-bold">✗</span>
                    )}
                  </div>
                </button>
              );
            })}
          </CardContent>
        </Card>

        {hasCheckedAnswer && currentQuestion.explanation && (
          <Card className="mb-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-4">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Explanation: </span>
                {currentQuestion.explanation}
              </p>
            </CardContent>
          </Card>
        )}

        {hasCheckedAnswer && lastAnswerCorrect !== null && !currentQuestion.explanation && (
          <Card className="mb-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-4">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {lastAnswerCorrect
                  ? "✓ Correct! Well done."
                  : "That's not quite right this time – keep going, you're learning!"}
              </p>
            </CardContent>
          </Card>
        )}

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={handleCheckAnswer}
            disabled={selectedIndex === null || hasCheckedAnswer}
            data-testid="button-check-answer"
          >
            {hasCheckedAnswer ? "Answer checked" : "Check answer"}
          </Button>
          <Button
            className="flex-1"
            onClick={handleNextQuestion}
            disabled={!hasCheckedAnswer}
            data-testid="button-next-question"
          >
            {questionNumber === questions.length ? "See results" : "Next question"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FeatureBoundary.with(
  BibleTriviaPage,
  "Bible Trivia Game",
  (props) => () => props.onNavigate?.('home')
);
