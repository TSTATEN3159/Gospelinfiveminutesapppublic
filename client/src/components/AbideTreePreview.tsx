import { Leaf, Flame } from "lucide-react";
import { tapHaptic } from "@/lib/nativeEnhancements";

interface Props {
  totalFruit: number;
  streak: number;
  todayFruitLabel: string;
  onTap?: () => void;
}

export default function AbideTreePreview({
  totalFruit,
  streak,
  todayFruitLabel,
  onTap,
}: Props) {
  const handleTap = async () => {
    await tapHaptic();
    onTap?.();
  };

  return (
    <button
      onClick={handleTap}
      className="
        relative w-full rounded-3xl overflow-hidden
        bg-gradient-to-br from-emerald-800/60 to-green-900/50
        border border-emerald-700/40
        shadow-[0_20px_60px_rgba(2,44,34,0.45)]
        flex flex-col items-start
        px-5 py-4 text-left
        active:scale-[0.98] transition-transform
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
            {todayFruitLabel}
          </p>
        </div>

        <div className="flex items-center gap-1">
          <Flame className="h-4 w-4 text-amber-400" />
          <span className="text-[12px] text-amber-300">{streak} day streak</span>
        </div>
      </div>

      {/* Tree + Fruit Bubbles Preview */}
      <div className="flex items-center gap-1 mt-2">
        {Array.from({ length: Math.min(totalFruit, 9) }).map((_, i) => (
          <div
            key={i}
            className="h-5 w-5 rounded-full bg-amber-400 shadow-md shadow-amber-700/50 fruit-pop"
            style={{ animationDelay: `${i * 60}ms` }}
          />
        ))}

        {/* Empty slots hint at future growth */}
        {Array.from({ length: Math.max(0, 9 - totalFruit) }).map((_, i) => (
          <div
            key={`e-${i}`}
            className="h-5 w-5 rounded-full border border-amber-600/30 opacity-40"
          />
        ))}
      </div>

      <p className="text-[11px] text-emerald-200/70 mt-3">
        Tap to Abide — 5 minutes with Jesus
      </p>
    </button>
  );
}
