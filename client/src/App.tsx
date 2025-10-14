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
import ErrorBoundary from "./components/ErrorBoundary";
import NetworkStatus from "./components/NetworkStatus";

// Initialize auto-recovery services
import { silentLogger } from "./services/silentLogger";
import { performanceMonitor } from "./services/performanceMonitor";

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
import SavedVersesPage from "./pages/SavedVersesPage";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  birthMonth: string;
  birthDay: string;
  phone: string;
  appUserId?: string;
}

type AppPage = "home" | "ask" | "search" | "more" | "privacy" | "terms" | "support" | "donate" | "giving" | "videos" | "blog" | "settings" | "friends" | "biblestudies" | "bibletrivia" | "savedverses";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const [showImportFriends, setShowImportFriends] = useState(false);
  const [currentPage, setCurrentPage] = useState<AppPage>("home");
  const [streakDays, setStreakDays] = useState(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // App is English-only (per Apple guidelines - iOS Settings handles language)
  const language = "en";

  // Check if user is registered on first visit
  useEffect(() => {
    // Clean up legacy language preference (no longer used)
    localStorage.removeItem("gospelAppLanguage");
    
    const userData = localStorage.getItem("gospelAppUser");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      // Show registration modal for first-time users
      setShowRegistration(true);
    }
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

  const handleNavigateToLegal = (page: string, searchQuery?: string) => {
    const validPages = ["home", "privacy", "terms", "support", "donate", "giving", "videos", "blog", "settings", "friends", "biblestudies", "bibletrivia", "savedverses", "more", "search"];
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
        return <HomePage user={user || undefined} onNavigate={handleNavigateToLegal} onStreakUpdate={setStreakDays} language={language} />;
      case "ask":
        return <AskPage onNavigate={handleNavigateToLegal} streakDays={streakDays} language={language} />;
      case "search":
        return <SearchPage 
          onNavigate={handleNavigateToLegal} 
          streakDays={streakDays} 
          language={language}
          initialSearchQuery={searchQuery}
          onSearchUsed={() => setSearchQuery("")}
        />;
      case "more":
        return <MorePage language={language} onNavigate={handleNavigateToLegal} streakDays={streakDays} />;
      case "privacy":
        return <PrivacyPolicyPage onBack={handleBackFromLegal} language={language} />;
      case "terms":
        return <TermsOfServicePage onBack={handleBackFromLegal} language={language} />;
      case "support":
        return <SupportPage onBack={handleBackFromLegal} onNavigate={handleNavigateToLegal} language={language} />;
      case "donate":
        return <DonationPage onNavigate={handleNavigateToLegal} language={language} />;
      case "giving":
        return <GivingPage onNavigate={handleNavigateToLegal} streakDays={streakDays} language={language} />;
      case "videos":
        return <VideosPage onNavigate={handleNavigateToLegal} streakDays={streakDays} language={language} />;
      case "blog":
        return <BlogPage onNavigate={handleNavigateToLegal} streakDays={streakDays} language={language} />;
      case "settings":
        return <SettingsPage onNavigate={handleNavigateToLegal} streakDays={streakDays} user={user || undefined} language={language} />;
      case "friends":
        return <FriendsPage currentUserId={user?.appUserId || "demo-user-123"} language={language} onNavigate={handleNavigateToLegal} />;
      case "biblestudies":
        return <BibleStudiesPage currentUserId={user?.appUserId || "demo-user-123"} language={language} onNavigate={handleNavigateToLegal} />;
      case "bibletrivia":
        return <BibleTriviaPage onNavigate={handleNavigateToLegal} language={language} />;
      case "savedverses":
        return <SavedVersesPage onBack={handleBackFromLegal} language={language} />;
      default:
        return <HomePage user={user || undefined} onNavigate={handleNavigateToLegal} onStreakUpdate={setStreakDays} language={language} />;
    }
  };

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div className="min-h-screen bg-gray-50">
            {/* Network Status - Apple-compliant auto-recovery */}
            <NetworkStatus onRetry={() => window.location.reload()} />
            
            {/* Current Page Content */}
            <main className="min-h-screen bg-gray-50">
              {renderCurrentPage()}
            </main>

            {/* Bottom Navigation - Hide on legal pages and friends page */}
            {!["privacy", "terms", "support", "donate", "giving", "videos", "blog", "settings", "friends", "biblestudies", "bibletrivia", "savedverses"].includes(currentPage) && (
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
    </ErrorBoundary>
  );
}

export default App;