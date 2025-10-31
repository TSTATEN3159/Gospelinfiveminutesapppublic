// client/src/pages/DailyDevotionsPage.tsx
import { useEffect, useMemo, useState } from "react";
import { fetchDevotional, type Devotional, type Gender, pingPlan } from "../lib/devotionalsApi";
import { ArrowLeft } from "lucide-react";

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
    <div className="mx-auto max-w-3xl p-4 space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          aria-label="Go back"
          data-testid="button-back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-semibold">Daily Devotions</h1>
      </div>
      
      <header className="space-y-1">
        <p className="text-sm text-gray-600">
          Welcome back {firstName}, are you ready to begin/restart?
        </p>
        <p className="text-sm">
          Streak: <span className="font-semibold">{streak.count}</span> day{streak.count === 1 ? "" : "s"}
        </p>
      </header>

      <section className="flex flex-wrap items-end gap-3">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Audience</label>
          <select
            className="border rounded px-2 py-1"
            value={gender}
            onChange={(e) => setGender(e.target.value as Gender)}
            data-testid="select-gender"
          >
            <option value="men">Men</option>
            <option value="women">Women</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Day</label>
          <input
            type="number"
            min={1}
            max={365}
            value={day}
            onChange={(e) => setDay(Number(e.target.value))}
            className="w-24 border rounded px-2 py-1"
            inputMode="numeric"
            data-testid="input-day"
          />
        </div>

        <button
          onClick={() => load()}
          className="rounded px-3 py-2 bg-black text-white disabled:opacity-50"
          disabled={loading}
          data-testid="button-load-devotional"
        >
          {loading ? "Loading…" : "Load Devotional"}
        </button>
      </section>

      {err && (
        <div className="border border-red-200 bg-red-50 text-red-800 rounded p-3 text-sm" data-testid="error-message">
          {err}
        </div>
      )}

      {data && (
        <article className="space-y-4" data-testid="devotional-content">
          <div className="text-sm text-gray-500">Day {data.day} • {gender === "men" ? "Men" : "Women"}</div>
          <h2 className="text-lg font-semibold" data-testid="text-scripture-ref">{data.scriptureRef}</h2>
          <p className="whitespace-pre-wrap" data-testid="text-scripture-text">{data.scriptureText}</p>

          <div className="space-y-1">
            <h3 className="font-semibold">Devotion</h3>
            <p className="whitespace-pre-wrap leading-relaxed" data-testid="text-devotion">{data.devotion}</p>
          </div>

          <div className="space-y-1">
            <h3 className="font-semibold">Application</h3>
            <p className="whitespace-pre-wrap leading-relaxed" data-testid="text-application">{data.application}</p>
          </div>

          <div className="pt-2 flex gap-2">
            <button
              className="rounded px-3 py-2 border"
              onClick={() => {
                const next = Math.min(365, day + 1);
                setDay(next);
                void load(gender, next);
              }}
              data-testid="button-next-day"
            >
              Next Day
            </button>
            <button
              className="rounded px-3 py-2 border"
              onClick={() => {
                const prev = Math.max(1, day - 1);
                setDay(prev);
                void load(gender, prev);
              }}
              data-testid="button-prev-day"
            >
              Previous Day
            </button>
          </div>
        </article>
      )}
    </div>
  );
}
