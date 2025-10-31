import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Flame, BookOpen, Check, ChevronLeft, ChevronRight, Loader2, Share2, Bookmark } from "lucide-react";
import AppLogo from "../components/AppLogo";
import PersonalizedGreeting from "../components/PersonalizedGreeting";
import { Capacitor } from '@capacitor/core';
import { apiUrl } from '@/lib/api-config';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  birthMonth: string;
  birthDay: string;
  phone?: string;
  appUserId?: string;
}

interface DailyDevotionalPageProps {
  user?: User;
  onNavigate?: (page: string) => void;
  streakDays?: number;
  language?: string;
}

interface Devotional {
  id: string;
  dayNumber: number;
  gender: 'men' | 'women';
  language: string;
  title: string;
  mainScripture: string;
  mainScriptureText: string;
  devotionalContent: string;
  supportingVerse1: string;
  supportingVerse1Text: string;
  supportingVerse2: string;
  supportingVerse2Text: string;
}

interface DevotionalProgress {
  id: string;
  userId: string;
  gender: 'men' | 'women';
  currentDay: number;
  completedDays: string[];
  lastReadDate: string | null;
  currentStreak: number;
  longestStreak: number;
  totalDaysCompleted: number;
}

export default function DailyDevotionalPage({ user, onNavigate, streakDays = 0, language = "en" }: DailyDevotionalPageProps) {
  const { toast } = useToast();
  
  // State
  const [selectedGender, setSelectedGender] = useState<'men' | 'women'>('men');
  const [devotional, setDevotional] = useState<Devotional | null>(null);
  const [progress, setProgress] = useState<DevotionalProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);
  const [showSupportingVerse, setShowSupportingVerse] = useState<{ verse: string; text: string } | null>(null);
  const [showGenderSelection, setShowGenderSelection] = useState(false);

  // Load gender preference from localStorage
  useEffect(() => {
    const savedGender = localStorage.getItem('devotionalGender') as 'men' | 'women' | null;
    if (savedGender) {
      setSelectedGender(savedGender);
    } else {
      // Show gender selection on first visit
      setShowGenderSelection(true);
    }
  }, []);

  // Load devotional and progress when gender or user changes
  useEffect(() => {
    if (selectedGender && !showGenderSelection) {
      loadDevotionalData();
    }
  }, [selectedGender, user?.appUserId, showGenderSelection]);

  const loadDevotionalData = async () => {
    setLoading(true);
    try {
      // Load progress first (creates if doesn't exist)
      let progressData: DevotionalProgress | null = null;
      
      if (user?.appUserId) {
        const progressRes = await fetch(apiUrl(`/api/devotional/progress/${user.appUserId}/${selectedGender}`));
        if (progressRes.ok) {
          progressData = await progressRes.json();
          setProgress(progressData);
        }
      }

      // Load devotional for current day
      const currentDay = progressData?.currentDay || 1;
      const devotionalRes = await fetch(apiUrl(`/api/devotional/${selectedGender}/${currentDay}?language=${language}`));
      
      if (devotionalRes.ok) {
        const devotionalData = await devotionalRes.json();
        setDevotional(devotionalData);
      } else {
        const error = await devotionalRes.json();
        toast({
          title: "Devotional Not Available",
          description: error.error || "This devotional is not yet available. Check back soon!",
          variant: "default"
        });
      }
    } catch (error) {
      console.error("Error loading devotional:", error);
      toast({
        title: "Error Loading Devotional",
        description: "Please check your connection and try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGenderSelect = (gender: 'men' | 'women') => {
    setSelectedGender(gender);
    localStorage.setItem('devotionalGender', gender);
    setShowGenderSelection(false);
  };

  const handleCompleteDay = async () => {
    if (!user?.appUserId || !devotional) {
      toast({
        title: "Sign In Required",
        description: "Please create an account to track your devotional progress.",
        variant: "default"
      });
      return;
    }

    setCompleting(true);
    try {
      const response = await fetch(apiUrl('/api/devotional/complete'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.appUserId,
          gender: selectedGender,
          dayNumber: devotional.dayNumber
        })
      });

      if (response.ok) {
        const result = await response.json();
        setProgress(result.progress);
        
        // Show streak message
        toast({
          title: "Day Complete! 🎉",
          description: result.message,
          variant: "default"
        });

        // Load next day's devotional
        setTimeout(() => {
          loadDevotionalData();
        }, 1500);
      } else {
        const error = await response.json();
        toast({
          title: "Error",
          description: error.error || "Could not complete devotional",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error completing devotional:", error);
      toast({
        title: "Error",
        description: "Please check your connection and try again.",
        variant: "destructive"
      });
    } finally {
      setCompleting(false);
    }
  };

  const handleShare = async () => {
    if (!devotional) return;

    const shareText = `${devotional.title}\n\n${devotional.mainScripture}\n"${devotional.mainScriptureText}"\n\nGet daily devotionals with The Gospel in 5 Minutes app!`;

    if (Capacitor.isNativePlatform()) {
      const { Share } = await import('@capacitor/share');
      await Share.share({
        title: devotional.title,
        text: shareText,
        dialogTitle: 'Share Devotional'
      });
    } else {
      if (navigator.share) {
        await navigator.share({
          title: devotional.title,
          text: shareText
        });
      } else {
        navigator.clipboard.writeText(shareText);
        toast({
          title: "Copied!",
          description: "Devotional copied to clipboard",
          variant: "default"
        });
      }
    }
  };

  const isCompleted = progress?.completedDays?.includes(devotional?.dayNumber.toString() || '');

  return (
    <div className="min-h-screen pb-20 bg-gradient-to-b from-background to-accent/10">
      {/* Header */}
      <div className="bg-background px-4 py-6 border-b border-border ios-safe-top sticky top-0 z-10">
        {/* Top Row: Back Button, Gender Track, Streak */}
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate?.('daily')}
            className="ios-tap-target"
            data-testid="button-back-to-daily"
            aria-label="Back to Daily hub"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowGenderSelection(true)}
            className="text-xs"
            data-testid="button-change-track"
          >
            {selectedGender === 'men' ? "Men's" : "Women's"} Track
          </Button>
          
          <div className="flex items-center gap-1.5 bg-gradient-to-br from-red-50 to-red-100/70 dark:from-red-950 dark:to-red-900 px-2.5 py-1 rounded-full border border-red-200/50 dark:border-red-800/50 shadow-sm">
            <Flame className="w-4 h-4 text-red-600 fill-red-600 dark:text-red-400 dark:fill-red-400" />
            <span className="text-sm font-bold text-red-700 dark:text-red-300">{progress?.currentStreak || 0}</span>
          </div>
        </div>
        
        {/* Logo */}
        <AppLogo onNavigate={onNavigate} size="medium" className="mb-3" />
        
        {/* Greeting */}
        <PersonalizedGreeting user={user} language={language} />
        
        <h1 className="text-center text-2xl font-bold text-foreground mt-4">Daily Devotional</h1>
        <p className="text-center text-sm text-muted-foreground mt-1">
          Day {progress?.currentDay || 1} of 365
        </p>
      </div>

      {/* Gender Selection Modal */}
      <Dialog open={showGenderSelection} onOpenChange={setShowGenderSelection}>
        <DialogContent className="max-w-md" data-testid="dialog-gender-selection">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">Choose Your Track</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-4">
            <p className="text-center text-muted-foreground text-sm">
              Our devotionals are tailored for men and women, addressing unique spiritual journeys and challenges.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => handleGenderSelect('men')}
                variant={selectedGender === 'men' ? 'default' : 'outline'}
                className="h-20"
                data-testid="button-select-men"
              >
                <div className="text-center">
                  <div className="text-lg font-bold">Men's</div>
                  <div className="text-xs opacity-80">Track</div>
                </div>
              </Button>
              <Button
                onClick={() => handleGenderSelect('women')}
                variant={selectedGender === 'women' ? 'default' : 'outline'}
                className="h-20"
                data-testid="button-select-women"
              >
                <div className="text-center">
                  <div className="text-lg font-bold">Women's</div>
                  <div className="text-xs opacity-80">Track</div>
                </div>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Supporting Verse Modal */}
      <Dialog open={!!showSupportingVerse} onOpenChange={() => setShowSupportingVerse(null)}>
        <DialogContent className="max-w-md" data-testid="dialog-supporting-verse">
          <DialogHeader>
            <DialogTitle className="text-center">{showSupportingVerse?.verse}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-center text-lg leading-relaxed text-foreground italic">
              "{showSupportingVerse?.text}"
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Content */}
      <div className="px-4 py-6 max-w-3xl mx-auto space-y-6">
        {loading ? (
          <Card className="text-center py-12">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
            <p className="text-muted-foreground mt-4">Loading devotional...</p>
          </Card>
        ) : devotional ? (
          <>
            {/* Progress Stats */}
            <div className="grid grid-cols-3 gap-3">
              <Card className="text-center">
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold text-primary">{progress?.currentStreak || 0}</div>
                  <div className="text-xs text-muted-foreground">Current Streak</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold text-primary">{progress?.longestStreak || 0}</div>
                  <div className="text-xs text-muted-foreground">Best Streak</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold text-primary">{progress?.totalDaysCompleted || 0}</div>
                  <div className="text-xs text-muted-foreground">Days Done</div>
                </CardContent>
              </Card>
            </div>

            {/* Main Devotional Card */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{devotional.title}</CardTitle>
                    <Badge variant="secondary" className="mb-4">
                      Day {devotional.dayNumber}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleShare}
                    data-testid="button-share-devotional"
                  >
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Main Scripture */}
                <div className="bg-accent/20 p-4 rounded-lg border-l-4 border-primary">
                  <div className="text-sm font-semibold text-primary mb-2">{devotional.mainScripture}</div>
                  <p className="text-lg leading-relaxed italic text-foreground">
                    "{devotional.mainScriptureText}"
                  </p>
                </div>

                {/* Devotional Content */}
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  {devotional.devotionalContent.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="text-foreground leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Supporting Verses */}
                <div className="border-t pt-4">
                  <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Supporting Verses
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowSupportingVerse({
                        verse: devotional.supportingVerse1,
                        text: devotional.supportingVerse1Text
                      })}
                      className="justify-start text-left h-auto py-2"
                      data-testid="button-supporting-verse-1"
                    >
                      <div className="text-sm text-primary">{devotional.supportingVerse1}</div>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowSupportingVerse({
                        verse: devotional.supportingVerse2,
                        text: devotional.supportingVerse2Text
                      })}
                      className="justify-start text-left h-auto py-2"
                      data-testid="button-supporting-verse-2"
                    >
                      <div className="text-sm text-primary">{devotional.supportingVerse2}</div>
                    </Button>
                  </div>
                </div>

                {/* Complete Button */}
                <Button
                  onClick={handleCompleteDay}
                  disabled={completing || isCompleted || !user?.appUserId}
                  className="w-full h-12"
                  data-testid="button-complete-day"
                >
                  {completing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Completing...
                    </>
                  ) : isCompleted ? (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Completed Today
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Mark Complete
                    </>
                  )}
                </Button>

                {!user?.appUserId && (
                  <p className="text-xs text-center text-muted-foreground">
                    Sign in to track your progress and build streaks
                  </p>
                )}
              </CardContent>
            </Card>
          </>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Devotional Available</h3>
              <p className="text-muted-foreground">
                We're working on adding more devotional content. Check back soon!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
