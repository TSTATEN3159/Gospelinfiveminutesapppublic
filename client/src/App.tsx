import { useState, useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { queryClient } from "./lib/queryClient";
import { App as CapacitorApp } from '@capacitor/app';
import * as LiveUpdates from '@capacitor/live-updates';

// Components
import UserRegistrationModal from "./components/UserRegistrationModal";
import ImportFriendsDialog from "./components/ImportFriendsDialog";
import BottomNavigation from "./components/BottomNavigation";
import OfflineIndicator from "./components/OfflineIndicator";
import ErrorBoundary from "./components/ErrorBoundary";
import NetworkStatus from "./components/NetworkStatus";
import { ThemeProvider } from "./components/ThemeProvider";
import { GlobalErrorBanner } from "./components/GlobalErrorBanner";
import { VoiceSettingsProvider } from "./context/VoiceSettingsContext";

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
import VideosPage from "./pages/VideosPage";
import BlogPage from "./pages/BlogPage";
import SettingsPage from "./pages/SettingsPage";
import FriendsPage from "./pages/FriendsPage";
import BibleStudiesPage from "./pages/BibleStudiesPage";
import BibleTriviaPage from "./pages/BibleTriviaPage";
import SavedVersesPage from "./pages/SavedVersesPage";
import BookmarksPage from "./pages/BookmarksPage";
import GlassDemoPage from "./pages/GlassDemoPage";
import DailyDevotionsPage from "./pages/DailyDevotionsPage";
import DailyPage from "./pages/DailyPage";
import ReadingPlansPage from "./pages/ReadingPlansPage";
import ReadingPlanDetailPage from "./pages/ReadingPlanDetailPage";
import ScreenshotToolPage from "./pages/ScreenshotToolPage";
import PlainMeaningPage from "./pages/PlainMeaningPage";
import InstantApplicationPage from "./pages/InstantApplicationPage";
import VoiceSettingsPage from "./pages/VoiceSettingsPage";
import TopicSearchPage from "./pages/TopicSearchPage";
import ScriptureImagePage from "./pages/ScriptureImagePage";
import DiscipleshipListPage from "./pages/DiscipleshipListPage";
import DiscipleshipPlanDetailPage from "./pages/DiscipleshipPlanDetailPage";
import DiscipleshipReadingPage from "./pages/DiscipleshipReadingPage";
import UnsubscribePage from "./pages/UnsubscribePage";
import AbideSessionPage from "./pages/AbideSessionPage";
import { BibleVersionCode } from "./config/bibleVersions";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  birthMonth: string;
  birthDay: string;
  phone?: string;
  appUserId?: string;
}

type AppPage = "home" | "search" | "daily" | "more" | "privacy" | "terms" | "support" | "videos" | "blog" | "settings" | "friends" | "biblestudies" | "bibletrivia" | "savedverses" | "bookmarks" | "glassdemo" | "devotionals" | "reading-plans" | "reading-plan-detail" | "screenshot-tool" | "plain-meaning" | "instant-application" | "voice-settings" | "topic-search" | "image-scripture" | "discipleship-list" | "discipleship-plan" | "discipleship-reading" | "unsubscribe" | "abide";

// Type-safe navigation params for each page
type AppPageParams = {
  search?: { query?: string };
  "image-scripture"?: { reference?: string; text?: string; version?: BibleVersionCode };
  "discipleship-plan"?: { planId: string };
  "discipleship-reading"?: { planId: string; dayNumber: number };
};

// Type-safe navigation function signature
export type AppNavigate = <P extends AppPage>(
  page: P,
  ...args: P extends keyof AppPageParams 
    ? AppPageParams[P] extends undefined 
      ? [params?: undefined]
      : [params: AppPageParams[P]]
    : [params?: undefined]
) => void;

function MainApp() {
  const [user, setUser] = useState<User | null>(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const [showImportFriends, setShowImportFriends] = useState(false);
  const [currentPage, setCurrentPage] = useState<AppPage>("home");
  const [streakDays, setStreakDays] = useState(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [pageParams, setPageParams] = useState<Partial<AppPageParams>>({});
  
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

    // Check for hash-based routing (e.g., /#glassdemo)
    const hash = window.location.hash.slice(1);
    if (hash && ["glassdemo"].includes(hash)) {
      setCurrentPage(hash as AppPage);
    }

    // Listen for custom navigation events from self-contained components
    const handleCustomNavigate = (e: CustomEvent<{ page: string; params?: any }>) => {
      const { page, params } = e.detail;
      const validPages = ["home", "abide", "privacy", "terms", "support", "videos", "blog", "settings", "friends", "biblestudies", "bibletrivia", "savedverses", "bookmarks", "glassdemo", "devotionals", "daily", "reading-plans", "reading-plan-detail", "more", "search", "plain-meaning", "instant-application", "voice-settings", "topic-search", "image-scripture", "discipleship-list", "discipleship-plan", "discipleship-reading", "unsubscribe"];
      if (validPages.includes(page)) {
        setCurrentPage(page as AppPage);
      }
    };
    window.addEventListener("app-navigate", handleCustomNavigate as EventListener);
    return () => window.removeEventListener("app-navigate", handleCustomNavigate as EventListener);
  }, []);

  // Initialize Live Updates for OTA updates
  useEffect(() => {
    const initializeLiveUpdates = async () => {
      try {
        // Register event to fire each time user resumes the app
        CapacitorApp.addListener('resume', async () => {
          try {
            // Don't reload during critical operations (login, registration, etc.)
            if (localStorage.getItem('shouldBlockReload') === 'true') {
              console.log('[LiveUpdates] Reload blocked - critical operation in progress');
              return;
            }

            if (localStorage.getItem('shouldReloadApp') === 'true') {
              console.log('[LiveUpdates] Reloading app with new update');
              await LiveUpdates.reload();
            } else {
              console.log('[LiveUpdates] Checking for updates on resume');
              const result = await LiveUpdates.sync();
              localStorage.setItem('shouldReloadApp', String(result.activeApplicationPathChanged));
              if (result.activeApplicationPathChanged) {
                console.log('[LiveUpdates] Update downloaded, will reload on next resume');
              }
            }
          } catch (error) {
            // Silently handle errors (e.g., web browser where LiveUpdates isn't available)
            console.log('[LiveUpdates] Error during resume sync:', error);
          }
        });

        // First sync on app load
        console.log('[LiveUpdates] Initial sync on app load');
        const result = await LiveUpdates.sync();
        localStorage.setItem('shouldReloadApp', String(result.activeApplicationPathChanged));
        if (result.activeApplicationPathChanged) {
          console.log('[LiveUpdates] Update downloaded, will reload on next app resume');
        }
      } catch (error) {
        // Live Updates only works on native platforms (iOS/Android)
        // Silently fail in web browser
        console.log('[LiveUpdates] Not available (web browser or disabled)');
      }
    };

    initializeLiveUpdates();
  }, []);

  const handleRegistrationComplete = async (userData?: User) => {
    if (userData) {
      try {
        // Block Live Updates reload during registration
        localStorage.setItem('shouldBlockReload', 'true');
        
        // Create app_users entry in the database
        const { apiUrl } = await import('@/lib/api-config');
        const response = await fetch(apiUrl('/api/users'), {
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
      } finally {
        // Unblock Live Updates reload after registration completes
        localStorage.setItem('shouldBlockReload', 'false');
      }
    }
    setShowRegistration(false);
  };

  const handleNavigate = (page: string, params?: any) => {
    const validPages = ["home", "privacy", "terms", "support", "videos", "blog", "settings", "friends", "biblestudies", "bibletrivia", "savedverses", "bookmarks", "glassdemo", "devotionals", "daily", "reading-plans", "reading-plan-detail", "more", "search", "plain-meaning", "instant-application", "voice-settings", "topic-search", "image-scripture", "discipleship-list", "discipleship-plan", "discipleship-reading", "abide", "unsubscribe"];
    if (validPages.includes(page)) {
      setCurrentPage(page as AppPage);
      
      // Store typed params for the page
      if (params) {
        setPageParams(prev => ({ ...prev, [page]: params }));
      }
      
      // Legacy searchQuery support (migrate to params)
      if (page === "search" && params?.query) {
        setSearchQuery(params.query);
      }
    }
  };

  // Legacy function for backward compatibility
  const handleNavigateToLegal = (page: string, searchQuery?: string) => {
    handleNavigate(page, searchQuery ? { query: searchQuery } : undefined);
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
    // Legal pages are always accessible (App Store requirement)
    if (["privacy", "terms"].includes(currentPage)) {
      switch (currentPage) {
        case "privacy":
          return <PrivacyPolicyPage onBack={handleBackFromLegal} language={language} />;
        case "terms":
          return <TermsOfServicePage onBack={handleBackFromLegal} language={language} />;
      }
    }

    // PAYWALL REMOVED - All content is now free
    // if (!isPremium) {
    //   return <PaywallPage />;
    // }

    // All content (now free for everyone)
    switch (currentPage) {
            case "home":
              return <HomePage user={user || undefined} onNavigate={handleNavigateToLegal} onStreakUpdate={setStreakDays} language={language} />;
            case "search":
              return <SearchPage 
                onNavigate={handleNavigateToLegal} 
                streakDays={streakDays} 
                language={language}
                initialSearchQuery={searchQuery}
                onSearchUsed={() => setSearchQuery("")}
              />;
            case "daily":
              return <DailyPage onNavigate={handleNavigateToLegal} streakDays={streakDays} language={language} />;
            case "more":
              return <MorePage language={language} onNavigate={handleNavigateToLegal} streakDays={streakDays} />;
            case "support":
              return <SupportPage onBack={handleBackFromLegal} onNavigate={handleNavigateToLegal} language={language} />;
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
              return <SavedVersesPage onBack={handleBackFromLegal} onNavigate={handleNavigateToLegal} language={language} />;
            case "bookmarks":
              return <BookmarksPage onNavigate={handleNavigateToLegal} />;
            case "glassdemo":
              return <GlassDemoPage />;
            case "devotionals":
              return <DailyDevotionsPage onBack={handleBackFromLegal} />;
            case "reading-plans":
              return <ReadingPlansPage onBack={handleBackFromLegal} onNavigate={handleNavigateToLegal} />;
            case "reading-plan-detail":
              return <ReadingPlanDetailPage onBack={handleBackFromLegal} />;
            case "plain-meaning":
              return <PlainMeaningPage onNavigate={handleNavigateToLegal} />;
            case "instant-application":
              return <InstantApplicationPage onNavigate={handleNavigateToLegal} />;
            case "voice-settings":
              return <VoiceSettingsPage />;
            case "topic-search":
              return <TopicSearchPage onNavigate={handleNavigate} />;
            case "image-scripture":
              const imageParams = pageParams["image-scripture"] || {};
              return <ScriptureImagePage 
                initialReference={imageParams.reference}
                initialText={imageParams.text}
                initialVersion={imageParams.version}
                onNavigate={handleNavigate}
              />;
            case "discipleship-list":
              return <DiscipleshipListPage onNavigate={handleNavigate} language={language} streakDays={streakDays} />;
            case "discipleship-plan":
              const planParams = (pageParams["discipleship-plan"] || {}) as { planId?: string };
              return <DiscipleshipPlanDetailPage planId={planParams.planId || ""} onNavigate={handleNavigate} />;
            case "discipleship-reading":
              const readingParams = (pageParams["discipleship-reading"] || {}) as { planId?: string; dayNumber?: number };
              return <DiscipleshipReadingPage 
                planId={readingParams.planId || ""}
                dayNumber={readingParams.dayNumber || 1}
                onNavigate={handleNavigate}
              />;
            case "unsubscribe":
              return <UnsubscribePage />;
            case "abide":
              return <AbideSessionPage onNavigate={handleNavigate} />;
            default:
              return <HomePage user={user || undefined} onNavigate={handleNavigateToLegal} onStreakUpdate={setStreakDays} language={language} />;
    }
  };

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="system" storageKey="gospel-app-theme">
        <VoiceSettingsProvider>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
            <GlobalErrorBanner />
            <div className="app-root min-h-screen bg-background">
              {/* Network Status - Apple-compliant auto-recovery */}
              <NetworkStatus onRetry={() => window.location.reload()} />
              
              {/* Current Page Content */}
              <main className="min-h-screen bg-background pb-20">
                {renderCurrentPage()}
              </main>

              {/* Bottom Navigation - Hide on legal pages and friends page */}
              {!["privacy", "terms", "support", "videos", "blog", "settings", "friends", "biblestudies", "bibletrivia", "savedverses", "devotionals", "reading-plans", "reading-plan-detail", "plain-meaning", "instant-application", "voice-settings", "image-scripture", "topic-search", "bookmarks", "discipleship-plan", "discipleship-reading", "abide"].includes(currentPage) && (
                <BottomNavigation 
                  currentPage={currentPage as "home" | "discipleship-list" | "search" | "daily" | "more"} 
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
                  userEmail={user.email}
                  onNavigateToFriends={handleNavigateToFriends}
                />
              )}

              <Toaster />
              <OfflineIndicator />
            </div>
          </TooltipProvider>
        </QueryClientProvider>
        </VoiceSettingsProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default function App() {
  return <MainApp />;
}