import { useEffect, useState } from "react";
import { Leaf, Flame } from "lucide-react";
import { tapHaptic } from "@/lib/nativeEnhancements";
import { getAbideState, getTodaysFruit } from "@/lib/abideStorage";
import oakTreeImage from "@assets/stock_images/majestic_oak_tree_wi_d088247f.jpg";

interface TiltState {
  x: number;
  y: number;
}

export default function AbideTreePreview() {
  const [state, setState] = useState(getAbideState());
  const [tilt, setTilt] = useState<TiltState>({ x: 0, y: 0 });

  useEffect(() => {
    const s = getAbideState();
    setState(s);
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
          text-left
          flex
        "
      >
        {/* Left content area - 3/4 width */}
        <div className="flex-1 px-6 py-6 relative z-10">
          {/* Background glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-40px] left-[-60px] right-0 h-40 bg-emerald-500/18 blur-3xl" />
          </div>

          {/* Header text */}
          <p className="relative z-10 text-xs uppercase tracking-[0.18em] text-emerald-200/70 mb-1.5">
            ABIDE
          </p>

          <h2 className="relative z-10 text-[17px] font-semibold text-emerald-50 leading-tight mb-3">
            "He who abides in Me bears much fruit"
          </h2>

          {/* Info row */}
          <div className="relative z-10 flex flex-col gap-2 mb-3">
            <span className="flex items-center gap-1 text-[13px] text-emerald-200">
              <Leaf className="h-4 w-4 text-emerald-300" />
              Today's Fruit:{" "}
              <span className="font-medium">{getTodaysFruit()}</span>
            </span>

            <span className="flex items-center gap-1 text-[12px] text-amber-300">
              <Flame className="h-3 w-3" />
              {state.streak > 0 ? `${state.streak} Day Streak` : "Start your first day"}
            </span>
          </div>

          {/* Description */}
          <p className="relative z-10 text-[12px] text-emerald-100/80 mb-3 leading-relaxed">
            As branches bear fruit by remaining in the Vine, so you bear fruit by abiding in Christ.
          </p>

          {/* CTA */}
          <p className="relative z-10 text-[11px] font-medium text-emerald-200/70">
            Tap to abide in Christ — bear fruit that remains.{" "}
            <span className="text-emerald-300/50">John 15:5</span>
          </p>
        </div>

        {/* Right image area - 1/4 width with oak tree */}
        <div className="w-1/4 relative">
          {/* Gradient overlay for blending */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/60 to-transparent z-10" />
          
          {/* Oak tree image */}
          <img
            src={oakTreeImage}
            alt="Oak tree with deep roots"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </button>
  );
}
