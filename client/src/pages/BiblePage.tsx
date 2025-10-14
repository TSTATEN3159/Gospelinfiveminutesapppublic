import AskPastorSection from "../components/AskPastorSection";
import EmotionScriptureSection from "../components/EmotionScriptureSection";
import ScriptureMemorySection from "../components/ScriptureMemorySection";
import AppLogo from "../components/AppLogo";
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
      {/* Professional Marketing Header */}
      <div className="bg-gradient-to-b from-white via-gray-50/30 to-white px-4 py-6 border-b border-gray-200 ios-safe-top">
        {/* Professional Logo - Top Center */}
        <AppLogo onNavigate={onNavigate} size="medium" className="mb-3" />
        
        {/* Centered Professional Description */}
        <div className="text-center mb-4">
          <h1 className="text-base font-bold text-amber-900 max-w-md mx-auto" style={{ 
            fontFamily: 'Dancing Script, Brush Script MT, cursive'
          }}>
            {t.askPageDescription}
          </h1>
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
          }} aria-label={`${t.appTitle} - ${t.askPageDescription}`}>
            {t.appTitle}
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
            data-testid="button-facebook-ask"
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
            data-testid="button-instagram-ask"
            aria-label="Follow us on Instagram - Opens in new window"
          >
            <Instagram className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t.follow}</span>
          </a>
          
          {/* Donate Button (Hidden on iOS for App Store compliance) */}
          {!isIOS && (
            <Button 
              className="flex items-center gap-1 bg-amber-600 hover:bg-amber-700 text-white px-2.5 py-1.5 rounded-md text-xs font-medium shadow-sm hover:shadow-md transition-all"
              data-testid="button-donate-ask"
              aria-label={t.donateDesc}
              onClick={() => onNavigate?.('donate')}
            >
              <Heart className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.donate}</span>
            </Button>
          )}
          
          {/* Share Button - Professional Green */}
          <Button 
            className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1.5 rounded-md text-xs font-medium shadow-sm hover:shadow-md transition-all"
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
            <Share className="w-3.5 h-3.5" aria-hidden="true" />
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