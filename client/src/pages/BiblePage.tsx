import AskPastorSection from "../components/AskPastorSection";
import EmotionScriptureSection from "../components/EmotionScriptureSection";
import ScriptureMemorySection from "../components/ScriptureMemorySection";
import shepherdImage from '@assets/generated_images/Peaceful_pastoral_shepherd_scene_d43b4770.png';
import handsImage from '@assets/generated_images/Caring_hands_emotional_support_20faad6c.png';
import bibleMemoryImage from '@assets/generated_images/Bible_scripture_memory_background_2b3bbc13.png';
import { Facebook, Instagram, Heart, Flame, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Capacitor } from '@capacitor/core';
import { useTranslations } from '@/lib/translations';

interface AskPageProps {
  onNavigate?: (page: string) => void;
  streakDays?: number;
  language?: string;
}

export default function AskPage({ onNavigate, streakDays = 0, language = "en" }: AskPageProps) {
  // iOS platform detection for Apple Store compliance
  const isIOS = Capacitor.getPlatform() === 'ios';
  const t = useTranslations(language);
  
  return (
    <div className="min-h-screen pb-20">
      {/* Professional Header Section */}
      <div className="bg-gradient-to-b from-white to-gray-50/50 px-4 py-5 border-b border-gray-200 ios-safe-top">
        {/* Top Row: Description + Streak */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-amber-900">
            {t.askPageDescription}
          </h1>
          <div className="flex items-center gap-2 bg-red-50 px-3 py-1.5 rounded-full border border-red-100">
            <Flame className="w-5 h-5 text-red-600 fill-red-600" />
            <span className="text-base font-bold text-red-600">{streakDays}</span>
          </div>
        </div>
        
        {/* App Title - Centered */}
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-amber-900" style={{ 
            fontFamily: 'Dancing Script, Brush Script MT, cursive'
          }} aria-label={`${t.appTitle} - ${t.askPageDescription}`}>
            {t.appTitle}
          </h2>
        </div>
        
        {/* Action Buttons Row - Professional Layout */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {/* Social Buttons */}
          <a 
            href="https://www.facebook.com/TheGospelIn5Minutes" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-all ios-tap-target"
            data-testid="button-facebook-ask"
            aria-label="Follow us on Facebook - Opens in new window"
          >
            <Facebook className="w-4 h-4" aria-hidden="true" />
            <span>{t.follow}</span>
          </a>
          <a 
            href="https://www.instagram.com/thegospelinfiveminutes/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-all ios-tap-target"
            data-testid="button-instagram-ask"
            aria-label="Follow us on Instagram - Opens in new window"
          >
            <Instagram className="w-4 h-4" aria-hidden="true" />
            <span>{t.follow}</span>
          </a>
          
          {/* Donate Button (Hidden on iOS for App Store compliance) */}
          {!isIOS && (
            <Button 
              className="flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-all"
              data-testid="button-donate-ask"
              aria-label={t.donateDesc}
              onClick={() => onNavigate?.('donate')}
            >
              <Heart className="w-4 h-4" aria-hidden="true" />
              <span>{t.donate}</span>
            </Button>
          )}
          
          {/* Share Button */}
          <Button 
            className="flex items-center gap-1.5 bg-gray-700 hover:bg-gray-800 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-all"
            data-testid="button-share-ask"
            aria-label={`${t.share} - ${t.askPageShareText}`}
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: t.appTitle,
                  text: t.askPageShareText,
                  url: 'https://www.thegospelin5minutes.org'
                }).catch(console.error);
              } else {
                navigator.clipboard.writeText('https://www.thegospelin5minutes.org').then(() => {
                  console.log('Link copied to clipboard');
                }).catch(console.error);
              }
            }}
          >
            <Share className="w-4 h-4" aria-hidden="true" />
            <span>{t.share}</span>
          </Button>
        </div>
      </div>

      <div className="px-4 py-4 space-y-6 ios-safe-bottom">
        <div className="max-w-md mx-auto space-y-6">
          {/* Ask Pastor Section */}
          <div className="relative">
            <AskPastorSection backgroundImage={shepherdImage} language={language} />
          </div>

          {/* Feelings & Scripture Section */}
          <div className="relative">
            <EmotionScriptureSection backgroundImage={handsImage} />
          </div>

          {/* Scripture Memory Helper Section */}
          <div className="relative">
            <ScriptureMemorySection backgroundImage={bibleMemoryImage} />
          </div>
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
              data-testid="link-website-footer-ask"
              aria-label={`${t.visitWebsite} - Opens in new window`}
            >
              {t.websiteDescription}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}