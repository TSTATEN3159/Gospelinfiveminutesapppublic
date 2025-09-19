import BibleSearchSection from "../components/BibleSearchSection";
import { TopicalSearchSection } from "../components/TopicalSearchSection";
import bibleImage from '@assets/generated_images/Open_Bible_study_scene_e3a19a6e.png';
import shepherdImage from '@assets/generated_images/Peaceful_pastoral_shepherd_scene_d43b4770.png';
import { Facebook, Instagram, Heart, Flame, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/lib/translations";

interface SearchPageProps {
  onNavigate?: (page: string, searchQuery?: string) => void;
  streakDays?: number;
  language?: string;
  initialSearchQuery?: string;
  onSearchUsed?: () => void;
}

export default function SearchPage({ onNavigate, streakDays = 0, language = "en", initialSearchQuery, onSearchUsed }: SearchPageProps) {
  
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
      {/* Header Section - Same style as HomePage */}
      <div className="bg-white px-4 py-6 border-b border-gray-100 ios-safe-top">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-lg mt-2" style={{ 
              fontFamily: 'Dancing Script, Brush Script MT, cursive',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
              color: '#8B4513'
            }}>{t.searchPageDescription}</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center gap-1">
              <Flame className="w-6 h-6 text-red-600 fill-red-600" />
              <span className="text-lg font-bold text-red-600">{streakDays}</span>
            </div>
          </div>
        </div>
        
        {/* App Title */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-3" style={{ 
            fontFamily: 'Dancing Script, Brush Script MT, cursive',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
            color: '#8B4513'
          }} aria-label="The Gospel in 5 Minutes - Daily Bible verses and spiritual guidance">
            The Gospel in 5 Minutes™
          </h2>
        </div>
        
        {/* Social Media Buttons and Donate Button - Same line */}
        <div className="flex justify-center items-center gap-3 mb-3">
          <a 
            href="https://www.facebook.com/TheGospelIn5Minutes" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-full text-xs hover-elevate ios-tap-target"
            data-testid="button-facebook-search"
            aria-label="Follow us on Facebook - Opens in new window"
          >
            <Facebook className="w-3 h-3" aria-hidden="true" />
            <span>{t.follow}</span>
          </a>
          <a 
            href="https://www.instagram.com/thegospelin5minutes" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs hover-elevate ios-tap-target"
            data-testid="button-instagram-search"
            aria-label="Follow us on Instagram - Opens in new window"
          >
            <Instagram className="w-3 h-3" aria-hidden="true" />
            <span>{t.follow}</span>
          </a>
          <Button 
            className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm"
            data-testid="button-donate-search"
            aria-label="Donate to help spread the Gospel"
            onClick={() => onNavigate?.('donate')}
          >
            <Heart className="w-3 h-3 mr-1" aria-hidden="true" />
            Donate
          </Button>
        </div>
        
        {/* Share Button */}
        <div className="flex justify-center mt-3">
          <Button 
            className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-1 rounded-full text-xs font-medium shadow-sm"
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
            <Share className="w-3 h-3 mr-1" aria-hidden="true" />
            {t.share}
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
          
          {/* Donation Appeal Section */}
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