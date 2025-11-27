import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { BookmarkPlus, Share2 } from "lucide-react";
import { tapHaptic, successHaptic, shareVerse } from "@/lib/nativeEnhancements";

interface Props {
  onTapVerse?: () => void;
}

const scriptureList = [
  { ref: "Psalm 23:1", text: "The Lord is my shepherd; I shall not want." },
  { ref: "Romans 8:31", text: "If God is for us, who can be against us?" },
  { ref: "Isaiah 41:10", text: "Fear not, for I am with you." },
  { ref: "Philippians 4:13", text: "I can do all things through Christ who strengthens me." },
  { ref: "Jeremiah 29:11", text: "For I know the plans I have for you, declares the Lord." },
  { ref: "Proverbs 3:5-6", text: "Trust in the Lord with all your heart and lean not on your own understanding." },
  { ref: "John 3:16", text: "For God so loved the world that he gave his one and only Son." },
  { ref: "Romans 8:28", text: "And we know that in all things God works for the good of those who love him." },
];

export default function HomeHeaderScriptureFocus({ onTapVerse }: Props) {
  const verse = useMemo(
    () => scriptureList[Math.floor(Math.random() * scriptureList.length)],
    []
  );

  const handleOpenVerse = async () => {
    await tapHaptic();
    onTapVerse?.();
  };

  const handleSave = async () => {
    // TODO: wire into your "save verse" logic
    await successHaptic();
  };

  const handleShare = async () => {
    await shareVerse({
      verseText: verse.text,
      reference: verse.ref,
      url: "https://thegospelin5minutes.org",
    });
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden mb-4 shadow-[0_20px_60px_rgba(15,23,42,0.35)]">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="h-full w-full bg-gradient-to-br from-amber-900 via-amber-800 to-amber-700" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/40" />
      </div>

      {/* Content */}
      <button
        type="button"
        onClick={handleOpenVerse}
        className="relative z-10 flex w-full flex-col items-start px-5 pt-5 pb-4 text-left"
        data-testid="button-scripture-focus"
      >
        <p className="text-xs uppercase tracking-[0.16em] text-amber-300/80 mb-1">
          Today's Focus
        </p>
        <p className="text-base font-semibold leading-snug text-amber-50 mb-1">
          {verse.text}
        </p>
        <p className="text-[13px] font-medium text-amber-200/90">
          {verse.ref}
        </p>
      </button>

      {/* Actions */}
      <div className="relative z-10 flex items-center justify-between px-4 pb-4">
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="outline"
            className="h-9 w-9 rounded-full border-amber-500/40 bg-black/40 hover:bg-black/60"
            onClick={handleSave}
            data-testid="button-save-focus-verse"
          >
            <BookmarkPlus className="h-4 w-4 text-amber-300" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="h-9 w-9 rounded-full border-amber-500/40 bg-black/40 hover:bg-black/60"
            onClick={handleShare}
            data-testid="button-share-focus-verse"
          >
            <Share2 className="h-4 w-4 text-amber-300" />
          </Button>
        </div>

        <span className="text-[11px] text-amber-200/80 pr-1">
          Tap to open full passage
        </span>
      </div>
    </div>
  );
}
