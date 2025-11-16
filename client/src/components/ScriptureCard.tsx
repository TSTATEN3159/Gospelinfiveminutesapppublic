import { useState, useEffect } from "react";
import { Volume2, Star } from "lucide-react";
import { toggleSpeech, getIsSpeaking } from "@/utils/speechEngine";
import { toggleBookmark, isBookmarked } from "@/services/bookmarkService";

interface ScriptureCardProps {
  text: string;
  version: string;
  reference?: string;
}

export default function ScriptureCard({ text, version, reference }: ScriptureCardProps) {
  const [highlightedWordIndex, setHighlightedWordIndex] = useState<number | null>(null);
  const [bookmarked, setBookmarked] = useState(false);
  
  useEffect(() => {
    if (reference) {
      setBookmarked(isBookmarked(reference));
    }
  }, [reference]);
  
  if (!text) return null;

  const handleTapToRead = (e: React.MouseEvent) => {
    // Don't trigger TTS if clicking the bookmark button
    if ((e.target as HTMLElement).closest('[data-bookmark-button]')) {
      return;
    }
    
    toggleSpeech(text, (wordIndex: number) => {
      setHighlightedWordIndex(wordIndex);
    });
    
    // Clear highlighting when speech ends
    if (getIsSpeaking()) {
      setHighlightedWordIndex(null);
    }
  };

  const handleToggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (reference) {
      const newState = toggleBookmark(reference, text, version);
      setBookmarked(newState);
    }
  };

  return (
    <div
      className="rounded-lg border border-green-200 p-4 bg-gradient-to-r from-green-50 to-emerald-50 hover:bg-green-100/50 transition-all cursor-pointer"
      onClick={handleTapToRead}
      data-testid={`scripture-card-${version.toLowerCase()}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {reference && (
            <span className="text-sm font-semibold text-gray-900">{reference}</span>
          )}
          <Volume2 className="w-4 h-4 text-gray-500" />
        </div>
        <div className="flex items-center gap-2">
          {reference && (
            <button
              onClick={handleToggleBookmark}
              className={`p-1 rounded hover:bg-yellow-100 transition-colors ${
                bookmarked ? "text-yellow-500" : "text-gray-400"
              }`}
              data-bookmark-button
              data-testid="button-bookmark-verse"
              aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
            >
              <Star className={`w-5 h-5 ${bookmarked ? "fill-yellow-500" : ""}`} />
            </button>
          )}
          <span className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded-full font-medium">
            {version}
          </span>
        </div>
      </div>
      
      <blockquote className="text-lg leading-relaxed font-serif italic text-gray-800 select-none">
        "
        {highlightedWordIndex !== null ? (
          text.split(" ").map((word, i) => (
            <span 
              key={i} 
              className={`${
                i === highlightedWordIndex 
                  ? "bg-yellow-300 text-gray-900 px-1 rounded transition-all" 
                  : ""
              }`}
            >
              {word}
              {" "}
            </span>
          ))
        ) : (
          text
        )}
        "
      </blockquote>
    </div>
  );
}
