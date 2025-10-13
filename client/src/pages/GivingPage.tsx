import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Heart, Book, Users, DollarSign, ArrowLeft, Target, TrendingUp, Globe, Gift } from "lucide-react";
import { Capacitor } from '@capacitor/core';
import { useTranslations } from '@/lib/translations';
import { useQuery } from "@tanstack/react-query";
import givingHandsImage from '@assets/generated_images/Peaceful_giving_hands_spiritual_77b7a27e.png';
import holyBibleImage from '@assets/generated_images/Holy_Bible_peaceful_scripture_f5e43a22.png';
import friendsFellowship from '@assets/generated_images/Spiritual_friends_community_fellowship_c29d9bfe.png';
import mountainLakeImage from '@assets/generated_images/Mountain_lake_sunrise_scripture_98ce5cc4.png';

interface GivingPageProps {
  onNavigate?: (page: string) => void;
  streakDays?: number;
  language?: string;
}

export default function GivingPage({ onNavigate, streakDays = 0, language = "en" }: GivingPageProps) {
  const t = useTranslations(language);
  // iOS platform detection for Apple Store compliance
  const isIOS = Capacitor.getPlatform() === 'ios';
  
  // Fetch real donation statistics from API
  const { data: donationStats } = useQuery({
    queryKey: ["/api/donation-stats"],
    staleTime: 30000, // Refetch every 30 seconds
  });

  const totalDonations = (donationStats as any)?.success ? (donationStats as any).stats.totalDonations : 0;
  const biblesPurchased = (donationStats as any)?.success ? (donationStats as any).stats.biblesPurchased : 0;
  const monthlyDonations = (donationStats as any)?.success ? (donationStats as any).stats.monthlyDonations : 0;
  
  const givingStats = {
    totalDonations: totalDonations,
    biblesPurchased: biblesPurchased,
    biblesDistributed: Math.floor(biblesPurchased * 0.95), // 95% distribution rate
    currentGoal: 50000,
    monthlyDonations: monthlyDonations,
    impactReach: biblesPurchased * 10 // Assume each Bible reaches 10 people
  };

  const progressPercentage = (givingStats.totalDonations / givingStats.currentGoal) * 100;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-20">
      {/* Professional Header Section */}
      <div className="bg-white dark:bg-gray-900 px-6 py-8 border-b border-amber-200 dark:border-amber-800 ios-safe-top">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate?.('more')}
            className="mr-4 h-11 w-11 hover:bg-amber-100 dark:hover:bg-amber-900 transition-all duration-300 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105"
            data-testid="button-back-giving"
            aria-label="Go back to More page"
          >
            <ArrowLeft className="w-5 h-5 text-amber-700 dark:text-amber-300" />
          </Button>
          <div className="flex-1 text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-800 via-yellow-700 to-orange-800 bg-clip-text text-transparent mb-2" style={{ 
              fontFamily: 'Dancing Script, Brush Script MT, cursive',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
            }}>
              {t.givingPageTitle}
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 rounded-full mx-auto shadow-sm mb-3" />
            <p className="text-amber-700 dark:text-amber-300 font-semibold text-lg">{t.givingPageSubtitle}</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        <div className="max-w-lg mx-auto space-y-6">
        {/* Goal Progress with Vivid Imagery */}
        <Card className="overflow-hidden shadow-lg border-0 bg-gradient-to-br from-amber-200/90 via-yellow-200/95 to-orange-200/90 dark:from-amber-900/70 dark:via-yellow-900/70 dark:to-orange-900/70 transform hover:scale-[1.01] transition-all duration-300">
          <div className="relative">
            <img 
              src={mountainLakeImage} 
              alt="Mountain lake sunrise representing spiritual goals" 
              className="w-full h-24 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-amber-900/80 via-amber-700/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <CardTitle className="text-center text-white text-lg font-bold mb-1">
                {t.currentGoalSpreadGodsWord}
              </CardTitle>
              <div className="flex justify-center">
                <div className="w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
                  <Target className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>
          <CardContent className="p-4 bg-gradient-to-br from-white/95 via-amber-50/90 to-orange-50/95 dark:from-gray-800/95 dark:via-amber-900/30 dark:to-orange-900/30">
            <div className="text-center space-y-3">
              <div className="text-3xl font-bold bg-gradient-to-r from-amber-800 via-yellow-700 to-orange-800 bg-clip-text text-transparent">
                ${givingStats.totalDonations.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-sm font-semibold text-amber-700 dark:text-amber-300 mb-3">
                {t.of} ${givingStats.currentGoal.toLocaleString()} {t.goal}
              </div>
              <Progress value={progressPercentage} className="h-3 mb-2" />
              <div className="text-xs font-bold text-amber-800 dark:text-amber-200">
                {Math.round(progressPercentage)}{t.percentComplete}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Impact Statistics with Vivid Imagery */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="text-center shadow-lg border-0 bg-gradient-to-br from-amber-100/90 to-orange-100/90 dark:from-amber-900/60 dark:to-orange-900/60 overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
            <div className="relative h-20">
              <img 
                src={holyBibleImage} 
                alt="Holy Bible representing purchased Bibles" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/70 via-amber-600/30 to-transparent"></div>
              <div className="absolute bottom-1 left-0 right-0">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <Book className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            <CardContent className="p-3 bg-gradient-to-br from-white/90 to-amber-50/90 dark:from-gray-800/90 dark:to-amber-900/30">
              <div className="text-2xl font-bold bg-gradient-to-r from-amber-800 to-orange-800 bg-clip-text text-transparent mb-1">
                {givingStats.biblesPurchased.toLocaleString()}
              </div>
              <div className="text-sm font-semibold text-amber-700 dark:text-amber-300">
                {t.biblesPurchased}
              </div>
            </CardContent>
          </Card>

          <Card className="text-center shadow-lg border-0 bg-gradient-to-br from-amber-100/90 to-orange-100/90 dark:from-amber-900/60 dark:to-orange-900/60 overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
            <div className="relative h-20">
              <img 
                src={friendsFellowship} 
                alt="Community fellowship representing Bible distribution" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/70 via-amber-600/30 to-transparent"></div>
              <div className="absolute bottom-1 left-0 right-0">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <Users className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            <CardContent className="p-3 bg-gradient-to-br from-white/90 to-amber-50/90 dark:from-gray-800/90 dark:to-amber-900/30">
              <div className="text-2xl font-bold bg-gradient-to-r from-amber-800 to-orange-800 bg-clip-text text-transparent mb-1">
                {givingStats.biblesDistributed.toLocaleString()}
              </div>
              <div className="text-sm font-semibold text-amber-700 dark:text-amber-300">
                {t.biblesDistributed}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Impact with Vivid Imagery */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-amber-200/90 via-yellow-200/95 to-orange-200/90 dark:from-amber-900/70 dark:via-yellow-900/70 dark:to-orange-900/70 overflow-hidden transform hover:scale-[1.01] transition-all duration-300">
          <div className="relative">
            <img 
              src={givingHandsImage} 
              alt="Peaceful giving hands representing monthly impact" 
              className="w-full h-24 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-amber-900/80 via-amber-700/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <CardTitle className="text-center text-white text-lg font-bold mb-1">
                {t.thisMonthsImpact}
              </CardTitle>
              <div className="flex justify-center">
                <div className="w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>
          <CardContent className="p-4 bg-gradient-to-br from-white/95 via-amber-50/90 to-orange-50/95 dark:from-gray-800/95 dark:via-amber-900/30 dark:to-orange-900/30">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-amber-700 dark:text-amber-300">{t.monthlyDonations}</span>
                <span className="text-lg font-bold bg-gradient-to-r from-amber-800 to-orange-800 bg-clip-text text-transparent">
                  ${givingStats.monthlyDonations.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-amber-700 dark:text-amber-300">{t.livesReached}</span>
                <span className="text-lg font-bold bg-gradient-to-r from-amber-800 to-orange-800 bg-clip-text text-transparent">
                  {givingStats.impactReach.toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action (Hidden on iOS for App Store compliance) */}
        {!isIOS && (
          <Card className="shadow-lg border-0 bg-gradient-to-br from-amber-600 via-yellow-600 to-orange-600 text-white overflow-hidden transform hover:scale-[1.01] transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-white/20 to-white/10 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-center">
                {t.joinOurMission}
              </h3>
              <p className="text-white/90 text-sm mb-4 leading-relaxed text-center">
                {t.givingPageCTADescription}
              </p>
              <Button 
                variant="outline"
                size="lg"
                className="bg-white/20 border-white/30 text-white hover:bg-white/30 hover:border-white/50 rounded-full font-medium"
                data-testid="button-donate-giving"
                aria-label="Make a donation to spread the Gospel"
                onClick={() => onNavigate?.('donate')}
              >
                <Heart className="w-4 h-4 mr-2" />
                {t.makeADonation}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Global Bible Distribution */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-amber-100/90 to-orange-100/90 dark:from-amber-900/60 dark:to-orange-900/60 overflow-hidden transform hover:scale-[1.01] transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 p-4">
            <CardTitle className="text-center text-white text-lg font-bold">
              {t.globalBibleDistribution}
            </CardTitle>
            <div className="flex justify-center mt-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-lg p-6 text-center border border-amber-300/60 dark:border-amber-600/60 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-amber-800 dark:text-amber-200 mb-2">
                {t.worldwideImpactComingSoon}
              </h3>
              <p className="text-amber-700 dark:text-amber-300 text-sm font-medium leading-relaxed">
                {t.worldwideImpactDescription}
              </p>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
}