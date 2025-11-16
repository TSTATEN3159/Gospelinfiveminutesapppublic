import { Heart, Share2, BookmarkPlus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiUrl } from "@/lib/api-config";
import mountainPeakImage from '@assets/stock_images/gentle_snow_capped_m_ab39053d.jpg';

interface DailyVerseHeroCardProps {
  onPress?: () => void;
}

export function DailyVerseHeroCard({ onPress }: DailyVerseHeroCardProps) {
  const { data: verseData } = useQuery<{ verse: { reference: string; text: string } }>({
    queryKey: ["/api/daily-verse"],
  });

  const verse = verseData?.verse;
  const reference = verse?.reference || "John 3:16";
  const text = verse?.text || "For God so loved the world, that he gave his only begotten Son...";

  return (
    <button
      type="button"
      onClick={onPress}
      className="w-full text-left rounded-2xl overflow-hidden bg-black shadow-[0_8px_32px_rgba(0,0,0,0.4)] focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
      data-testid="card-daily-verse-hero"
    >
      <div className="relative w-full aspect-[16/10]">
        <img
          src={mountainPeakImage}
          alt={reference}
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

        <div className="absolute inset-0 flex flex-col justify-end px-5 pb-5 gap-1">
          <p className="text-xs font-semibold text-slate-300/90 tracking-wide uppercase">
            Daily Verse
          </p>
          <p className="text-sm font-bold text-amber-300 mt-0.5">{reference}</p>
          <p className="mt-2 text-[15px] leading-relaxed text-white font-light">
            {text}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between px-5 py-3 bg-black/95">
        <div className="flex items-center gap-4 text-[11px] text-slate-400">
          <span className="inline-flex items-center gap-1.5 hover:text-slate-200 transition-colors">
            <Heart className="w-3.5 h-3.5" />
            Share
          </span>
          <span className="inline-flex items-center gap-1.5 hover:text-slate-200 transition-colors">
            <BookmarkPlus className="w-3.5 h-3.5" />
            Save
          </span>
          <span className="inline-flex items-center gap-1.5 hover:text-slate-200 transition-colors">
            <Share2 className="w-3.5 h-3.5" />
            Send
          </span>
        </div>
        <span className="text-[11px] text-slate-500">Tap to explore</span>
      </div>
    </button>
  );
}
