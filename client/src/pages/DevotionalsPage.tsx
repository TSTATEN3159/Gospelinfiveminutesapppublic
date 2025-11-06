import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Flame, Calendar, ChevronLeft, ChevronRight, Crown } from "lucide-react";
import { apiUrl } from "@/lib/api-config";
import PurchaseGate from "@/components/PurchaseGate";

type DevotionalEntry = {
  day: number;
  scriptureRef: string;
  scriptureText: string;
  devotion: string;
  application: string;
};
type Plan = { men: Record<string, DevotionalEntry>; women: Record<string, DevotionalEntry> };
type Gender = "men" | "women";

// ---- local fallback seed (safe if network down) ----
const localFallback: Plan = {
  men: {
    "1": {
      day: 1,
      scriptureRef: "Psalm 1:1–3 (NKJV)",
      scriptureText:
        "Blessed is the man who walks not in the counsel of the ungodly... he shall be like a tree planted by the rivers of water...",
      devotion:
        "God's blessing flows where our roots are sunk in His Word. Planted people prosper in seasons and endure in droughts.",
      application: "• Read Psalm 1.\n• Replace one ungodly input today.\n• Pray: 'Root me by Your river.'"
    }
  },
  women: {
    "1": {
      day: 1,
      scriptureRef: "Psalm 1:1–3 (NKJV)",
      scriptureText:
        "Blessed is the woman who walks not in the counsel of the ungodly... she shall be like a tree planted by the rivers of water...",
      devotion:
        "God's blessing flows where our roots are sunk in His Word. Planted people prosper in seasons and endure in droughts.",
      application: "• Read Psalm 1.\n• Replace one ungodly input today.\n• Pray: 'Root me by Your river.'"
    }
  }
};

interface DevotionalsPageProps {
  onBack: () => void;
}

export default function DevotionalsPage({ onBack }: DevotionalsPageProps) {
  // User greeting/progress (local) -------------
  const [displayName, setDisplayName] = useState<string>("Friend");
  const [streak, setStreak] = useState<number>(0);
  const [lastOpenedISO, setLastOpenedISO] = useState<string | null>(null);

  // Gender + day selection ----------------------
  const [gender, setGender] = useState<Gender>("men");
  const [day, setDay] = useState<number>(1);

  // Remote plan loader --------------------------
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  const [netErr, setNetErr] = useState<string | null>(null);

  // Load user basics & streak from localStorage
  useEffect(() => {
    try {
      const userData = localStorage.getItem("gospelAppUser");
      if (userData) {
        const user = JSON.parse(userData);
        setDisplayName(user.firstName || "Friend");
      }
      const ls = localStorage.getItem("devotional.lastOpenedISO");
      const st = localStorage.getItem("devotional.streak");
      if (ls) setLastOpenedISO(ls);
      if (st) setStreak(parseInt(st, 10) || 0);
    } catch {}
  }, []);

  // Update streak if the calendar day advanced
  useEffect(() => {
    const today = new Date();
    const todayKey = today.toISOString().slice(0, 10); // YYYY-MM-DD
    if (lastOpenedISO !== todayKey) {
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);
      const yKey = yesterday.toISOString().slice(0, 10);
      const newStreak = lastOpenedISO === yKey ? streak + 1 : 1;
      setStreak(newStreak);
      setLastOpenedISO(todayKey);
      try {
        localStorage.setItem("devotional.streak", String(newStreak));
        localStorage.setItem("devotional.lastOpenedISO", todayKey);
      } catch {}
    }
  }, [lastOpenedISO, streak]);

  // Fetch dynamic plan from backend
  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setNetErr(null);
      try {
        const url = apiUrl("/api/devotionals/365");
        const res = await fetch(url, { method: "GET" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as Plan;
        if (!cancelled) setPlan(data);
      } catch (e: any) {
        console.error("[Devotional] fetch failed:", e?.message || e);
        if (!cancelled) {
          setPlan(null);
          setNetErr("Using offline devotional (network issue).");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const effectivePlan = plan ?? localFallback;
  const entry = useMemo<DevotionalEntry | null>(() => {
    const record = effectivePlan[gender] || {};
    return record[String(day)] || null;
  }, [effectivePlan, gender, day]);

  // Greeting text
  const greeting = useMemo(() => {
    const name = displayName || "Friend";
    const action = streak > 1 ? "continue" : "begin";
    return `Welcome back ${name}`;
  }, [displayName, streak]);

  const handlePrevDay = () => {
    setDay(prev => Math.max(1, prev - 1));
  };

  const handleNextDay = () => {
    setDay(prev => Math.min(365, prev + 1));
  };

  return (
    <PurchaseGate>
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-end mb-2">
            <div className="inline-flex items-center gap-1 text-xs bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-2.5 py-1 rounded-full font-bold shadow-md">
              <Crown className="w-3.5 h-3.5" />
              Premium
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              data-testid="button-back"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-semibold">365 Daily Devotionals</h1>
            <div className="w-10" /> {/* Spacer for center alignment */}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Welcome Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{greeting}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="text-sm font-medium">{streak} day{streak === 1 ? "" : "s"} streak</span>
            </div>
          </CardContent>
        </Card>

        {/* Controls Card */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            {/* Gender Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Audience</label>
              <Select value={gender} onValueChange={(v) => setGender(v as Gender)}>
                <SelectTrigger data-testid="select-gender">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="men">Men</SelectItem>
                  <SelectItem value="women">Women</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Day Navigation */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Day</label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePrevDay}
                  disabled={day <= 1}
                  data-testid="button-prev-day"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <div className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border rounded-md bg-white dark:bg-gray-800">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">Day {day}</span>
                  <span className="text-sm text-muted-foreground">of 365</span>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleNextDay}
                  disabled={day >= 365}
                  data-testid="button-next-day"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status Messages */}
        {loading && (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              Loading devotional...
            </CardContent>
          </Card>
        )}

        {netErr && (
          <Card className="border-amber-200 bg-amber-50 dark:bg-amber-900/20">
            <CardContent className="py-4">
              <p className="text-sm text-amber-700 dark:text-amber-300">{netErr}</p>
            </CardContent>
          </Card>
        )}

        {/* Devotional Content */}
        {entry && !loading && (
          <Card>
            <CardHeader>
              <div className="space-y-2">
                <Badge variant="secondary" className="w-fit">
                  Day {entry.day}
                </Badge>
                <CardTitle className="text-lg">{entry.scriptureRef}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Scripture Text */}
              <blockquote className="border-l-4 border-blue-500 pl-4 italic text-muted-foreground">
                {entry.scriptureText}
              </blockquote>

              {/* Devotion */}
              <div className="space-y-2">
                <h3 className="font-semibold text-base">Devotion</h3>
                <p className="leading-relaxed text-foreground whitespace-pre-wrap">
                  {entry.devotion}
                </p>
              </div>

              {/* Application */}
              <div className="space-y-2">
                <h3 className="font-semibold text-base">Application</h3>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <pre className="whitespace-pre-wrap leading-relaxed text-sm font-sans text-foreground">
                    {entry.application}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {!entry && !loading && (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              Pick a day between 1 and 365.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
    </PurchaseGate>
  );
}
