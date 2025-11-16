// client/src/components/LiquidGlassFeatureTile.tsx
import { ReactNode } from "react";

interface LiquidGlassFeatureTileProps {
  title: string;
  subtitle: string;
  accentColorClass?: string;  // e.g. "from-sky-400 to-indigo-500"
  icon?: ReactNode;
  imageSrc: string;
  onClick?: () => void;
  "data-testid"?: string;
}

export function LiquidGlassFeatureTile({
  title,
  subtitle,
  accentColorClass = "from-sky-400 to-indigo-500",
  icon,
  imageSrc,
  onClick,
  "data-testid": testId
}: LiquidGlassFeatureTileProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-testid={testId}
      className="
        w-full text-left rounded-3xl overflow-hidden relative
        group transition-all duration-300
        bg-gradient-to-br from-white/30 to-white/5
        dark:from-white/10 dark:to-white/5
        border border-white/50 dark:border-white/20
        shadow-[0_24px_60px_rgba(15,23,42,0.4)]
        backdrop-blur-2xl
        hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(15,23,42,0.6)]
      "
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={imageSrc}
          alt={title}
          className="
            w-full h-full object-cover
            opacity-80 group-hover:opacity-100
            transition-opacity duration-300
          "
        />
        {/* tinted gradient overlay so text stays readable */}
        <div
          className={`
            absolute inset-0
            bg-gradient-to-br ${accentColorClass}
            opacity-65 group-hover:opacity-55
            mix-blend-multiply
            transition-opacity duration-300
          `}
        />
      </div>

      {/* Content */}
      <div className="relative p-5 sm:p-6 flex flex-col h-full gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 space-y-1">
            <h2 className="text-lg sm:text-xl font-bold text-white drop-shadow-lg">
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-white/95 leading-snug drop-shadow-md">
              {subtitle}
            </p>
          </div>

          {/* Accent icon in its own glass bubble */}
          <div
            className="
              flex items-center justify-center
              w-11 h-11 sm:w-12 sm:h-12
              rounded-2xl
              bg-white/70 dark:bg-slate-950/60
              border border-white/80 dark:border-slate-700
              shadow-lg
            "
          >
            {icon}
          </div>
        </div>

        {/* Chevron / "open" affordance */}
        <div className="mt-auto flex justify-end">
          <div
            className="
              flex items-center justify-center
              w-9 h-9 rounded-2xl
              bg-white/80
              border border-white/90
              shadow-lg
              text-slate-900
              group-hover:bg-white group-hover:text-slate-900
              transition-colors
            "
          >
            <span className="text-base leading-none">›</span>
          </div>
        </div>
      </div>
    </button>
  );
}
