/**
 * Apple-Compliant Network Status Indicator
 * Only shows offline message when browser definitively reports offline
 * Does NOT rely on API health checks (which can falsely report offline on iOS)
 */

import { useState, useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Wifi, WifiOff, RefreshCw, CheckCircle } from 'lucide-react';

interface NetworkStatusProps {
  onRetry?: () => void;
  showOfflineMessage?: boolean;
}

export default function NetworkStatus({ onRetry, showOfflineMessage = true }: NetworkStatusProps) {
  // Only rely on browser's navigator.onLine - not API health checks
  const [isOnline, setIsOnline] = useState(true); // Assume online initially
  const [showRecoveryMessage, setShowRecoveryMessage] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    // Set initial state from browser (but don't show banner immediately)
    // This prevents false positives on iOS app startup
    const checkInitialState = () => {
      if (!navigator.onLine) {
        // Only set offline if browser definitively says so
        setIsOnline(false);
      }
    };

    // Delay initial check to avoid false positives during app startup
    const initialCheckTimer = setTimeout(checkInitialState, 2000);

    const handleOnline = () => {
      const wasOffline = !isOnline;
      setIsOnline(true);
      setIsRetrying(false);

      // Show brief recovery message only if we were showing offline
      if (wasOffline) {
        setShowRecoveryMessage(true);
        setTimeout(() => setShowRecoveryMessage(false), 3000);
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      setIsRetrying(false);
    };

    // Listen to browser network events only
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      clearTimeout(initialCheckTimer);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isOnline]);

  const handleRetry = () => {
    setIsRetrying(true);
    
    // Just trigger a page reload to retry everything
    setTimeout(() => {
      if (navigator.onLine) {
        setIsOnline(true);
        setIsRetrying(false);
        onRetry?.();
      } else {
        setIsRetrying(false);
      }
    }, 1000);
  };

  // Show recovery message briefly after coming back online
  if (showRecoveryMessage) {
    return (
      <Alert className="border-green-200 bg-green-50 dark:bg-green-900/20 mb-4">
        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
        <AlertDescription className="text-green-800 dark:text-green-200">
          Connection restored! Everything is working normally.
        </AlertDescription>
      </Alert>
    );
  }

  // Only show offline message if browser says we're offline
  if (!isOnline && showOfflineMessage) {
    return (
      <Alert className="border-amber-200 bg-amber-50 dark:bg-amber-900/20 mb-4">
        <WifiOff className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        <AlertDescription className="text-amber-800 dark:text-amber-200 flex items-center justify-between">
          <span>
            You're currently offline. Some features may not be available.
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRetry}
            disabled={isRetrying}
            className="ml-4 bg-white dark:bg-amber-950 border-amber-300 dark:border-amber-700"
            data-testid="button-retry-connection"
          >
            {isRetrying ? (
              <RefreshCw className="h-3 w-3 animate-spin mr-1" />
            ) : (
              <Wifi className="h-3 w-3 mr-1" />
            )}
            {isRetrying ? 'Connecting...' : 'Retry'}
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  // Return null when online (no UI clutter)
  return null;
}

// Hook for network status in components
export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return { isOnline };
}
