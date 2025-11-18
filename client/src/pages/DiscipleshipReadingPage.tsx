import { useMemo } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DISCIPLESHIP_PLANS, DiscipleshipPlan } from "@/features/discipleship/discipleshipPlans";
import { DiscipleshipDayScreen } from "@/features/discipleship/DiscipleshipDayScreen";
import { AppNavigate } from "../App";

interface DiscipleshipReadingPageProps {
  planId: string;
  dayNumber: number;
  onNavigate: AppNavigate;
}

export default function DiscipleshipReadingPage({
  planId,
  dayNumber,
  onNavigate,
}: DiscipleshipReadingPageProps) {
  const plan: DiscipleshipPlan | undefined = useMemo(
    () => DISCIPLESHIP_PLANS.find((p) => p.id === planId),
    [planId]
  );

  if (!plan) {
    return (
      <div className="min-h-screen pb-20 bg-slate-50 p-4">
        <p className="text-sm text-red-600">Plan not found.</p>
        <Button
          onClick={() => onNavigate("discipleship-list")}
          variant="ghost"
          className="text-blue-600 text-sm mt-2"
          data-testid="button-back-to-list"
        >
          Back to Discipleship
        </Button>
      </div>
    );
  }

  const handleGoToDay = (newDayNumber: number) => {
    onNavigate("discipleship-reading", { 
      planId, 
      dayNumber: newDayNumber 
    });
  };

  const handlePlanCompleted = () => {
    // Navigate back to plan detail page
    onNavigate("discipleship-plan", { planId });
  };

  return (
    <div className="min-h-screen pb-20 bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate("discipleship-plan", { planId })}
            data-testid="button-back"
            aria-label="Go back to plan"
            className="hover-elevate"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex flex-col">
            <span className="text-[11px] text-slate-400 uppercase tracking-wide">
              {plan.title}
            </span>
            <h1 className="text-base font-semibold text-gray-900" data-testid="text-plan-title">
              Day {dayNumber} of {plan.days.length}
            </h1>
          </div>
        </div>
      </div>

      {/* Day Screen with Navigation */}
      <div className="flex-1 overflow-hidden">
        <DiscipleshipDayScreen
          plan={plan}
          dayNumber={dayNumber}
          onGoToDay={handleGoToDay}
          onPlanCompleted={handlePlanCompleted}
        />
      </div>
    </div>
  );
}
