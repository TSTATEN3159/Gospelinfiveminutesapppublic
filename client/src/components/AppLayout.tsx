// src/components/AppLayout.tsx
// Adapted from ChatGPT's suggestion for our state-based navigation system

import NavigationButtons from "@/components/NavigationButtons";
import { AppPage } from "@/config/routesConfig";

interface AppLayoutProps {
  currentPage: AppPage;
  onNavigate: (page: AppPage, params?: any) => void;
  children: React.ReactNode;
  showHeader?: boolean;
  showNavigation?: boolean;
  backTarget?: AppPage;
  backParams?: any;
  nextTarget?: AppPage;
  nextLabel?: string;
  nextParams?: any;
}

export default function AppLayout({
  currentPage,
  onNavigate,
  children,
  showHeader = true,
  showNavigation = true,
  backTarget,
  backParams,
  nextTarget,
  nextLabel,
  nextParams,
}: AppLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-50">
      {/* App header (optional) */}
      {showHeader && (
        <header className="px-4 pt-4 pb-2 border-b border-amber-200/60 dark:border-gray-700/60 ios-safe-top">
          <h1 className="text-lg font-semibold tracking-tight" style={{ 
            fontFamily: 'Dancing Script, Brush Script MT, cursive',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
          }}>
            The Gospel in Five Minutes
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Abide – where spiritual growth becomes visible
          </p>
        </header>
      )}

      {/* Page content */}
      <main className="flex-1 px-4 py-4 overflow-y-auto">
        {children}
      </main>

      {/* Navigation bar (shows on every page under this layout) */}
      {showNavigation && (
        <footer className="px-4 pb-4 pt-2 border-t border-amber-200/60 dark:border-gray-700/60 ios-safe-bottom bg-amber-50/95 dark:bg-gray-900/95 backdrop-blur-sm">
          <NavigationButtons
            currentPage={currentPage}
            onNavigate={onNavigate}
            backTarget={backTarget}
            backParams={backParams}
            showNext={!!nextTarget}
            nextTarget={nextTarget}
            nextLabel={nextLabel}
            nextParams={nextParams}
          />
        </footer>
      )}
    </div>
  );
}

// Minimal layout without header - useful for pages with their own headers
interface MinimalLayoutProps {
  currentPage: AppPage;
  onNavigate: (page: AppPage, params?: any) => void;
  children: React.ReactNode;
  backTarget?: AppPage;
  backParams?: any;
}

export function MinimalLayout({
  currentPage,
  onNavigate,
  children,
  backTarget,
  backParams,
}: MinimalLayoutProps) {
  return (
    <AppLayout
      currentPage={currentPage}
      onNavigate={onNavigate}
      showHeader={false}
      backTarget={backTarget}
      backParams={backParams}
    >
      {children}
    </AppLayout>
  );
}
