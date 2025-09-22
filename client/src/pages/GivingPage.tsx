import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Heart, Book, Users, DollarSign, ArrowLeft, Target, TrendingUp } from "lucide-react";
import { Capacitor } from '@capacitor/core';

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
    <div className="min-h-screen pb-20">
      {/* Header Section */}
      <div className="bg-background px-4 py-6 border-b border-border ios-safe-top">
        <div className="flex items-center mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate?.('more')}
            className="mr-3"
            data-testid="button-back-giving"
            aria-label="Go back to More page"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-primary" style={{ 
              fontFamily: 'Dancing Script, Brush Script MT, cursive',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
            }}>
              Giving Impact
            </h1>
            <p className="text-muted-foreground mt-1">See how your generosity spreads God's word</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Current Goal Progress */}
        <Card className="bg-muted/30 border-border shadow-lg border-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-center text-foreground">
              Current Goal: Spread God's Word
            </CardTitle>
            <div className="flex justify-center mt-2">
              <Target className="w-5 h-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground mb-2">
                ${givingStats.totalDonations.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-sm text-muted-foreground mb-4">
                of ${givingStats.currentGoal.toLocaleString()} goal
              </div>
              <Progress value={progressPercentage} className="h-3" />
              <div className="text-xs text-muted-foreground mt-2">
                {Math.round(progressPercentage)}% Complete
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Impact Statistics */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="text-center shadow-lg border-2">
            <CardContent className="p-4">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                <Book className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">
                {givingStats.biblesPurchased.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">
                Bibles Purchased
              </div>
            </CardContent>
          </Card>

          <Card className="text-center shadow-lg border-2">
            <CardContent className="p-4">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">
                {givingStats.biblesDistributed.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">
                Bibles Distributed
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Impact */}
        <Card className="shadow-lg border-2">
          <CardHeader>
            <CardTitle className="text-center">
              This Month's Impact
            </CardTitle>
            <div className="flex justify-center mt-2">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Monthly Donations</span>
              <span className="text-lg font-semibold text-primary">
                ${givingStats.monthlyDonations.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Lives Reached</span>
              <span className="text-lg font-semibold text-primary">
                {givingStats.impactReach.toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action (Hidden on iOS for App Store compliance) */}
        {!isIOS && (
          <Card className="bg-primary text-primary-foreground shadow-lg border-2">
            <CardContent className="p-6 text-center">
              <Heart className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2 text-center">
                Join Our Mission
              </h3>
              <p className="text-primary-foreground/80 text-sm mb-4 leading-relaxed text-center">
                Your donation helps us purchase and distribute Bibles to those who need God's word most. 
                Every contribution brings the Gospel to someone seeking hope and salvation.
              </p>
              <Button 
                variant="outline"
                size="lg"
                className="rounded-full font-medium"
                data-testid="button-donate-giving"
                aria-label="Make a donation to spread the Gospel"
                onClick={() => onNavigate?.('donate')}
              >
                <Heart className="w-4 h-4 mr-2" />
                Make a Donation
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Bible Distribution Map placeholder */}
        <Card className="shadow-lg border-2">
          <CardHeader>
            <CardTitle className="text-center">Global Bible Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted rounded-lg p-8 text-center">
              <div className="text-muted-foreground mb-2">
                <Users className="w-12 h-12 mx-auto mb-2" />
              </div>
              <p className="text-muted-foreground text-sm">
                Interactive map showing Bible distributions worldwide coming soon!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}