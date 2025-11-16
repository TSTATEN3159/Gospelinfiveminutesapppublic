import { cn } from "@/lib/utils";

interface DisciplesOfChristTileProps {
  verseRef: string;
  verseText: string;
  step: string;
  className?: string;
  onClick?: () => void;
}

export function DisciplesOfChristTile({
  verseRef,
  verseText,
  step,
  className,
  onClick,
}: DisciplesOfChristTileProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-testid="tile-disciples-of-christ"
      className={cn(
        "w-full text-left rounded-3xl p-4 sm:p-5",
        "bg-slate-900 dark:bg-slate-800 text-slate-50 shadow-[0_18px_45px_rgba(15,23,42,0.55)]",
        "overflow-hidden active:scale-[0.99] transition-transform",
        className
      )}
    >
      {/* Tile title */}
      <p className="text-[11px] font-semibold tracking-[0.18em] text-emerald-300 mb-1 uppercase">
        Disciples of Christ
      </p>

      {/* Verse reference */}
      <p className="text-[13px] font-semibold text-emerald-200 mb-1" data-testid="text-verse-reference">
        {verseRef}
      </p>

      {/* Verse text – WRAPS and stays inside the tile */}
      <p
        className="
          text-[14px] sm:text-[15px] font-medium leading-snug
          whitespace-normal break-words
          text-slate-50
          mb-3
        "
        data-testid="text-verse-text"
      >
        {verseText}
      </p>

      {/* Divider line */}
      <div className="h-px w-full bg-slate-700/70 mb-3" />

      {/* "One Simple Step" label */}
      <p className="text-[11px] font-semibold tracking-[0.16em] text-emerald-300 mb-1 uppercase">
        One Simple Step
      </p>

      {/* Step text – WRAPS and stays inside the tile */}
      <p
        className="
          text-[13px] leading-snug
          whitespace-normal break-words
          text-slate-100/90
        "
        data-testid="text-simple-step"
      >
        {step}
      </p>
    </button>
  );
}
