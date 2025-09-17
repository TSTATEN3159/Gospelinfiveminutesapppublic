import BibleSearchSection from "../components/BibleSearchSection";
import bibleImage from '@assets/generated_images/Open_Bible_study_scene_e3a19a6e.png';
import { Facebook, Instagram, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchPageProps {
  onNavigate?: (page: string) => void;
}

export default function SearchPage({ onNavigate }: SearchPageProps) {
  return (
    <div className="min-h-screen pb-20">
      {/* Header Section - Same style as HomePage */}
      <div className="bg-white px-4 py-6 border-b border-gray-100 ios-safe-top">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Bible Search</h1>
          <p className="text-gray-600 mt-2">Search for any Bible verse by reference</p>
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
            <span>Follow</span>
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
            <span>Follow</span>
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
      </div>

      <div className="px-4 py-4 ios-safe-bottom">
        <div className="max-w-md mx-auto space-y-6">
          <BibleSearchSection backgroundImage={bibleImage} />
          
          {/* Donation Appeal Section */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200 shadow-sm">
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-amber-600" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Help Spread God's Word
              </h3>
              <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                The Gospel in 5 Minutes™ is accepting donations to get the Holy Bible to more people around the world. Your support helps us reach souls in need of spiritual guidance.
              </p>
              <Button 
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full font-medium shadow-sm"
                data-testid="button-donate-appeal"
                aria-label="Donate to help spread the Gospel worldwide"
                onClick={() => onNavigate?.('donate')}
              >
                <Heart className="w-4 h-4 mr-2" aria-hidden="true" />
                Make a Donation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}