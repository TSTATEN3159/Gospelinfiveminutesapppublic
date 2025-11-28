// NavigationButtons.tsx - Reusable navigation component
// Adapted from ChatGPT's suggestion for our state-based navigation system

import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, ArrowRight } from "lucide-react";
import { AppPage, getRouteConfig } from "@/config/routesConfig";

interface NavigationButtonsProps {
  currentPage: AppPage;
  onNavigate: (page: AppPage, params?: any) => void;
  backTarget?: AppPage;
  backLabel?: string;
  backParams?: any;
  showBack?: boolean;
  showHome?: boolean;
  showNext?: boolean;
  nextTarget?: AppPage;
  nextLabel?: string;
  nextParams?: any;
  className?: string;
}

export default function NavigationButtons({
  currentPage,
  onNavigate,
  backTarget,
  backLabel,
  backParams,
  showBack,
  showHome,
  showNext,
  nextTarget,
  nextLabel,
  nextParams,
  className = "",
}: NavigationButtonsProps) {
  const routeConfig = getRouteConfig(currentPage);

  // Use props if provided, otherwise fall back to route config
  const effectiveBackTarget = backTarget ?? routeConfig?.backTarget ?? "home";
  const effectiveBackLabel = backLabel ?? routeConfig?.label ?? "Back";
  const effectiveShowBack = showBack ?? routeConfig?.showBack ?? true;
  const effectiveShowHome = showHome ?? routeConfig?.showHome ?? true;
  const effectiveShowNext = showNext ?? routeConfig?.showNext ?? false;
  const effectiveNextTarget = nextTarget ?? routeConfig?.nextTarget;
  const effectiveNextLabel = nextLabel ?? routeConfig?.nextLabel ?? "Next";

  const handleGoBack = () => {
    onNavigate(effectiveBackTarget, backParams);
  };

  const handleGoHome = () => {
    onNavigate("home");
  };

  const handleGoNext = () => {
    if (effectiveNextTarget) {
      onNavigate(effectiveNextTarget, nextParams);
    }
  };

  // Button styling - consistent visible style for light and dark mode
  const buttonClass = "rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors";

  return (
    <div className={`flex items-center justify-between gap-2 ${className}`}>
      {/* Back Button */}
      <div className="flex-1 flex justify-start">
        {effectiveShowBack && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleGoBack}
            className={buttonClass}
            data-testid="button-nav-back"
            aria-label={`Go back to ${effectiveBackLabel}`}
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
        )}
      </div>

      {/* Home Button */}
      <div className="flex justify-center">
        {effectiveShowHome && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleGoHome}
            className={buttonClass}
            data-testid="button-nav-home"
            aria-label="Go to Home"
          >
            <Home className="w-4 h-4 mr-1" />
            Home
          </Button>
        )}
      </div>

      {/* Next Button */}
      <div className="flex-1 flex justify-end">
        {effectiveShowNext && effectiveNextTarget && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleGoNext}
            className={buttonClass}
            data-testid="button-nav-next"
            aria-label={`Go to ${effectiveNextLabel}`}
          >
            {effectiveNextLabel}
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
}

// Simplified header navigation with just icon buttons
interface HeaderNavigationProps {
  currentPage: AppPage;
  onNavigate: (page: AppPage, params?: any) => void;
  backTarget?: AppPage;
  backParams?: any;
  showBack?: boolean;
  showHome?: boolean;
}

export function HeaderNavigation({
  currentPage,
  onNavigate,
  backTarget,
  backParams,
  showBack = true,
  showHome = true,
}: HeaderNavigationProps) {
  const routeConfig = getRouteConfig(currentPage);
  const effectiveBackTarget = backTarget ?? routeConfig?.backTarget ?? "home";

  const handleGoBack = () => {
    onNavigate(effectiveBackTarget, backParams);
  };

  const handleGoHome = () => {
    onNavigate("home");
  };

  const buttonClass = "rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700";

  return (
    <div className="flex items-center justify-between">
      {showBack && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleGoBack}
          className={buttonClass}
          data-testid="button-back"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
      )}
      {showHome && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleGoHome}
          className={buttonClass}
          data-testid="button-home"
          aria-label="Go home"
        >
          <Home className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
}
