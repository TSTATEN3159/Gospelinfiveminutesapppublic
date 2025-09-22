import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Heart, Book, Users, DollarSign, ArrowLeft, Target, TrendingUp, Globe, Gift } from "lucide-react";
import { Capacitor } from '@capacitor/core';
import givingHandsImage from '@assets/generated_images/Peaceful_giving_hands_spiritual_77b7a27e.png';
import holyBibleImage from '@assets/generated_images/Holy_Bible_peaceful_scripture_f5e43a22.png';
import friendsFellowship from '@assets/generated_images/Spiritual_friends_community_fellowship_c29d9bfe.png';
import mountainLakeImage from '@assets/generated_images/Mountain_lake_sunrise_scripture_98ce5cc4.png';

interface GivingPageProps {
  onNavigate?: (page: string) => void;
  streakDays?: number;
}

export default function GivingPage({ onNavigate, streakDays = 0 }: GivingPageProps) {
  // iOS platform detection for Apple Store compliance
  const isIOS = Capacitor.getPlatform() === 'ios';
  
  // Mock data for giving statistics - can be replaced with real API data
  const givingStats = {
    totalDonations: 47523.50,
    biblesPurchased: 1247,
    biblesDistributed: 1189,
    currentGoal: 50000,
    monthlyDonations: 3240.75,
    impactReach: 12500
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
            <h1 className="text-5xl font-black bg-gradient-to-r from-amber-800 via-yellow-700 to-orange-800 bg-clip-text text-transparent mb-3" style={{ 
              fontFamily: 'Dancing Script, Brush Script MT, cursive',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
            }}>
              Giving Impact
            </h1>
            <div className="h-2 w-40 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 rounded-full mx-auto shadow-lg mb-4" />
            <p className="text-amber-700 dark:text-amber-300 font-bold text-xl">See how your generosity spreads God's word worldwide</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-8 space-y-10">
        {/* Professional Goal Progress with Vivid Imagery */}
        <Card className="overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-amber-200/90 via-yellow-200/95 to-orange-200/90 dark:from-amber-900/70 dark:via-yellow-900/70 dark:to-orange-900/70 transform hover:scale-[1.02] transition-all duration-500">
          <div className="relative">
            <img 
              src={mountainLakeImage} 
              alt="Mountain lake sunrise representing spiritual goals" 
              className="w-full h-40 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-amber-900/90 via-amber-700/50 to-transparent"></div>
            <div className="absolute -inset-1 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-lg blur-lg"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <CardTitle className="text-center text-white text-2xl font-black mb-2">
                Current Goal: Spread God's Word
              </CardTitle>
              <div className="flex justify-center mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>
          <CardContent className="p-8 bg-gradient-to-br from-white/95 via-amber-50/90 to-orange-50/95 dark:from-gray-800/95 dark:via-amber-900/30 dark:to-orange-900/30">
            <div className="text-center space-y-6">
              <div className="text-6xl font-black bg-gradient-to-r from-amber-800 via-yellow-700 to-orange-800 bg-clip-text text-transparent mb-3">
                ${givingStats.totalDonations.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-xl font-bold text-amber-700 dark:text-amber-300 mb-6">
                of ${givingStats.currentGoal.toLocaleString()} goal
              </div>
              <div className="bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/50 dark:to-orange-900/50 rounded-2xl p-6 border-2 border-amber-300/60 dark:border-amber-600/60 shadow-xl">
                <Progress value={progressPercentage} className="h-4 mb-4" />
                <div className="text-lg font-black text-amber-800 dark:text-amber-200">
                  {Math.round(progressPercentage)}% Complete - Together We're Making Impact!
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professional Impact Statistics with Vivid Imagery */}
        <div className="grid grid-cols-2 gap-6">
          <Card className="text-center shadow-2xl border-0 bg-gradient-to-br from-amber-100/90 to-orange-100/90 dark:from-amber-900/60 dark:to-orange-900/60 overflow-hidden transform hover:scale-105 transition-all duration-500">
            <div className="relative h-32">
              <img 
                src={holyBibleImage} 
                alt="Holy Bible representing purchased Bibles" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/80 via-amber-600/40 to-transparent"></div>
              <div className="absolute bottom-2 left-0 right-0">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-xl">
                  <Book className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            <CardContent className="p-6 bg-gradient-to-br from-white/90 to-amber-50/90 dark:from-gray-800/90 dark:to-amber-900/30">
              <div className="text-4xl font-black bg-gradient-to-r from-amber-800 to-orange-800 bg-clip-text text-transparent mb-2">
                {givingStats.biblesPurchased.toLocaleString()}
              </div>
              <div className="text-lg font-bold text-amber-700 dark:text-amber-300">
                Bibles Purchased
              </div>
            </CardContent>
          </Card>

          <Card className="text-center shadow-2xl border-0 bg-gradient-to-br from-amber-100/90 to-orange-100/90 dark:from-amber-900/60 dark:to-orange-900/60 overflow-hidden transform hover:scale-105 transition-all duration-500">
            <div className="relative h-32">
              <img 
                src={friendsFellowship} 
                alt="Community fellowship representing Bible distribution" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/80 via-amber-600/40 to-transparent"></div>
              <div className="absolute bottom-2 left-0 right-0">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-xl">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            <CardContent className="p-6 bg-gradient-to-br from-white/90 to-amber-50/90 dark:from-gray-800/90 dark:to-amber-900/30">
              <div className="text-4xl font-black bg-gradient-to-r from-amber-800 to-orange-800 bg-clip-text text-transparent mb-2">
                {givingStats.biblesDistributed.toLocaleString()}
              </div>
              <div className="text-lg font-bold text-amber-700 dark:text-amber-300">
                Bibles Distributed
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Professional Monthly Impact with Vivid Imagery */}
        <Card className="shadow-2xl border-0 bg-gradient-to-br from-amber-200/90 via-yellow-200/95 to-orange-200/90 dark:from-amber-900/70 dark:via-yellow-900/70 dark:to-orange-900/70 overflow-hidden transform hover:scale-[1.02] transition-all duration-500">
          <div className="relative">
            <img 
              src={givingHandsImage} 
              alt="Peaceful giving hands representing monthly impact" 
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-amber-900/90 via-amber-700/50 to-transparent"></div>
            <div className="absolute -inset-1 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-lg blur-lg"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <CardTitle className="text-center text-white text-2xl font-black mb-3">
                This Month's Impact
              </CardTitle>
              <div className="flex justify-center">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>
          <CardContent className="p-8 bg-gradient-to-br from-white/95 via-amber-50/90 to-orange-50/95 dark:from-gray-800/95 dark:via-amber-900/30 dark:to-orange-900/30">
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/50 dark:to-orange-900/50 rounded-2xl p-6 border-2 border-amber-300/60 dark:border-amber-600/60 shadow-xl transform hover:scale-105 transition-all duration-300">
                <div className="flex flex-col items-center space-y-3">
                  <span className="text-lg font-bold text-amber-700 dark:text-amber-300">Monthly Donations</span>
                  <span className="text-4xl font-black bg-gradient-to-r from-amber-800 to-orange-800 bg-clip-text text-transparent">
                    ${givingStats.monthlyDonations.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
              <div className="bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/50 dark:to-orange-900/50 rounded-2xl p-6 border-2 border-amber-300/60 dark:border-amber-600/60 shadow-xl transform hover:scale-105 transition-all duration-300">
                <div className="flex flex-col items-center space-y-3">
                  <span className="text-lg font-bold text-amber-700 dark:text-amber-300">Lives Reached</span>
                  <span className="text-4xl font-black bg-gradient-to-r from-amber-800 to-orange-800 bg-clip-text text-transparent">
                    {givingStats.impactReach.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professional Call to Action (Hidden on iOS for App Store compliance) */}
        {!isIOS && (
          <Card className="shadow-2xl border-0 bg-gradient-to-br from-amber-600 via-yellow-600 to-orange-600 text-white overflow-hidden transform hover:scale-[1.02] transition-all duration-500">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5"></div>
              <div className="absolute -inset-1 bg-gradient-to-br from-amber-400/30 to-orange-400/30 rounded-lg blur-lg"></div>
              <CardContent className="relative p-10 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-white/20 to-white/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-black mb-6 text-center">
                  Join Our Mission
                </h3>
                <p className="text-white/90 text-lg mb-8 leading-relaxed text-center font-semibold">
                  Your donation helps us purchase and distribute Bibles to those who need God's word most. 
                  Every contribution brings the Gospel to someone seeking hope and salvation.
                </p>
                <Button 
                  variant="outline"
                  size="lg"
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30 hover:border-white/50 rounded-2xl font-black text-lg h-16 px-8 shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300"
                  data-testid="button-donate-giving"
                  aria-label="Make a donation to spread the Gospel"
                  onClick={() => onNavigate?.('donate')}
                >
                  <Heart className="w-6 h-6 mr-3" />
                  Make a Donation
                </Button>
              </CardContent>
            </div>
          </Card>
        )}

        {/* Professional Global Bible Distribution */}
        <Card className="shadow-2xl border-0 bg-gradient-to-br from-amber-100/90 to-orange-100/90 dark:from-amber-900/60 dark:to-orange-900/60 overflow-hidden transform hover:scale-[1.02] transition-all duration-500">
          <CardHeader className="bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 p-8">
            <CardTitle className="text-center text-white text-3xl font-black">
              Global Bible Distribution
            </CardTitle>
            <div className="flex justify-center mt-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Globe className="w-7 h-7 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-10">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-2xl p-12 text-center border-2 border-amber-300/60 dark:border-amber-600/60 shadow-xl">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl transform hover:scale-110 transition-transform duration-300">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-black text-amber-800 dark:text-amber-200 mb-4">
                Worldwide Impact Coming Soon!
              </h3>
              <p className="text-amber-700 dark:text-amber-300 text-lg font-semibold leading-relaxed">
                Interactive map showing Bible distributions worldwide will be available soon. 
                Track how your donations reach every corner of the globe!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}