import { useState } from "react";
import GreetingHeader from "../components/GreetingHeader";
import DailyVerseCard from "../components/DailyVerseCard";
import StreakCounter from "../components/StreakCounter";
import BibleStudyPlans from "../components/BibleStudyPlans";
import LiveInstallCounter from "../components/LiveInstallCounter";
import BadgeNotification from "../components/BadgeNotification";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Images
import sunriseImage from '@assets/generated_images/Peaceful_sunrise_daily_verse_e2a3184e.png';

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

  return (
    <div className="min-h-screen pb-20">
      {/* Header Section */}
      <div className="bg-white px-4 py-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Today
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-sm text-gray-600">⚡12</div>
          </div>
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
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">
                  📖
                </div>
                <span className="text-sm font-medium text-gray-700">Daily Verse Experience</span>
              </div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">
                Today's Scripture 📝
              </h2>
            </div>
            <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
              <img 
                src={sunriseImage}
                alt="Daily verse"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Bible Study Section */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          <div className="relative h-40">
            <img 
              src={sunriseImage}
              alt="Bible study"
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
              <button className="text-blue-600 font-medium text-sm">
                Start Study
              </button>
              <button className="text-gray-400 text-sm">
                Dismiss
              </button>
            </div>
          </div>
        </div>

        {/* Streak Counter Section */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Daily Progress</h2>
          <StreakCounter onBadgeEarned={handleBadgeEarned} />
        </div>

        {/* Bible Study Plans */}
        <BibleStudyPlans />

        {/* Live Install Counter */}
        <LiveInstallCounter />
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