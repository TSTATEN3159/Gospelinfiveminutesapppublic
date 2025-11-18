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
import heavenCloudsImage from '@assets/stock_images/heaven_clouds_eterna_9fe3749f.jpg';

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

      <div className="max-w-sm mx-auto space-y-3 px-4 pt-4">
        {/* Discipleship Plans Section */}
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 px-1">
            Discipleship Plans
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 px-1">
            Short Bible plans to help you follow Jesus
          </p>
          
          <div className="space-y-3">
            {DISCIPLESHIP_PLANS.map((plan) => {
              const progress = loadPlanProgress(plan);
              const percent = Math.round(progress.ratio * 100);

              return (
                <Card
                  key={plan.id}
                  onClick={() => onNavigate("discipleship-plan", { planId: plan.id })}
                  className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  data-testid={`card-plan-${plan.id}`}
                >
                  <div className="flex">
                    <div className="w-24 h-24 flex-shrink-0">
                      <img
                        src={heavenCloudsImage}
                        alt={plan.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="flex-1 p-3 flex flex-col justify-between">
                      <div>
                        <h3 className="text-base font-semibold leading-snug text-gray-900 dark:text-gray-100" data-testid={`text-plan-title-${plan.id}`}>
                          {plan.title}
                        </h3>
                        {plan.subtitle && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5" data-testid={`text-plan-subtitle-${plan.id}`}>
                            {plan.subtitle}
                          </p>
                        )}
                      </div>

                      {/* Progress meter */}
                      <div className="mt-2">
                        <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-slate-900 dark:bg-slate-300 transition-all"
                            style={{ width: `${percent}%` }}
                            data-testid={`progress-bar-${plan.id}`}
                          />
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1" data-testid={`progress-text-${plan.id}`}>
                          {progress.completed}/{progress.total} steps • {percent}% done
                        </p>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Main Menu Items */}
        {mainMenuItems.map((item, index) => {
          const getItemColors = (id: string) => {
            switch(id) {
              case 'bookmarks': return {
                gradient: 'from-teal-50 to-cyan-50 dark:from-teal-950 dark:to-cyan-950',
                borderColor: 'border-teal-200 dark:border-teal-800',
                iconColor: 'text-teal-600 dark:text-teal-400'
              };
              case 'videos': return {
                gradient: 'from-purple-50 to-violet-50 dark:from-purple-950 dark:to-violet-950',
                borderColor: 'border-purple-200 dark:border-purple-800',
                iconColor: 'text-purple-600 dark:text-purple-400'
              };
              case 'blog': return {
                gradient: 'from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950',
                borderColor: 'border-orange-200 dark:border-orange-800',
                iconColor: 'text-orange-600 dark:text-orange-400'
              };
              case 'friends': return {
                gradient: 'from-pink-50 to-rose-50 dark:from-pink-950 dark:to-rose-950',
                borderColor: 'border-pink-200 dark:border-pink-800',
                iconColor: 'text-pink-600 dark:text-pink-400'
              };
              default: return {
                gradient: 'from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-blue-950',
                borderColor: 'border-indigo-200 dark:border-indigo-800',
                iconColor: 'text-indigo-600 dark:text-indigo-400'
              };
            }
          };

          const colors = getItemColors(item.id);

          return (
            <Card
              key={item.id}
              className={`bg-gradient-to-br ${colors.gradient} border ${colors.borderColor} rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer transform hover:scale-[1.01]`}
              onClick={() => handleMenuClick(item.id)}
              data-testid={`card-menu-${item.id}`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`${colors.iconColor}`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100">{item.title}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{item.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                </div>
              </CardContent>
            </Card>
          );
        })}

        {/* Settings & Account Section */}
        {settingsMenuItems.map((item) => {
          const colors = {
            gradient: 'from-blue-50 to-sky-50 dark:from-blue-950 dark:to-sky-950',
            borderColor: 'border-blue-200 dark:border-blue-800',
            iconColor: 'text-blue-600 dark:text-blue-400'
          };

          return (
            <Card
              key={item.id}
              className={`bg-gradient-to-br ${colors.gradient} border ${colors.borderColor} rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer transform hover:scale-[1.01]`}
              onClick={() => handleMenuClick(item.id)}
              data-testid={`card-menu-${item.id}`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`${colors.iconColor}`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100">{item.title}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{item.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
