import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, ChevronRight, Check, BookOpen } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { apiUrl } from "@/lib/api-config";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

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

interface ReadingPlanDetailPageProps {
  onBack: () => void;
  userId: string;
  planType?: PlanType;
}

function getProfile(): { id?: string; appUserId?: string; firstName?: string } {
  try {
    const raw = localStorage.getItem("profile") || localStorage.getItem("app_user") || localStorage.getItem("gospelAppUser");
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    // Return appUserId as id if id is not set (for compatibility)
    return {
      ...parsed,
      id: parsed.id || parsed.appUserId
    };
  } catch {
    return {};
  }
}

export default function ReadingPlanDetailPage({ onBack, userId, planType: initialPlanType }: ReadingPlanDetailPageProps) {
  const profile = getProfile();
  const effectiveUserId = userId?.trim() || profile.id?.trim();
  const { toast } = useToast();
  
  // Require authentication
  useEffect(() => {
    if (!effectiveUserId) {
      toast({
        title: "Authentication required",
        description: "Please log in to track your reading progress",
        variant: "destructive"
      });
      onBack();
    }
  }, [effectiveUserId, onBack, toast]);
  
  if (!effectiveUserId) {
    return null;
  }

  // Get plan type from props or localStorage
  const [planType] = useState<PlanType>(() => {
    return initialPlanType || (localStorage.getItem("selectedReadingPlan") as PlanType) || "1yr-whole";
  });

  const [currentDay, setCurrentDay] = useState(1);

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

  // Fetch plan details
  const { data: planData, isLoading } = useQuery({
    queryKey: ["/api/reading-plans", planType],
    queryFn: async () => {
      const res = await fetch(apiUrl(`/api/reading-plans/${planType}`), {
        cache: "no-store"
      });
      if (!res.ok) throw new Error("Failed to fetch plan");
      return res.json() as Promise<{ success: true; plan: ReadingPlanData }>;
    }
  });

  // Fetch user progress
  const { data: progressData, refetch: refetchProgress, isLoading: progressLoading } = useQuery({
    queryKey: ["/api/reading-progress", effectiveUserId, planType],
    queryFn: async () => {
      const res = await fetch(apiUrl(`/api/reading-progress/${effectiveUserId}/${planType}`), {
        cache: "no-store"
      });
      if (!res.ok) {
        return { 
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
        completedDaysSet,
        completedCount: data.stats.completedDays,
        percentComplete: data.stats.percentComplete,
        lastReadISO,
        streak
      };
    },
    enabled: !!effectiveUserId
  });

  const plan = planData?.plan;
  const progress = progressData || { 
    completedDaysSet: new Set<number>(), 
    completedCount: 0,
    percentComplete: 0,
    lastReadISO: null,
    streak: 0
  };
  const currentReading = plan?.dailyReadings.find(r => r.day === currentDay);
  const isCompleted = progress.completedDaysSet.has(currentDay);
  const completedCount = progress.completedCount;
  const progressPercent = progress.percentComplete;

  // Auto-navigate to next incomplete day on mount
  useEffect(() => {
    if (plan && progress) {
      const nextIncompleteDay = plan.dailyReadings.find(r => !progress.completedDaysSet.has(r.day));
      if (nextIncompleteDay) {
        setCurrentDay(nextIncompleteDay.day);
      }
    }
  }, [plan, progress]);

  // Mark reading complete mutation
  const markCompleteMutation = useMutation({
    mutationFn: async () => {
      if (!currentReading) throw new Error("No current reading");
      return await apiRequest("POST", "/api/reading-progress", {
        userId: effectiveUserId,
        planType,
        dayNumber: currentDay,
        scriptureReferences: currentReading.scriptureReferences
      });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["/api/reading-progress"] });
      
      toast({
        title: "Reading marked complete!",
        description: `Day ${currentDay} completed. Keep up the great work!`,
      });
      
      // Refetch progress and wait for it to complete
      await refetchProgress();
      
      // Auto-advance to next INCOMPLETE day after refetch completes
      // We need to fetch the raw API response again to get the updated Set
      if (plan) {
        const res = await fetch(apiUrl(`/api/reading-progress/${effectiveUserId}/${planType}`), {
          cache: "no-store"
        });
        if (res.ok) {
          const rawData = await res.json() as UserProgressResponse;
          const updatedCompletedSet = new Set(rawData.progress.map((p: ReadingProgressEntry) => p.dayNumber));
          const nextIncompleteDay = plan.dailyReadings.find(r => r.day > currentDay && !updatedCompletedSet.has(r.day));
          
          if (nextIncompleteDay) {
            setTimeout(() => {
              setCurrentDay(nextIncompleteDay.day);
            }, 500);
          }
        }
      }
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to mark reading complete",
        variant: "destructive"
      });
    }
  });

  const handlePrevDay = () => {
    if (currentDay > 1) setCurrentDay(currentDay - 1);
  };

  const handleNextDay = () => {
    if (plan && currentDay < plan.durationDays) setCurrentDay(currentDay + 1);
  };

  const handleMarkComplete = () => {
    if (!isCompleted) {
      markCompleteMutation.mutate();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pb-20 bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading plan...</p>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="min-h-screen pb-20 bg-background flex items-center justify-center">
        <p className="text-destructive">Plan not found</p>
      </div>
    );
  }

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
          <h1 className="text-xl font-bold text-foreground mb-1">{plan.title}</h1>
          <p className="text-sm text-muted-foreground">{plan.description}</p>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="max-w-2xl mx-auto px-4 py-4 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Overall Progress</span>
          <span className="font-medium">
            {completedCount} of {plan.durationDays} days ({Math.round(progressPercent)}%)
          </span>
        </div>
        <Progress value={progressPercent} className="h-2" />
        
        {progress.streak > 0 && (
          <div className="flex items-center gap-2 text-sm text-primary font-medium">
            <span className="text-lg">🔥</span>
            <span>{progress.streak} day streak!</span>
          </div>
        )}
      </div>

      {/* Day Navigation */}
      <div className="max-w-2xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevDay}
            disabled={currentDay === 1}
            data-testid="button-prev-day"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>
          
          <span className="text-sm font-medium">
            Day {currentDay} of {plan.durationDays}
          </span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextDay}
            disabled={currentDay === plan.durationDays}
            data-testid="button-next-day"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* Reading Content */}
      <div className="max-w-2xl mx-auto px-4 pb-6">
        <Card className={isCompleted ? "border-primary/40 bg-primary/5" : ""}>
          <CardContent className="p-6 space-y-4">
            {isCompleted && (
              <div className="flex items-center gap-2 text-primary text-sm font-medium bg-primary/10 px-3 py-2 rounded-lg">
                <Check className="w-5 h-5" />
                <span>Completed!</span>
              </div>
            )}
            
            <div>
              <h2 className="text-lg font-bold text-foreground mb-2">Today's Reading</h2>
              <p className="text-2xl font-semibold text-primary">
                {currentReading?.scriptureReferences}
              </p>
            </div>

            {currentReading?.description && (
              <p className="text-sm text-muted-foreground">
                {currentReading.description}
              </p>
            )}

            <Button
              onClick={handleMarkComplete}
              disabled={isCompleted || markCompleteMutation.isPending || progressLoading}
              className="w-full"
              size="lg"
              data-testid="button-mark-complete"
            >
              {progressLoading ? (
                "Loading progress..."
              ) : markCompleteMutation.isPending ? (
                "Marking complete..."
              ) : isCompleted ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Completed
                </>
              ) : (
                "Mark as Complete"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
