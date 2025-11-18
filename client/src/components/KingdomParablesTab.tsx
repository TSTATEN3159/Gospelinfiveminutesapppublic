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
      <div className="space-y-6">
        <div className="text-center py-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            Parables of Jesus
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover the timeless wisdom of Christ's teachings through His parables — sacred stories that reveal kingdom truths
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {JESUS_PARABLES.map((parable) => (
            <Card
              key={parable.id}
              onClick={() => setSelectedParable(parable)}
              className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-amber-200 dark:border-amber-800 hover-elevate"
              data-testid={`card-parable-${parable.id}`}
            >
              <div className="h-2 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600" />
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold leading-tight text-gray-900 dark:text-gray-100 mb-2 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                      {parable.title}
                    </h3>
                    <p className="text-sm text-amber-700 dark:text-amber-400 font-semibold tracking-wide">
                      {parable.reference}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-lg p-3 border-l-4 border-amber-500">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-3">
                        {parable.meaning}
                      </p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/30 rounded-lg p-3 border-l-4 border-red-500">
                    <div className="flex items-start gap-2">
                      <Heart className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-3">
                        {parable.application}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t-2 border-amber-200/50 dark:border-amber-800/50">
                  <p className="text-sm text-amber-700 dark:text-amber-400 font-semibold text-center group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors">
                    Tap to read the complete parable from Scripture
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={selectedParable !== null} onOpenChange={() => setSelectedParable(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh]">
          {selectedParable && (
            <>
              <DialogHeader className="border-b-2 border-amber-200 dark:border-amber-800 pb-4">
                <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {selectedParable.title}
                </DialogTitle>
                <p className="text-base text-amber-700 dark:text-amber-400 font-semibold mt-2">
                  {selectedParable.reference} (KJV)
                </p>
              </DialogHeader>
              <ScrollArea className="max-h-[calc(90vh-9rem)] pr-4">
                <div className="space-y-8 py-4">
                  <div className="bg-gradient-to-r from-blue-50 to-sky-50 dark:from-blue-950/30 dark:to-sky-950/30 rounded-xl p-6 border-2 border-sky-300 dark:border-sky-700">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-md">
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        The Parable from Scripture
                      </h3>
                    </div>
                    <blockquote className="border-l-4 border-sky-600 pl-5 py-3 bg-white/60 dark:bg-black/20 rounded-r-lg">
                      <p className="text-base text-gray-800 dark:text-gray-200 italic leading-relaxed font-serif">
                        {selectedParable.parable}
                      </p>
                    </blockquote>
                  </div>

                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-xl p-6 border-2 border-amber-300 dark:border-amber-700">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-md">
                        <Lightbulb className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        The Meaning
                      </h3>
                    </div>
                    <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed pl-2">
                      {selectedParable.meaning}
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/30 rounded-xl p-6 border-2 border-red-300 dark:border-red-700">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center shadow-md">
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        Application for Your Walk
                      </h3>
                    </div>
                    <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed pl-2">
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
