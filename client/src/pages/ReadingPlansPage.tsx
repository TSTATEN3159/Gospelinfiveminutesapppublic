import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Flame, BookOpen, Check, Calendar, Loader2, Trophy, ChevronLeft } from "lucide-react";
import AppLogo from "../components/AppLogo";
import PersonalizedGreeting from "../components/PersonalizedGreeting";
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

interface ReadingPlansPageProps {
  user?: User;
  onNavigate?: (page: string) => void;
  language?: string;
}

interface ReadingPlan {
  id: string;
  name: string;
  description: string;
  totalDays: number;
  language: string;
  isActive: boolean;
}

interface ReadingPlanDay {
  id: string;
  planId: string;
  dayNumber: number;
  readings: string[];
  title: string | null;
}

interface UserProgress {
  id: string;
  userId: string;
  planId: string;
  currentDay: number;
  completedDays: string[];
  lastReadDate: string | null;
  currentStreak: number;
  longestStreak: number;
  totalDaysCompleted: number;
  completedAt: string | null;
}

export default function ReadingPlansPage({ user, onNavigate, language = "en" }: ReadingPlansPageProps) {
  const { toast } = useToast();
  
  // State
  const [plans, setPlans] = useState<ReadingPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<ReadingPlan | null>(null);
  const [todayReading, setTodayReading] = useState<ReadingPlanDay | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);

  // Load plans on mount
  useEffect(() => {
    loadPlans();
  }, [language]);

  // Load progress and today's reading when plan is selected
  useEffect(() => {
    if (selectedPlan) {
      loadPlanData();
    }
  }, [selectedPlan, user?.appUserId]);

  const loadPlans = async () => {
    setLoading(true);
    try {
      const res = await fetch(apiUrl(`/api/reading-plans?language=${language}`));
      if (res.ok) {
        const plansData = await res.json();
        setPlans(plansData);
        
        // Auto-select first plan
        if (plansData.length > 0) {
          setSelectedPlan(plansData[0]);
        }
      }
    } catch (error) {
      console.error("Error loading reading plans:", error);
      toast({
        title: "Error Loading Plans",
        description: "Could not load reading plans. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const loadPlanData = async () => {
    if (!selectedPlan) return;
    
    setLoading(true);
    try {
      let currentDay = 1; // Default to day 1
      
      // Load progress if user is signed in
      if (user?.appUserId) {
        const progressRes = await fetch(apiUrl(`/api/reading-plan/progress/${user.appUserId}/${selectedPlan.id}`));
        if (progressRes.ok) {
          const progressData = await progressRes.json();
          setProgress(progressData);
          currentDay = progressData.currentDay;
        }
      }
      
      // Load today's reading (or day 1 if not signed in)
      const dayRes = await fetch(apiUrl(`/api/reading-plan/${selectedPlan.id}/day/${currentDay}`));
      if (dayRes.ok) {
        const dayData = await dayRes.json();
        setTodayReading(dayData);
      } else {
        toast({
          title: "Reading Not Available",
          description: "This day's reading is not yet available.",
          variant: "default"
        });
      }
    } catch (error) {
      console.error("Error loading plan data:", error);
      toast({
        title: "Error Loading Plan",
        description: "Could not load reading plan data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteDay = async () => {
    if (!user?.appUserId || !selectedPlan || !progress) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to track your reading progress.",
        variant: "default"
      });
      return;
    }

    setCompleting(true);
    try {
      const res = await fetch(apiUrl('/api/reading-plan/complete'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.appUserId,
          planId: selectedPlan.id,
          dayNumber: progress.currentDay
        })
      });

      if (res.ok) {
        const data = await res.json();
        setProgress(data.progress);
        
        toast({
          title: "Day Complete! 🎉",
          description: data.message,
          variant: "default"
        });

        // Load next day's reading
        await loadPlanData();
      } else {
        const error = await res.json();
        toast({
          title: "Error",
          description: error.error || "Could not mark day as complete.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error completing day:", error);
      toast({
        title: "Error",
        description: "Could not mark day as complete. Please try again.",
        variant: "destructive"
      });
    } finally {
      setCompleting(false);
    }
  };

  const calculateProgress = () => {
    if (!progress || !selectedPlan) return 0;
    return Math.round((progress.totalDaysCompleted / selectedPlan.totalDays) * 100);
  };

  const isDayCompleted = () => {
    if (!progress) return false;
    return progress.completedDays.includes(progress.currentDay.toString());
  };

  if (loading && plans.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Loading reading plans...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-2xl mx-auto px-4 py-8 pb-24">
        {/* Header with Back Button */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate?.('daily')}
              className="ios-tap-target"
              data-testid="button-back-to-daily"
              aria-label="Back to Daily hub"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1" />
          </div>
          
          <div className="text-center">
            <AppLogo className="mx-auto mb-4" size="lg" />
            <PersonalizedGreeting user={user} />
            <h1 className="text-3xl font-bold mt-4 mb-2">Reading Plans</h1>
            <p className="text-muted-foreground">
              Read the Bible systematically with guided daily readings
            </p>
          </div>
        </div>

        {/* Progress Overview */}
        {progress && selectedPlan && (
          <Card className="mb-6 bg-gradient-to-br from-primary/10 via-background to-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{selectedPlan.name}</span>
                <Badge variant="default" className="text-sm">
                  Day {progress.currentDay}/{selectedPlan.totalDays}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <Flame className="w-6 h-6 mx-auto mb-1 text-orange-500" />
                  <div className="text-2xl font-bold">{progress.currentStreak}</div>
                  <div className="text-xs text-muted-foreground">Day Streak</div>
                </div>
                <div className="text-center">
                  <Trophy className="w-6 h-6 mx-auto mb-1 text-yellow-500" />
                  <div className="text-2xl font-bold">{progress.longestStreak}</div>
                  <div className="text-xs text-muted-foreground">Best Streak</div>
                </div>
                <div className="text-center">
                  <Check className="w-6 h-6 mx-auto mb-1 text-green-500" />
                  <div className="text-2xl font-bold">{calculateProgress()}%</div>
                  <div className="text-xs text-muted-foreground">Complete</div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-500"
                  style={{ width: `${calculateProgress()}%` }}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Today's Reading */}
        {todayReading && (
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Day {todayReading.dayNumber}
                    {todayReading.title && `: ${todayReading.title}`}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    {todayReading.readings.join(", ")}
                  </CardDescription>
                </div>
                {isDayCompleted() && (
                  <Badge variant="default" className="bg-green-500">
                    <Check className="w-4 h-4 mr-1" />
                    Complete
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Today's Readings:</h3>
                  <ul className="space-y-2">
                    {todayReading.readings.map((reading, index) => (
                      <li 
                        key={index}
                        className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 hover-elevate"
                        data-testid={`reading-item-${index}`}
                      >
                        <BookOpen className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="font-medium">{reading}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {!isDayCompleted() && user?.appUserId && (
                  <Button 
                    onClick={handleCompleteDay}
                    disabled={completing}
                    className="w-full"
                    size="lg"
                    data-testid="button-complete-day"
                  >
                    {completing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Marking Complete...
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Mark Day {todayReading.dayNumber} Complete
                      </>
                    )}
                  </Button>
                )}

                {isDayCompleted() && (
                  <div className="text-center py-4">
                    <div className="text-green-500 font-semibold mb-2">
                      ✅ You've completed today's reading!
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Come back tomorrow for Day {progress?.currentDay} 
                    </p>
                  </div>
                )}

                {!user?.appUserId && (
                  <div className="text-center py-4 px-6 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-3">
                      Sign in to track your progress and maintain your reading streak
                    </p>
                    <Button 
                      variant="default" 
                      onClick={() => onNavigate?.('settings')}
                      data-testid="button-sign-in"
                    >
                      Sign In to Track Progress
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Plan Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Available Reading Plans</CardTitle>
            <CardDescription>Choose a plan that fits your schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all hover-elevate ${
                    selectedPlan?.id === plan.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border bg-card'
                  }`}
                  data-testid={`plan-${plan.id}`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {plan.description}
                      </p>
                      <Badge variant="outline" className="mt-2">
                        {plan.totalDays} Days
                      </Badge>
                    </div>
                    {selectedPlan?.id === plan.id && (
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
