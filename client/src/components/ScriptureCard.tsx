import { useState } from "react";
import { Volume2 } from "lucide-react";
import { toggleSpeech, getIsSpeaking } from "@/utils/speechEngine";

interface ScriptureCardProps {
  text: string;
  version: string;
  reference?: string;
}

export default function ScriptureCard({ text, version, reference }: ScriptureCardProps) {
  const [highlightedWordIndex, setHighlightedWordIndex] = useState<number | null>(null);
  
  if (!text) return null;

  const handleTapToRead = () => {
    toggleSpeech(text, (wordIndex: number) => {
      setHighlightedWordIndex(wordIndex);
    });
    
    // Clear highlighting when speech ends
    if (getIsSpeaking()) {
      setHighlightedWordIndex(null);
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
        <span className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded-full font-medium">
          {version}
        </span>
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
