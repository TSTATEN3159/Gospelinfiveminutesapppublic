import { useState } from "react";
import GreetingHeader from "../components/GreetingHeader";
import DailyVerseCard from "../components/DailyVerseCard";
import StreakCounter from "../components/StreakCounter";
import BibleStudyPlans from "../components/BibleStudyPlans";
import LiveInstallCounter from "../components/LiveInstallCounter";
import BadgeNotification from "../components/BadgeNotification";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Book, FileText, Cross, Infinity, Facebook } from "lucide-react";

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
}

export default function HomePage({ user }: HomePageProps) {
  const [showVerseModal, setShowVerseModal] = useState(false);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [badgeData, setBadgeData] = useState({ type: "", days: 0 });
  const [streakDays, setStreakDays] = useState(0);

  // todo: remove mock functionality - replace with real Bible API
  const mockDailyVerse = {
    text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    reference: "Proverbs 3:5-6",
    chapter: "3",
    book: "Proverbs"
  };

  const handleBadgeEarned = (badgeType: string, streakDays: number) => {
    setBadgeData({ type: badgeType, days: streakDays });
    setShowBadgeModal(true);
  };

  const handleStreakUpdate = (days: number) => {
    setStreakDays(days);
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header Section */}
      <div className="bg-white px-4 py-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome!
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Infinity className="w-4 h-4" />
              <span>{streakDays}</span>
            </div>
          </div>
        </div>
        
        {/* Small Facebook Button */}
        <div className="flex justify-start mb-3">
          <a 
            href="https://www.facebook.com/TheGospelIn5Minutes" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-full text-xs hover-elevate"
            data-testid="button-facebook-small"
          >
            <Facebook className="w-3 h-3" />
            <span>Follow</span>
          </a>
        </div>
        
        {/* App Title */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800" style={{ 
            fontFamily: 'Dancing Script, Brush Script MT, cursive',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
          }}>
            The Gospel in 5 Minutes
          </h2>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Daily Verse Card with Image */}
        <div 
          className="bg-white rounded-2xl overflow-hidden shadow-sm cursor-pointer hover-elevate"
          onClick={() => setShowVerseModal(true)}
          data-testid="card-dailyVerse"
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
              <p className="text-sm text-gray-700 mb-1 line-clamp-2">
                "{mockDailyVerse.text}"
              </p>
              <p className="text-xs text-gray-500 font-medium">
                {mockDailyVerse.reference}
              </p>
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
              <Button variant="ghost" size="sm" className="text-blue-600 p-0 h-auto" data-testid="button-startStudy">
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
              <h2 className="text-lg font-bold text-gray-900" data-testid="text-sectionTitle-askPastor">Ask the Pastor</h2>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              Get Biblical guidance and spiritual counsel for your questions.
            </p>
            <Button className="w-full bg-blue-600" data-testid="button-askPastor">
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
      </div>

      {/* Modals */}
      <Dialog open={showVerseModal} onOpenChange={setShowVerseModal}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DailyVerseCard verse={mockDailyVerse} backgroundImage={sunriseImage} />
        </DialogContent>
      </Dialog>

      <BadgeNotification 
        isOpen={showBadgeModal}
        onClose={() => setShowBadgeModal(false)}
        badgeType={badgeData.type}
        streakDays={badgeData.days}
      />
    </div>
  );
}