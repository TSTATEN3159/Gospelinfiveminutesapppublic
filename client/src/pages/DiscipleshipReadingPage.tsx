import { useMemo } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DISCIPLESHIP_PLANS, DiscipleshipPlan, PlanDay, PlanItem } from "@/features/discipleship/discipleshipPlans";
import { Card, CardContent } from "@/components/ui/card";

interface DiscipleshipReadingPageProps {
  planId: string;
  dayNumber: number;
  itemId: string;
  onNavigate: (page: string, params?: any) => void;
}

export default function DiscipleshipReadingPage({
  planId,
  dayNumber,
  itemId,
  onNavigate,
}: DiscipleshipReadingPageProps) {
  const plan: DiscipleshipPlan | undefined = useMemo(
    () => DISCIPLESHIP_PLANS.find((p) => p.id === planId),
    [planId]
  );

  const day: PlanDay | undefined = useMemo(() => {
    if (!plan) return undefined;
    return plan.days.find((d) => d.dayNumber === dayNumber);
  }, [plan, dayNumber]);

  const item: PlanItem | undefined = useMemo(() => {
    if (!day) return undefined;
    return day.items.find((i) => i.id === itemId);
  }, [day, itemId]);

  if (!plan || !day || !item) {
    return (
      <div className="min-h-screen pb-20 bg-slate-50 p-4">
        <p className="text-sm text-red-600">Reading not found.</p>
        <Button
          onClick={() => onNavigate("discipleship-list")}
          variant="ghost"
          className="text-blue-600 text-sm mt-2"
        >
          Back to Discipleship
        </Button>
      </div>
    );
  }

  const showReference = item.type === "scripture" && item.reference;

  return (
    <div className="min-h-screen pb-20 bg-slate-50">
      <div className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate("discipleship-plan", { planId })}
            data-testid="button-back"
            aria-label="Go back"
            className="hover-elevate"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex flex-col">
            <span className="text-[11px] text-slate-400 uppercase tracking-wide">
              {plan.title}
            </span>
            <h1 className="text-base font-semibold text-gray-900" data-testid="text-reading-title">
              Day {day.dayNumber} · {item.type === "devotional" ? "Devotional" : item.reference}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 pb-6">
        {showReference && (
          <p className="text-sm font-semibold text-slate-700 mt-2 mb-4" data-testid="text-scripture-reference">
            {item.reference}
          </p>
        )}

        <div className="prose prose-slate max-w-none">
          <p className="text-[15px] leading-relaxed text-slate-800 whitespace-pre-line" data-testid="text-reading-body">
            {item.body}
          </p>
        </div>

        {item.type === "devotional" && (
          <Card className="mt-6 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-100/50">
            <CardContent className="p-4">
              <p className="text-xs text-slate-700 leading-relaxed italic">
                Take a moment to talk with the Lord about what you just read. Ask Him to help you believe and obey His Word today.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
