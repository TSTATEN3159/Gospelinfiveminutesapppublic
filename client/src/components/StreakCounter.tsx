import { useState, useEffect } from "react";
import { Flame, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StreakCounterProps {
  onBadgeEarned?: (badgeType: string, streakDays: number) => void;
  onStreakUpdate?: (days: number) => void;
}

export default function StreakCounter({ onBadgeEarned, onStreakUpdate }: StreakCounterProps) {
  const [streakDays, setStreakDays] = useState(0);
  const [lastVisit, setLastVisit] = useState<string | null>(null);

  useEffect(() => {
    const checkAndUpdateStreak = () => {
      const today = new Date().toDateString();
      const savedStreak = localStorage.getItem("gospelAppStreak");
      const savedLastVisit = localStorage.getItem("gospelAppLastVisit");
      
      if (savedLastVisit === today) {
        // Already visited today, just load the streak
        if (savedStreak) {
          const currentStreak = parseInt(savedStreak);
          setStreakDays(currentStreak);
          onStreakUpdate?.(currentStreak);
        }
        setLastVisit(savedLastVisit);
        return;
      }

      if (savedLastVisit) {
        const lastVisitDate = new Date(savedLastVisit);
        const todayDate = new Date();
        const diffTime = todayDate.getTime() - lastVisitDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          // Consecutive day - increment streak
          const newStreak = savedStreak ? parseInt(savedStreak) + 1 : 1;
          setStreakDays(newStreak);
          localStorage.setItem("gospelAppStreak", newStreak.toString());
          onStreakUpdate?.(newStreak);
          
          // Check for badge eligibility
          if (onBadgeEarned && shouldEarnBadge(newStreak)) {
            onBadgeEarned(getBadgeType(newStreak), newStreak);
          }
        } else if (diffDays > 1) {
          // Streak broken - reset to 1
          setStreakDays(1);
          localStorage.setItem("gospelAppStreak", "1");
          onStreakUpdate?.(1);
        } else {
          // Same day or past date, keep existing streak
          if (savedStreak) {
            const currentStreak = parseInt(savedStreak);
            setStreakDays(currentStreak);
            onStreakUpdate?.(currentStreak);
          }
        }
      } else {
        // First visit ever
        setStreakDays(1);
        localStorage.setItem("gospelAppStreak", "1");
        onStreakUpdate?.(1);
      }

      localStorage.setItem("gospelAppLastVisit", today);
      setLastVisit(today);
    };

    checkAndUpdateStreak();
  }, [onBadgeEarned]);

  const shouldEarnBadge = (streak: number): boolean => {
    const badgeMilestones = [3, 7, 14, 30, 60, 100, 365];
    return badgeMilestones.includes(streak);
  };

  const getBadgeType = (streak: number): string => {
    if (streak >= 365) return "Saint";
    if (streak >= 100) return "Devoted";
    if (streak >= 60) return "Faithful";
    if (streak >= 30) return "Committed";
    if (streak >= 14) return "Steadfast";
    if (streak >= 7) return "Consistent";
    if (streak >= 3) return "Beginner";
    return "Newcomer";
  };

  const getStreakColor = () => {
    if (streakDays >= 30) return "text-yellow-600";
    if (streakDays >= 14) return "text-orange-600";
    if (streakDays >= 7) return "text-red-600";
    return "text-primary";
  };

  const getNextMilestone = () => {
    const milestones = [3, 7, 14, 30, 60, 100, 365];
    return milestones.find(m => m > streakDays) || null;
  };

  return (
    <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full bg-orange-100 ${getStreakColor()}`}>
              {streakDays >= 7 ? <Trophy className="w-5 h-5" /> : <Flame className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="font-semibold text-primary">Daily Streak</h3>
              <p className="text-sm text-muted-foreground">
                {streakDays === 1 ? "Welcome back!" : `${streakDays} days strong!`}
              </p>
            </div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${getStreakColor()}`}>
              {streakDays}
            </div>
            {getNextMilestone() && (
              <p className="text-xs text-muted-foreground">
                Next: {getNextMilestone()}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}