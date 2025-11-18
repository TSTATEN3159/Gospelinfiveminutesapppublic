import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DISCIPLESHIP_PLANS } from "@/features/discipleship/discipleshipPlans";
import heavenCloudsImage from '@assets/stock_images/heaven_clouds_eterna_9fe3749f.jpg';

interface DiscipleshipListPageProps {
  onNavigate: (page: string, params?: any) => void;
  language: string;
}

export default function DiscipleshipListPage({ onNavigate, language }: DiscipleshipListPageProps) {
  return (
    <div className="min-h-screen pb-20 bg-slate-50">
      <div className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate("daily")}
            data-testid="button-back"
            aria-label="Go back"
            className="hover-elevate"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Discipleship</h1>
            <p className="text-sm text-slate-500">
              Short Bible plans to help you follow Jesus
            </p>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        {DISCIPLESHIP_PLANS.map((plan) => (
          <Card
            key={plan.id}
            onClick={() => onNavigate("discipleship-plan", { planId: plan.id })}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            data-testid={`card-plan-${plan.id}`}
          >
            <div className="flex">
              <div className="w-24 h-24 flex-shrink-0">
                <img
                  src={heavenCloudsImage}
                  alt={plan.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="flex-1 p-3 flex flex-col justify-between">
                <div>
                  <h2 className="text-base font-semibold leading-snug text-gray-900" data-testid={`text-plan-title-${plan.id}`}>
                    {plan.title}
                  </h2>
                  {plan.subtitle && (
                    <p className="text-xs text-slate-500 mt-0.5" data-testid={`text-plan-subtitle-${plan.id}`}>
                      {plan.subtitle}
                    </p>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  {plan.totalDays} day plan • Gospel in Five Minutes
                </p>
              </CardContent>
            </div>
          </Card>
        ))}
      </main>
    </div>
  );
}
