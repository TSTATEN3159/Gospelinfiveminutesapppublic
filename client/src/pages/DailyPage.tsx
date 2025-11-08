import { Card, CardContent } from "@/components/ui/card";
import { Calendar, BookOpen, ChevronRight, Lightbulb, CheckCircle } from "lucide-react";
import dailyDevotionsImage from '@assets/generated_images/Peaceful_sunrise_daily_verse_e2a3184e.png';
import readingPlansImage from '@assets/generated_images/Open_Bible_study_scene_e3a19a6e.png';
import plainMeaningImage from '@assets/generated_images/Plain_meaning_verse_simplifier_9d1a382e.png';
import instantApplicationImage from '@assets/generated_images/Instant_application_try_today_e2051d9a.png';

interface DailyPageProps {
  onNavigate: (page: string) => void;
}

const dailyFeatures = [
  {
    id: "devotionals",
    title: "365 Daily Devotionals",
    description: "Daily scripture, devotion, and practical application for spiritual growth",
    icon: Calendar,
    image: dailyDevotionsImage,
    overlay: 'from-transparent via-transparent to-amber-950/60',
    border: 'border-amber-200/50',
    gradientFrom: 'from-amber-500',
    gradientTo: 'to-orange-500',
    iconBg: 'bg-gradient-to-br from-amber-500 to-orange-500',
    iconColor: 'text-white',
    glowColor: 'rgba(245, 158, 11, 0.2)'
  },
  {
    id: "reading-plans",
    title: "Bible Reading Plans",
    description: "1-year whole Bible, 6-month OT & NT plans with progress tracking",
    icon: BookOpen,
    image: readingPlansImage,
    overlay: 'from-transparent via-transparent to-emerald-950/60',
    border: 'border-emerald-200/50',
    gradientFrom: 'from-emerald-500',
    gradientTo: 'to-green-500',
    iconBg: 'bg-gradient-to-br from-emerald-500 to-green-500',
    iconColor: 'text-white',
    glowColor: 'rgba(16, 185, 129, 0.2)'
  },
  {
    id: "plain-meaning",
    title: "Plain Meaning",
    description: "Scripture in everyday language while preserving theological integrity",
    icon: Lightbulb,
    image: plainMeaningImage,
    overlay: 'from-transparent via-transparent to-blue-950/60',
    border: 'border-blue-200/50',
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-cyan-500',
    iconBg: 'bg-gradient-to-br from-blue-500 to-cyan-500',
    iconColor: 'text-white',
    glowColor: 'rgba(59, 130, 246, 0.2)'
  },
  {
    id: "instant-application",
    title: "Instant Application",
    description: "Get one simple action to live out any verse today",
    icon: CheckCircle,
    image: instantApplicationImage,
    overlay: 'from-transparent via-transparent to-purple-950/60',
    border: 'border-purple-200/50',
    gradientFrom: 'from-purple-500',
    gradientTo: 'to-pink-500',
    iconBg: 'bg-gradient-to-br from-purple-500 to-pink-500',
    iconColor: 'text-white',
    glowColor: 'rgba(147, 51, 234, 0.2)'
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

      {/* Feature Tiles - Premium Liquid Glass */}
      <div className="max-w-sm mx-auto space-y-5 px-4 py-6">
        {dailyFeatures.map((feature) => (
          <div
            key={feature.id}
            className="relative cursor-pointer group"
            onClick={() => handleFeatureClick(feature.id)}
            data-testid={`tile-${feature.id}`}
          >
            {/* Liquid Glass Card */}
            <Card 
              className={`relative rounded-3xl overflow-hidden backdrop-blur-2xl bg-white/40 dark:bg-gray-900/40 border ${feature.border} dark:border-gray-700/50 shadow-2xl transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_20px_60px_-15px] group-hover:-translate-y-1`}
              style={{
                boxShadow: `0 8px 32px 0 ${feature.glowColor}, inset 0 1px 0 0 rgba(255, 255, 255, 0.5)`
              }}
            >
              {/* Glass shimmer overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent opacity-50 pointer-events-none"></div>
              
              {/* Image Header - Vivid & Sharp */}
              <div className="relative h-40 overflow-hidden">
                <img 
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-105 contrast-110 saturate-110"
                  style={{ 
                    imageRendering: 'crisp-edges',
                    WebkitFontSmoothing: 'antialiased'
                  }}
                />
                {/* Subtle bottom gradient for icon visibility */}
                <div className={`absolute inset-0 bg-gradient-to-t ${feature.overlay}`} />
                
                {/* Glass icon badge */}
                <div className="absolute bottom-3 right-3">
                  <div className={`w-14 h-14 ${feature.iconBg} rounded-2xl flex items-center justify-center shadow-2xl relative overflow-hidden ring-2 ring-white/50`}>
                    <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
                    <feature.icon className={`w-7 h-7 ${feature.iconColor} relative z-10 drop-shadow-lg`} />
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent"></div>
                  </div>
                </div>
              </div>

              {/* Content with Glass Background */}
              <CardContent className="relative p-5 backdrop-blur-xl bg-white/50 dark:bg-gray-900/50">
                <div className="flex items-center justify-between">
                  <div className="flex-1 pr-3">
                    <h3 className={`font-bold text-lg bg-gradient-to-r ${feature.gradientFrom} ${feature.gradientTo} bg-clip-text text-transparent mb-1.5 drop-shadow-sm`}>
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                      {feature.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl flex items-center justify-center shadow-lg group-hover:bg-white/80 dark:group-hover:bg-gray-800/80 transition-all duration-300">
                      <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:translate-x-0.5 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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
