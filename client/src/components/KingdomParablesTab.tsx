import { Card } from "@/components/ui/card";
import { BookOpen, Lightbulb, Heart, ChevronRight } from "lucide-react";
import { JESUS_PARABLES, type Parable } from "@/features/parables/parablesData";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

import sowerImage from "@assets/stock_images/farmer_sowing_seeds__0ca2eebf.jpg";
import samaritanImage from "@assets/stock_images/helping_hands_compas_9cade49f.jpg";
import prodigalImage from "@assets/stock_images/father_embracing_son_4baff2c4.jpg";
import mustardImage from "@assets/stock_images/small_plant_seedling_c5a00be4.jpg";
import sheepImage from "@assets/stock_images/shepherd_with_flock__3825dbd2.jpg";
import barnImage from "@assets/stock_images/old_wooden_barn_farm_5ddc5f93.jpg";
import weddingImage from "@assets/stock_images/elegant_wedding_rece_9ce445d2.jpg";
import lampImage from "@assets/stock_images/oil_lamp_lantern_glo_7c2af692.jpg";
import coinsImage from "@assets/stock_images/gold_coins_treasure__9c2bcbd6.jpg";
import prayingImage from "@assets/stock_images/person_praying_humbl_128bc75e.jpg";
import forgivenessImage from "@assets/stock_images/hands_reaching_out_f_98681ac2.jpg";
import treasureImage from "@assets/stock_images/ancient_treasure_che_124e68c1.jpg";
import pearlImage from "@assets/stock_images/beautiful_pearl_jewe_0a297032.jpg";
import rockImage from "@assets/stock_images/stone_house_solid_ro_65ad64d0.jpg";
import widowImage from "@assets/stock_images/elderly_woman_prayin_9c3c381b.jpg";
import vineyardImage from "@assets/stock_images/vineyard_workers_gra_d40f034f.jpg";
import doorImage from "@assets/stock_images/wooden_door_at_night_14537cac.jpg";
import sheepGoatsImage from "@assets/stock_images/sheep_and_goats_sepa_422be3e3.jpg";
import leavenImage from "@assets/stock_images/bread_dough_rising_y_1b8c013d.jpg";
import richManLazarusImage from "@assets/stock_images/rich_mansion_luxury__bebecec8.jpg";

const parableImages: Record<string, string> = {
  "sower": sowerImage,
  "good-samaritan": samaritanImage,
  "prodigal-son": prodigalImage,
  "mustard-seed": mustardImage,
  "lost-sheep": sheepImage,
  "rich-fool": barnImage,
  "wedding-feast": weddingImage,
  "ten-virgins": lampImage,
  "talents": coinsImage,
  "pharisee-tax-collector": prayingImage,
  "unforgiving-servant": forgivenessImage,
  "hidden-treasure": treasureImage,
  "pearl": pearlImage,
  "wise-foolish-builders": rockImage,
  "persistent-widow": widowImage,
  "workers-vineyard": vineyardImage,
  "friend-at-midnight": doorImage,
  "sheep-goats": sheepGoatsImage,
  "leaven": leavenImage,
  "rich-man-lazarus": richManLazarusImage,
};

export function KingdomParablesTab() {
  const [selectedParable, setSelectedParable] = useState<Parable | null>(null);

  return (
    <>
      <div className="space-y-8 pb-8">
        <div className="text-center py-8 px-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            Parables of Jesus
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
            Discover timeless wisdom through Christ's sacred stories that reveal kingdom truths
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-1">
          {JESUS_PARABLES.map((parable) => (
            <Card
              key={parable.id}
              onClick={() => setSelectedParable(parable)}
              className="group relative overflow-hidden rounded-2xl border-0 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white dark:bg-gray-900"
              data-testid={`card-parable-${parable.id}`}
            >
              <div className="relative h-44 w-full overflow-hidden">
                <img
                  src={parableImages[parable.id] || sowerImage}
                  alt={parable.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-bold text-white leading-tight mb-1 drop-shadow-lg">
                    {parable.title}
                  </h3>
                  <p className="text-sm text-amber-200 font-medium drop-shadow-md">
                    {parable.reference}
                  </p>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div className="flex items-start gap-2.5">
                  <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
                    <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-2 flex-1">
                    {parable.meaning}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
                  <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wide">
                    Read Full Parable
                  </span>
                  <ChevronRight className="w-4 h-4 text-amber-500 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={selectedParable !== null} onOpenChange={() => setSelectedParable(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] p-0 overflow-hidden">
          {selectedParable && (
            <>
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={parableImages[selectedParable.id] || sowerImage}
                  alt={selectedParable.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <DialogHeader className="absolute bottom-0 left-0 right-0 p-6">
                  <DialogTitle className="text-2xl font-bold text-white drop-shadow-lg">
                    {selectedParable.title}
                  </DialogTitle>
                  <p className="text-base text-amber-200 font-semibold mt-1 drop-shadow-md">
                    {selectedParable.reference} (KJV)
                  </p>
                </DialogHeader>
              </div>

              <ScrollArea className="max-h-[calc(90vh-12rem)]">
                <div className="space-y-6 p-6">
                  <div className="bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-950/40 dark:to-blue-950/40 rounded-xl p-5 border border-sky-200 dark:border-sky-800">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-md">
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        The Parable from Scripture
                      </h3>
                    </div>
                    <blockquote className="border-l-4 border-sky-500 pl-4 py-2 bg-white/60 dark:bg-black/20 rounded-r-lg">
                      <p className="text-base text-gray-800 dark:text-gray-200 italic leading-relaxed font-serif">
                        {selectedParable.parable}
                      </p>
                    </blockquote>
                  </div>

                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 rounded-xl p-5 border border-amber-200 dark:border-amber-800">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-md">
                        <Lightbulb className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        The Meaning
                      </h3>
                    </div>
                    <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                      {selectedParable.meaning}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/40 dark:to-pink-950/40 rounded-xl p-5 border border-rose-200 dark:border-rose-800">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-md">
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        Application for Your Walk
                      </h3>
                    </div>
                    <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
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
