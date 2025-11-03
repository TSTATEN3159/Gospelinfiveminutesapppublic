import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, ChevronRight, Check, BookOpen } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { apiUrl } from "@/lib/api-config";
import { appStore } from "@/lib/appStore";

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

export default function ReadingPlanDetailPage({ onBack, planType: initialPlanType }: ReadingPlanDetailPageProps) {
  // Get plan type from props or localStorage
  const [planType] = useState<PlanType>(() => {
    return initialPlanType || (localStorage.getItem("selectedReadingPlan") as PlanType) || "1yr-whole";
  });

  const [currentDay, setCurrentDay] = useState(1);

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

  // Get progress from localStorage
  const localProgress = useMemo(() => {
    return appStore.getReadingProgress(planType);
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

  // Auto-advance to current day on load
  useState(() => {
    if (progressStats.currentDay) {
      setCurrentDay(progressStats.currentDay);
    }
  });

  const handleDayToggle = (day: number) => {
    const isComplete = !!localProgress[day];
    
    if (isComplete) {
      appStore.markDayIncomplete(planType, day);
    } else {
      appStore.markDayComplete(planType, day);
    }
    
    // Force re-render by updating state
    setCurrentDay(prev => prev);
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
      <div className="min-h-screen pb-20 bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading plan...</p>
      </div>
    );
  }

  if (!planData) {
    return (
      <div className="min-h-screen pb-20 bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Plan not found</p>
      </div>
    );
  }

  const plan = planData.plan;
  const todayReading = plan.dailyReadings.find(r => r.day === currentDay);
  const isCurrentDayComplete = !!localProgress[currentDay];

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
          <h1 className="text-2xl font-bold text-foreground mb-2">{plan.title}</h1>
          <p className="text-muted-foreground text-sm">{plan.description}</p>
        </div>
      </div>

      {/* Progress Summary */}
      <div className="max-w-2xl mx-auto px-4 py-4">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-semibold text-foreground">
                  {progressStats.completedCount} of {plan.durationDays} days
                </span>
              </div>
              <Progress value={progressStats.percentComplete} className="h-2" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {Math.round(progressStats.percentComplete)}% complete
                  </span>
                </div>
                {progressStats.streak > 0 && (
                  <div className="flex items-center gap-1 text-sm text-primary font-medium">
                    <span className="text-lg">🔥</span>
                    <span>{progressStats.streak} day streak</span>
                  </div>
                )}
              </div>
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
        <Card className={isCurrentDayComplete ? "border-primary/50 bg-primary/5" : ""}>
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-foreground mb-2">
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
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    isCurrentDayComplete
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                  data-testid={`button-toggle-day-${currentDay}`}
                >
                  {isCurrentDayComplete && <Check className="w-5 h-5" />}
                </button>
              )}
            </div>

            {todayReading && !isCurrentDayComplete && (
              <Button
                onClick={() => handleDayToggle(currentDay)}
                className="w-full"
                data-testid="button-mark-complete"
              >
                <Check className="w-4 h-4 mr-2" />
                Mark as Complete
              </Button>
            )}

            {todayReading && isCurrentDayComplete && (
              <div className="flex items-center gap-2 text-sm text-primary">
                <Check className="w-4 h-4" />
                <span className="font-medium">Completed</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="max-w-2xl mx-auto px-4 pb-6">
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <CardContent className="pt-4 text-center">
              <p className="text-2xl font-bold text-primary">{progressStats.completedCount}</p>
              <p className="text-xs text-muted-foreground mt-1">Days Complete</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 text-center">
              <p className="text-2xl font-bold text-primary">{plan.durationDays - progressStats.completedCount}</p>
              <p className="text-xs text-muted-foreground mt-1">Days Remaining</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
