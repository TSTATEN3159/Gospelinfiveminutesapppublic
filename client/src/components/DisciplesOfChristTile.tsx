import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Cross } from "lucide-react";
import warmBibleImage from '@assets/stock_images/warm_cozy_bible_jour_9c9d4b87.jpg';

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
  onClick,
}: DisciplesOfChristTileProps) {
  return (
    <Card 
      className="bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border-2 border-amber-200 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 ring-4 ring-white/50 hover:ring-white/70 backdrop-blur-sm"
      onClick={onClick}
      data-testid="tile-disciples-of-christ"
    >
      <div className="relative h-24">
        <img 
          src={warmBibleImage}
          alt="Disciples of Christ"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-amber-900/70 via-amber-600/30 to-transparent" />
      </div>
      <CardContent className="p-3">
        <div className="flex items-start gap-2">
          <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center shadow-lg border-2 border-amber-200/60 ring-1 ring-amber-300/50 flex-shrink-0">
            <Cross className="w-4 h-4 text-amber-700 stroke-[1.5]" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-sm text-gray-800 mb-0.5">
              Disciples of Christ
            </h3>
            <p className="text-xs text-amber-700 font-semibold mb-1" data-testid="text-verse-reference">
              {verseRef}
            </p>
            <p className="text-xs text-gray-700 leading-relaxed line-clamp-2 mb-1.5" data-testid="text-verse-text">
              {verseText}
            </p>
            <p className="text-[11px] text-amber-600 font-medium italic leading-snug" data-testid="text-simple-step">
              "{step}"
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
        </div>
      </CardContent>
    </Card>
  );
}
