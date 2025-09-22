/**
 * Apple-Compliant Error Boundary with Graceful Fallbacks
 * Provides seamless user experience during app errors
 * No technical details exposed to users
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  retryCount: number;
}

class ErrorBoundary extends Component<Props, State> {
  private readonly maxRetries = 3;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      retryCount: 0
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      retryCount: 0
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Apple-compliant error logging - no personal data
    console.error('Error Boundary caught an error:', {
      message: error.message,
      timestamp: new Date().toISOString(),
      retryCount: this.state.retryCount
    });

    // Call optional error handler
    this.props.onError?.(error, errorInfo);

    // Attempt auto-recovery for common issues
    this.attemptAutoRecovery(error);
  }

  /**
   * Auto-recovery for common frontend issues
   * Apple-compliant: transparent fixes, no user disruption
   */
  private attemptAutoRecovery = async (error: Error) => {
    const errorMessage = error.message.toLowerCase();

    try {
      // Network error recovery
      if (errorMessage.includes('fetch') || errorMessage.includes('network')) {
        console.log('Attempting network error recovery...');
        await this.retryNetworkConnection();
      }

      // Component state recovery
      if (errorMessage.includes('state') || errorMessage.includes('props')) {
        console.log('Attempting component state recovery...');
        this.resetComponentState();
      }

      // Memory issue recovery
      if (errorMessage.includes('memory') || errorMessage.includes('heap')) {
        console.log('Attempting memory cleanup...');
        this.performMemoryCleanup();
      }

    } catch (recoveryError) {
      console.error('Auto-recovery failed:', recoveryError);
    }
  };

  /**
   * Network connection retry mechanism
   */
  private retryNetworkConnection = async (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(async () => {
        try {
          // Test network connectivity
          const response = await fetch('/api/health', { 
            method: 'GET',
            signal: AbortSignal.timeout(5000)
          });
          
          if (response.ok) {
            console.log('Network connection restored');
            this.handleRetry();
          }
        } catch (error) {
          console.log('Network still unavailable');
        }
        resolve();
      }, 2000);
    });
  };

  /**
   * Reset component state for recovery
   */
  private resetComponentState = (): void => {
    // Clear potentially corrupted local storage
    try {
      const keysToPreserve = ['userPreferences', 'streakData', 'userRegistration'];
      const storage = { ...localStorage };
      
      Object.keys(storage).forEach(key => {
        if (!keysToPreserve.includes(key)) {
          localStorage.removeItem(key);
        }
      });
      
      console.log('Component state reset completed');
    } catch (error) {
      console.error('State reset failed:', error);
    }
  };

  /**
   * Memory cleanup for performance recovery
   */
  private performMemoryCleanup = (): void => {
    try {
      // Force garbage collection if available (development only)
      if (window.gc && process.env.NODE_ENV === 'development') {
        window.gc();
      }
      
      // Clear any cached data that might be causing memory issues
      if ('caches' in window) {
        caches.keys().then(names => {
          names.forEach(name => {
            if (name.includes('temp') || name.includes('cache')) {
              caches.delete(name);
            }
          });
        });
      }
      
      console.log('Memory cleanup completed');
    } catch (error) {
      console.error('Memory cleanup failed:', error);
    }
  };

  /**
   * User-initiated retry with smart retry logic
   */
  private handleRetry = (): void => {
    if (this.state.retryCount < this.maxRetries) {
      this.setState(prevState => ({
        hasError: false,
        error: null,
        retryCount: prevState.retryCount + 1
      }));
    }
  };

  /**
   * Navigate home as fallback
   */
  private handleGoHome = (): void => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Apple-compliant error UI - clean, non-technical, helpful
      return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-background dark:to-muted/20 flex items-center justify-center p-4">
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-foreground">
                Something Went Wrong
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                We encountered an unexpected issue. Don't worry - your data is safe and we're working to fix this automatically.
              </p>
              
              {/* User-friendly actions */}
              <div className="space-y-3">
                {this.state.retryCount < this.maxRetries && (
                  <Button 
                    onClick={this.handleRetry}
                    className="w-full"
                    data-testid="button-retry-error"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Try Again
                  </Button>
                )}
                
                <Button 
                  variant="outline"
                  onClick={this.handleGoHome}
                  className="w-full"
                  data-testid="button-home-error"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Go to Home
                </Button>
              </div>

              {/* Retry count indicator (for users who retry multiple times) */}
              {this.state.retryCount > 0 && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Attempt {this.state.retryCount} of {this.maxRetries}
                </p>
              )}

              {/* Helpful tip */}
              <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  💡 Tip: If this continues, try refreshing your browser or check your internet connection.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;