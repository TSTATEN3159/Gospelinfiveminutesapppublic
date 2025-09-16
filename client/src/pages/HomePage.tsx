import { useState } from "react";
import GreetingHeader from "../components/GreetingHeader";
import DailyVerseCard from "../components/DailyVerseCard";
import AskPastorSection from "../components/AskPastorSection";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Images
import sunriseImage from '@assets/generated_images/Peaceful_sunrise_daily_verse_e2a3184e.png';
import shepherdImage from '@assets/generated_images/Peaceful_pastoral_shepherd_scene_d43b4770.png';

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
  const [showPastorModal, setShowPastorModal] = useState(false);

  // todo: remove mock functionality - replace with real Bible API
  const mockDailyVerse = {
    text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    reference: "Proverbs 3:5-6",
    chapter: "3",
    book: "Proverbs"
  };

  return (
    <div className="pb-20 px-4 py-6">
      {/* App Title */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-primary" style={{ fontFamily: 'var(--font-cursive)' }}>
          The Gospel in 5 Minutes
        </h1>
        <p className="text-muted-foreground mt-2">Daily spiritual nourishment for your soul</p>
      </div>

      {/* Greeting */}
      <GreetingHeader user={user} />

      {/* Main Content Grid */}
      <div className="space-y-4 max-w-md mx-auto">
        {/* Daily Verse Card */}
        <div 
          className="relative bg-card rounded-lg p-4 border shadow-sm cursor-pointer hover-elevate"
          onClick={() => setShowVerseModal(true)}
          data-testid="card-dailyVerse"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30 rounded-lg"
            style={{ backgroundImage: `url(${sunriseImage})` }}
          />
          <div className="relative z-10">
            <h2 className="text-lg font-semibold text-primary mb-2">Today's Verse</h2>
            <p className="text-sm text-muted-foreground italic">
              "{mockDailyVerse.text.substring(0, 80)}..."
            </p>
            <p className="text-xs text-primary mt-2 font-medium">- {mockDailyVerse.reference}</p>
          </div>
        </div>

        {/* Ask Pastor Card */}
        <div 
          className="relative bg-card rounded-lg p-4 border shadow-sm cursor-pointer hover-elevate"
          onClick={() => setShowPastorModal(true)}
          data-testid="card-askPastor"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30 rounded-lg"
            style={{ backgroundImage: `url(${shepherdImage})` }}
          />
          <div className="relative z-10">
            <h2 className="text-lg font-semibold text-primary mb-2">Ask the Pastor</h2>
            <p className="text-sm text-muted-foreground">
              Get Scripture-based answers to your Bible questions
            </p>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Dialog open={showVerseModal} onOpenChange={setShowVerseModal}>
        <DialogContent className="max-w-md">
          <DailyVerseCard verse={mockDailyVerse} backgroundImage={sunriseImage} />
        </DialogContent>
      </Dialog>

      <Dialog open={showPastorModal} onOpenChange={setShowPastorModal}>
        <DialogContent className="max-w-md max-h-[80vh]">
          <AskPastorSection backgroundImage={shepherdImage} />
        </DialogContent>
      </Dialog>
    </div>
  );
}