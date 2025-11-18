import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, BookHeart, Calendar, CheckCircle2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import discipleHeroImage from '@assets/stock_images/disciples_following__34d3c839.jpg';

interface DisciplesOfChristPageProps {
  onBack?: () => void;
  language: string;
}

export default function DisciplesOfChristPage({ onBack, language }: DisciplesOfChristPageProps) {
  return (
    <div className="min-h-screen pb-6 bg-gradient-to-b from-blue-50 via-white to-purple-50/30">
      {/* Header with Back Button */}
      <div className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
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
          <h1 className="text-lg font-bold text-gray-900">Disciple</h1>
        </div>
      </div>

      {/* Hero Section with Background Image */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={discipleHeroImage}
          alt="Disciples Following Christ"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-blue-800/70 to-blue-900/90" />
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-4 shadow-2xl border-2 border-white/40">
            <BookHeart className="w-8 h-8 text-white" strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-bold text-white mb-3 drop-shadow-lg" data-testid="title-main">
            Disciple of Christ
          </h1>
          <h2 className="text-xl font-semibold text-blue-100 mb-2 drop-shadow-md" data-testid="subtitle-plans">
            Plans & Teachings
          </h2>
          <p className="text-sm text-blue-200 max-w-md leading-relaxed drop-shadow-md">
            Deepen your faith through structured spiritual growth plans designed to transform your walk with Christ
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Introduction Card */}
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200/50 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shadow-md border-2 border-blue-200/60 flex-shrink-0">
                <Users className="w-6 h-6 text-blue-700" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Begin Your Discipleship Journey</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Choose from carefully crafted spiritual growth plans designed to guide you deeper into God's Word and strengthen your relationship with Christ. Each plan includes daily readings, practical applications, and transformative teachings.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Plans Section - Ready for Individual Plans */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 px-2">
            <Calendar className="w-5 h-5 text-blue-700" />
            <h3 className="text-lg font-bold text-gray-900">Available Plans</h3>
          </div>

          {/* Placeholder for Future Plans */}
          <div className="bg-white rounded-2xl border-2 border-dashed border-blue-200 p-12 text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookHeart className="w-8 h-8 text-blue-400" />
            </div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">Plans Coming Soon</h4>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              Individual discipleship plans will be added here to guide you through your spiritual growth journey
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Card className="bg-white border-2 border-gray-100 shadow-sm hover-elevate">
            <CardContent className="p-5 text-center">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm border border-blue-100">
                <CheckCircle2 className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 text-sm mb-1">Structured Growth</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Follow proven paths to deepen your faith
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-2 border-gray-100 shadow-sm hover-elevate">
            <CardContent className="p-5 text-center">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm border border-purple-100">
                <BookHeart className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 text-sm mb-1">Daily Teachings</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Bite-sized lessons that fit your schedule
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-2 border-gray-100 shadow-sm hover-elevate">
            <CardContent className="p-5 text-center">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm border border-green-100">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 text-sm mb-1">Practical Steps</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Apply biblical truths to your daily life
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Footer Note */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-100/50 shadow-sm">
          <CardContent className="p-5 text-center">
            <p className="text-xs text-gray-700 leading-relaxed">
              New discipleship plans are being added regularly to help you grow in your faith journey. Check back soon for guided paths to transform your spiritual walk.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
