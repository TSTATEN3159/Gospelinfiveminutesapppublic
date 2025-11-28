import { useState, useEffect } from "react";
import { TreeDeciduous, Leaf, Sun, Droplets, ChevronRight, Sparkles, Timer } from "lucide-react";
import { tapHaptic } from "@/lib/nativeEnhancements";

interface AbideGrowthCardProps {
  onStartAbide: () => void;
}

interface FruitOfSpirit {
  name: string;
  icon: string;
  color: string;
  verse: string;
}

const FRUITS_OF_SPIRIT: FruitOfSpirit[] = [
  { name: "Love", icon: "❤️", color: "from-rose-500 to-pink-500", verse: "1 Corinthians 13:4-7" },
  { name: "Joy", icon: "✨", color: "from-amber-400 to-yellow-500", verse: "Nehemiah 8:10" },
  { name: "Peace", icon: "🕊️", color: "from-sky-400 to-blue-500", verse: "John 14:27" },
  { name: "Patience", icon: "⏳", color: "from-violet-400 to-purple-500", verse: "James 1:4" },
  { name: "Kindness", icon: "💝", color: "from-pink-400 to-rose-400", verse: "Ephesians 4:32" },
  { name: "Goodness", icon: "🌟", color: "from-emerald-400 to-green-500", verse: "Psalm 23:6" },
  { name: "Faithfulness", icon: "🛡️", color: "from-indigo-400 to-blue-600", verse: "Lamentations 3:23" },
  { name: "Gentleness", icon: "🌸", color: "from-pink-300 to-rose-300", verse: "Philippians 4:5" },
  { name: "Self-Control", icon: "💪", color: "from-slate-400 to-gray-500", verse: "Proverbs 25:28" },
];

export function AbideGrowthCard({ onStartAbide }: AbideGrowthCardProps) {
  const [todaysFruit, setTodaysFruit] = useState<FruitOfSpirit>(FRUITS_OF_SPIRIT[0]);
  const [fruitsGrown, setFruitsGrown] = useState(0);
  const [totalFruits, setTotalFruits] = useState(0);

  useEffect(() => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const fruitIndex = dayOfYear % FRUITS_OF_SPIRIT.length;
    setTodaysFruit(FRUITS_OF_SPIRIT[fruitIndex]);

    const saved = localStorage.getItem("abideGrowthData");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setFruitsGrown(data.fruitsGrown || 0);
        setTotalFruits(data.totalFruits || 0);
      } catch (e) {
        console.warn("Could not parse abide growth data");
      }
    }
  }, []);

  const handleTap = () => {
    tapHaptic();
    onStartAbide();
  };

  return (
    <div 
      onClick={handleTap}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-950/40 dark:via-green-950/30 dark:to-teal-950/40 border border-emerald-200/50 dark:border-emerald-800/30 shadow-lg cursor-pointer active:scale-[0.98] transition-transform"
      data-testid="card-abide-growth"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-200/30 to-transparent dark:from-emerald-700/20 rounded-bl-full" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-200/30 to-transparent dark:from-green-700/20 rounded-tr-full" />
      
      <div className="relative p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50">
            <Leaf className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-200 tracking-wide uppercase">
              Abide — My Growth Today
            </h3>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="relative flex-shrink-0">
            <div className="w-20 h-24 flex items-end justify-center">
              <div className="relative">
                <TreeDeciduous className="w-16 h-16 text-emerald-600 dark:text-emerald-400" strokeWidth={1.5} />
                
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                  {[...Array(Math.min(fruitsGrown, 5))].map((_, i) => (
                    <span key={i} className="text-xs animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}>
                      {todaysFruit.icon}
                    </span>
                  ))}
                </div>
                
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1">
                  <Sun className="w-3 h-3 text-amber-500" />
                  <Droplets className="w-3 h-3 text-blue-400" />
                </div>
              </div>
            </div>
            
            <div className="text-center mt-1">
              <span className="text-[10px] font-medium text-emerald-600/70 dark:text-emerald-400/70">
                {totalFruits} fruits grown
              </span>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{todaysFruit.icon}</span>
                <span className="text-base font-semibold text-gray-900 dark:text-gray-100">
                  Today's Fruit: {todaysFruit.name}
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {todaysFruit.verse}
              </p>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1">
                <div className="h-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${todaysFruit.color} rounded-full transition-all duration-500`}
                    style={{ width: `${Math.min((fruitsGrown / 3) * 100, 100)}%` }}
                  />
                </div>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">
                  {fruitsGrown}/3 sessions today
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300">
                <Timer className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">5 min growth session</span>
              </div>
              <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <span className="text-xs font-semibold">Start</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-2 right-2">
        <Sparkles className="w-4 h-4 text-amber-400/60 animate-pulse" />
      </div>
    </div>
  );
}
