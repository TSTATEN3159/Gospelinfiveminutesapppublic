import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Lightbulb, Heart } from "lucide-react";
import { JESUS_PARABLES, type Parable } from "@/features/parables/parablesData";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export function KingdomParablesTab() {
  const [selectedParable, setSelectedParable] = useState<Parable | null>(null);

  return (
    <>
      <div className="space-y-4">
        <div className="text-center py-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Parables of Jesus
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Timeless wisdom from the teachings of Christ
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {JESUS_PARABLES.map((parable) => (
            <Card
              key={parable.id}
              onClick={() => setSelectedParable(parable)}
              className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 dark:from-amber-950 dark:via-orange-950 dark:to-amber-950 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer border border-amber-200/50 dark:border-amber-800/50 hover-elevate"
              data-testid={`card-parable-${parable.id}`}
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold leading-snug text-gray-900 dark:text-gray-100 line-clamp-2">
                      {parable.title}
                    </h3>
                    <p className="text-xs text-amber-700 dark:text-amber-400 mt-1 font-medium">
                      {parable.reference}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-gray-700 dark:text-gray-300 line-clamp-2">
                      {parable.meaning}
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Heart className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-gray-700 dark:text-gray-300 line-clamp-2">
                      {parable.application}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-amber-200/50 dark:border-amber-800/50">
                  <p className="text-xs text-amber-600 dark:text-amber-500 font-medium text-center">
                    Tap to read the full parable
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={selectedParable !== null} onOpenChange={() => setSelectedParable(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh]">
          {selectedParable && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {selectedParable.title}
                </DialogTitle>
                <p className="text-sm text-amber-700 dark:text-amber-400 font-medium">
                  {selectedParable.reference}
                </p>
              </DialogHeader>
              <ScrollArea className="max-h-[calc(85vh-8rem)] pr-4">
                <div className="space-y-6 py-2">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        The Parable
                      </h3>
                    </div>
                    <blockquote className="border-l-4 border-sky-500 pl-4 py-2 bg-sky-50 dark:bg-sky-950/30 rounded-r-lg">
                      <p className="text-sm text-gray-800 dark:text-gray-200 italic leading-relaxed">
                        {selectedParable.parable}
                      </p>
                    </blockquote>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                        <Lightbulb className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        The Meaning
                      </h3>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed pl-4">
                      {selectedParable.meaning}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center">
                        <Heart className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        Application for Your Walk
                      </h3>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed pl-4">
                      {selectedParable.application}
                    </p>
                  </div>
                </div>
              </ScrollArea>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
