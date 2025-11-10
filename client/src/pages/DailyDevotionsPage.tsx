// client/src/pages/DailyDevotionsPage.tsx
import { useEffect, useMemo, useState } from "react";
import { fetchDevotional, type Devotional, type Gender, pingPlan } from "../lib/devotionalsApi";
import { ArrowLeft, BookOpen, Heart, Calendar, ChevronLeft, ChevronRight, Flame } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Profile = { id?: string; firstName?: string };

function getProfile(): Profile {
  try {
    const raw = localStorage.getItem("profile") || localStorage.getItem("app_user") || localStorage.getItem("gospelAppUser");
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function todayKey() {
  const d = new Date();
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

function loadStreak(userKey: string) {
  try {
    const raw = localStorage.getItem(userKey);
    if (!raw) return { count: 0, last: "" };
    return JSON.parse(raw) as { count: number; last: string };
  } catch {
    return { count: 0, last: "" };
  }
}

function saveStreak(userKey: string, data: { count: number; last: string }) {
  localStorage.setItem(userKey, JSON.stringify(data));
}

function isConsecutive(prevISO: string, currentISO: string): boolean {
  if (!prevISO) return false;
  const prev = new Date(prevISO);
  const current = new Date(currentISO);
  const diff = (current.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);
  return diff >= 1 && diff < 2; // yesterday → today
}

interface DailyDevotionsPageProps {
  onBack: () => void;
}

export default function DailyDevotionsPage({ onBack }: DailyDevotionsPageProps) {
  const profile = getProfile();
  const firstName = profile.firstName?.trim() || "friend";
  const streakKey = useMemo(() => `streak:${profile.id ?? "anon"}`, [profile.id]);

  const [gender, setGender] = useState<Gender>("men");
  const [day, setDay] = useState<number>(1);
  const [data, setData] = useState<Devotional | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string>("");

  // Warm the plan index on first mount (optional)
  useEffect(() => {
    pingPlan().catch(() => void 0);
  }, []);

  // Load initial (men, day 1)
  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function load(targetGender = gender, targetDay = day) {
    setLoading(true);
    setErr("");
    try {
      if (targetDay < 1 || targetDay > 365) throw new Error("Pick a day between 1 and 365");
      const devo = await fetchDevotional(targetGender, targetDay);
      setData(devo);
      // streak logic: mark a "read" when we successfully load a day (you can move to a separate "Mark as Read" if preferred)
      const tKey = todayKey();
      const st = loadStreak(streakKey);
      const next = (st.last && isConsecutive(st.last, tKey)) ? st.count + 1 : (st.last === tKey ? st.count : 1);
      saveStreak(streakKey, { count: next, last: tKey });
    } catch (e: any) {
      setErr(e?.message ?? "Failed to load devotional");
    } finally {
      setLoading(false);
    }
  }

  const streak = loadStreak(streakKey);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-zinc-900 dark:via-stone-900 dark:to-neutral-900 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-amber-100/80 to-orange-100/80 dark:from-amber-950/80 dark:to-orange-950/80 backdrop-blur-xl border-b border-amber-200/50 dark:border-amber-900/30 ios-safe-top">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-4">
            <Button
              onClick={onBack}
              variant="ghost"
              size="icon"
              className="hover:bg-amber-200/50 dark:hover:bg-amber-900/50"
              aria-label="Go back"
              data-testid="button-back"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl font-serif font-bold text-amber-900 dark:text-amber-100 flex items-center gap-2">
                <BookOpen className="w-7 h-7" />
                Daily Devotions
              </h1>
            </div>
          </div>
          
          {/* Welcome Section */}
          <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl p-4 border border-amber-200/50 dark:border-amber-800/50 shadow-lg">
            <p className="text-amber-900 dark:text-amber-100 font-medium mb-2">
              Welcome back, {firstName}! 👋
            </p>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full shadow-md">
                <Flame className="w-4 h-4" />
                <span className="font-bold">{streak.count}</span>
                <span className="text-white/90">day{streak.count === 1 ? "" : "s"}</span>
              </div>
              <span className="text-muted-foreground">Keep it going!</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Controls Card */}
        <Card className="border-amber-200/50 dark:border-amber-800/50 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex flex-wrap items-end gap-4">
              <div className="flex-1 min-w-[140px]">
                <label className="text-sm font-semibold text-amber-900 dark:text-amber-100 mb-2 block flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  Audience
                </label>
                <select
                  className="w-full border border-amber-200 dark:border-amber-800 rounded-lg px-4 py-2.5 bg-white dark:bg-gray-900 text-foreground focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  value={gender}
                  onChange={(e) => setGender(e.target.value as Gender)}
                  data-testid="select-gender"
                >
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                </select>
              </div>

              <div className="flex-1 min-w-[140px]">
                <label className="text-sm font-semibold text-amber-900 dark:text-amber-100 mb-2 block flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Day (1-365)
                </label>
                <input
                  type="number"
                  min={1}
                  max={365}
                  value={day}
                  onChange={(e) => setDay(Number(e.target.value))}
                  className="w-full border border-amber-200 dark:border-amber-800 rounded-lg px-4 py-2.5 bg-white dark:bg-gray-900 text-foreground focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  inputMode="numeric"
                  data-testid="input-day"
                />
              </div>

              <Button
                onClick={() => load()}
                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 dark:from-amber-700 dark:to-orange-700 dark:hover:from-amber-800 dark:hover:to-orange-800 text-white shadow-lg px-8"
                disabled={loading}
                data-testid="button-load-devotional"
              >
                {loading ? "Loading…" : "Load"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Error Message */}
        {err && (
          <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30" data-testid="error-message">
            <CardContent className="p-4">
              <p className="text-red-800 dark:text-red-200 text-sm font-medium">{err}</p>
            </CardContent>
          </Card>
        )}

        {/* Devotional Content */}
        {data && (
          <div className="space-y-6" data-testid="devotional-content">
            {/* Scripture Card */}
            <Card className="border-amber-200/50 dark:border-amber-800/50 shadow-2xl overflow-hidden bg-gradient-to-br from-white to-amber-50/50 dark:from-gray-900 dark:to-amber-950/30">
              <div className="bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-700 dark:to-orange-700 px-6 py-4">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    <span className="font-semibold" data-testid="text-scripture-ref">{data.scriptureRef}</span>
                  </div>
                  <span className="text-sm text-white/80">Day {data.day} • {gender === "men" ? "Men" : "Women"}</span>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="relative">
                  <div className="absolute -left-2 top-0 text-6xl text-amber-300/40 dark:text-amber-700/40 font-serif leading-none">"</div>
                  <p className="font-serif text-lg leading-relaxed text-foreground pl-6 italic" data-testid="text-scripture-text">
                    {data.scriptureText}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Devotion Card */}
            <Card className="border-amber-200/50 dark:border-amber-800/50 shadow-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl">
              <CardHeader className="pb-3">
                <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  Today's Devotion
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed whitespace-pre-wrap" data-testid="text-devotion">
                  {data.devotion}
                </p>
              </CardContent>
            </Card>

            {/* Application Card */}
            <Card className="border-emerald-200/50 dark:border-emerald-800/50 shadow-xl bg-gradient-to-br from-emerald-50/80 to-green-50/80 dark:from-emerald-950/30 dark:to-green-950/30 backdrop-blur-xl">
              <CardHeader className="pb-3">
                <h3 className="text-xl font-bold text-emerald-900 dark:text-emerald-100 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  Apply It Today
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed whitespace-pre-wrap" data-testid="text-application">
                  {data.application}
                </p>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex gap-3 justify-center pt-2">
              <Button
                variant="outline"
                className="flex items-center gap-2 border-amber-300 dark:border-amber-700 hover:bg-amber-100 dark:hover:bg-amber-950 px-6"
                onClick={() => {
                  const prev = Math.max(1, day - 1);
                  setDay(prev);
                  void load(gender, prev);
                }}
                disabled={day <= 1}
                data-testid="button-prev-day"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              <Button
                className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 dark:from-amber-700 dark:to-orange-700 dark:hover:from-amber-800 dark:hover:to-orange-800 text-white shadow-lg px-6"
                onClick={() => {
                  const next = Math.min(365, day + 1);
                  setDay(next);
                  void load(gender, next);
                }}
                disabled={day >= 365}
                data-testid="button-next-day"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
