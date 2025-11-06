import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BookOpen, Calendar, Check, Crown } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { apiUrl } from "@/lib/api-config";
import { appStore } from "@/lib/appStore";
import PurchaseGate from "@/components/PurchaseGate";

type PlanType = "1yr-whole" | "6mo-ot" | "6mo-nt";

type ReadingPlan = {
  planType: PlanType;
  title: string;
  description: string;
  durationDays: number;
  totalReadings: number;
};

type PlanProgress = {
  completedCount: number;
  percentComplete: number;
  streak: number;
};

interface ReadingPlansPageProps {
  onBack: () => void;
  onNavigate: (page: string, planType?: string) => void;
}

export default function ReadingPlansPage({ onBack, onNavigate }: ReadingPlansPageProps) {
  const [allProgress, setAllProgress] = useState<Record<string, Record<number, { completedAt: string }>>>({});

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

  // Load progress from localStorage on mount and when progress changes
  useEffect(() => {
    const loadProgress = () => {
      const progress = appStore.getAllReadingProgress();
      setAllProgress(progress);
    };

    // Load initial progress
    loadProgress();

    // Listen for custom readingProgressChanged events from appStore
    window.addEventListener('readingProgressChanged', loadProgress);
    
    // Listen for storage events from other tabs/windows
    window.addEventListener('storage', loadProgress);

    return () => {
      window.removeEventListener('readingProgressChanged', loadProgress);
      window.removeEventListener('storage', loadProgress);
    };
  }, []);

  // Calculate progress stats for each plan
  const calculatePlanProgress = (planType: PlanType, totalDays: number): PlanProgress => {
    const planProgress = allProgress[planType] || {};
    const completedDays = Object.keys(planProgress).map(Number).sort((a, b) => a - b);
    const completedCount = completedDays.length;
    const percentComplete = totalDays > 0 ? (completedCount / totalDays) * 100 : 0;

    // Calculate streak (consecutive days from the highest completed day backward)
    let streak = 0;
    if (completedDays.length > 0) {
      const highestDay = completedDays[completedDays.length - 1];
      const completedSet = new Set(completedDays);
      
      let cursor = highestDay;
      while (completedSet.has(cursor)) {
        streak++;
        cursor--;
      }
    }

    return { completedCount, percentComplete, streak };
  };

  const plans = plansData?.plans || [];

  const handlePlanClick = (planType: PlanType) => {
    // Store selected plan in localStorage for detail page
    localStorage.setItem("selectedReadingPlan", planType);
    onNavigate("reading-plan-detail", planType);
  };

  return (
    <PurchaseGate>
    <div className="min-h-screen pb-20 bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/5 via-background to-primary/10 px-4 py-6 border-b border-border ios-safe-top">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-end mb-2">
            <div className="inline-flex items-center gap-1 text-xs bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-2.5 py-1 rounded-full font-bold shadow-md">
              <Crown className="w-3.5 h-3.5" />
              Premium
            </div>
          </div>
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
            const progress = calculatePlanProgress(plan.planType, plan.durationDays);
            const { completedCount, percentComplete, streak } = progress;

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
                    {streak > 0 && (
                      <div className="flex items-center gap-1 text-primary font-medium">
                        <span className="text-lg">🔥</span>
                        <span>{streak} day streak</span>
                      </div>
                    )}
                  </div>

                  {/* Progress Bar */}
                  {completedCount > 0 && (
                    <div className="space-y-1">
                      <Progress value={percentComplete} className="h-2" />
                      <p className="text-xs text-muted-foreground text-right">
                        {completedCount} of {plan.durationDays} days ({Math.round(percentComplete)}%)
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
    </PurchaseGate>
  );
}
