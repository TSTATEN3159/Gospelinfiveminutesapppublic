import { ReactNode } from 'react';
import { usePurchase } from '@/contexts/PurchaseContext';
import PaywallPage from '@/pages/PaywallPage';

interface PurchaseGateProps {
  children: ReactNode;
  fallback?: ReactNode;
  isTestFlight?: boolean;
}

/**
 * Component that shows paywall if user hasn't purchased,
 * otherwise renders children
 * TestFlight builds bypass the paywall automatically
 */
export default function PurchaseGate({ children, fallback, isTestFlight = false }: PurchaseGateProps) {
  const { isPremium, isLoading } = usePurchase();

  // TestFlight bypass - always show content
  if (isTestFlight) {
    return <>{children}</>;
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show paywall if not premium
  if (!isPremium) {
    return fallback ? <>{fallback}</> : <PaywallPage />;
  }

  // User is premium, show content
  return <>{children}</>;
}
