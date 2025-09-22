/**
 * Apple-Compliant Network Status Indicator
 * Provides seamless offline/online detection and user feedback
 * Transparent to users, graceful degradation
 */

import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Wifi, WifiOff, RefreshCw, CheckCircle } from 'lucide-react';

interface NetworkStatusProps {
  onRetry?: () => void;
  showOfflineMessage?: boolean;
}

interface ConnectionStatus {
  isOnline: boolean;
  lastChecked: Date;
  retryAttempts: number;
  isRetrying: boolean;
}

export default function NetworkStatus({ onRetry, showOfflineMessage = true }: NetworkStatusProps) {
  const [status, setStatus] = useState<ConnectionStatus>({
    isOnline: navigator.onLine,
    lastChecked: new Date(),
    retryAttempts: 0,
    isRetrying: false
  });

  const [showRecoveryMessage, setShowRecoveryMessage] = useState(false);

  /**
   * Apple-compliant network monitoring
   * Uses standard browser APIs, no invasive polling
   */
  useEffect(() => {
    const handleOnline = () => {
      setStatus(prev => ({
        ...prev,
        isOnline: true,
        lastChecked: new Date(),
        retryAttempts: 0,
        isRetrying: false
      }));

      // Show brief recovery message
      if (!status.isOnline) {
        setShowRecoveryMessage(true);
        setTimeout(() => setShowRecoveryMessage(false), 3000);
      }
    };

    const handleOffline = () => {
      setStatus(prev => ({
        ...prev,
        isOnline: false,
        lastChecked: new Date(),
        isRetrying: false
      }));
    };

    // Listen to browser network events
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Perform initial connection test
    performConnectionTest();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  /**
   * Test actual API connectivity (not just network interface)
   * Apple-compliant: uses app's own health endpoints
   */
  const performConnectionTest = async (): Promise<boolean> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch('/api/health', {
        method: 'GET',
        signal: controller.signal,
        cache: 'no-cache'
      });

      clearTimeout(timeoutId);
      
      const isConnected = response.ok;
      
      setStatus(prev => ({
        ...prev,
        isOnline: isConnected,
        lastChecked: new Date(),
        isRetrying: false
      }));

      return isConnected;
    } catch (error) {
      setStatus(prev => ({
        ...prev,
        isOnline: false,
        lastChecked: new Date(),
        isRetrying: false
      }));
      
      return false;
    }
  };

  /**
   * Smart retry mechanism with exponential backoff
   */
  const handleRetry = async (): Promise<void> => {
    setStatus(prev => ({
      ...prev,
      isRetrying: true,
      retryAttempts: prev.retryAttempts + 1
    }));

    const isConnected = await performConnectionTest();
    
    if (isConnected) {
      onRetry?.();
    } else {
      // Exponential backoff for failed retries
      const delay = Math.min(1000 * Math.pow(2, status.retryAttempts), 10000);
      setTimeout(() => {
        if (status.retryAttempts < 5) {
          handleRetry();
        }
      }, delay);
    }
  };

  // Auto-recovery when network comes back
  useEffect(() => {
    if (status.isOnline && status.retryAttempts > 0) {
      onRetry?.();
    }
  }, [status.isOnline, onRetry]);

  // Show recovery message
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

  // Only show offline message if requested and actually offline
  if (!status.isOnline && showOfflineMessage) {
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
            disabled={status.isRetrying}
            className="ml-4 bg-white dark:bg-amber-950 border-amber-300 dark:border-amber-700"
            data-testid="button-retry-connection"
          >
            {status.isRetrying ? (
              <RefreshCw className="h-3 w-3 animate-spin mr-1" />
            ) : (
              <Wifi className="h-3 w-3 mr-1" />
            )}
            {status.isRetrying ? 'Connecting...' : 'Retry'}
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
  const [lastChecked, setLastChecked] = useState(new Date());

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

  const checkConnection = async (): Promise<boolean> => {
    try {
      const response = await fetch('/api/health', {
        method: 'GET',
        cache: 'no-cache',
        signal: AbortSignal.timeout(3000)
      });
      
      const connected = response.ok;
      setIsOnline(connected);
      setLastChecked(new Date());
      return connected;
    } catch {
      setIsOnline(false);
      setLastChecked(new Date());
      return false;
    }
  };

  return {
    isOnline,
    lastChecked,
    checkConnection
  };
}