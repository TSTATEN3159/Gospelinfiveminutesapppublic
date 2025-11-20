import { Heart, Share2, BookmarkPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { safeShare } from "@/utils/capabilities";
import { MoreTranslationsCard } from "./MoreTranslationsCard";
import mountainPeakImage from '@assets/stock_images/snowy_peak_bright_bl_12e01717.jpg';

interface DailyVerseHeroCardProps {
  onPress?: () => void;
  reference?: string;
  text?: string;
  loading?: boolean;
}

export function DailyVerseHeroCard({ onPress, reference, text, loading }: DailyVerseHeroCardProps) {
  const { toast } = useToast();

  // Use provided verse data or fallback while loading
  const displayReference = reference || "John 3:16";
  const displayText = text || "For God so loved the world, that he gave his only begotten Son...";

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareText = `"${displayText}"\n\n— ${displayReference}\n\nShared from The Gospel in 5 Minutes`;
    const shared = await safeShare({
      title: "Today's Focus Verse",
      text: shareText
    });
    
    if (shared) {
      toast({
        title: "Verse Shared",
        description: "Daily verse shared successfully!",
      });
    }
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    const bookmarks = JSON.parse(localStorage.getItem('bibleBookmarks_v2') || '[]');
    const newBookmark = {
      id: Date.now().toString(),
      reference: displayReference,
      text: displayText,
      folder: 'My Verses',
      note: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    bookmarks.push(newBookmark);
    localStorage.setItem('bibleBookmarks_v2', JSON.stringify(bookmarks));
    
    toast({
      title: "Verse Saved",
      description: `${displayReference} saved to My Verses`,
    });
  };

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const copyText = `${displayText}\n\n— ${displayReference}`;
    try {
      await navigator.clipboard.writeText(copyText);
      toast({
        title: "Copied",
        description: "Verse copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Could not copy verse",
        variant: "destructive",
      });
    }
  };

  return (
    <div
      className="w-full text-left rounded-2xl overflow-hidden bg-black shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
      data-testid="card-daily-verse-hero"
    >
      <button
        type="button"
        onClick={onPress}
        className="w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
      >
        <div className="relative w-full aspect-[16/10]">
        <img
          src={mountainPeakImage}
          alt={displayReference}
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

        <div className="absolute inset-0 flex flex-col justify-end px-5 pb-5 gap-1">
          <p className="text-xs font-semibold text-slate-300/90 tracking-wide uppercase">
            Daily Verse
          </p>
          <p className="text-sm font-bold text-amber-300 mt-0.5">{displayReference}</p>
          <p className="mt-2 text-[15px] leading-relaxed text-white font-light">
            {loading ? "Loading today's verse..." : displayText}
          </p>
        </div>
      </div>
      </button>

      <div className="flex items-center justify-between px-5 py-3 bg-black/95">
        <div className="flex items-center gap-4 text-[11px] text-slate-400">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 hover:text-slate-200 transition-colors"
            data-testid="button-share-verse-hero"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share
          </button>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 hover:text-slate-200 transition-colors"
            data-testid="button-save-verse-hero"
          >
            <BookmarkPlus className="w-3.5 h-3.5" />
            Save
          </button>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 hover:text-slate-200 transition-colors"
            data-testid="button-copy-verse-hero"
          >
            <Heart className="w-3.5 h-3.5" />
            Copy
          </button>
        </div>
        <span className="text-[11px] text-slate-500">Tap to explore</span>
      </div>

      <div className="bg-black/95">
        <MoreTranslationsCard reference={displayReference} tone="dark" className="mx-4 mt-4 mb-4" />
      </div>
    </div>
  );
}
