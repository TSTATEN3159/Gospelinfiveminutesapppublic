import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DISCIPLESHIP_PLANS, DiscipleshipPlan, PlanDay } from "@/features/discipleship/discipleshipPlans";
import { loadPlanProgress } from "@/features/discipleship/discipleshipProgress";
import { AppNavigate } from "../App";

interface DiscipleshipPlanDetailPageProps {
  planId: string;
  onNavigate: AppNavigate;
}

export default function DiscipleshipPlanDetailPage({ planId, onNavigate }: DiscipleshipPlanDetailPageProps) {
  const [activeDayIndex, setActiveDayIndex] = useState(0);

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

  const activeDay: PlanDay = plan.days[activeDayIndex];
  const progress = loadPlanProgress(plan);
  const percent = Math.round(progress.ratio * 100);

  return (
    <div className="min-h-screen pb-20 bg-slate-50">
      <div className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate("discipleship-list")}
            data-testid="button-back"
            aria-label="Go back"
            className="hover-elevate"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold truncate" data-testid="text-plan-title">{plan.title}</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="rounded-3xl overflow-hidden shadow-md mb-4">
          <img
            src={plan.imageUrl}
            alt={plan.title}
            className="w-full h-44 object-cover"
          />
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
              Progress
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400" data-testid="progress-stats">
              {percent}% • {progress.completed}/{progress.total} steps
            </span>
          </div>
          <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-slate-900 dark:bg-slate-300 transition-all"
              style={{ width: `${percent}%` }}
              data-testid="progress-bar"
            />
          </div>
        </div>

        <div className="flex space-x-2 mb-4">
          {plan.days.map((day, index) => {
            const isActive = index === activeDayIndex;
            return (
              <button
                key={day.id}
                onClick={() => setActiveDayIndex(index)}
                className={`flex-1 rounded-2xl border text-center py-2 text-xs transition-colors ${
                  isActive
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-700"
                }`}
                data-testid={`button-day-${day.dayNumber}`}
              >
                <div className="font-semibold text-sm">{day.dayNumber}</div>
                <div className={`text-[11px] ${isActive ? 'text-slate-300' : 'text-slate-400'}`}>
                  Day {day.dayNumber}
                </div>
              </button>
            );
          })}
        </div>

        <p className="text-xs text-slate-500 mb-3">
          Day {activeDay.dayNumber} of {plan.totalDays}
        </p>

        <div className="space-y-2 mb-4">
          {activeDay.items.map((item) => (
            <Card
              key={item.id}
              onClick={() =>
                onNavigate("discipleship-reading", {
                  planId: plan.id,
                  dayNumber: activeDay.dayNumber,
                })
              }
              className="flex items-center justify-between rounded-xl bg-white px-3 py-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              data-testid={`card-item-${item.id}`}
            >
              <div className="flex items-center space-x-2">
                <Circle className="w-5 h-5 text-slate-300" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {item.type === "devotional"
                      ? "Devotional"
                      : item.reference ?? item.title}
                  </p>
                  {item.type === "scripture" && item.reference && (
                    <p className="text-[11px] text-slate-500">{item.title}</p>
                  )}
                </div>
              </div>
              <span className="text-slate-400 text-base">›</span>
            </Card>
          ))}
        </div>

        <Button
          onClick={() => {
            onNavigate("discipleship-reading", {
              planId: plan.id,
              dayNumber: activeDay.dayNumber,
            });
          }}
          className="w-full rounded-full bg-slate-900 hover:bg-slate-800 text-white py-6 text-sm font-semibold shadow-lg"
          data-testid="button-start-reading"
        >
          Start Reading
        </Button>
      </div>
    </div>
  );
}
