import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Brain, RotateCcw, CheckCircle, Pause, Volume2, Flame } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MemoryVerse {
  id: string;
  text: string;
  reference: string;
  difficulty: 'easy' | 'medium' | 'hard';
  theme: string;
}

// Curated memory verses with different difficulty levels
const MEMORY_VERSES: MemoryVerse[] = [
  {
    id: '1',
    text: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.',
    reference: 'John 3:16',
    difficulty: 'easy',
    theme: 'Salvation'
  },
  {
    id: '2', 
    text: 'Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.',
    reference: 'Proverbs 3:5-6',
    difficulty: 'medium',
    theme: 'Trust'
  },
  {
    id: '3',
    text: 'I can do all this through him who gives me strength.',
    reference: 'Philippians 4:13',
    difficulty: 'easy',
    theme: 'Strength'
  },
  {
    id: '4',
    text: 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.',
    reference: 'Romans 8:28',
    difficulty: 'medium',
    theme: 'Hope'
  },
  {
    id: '5',
    text: 'The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul.',
    reference: 'Psalm 23:1-3',
    difficulty: 'hard',
    theme: 'Peace'
  },
  {
    id: '6',
    text: 'Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.',
    reference: 'Joshua 1:9',
    difficulty: 'medium',
    theme: 'Courage'
  }
];

export default function ScriptureMemorySection() {
  const { toast } = useToast();
  const [currentVerse, setCurrentVerse] = useState<MemoryVerse>(MEMORY_VERSES[0]);
  const [memoryMode, setMemoryMode] = useState<'full' | 'partial' | 'test'>('full');
  const [completedVerses, setCompletedVerses] = useState<Set<string>>(new Set());
  const [currentStreak, setCurrentStreak] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('scriptureMemoryProgress');
    if (saved) {
      try {
        const progress = JSON.parse(saved);
        setCompletedVerses(new Set(progress.completed || []));
        setCurrentStreak(progress.streak || 0);
      } catch (e) {
        console.warn('Could not load scripture memory progress');
      }
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = (completed: Set<string>, streak: number) => {
    localStorage.setItem('scriptureMemoryProgress', JSON.stringify({
      completed: Array.from(completed),
      streak,
      lastUpdated: new Date().toISOString()
    }));
  };

  // Get partial verse with blanks for memorization (consistent blanking based on verse ID)
  const getPartialVerse = (text: string, verseId: string) => {
    const words = text.split(' ');
    
    // Adjust difficulty based on verse difficulty level
    const blankRatio = currentVerse.difficulty === 'easy' ? 0.2 : 
                      currentVerse.difficulty === 'medium' ? 0.3 : 0.4;
    const numBlanks = Math.floor(words.length * blankRatio);
    
    // Use verse ID as seed for consistent blanking
    const seed = verseId.charCodeAt(0) + words.length;
    const blankIndices = new Set<number>();
    
    // Deterministic selection of words to blank out (but not first/last word)
    for (let i = 0; i < numBlanks; i++) {
      const randomIndex = ((seed + i * 7) % (words.length - 2)) + 1;
      blankIndices.add(randomIndex);
    }
    
    return words.map((word, index) => 
      blankIndices.has(index) ? '_____' : word
    ).join(' ');
  };

  const selectNewVerse = () => {
    // Prioritize unmemorized verses
    const unmemorizedVerses = MEMORY_VERSES.filter(v => 
      v.id !== currentVerse.id && !completedVerses.has(v.id)
    );
    
    const availableVerses = unmemorizedVerses.length > 0 ? unmemorizedVerses : 
      MEMORY_VERSES.filter(v => v.id !== currentVerse.id);
    
    const randomVerse = availableVerses[Math.floor(Math.random() * availableVerses.length)];
    setCurrentVerse(randomVerse);
    setMemoryMode('full');
  };

  const markAsMemorized = () => {
    const today = new Date().toDateString();
    const lastUpdated = localStorage.getItem('scriptureMemoryLastDate');
    
    const newCompleted = new Set(Array.from(completedVerses).concat([currentVerse.id]));
    let newStreak = currentStreak;
    
    // Only increment streak once per day
    if (lastUpdated !== today) {
      newStreak = currentStreak + 1;
      localStorage.setItem('scriptureMemoryLastDate', today);
    }
    
    setCompletedVerses(newCompleted);
    setCurrentStreak(newStreak);
    saveProgress(newCompleted, newStreak);

    toast({
      title: "Verse Memorized!",
      description: `Great work! You've memorized ${currentVerse.reference}. Streak: ${newStreak}`,
    });

    // Auto-select new verse after a moment
    setTimeout(selectNewVerse, 2000);
  };

  const resetProgress = () => {
    setCompletedVerses(new Set());
    setCurrentStreak(0);
    saveProgress(new Set(), 0);
    setMemoryMode('full');
    
    toast({
      title: "Progress Reset",
      description: "Your memorization progress has been reset.",
    });
  };

  // Simple text-to-speech for verse reading
  const speakVerse = () => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        speechSynthesis.cancel();
        setIsPlaying(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(`${currentVerse.text} ${currentVerse.reference}`);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      speechSynthesis.speak(utterance);
    } else {
      toast({
        title: "Audio Not Available",
        description: "Text-to-speech is not supported in your browser.",
        variant: "destructive"
      });
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDisplayText = () => {
    switch (memoryMode) {
      case 'full':
        return currentVerse.text;
      case 'partial':
        return getPartialVerse(currentVerse.text, currentVerse.id);
      case 'test':
        return ''; // Just show reference for testing
      default:
        return currentVerse.text;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-foreground">Scripture Memory Helper</h3>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="flex items-center gap-1" data-testid="text-completed">
            <CheckCircle className="w-4 h-4 text-green-600" />
            {completedVerses.size} memorized
          </span>
          <span className="flex items-center gap-1 text-purple-600 font-semibold" data-testid="text-streak">
            <Flame className="w-4 h-4 fill-current" />
            {currentStreak} streak
          </span>
        </div>
      </div>

      <Card>
        <CardContent className="p-4 space-y-4">
          {/* Verse Display */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <Badge className={getDifficultyColor(currentVerse.difficulty)} data-testid="badge-difficulty">
                {currentVerse.difficulty}
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700" data-testid="badge-theme">
                {currentVerse.theme}
              </Badge>
              {completedVerses.has(currentVerse.id) && (
                <Badge className="bg-green-100 text-green-800" data-testid="badge-memorized">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Memorized
                </Badge>
              )}
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 min-h-[120px] flex flex-col justify-center">
              {memoryMode === 'test' ? (
                <div className="text-center">
                  <p className="text-gray-500 text-sm mb-2">Try reciting from memory:</p>
                  <p className="font-semibold text-lg text-purple-700">{currentVerse.reference}</p>
                  <Button
                    variant="outline"
                    className="mt-3"
                    onClick={() => setMemoryMode('full')}
                    data-testid="button-show-verse"
                  >
                    Show Verse
                  </Button>
                </div>
              ) : (
                <>
                  <p className="text-sm md:text-base leading-relaxed text-gray-800 mb-2">
                    "{getDisplayText()}"
                  </p>
                  <p className="font-semibold text-purple-700">
                    — {currentVerse.reference}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap gap-2 justify-center">
            <Button 
              variant="outline"
              onClick={() => setMemoryMode(memoryMode === 'full' ? 'partial' : 'full')}
              disabled={memoryMode === 'test'}
              data-testid="button-mode-toggle"
            >
              {memoryMode === 'full' ? 'Practice Mode' : 'Show Full'}
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => setMemoryMode(memoryMode === 'test' ? 'full' : 'test')}
              data-testid="button-test-toggle"
            >
              {memoryMode === 'test' ? 'Stop Test' : 'Test Yourself'}
            </Button>

            <Button 
              variant="outline"
              onClick={speakVerse}
              className="flex items-center gap-1"
              data-testid="button-speak"
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
              {isPlaying ? 'Stop' : 'Listen'}
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 justify-center pt-2 border-t">
            <Button 
              onClick={markAsMemorized}
              className="bg-green-600 text-white"
              disabled={completedVerses.has(currentVerse.id)}
              data-testid="button-mark-memorized"
            >
              <CheckCircle className="w-3 h-3 mr-1" />
              {completedVerses.has(currentVerse.id) ? 'Already Memorized' : 'Mark as Memorized'}
            </Button>
            
            <Button 
              variant="outline"
              onClick={selectNewVerse}
              data-testid="button-new-verse"
            >
              <RotateCcw className="w-3 h-3 mr-1" />
              New Verse
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Progress Section */}
      {completedVerses.size > 0 && (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-3">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-green-800">Memory Progress</span>
            <Button 
              variant="ghost"
              onClick={resetProgress}
              className="text-xs text-gray-500"
              data-testid="button-reset-progress"
            >
              Reset
            </Button>
          </div>
          <Progress 
            value={(completedVerses.size / MEMORY_VERSES.length) * 100} 
            className="mt-2 h-2"
            data-testid="progress-memory"
          />
          <p className="text-xs text-green-700 mt-1">
            {completedVerses.size} of {MEMORY_VERSES.length} verses memorized
          </p>
        </div>
      )}
    </div>
  );
}