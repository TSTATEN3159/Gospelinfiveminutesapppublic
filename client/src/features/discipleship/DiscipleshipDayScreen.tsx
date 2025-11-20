import { useState, useMemo, useEffect } from "react";
import { DiscipleshipPlan, PlanItem } from "./discipleshipPlans";
import { markItemCompleted } from "./discipleshipProgress";
import { Button } from "@/components/ui/button";
import { BookOpen, Sparkles } from "lucide-react";

interface Props {
  plan: DiscipleshipPlan;
  dayNumber: number;
  onGoToDay: (dayNumber: number) => void;
  onPlanCompleted?: () => void;
}

export function DiscipleshipDayScreen({
  plan,
  dayNumber,
  onGoToDay,
  onPlanCompleted,
}: Props) {
  const day = useMemo(
    () => plan.days.find((d) => d.dayNumber === dayNumber),
    [plan, dayNumber]
  );

  const [index, setIndex] = useState(0);

  // Reset index to 0 whenever day or plan changes
  useEffect(() => {
    setIndex(0);
  }, [dayNumber, plan.id]);

  if (!day) {
    return (
      <div className="p-4">
        <p className="text-sm text-slate-500">Day not found.</p>
      </div>
    );
  }

  const totalItems = day.items.length;
  
  // Guard against out-of-bounds index
  const safeIndex = Math.min(Math.max(0, index), totalItems - 1);
  const currentItem: PlanItem = day.items[safeIndex];

  // Auto-mark the current item as completed after viewing for 2 seconds
  // This is a BACKUP for users who view content but navigate away without clicking Next
  useEffect(() => {
    const timer = setTimeout(() => {
      markItemCompleted(plan, currentItem.id);
    }, 2000); // Mark as complete after viewing for 2 seconds
    
    return () => clearTimeout(timer);
  }, [currentItem.id, plan]);

  const isFirst = safeIndex === 0;
  const isLast = safeIndex === totalItems - 1;
  const isLastDay = dayNumber === plan.days[plan.days.length - 1].dayNumber;

  const handleNext = () => {
    if (!isLast && safeIndex < totalItems - 1) {
      // Immediately mark current item as completed before moving to next
      markItemCompleted(plan, currentItem.id);
      setIndex((i) => Math.min(i + 1, totalItems - 1));
    }
  };

  const handleBack = () => {
    if (!isFirst && safeIndex > 0) {
      setIndex((i) => Math.max(i - 1, 0));
    }
  };

  const handleNextDay = () => {
    // Only proceed if we're actually at the last item
    if (!isLast || safeIndex < totalItems - 1) {
      return;
    }
    
    // Immediately mark the final item as completed before moving to next day
    markItemCompleted(plan, currentItem.id);
    
    const nextDay = dayNumber + 1;
    if (nextDay <= plan.days.length) {
      onGoToDay(nextDay);
    } else {
      onPlanCompleted?.();
    }
  };

  return (
    <div className="flex flex-col h-full px-4 pb-6 pt-4">
      {/* Progress header */}
      <div className="mb-3">
        <div className="text-xs text-slate-500">
          {plan.title} · Day {day.dayNumber} of {plan.days.length}
        </div>
        <div className="h-1 mt-1 rounded-full bg-slate-200 overflow-hidden">
          <div
            className="h-full bg-slate-900 transition-all"
            style={{ width: `${((safeIndex + 1) / totalItems) * 100}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-2">
        {currentItem.type === "devotional" && (
          <div className="rounded-2xl bg-gradient-to-br from-amber-50/95 to-orange-50/95 dark:from-amber-950/40 dark:to-orange-950/40 p-7 shadow-xl shadow-amber-200/20 dark:shadow-amber-900/10 border border-amber-200/50 dark:border-amber-800/30 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/60 dark:to-orange-900/60 shadow-sm">
                <Sparkles className="w-5 h-5 text-amber-700 dark:text-amber-300" />
              </div>
              <h2 className="text-xl font-bold text-amber-900 dark:text-amber-50 leading-tight">
                {currentItem.title}
              </h2>
            </div>
            <div className="space-y-4 text-amber-950/95 dark:text-amber-50/95 leading-relaxed">
              {currentItem.body.split("\n").map((line: string, idx: number) => {
                if (line.startsWith("**") && line.endsWith("**")) {
                  const text = line.slice(2, -2);
                  return (
                    <p key={idx} className="font-bold text-amber-900 dark:text-amber-100 mt-5 first:mt-0 text-base">
                      {text}
                    </p>
                  );
                }
                return line.trim() ? (
                  <p key={idx} className="text-[15px] leading-relaxed">{line}</p>
                ) : null;
              })}
            </div>
          </div>
        )}

        {currentItem.type === "scripture" && (
          <div className="rounded-2xl bg-gradient-to-br from-sky-50/95 to-blue-50/95 dark:from-sky-950/40 dark:to-blue-950/40 p-7 shadow-xl shadow-sky-200/20 dark:shadow-sky-900/10 border border-sky-200/50 dark:border-sky-800/30 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-sky-100 to-blue-100 dark:from-sky-900/60 dark:to-blue-900/60 shadow-sm">
                <BookOpen className="w-5 h-5 text-sky-700 dark:text-sky-300" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-sky-900 dark:text-sky-50 leading-tight">
                  {currentItem.title}
                </h2>
                <p className="text-xs text-sky-700 dark:text-sky-300 font-semibold mt-1 tracking-wide">
                  {currentItem.reference} · KJV
                </p>
              </div>
            </div>
            <div className="space-y-4 text-sky-950/95 dark:text-sky-50/95 leading-relaxed">
              {currentItem.body.split("\n").map((line: string, idx: number) => {
                if (line.startsWith("**") && line.endsWith("**")) {
                  const text = line.slice(2, -2);
                  return (
                    <p key={idx} className="font-bold text-sky-900 dark:text-sky-100 mt-5 first:mt-0 text-base">
                      {text}
                    </p>
                  );
                }
                if (line.startsWith(">")) {
                  return (
                    <blockquote key={idx} className="border-l-4 border-sky-400/70 dark:border-sky-600/70 pl-4 py-2 my-3 italic text-sky-900 dark:text-sky-50 bg-white/60 dark:bg-sky-950/40 rounded-r-lg shadow-sm font-serif text-[15px] leading-relaxed">
                      {line.slice(1).trim()}
                    </blockquote>
                  );
                }
                return line.trim() ? (
                  <p key={idx} className="text-[15px] leading-relaxed">{line}</p>
                ) : null;
              })}
            </div>
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="mt-4 flex items-center justify-between gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={isFirst}
          onClick={handleBack}
          className="flex-1"
          data-testid="button-back-item"
        >
          Back
        </Button>

        {!isLast && (
          <Button
            size="sm"
            onClick={handleNext}
            className="flex-1"
            data-testid="button-next-item"
          >
            Next
          </Button>
        )}

        {isLast && (
          <Button
            size="sm"
            onClick={handleNextDay}
            className="flex-1"
            data-testid="button-next-day"
          >
            {isLastDay ? "Finish Plan" : "Next Day"}
          </Button>
        )}
      </div>
    </div>
  );
}
