import { Button } from "@/components/ui/button";
import { Calendar, BookOpen, Flame } from "lucide-react";
import AppLogo from "../components/AppLogo";
import PersonalizedGreeting from "../components/PersonalizedGreeting";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { apiUrl } from '@/lib/api-config';

// Import images
import sunriseImage from '@assets/generated_images/Peaceful_sunrise_daily_verse_e2a3184e.png';
import forestPathImage from '@assets/generated_images/Forest_path_study_plans_fab1c678.png';

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
    <div className="min-h-screen pb-20">
      {/* Header - NOT sticky, scrolls with content */}
      <div className="bg-background px-4 py-6 border-b border-border">
        {/* Streak Badge - Top Right */}
        {streakDays > 0 && (
          <div className="flex justify-end mb-6">
            <div className="flex items-center gap-1.5 bg-gradient-to-br from-red-50 to-red-100/70 px-2.5 py-1 rounded-full border border-red-200/50 shadow-sm">
              <Flame className="w-4 h-4 text-red-600 fill-red-600" />
              <span className="text-sm font-bold text-red-700">{streakDays}</span>
            </div>
          </div>
        )}
        
        {/* Logo */}
        <AppLogo size="medium" className="mb-3" />
        
        {/* Personalized Greeting */}
        <PersonalizedGreeting user={user} language={language} />
      </div>

      {/* Content - Scrolls freely */}
      <div className="px-4 py-4 space-y-4">
        {/* Daily Devotional Tile */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg border-2 border-border">
          <div className="relative h-40">
            <img 
              src={sunriseImage}
              alt="Daily Devotional"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            {devotionalProgress && (
              <div className="absolute bottom-4 left-4 right-4">
                <Badge className="bg-blue-600 text-white text-xs mb-2">
                  <BookOpen className="w-3 h-3 mr-1" />
                  Day {devotionalProgress.currentDay} of 365
                </Badge>
              </div>
            )}
          </div>
          <div className="p-4">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Daily Devotional
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
              365-day journey through faith with daily scripture and reflections
            </p>
            {devotionalProgress && (
              <div className="flex items-center gap-4 mb-3 text-sm">
                <div className="flex items-center gap-1">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span className="text-gray-700 dark:text-gray-300">{devotionalProgress.currentStreak} day streak</span>
                </div>
                <div className="text-gray-500 dark:text-gray-400">
                  {devotionalProgress.totalDaysCompleted} completed
                </div>
              </div>
            )}
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700" 
              onClick={() => {
                console.log('Daily Devotional clicked');
                onNavigate?.('devotional');
              }}
              data-testid="button-daily-devotional"
            >
              Read Today's Devotional
            </Button>
          </div>
        </div>

        {/* Bible in 1 Year Tile */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg border-2 border-border">
          <div className="relative h-40">
            <img 
              src={forestPathImage}
              alt="Bible in 1 Year"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            {readingProgress && (
              <div className="absolute bottom-4 left-4 right-4">
                <Badge className="bg-green-600 text-white text-xs mb-2">
                  <Calendar className="w-3 h-3 mr-1" />
                  {readingProgress.completedDays?.length || 0} of 365 days
                </Badge>
              </div>
            )}
          </div>
          <div className="p-4">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3">
                <Calendar className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Bible in 1 Year
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
              Read the entire Bible with guided daily readings and progress tracking
            </p>
            {readingProgress && (
              <div className="flex items-center gap-4 mb-3 text-sm">
                <div className="flex items-center gap-1">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span className="text-gray-700 dark:text-gray-300">{readingProgress.currentStreak || 0} day streak</span>
                </div>
                <div className="text-gray-500 dark:text-gray-400">
                  {readingProgress.completedDays?.length || 0} completed
                </div>
              </div>
            )}
            <Button 
              className="w-full bg-green-600 hover:bg-green-700" 
              onClick={() => {
                console.log('Reading Plan clicked');
                onNavigate?.('readingplans');
              }}
              data-testid="button-reading-plan"
            >
              Continue Reading Plan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
