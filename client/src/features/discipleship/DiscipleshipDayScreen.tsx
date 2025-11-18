import { useState, useMemo, useEffect } from "react";
import { DiscipleshipPlan, PlanItem } from "./discipleshipPlans";
import { Button } from "@/components/ui/button";

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
      <div className="flex-1 overflow-y-auto">
        {currentItem.type === "devotional" && (
          <div>
            <h2 className="text-lg font-semibold mb-2">
              {currentItem.title}
            </h2>
            <div className="prose prose-sm max-w-none">
              {currentItem.body.split("\n").map((line: string, idx: number) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          </div>
        )}

        {currentItem.type === "scripture" && (
          <div>
            <h2 className="text-base font-semibold mb-1">
              {currentItem.title}
            </h2>
            <p className="text-xs text-slate-500 mb-1">
              {currentItem.reference} · KJV
            </p>
            <div className="prose prose-sm max-w-none whitespace-pre-line">
              {currentItem.body}
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
