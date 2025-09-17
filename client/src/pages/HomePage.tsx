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
    <div className="min-h-screen pb-20 px-4 py-6">
      {/* App Title */}
      <div className="text-center mb-6">
        <h1 
          className="text-4xl font-bold" 
          style={{ 
            fontFamily: 'var(--font-cursive)', 
            color: 'hsl(25, 45%, 35%)' 
          }}
        >
          The Gospel in 5 Minutes
        </h1>
        <p className="mt-2" style={{ color: 'hsl(25, 20%, 50%)' }}>
          Daily spiritual nourishment for your soul
        </p>
      </div>

      <div className="max-w-md mx-auto space-y-6">
        {/* Streak Counter */}
        <StreakCounter onBadgeEarned={handleBadgeEarned} />

        {/* Greeting */}
        <GreetingHeader user={user} />

        {/* Daily Verse Card */}
        <div 
          className="relative rounded-lg p-4 border shadow-sm cursor-pointer hover-elevate"
          onClick={() => setShowVerseModal(true)}
          data-testid="card-dailyVerse"
          style={{ 
            backgroundColor: 'hsl(30, 25%, 92%)', 
            borderColor: 'hsl(30, 20%, 85%)' 
          }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30 rounded-lg"
            style={{ backgroundImage: `url(${sunriseImage})` }}
          />
          <div className="relative z-10">
            <h2 className="text-lg font-semibold mb-2" style={{ color: 'hsl(25, 45%, 35%)' }}>
              Today's Verse
            </h2>
            <p className="text-sm italic" style={{ color: 'hsl(25, 20%, 50%)' }}>
              "{mockDailyVerse.text.substring(0, 80)}..."
            </p>
            <p className="text-xs mt-2 font-medium" style={{ color: 'hsl(25, 45%, 35%)' }}>
              - {mockDailyVerse.reference}
            </p>
          </div>
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