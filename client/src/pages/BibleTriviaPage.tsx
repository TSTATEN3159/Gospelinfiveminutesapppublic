import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Brain, Trophy, BookOpen, Star, RotateCcw, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "@/lib/translations";

interface TriviaQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  verse?: string;
  verseText?: string;
  difficulty: 'easy' | 'medium' | 'difficult';
}

interface TriviaStats {
  gamesPlayed: number;
  lastScore: number;
  lastLevel: string;
  bestScore: number;
  bestLevel: string;
}

interface BibleTriviaProps {
  onNavigate?: (page: string) => void;
  language?: string;
}

const difficultyColors = {
  easy: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400", 
  difficult: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
};

const getScoreLevel = (score: number, t: any): string => {
  if (score >= 9) return t.bibleExpert;
  if (score >= 7) return t.bibleScholar;
  if (score >= 5) return t.bibleStudent;
  return t.keepStudying;
};

const getLevelIcon = (level: string, t: any) => {
  if (level === t.bibleExpert) return <Trophy className="w-4 h-4 text-yellow-500" />;
  if (level === t.bibleScholar) return <Star className="w-4 h-4 text-blue-500" />;
  if (level === t.bibleStudent) return <BookOpen className="w-4 h-4 text-green-500" />;
  return <Brain className="w-4 h-4 text-gray-500" />;
};

export default function BibleTriviaPage({ onNavigate, language = "en" }: BibleTriviaProps) {
  const t = useTranslations(language);
  const { toast } = useToast();
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'difficult'>('easy');
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'results'>('setup');
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [stats, setStats] = useState<TriviaStats>({
    gamesPlayed: 0,
    lastScore: 0,
    lastLevel: "",
    bestScore: 0,
    bestLevel: ""
  });

  // Load stats from localStorage on component mount
  useEffect(() => {
    const savedStats = localStorage.getItem("bibleTriviaStats");
    if (savedStats) {
      try {
        setStats(JSON.parse(savedStats));
      } catch (e) {
        console.warn("Could not parse saved trivia stats");
      }
    }
  }, []);

  // Timer effect for questions - stops when answer is selected
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0 && selectedAnswer === null) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === 'playing' && selectedAnswer === null) {
      handleNextQuestion();
    }
  }, [timeLeft, gameState, selectedAnswer]);

  const generateQuestions = async () => {
    setLoading(true);
    try {
      const { apiUrl } = await import('@/lib/api-config');
      const response = await fetch(apiUrl('/api/bible-trivia'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ difficulty, count: 10 }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate questions');
      }

      const data = await response.json();
      if (data.success) {
        setQuestions(data.questions);
        setGameState('playing');
        setCurrentQuestionIndex(0);
        setAnswers([]);
        setTimeLeft(30);
      } else {
        throw new Error(data.error || 'Failed to generate questions');
      }
    } catch (error) {
      console.error('Error generating questions:', error);
      toast({
        title: "Error",
        description: t.failedToGenerateTriviaQuestions,
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
      // Game finished
      const score = newAnswers.reduce((total, answer, index) => {
        return total + (answer === questions[index]?.correctAnswer ? 1 : 0);
      }, 0);
      
      const level = getScoreLevel(score, t);
      const newStats = {
        gamesPlayed: stats.gamesPlayed + 1,
        lastScore: score,
        lastLevel: level,
        bestScore: Math.max(stats.bestScore, score),
        bestLevel: score > stats.bestScore ? level : stats.bestLevel
      };
      
      setStats(newStats);
      localStorage.setItem("bibleTriviaStats", JSON.stringify(newStats));
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

  if (gameState === 'results') {
    const finalLevel = getScoreLevel(score, t);
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
              <h1 className="text-2xl font-bold text-gray-900 dark:text-foreground">{t.bibleTriviaResults}</h1>
            </div>
          </div>
        </div>

        <div className="p-6 max-w-2xl mx-auto">
          {/* Results Card */}
          <Card className="mb-6">
            <CardHeader className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/40 rounded-full flex items-center justify-center">
                {getLevelIcon(finalLevel, t)}
              </div>
              <CardTitle className="text-2xl mb-2">{finalLevel}</CardTitle>
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {score}/10
              </div>
              <Badge className={difficultyColors[difficulty]} data-testid={`badge-difficulty-${difficulty}`}>
                {difficulty === 'easy' ? t.easy : difficulty === 'medium' ? t.medium : t.difficult} {t.level}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-foreground">{stats.gamesPlayed}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t.gamesPlayed}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-foreground">{stats.bestScore}/10</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t.bestScore}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white" 
              onClick={resetGame}
              data-testid="button-play-again"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              {t.playAgain}
            </Button>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => onNavigate?.('home')}
              data-testid="button-back-home"
            >
              {t.backToHome}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'playing' && currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 pb-20">
        {/* Header */}
        <div className="bg-white dark:bg-gray-900 px-4 py-6 border-b border-gray-200 dark:border-gray-700 ios-safe-top">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={resetGame}
                className="h-11 w-11 bg-accent/50 dark:bg-accent/30 hover:bg-accent dark:hover:bg-accent shadow-lg hover:shadow-xl transition-all duration-300 rounded-full"
                data-testid="button-back-to-setup"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-foreground">{t.bibleTriviaTitle}</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t.questionOf} {currentQuestionIndex + 1} / {questions.length}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className={`font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-gray-700 dark:text-gray-300'}`}>
                {timeLeft}s
              </span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="p-6 max-w-2xl mx-auto">
          {/* Question Card */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge className={difficultyColors[currentQuestion.difficulty]}>
                  {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
                </Badge>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {t.score}: {score}/{currentQuestionIndex}
                </span>
              </div>
              <CardTitle className="text-lg leading-relaxed" data-testid={`question-${currentQuestion.id}`}>
                {currentQuestion.question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedAnswer === index ? "default" : "outline"}
                    className={`w-full text-left justify-start p-4 h-auto ${
                      selectedAnswer === index ? 'bg-blue-600 text-white' : ''
                    }`}
                    onClick={() => handleAnswerSelect(index)}
                    data-testid={`answer-option-${index}`}
                  >
                    <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </Button>
                ))}
              </div>
              
              {currentQuestion.verse && (
                <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                  <div className="flex items-start gap-2">
                    <BookOpen className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-amber-900 dark:text-amber-100 uppercase tracking-wide mb-1">
                        {t.hint || "Hint"}
                      </p>
                      <p className="text-sm text-amber-800 dark:text-amber-200">
                        {t.checkBook || "Check"} {currentQuestion.verse.split(' ')[0]}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Next Button */}
          <Button 
            className="w-full bg-amber-600 hover:bg-amber-700 text-white" 
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
            data-testid="button-next-question"
          >
            {currentQuestionIndex === questions.length - 1 ? t.finishQuiz : t.nextQuestion}
          </Button>
        </div>
      </div>
    );
  }

  // Setup screen
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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-foreground">{t.bibleTriviaTitle}</h1>
            <p className="text-gray-600 dark:text-gray-400">{t.testBiblicalKnowledge}</p>
          </div>
        </div>

        {/* User Status */}
        {stats.gamesPlayed > 0 && (
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4" data-testid="user-status-display">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getLevelIcon(stats.lastLevel, t)}
                <div>
                  <div className="font-medium text-blue-900 dark:text-blue-100">
                    {t.latest}: {stats.lastLevel}
                  </div>
                  <div className="text-sm text-blue-700 dark:text-blue-300">
                    {t.lastScore}: {stats.lastScore}/10
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-blue-900 dark:text-blue-100">
                  {t.best}: {stats.bestLevel}
                </div>
                <div className="text-sm text-blue-700 dark:text-blue-300">
                  {stats.bestScore}/10 • {stats.gamesPlayed} {t.games}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 max-w-2xl mx-auto">
        {/* Difficulty Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-blue-600" />
              {t.chooseDifficultyLevel}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {(['easy', 'medium', 'difficult'] as const).map((level) => (
                <Button
                  key={level}
                  variant={difficulty === level ? "default" : "outline"}
                  className={`w-full justify-start p-4 h-auto ${
                    difficulty === level ? 'bg-blue-600 text-white' : ''
                  }`}
                  onClick={() => setDifficulty(level)}
                  data-testid={`difficulty-${level}`}
                >
                  <div className="text-left">
                    <div className="font-medium">
                      {level === 'easy' ? t.easy : level === 'medium' ? t.medium : t.difficult}
                    </div>
                    <div className="text-sm opacity-70">
                      {level === 'easy' && t.easyDescription}
                      {level === 'medium' && t.mediumDescription}
                      {level === 'difficult' && t.difficultDescription}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Scoring Guide */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-600" />
              {t.scoringGuide}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <span>{t.bibleExpert}</span>
                </div>
                <span className="text-gray-600 dark:text-gray-400">{t.correctAnswers9to10}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-blue-500" />
                  <span>{t.bibleScholar}</span>
                </div>
                <span className="text-gray-600 dark:text-gray-400">{t.correctAnswers7to8}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-green-500" />
                  <span>{t.bibleStudent}</span>
                </div>
                <span className="text-gray-600 dark:text-gray-400">{t.correctAnswers5to6}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-gray-500" />
                  <span>{t.keepStudying}</span>
                </div>
                <span className="text-gray-600 dark:text-gray-400">{t.correctAnswers1to4}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Start Button */}
        <Button 
          className="w-full bg-amber-600 hover:bg-amber-700 text-white" 
          onClick={generateQuestions}
          disabled={loading}
          data-testid="button-start-trivia"
        >
          {loading ? t.generatingQuestions : t.startTrivia10Questions}
        </Button>
      </div>
    </div>
  );
}