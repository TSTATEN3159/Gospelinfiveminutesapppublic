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
      {/* Header Section - Same style as HomePage */}
      <div className="bg-white px-4 py-6 border-b border-gray-100 ios-safe-top">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-lg mt-2" style={{ 
              fontFamily: 'Dancing Script, Brush Script MT, cursive',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
              color: '#8B4513'
            }}>{t.askPageDescription}</p>
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
          }} aria-label={`${t.appTitle} - ${t.askPageDescription}`}>
            {t.appTitle}
          </h2>
        </div>
        
        {/* Social Media Buttons and Donate Button - Same line */}
        <div className="flex justify-center items-center gap-3 mb-3">
          <a 
            href="https://www.facebook.com/TheGospelIn5Minutes" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-full text-xs hover-elevate ios-tap-target"
            data-testid="button-facebook-ask"
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
            data-testid="button-instagram-ask"
            aria-label="Follow us on Instagram - Opens in new window"
          >
            <Instagram className="w-3 h-3" aria-hidden="true" />
            <span>{t.follow}</span>
          </a>
          {/* Donate Button (Hidden on iOS for App Store compliance) */}
          {!isIOS && (
            <Button 
              className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm"
              data-testid="button-donate-ask"
              aria-label={t.donateDesc}
              onClick={() => onNavigate?.('donate')}
            >
              <Heart className="w-3 h-3 mr-1" aria-hidden="true" />
              {t.donate}
            </Button>
          )}
        </div>
        
        {/* Share Button */}
        <div className="flex justify-center mt-3">
          <Button 
            className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-1 rounded-full text-xs font-medium shadow-sm"
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
            <Share className="w-3 h-3 mr-1" aria-hidden="true" />
            {t.share}
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