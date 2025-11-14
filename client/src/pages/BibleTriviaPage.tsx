import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Brain, Trophy, BookOpen, Star, RotateCcw, Sparkles, Award, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "@/lib/translations";
import { useBibleTriviaMutation } from "@/hooks/useTrivia";

type LevelKey = "beginner" | "intermediate" | "advanced";

interface TriviaQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  verse?: string | null;
  verseText?: string | null;
  explanation?: string | null;
  level: string;
}

type GameState = "idle" | "playing" | "finished";

interface BibleTriviaProps {
  onNavigate?: (page: string) => void;
  language?: string;
}

const LEVEL_ORDER: LevelKey[] = ["beginner", "intermediate", "advanced"];
const QUESTIONS_PER_GAME = 10;
const PASSING_SCORE = 9;
const STORAGE_KEY_UNLOCKED = "bible-trivia-unlocked-level";

// Map frontend levels to backend levels
const LEVEL_MAP: Record<LevelKey, string> = {
  beginner: "beginner",
  intermediate: "student",
  advanced: "expert"
};

const LEVEL_CONFIG = {
  beginner: {
    name: 'Beginner',
    color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    icon: BookOpen,
    gradient: 'from-green-400 to-emerald-500',
    description: 'Basic Bible knowledge'
  },
  intermediate: {
    name: 'Intermediate',
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    icon: Brain,
    gradient: 'from-blue-400 to-cyan-500',
    description: 'Deeper understanding'
  },
  advanced: {
    name: 'Advanced',
    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    icon: Star,
    gradient: 'from-purple-400 to-pink-500',
    description: 'Expert knowledge'
  }
};

export default function BibleTriviaPage({ onNavigate, language = "en" }: BibleTriviaProps) {
  const t = useTranslations(language);
  const { toast } = useToast();
  const triviaMutation = useBibleTriviaMutation();

  const [currentLevel, setCurrentLevel] = useState<LevelKey>("beginner");
  const [highestUnlockedLevel, setHighestUnlockedLevel] = useState<LevelKey>("beginner");
  const [justUnlockedLevel, setJustUnlockedLevel] = useState<LevelKey | null>(null);
  
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  
  const [gameState, setGameState] = useState<GameState>("idle");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load stored highest unlocked level
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY_UNLOCKED);
    if (stored && (LEVEL_ORDER as string[]).includes(stored)) {
      setHighestUnlockedLevel(stored as LevelKey);
    }
  }, []);

  const saveUnlockedLevel = useCallback((level: LevelKey) => {
    setHighestUnlockedLevel(level);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY_UNLOCKED, level);
    }
  }, []);

  // Fetch questions dynamically
  const fetchQuestionsForLevel = useCallback(
    async (level: LevelKey) => {
      setLoading(true);
      setError(null);
      setJustUnlockedLevel(null); // Reset unlock celebration

      try {
        const backendLevel = LEVEL_MAP[level];
        const result = await triviaMutation.mutateAsync({
          level: backendLevel,
          count: QUESTIONS_PER_GAME,
          useAI: true
        });

        if (!result.success || !result.questions || result.questions.length === 0) {
          throw new Error("No questions were returned.");
        }

        setQuestions(result.questions);
        setCurrentIndex(0);
        setSelectedIndex(null);
        setScore(0);
        setGameState("playing");
      } catch (err: any) {
        console.error("Error fetching trivia questions:", err);
        setError("Sorry, I couldn't load questions right now. Please try again in a moment.");
        toast({
          title: "Error",
          description: "Sorry, I couldn't load questions right now. Please try again in a moment.",
          variant: "destructive",
        });
        setGameState("idle");
      } finally {
        setLoading(false);
      }
    },
    [triviaMutation, toast]
  );

  const handleStartGame = () => {
    fetchQuestionsForLevel(currentLevel);
  };

  const handleSelectOption = (index: number) => {
    if (gameState !== "playing" || selectedIndex !== null) return;
    setSelectedIndex(index);
  };

  const handleNextQuestion = () => {
    if (selectedIndex === null) return;

    const currentQuestion = questions[currentIndex];
    if (!currentQuestion) return;

    // Check if answer is correct
    if (selectedIndex === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }

    const nextIndex = currentIndex + 1;

    if (nextIndex >= QUESTIONS_PER_GAME || nextIndex >= questions.length) {
      setGameState("finished");
    } else {
      setCurrentIndex(nextIndex);
      setSelectedIndex(null);
    }
  };

  const handlePlayAgainSameLevel = () => {
    fetchQuestionsForLevel(currentLevel);
  };

  const handleGoToNextLevel = () => {
    const currentLevelIndex = LEVEL_ORDER.indexOf(currentLevel);
    if (currentLevelIndex < 0) return;

    const nextLevel = LEVEL_ORDER[currentLevelIndex + 1];
    if (!nextLevel) return;

    setCurrentLevel(nextLevel);
    fetchQuestionsForLevel(nextLevel);
  };

  // After finishing, decide whether to unlock the next level
  useEffect(() => {
    if (gameState !== "finished") return;

    const passed = score >= PASSING_SCORE;
    const currentIndexInOrder = LEVEL_ORDER.indexOf(currentLevel);
    const highestIndexInOrder = LEVEL_ORDER.indexOf(highestUnlockedLevel);

    if (passed && currentIndexInOrder >= highestIndexInOrder) {
      const nextLevel = LEVEL_ORDER[currentIndexInOrder + 1];
      if (nextLevel) {
        setJustUnlockedLevel(nextLevel);
        saveUnlockedLevel(nextLevel);
      }
    } else {
      setJustUnlockedLevel(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState, score, currentLevel, saveUnlockedLevel]);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex >= QUESTIONS_PER_GAME - 1 || currentIndex >= questions.length - 1;
  const passed = score >= PASSING_SCORE;
  const currentLevelIndex = LEVEL_ORDER.indexOf(currentLevel);
  const highestLevelIndex = LEVEL_ORDER.indexOf(highestUnlockedLevel);
  const canAdvanceToNextLevel = passed && currentLevelIndex < highestLevelIndex;
  const hasNextLevel = currentLevelIndex < LEVEL_ORDER.length - 1;

  const levelConfig = LEVEL_CONFIG[currentLevel];
  const LevelIcon = levelConfig.icon;
  const progress_percent = questions.length > 0 ? ((currentIndex + 1) / QUESTIONS_PER_GAME) * 100 : 0;

  // Setup/Idle Screen
  if (gameState === "idle") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 pb-20">
        {/* Header */}
        <div className="bg-white dark:bg-gray-900 px-4 py-6 border-b border-gray-200 dark:border-gray-700 ios-safe-top">
          <div className="flex items-center gap-3 mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate?.('home')}
              className="h-11 w-11 bg-accent/50 dark:bg-accent/30 hover:bg-accent dark:hover:bg-accent shadow-lg hover:shadow-xl transition-all duration-300 rounded-full"
              data-testid="button-back-to-home"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-foreground">Bible Trivia</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Test your Biblical knowledge</p>
            </div>
          </div>
        </div>

        <div className="p-6 max-w-2xl mx-auto space-y-6">
          {/* Error banner */}
          {error && (
            <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
              <CardContent className="p-4">
                <strong className="text-red-800 dark:text-red-400">Error</strong>
                <p className="text-sm text-red-700 dark:text-red-300 mt-1">{error}</p>
              </CardContent>
            </Card>
          )}

          {/* Level Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Choose Your Level</CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Answer {QUESTIONS_PER_GAME} questions. Score {PASSING_SCORE} or more to unlock the next level.
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              {LEVEL_ORDER.map((level, index) => {
                const config = LEVEL_CONFIG[level];
                const Icon = config.icon;
                const locked = LEVEL_ORDER.indexOf(level) > LEVEL_ORDER.indexOf(highestUnlockedLevel);
                const isSelected = currentLevel === level;

                return (
                  <button
                    key={level}
                    disabled={locked || loading}
                    onClick={() => setCurrentLevel(level)}
                    className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                        : locked
                        ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 opacity-60 cursor-not-allowed'
                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer'
                    }`}
                    data-testid={`button-level-${level}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br ${config.gradient}`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-foreground flex items-center gap-2">
                            {config.name}
                            {locked && <Lock className="w-4 h-4 text-gray-400" />}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{config.description}</p>
                        </div>
                      </div>
                      {isSelected && !locked && (
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">✓</div>
                      )}
                    </div>
                  </button>
                );
              })}
            </CardContent>
          </Card>

          {/* Start Button */}
          <Button
            onClick={handleStartGame}
            disabled={loading}
            className="w-full h-14 text-lg font-semibold"
            data-testid="button-start-game"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                Preparing Questions...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Start {levelConfig.name} Trivia
              </>
            )}
          </Button>
        </div>
      </div>
    );
  }

  // Playing Screen
  if (gameState === "playing" && currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 pb-20">
        {/* Header */}
        <div className="bg-white dark:bg-gray-900 px-4 py-4 border-b border-gray-200 dark:border-gray-700 ios-safe-top">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setGameState("idle")}
                className="h-9 w-9"
                data-testid="button-quit-game"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <span className="text-sm font-medium">Question {currentIndex + 1}/{QUESTIONS_PER_GAME}</span>
                <Badge className={`ml-2 ${levelConfig.color}`} data-testid="badge-level-indicator">
                  <LevelIcon className="w-3 h-3 mr-1" />
                  {levelConfig.name}
                </Badge>
              </div>
            </div>
            
            <div className="text-sm font-medium">
              Score: <strong>{score}</strong>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${levelConfig.gradient} transition-all duration-300`}
              style={{ width: `${progress_percent}%` }}
            />
          </div>
        </div>

        <div className="p-6 max-w-2xl mx-auto">
          {/* Question Card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg leading-relaxed">{currentQuestion.question}</CardTitle>
              {currentQuestion.verse && (
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">
                  Reference: {currentQuestion.verse}
                </p>
              )}
            </CardHeader>
            <CardContent className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedIndex === index;
                const isCorrect = index === currentQuestion.correctAnswer;
                const showResult = selectedIndex !== null;

                return (
                  <button
                    key={index}
                    onClick={() => handleSelectOption(index)}
                    disabled={selectedIndex !== null}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                      showResult
                        ? isCorrect
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                          : isSelected
                          ? 'border-red-500 bg-red-50 dark:bg-red-900/30'
                          : 'border-gray-200 dark:border-gray-700'
                        : isSelected
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                    } ${selectedIndex !== null ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    data-testid={`button-answer-${index}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                        showResult
                          ? isCorrect
                            ? 'bg-green-500 text-white'
                            : isSelected
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-800'
                          : isSelected
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-800'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="flex-1">{option}</span>
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

          {/* Explanation */}
          {selectedIndex !== null && currentQuestion.explanation && (
            <Card className="mb-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-4">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Explanation: </span>
                  {currentQuestion.explanation}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Next Button */}
          {selectedIndex !== null && (
            <Button
              onClick={handleNextQuestion}
              className="w-full"
              size="lg"
              data-testid="button-next-question"
            >
              {isLastQuestion ? 'See Results' : 'Next Question'}
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Results Screen
  if (gameState === "finished") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 pb-20">
        {/* Header */}
        <div className="bg-white dark:bg-gray-900 px-4 py-6 border-b border-gray-200 dark:border-gray-700 ios-safe-top">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onNavigate?.('home')}
                className="h-11 w-11 bg-accent/50 dark:bg-accent/30 hover:bg-accent dark:hover:bg-accent shadow-lg hover:shadow-xl transition-all duration-300 rounded-full"
                data-testid="button-back-to-home"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-foreground">Results</h1>
            </div>
            
            <Badge className={levelConfig.color} data-testid="badge-current-level">
              <LevelIcon className="w-3 h-3 mr-1" />
              {levelConfig.name}
            </Badge>
          </div>
        </div>

        <div className="p-6 max-w-2xl mx-auto">
          {/* Results Card */}
          <Card className="mb-6">
            <CardHeader className="text-center">
              <div className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-br ${levelConfig.gradient} rounded-full flex items-center justify-center`}>
                <Award className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl mb-2">
                {passed ? "Great Job! 🎉" : "Keep Going! 💪"}
              </CardTitle>
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {score}/{QUESTIONS_PER_GAME}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {passed
                  ? `You passed the ${levelConfig.name} level!`
                  : `You need ${PASSING_SCORE} correct answers to pass this level.`}
              </p>
            </CardHeader>
          </Card>

          {/* Congratulations for Completing Level */}
          {passed && (
            <Card className={`mb-6 bg-gradient-to-br ${levelConfig.gradient} text-white border-0`}>
              <CardContent className="p-6 text-center">
                <Trophy className="w-12 h-12 mx-auto mb-3" />
                <h2 className="text-xl font-bold mb-2">Congratulations!</h2>
                <p className="text-sm opacity-90 mb-2">
                  You passed the {levelConfig.name} level with a score of {score}/{QUESTIONS_PER_GAME}!
                </p>
                {justUnlockedLevel && (
                  <p className="text-sm font-semibold opacity-95 mt-3 pt-3 border-t border-white/30">
                    🎉 You've unlocked the {LEVEL_CONFIG[justUnlockedLevel].name} level!
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handlePlayAgainSameLevel}
              className="w-full h-12 font-semibold"
              data-testid="button-play-again"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              New Questions – Same Level
            </Button>

            {hasNextLevel && (
              <Button
                onClick={handleGoToNextLevel}
                disabled={currentLevelIndex >= highestLevelIndex}
                className="w-full h-12 font-semibold"
                variant={justUnlockedLevel ? "default" : "outline"}
                data-testid="button-next-level"
              >
                {justUnlockedLevel ? (
                  <>
                    <Star className="w-4 h-4 mr-2" />
                    Try {LEVEL_CONFIG[LEVEL_ORDER[currentLevelIndex + 1]].name} Level
                  </>
                ) : currentLevelIndex < highestLevelIndex ? (
                  <>Go to {LEVEL_CONFIG[LEVEL_ORDER[currentLevelIndex + 1]].name} Level</>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    Next Level Locked
                  </>
                )}
              </Button>
            )}

            <Button
              onClick={() => onNavigate?.('home')}
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

  return null;
}
