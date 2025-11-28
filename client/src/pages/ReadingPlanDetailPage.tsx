import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, ChevronRight, Check, BookOpen, ChevronDown, ChevronUp, Loader2, Flame, Calendar } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { apiUrl } from "@/lib/api-config";
import { FeatureBoundary } from "@/components/FeatureBoundary";
import appStore from "@/lib/appStore";

type PlanType = "1yr-whole" | "6mo-ot" | "6mo-nt";

type DailyReading = {
  day: number;
  scriptureReferences: string;
  description?: string;
};

type ReadingPlanData = {
  planType: PlanType;
  title: string;
  description: string;
  durationDays: number;
  dailyReadings: DailyReading[];
};

interface ReadingPlanDetailPageProps {
  onBack: () => void;
  planType?: PlanType;
}

function ReadingPlanDetailPage({ onBack, planType: initialPlanType }: ReadingPlanDetailPageProps) {
  // Get plan type from props or localStorage
  const [planType] = useState<PlanType>(() => {
    return initialPlanType || (localStorage.getItem("selectedReadingPlan") as PlanType) || "1yr-whole";
  });

  const [currentDay, setCurrentDay] = useState(1);
  const [localProgress, setLocalProgress] = useState<Record<number, { completedAt: string }>>({});
  const [isScriptureExpanded, setIsScriptureExpanded] = useState(false);

  // Helper function to calculate streak from completed days
  const calculateStreak = (completedDays: number[]): number => {
    if (completedDays.length === 0) return 0;
    
    const sorted = [...completedDays].sort((a, b) => b - a);
    const completedSet = new Set(completedDays);
    
    let streak = 0;
    let cursor = sorted[0];
    while (completedSet.has(cursor)) {
      streak++;
      cursor--;
    }
    return streak;
  };

  // Fetch plan details
  const { data: planData, isLoading } = useQuery({
    queryKey: ["/api/reading-plans", planType],
    queryFn: async () => {
      const res = await fetch(apiUrl(`/api/reading-plans/${planType}`), {
        cache: "no-store"
      });
      if (!res.ok) throw new Error("Failed to fetch plan details");
      return res.json() as Promise<{ success: true; plan: ReadingPlanData }>;
    }
  });

  // Get the current day's reading
  const todayReading = planData?.plan.dailyReadings.find(r => r.day === currentDay);

  // Fetch Scripture text for current day's reading (only when expanded)
  const { data: scriptureData, isLoading: isLoadingScripture } = useQuery({
    queryKey: ["/api/bible-passage", todayReading?.scriptureReferences, currentDay],
    queryFn: async () => {
      if (!todayReading?.scriptureReferences) return null;
      
      const res = await fetch(
        apiUrl(`/api/bible-passage?reference=${encodeURIComponent(todayReading.scriptureReferences)}`)
      );
      if (!res.ok) return null;
      
      const data = await res.json();
      return data.success ? data : null;
    },
    enabled: isScriptureExpanded && !!todayReading?.scriptureReferences,
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
  });

  // Load progress from localStorage on mount and when it changes
  useEffect(() => {
    const loadProgress = () => {
      const progress = appStore.getReadingProgress(planType);
      setLocalProgress(progress);
    };
    
    // Load initial progress
    loadProgress();
    
    // Listen for custom readingProgressChanged events from appStore
    // Only reload if the event is for this specific plan
    const handleProgressChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail && customEvent.detail.planType === planType) {
        loadProgress();
      }
    };
    
    window.addEventListener('readingProgressChanged', handleProgressChange);
    
    // Listen for storage events from other tabs/windows (reload for any storage change)
    window.addEventListener('storage', loadProgress);
    
    return () => {
      window.removeEventListener('readingProgressChanged', handleProgressChange);
      window.removeEventListener('storage', loadProgress);
    };
  }, [planType]);

  // Calculate progress stats
  const progressStats = useMemo(() => {
    const completedDays = Object.keys(localProgress).map(Number).sort((a, b) => a - b);
    const completedCount = completedDays.length;
    const totalDays = planData?.plan.durationDays || 1;
    const percentComplete = (completedCount / totalDays) * 100;
    const streak = calculateStreak(completedDays);

    // Find the current day (first incomplete day, or last day + 1 if all complete)
    let currentDay = 1;
    const completedSet = new Set(completedDays);
    for (let day = 1; day <= totalDays; day++) {
      if (!completedSet.has(day)) {
        currentDay = day;
        break;
      }
    }
    // If all days are complete, stay on last day
    if (completedSet.size === totalDays) {
      currentDay = totalDays;
    }

    return { completedCount, percentComplete, currentDay, streak };
  }, [localProgress, planData]);

  // Auto-advance to current day on initial load
  useEffect(() => {
    if (progressStats.currentDay && currentDay === 1) {
      setCurrentDay(progressStats.currentDay);
    }
  }, [progressStats.currentDay]);

  const handleDayToggle = (day: number) => {
    const isComplete = !!localProgress[day];
    
    if (isComplete) {
      appStore.markDayIncomplete(planType, day);
    } else {
      appStore.markDayComplete(planType, day);
    }
    
    // Immediately reload progress to update UI
    const updatedProgress = appStore.getReadingProgress(planType);
    setLocalProgress(updatedProgress);
  };

  const handlePrevDay = () => {
    if (currentDay > 1) {
      setCurrentDay(currentDay - 1);
    }
  };

  const handleNextDay = () => {
    if (planData && currentDay < planData.plan.durationDays) {
      setCurrentDay(currentDay + 1);
    }
  };

  const handleJumpToCurrent = () => {
    setCurrentDay(progressStats.currentDay);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pb-20 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-zinc-900 dark:via-stone-900 dark:to-neutral-900 flex items-center justify-center">
        <p className="text-muted-foreground">Loading plan...</p>
      </div>
    );
  }

  if (!planData) {
    return (
      <div className="min-h-screen pb-20 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-zinc-900 dark:via-stone-900 dark:to-neutral-900 flex items-center justify-center">
        <p className="text-muted-foreground">Plan not found</p>
      </div>
    );
  }

  const plan = planData.plan;
  const isCurrentDayComplete = !!localProgress[currentDay];

  return (
    <div className="min-h-screen pb-20 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-zinc-900 dark:via-stone-900 dark:to-neutral-900">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-100/80 to-green-100/80 dark:from-emerald-950/80 dark:to-green-950/80 backdrop-blur-xl border-b border-emerald-200/50 dark:border-emerald-900/30 ios-safe-top">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-4">
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
              <h1 className="text-2xl font-serif font-bold text-emerald-900 dark:text-emerald-100 flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                {plan.title}
              </h1>
            </div>
          </div>
          <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl p-4 border border-emerald-200/50 dark:border-emerald-800/50 shadow-lg">
            <p className="text-emerald-900 dark:text-emerald-100 font-medium text-sm">
              {plan.description}
            </p>
          </div>
        </div>
      </div>

      {/* Progress Summary */}
      <div className="max-w-2xl mx-auto px-4 py-4">
        <Card className="border-emerald-200/50 dark:border-emerald-800/50 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-700 dark:to-green-700" />
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">Your Progress</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-foreground">{progressStats.completedCount}</span>
                <span className="text-sm text-muted-foreground">/ {plan.durationDays} days</span>
              </div>
            </div>
            <div className="relative">
              <Progress value={progressStats.percentComplete} className="h-3 bg-emerald-100 dark:bg-emerald-950" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                {Math.round(progressStats.percentComplete)}% Complete
              </span>
              {progressStats.streak > 0 && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full shadow-md">
                  <Flame className="w-4 h-4" />
                  <span className="font-bold text-sm">{progressStats.streak} day{progressStats.streak !== 1 ? 's' : ''}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Day Navigation */}
      <div className="max-w-2xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <Button
            onClick={handlePrevDay}
            disabled={currentDay <= 1}
            variant="outline"
            size="sm"
            className="flex-shrink-0"
            data-testid="button-prev-day"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>
          
          <div className="flex-1 text-center">
            <p className="text-sm text-muted-foreground">Day</p>
            <p className="text-2xl font-bold text-foreground">{currentDay}</p>
          </div>

          <Button
            onClick={handleNextDay}
            disabled={currentDay >= plan.durationDays}
            variant="outline"
            size="sm"
            className="flex-shrink-0"
            data-testid="button-next-day"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {currentDay !== progressStats.currentDay && (
          <div className="mt-3 text-center">
            <Button
              onClick={handleJumpToCurrent}
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary"
              data-testid="button-jump-to-current"
            >
              Jump to current day ({progressStats.currentDay})
            </Button>
          </div>
        )}
      </div>

      {/* Today's Reading */}
      <div className="max-w-2xl mx-auto px-4 pb-6">
        <Card className={`border-emerald-200/50 dark:border-emerald-800/50 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl overflow-hidden ${isCurrentDayComplete ? "ring-2 ring-emerald-500/50" : ""}`}>
          <div className="h-1.5 bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-700 dark:to-green-700" />
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-700 to-green-700 dark:from-emerald-400 dark:to-green-400 bg-clip-text text-transparent mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  Today's Reading
                </h2>
                {todayReading ? (
                  <div className="space-y-2">
                    <p className="text-base text-foreground font-medium">
                      {todayReading.scriptureReferences}
                    </p>
                    {todayReading.description && (
                      <p className="text-sm text-muted-foreground">
                        {todayReading.description}
                      </p>
                    )}
                    
                    {/* Collapsible Scripture Text */}
                    <Collapsible
                      open={isScriptureExpanded}
                      onOpenChange={setIsScriptureExpanded}
                      className="mt-3"
                    >
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full flex items-center justify-between gap-2 mt-3"
                          data-testid="button-toggle-scripture"
                        >
                          <span className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4" />
                            {isScriptureExpanded ? "Hide Scripture Text" : "Read Scripture (NIV)"}
                          </span>
                          {isScriptureExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </Button>
                      </CollapsibleTrigger>
                      
                      <CollapsibleContent className="mt-3">
                        {isLoadingScripture ? (
                          <div className="flex items-center justify-center py-8 text-muted-foreground">
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            <span>Loading Scripture...</span>
                          </div>
                        ) : scriptureData ? (
                          <div className="rounded-lg border border-border bg-background p-6 max-h-96 overflow-y-auto shadow-sm">
                            <pre className="whitespace-pre-wrap text-base leading-relaxed font-serif text-foreground m-0">
                              {scriptureData.content}
                            </pre>
                          </div>
                        ) : (
                          <div className="rounded-lg border border-border bg-muted p-4 text-center">
                            <p className="text-sm text-muted-foreground">
                              Unable to load Scripture text. Please try again later.
                            </p>
                          </div>
                        )}
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    No reading found for this day
                  </p>
                )}
              </div>
              
              {todayReading && (
                <button
                  onClick={() => handleDayToggle(currentDay)}
                  className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg ${
                    isCurrentDayComplete
                      ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600 scale-110"
                      : "bg-emerald-100 dark:bg-emerald-950 hover:bg-emerald-200 dark:hover:bg-emerald-900 border-2 border-emerald-300 dark:border-emerald-700"
                  }`}
                  data-testid={`button-toggle-day-${currentDay}`}
                >
                  {isCurrentDayComplete && <Check className="w-6 h-6" />}
                </button>
              )}
            </div>

            {todayReading && !isCurrentDayComplete && (
              <Button
                onClick={() => handleDayToggle(currentDay)}
                className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 dark:from-emerald-700 dark:to-green-700 dark:hover:from-emerald-800 dark:hover:to-green-800 text-white shadow-lg"
                data-testid="button-mark-complete"
              >
                <Check className="w-4 h-4 mr-2" />
                Mark as Complete
              </Button>
            )}

            {todayReading && isCurrentDayComplete && (
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-950/50 rounded-lg border border-emerald-300 dark:border-emerald-700">
                <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span className="font-bold text-emerald-900 dark:text-emerald-100">Completed! Great job! 🎉</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="max-w-2xl mx-auto px-4 pb-6">
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-emerald-200/50 dark:border-emerald-800/50 shadow-lg bg-gradient-to-br from-emerald-50/80 to-green-50/80 dark:from-emerald-950/30 dark:to-green-950/30 backdrop-blur-xl">
            <CardContent className="pt-5 text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center shadow-lg">
                <Check className="w-6 h-6 text-white" />
              </div>
              <p className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-green-700 dark:from-emerald-400 dark:to-green-400 bg-clip-text text-transparent">{progressStats.completedCount}</p>
              <p className="text-xs font-semibold text-emerald-900 dark:text-emerald-100 mt-1">Days Complete</p>
            </CardContent>
          </Card>
          <Card className="border-emerald-200/50 dark:border-emerald-800/50 shadow-lg bg-gradient-to-br from-emerald-50/80 to-green-50/80 dark:from-emerald-950/30 dark:to-green-950/30 backdrop-blur-xl">
            <CardContent className="pt-5 text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center shadow-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <p className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-green-700 dark:from-emerald-400 dark:to-green-400 bg-clip-text text-transparent">{plan.durationDays - progressStats.completedCount}</p>
              <p className="text-xs font-semibold text-emerald-900 dark:text-emerald-100 mt-1">Days Remaining</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Wrap with FeatureBoundary for error isolation
export default FeatureBoundary.with(
  ReadingPlanDetailPage,
  "Reading Plan Details",
  (props) => () => props.onBack()
);
