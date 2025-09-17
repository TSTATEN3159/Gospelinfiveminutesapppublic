import { useState, useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { queryClient } from "./lib/queryClient";

// Components
import UserRegistrationModal from "./components/UserRegistrationModal";
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

interface User {
  firstName: string;
  lastName: string;
  email: string;
  birthMonth: string;
  birthDay: string;
  phone: string;
}

type NavPage = "home" | "ask" | "search" | "more" | "privacy" | "terms" | "support";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const [currentPage, setCurrentPage] = useState<NavPage>("home");
  const [language, setLanguage] = useState("en");

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

  const handleRegistrationComplete = (userData?: User) => {
    if (userData) {
      setUser(userData);
      localStorage.setItem("gospelAppUser", JSON.stringify(userData));
    }
    setShowRegistration(false);
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    localStorage.setItem("gospelAppLanguage", newLanguage);
    // todo: implement actual language translations
    console.log("Language changed to:", newLanguage);
  };

  const handleNavigateToLegal = (page: string) => {
    setCurrentPage(page as NavPage);
  };

  const handleBackFromLegal = () => {
    setCurrentPage("more");
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage user={user || undefined} />;
      case "ask":
        return <AskPage />;
      case "search":
        return <SearchPage />;
      case "more":
        return <MorePage language={language} onLanguageChange={handleLanguageChange} onNavigate={handleNavigateToLegal} />;
      case "privacy":
        return <PrivacyPolicyPage onBack={handleBackFromLegal} />;
      case "terms":
        return <TermsOfServicePage onBack={handleBackFromLegal} />;
      case "support":
        return <SupportPage onBack={handleBackFromLegal} />;
      default:
        return <HomePage user={user || undefined} />;
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

          {/* Bottom Navigation - Hide on legal pages */}
          {!["privacy", "terms", "support"].includes(currentPage) && (
            <BottomNavigation 
              currentPage={currentPage} 
              onPageChange={setCurrentPage} 
            />
          )}

          {/* Registration Modal */}
          <UserRegistrationModal 
            isOpen={showRegistration} 
            onClose={handleRegistrationComplete} 
          />
        </div>

        <Toaster />
        <OfflineIndicator />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;