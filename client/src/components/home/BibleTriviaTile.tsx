import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Flame, Crown } from "lucide-react";

interface BibleTriviaTileProps {
  onStart?: () => void;
  streakDays?: number;
  dailyCrowns?: number;
  highestTitle?: string;
}

export function BibleTriviaTile({
  onStart,
  streakDays = 0,
  dailyCrowns = 0,
  highestTitle = "Getting Started",
}: BibleTriviaTileProps) {
  const hasStreak = streakDays > 0;
  const hasCrowns = dailyCrowns > 0;

  return (
    <Card className="overflow-hidden rounded-3xl border-0 shadow-[0_18px_50px_rgba(15,23,42,0.35)] bg-slate-950/90 text-slate-50">
      <div className="relative h-40 w-full md:h-48">
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&h=600&fit=crop&q=80"
          alt="Bible study"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-amber-100/95 px-3 py-1 text-xs font-semibold text-amber-900 shadow-sm">
          <BookOpen className="h-3.5 w-3.5" />
          <span>New: Daily Bible Challenge</span>
        </div>

        <div className="absolute bottom-3 left-4 flex items-center gap-3 rounded-full bg-slate-900/90 px-3 py-1 text-[11px] font-medium text-slate-100 border border-slate-700/80 backdrop-blur-sm">
          <div className="flex items-center gap-1.5">
            <Flame className="h-3.5 w-3.5 text-amber-400" />
            <span>
              Streak:{" "}
              <span className="font-semibold" data-testid="text-trivia-streak">
                {hasStreak ? `${streakDays} day${streakDays === 1 ? "" : "s"}` : "Start today"}
              </span>
            </span>
          </div>
          <span className="h-4 w-px bg-slate-700" />
          <div className="flex items-center gap-1.5">
            <Crown className="h-3.5 w-3.5 text-yellow-300" />
            <span>
              Crowns: <span className="font-semibold" data-testid="text-trivia-crowns">{hasCrowns ? dailyCrowns : 0}</span>
            </span>
          </div>
        </div>
      </div>

      <CardContent className="space-y-3 px-5 pb-4 pt-4 md:px-6 md:pb-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold tracking-tight md:text-xl">
              Bible Trivia Journey
            </h3>
            <p className="mt-1 text-sm text-slate-200/90">
              Turn your Bible knowledge into a daily habit. Unlock crowns, keep your streak,
              and rise from{" "}
              <span className="font-semibold text-amber-200">Student</span> to{" "}
              <span className="font-semibold text-amber-200">Bible Expert</span>.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-slate-900/80 px-3 py-2 text-xs md:text-[13px] border border-slate-800">
          <div className="flex flex-col">
            <span className="text-slate-400">Your current title</span>
            <span className="font-semibold text-slate-50" data-testid="text-trivia-title">{highestTitle}</span>
          </div>
          <div className="text-right text-[11px] text-slate-400">
            Earn <span className="font-semibold text-amber-200">Bible Expert</span> by
            mastering all levels.
          </div>
        </div>

        <div className="pt-1">
          <Button
            onClick={onStart}
            data-testid="button-start-trivia"
            className="w-full rounded-2xl bg-amber-500 text-amber-950 shadow-[0_12px_30px_rgba(245,158,11,0.65)] transition-all"
          >
            <span>Continue Bible Trivia</span>
          </Button>
          <p className="mt-1.5 text-[11px] text-center text-slate-400">
            10 quick questions · keep your streak · unlock new titles
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
