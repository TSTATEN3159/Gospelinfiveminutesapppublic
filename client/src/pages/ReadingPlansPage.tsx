import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BookOpen, Calendar, Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { apiUrl } from "@/lib/api-config";

type PlanType = "1yr-whole" | "6mo-ot" | "6mo-nt";

type ReadingPlan = {
  planType: PlanType;
  title: string;
  description: string;
  durationDays: number;
  totalReadings: number;
};

type ReadingProgressEntry = {
  id: string;
  userId: string;
  planType: PlanType;
  dayNumber: number;
  scriptureReferences: string;
  completedAt: string;
};

type UserProgressResponse = {
  success: true;
  progress: ReadingProgressEntry[];
  stats: {
    completedDays: number;
    totalDays: number;
    percentComplete: number;
    currentDay: number;
  };
};

type UserProgress = {
  completedDaysSet: Set<number>;
  completedCount: number;
  percentComplete: number;
  lastReadISO: string | null;
  streak: number;
};

interface ReadingPlansPageProps {
  onBack: () => void;
  onNavigate: (page: string, planType?: string) => void;
  userId: string;
}

function getProfile(): { id?: string; firstName?: string } {
  try {
    const raw = localStorage.getItem("profile") || localStorage.getItem("app_user") || localStorage.getItem("gospelAppUser");
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export default function ReadingPlansPage({ onBack, onNavigate, userId }: ReadingPlansPageProps) {
  const profile = getProfile();
  const firstName = profile.firstName?.trim() || "friend";
  const effectiveUserId = userId || profile.id || "demo-user";

  // Fetch all reading plans
  const { data: plansData, isLoading: plansLoading } = useQuery({
    queryKey: ["/api/reading-plans"],
    queryFn: async () => {
      const res = await fetch(apiUrl("/api/reading-plans"), {
        cache: "no-store"
      });
      if (!res.ok) throw new Error("Failed to fetch reading plans");
      return res.json() as Promise<{ success: true; plans: ReadingPlan[] }>;
    }
  });

  // Helper function to calculate streak from progress entries
  const calculateStreak = (entries: ReadingProgressEntry[]): number => {
    if (entries.length === 0) return 0;
    
    // Sort by day number descending
    const sortedByDay = [...entries].sort((a, b) => b.dayNumber - a.dayNumber);
    const completedSet = new Set(entries.map(e => e.dayNumber));
    
    // Start from highest completed day and count consecutive days backward
    let streak = 0;
    let cursor = sortedByDay[0].dayNumber;
    while (completedSet.has(cursor)) {
      streak++;
      cursor--;
    }
    return streak;
  };

  // Fetch progress for each plan
  const { data: progressData } = useQuery({
    queryKey: ["/api/reading-progress", effectiveUserId],
    queryFn: async () => {
      const plans: PlanType[] = ["1yr-whole", "6mo-ot", "6mo-nt"];
      const results = await Promise.all(
        plans.map(async (planType) => {
          const res = await fetch(apiUrl(`/api/reading-progress/${effectiveUserId}/${planType}`), {
            cache: "no-store"
          });
          if (!res.ok) {
            return { 
              planType, 
              completedDaysSet: new Set<number>(), 
              completedCount: 0,
              percentComplete: 0,
              lastReadISO: null,
              streak: 0
            };
          }
          const data = await res.json() as UserProgressResponse;
          
          // Build completed days set from progress array
          const completedDaysSet = new Set(data.progress.map(p => p.dayNumber));
          
          // Get last read date from most recent entry
          const sortedByTime = [...data.progress].sort((a, b) => 
            new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
          );
          const lastReadISO = sortedByTime[0]?.completedAt || null;
          
          // Calculate streak
          const streak = calculateStreak(data.progress);
          
          return { 
            planType, 
            completedDaysSet,
            completedCount: data.stats.completedDays,
            percentComplete: data.stats.percentComplete,
            lastReadISO,
            streak
          };
        })
      );
      return results.reduce((acc, r) => {
        acc[r.planType] = r;
        return acc;
      }, {} as Record<PlanType, UserProgress>);
    },
    enabled: !!effectiveUserId
  });

  const plans = plansData?.plans || [];

  const handlePlanClick = (planType: PlanType) => {
    // Store selected plan in localStorage for detail page
    localStorage.setItem("selectedReadingPlan", planType);
    onNavigate("reading-plan-detail", planType);
  };

  return (
    <div className="min-h-screen pb-20 bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/5 via-background to-primary/10 px-4 py-6 border-b border-border ios-safe-top">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              aria-label="Go back"
              data-testid="button-back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/20">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Bible Reading Plans</h1>
          <p className="text-muted-foreground text-sm">
            Choose a plan and read through Scripture systematically
          </p>
        </div>
      </div>

      {/* Loading State */}
      {plansLoading && (
        <div className="max-w-2xl mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">Loading plans...</p>
        </div>
      )}

      {/* Plans List */}
      {!plansLoading && (
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
          {plans.map((plan) => {
            const progress = progressData?.[plan.planType];
            const completedCount = progress?.completedCount || 0;
            const progressPercent = progress?.percentComplete || 0;

            return (
              <Card
                key={plan.planType}
                className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-primary/30"
                onClick={() => handlePlanClick(plan.planType)}
                data-testid={`plan-card-${plan.planType}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-primary" />
                        {plan.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {plan.description}
                      </p>
                    </div>
                    {completedCount > 0 && (
                      <div className="flex items-center gap-1 text-sm text-primary font-medium bg-primary/10 px-2 py-1 rounded-full">
                        <Check className="w-4 h-4" />
                        {completedCount}
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{plan.durationDays} days</span>
                    </div>
                    {progress && progress.streak > 0 && (
                      <div className="flex items-center gap-1 text-primary font-medium">
                        <span className="text-lg">🔥</span>
                        <span>{progress.streak} day streak</span>
                      </div>
                    )}
                  </div>

                  {/* Progress Bar */}
                  {completedCount > 0 && (
                    <div className="space-y-1">
                      <Progress value={progressPercent} className="h-2" />
                      <p className="text-xs text-muted-foreground text-right">
                        {completedCount} of {plan.durationDays} days ({Math.round(progressPercent)}%)
                      </p>
                    </div>
                  )}

                  {completedCount === 0 && (
                    <p className="text-sm text-muted-foreground italic">
                      Tap to start this plan
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Info Footer */}
      <div className="max-w-2xl mx-auto px-4 pb-6">
        <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            <span className="font-semibold text-foreground">Stay consistent</span> — 
            Each plan guides you through Scripture day by day. Track your progress and build the habit of daily Bible reading.
          </p>
        </div>
      </div>
    </div>
  );
}
