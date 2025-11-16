import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Cross, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/lib/translations";
import { getCurrentDisciplesVerse, disciplesVerses } from "@/data/disciplesOfChristVerses";

interface DisciplesOfChristPageProps {
  onBack?: () => void;
  language: string;
}

export default function DisciplesOfChristPage({ onBack, language }: DisciplesOfChristPageProps) {
  const currentVerse = getCurrentDisciplesVerse();
  const t = useTranslations(language);

  return (
    <div className="min-h-screen pb-6 bg-gradient-to-b from-amber-50 to-orange-50/30">
      {/* Header with Back Button */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-amber-200/50 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            data-testid="button-back"
            aria-label="Go back"
            className="hover-elevate"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2 flex-1">
            <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center shadow-md border-2 border-amber-200/60">
              <Cross className="w-4 h-4 text-amber-700" />
            </div>
            <h1 className="text-lg font-bold text-gray-800">Disciples of Christ</h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Current Verse Hero Section */}
        <Card 
          className="bg-white rounded-2xl shadow-2xl border-2 border-amber-200 ring-4 ring-amber-100/50"
          data-testid="card-current-verse"
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center shadow-lg border-2 border-amber-200/60 ring-1 ring-amber-300/50">
                <BookOpen className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide">Today's Verse</p>
                <p className="text-sm font-bold text-amber-700" data-testid="text-current-verse-ref">{currentVerse.ref}</p>
              </div>
            </div>
            
            <p className="text-base leading-relaxed text-gray-800 mb-4" data-testid="text-current-verse-text">
              "{currentVerse.text}"
            </p>
            
            <div className="border-t border-amber-200 pt-4">
              <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-2">One Simple Step</p>
              <p className="text-sm leading-relaxed text-gray-700 italic" data-testid="text-current-verse-step">
                {currentVerse.step}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* All Verses Section */}
        <div>
          <h2 className="text-base font-bold text-gray-800 mb-3 px-2">All Discipleship Verses</h2>
          <div className="space-y-3">
            {disciplesVerses.map((verse, index) => {
              const isCurrent = verse.ref === currentVerse.ref;
              
              return (
                <Card
                  key={verse.ref}
                  className={`
                    bg-white rounded-xl shadow-lg border-2 transition-all duration-300
                    ${isCurrent 
                      ? 'border-amber-400 ring-2 ring-amber-200 bg-amber-50/50' 
                      : 'border-gray-200 hover:border-amber-200 hover:shadow-xl'
                    }
                  `}
                  data-testid={`card-verse-${index}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center shadow-md border-2 flex-shrink-0
                        ${isCurrent 
                          ? 'bg-amber-200 border-amber-300 text-amber-800' 
                          : 'bg-gray-100 border-gray-200 text-gray-600'
                        }
                      `}>
                        <span className="text-sm font-bold">{index + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`
                          text-sm font-bold mb-1
                          ${isCurrent ? 'text-amber-700' : 'text-gray-700'}
                        `} data-testid={`text-verse-ref-${index}`}>
                          {verse.ref}
                        </p>
                        <p className="text-sm leading-relaxed text-gray-700 mb-2" data-testid={`text-verse-text-${index}`}>
                          "{verse.text}"
                        </p>
                        <div className="border-t border-gray-200 pt-2">
                          <p className="text-xs text-gray-600 italic" data-testid={`text-verse-step-${index}`}>
                            {verse.step}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Footer Note */}
        <Card className="bg-gradient-to-r from-amber-100 to-orange-100 border-2 border-amber-200/50">
          <CardContent className="p-4 text-center">
            <p className="text-xs text-gray-700 leading-relaxed">
              Your daily verse rotates every 2 days. Each verse includes a practical step to help you live out God's Word today.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
