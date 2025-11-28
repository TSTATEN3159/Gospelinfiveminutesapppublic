import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Calendar, Check, Flame, ChevronRight, Home } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { apiUrl } from "@/lib/api-config";
import appStore from "@/lib/appStore";
import { FeatureBoundary } from "@/components/FeatureBoundary";

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

function ReadingPlansPage({ onBack, onNavigate }: ReadingPlansPageProps) {
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-zinc-900 dark:via-stone-900 dark:to-neutral-900 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-100/80 to-green-100/80 dark:from-emerald-950/80 dark:to-green-950/80 backdrop-blur-xl border-b border-emerald-200/50 dark:border-emerald-900/30 ios-safe-top">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between gap-3 mb-4">
            <Button
              onClick={onBack}
              variant="ghost"
              size="icon"
              className="rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Go back"
              data-testid="button-back"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl font-serif font-bold text-emerald-900 dark:text-emerald-100 flex items-center gap-2">
                <BookOpen className="w-7 h-7" />
                Bible Reading Plans
              </h1>
            </div>
            <Button
              onClick={() => onNavigate('home')}
              variant="ghost"
              size="icon"
              className="rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Go home"
              data-testid="button-home"
            >
              <Home className="w-5 h-5" />
            </Button>
          </div>
          <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl p-4 border border-emerald-200/50 dark:border-emerald-800/50 shadow-lg">
            <p className="text-emerald-900 dark:text-emerald-100 font-medium">
              Choose a plan and read through Scripture systematically
            </p>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {plansLoading && (
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center">
            <div className="text-center text-muted-foreground">Loading plans...</div>
          </div>
        </div>
      )}

      {/* Plans List */}
      {!plansLoading && (
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">
          {plans.map((plan) => {
            const progress = calculatePlanProgress(plan.planType, plan.durationDays);
            const { completedCount, percentComplete, streak } = progress;

            return (
              <Card
                key={plan.planType}
                className="cursor-pointer hover:shadow-2xl transition-all duration-300 border-emerald-200/50 dark:border-emerald-800/50 hover:scale-[1.02] hover:-translate-y-1 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-xl overflow-hidden group"
                onClick={() => handlePlanClick(plan.planType)}
                data-testid={`plan-card-${plan.planType}`}
              >
                {/* Gradient accent bar */}
                <div className="h-1.5 bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-700 dark:to-green-700" />
                
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <CardTitle className="text-xl font-bold flex items-center gap-2 bg-gradient-to-r from-emerald-700 to-green-700 dark:from-emerald-400 dark:to-green-400 bg-clip-text text-transparent">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 dark:from-emerald-600 dark:to-green-600 flex items-center justify-center shadow-lg">
                          <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        {plan.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                        {plan.description}
                      </p>
                    </div>
                    {completedCount > 0 && (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-full shadow-md font-bold text-sm">
                        <Check className="w-4 h-4" />
                        {completedCount}
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-100/80 dark:bg-emerald-950/50 rounded-lg border border-emerald-200 dark:border-emerald-800">
                      <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span className="font-semibold text-emerald-900 dark:text-emerald-100">{plan.durationDays} days</span>
                    </div>
                    {streak > 0 && (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full shadow-md">
                        <Flame className="w-4 h-4" />
                        <span className="font-bold">{streak} day{streak !== 1 ? 's' : ''}</span>
                      </div>
                    )}
                  </div>

                  {/* Progress Bar */}
                  {completedCount > 0 && (
                    <div className="space-y-2">
                      <div className="relative">
                        <Progress value={percentComplete} className="h-3 bg-emerald-100 dark:bg-emerald-950" />
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground font-medium">
                          {completedCount} of {plan.durationDays} days complete
                        </span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                          {Math.round(percentComplete)}%
                        </span>
                      </div>
                    </div>
                  )}

                  {completedCount === 0 && (
                    <div className="flex items-center justify-between bg-emerald-50/80 dark:bg-emerald-950/30 rounded-lg p-3 border border-emerald-200/50 dark:border-emerald-800/50">
                      <p className="text-sm text-emerald-900 dark:text-emerald-100 font-medium">
                        Ready to begin your journey?
                      </p>
                      <ChevronRight className="w-5 h-5 text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Info Footer */}
      <div className="max-w-2xl mx-auto px-4 pb-6">
        <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl p-4 border border-emerald-200/50 dark:border-emerald-800/50 shadow-lg">
          <p className="text-sm text-center leading-relaxed text-foreground">
            <span className="font-bold text-emerald-900 dark:text-emerald-100">Build daily habits</span> — 
            Each plan guides you through Scripture systematically. Track your progress and build consistency in God's Word.
          </p>
        </div>
      </div>
    </div>
  );
}

// Wrap with FeatureBoundary for error isolation
export default FeatureBoundary.with(
  ReadingPlansPage,
  "Bible Reading Plans",
  (props) => () => props.onBack()
);
