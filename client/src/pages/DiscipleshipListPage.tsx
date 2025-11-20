import { useState, useMemo, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Shield, Settings, Play, BookOpen, BookmarkCheck, ChevronRight, Flame, Share, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DISCIPLESHIP_PLANS } from "@/features/discipleship/discipleshipPlans";
import { loadPlanProgress } from "@/features/discipleship/discipleshipProgress";
import { useTranslations } from "@/lib/translations";
import { Capacitor } from '@capacitor/core';
import { useTestFlight } from "@/hooks/useTestFlight";
import { safeShare } from "@/utils/capabilities";
import { useToast } from "@/hooks/use-toast";
import AppLogo from "../components/AppLogo";
import PersonalizedGreeting from "../components/PersonalizedGreeting";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AppNavigate } from "../App";
import { DiscipleshipPlansHeader, PlansFilter } from "@/features/discipleship/DiscipleshipPlansHeader";
import appStore from "@/lib/appStore";

interface DiscipleshipListPageProps {
  onNavigate: AppNavigate;
  language: string;
  streakDays?: number;
}

const getMainMenuItems = (t: any) => [
  {
    id: "bookmarks",
    title: "Bookmarked Verses",
    description: "View your bookmarked scripture passages",
    icon: BookmarkCheck,
  },
  {
    id: "videos",
    title: t.faithVideos,
    description: t.faithVideosDesc,
    icon: Play,
  },
  {
    id: "blog",
    title: t.christianBlog,
    description: t.christianBlogDesc,
    icon: BookOpen,
  },
  {
    id: "friends",
    title: t.friends,
    description: t.friendsDesc,
    icon: Users,
  }
];

const getSettingsMenuItems = (t: any) => [
  {
    id: "settings",
    title: t.settings,
    description: t.settingsDesc,
    icon: Settings,
  },
  {
    id: "privacy",
    title: t.privacyStatement,
    description: t.privacyStatementDesc,
    icon: Shield,
  }
];

export default function DiscipleshipListPage({ onNavigate, language, streakDays = 0 }: DiscipleshipListPageProps) {
  const t = useTranslations(language);
  const { toast } = useToast();
  const { isTestFlight } = useTestFlight();
  const isIOS = Capacitor.getPlatform() === 'ios';

  const mainMenuItems = getMainMenuItems(t);
  const settingsMenuItems = getSettingsMenuItems(t);

  const handleMenuClick = (id: string) => {
    onNavigate(id as any);
  };

  // Filter state and progress tracking
  const [filter, setFilter] = useState<PlansFilter>("all");
  const [progressData, setProgressData] = useState((appStore as any).getAllDiscipleshipProgress());

  useEffect(() => {
    const handleProgressChange = () => {
      setProgressData((appStore as any).getAllDiscipleshipProgress());
    };

    window.addEventListener('discipleshipProgressChanged', handleProgressChange);
    return () => window.removeEventListener('discipleshipProgressChanged', handleProgressChange);
  }, []);

  // Calculate filtered plans and counts
  const { visiblePlans, counts } = useMemo(() => {
    const all = DISCIPLESHIP_PLANS;
    const started = [];
    const completed = [];

    for (const plan of all) {
      const progress = progressData[plan.id] || { completedDays: {}, isSaved: false };
      
      const completedDays = Object.keys(progress.completedDays || {}).length;
      const totalDays = plan.totalDays || plan.days.length;
      const isComplete = completedDays >= totalDays && totalDays > 0;
      const isStartedOrSaved = progress.isSaved || completedDays > 0;

      if (isComplete) {
        completed.push(plan);
      } else if (isStartedOrSaved) {
        started.push(plan);
      }
    }

    let visible = all;
    if (filter === "started") {
      visible = started;
    } else if (filter === "completed") {
      visible = completed;
    }

    return {
      visiblePlans: visible,
      counts: {
        all: all.length,
        started: started.length,
        completed: completed.length,
      }
    };
  }, [filter, progressData]);

  return (
    <div className="min-h-screen pb-20">
      {/* Professional Marketing Header */}
      <div className="bg-background px-4 py-6 border-b border-border ios-safe-top">
        {/* Top Bar: TestFlight Badge, Theme Toggle & Streak Badge */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            {isTestFlight && (
              <div className="flex items-center gap-1.5 bg-gradient-to-br from-blue-50 to-blue-100/70 dark:from-blue-950 dark:to-blue-900 px-2.5 py-1 rounded-full border border-blue-200/50 dark:border-blue-800/50 shadow-sm">
                <TrendingUp className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">TestFlight</span>
              </div>
            )}
            <ThemeToggle />
          </div>
          <div className="flex items-center gap-1.5 bg-gradient-to-br from-red-50 to-red-100/70 dark:from-red-950 dark:to-red-900 px-2.5 py-1 rounded-full border border-red-200/50 dark:border-red-800/50 shadow-sm">
            <Flame className="w-4 h-4 text-red-600 dark:text-red-400 fill-red-600 dark:fill-red-400" />
            <span className="text-sm font-bold text-red-700 dark:text-red-300" data-testid="text-streak-count">{streakDays}</span>
          </div>
        </div>
        
        {/* Professional Logo - Centered Above Social Buttons */}
        <AppLogo onNavigate={onNavigate as any} size="medium" className="mb-3" />
        
        {/* Personalized Greeting */}
        <PersonalizedGreeting language={language} />

        {/* Share Button */}
        <div className="flex gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-2 text-xs"
            data-testid="button-share-app"
            onClick={async () => {
              const result = await safeShare({
                title: 'The Gospel in 5 Minutes',
                text: 'Check out this free Bible app!',
                url: 'https://thegospelin5minutes.com'
              });
              
              if (result === 'shared') {
                toast({
                  title: "Shared!",
                  description: "Link shared successfully",
                });
              } else if (result === 'copied') {
                toast({
                  title: "Link Copied",
                  description: "Link copied to clipboard",
                });
              } else {
                toast({
                  title: "Sharing unavailable",
                  description: "Sharing is not available on this device",
                  variant: "destructive"
                });
              }
            }}
          >
            <Share className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t.share}</span>
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-3 px-4 pt-4">
        {/* Disciple Plans Section */}
        <div className="mb-4">
          <DiscipleshipPlansHeader
            activeFilter={filter}
            onChangeFilter={setFilter}
            counts={counts}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visiblePlans.map((plan) => {
              const progress = loadPlanProgress(plan);
              const percent = Math.round(progress.ratio * 100);

              return (
                <Card
                  key={plan.id}
                  onClick={() => onNavigate("discipleship-plan", { planId: plan.id })}
                  className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  data-testid={`card-plan-${plan.id}`}
                >
                  <div className="flex flex-col">
                    <div className="w-full h-40">
                      <img
                        src={plan.imageUrl}
                        alt={plan.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4 flex flex-col justify-between flex-1">
                      <div>
                        <h3 className="text-base font-semibold leading-snug text-gray-900 dark:text-gray-100 line-clamp-2" data-testid={`text-plan-title-${plan.id}`}>
                          {plan.title}
                        </h3>
                        {plan.subtitle && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2" data-testid={`text-plan-subtitle-${plan.id}`}>
                            {plan.subtitle}
                          </p>
                        )}
                      </div>

                      {/* Progress meter */}
                      <div className="mt-3">
                        <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-slate-900 dark:bg-slate-300 transition-all"
                            style={{ width: `${percent}%` }}
                            data-testid={`progress-bar-${plan.id}`}
                          />
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1" data-testid={`progress-text-${plan.id}`}>
                          {progress.completed}/{progress.total} days • {percent}% done
                        </p>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
