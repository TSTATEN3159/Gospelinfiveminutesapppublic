import AskPastorSection from "../components/AskPastorSection";
import EmotionScriptureSection from "../components/EmotionScriptureSection";
import shepherdImage from '@assets/generated_images/Peaceful_pastoral_shepherd_scene_d43b4770.png';
import handsImage from '@assets/generated_images/Caring_hands_emotional_support_20faad6c.png';
import { Facebook, Instagram } from "lucide-react";

export default function AskPage() {
  return (
    <div className="min-h-screen pb-20">
      {/* Header Section - Same style as HomePage */}
      <div className="bg-white px-4 py-6 border-b border-gray-100 ios-safe-top">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Ask the Pastor</h1>
          <p className="text-gray-600 mt-2">Get Scripture-based guidance and emotional support</p>
        </div>
        
        {/* Social Media Buttons */}
        <div className="flex justify-center gap-3 mb-3">
          <a 
            href="https://www.facebook.com/TheGospelIn5Minutes" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-full text-xs hover-elevate ios-tap-target"
            data-testid="button-facebook-ask"
            aria-label="Follow us on Facebook - Opens in new window"
          >
            <Facebook className="w-3 h-3" aria-hidden="true" />
            <span>Follow</span>
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
            <span>Follow</span>
          </a>
        </div>
        
        {/* App Title */}
        <div className="text-center">
          <h2 className="text-3xl font-bold" style={{ 
            fontFamily: 'Dancing Script, Brush Script MT, cursive',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
            color: '#8B4513'
          }} aria-label="The Gospel in 5 Minutes - Daily Bible verses and spiritual guidance">
            The Gospel in 5 Minutes™
          </h2>
        </div>
      </div>

      <div className="px-4 py-4 space-y-6 ios-safe-bottom">
        <div className="max-w-md mx-auto space-y-6">
          {/* Ask Pastor Section */}
          <div className="relative bg-card rounded-lg p-4 border shadow-sm">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-30 rounded-lg"
              style={{ backgroundImage: `url(${shepherdImage})` }}
            />
            <div className="relative z-10">
              <AskPastorSection backgroundImage={shepherdImage} />
            </div>
          </div>

          {/* Feelings & Scripture Section */}
          <div className="relative bg-card rounded-lg p-4 border shadow-sm">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-30 rounded-lg"
              style={{ backgroundImage: `url(${handsImage})` }}
            />
            <div className="relative z-10">
              <h2 className="text-lg font-semibold text-primary mb-4">Feelings & Scripture</h2>
              <EmotionScriptureSection backgroundImage={handsImage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}