import { useState, useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { queryClient } from "./lib/queryClient";

// Components
import GreetingHeader from "./components/GreetingHeader";
import UserRegistrationModal from "./components/UserRegistrationModal";
import SectionCard from "./components/SectionCard";
import DailyVerseCard from "./components/DailyVerseCard";
import EmotionScriptureSection from "./components/EmotionScriptureSection";
import AskPastorSection from "./components/AskPastorSection";
import BibleSearchSection from "./components/BibleSearchSection";

// Icons
import { BookOpen, Heart, MessageCircle, Search } from "lucide-react";

// Images
import sunriseImage from '@assets/generated_images/Peaceful_sunrise_daily_verse_e2a3184e.png';
import handsImage from '@assets/generated_images/Caring_hands_emotional_support_20faad6c.png';
import shepherdImage from '@assets/generated_images/Peaceful_pastoral_shepherd_scene_d43b4770.png';
import bibleImage from '@assets/generated_images/Open_Bible_study_scene_e3a19a6e.png';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  birthMonth: string;
  birthDay: string;
  phone: string;
}

type ModalType = "dailyVerse" | "emotions" | "askPastor" | "bibleSearch" | null;

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  // Check if user is registered on first visit
  useEffect(() => {
    const userData = localStorage.getItem("gospelAppUser");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      // Show registration modal for first-time users
      setShowRegistration(true);
    }
  }, []);

  const handleRegistrationComplete = (userData?: User) => {
    if (userData) {
      setUser(userData);
      localStorage.setItem("gospelAppUser", JSON.stringify(userData));
    }
    setShowRegistration(false);
  };

  // todo: remove mock functionality - replace with real Bible API
  const mockDailyVerse = {
    text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    reference: "Proverbs 3:5-6",
    chapter: "3",
    book: "Proverbs"
  };

  const sections = [
    {
      id: "dailyVerse" as const,
      title: "Daily Verse",
      description: "Discover today's inspiring Bible verse to guide your spiritual journey",
      icon: BookOpen,
      backgroundImage: sunriseImage,
      gradientFrom: "from-yellow-400",
      gradientTo: "to-orange-500"
    },
    {
      id: "emotions" as const,
      title: "Feelings & Scripture",
      description: "Find Bible verses that speak to your heart based on how you're feeling today",
      icon: Heart,
      backgroundImage: handsImage,
      gradientFrom: "from-green-400",
      gradientTo: "to-blue-500"
    },
    {
      id: "askPastor" as const,
      title: "Ask the Pastor",
      description: "Get Scripture-based answers to your Bible questions from our AI pastor",
      icon: MessageCircle,
      backgroundImage: shepherdImage,
      gradientFrom: "from-purple-400",
      gradientTo: "to-pink-500"
    },
    {
      id: "bibleSearch" as const,
      title: "Bible Search",
      description: "Search for any Bible verse by reference and explore different translations",
      icon: Search,
      backgroundImage: bibleImage,
      gradientFrom: "from-blue-400",
      gradientTo: "to-indigo-500"
    }
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-8 max-w-6xl">
            {/* Greeting Header */}
            <GreetingHeader user={user || undefined} />

            {/* Main Sections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sections.map((section) => (
                <SectionCard
                  key={section.id}
                  title={section.title}
                  description={section.description}
                  icon={section.icon}
                  backgroundImage={section.backgroundImage}
                  gradientFrom={section.gradientFrom}
                  gradientTo={section.gradientTo}
                  onClick={() => setActiveModal(section.id)}
                  testId={`card-${section.id}`}
                />
              ))}
            </div>

            {/* App Description */}
            <div className="mt-12 text-center">
              <h2 className="text-2xl font-bold text-primary mb-4">
                The Gospel in 5 Minutes
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Discover the transformative power of God's word in just a few minutes each day. 
                Whether you're seeking comfort, guidance, or simply want to grow in your faith, 
                find what your heart needs through Scripture.
              </p>
            </div>
          </div>

          {/* Registration Modal */}
          <UserRegistrationModal 
            isOpen={showRegistration} 
            onClose={handleRegistrationComplete} 
          />

          {/* Section Modals */}
          <Dialog open={activeModal === "dailyVerse"} onOpenChange={() => setActiveModal(null)}>
            <DialogContent className="max-w-2xl">
              <DailyVerseCard verse={mockDailyVerse} backgroundImage={sunriseImage} />
            </DialogContent>
          </Dialog>

          <Dialog open={activeModal === "emotions"} onOpenChange={() => setActiveModal(null)}>
            <DialogContent className="max-w-2xl">
              <EmotionScriptureSection backgroundImage={handsImage} />
            </DialogContent>
          </Dialog>

          <Dialog open={activeModal === "askPastor"} onOpenChange={() => setActiveModal(null)}>
            <DialogContent className="max-w-2xl max-h-[80vh]">
              <AskPastorSection backgroundImage={shepherdImage} />
            </DialogContent>
          </Dialog>

          <Dialog open={activeModal === "bibleSearch"} onOpenChange={() => setActiveModal(null)}>
            <DialogContent className="max-w-2xl">
              <BibleSearchSection backgroundImage={bibleImage} />
            </DialogContent>
          </Dialog>
        </div>

        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;