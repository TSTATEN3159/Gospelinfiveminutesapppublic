import { useState, useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { queryClient } from "./lib/queryClient";

// Components
import UserRegistrationModal from "./components/UserRegistrationModal";
import ImportFriendsDialog from "./components/ImportFriendsDialog";
import BottomNavigation from "./components/BottomNavigation";
import OfflineIndicator from "./components/OfflineIndicator";

// Pages
import HomePage from "./pages/HomePage";
import AskPage from "./pages/BiblePage";
import SearchPage from "./pages/SearchPage";
import MorePage from "./pages/MorePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import SupportPage from "./pages/SupportPage";
import DonationPage from "./pages/DonationPage";
import GivingPage from "./pages/GivingPage";
import VideosPage from "./pages/VideosPage";
import BlogPage from "./pages/BlogPage";
import SettingsPage from "./pages/SettingsPage";
import FriendsPage from "./pages/FriendsPage";
import BibleStudiesPage from "./pages/BibleStudiesPage";
import BibleTriviaPage from "./pages/BibleTriviaPage";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  birthMonth: string;
  birthDay: string;
  phone: string;
  appUserId?: string;
}

type AppPage = "home" | "ask" | "search" | "more" | "privacy" | "terms" | "support" | "donate" | "giving" | "videos" | "blog" | "settings" | "friends" | "biblestudies" | "bibletrivia";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const [showImportFriends, setShowImportFriends] = useState(false);
  const [currentPage, setCurrentPage] = useState<AppPage>("home");
  const [language, setLanguage] = useState("en");
  const [streakDays, setStreakDays] = useState(0);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Check if user is registered on first visit and detect language
  useEffect(() => {
    const userData = localStorage.getItem("gospelAppUser");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      // Show registration modal for first-time users
      setShowRegistration(true);
    }

    // Detect user language based on browser/location
    const detectLanguage = () => {
      const savedLanguage = localStorage.getItem("gospelAppLanguage");
      if (savedLanguage) {
        setLanguage(savedLanguage);
      } else {
        // Use browser language detection
        const browserLang = navigator.language.split("-")[0];
        const supportedLanguages = ["en", "es", "fr", "pt", "zh", "ar", "hi"];
        const detectedLang = supportedLanguages.includes(browserLang) ? browserLang : "en";
        setLanguage(detectedLang);
        localStorage.setItem("gospelAppLanguage", detectedLang);
      }
    };

    detectLanguage();
  }, []);

  const handleRegistrationComplete = async (userData?: User) => {
    if (userData) {
      try {
        // Create app_users entry in the database
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
        
        const result = await response.json();
        console.log("User creation result:", result);
        
        if (result.success) {
          // Add the appUserId to the userData
          const userWithId = { ...userData, appUserId: result.user.id };
          setUser(userWithId);
          localStorage.setItem("gospelAppUser", JSON.stringify(userWithId));
          // Show friend import dialog after successful registration
          setShowImportFriends(true);
        } else {
          console.error("Failed to create app user:", result.error);
          // Still save locally but without appUserId
          setUser(userData);
          localStorage.setItem("gospelAppUser", JSON.stringify(userData));
        }
      } catch (error) {
        console.error("Error creating app user:", error);
        // Still save locally but without appUserId
        setUser(userData);
        localStorage.setItem("gospelAppUser", JSON.stringify(userData));
      }
    }
    setShowRegistration(false);
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    localStorage.setItem("gospelAppLanguage", newLanguage);
    console.log("Language changed to:", newLanguage);
  };

  const handleNavigateToLegal = (page: string, searchQuery?: string) => {
    const validPages = ["home", "privacy", "terms", "support", "donate", "giving", "videos", "blog", "settings", "friends", "biblestudies", "bibletrivia", "more", "search"];
    if (validPages.includes(page)) {
      setCurrentPage(page as AppPage);
      if (searchQuery) {
        setSearchQuery(searchQuery);
      }
    }
  };

  const handleBackFromLegal = () => {
    setCurrentPage("more");
  };

  const handleImportFriendsClose = () => {
    setShowImportFriends(false);
  };

  const handleNavigateToFriends = () => {
    setShowImportFriends(false);
    setCurrentPage("friends");
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage user={user || undefined} onNavigate={handleNavigateToLegal} onStreakUpdate={setStreakDays} />;
      case "ask":
        return <AskPage onNavigate={handleNavigateToLegal} streakDays={streakDays} />;
      case "search":
        return <SearchPage 
          onNavigate={handleNavigateToLegal} 
          streakDays={streakDays} 
          language={language}
          initialSearchQuery={searchQuery}
          onSearchUsed={() => setSearchQuery("")}
        />;
      case "more":
        return <MorePage language={language} onLanguageChange={handleLanguageChange} onNavigate={handleNavigateToLegal} streakDays={streakDays} />;
      case "privacy":
        return <PrivacyPolicyPage onBack={handleBackFromLegal} />;
      case "terms":
        return <TermsOfServicePage onBack={handleBackFromLegal} />;
      case "support":
        return <SupportPage onBack={handleBackFromLegal} />;
      case "donate":
        return <DonationPage onNavigate={handleNavigateToLegal} />;
      case "giving":
        return <GivingPage onNavigate={handleNavigateToLegal} streakDays={streakDays} />;
      case "videos":
        return <VideosPage onNavigate={handleNavigateToLegal} streakDays={streakDays} />;
      case "blog":
        return <BlogPage onNavigate={handleNavigateToLegal} streakDays={streakDays} />;
      case "settings":
        return <SettingsPage onNavigate={handleNavigateToLegal} streakDays={streakDays} user={user || undefined} />;
      case "friends":
        return <FriendsPage currentUserId={user?.appUserId || "demo-user-123"} language={language} onNavigate={handleNavigateToLegal} />;
      case "biblestudies":
        return <BibleStudiesPage currentUserId={user?.appUserId || "demo-user-123"} language={language} onNavigate={handleNavigateToLegal} />;
      case "bibletrivia":
        return <BibleTriviaPage onNavigate={handleNavigateToLegal} />;
      default:
        return <HomePage user={user || undefined} onNavigate={handleNavigateToLegal} onStreakUpdate={setStreakDays} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-gray-50">
          {/* Current Page Content */}
          <main className="min-h-screen bg-gray-50">
            {renderCurrentPage()}
          </main>

          {/* Bottom Navigation - Hide on legal pages and friends page */}
          {!["privacy", "terms", "support", "donate", "giving", "videos", "blog", "settings", "friends", "biblestudies", "bibletrivia"].includes(currentPage) && (
            <BottomNavigation 
              currentPage={currentPage as "home" | "ask" | "search" | "more"} 
              onPageChange={(page) => setCurrentPage(page as AppPage)} 
            />
          )}

          {/* Registration Modal */}
          <UserRegistrationModal 
            isOpen={showRegistration} 
            onClose={handleRegistrationComplete} 
          />

          {/* Import Friends Dialog */}
          {user?.appUserId && (
            <ImportFriendsDialog 
              isOpen={showImportFriends}
              onClose={handleImportFriendsClose}
              appUserId={user.appUserId}
              onNavigateToFriends={handleNavigateToFriends}
            />
          )}
        </div>

        <Toaster />
        <OfflineIndicator />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;