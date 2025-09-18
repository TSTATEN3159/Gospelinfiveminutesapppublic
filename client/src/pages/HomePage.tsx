import { useState, useEffect } from "react";
import GreetingHeader from "../components/GreetingHeader";
import DailyVerseCard from "../components/DailyVerseCard";
import StreakCounter from "../components/StreakCounter";
import BibleStudyPlans from "../components/BibleStudyPlans";
import AskPastor from "../components/AskPastor";
import LiveInstallCounter from "../components/LiveInstallCounter";
import BadgeNotification from "../components/BadgeNotification";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Book, FileText, Cross, Flame, Facebook, Instagram, Loader2, AlertCircle, Heart } from "lucide-react";

// Services
import { bibleService, type DailyVerse } from "../services/bibleService";

// Images
import sunriseImage from '@assets/generated_images/Peaceful_sunrise_daily_verse_e2a3184e.png';
import mountainLakeImage from '@assets/generated_images/Mountain_lake_sunrise_scripture_98ce5cc4.png';
import forestPathImage from '@assets/generated_images/Forest_path_study_plans_fab1c678.png';
import oceanCliffImage from '@assets/generated_images/Ocean_cliff_pastor_counseling_10177ffd.png';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  birthMonth: string;
  birthDay: string;
  phone: string;
}

interface HomePageProps {
  user?: User;
  onNavigate?: (page: string) => void;
  onStreakUpdate?: (days: number) => void;
}

export default function HomePage({ user, onNavigate, onStreakUpdate }: HomePageProps) {
  const [showVerseModal, setShowVerseModal] = useState(false);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [showStudyPlans, setShowStudyPlans] = useState(false);
  const [showAskPastor, setShowAskPastor] = useState(false);
  const [badgeData, setBadgeData] = useState({ type: "", days: 0 });
  const [streakDays, setStreakDays] = useState(0);
  const [dailyVerse, setDailyVerse] = useState<DailyVerse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load daily verse from Bible API
  useEffect(() => {
    const loadDailyVerse = async () => {
      try {
        setLoading(true);
        setError(null);
        const verse = await bibleService.getDailyVerse();
        setDailyVerse(verse);
      } catch (err) {
        setError('Unable to load today\'s verse. Please check your connection.');
        console.error('Failed to load daily verse:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDailyVerse();
  }, []);

  const handleBadgeEarned = (badgeType: string, streakDays: number) => {
    setBadgeData({ type: badgeType, days: streakDays });
    setShowBadgeModal(true);
  };

  const handleStreakUpdate = (days: number) => {
    setStreakDays(days);
    onStreakUpdate?.(days);
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header Section */}
      <div className="bg-white px-4 py-6 border-b border-gray-100 ios-safe-top">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold" style={{ 
              color: '#8B4513',
              fontFamily: 'Dancing Script, Brush Script MT, cursive',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
            }} aria-label="Welcome to The Gospel in 5 Minutes">
              Welcome!
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center gap-1">
              <Flame className="w-6 h-6 text-red-600 fill-red-600" />
              <span className="text-lg font-bold text-red-600">{streakDays}</span>
            </div>
          </div>
        </div>
        
        {/* Social Media Buttons and Donate Button - Same line */}
        <div className="flex justify-center items-center gap-3 mb-3">
          <a 
            href="https://www.facebook.com/TheGospelIn5Minutes" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-full text-xs hover-elevate ios-tap-target"
            data-testid="button-facebook-small"
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
            data-testid="button-instagram-small"
            aria-label="Follow us on Instagram - Opens in new window"
          >
            <Instagram className="w-3 h-3" aria-hidden="true" />
            <span>Follow</span>
          </a>
          <Button 
            className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm"
            data-testid="button-donate-home"
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

      <div className="px-4 py-4 space-y-4 ios-safe-bottom">
        {/* Daily Verse Card with Image */}
        <div 
          className="bg-white rounded-2xl overflow-hidden shadow-sm cursor-pointer hover-elevate"
          onClick={() => setShowVerseModal(true)}
          data-testid="card-dailyVerse"
          role="button"
          tabIndex={0}
          aria-label="Today's Scripture - Click to view full verse with meaning and application"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setShowVerseModal(true);
            }
          }}
        >
          <div className="flex items-center p-4">
            <div className="flex-1 pr-4">
              <div className="flex items-center mb-2">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-white mr-2">
                  <Book className="w-3 h-3" />
                </div>
                <span className="text-sm font-medium text-gray-700">Daily Verse Experience</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-lg font-bold text-gray-900">
                  Today's Scripture
                </h2>
                <FileText className="w-4 h-4 text-gray-600" />
              </div>
              {loading ? (
                <div className="flex items-center gap-2 text-gray-500">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Loading today's verse...</span>
                </div>
              ) : error ? (
                <div className="flex items-center gap-2 text-red-500">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">Unable to load verse</span>
                </div>
              ) : dailyVerse ? (
                <>
                  <p className="text-sm text-gray-700 mb-1 line-clamp-2">
                    "{dailyVerse.text}"
                  </p>
                  <p className="text-xs text-gray-500 font-medium">
                    {dailyVerse.reference}
                  </p>
                </>
              ) : null}
            </div>
            <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
              <img 
                src={mountainLakeImage}
                alt="Today's Scripture"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Bible Study Section */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          <div className="relative h-40">
            <img 
              src={forestPathImage}
              alt="3-Day Study Plans"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
          <div className="p-4">
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              3-Day Study Plans
            </h2>
            <p className="text-gray-600 text-sm mb-3">
              Deepen your faith with guided Biblical studies and reflection.
            </p>
            <div className="flex justify-between items-center">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-blue-600 p-0 h-auto" 
                onClick={() => setShowStudyPlans(true)}
                data-testid="button-startStudy"
              >
                Start Study
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 p-0 h-auto" data-testid="button-dismissStudy">
                Dismiss
              </Button>
            </div>
          </div>
        </div>


        {/* Ask Pastor Section */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          <div className="relative h-40">
            <img 
              src={oceanCliffImage}
              alt="Ask the Pastor"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
          <div className="p-4">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <Cross className="w-4 h-4 text-blue-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-900" data-testid="text-sectionTitle-askPastor">Ask the AI Pastor</h2>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              Get AI-powered biblical guidance and spiritual counsel based on Scripture.
            </p>
            <Button 
              className="w-full bg-blue-600" 
              onClick={() => setShowAskPastor(true)}
              data-testid="button-askPastor"
            >
              Ask a Question
            </Button>
          </div>
        </div>

        {/* Streak Counter Section (Hidden - Just for Logic) */}
        <div className="hidden">
          <StreakCounter onBadgeEarned={handleBadgeEarned} onStreakUpdate={handleStreakUpdate} />
        </div>

        {/* Facebook & Live Counter Section */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex flex-col items-center space-y-4">
            <div className="text-center">
              <LiveInstallCounter />
            </div>
            <a 
              href="https://www.facebook.com/TheGospelIn5Minutes" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full hover-elevate transition-all duration-200"
              data-testid="button-facebook"
            >
              <Facebook className="w-5 h-5" />
              <span className="font-medium">Follow on Facebook</span>
            </a>
          </div>
        </div>
        
        {/* Professional Website Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">Visit our website for more resources</p>
            <a 
              href="https://www.thegospelin5minutes.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200"
              data-testid="link-website-footer"
              aria-label="Visit The Gospel in 5 Minutes website - Opens in new window"
            >
              www.thegospelin5minutes.org
            </a>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Dialog open={showVerseModal} onOpenChange={setShowVerseModal}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          {dailyVerse && !loading ? (
            <DailyVerseCard verse={dailyVerse} backgroundImage={sunriseImage} />
          ) : (
            <div className="p-6 text-center">
              {loading ? (
                <div className="flex items-center gap-2 text-gray-500">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Loading verse...</span>
                </div>
              ) : error ? (
                <div className="flex items-center gap-2 text-red-500">
                  <AlertCircle className="w-4 h-4" />
                  <span>Unable to load verse</span>
                </div>
              ) : (
                <p className="text-gray-500">Loading verse...</p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <BadgeNotification 
        isOpen={showBadgeModal}
        onClose={() => setShowBadgeModal(false)}
        badgeType={badgeData.type}
        streakDays={badgeData.days}
      />

      {/* Bible Study Plans Modal */}
      <Dialog open={showStudyPlans} onOpenChange={setShowStudyPlans}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto p-0">
          <div className="p-6">
            <BibleStudyPlans />
          </div>
        </DialogContent>
      </Dialog>

      {/* Ask Pastor Modal */}
      <Dialog open={showAskPastor} onOpenChange={setShowAskPastor}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden p-0">
          <div className="p-6 h-full">
            <AskPastor onClose={() => setShowAskPastor(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}