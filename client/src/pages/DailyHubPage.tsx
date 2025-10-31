import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, BookOpen, Flame, ChevronRight } from "lucide-react";
import AppLogo from "../components/AppLogo";
import PersonalizedGreeting from "../components/PersonalizedGreeting";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useState, useEffect } from "react";
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

interface DailyHubPageProps {
  user?: User;
  onNavigate?: (page: string) => void;
  streakDays?: number;
  language?: string;
}

export default function DailyHubPage({ user, onNavigate, streakDays = 0, language = "en" }: DailyHubPageProps) {
  const [devotionalProgress, setDevotionalProgress] = useState<any>(null);
  const [readingProgress, setReadingProgress] = useState<any>(null);

  useEffect(() => {
    if (user?.appUserId) {
      loadProgress();
    }
  }, [user?.appUserId]);

  const loadProgress = async () => {
    try {
      // Load devotional progress
      const gender = localStorage.getItem('devotionalGender') || 'men';
      const devRes = await fetch(apiUrl(`/api/devotional/progress/${user?.appUserId}/${gender}`));
      if (devRes.ok) {
        setDevotionalProgress(await devRes.json());
      }

      // Load reading plan progress
      const readRes = await fetch(apiUrl(`/api/reading-plans/bible-in-1-year/progress/${user?.appUserId}`));
      if (readRes.ok) {
        setReadingProgress(await readRes.json());
      }
    } catch (error) {
      console.error('Failed to load progress:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header - NOT sticky, scrolls with content */}
      <div className="bg-gradient-to-b from-primary/5 to-background px-4 pt-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <AppLogo size="small" />
          <ThemeToggle />
        </div>
        
        <PersonalizedGreeting user={user} language={language} />
        
        {/* Streak Badge */}
        {streakDays > 0 && (
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-lg border border-primary/20">
            <Flame className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              {streakDays} Day Streak
            </span>
          </div>
        )}
      </div>

      {/* Content - Scrolls freely */}
      <div className="px-4 py-6 space-y-4">
        {/* Daily Devotional Card */}
        <Card 
          className="overflow-hidden cursor-pointer hover-elevate active-elevate-2 transition-all"
          onClick={() => onNavigate?.('devotional')}
          data-testid="card-daily-devotional"
        >
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Daily Devotional
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  365-day journey through faith and scripture
                </p>
                
                {devotionalProgress && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">Day {devotionalProgress.currentDay} of 365</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span className="font-medium">{devotionalProgress.currentStreak} day streak</span>
                    </div>
                  </div>
                )}
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground mt-1" />
            </div>
          </div>
        </Card>

        {/* Bible in 1 Year Reading Plan Card */}
        <Card 
          className="overflow-hidden cursor-pointer hover-elevate active-elevate-2 transition-all"
          onClick={() => onNavigate?.('readingplans')}
          data-testid="card-reading-plan"
        >
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 bg-green-600 rounded-lg">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Bible in 1 Year
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Read the entire Bible with guided daily readings
                </p>
                
                {readingProgress && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">
                        {readingProgress.completedDays?.length || 0} of 365 days completed
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span className="font-medium">{readingProgress.currentStreak || 0} day streak</span>
                    </div>
                  </div>
                )}
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground mt-1" />
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        {(devotionalProgress || readingProgress) && (
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Your Progress</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {(devotionalProgress?.totalDaysCompleted || 0) + (readingProgress?.completedDays?.length || 0)}
                </p>
                <p className="text-xs text-muted-foreground">Total Days</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {Math.max(devotionalProgress?.longestStreak || 0, readingProgress?.currentStreak || 0)}
                </p>
                <p className="text-xs text-muted-foreground">Longest Streak</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
