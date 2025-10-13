import BibleSearchSection from "../components/BibleSearchSection";
import { TopicalSearchSection } from "../components/TopicalSearchSection";
import bibleImage from '@assets/generated_images/Open_Bible_study_scene_e3a19a6e.png';
import shepherdImage from '@assets/generated_images/Peaceful_pastoral_shepherd_scene_d43b4770.png';
import { Facebook, Instagram, Heart, Flame, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/lib/translations";
import { Capacitor } from '@capacitor/core';

interface SearchPageProps {
  onNavigate?: (page: string, searchQuery?: string) => void;
  streakDays?: number;
  language?: string;
  initialSearchQuery?: string;
  onSearchUsed?: () => void;
}

export default function SearchPage({ onNavigate, streakDays = 0, language = "en", initialSearchQuery, onSearchUsed }: SearchPageProps) {
  
  // iOS platform detection for Apple Store compliance
  const isIOS = Capacitor.getPlatform() === 'ios';
  
  // Handle Scripture navigation from topical search
  const handleScriptureNavigation = (reference: string) => {
    // Navigate to search with the Scripture reference pre-filled
    if (onNavigate) {
      onNavigate('search', reference);
    }
  };
  const t = useTranslations(language);
  return (
    <div className="min-h-screen pb-20">
      {/* Professional Marketing Header */}
      <div className="bg-gradient-to-b from-white via-gray-50/30 to-white px-4 py-6 border-b border-gray-200 ios-safe-top">
        {/* Centered Professional Description */}
        <div className="text-center mb-4">
          <p className="text-base font-medium text-gray-600 max-w-md mx-auto">
            {t.searchPageDescription}
          </p>
        </div>
        
        {/* Streak Badge - Centered */}
        <div className="flex justify-center mb-5">
          <div className="flex items-center gap-1.5 bg-gradient-to-br from-red-50 to-red-100/70 px-2.5 py-1 rounded-full border border-red-200/50 shadow-sm">
            <Flame className="w-4 h-4 text-red-600 fill-red-600" />
            <span className="text-sm font-bold text-red-700">{streakDays}</span>
          </div>
        </div>
        
        {/* App Title - Larger & Prominent */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-amber-900 tracking-tight" style={{ 
            fontFamily: 'Dancing Script, Brush Script MT, cursive'
          }} aria-label="The Gospel in 5 Minutes - Daily Bible verses and spiritual guidance">
            The Gospel in 5 Minutes™
          </h2>
        </div>
        
        {/* Action Buttons - Refined & Professional */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {/* Smaller Social Buttons */}
          <a 
            href="https://www.facebook.com/TheGospelIn5Minutes" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1.5 rounded-md text-xs font-medium shadow-sm hover:shadow-md transition-all ios-tap-target"
            data-testid="button-facebook-search"
            aria-label="Follow us on Facebook - Opens in new window"
          >
            <Facebook className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t.follow}</span>
          </a>
          <a 
            href="https://www.instagram.com/thegospelinfiveminutes/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-2.5 py-1.5 rounded-md text-xs font-medium shadow-sm hover:shadow-md transition-all ios-tap-target"
            data-testid="button-instagram-search"
            aria-label="Follow us on Instagram - Opens in new window"
          >
            <Instagram className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t.follow}</span>
          </a>
          
          {/* Donate Button (Hidden on iOS for App Store compliance) */}
          {!isIOS && (
            <Button 
              className="flex items-center gap-1 bg-amber-600 hover:bg-amber-700 text-white px-2.5 py-1.5 rounded-md text-xs font-medium shadow-sm hover:shadow-md transition-all"
              data-testid="button-donate-search"
              aria-label="Donate to help spread the Gospel"
              onClick={() => onNavigate?.('donate')}
            >
              <Heart className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Donate</span>
            </Button>
          )}
          
          {/* Share Button - Professional Green */}
          <Button 
            className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1.5 rounded-md text-xs font-medium shadow-sm hover:shadow-md transition-all"
            data-testid="button-share-search"
            aria-label="Share The Gospel in 5 Minutes with friends"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'The Gospel in 5 Minutes',
                  text: 'Search for any Bible verse by reference with The Gospel in 5 Minutes app!',
                  url: 'https://www.thegospelin5minutes.org'
                }).catch(console.error);
              } else {
                navigator.clipboard.writeText('https://www.thegospelin5minutes.org').then(() => {
                  console.log('Link copied to clipboard');
                }).catch(console.error);
              }
            }}
          >
            <Share className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t.share}</span>
          </Button>
        </div>
      </div>

      <div className="px-4 py-4 ios-safe-bottom">
        <div className="max-w-md mx-auto space-y-6">
          <BibleSearchSection 
            backgroundImage={bibleImage}
            initialSearchQuery={initialSearchQuery}
            onSearchUsed={onSearchUsed}
          />
          
          {/* Donation Appeal Section (Hidden on iOS for App Store compliance) */}
          {!isIOS && (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200 shadow-sm">
              <div className="text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-amber-600" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-red-600 mb-2">
                  {t.helpSpreadGodsWord}
                </h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  {t.donationAppealText}
                </p>
                <Button 
                  className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full font-medium shadow-sm"
                  data-testid="button-donate-appeal"
                  aria-label="Donate to help spread the Gospel worldwide"
                  onClick={() => onNavigate?.('donate')}
                >
                  <Heart className="w-4 h-4 mr-2" aria-hidden="true" />
                  {t.makeADonation}
                </Button>
              </div>
            </div>
          )}
          
          {/* Topical Search Section - AFTER Help Spread God's Word */}
          <TopicalSearchSection onNavigateToScripture={handleScriptureNavigation} backgroundImage={shepherdImage} />
        </div>
        
        {/* Professional Website Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">{t.visitWebsite}</p>
            <a 
              href="https://www.thegospelin5minutes.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200"
              data-testid="link-website-footer-search"
              aria-label="Visit The Gospel in 5 Minutes website - Opens in new window"
            >
              www.thegospelin5minutes.org
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}