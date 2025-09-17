import { useState } from "react";
import GreetingHeader from "../components/GreetingHeader";
import DailyVerseCard from "../components/DailyVerseCard";
import StreakCounter from "../components/StreakCounter";
import BibleStudyPlans from "../components/BibleStudyPlans";
import LiveInstallCounter from "../components/LiveInstallCounter";
import BadgeNotification from "../components/BadgeNotification";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Book, FileText, Cross, Activity } from "lucide-react";

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
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-white mr-2">
                  <Book className="w-3 h-3" />
                </div>
                <span className="text-sm font-medium text-gray-700">Daily Verse Experience</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-bold text-gray-900">
                  Today's Scripture
                </h2>
                <FileText className="w-4 h-4 text-gray-600" />
              </div>
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
              <Button variant="ghost" size="sm" className="text-blue-600 p-0 h-auto" data-testid="button-startStudy">
                Start Study
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 p-0 h-auto" data-testid="button-dismissStudy">
                Dismiss
              </Button>
            </div>
          </div>
        </div>

        {/* Streak Counter Section */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-5 h-5 text-gray-700" />
            <h2 className="text-lg font-bold text-gray-900" data-testid="text-sectionTitle-dailyProgress">Daily Progress</h2>
          </div>
          <StreakCounter onBadgeEarned={handleBadgeEarned} />
        </div>

        {/* Ask Pastor Section */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
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

        {/* Live Install Counter - Compact */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="text-center">
            <LiveInstallCounter />
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