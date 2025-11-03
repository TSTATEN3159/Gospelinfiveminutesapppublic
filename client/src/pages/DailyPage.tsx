import { Card, CardContent } from "@/components/ui/card";
import { Calendar, BookOpen, ChevronRight } from "lucide-react";
import dailyDevotionsImage from '@assets/generated_images/Peaceful_sunrise_daily_verse_e2a3184e.png';
import readingPlansImage from '@assets/generated_images/Open_Bible_study_scene_e3a19a6e.png';

interface DailyPageProps {
  onNavigate: (page: string) => void;
}

const dailyFeatures = [
  {
    id: "devotionals",
    title: "365 Daily Devotionals",
    description: "Daily scripture, devotion, and practical application for your spiritual growth",
    icon: Calendar,
    image: dailyDevotionsImage,
    overlay: 'from-amber-900/70 via-amber-600/20',
    border: 'border-amber-200',
    iconBg: 'bg-amber-100',
    iconBorder: 'border-amber-200/60',
    iconRing: 'ring-amber-300/50',
    iconColor: 'text-amber-700'
  },
  {
    id: "reading-plans",
    title: "Bible Reading Plans",
    description: "1-year whole Bible, 6-month OT, and 6-month NT plans with progress tracking",
    icon: BookOpen,
    image: readingPlansImage,
    overlay: 'from-emerald-900/70 via-emerald-600/20',
    border: 'border-emerald-200',
    iconBg: 'bg-emerald-100',
    iconBorder: 'border-emerald-200/60',
    iconRing: 'ring-emerald-300/50',
    iconColor: 'text-emerald-700'
  }
];

export default function DailyPage({ onNavigate }: DailyPageProps) {
  const handleFeatureClick = (id: string) => {
    onNavigate(id);
  };

  return (
    <div className="min-h-screen pb-20 bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/5 via-background to-primary/10 px-4 py-8 border-b border-border ios-safe-top">
        <div className="max-w-sm mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/20 mb-4 shadow-lg">
            <Calendar className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Daily</h1>
          <p className="text-muted-foreground text-sm">
            Start your day with God's Word through devotions and reading plans
          </p>
        </div>
      </div>

      {/* Feature Tiles */}
      <div className="max-w-sm mx-auto space-y-4 px-4 py-6">
        {dailyFeatures.map((feature) => (
          <Card 
            key={feature.id}
            className={`bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border-2 ${feature.border} cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 ring-4 ring-white/50 hover:ring-white/70 backdrop-blur-sm`}
            onClick={() => handleFeatureClick(feature.id)}
            data-testid={`tile-${feature.id}`}
          >
            {/* Image Header */}
            <div className="relative h-32">
              <img 
                src={feature.image}
                alt={feature.title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${feature.overlay} to-transparent`} />
            </div>

            {/* Content */}
            <CardContent className="p-4">
              <div className="flex items-center justify-between min-h-[40px]">
                <div className="flex items-center gap-3 flex-1">
                  <div className={`w-10 h-10 ${feature.iconBg} rounded-full flex items-center justify-center shadow-lg border-2 ${feature.iconBorder} ring-1 ${feature.iconRing}`}>
                    <feature.icon className={`w-5 h-5 ${feature.iconColor} stroke-[1.5]`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-base text-gray-800 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-500 flex-shrink-0 ml-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer Info */}
      <div className="max-w-sm mx-auto px-4 pb-6">
        <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            <span className="font-semibold text-foreground">Build your daily habit</span> — 
            Track your progress as you read through devotionals and complete Bible reading plans. 
            Every day brings new opportunities for spiritual growth.
          </p>
        </div>
      </div>
    </div>
  );
}
