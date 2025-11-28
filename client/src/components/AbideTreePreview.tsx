import { useEffect, useState } from "react";
import { Leaf, Flame } from "lucide-react";
import { tapHaptic } from "@/lib/nativeEnhancements";
import { getAbideState, getTodaysFruit } from "@/lib/abideStorage";

interface TiltState {
  x: number;
  y: number;
}

export default function AbideTreePreview() {
  const [state, setState] = useState(getAbideState());
  const [justGrew, setJustGrew] = useState(false);
  const [tilt, setTilt] = useState<TiltState>({ x: 0, y: 0 });

  useEffect(() => {
    const s = getAbideState();
    setState(s);

    if (s.totalFruit > 0) {
      setJustGrew(true);
      const t = setTimeout(() => setJustGrew(false), 450);
      return () => clearTimeout(t);
    }
  }, []);

  const handleTap = async () => {
    await tapHaptic();
    window.dispatchEvent(new CustomEvent("app-navigate", { detail: { page: "abide" } }));
  };

  const handleMove = (
    e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>
  ) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();

    let clientX: number;
    let clientY: number;

    if ("touches" in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ("clientX" in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    } else {
      return;
    }

    const x = (clientX - rect.left) / rect.width - 0.5;
    const y = (clientY - rect.top) / rect.height - 0.5;

    const maxTilt = 7;
    setTilt({
      x: -y * maxTilt,
      y: x * maxTilt,
    });
  };

  const resetTilt = () => {
    setTilt({ x: 0, y: 0 });
  };

  const maxSlots = 12;

  return (
    <button
      onClick={handleTap}
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
      onTouchMove={handleMove}
      onTouchEnd={resetTilt}
      className="
        abide-tilt
        relative w-full mb-7 px-0 py-0 border-none bg-transparent
        focus:outline-none
      "
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
      data-testid="card-abide-growth"
    >
      <div
        className="
          relative w-full 
          overflow-hidden rounded-3xl
          bg-gradient-to-b from-emerald-900 via-emerald-950 to-black
          border border-emerald-900/70
          shadow-[0_25px_65px_rgba(0,0,0,0.65)]
          backdrop-blur-xl
          px-6 py-6
          text-left
        "
      >
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-40px] inset-x-[-60px] h-40 bg-emerald-500/18 blur-3xl" />
          <div className="absolute bottom-[-60px] inset-x-[-60px] h-40 bg-emerald-900/40 blur-3xl" />
        </div>

        {/* Header text */}
        <p className="relative z-10 text-xs uppercase tracking-[0.18em] text-emerald-200/70 mb-1.5">
          ABIDE
        </p>

        <h2 className="relative z-10 text-[18px] font-semibold text-emerald-50 leading-tight mb-2">
          "He who abides in Me bears much fruit"
        </h2>

        {/* Top info row */}
        <div className="relative z-10 flex justify-between items-center mb-3">
          <span className="flex items-center gap-1 text-[13px] text-emerald-200">
            <Leaf className="h-4 w-4 text-emerald-300" />
            Today's Fruit:{" "}
            <span className="font-medium">{getTodaysFruit()}</span>
          </span>

          <span className="flex items-center gap-1 text-[12px] text-amber-300">
            <Flame className="h-3 w-3" />
            {state.streak > 0 ? `${state.streak} Day Streak` : "Start now"}
          </span>
        </div>

        {/* Tree + fruit layer */}
        <div className="relative z-10 mt-2 flex items-center gap-4">
          {/* Tree SVG (foreground depth) */}
          <div className="abide-tree-layer h-20 w-20 flex items-center justify-center">
            <TreeOfLifeSVG />
          </div>

          {/* Fruit row */}
          <div className="flex-1">
            <p className="text-[12px] text-emerald-100/80 mb-1.5">
              As branches bear fruit by remaining in the Vine, so you bear fruit by abiding in Christ.
            </p>
            <div className="flex items-center mt-1 gap-1.5 flex-wrap">
              {Array.from({
                length: Math.min(state.totalFruit, maxSlots),
              }).map((_, i) => (
                <div
                  key={i}
                  className={`
                    h-5 w-5 rounded-full 
                    bg-amber-400 
                    shadow-md shadow-amber-900/40
                    border border-amber-600/70
                    ${justGrew && i === state.totalFruit - 1 ? "fruit-pop" : ""}
                  `}
                />
              ))}

              {Array.from({
                length: Math.max(
                  0,
                  maxSlots - Math.min(state.totalFruit, maxSlots)
                ),
              }).map((_, i) => (
                <div
                  key={`e-${i}`}
                  className="h-5 w-5 rounded-full border border-amber-600/25 opacity-40"
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <p className="relative z-10 mt-4 text-[12px] font-medium text-emerald-200/75">
          Tap to abide in Christ — and bear fruit that remains. <span className="text-emerald-300/60">John 15:5</span>
        </p>
      </div>
    </button>
  );
}

function TreeOfLifeSVG() {
  return (
    <svg
      className="h-16 w-16"
      viewBox="0 0 80 80"
      aria-hidden="true"
    >
      {/* Glow behind tree */}
      <defs>
        <radialGradient id="treeGlow" cx="50%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#6ee7b7" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#22c55e" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="treeTrunk" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#92400e" />
        </linearGradient>
        <linearGradient id="treeLeaves" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
      </defs>

      {/* Background glow */}
      <circle cx="40" cy="32" r="26" fill="url(#treeGlow)" />

      {/* Trunk */}
      <path
        d="M38 34 C38 46, 36 54, 34 62 L38 62 L42 62 C40 54, 38 46, 38 34 Z"
        fill="url(#treeTrunk)"
      />

      {/* Branches */}
      <path
        d="M38 34 C32 30, 28 26, 26 22"
        stroke="#f59e0b"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M38 34 C44 30, 50 26, 52 22"
        stroke="#f59e0b"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M38 30 C34 26, 32 23, 30 20"
        stroke="#fbbf24"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M38 30 C42 26, 46 23, 48 20"
        stroke="#fbbf24"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      {/* Leaf canopy */}
      <path
        d="
          M24 30
          C24 22, 30 16, 38 16
          C46 16, 52 22, 52 30
          C52 36, 48 40, 38 42
          C28 40, 24 36, 24 30
        "
        fill="url(#treeLeaves)"
      />

      {/* Fruits (subtle, inner) */}
      <circle cx="32" cy="26" r="2.3" fill="#fde68a" />
      <circle cx="44" cy="25" r="2.3" fill="#fed7aa" />
      <circle cx="36" cy="32" r="2.3" fill="#facc15" />
    </svg>
  );
}
