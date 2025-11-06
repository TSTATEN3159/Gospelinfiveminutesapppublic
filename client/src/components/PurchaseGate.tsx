import { ReactNode } from 'react';
import { usePurchase } from '@/contexts/PurchaseContext';
import PaywallPage from '@/pages/PaywallPage';

interface PurchaseGateProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Component that shows paywall if user hasn't purchased,
 * otherwise renders children
 */
export default function PurchaseGate({ children, fallback }: PurchaseGateProps) {
  const { isPremium, isLoading } = usePurchase();

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
