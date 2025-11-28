import { useEffect, useState } from "react";
import { Leaf, Flame } from "lucide-react";
import { tapHaptic } from "@/lib/nativeEnhancements";
import { getAbideState } from "@/lib/abideStorage";

export default function AbideTreePreview() {
  const [totalFruit, setTotalFruit] = useState(0);
  const [streak, setStreak] = useState(0);
  const [todayFruitLabel, setTodayFruitLabel] = useState("Love");
  const [justGrew, setJustGrew] = useState(false);

  useEffect(() => {
    const state = getAbideState();
    setTotalFruit(state.totalFruit);
    setStreak(state.streak);
    
    const options = Object.keys(state.fruitCounts);
    const index = state.totalFruit % options.length;
    setTodayFruitLabel(options[index] || "Love");

    if (state.totalFruit > 0) {
      setJustGrew(true);
      const t = setTimeout(() => setJustGrew(false), 400);
      return () => clearTimeout(t);
    }
  }, []);

  const handleTap = async () => {
    await tapHaptic();
    window.dispatchEvent(new CustomEvent("app-navigate", { detail: { page: "abide" } }));
  };

  const maxSlots = 9;

  return (
    <button
      onClick={handleTap}
      className="
        relative w-full rounded-3xl overflow-hidden
        bg-gradient-to-br from-emerald-800/60 to-green-900/50
        border border-emerald-700/40
        shadow-[0_20px_60px_rgba(2,44,34,0.45)]
        flex flex-col items-start
        px-5 py-4 mb-6 text-left
      "
      data-testid="card-abide-growth"
    >
      <p className="text-xs uppercase tracking-[0.15em] text-emerald-200/80 mb-1">
        Abide — My Growth Today
      </p>

      <div className="flex items-center justify-between w-full mb-2">
        <div className="flex items-center gap-2">
          <Leaf className="h-5 w-5 text-emerald-300" />
          <p className="text-[13px] font-medium text-emerald-100">
            Today's Fruit: {todayFruitLabel}
          </p>
        </div>

        <div className="flex items-center gap-1">
          <Flame className="h-4 w-4 text-amber-400" />
          <span className="text-[12px] text-amber-300">
            {streak > 0 ? `${streak} day streak` : "Begin your first day"}
          </span>
        </div>
      </div>

      {/* Fruits row */}
      <div className="flex items-center gap-1 mt-2">
        {Array.from({ length: Math.min(totalFruit, maxSlots) }).map((_, i) => (
          <div
            key={i}
            className={`h-5 w-5 rounded-full bg-amber-400 shadow-md shadow-amber-700/50 ${
              justGrew && i === totalFruit - 1 ? "fruit-pop" : ""
            }`}
          />
        ))}

        {Array.from({
          length: Math.max(0, maxSlots - Math.min(totalFruit, maxSlots)),
        }).map((_, i) => (
          <div
            key={`e-${i}`}
            className="h-5 w-5 rounded-full border border-amber-600/30 opacity-40"
          />
        ))}
      </div>

      <p className="text-[11px] text-emerald-200/70 mt-3">
        Tap to Abide — 5 minutes with Jesus. Your obedience becomes visible
        fruit.
      </p>
    </button>
  );
}
