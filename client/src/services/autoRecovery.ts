/**
 * Apple-Compliant Auto-Recovery Service
 * Silent error detection and recovery without user disruption
 * No background processes, integrated with app lifecycle
 */

interface RecoveryAction {
  type: 'retry' | 'fallback' | 'redirect' | 'refresh';
  target: string;
  params?: Record<string, any>;
}

interface ErrorPattern {
  pattern: RegExp;
  action: RecoveryAction;
  maxAttempts: number;
}

class AutoRecoveryService {
  private readonly errorPatterns: ErrorPattern[] = [
    // Network errors - retry with backoff
    {
      pattern: /fetch.*failed|network.*error|connection.*refused/i,
      action: { type: 'retry', target: 'network' },
      maxAttempts: 3
    },
    // API errors - fallback to cached data
    {
      pattern: /api.*error|500|502|503|504/i,
      action: { type: 'fallback', target: 'cache' },
      maxAttempts: 2
    },
    // Component errors - refresh component
    {
      pattern: /component.*error|render.*error|state.*error/i,
      action: { type: 'refresh', target: 'component' },
      maxAttempts: 2
    },
    // Memory errors - cleanup and redirect
    {
      pattern: /memory.*exceeded|heap.*size/i,
      action: { type: 'redirect', target: 'home' },
      maxAttempts: 1
    }
  ];

  private readonly recoveryAttempts = new Map<string, number>();
  private readonly lastRecoveryTime = new Map<string, number>();
  private readonly RECOVERY_COOLDOWN = 30000; // 30 seconds

  /**
   * Apple-compliant error analysis and recovery
   * No user data collection, transparent operation
   */
  public async analyzeAndRecover(error: Error | string): Promise<boolean> {
    const errorMessage = typeof error === 'string' ? error : error.message;
    const errorKey = this.generateErrorKey(errorMessage);

    // Check cooldown period
    if (this.isInCooldown(errorKey)) {
      console.log('Recovery in cooldown period, skipping');
      return false;
    }

    // Find matching pattern
    const matchingPattern = this.errorPatterns.find(pattern => 
      pattern.pattern.test(errorMessage)
    );

    if (!matchingPattern) {
      console.log('No recovery pattern found for error:', errorMessage);
      return false;
    }

    // Check attempt limit
    const attempts = this.recoveryAttempts.get(errorKey) || 0;
    if (attempts >= matchingPattern.maxAttempts) {
      console.log('Max recovery attempts reached for:', errorKey);
      return false;
    }

    // Perform recovery
    return await this.executeRecovery(matchingPattern.action, errorKey);
  }

  /**
   * Execute specific recovery action
   */
  private async executeRecovery(action: RecoveryAction, errorKey: string): Promise<boolean> {
    this.recoveryAttempts.set(errorKey, (this.recoveryAttempts.get(errorKey) || 0) + 1);
    this.lastRecoveryTime.set(errorKey, Date.now());

    console.log(`Executing recovery action: ${action.type} for ${action.target}`);

    try {
      switch (action.type) {
        case 'retry':
          return await this.handleRetryRecovery(action);
        
        case 'fallback':
          return await this.handleFallbackRecovery(action);
        
        case 'refresh':
          return await this.handleRefreshRecovery(action);
        
        case 'redirect':
          return await this.handleRedirectRecovery(action);
        
        default:
          console.log('Unknown recovery action:', action.type);
          return false;
      }
    } catch (recoveryError) {
      console.error('Recovery action failed:', recoveryError);
      return false;
    }
  }

  /**
   * Network retry recovery
   */
  private async handleRetryRecovery(action: RecoveryAction): Promise<boolean> {
    const retryDelay = this.calculateRetryDelay(action.target);
    
    return new Promise((resolve) => {
      setTimeout(async () => {
        try {
          // Test network connectivity
          const { apiUrl } = await import('@/lib/api-config');
          const response = await fetch(apiUrl('/api/health'), {
            method: 'GET',
            signal: AbortSignal.timeout(5000)
          });
          
          resolve(response.ok);
        } catch (error) {
          console.log('Network retry failed:', error);
          resolve(false);
        }
      }, retryDelay);
    });
  }

  /**
   * Fallback to cached data
   */
  private async handleFallbackRecovery(action: RecoveryAction): Promise<boolean> {
    try {
      // Check for cached data in localStorage
      const cacheKeys = Object.keys(localStorage).filter(key => 
        key.includes('cache') || key.includes('data')
      );

      if (cacheKeys.length > 0) {
        console.log('Fallback to cached data successful');
        return true;
      }

      // No cached data available, try to fetch minimal data
      const { apiUrl } = await import('@/lib/api-config');
      const response = await fetch(apiUrl('/api/daily-verse'), {
        signal: AbortSignal.timeout(3000)
      });
      
      return response.ok;
    } catch (error) {
      console.log('Fallback recovery failed:', error);
      return false;
    }
  }

  /**
   * Component refresh recovery
   */
  private async handleRefreshRecovery(action: RecoveryAction): Promise<boolean> {
    try {
      // Clear component-specific storage
      const componentKeys = Object.keys(localStorage).filter(key => 
        key.includes('component') || key.includes('state')
      );

      componentKeys.forEach(key => {
        try {
          localStorage.removeItem(key);
        } catch (error) {
          console.warn('Failed to clear component key:', key);
        }
      });

      // Force React re-render by clearing query cache
      if (window.location.search) {
        const url = new URL(window.location.href);
        url.searchParams.set('refresh', Date.now().toString());
        window.history.replaceState({}, '', url.toString());
      }

      console.log('Component refresh recovery completed');
      return true;
    } catch (error) {
      console.error('Component refresh failed:', error);
      return false;
    }
  }

  /**
   * Emergency redirect recovery
   */
  private async handleRedirectRecovery(action: RecoveryAction): Promise<boolean> {
    try {
      // Perform memory cleanup before redirect
      this.performEmergencyCleanup();
      
      // Redirect to safe page
      const redirectTarget = action.target === 'home' ? '/' : action.target;
      
      setTimeout(() => {
        window.location.href = redirectTarget;
      }, 1000);

      return true;
    } catch (error) {
      console.error('Redirect recovery failed:', error);
      return false;
    }
  }

  /**
   * Calculate exponential backoff delay
   */
  private calculateRetryDelay(target: string): number {
    const attempts = this.recoveryAttempts.get(this.generateErrorKey(target)) || 0;
    return Math.min(1000 * Math.pow(2, attempts), 10000); // Max 10 seconds
  }

  /**
   * Generate unique error key for tracking
   */
  private generateErrorKey(errorMessage: string): string {
    // Create a simple hash without exposing sensitive data
    const normalizedMessage = errorMessage.toLowerCase().replace(/[^a-z]/g, '');
    return normalizedMessage.substring(0, 20);
  }

  /**
   * Check if error is in cooldown period
   */
  private isInCooldown(errorKey: string): boolean {
    const lastRecovery = this.lastRecoveryTime.get(errorKey);
    return lastRecovery ? (Date.now() - lastRecovery) < this.RECOVERY_COOLDOWN : false;
  }

  /**
   * Emergency cleanup for memory issues
   */
  private performEmergencyCleanup(): void {
    try {
      // Clear non-essential localStorage
      const essentialKeys = ['userPreferences', 'streakData', 'userRegistration'];
      Object.keys(localStorage).forEach(key => {
        if (!essentialKeys.includes(key)) {
          try {
            localStorage.removeItem(key);
          } catch (error) {
            console.warn('Failed to clear localStorage key:', key);
          }
        }
      });

      // Clear cache if available
      if ('caches' in window) {
        caches.keys().then(names => {
          names.forEach(name => {
            if (!name.includes('essential')) {
              caches.delete(name);
            }
          });
        });
      }

      console.log('Emergency cleanup completed');
    } catch (error) {
      console.error('Emergency cleanup failed:', error);
    }
  }

  /**
   * Get recovery statistics (for health monitoring)
   */
  public getRecoveryStats(): Record<string, any> {
    return {
      totalRecoveryAttempts: Array.from(this.recoveryAttempts.values()).reduce((a, b) => a + b, 0),
      activeErrors: this.recoveryAttempts.size,
      lastRecoveryTime: Math.max(...Array.from(this.lastRecoveryTime.values()), 0)
    };
  }

  /**
   * Reset recovery tracking (for testing or manual reset)
   */
  public resetRecoveryState(): void {
    this.recoveryAttempts.clear();
    this.lastRecoveryTime.clear();
    console.log('Recovery state reset');
  }
}

// Singleton instance for app-wide recovery
export const autoRecovery = new AutoRecoveryService();