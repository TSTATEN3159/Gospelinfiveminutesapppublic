import { useState, useMemo, useEffect } from "react";
import { DiscipleshipPlan, PlanItem } from "./discipleshipPlans";
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

  const isFirst = safeIndex === 0;
  const isLast = safeIndex === totalItems - 1;
  const isLastDay = dayNumber === plan.days[plan.days.length - 1].dayNumber;

  const handleNext = () => {
    if (!isLast && safeIndex < totalItems - 1) {
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
          <div className="rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 p-6 shadow-md border border-amber-100 dark:border-amber-900/50">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/50">
                <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <h2 className="text-xl font-semibold text-amber-900 dark:text-amber-100">
                {currentItem.title}
              </h2>
            </div>
            <div className="space-y-3 text-amber-950/90 dark:text-amber-50/90 leading-relaxed">
              {currentItem.body.split("\n").map((line: string, idx: number) => {
                if (line.startsWith("**") && line.endsWith("**")) {
                  const text = line.slice(2, -2);
                  return (
                    <p key={idx} className="font-semibold text-amber-900 dark:text-amber-200 mt-4 first:mt-0">
                      {text}
                    </p>
                  );
                }
                return line.trim() ? (
                  <p key={idx} className="text-base">{line}</p>
                ) : null;
              })}
            </div>
          </div>
        )}

        {currentItem.type === "scripture" && (
          <div className="rounded-xl bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-950/30 dark:to-blue-950/30 p-6 shadow-md border border-sky-100 dark:border-sky-900/50">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-lg bg-sky-100 dark:bg-sky-900/50">
                <BookOpen className="w-5 h-5 text-sky-600 dark:text-sky-400" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-sky-900 dark:text-sky-100">
                  {currentItem.title}
                </h2>
                <p className="text-xs text-sky-600 dark:text-sky-400 font-medium mt-0.5">
                  {currentItem.reference} · KJV
                </p>
              </div>
            </div>
            <div className="space-y-3 text-sky-950/90 dark:text-sky-50/90 leading-relaxed">
              {currentItem.body.split("\n").map((line: string, idx: number) => {
                if (line.startsWith("**") && line.endsWith("**")) {
                  const text = line.slice(2, -2);
                  return (
                    <p key={idx} className="font-semibold text-sky-900 dark:text-sky-200 mt-4 first:mt-0">
                      {text}
                    </p>
                  );
                }
                if (line.startsWith(">")) {
                  return (
                    <blockquote key={idx} className="border-l-4 border-sky-300 dark:border-sky-700 pl-4 py-1 italic text-sky-900 dark:text-sky-100 bg-white/50 dark:bg-sky-950/30 rounded-r">
                      {line.slice(1).trim()}
                    </blockquote>
                  );
                }
                return line.trim() ? (
                  <p key={idx} className="text-base">{line}</p>
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
