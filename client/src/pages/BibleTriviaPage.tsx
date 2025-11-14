import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Brain, Trophy, BookOpen, Star, RotateCcw, Clock, Sparkles, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "@/lib/translations";
import { useBibleTriviaMutation } from "@/hooks/useTrivia";
import { runSafely } from "@/utils/featureGuard";

interface TriviaQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  verse?: string | null;
  verseText?: string | null;
  explanation?: string | null;
  level: 'beginner' | 'student' | 'scholar' | 'expert';
}

interface TriviaProgress {
  totalCorrect: number;
  currentLevel: 'beginner' | 'student' | 'scholar' | 'expert';
  gamesPlayed: number;
  lastScore: number;
  bestScore: number;
}

interface BibleTriviaProps {
  onNavigate?: (page: string) => void;
  language?: string;
}

const LEVEL_CONFIG = {
  beginner: {
    name: 'Beginner',
    color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    icon: BookOpen,
    questionsRequired: 0,
    nextLevelAt: 20,
    gradient: 'from-green-400 to-emerald-500'
  },
  student: {
    name: 'Student',
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    icon: Brain,
    questionsRequired: 20,
    nextLevelAt: 40,
    gradient: 'from-blue-400 to-cyan-500'
  },
  scholar: {
    name: 'Scholar',
    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    icon: Star,
    questionsRequired: 40,
    nextLevelAt: 60,
    gradient: 'from-purple-400 to-pink-500'
  },
  expert: {
    name: 'Expert',
    color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    icon: Trophy,
    questionsRequired: 60,
    nextLevelAt: Infinity,
    gradient: 'from-amber-400 to-orange-500'
  }
};

function calculateLevel(totalCorrect: number): 'beginner' | 'student' | 'scholar' | 'expert' {
  if (totalCorrect >= 60) return 'expert';
  if (totalCorrect >= 40) return 'scholar';
  if (totalCorrect >= 20) return 'student';
  return 'beginner';
}

export default function BibleTriviaPage({ onNavigate, language = "en" }: BibleTriviaProps) {
  const t = useTranslations(language);
  const { toast } = useToast();
  const triviaMutation = useBibleTriviaMutation();
  
  const [loading, setLoading] = useState(false);
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'results'>('setup');
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState<string | null>(null);
  
  const [progress, setProgress] = useState<TriviaProgress>({
    totalCorrect: 0,
    currentLevel: 'beginner',
    gamesPlayed: 0,
    lastScore: 0,
    bestScore: 0
  });

  // Load progress from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("bibleTriviaProgress");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setProgress({
          ...data,
          currentLevel: calculateLevel(data.totalCorrect)
        });
      } catch (e) {
        console.warn("Could not parse saved trivia progress");
      }
    }
  }, []);

  // Timer effect for questions
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0 && selectedAnswer === null) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === 'playing' && selectedAnswer === null) {
      handleNextQuestion();
    }
  }, [timeLeft, gameState, selectedAnswer]);

  // Auto-dismiss level-up popup after 5 seconds
  useEffect(() => {
    if (showLevelUp) {
      const timer = setTimeout(() => {
        setShowLevelUp(false);
        setNewLevel(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showLevelUp]);

  const generateQuestions = async () => {
    setLoading(true);

    try {
      const result = await runSafely(
        {
          featureName: "Bible Trivia",
          userMessage: "Sorry, I couldn't generate trivia questions. Please try again."
        },
        async () => await triviaMutation.mutateAsync({
          level: progress.currentLevel,
          count: 10,
          useAI: true
        })
      );

      if (!result) {
        toast({
          title: "Error",
          description: "Sorry, I couldn't generate trivia questions. Please try again.",
          variant: "destructive",
        });
        return;
      }

      if (result.questions) {
        setQuestions(result.questions);
        setGameState('playing');
        setCurrentQuestionIndex(0);
        setAnswers([]);
        setTimeLeft(30);
      }
    } catch (error) {
      console.error("Error starting Bible Trivia game:", error);
      toast({
        title: "Error",
        description: "Sorry, something went wrong starting the Bible Trivia game. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    const newAnswers = [...answers, selectedAnswer ?? -1];
    setAnswers(newAnswers);
    setSelectedAnswer(null);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(30);
    } else {
      // Game finished - calculate results
      const score = newAnswers.reduce((total, answer, index) => {
        return total + (answer === questions[index]?.correctAnswer ? 1 : 0);
      }, 0);
      
      const oldLevel = progress.currentLevel;
      const newTotalCorrect = progress.totalCorrect + score;
      const newCurrentLevel = calculateLevel(newTotalCorrect);
      
      const newProgress: TriviaProgress = {
        totalCorrect: newTotalCorrect,
        currentLevel: newCurrentLevel,
        gamesPlayed: progress.gamesPlayed + 1,
        lastScore: score,
        bestScore: Math.max(progress.bestScore, score)
      };
      
      setProgress(newProgress);
      localStorage.setItem("bibleTriviaProgress", JSON.stringify(newProgress));
      
      // Check if player leveled up
      if (oldLevel !== newCurrentLevel) {
        setNewLevel(newCurrentLevel);
        setShowLevelUp(true);
      }
      
      setGameState('results');
    }
  };

  const resetGame = () => {
    setGameState('setup');
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setTimeLeft(30);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const score = answers.reduce((total, answer, index) => {
    return total + (answer === questions[index]?.correctAnswer ? 1 : 0);
  }, 0);

  const levelConfig = LEVEL_CONFIG[progress.currentLevel];
  const LevelIcon = levelConfig.icon;
  const progressToNext = levelConfig.nextLevelAt === Infinity 
    ? 100 
    : Math.round(((progress.totalCorrect - levelConfig.questionsRequired) / 
        (levelConfig.nextLevelAt - levelConfig.questionsRequired)) * 100);

  // Level-Up Celebration Popup
  const LevelUpPopup = () => {
    if (!showLevelUp || !newLevel) return null;
    
    const newLevelConfig = LEVEL_CONFIG[newLevel as keyof typeof LEVEL_CONFIG];
    const NewLevelIcon = newLevelConfig.icon;
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
        <Card className={`max-w-md w-full bg-gradient-to-br ${newLevelConfig.gradient} text-white border-0 shadow-2xl animate-in zoom-in duration-500`}>
          <CardContent className="p-8 text-center">
            <div className="mb-4 inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-md">
              <NewLevelIcon className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Level Up!</h2>
            <p className="text-xl mb-4">You're now a</p>
            <div className="text-4xl font-black mb-4">{newLevelConfig.name}!</div>
            <div className="flex items-center justify-center gap-2 text-white/90">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm">Keep going to reach the next level!</span>
              <Sparkles className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  if (gameState === 'results') {
    const currentQuestion = questions[currentQuestionIndex] || questions[0];
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 pb-20">
        <LevelUpPopup />
        
        {/* Header */}
        <div className="bg-white dark:bg-gray-900 px-4 py-6 border-b border-gray-200 dark:border-gray-700 ios-safe-top">
          <div className="flex items-center justify-between gap-3 mb-4">
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
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-foreground">Results</h1>
              </div>
            </div>
            
            {/* Level Badge */}
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
              <CardTitle className="text-2xl mb-2">Game Complete!</CardTitle>
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {score}/10
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Correct: {progress.totalCorrect} questions
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-center mb-6">
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-foreground">{progress.gamesPlayed}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Games Played</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-foreground">{progress.bestScore}/10</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Best Score</div>
                </div>
              </div>
              
              {/* Progress to Next Level */}
              {levelConfig.nextLevelAt !== Infinity && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Progress to Next Level</span>
                    <span className="font-semibold">{progressToNext}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${levelConfig.gradient} transition-all duration-500`}
                      style={{ width: `${progressToNext}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {levelConfig.nextLevelAt - progress.totalCorrect} more correct answers to level up
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={resetGame}
              className="flex-1"
              data-testid="button-play-again"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Play Again
            </Button>
            <Button
              onClick={() => onNavigate?.('home')}
              variant="outline"
              className="flex-1"
              data-testid="button-home"
            >
              Home
            </Button>
          </div>

          {/* Review Answers */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Review Answers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {questions.map((q, index) => {
                const userAnswer = answers[index];
                const isCorrect = userAnswer === q.correctAnswer;
                
                return (
                  <div key={q.id} className={`p-4 rounded-lg border ${isCorrect ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'}`}>
                    <div className="flex items-start gap-2 mb-2">
                      {isCorrect ? (
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-bold">✓</div>
                      ) : (
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white text-sm font-bold">✗</div>
                      )}
                      <p className="text-sm font-medium">{q.question}</p>
                    </div>
                    <div className="ml-8">
                      <p className="text-sm">
                        <span className="font-semibold">Correct answer: </span>
                        {q.options[q.correctAnswer]}
                      </p>
                      {!isCorrect && userAnswer !== -1 && (
                        <p className="text-sm text-red-600 dark:text-red-400">
                          <span className="font-semibold">Your answer: </span>
                          {q.options[userAnswer]}
                        </p>
                      )}
                      {q.explanation && (
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                          {q.explanation}
                        </p>
                      )}
                      {q.verse && (
                        <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                          {q.verse} {q.verseText && `- "${q.verseText}"`}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (gameState === 'playing' && currentQuestion) {
    const progress_percent = ((currentQuestionIndex + 1) / questions.length) * 100;
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 pb-20">
        {/* Header with Level Badge */}
        <div className="bg-white dark:bg-gray-900 px-4 py-4 border-b border-gray-200 dark:border-gray-700 ios-safe-top">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={resetGame}
                className="h-9 w-9"
                data-testid="button-quit-game"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <span className="text-sm font-medium">
                Question {currentQuestionIndex + 1}/{questions.length}
              </span>
            </div>
            
            {/* Level Badge - Top Right */}
            <Badge className={levelConfig.color} data-testid="badge-level-indicator">
              <LevelIcon className="w-3 h-3 mr-1" />
              {levelConfig.name}
            </Badge>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
              style={{ width: `${progress_percent}%` }}
            />
          </div>
        </div>

        <div className="p-6 max-w-2xl mx-auto">
          {/* Timer Card */}
          <Card className="mb-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-medium">Time Remaining</span>
                </div>
                <div className={`text-2xl font-bold ${timeLeft <= 10 ? 'text-red-600 dark:text-red-400 animate-pulse' : 'text-blue-600 dark:text-blue-400'}`}>
                  {timeLeft}s
                </div>
              </div>
            </CardContent>
          </Card>

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
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                    selectedAnswer === index
                      ? index === currentQuestion.correctAnswer
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                        : 'border-red-500 bg-red-50 dark:bg-red-900/30'
                      : selectedAnswer !== null && index === currentQuestion.correctAnswer
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                  } ${selectedAnswer !== null ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  data-testid={`button-answer-${index}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                      selectedAnswer === index
                        ? index === currentQuestion.correctAnswer
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                        : selectedAnswer !== null && index === currentQuestion.correctAnswer
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-800'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="flex-1">{option}</span>
                    {selectedAnswer !== null && index === currentQuestion.correctAnswer && (
                      <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                    )}
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Next Button */}
          {selectedAnswer !== null && (
            <Button
              onClick={handleNextQuestion}
              className="w-full"
              size="lg"
              data-testid="button-next-question"
            >
              {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
            </Button>
          )}

          {/* Explanation */}
          {selectedAnswer !== null && currentQuestion.explanation && (
            <Card className="mt-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-4">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Explanation: </span>
                  {currentQuestion.explanation}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }

  // Setup Screen
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 px-4 py-6 border-b border-gray-200 dark:border-gray-700 ios-safe-top">
        <div className="flex items-center justify-between gap-3 mb-4">
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
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-foreground">Bible Trivia</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Test your Biblical knowledge</p>
            </div>
          </div>
          
          {/* Level Badge */}
          <Badge className={levelConfig.color} data-testid="badge-current-level">
            <LevelIcon className="w-3 h-3 mr-1" />
            {levelConfig.name}
          </Badge>
        </div>
      </div>

      <div className="p-6 max-w-2xl mx-auto">
        {/* Progress Card */}
        <Card className={`mb-6 bg-gradient-to-br ${levelConfig.gradient} text-white border-0`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold mb-1">Your Level: {levelConfig.name}</h2>
                <p className="text-white/90 text-sm">{progress.totalCorrect} questions answered correctly</p>
              </div>
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                <LevelIcon className="w-8 h-8 text-white" />
              </div>
            </div>
            
            {levelConfig.nextLevelAt !== Infinity && (
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress to {LEVEL_CONFIG[Object.keys(LEVEL_CONFIG)[Object.keys(LEVEL_CONFIG).indexOf(progress.currentLevel) + 1] as keyof typeof LEVEL_CONFIG].name}</span>
                  <span className="font-semibold">{progressToNext}%</span>
                </div>
                <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white transition-all duration-500"
                    style={{ width: `${progressToNext}%` }}
                  />
                </div>
                <p className="text-xs text-white/80 mt-1">
                  {levelConfig.nextLevelAt - progress.totalCorrect} more to level up
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Your Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-foreground">{progress.gamesPlayed}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Games</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-foreground">{progress.bestScore}/10</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Best Score</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-foreground">{progress.totalCorrect}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Total Correct</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="mb-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-1">
                  AI-Generated Questions
                </h3>
                <p className="text-sm text-blue-800 dark:text-blue-400">
                  Every game has brand new questions tailored to your {levelConfig.name} level. Questions get progressively harder as you level up!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Start Button */}
        <Button
          onClick={generateQuestions}
          disabled={loading}
          className="w-full h-14 text-lg font-semibold"
          data-testid="button-start-game"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
              Generating Questions...
            </>
          ) : (
            <>
              <Brain className="w-5 h-5 mr-2" />
              Start New Game
            </>
          )}
        </Button>

        {/* How to Play */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-base">How to Play</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <p>• Answer 10 Bible questions at your current level</p>
            <p>• You have 30 seconds per question</p>
            <p>• Each correct answer counts toward your next level</p>
            <p>• Level up by answering more questions correctly!</p>
            <p>• Levels: Beginner (0) → Student (20) → Scholar (40) → Expert (60)</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
