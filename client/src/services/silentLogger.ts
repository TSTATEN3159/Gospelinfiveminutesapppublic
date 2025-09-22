/**
 * Apple-Compliant Silent Logging Service
 * Non-intrusive error and performance tracking
 * Meets Apple privacy requirements, no user data collection
 */

interface LogEntry {
  timestamp: number;
  level: 'info' | 'warn' | 'error' | 'debug';
  category: string;
  message: string;
  metadata?: Record<string, any>;
  recoveryAttempted?: boolean;
}

interface LogConfig {
  maxEntries: number;
  retentionDays: number;
  enableDebug: boolean;
  categories: string[];
}

class SilentLogger {
  private readonly config: LogConfig = {
    maxEntries: 1000,
    retentionDays: 7,
    enableDebug: false,
    categories: ['app', 'network', 'ui', 'recovery', 'performance']
  };

  private readonly logs: LogEntry[] = [];
  private readonly logKey = 'app_silent_logs';
  private lastCleanup = Date.now();

  constructor() {
    this.loadLogsFromStorage();
    this.setupPeriodicCleanup();
  }

  /**
   * Main logging method - Apple compliant
   */
  public log(level: LogEntry['level'], category: string, message: string, metadata?: Record<string, any>): void {
    // Skip debug logs unless explicitly enabled
    if (level === 'debug' && !this.config.enableDebug) {
      return;
    }

    // Only log approved categories
    if (!this.config.categories.includes(category)) {
      return;
    }

    const entry: LogEntry = {
      timestamp: Date.now(),
      level,
      category,
      message: this.sanitizeMessage(message),
      metadata: this.sanitizeMetadata(metadata),
      recoveryAttempted: false
    };

    this.addEntry(entry);
  }

  /**
   * Convenience methods for different log levels
   */
  public info(category: string, message: string, metadata?: Record<string, any>): void {
    this.log('info', category, message, metadata);
  }

  public warn(category: string, message: string, metadata?: Record<string, any>): void {
    this.log('warn', category, message, metadata);
  }

  public error(category: string, message: string, metadata?: Record<string, any>): void {
    this.log('error', category, message, metadata);
  }

  public debug(category: string, message: string, metadata?: Record<string, any>): void {
    this.log('debug', category, message, metadata);
  }

  /**
   * Log recovery attempts
   */
  public recovery(message: string, metadata?: Record<string, any>): void {
    const entry: LogEntry = {
      timestamp: Date.now(),
      level: 'info',
      category: 'recovery',
      message: this.sanitizeMessage(message),
      metadata: this.sanitizeMetadata(metadata),
      recoveryAttempted: true
    };

    this.addEntry(entry);
  }

  /**
   * Performance logging for app optimization
   */
  public performance(operation: string, duration: number, metadata?: Record<string, any>): void {
    this.log('info', 'performance', `${operation} completed in ${duration}ms`, {
      ...metadata,
      duration,
      operation
    });
  }

  /**
   * Network operation logging
   */
  public network(url: string, method: string, status: number, duration?: number): void {
    // Sanitize URL to remove potential sensitive data
    const sanitizedUrl = this.sanitizeUrl(url);
    
    this.log('info', 'network', `${method} ${sanitizedUrl} → ${status}`, {
      method,
      status,
      duration: duration || 0,
      success: status >= 200 && status < 300
    });
  }

  /**
   * UI interaction logging for UX insights
   */
  public userAction(action: string, element: string, metadata?: Record<string, any>): void {
    this.log('info', 'ui', `User ${action}: ${element}`, {
      ...metadata,
      action,
      element
    });
  }

  /**
   * Get logs for debugging (developer use only)
   */
  public getLogs(category?: string, level?: LogEntry['level']): LogEntry[] {
    let filtered = [...this.logs];

    if (category) {
      filtered = filtered.filter(log => log.category === category);
    }

    if (level) {
      filtered = filtered.filter(log => log.level === level);
    }

    return filtered.sort((a, b) => b.timestamp - a.timestamp);
  }

  /**
   * Get error summary for health monitoring
   */
  public getErrorSummary(): { errors: number; warnings: number; recoveries: number; lastError?: LogEntry } {
    const errors = this.logs.filter(log => log.level === 'error');
    const warnings = this.logs.filter(log => log.level === 'warn');
    const recoveries = this.logs.filter(log => log.recoveryAttempted);
    
    return {
      errors: errors.length,
      warnings: warnings.length,
      recoveries: recoveries.length,
      lastError: errors[errors.length - 1]
    };
  }

  /**
   * Clear all logs (for privacy compliance)
   */
  public clearLogs(): void {
    this.logs.length = 0;
    this.saveLogsToStorage();
  }

  /**
   * Export logs for debugging (non-sensitive data only)
   */
  public exportLogs(): string {
    const exportData = {
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      logs: this.logs.map(log => ({
        ...log,
        timestamp: new Date(log.timestamp).toISOString()
      }))
    };

    return JSON.stringify(exportData, null, 2);
  }

  /**
   * Add log entry with rotation management
   */
  private addEntry(entry: LogEntry): void {
    this.logs.push(entry);

    // Rotate logs if needed
    if (this.logs.length > this.config.maxEntries) {
      this.logs.splice(0, this.logs.length - this.config.maxEntries);
    }

    // Persist to storage
    this.saveLogsToStorage();
  }

  /**
   * Sanitize messages to remove sensitive data
   */
  private sanitizeMessage(message: string): string {
    return message
      .replace(/password=[\w]+/gi, 'password=***')
      .replace(/token=[\w\-\.]+/gi, 'token=***')
      .replace(/key=[\w\-\.]+/gi, 'key=***')
      .replace(/email=[\w@\.]+/gi, 'email=***')
      .replace(/phone=[\d\-\+\(\)]+/gi, 'phone=***');
  }

  /**
   * Sanitize metadata to remove sensitive information
   */
  private sanitizeMetadata(metadata?: Record<string, any>): Record<string, any> | undefined {
    if (!metadata) return undefined;

    const sanitized: Record<string, any> = {};
    const sensitiveKeys = ['password', 'token', 'key', 'secret', 'email', 'phone'];

    for (const [key, value] of Object.entries(metadata)) {
      if (sensitiveKeys.some(sensitive => key.toLowerCase().includes(sensitive))) {
        sanitized[key] = '***';
      } else if (typeof value === 'string' && value.length > 200) {
        sanitized[key] = value.substring(0, 200) + '...';
      } else {
        sanitized[key] = value;
      }
    }

    return sanitized;
  }

  /**
   * Sanitize URLs to remove query parameters and sensitive paths
   */
  private sanitizeUrl(url: string): string {
    try {
      const parsed = new URL(url, window.location.origin);
      // Remove query parameters that might contain sensitive data
      return `${parsed.pathname}${parsed.search ? '?***' : ''}`;
    } catch {
      // If URL parsing fails, just return the path part
      return url.split('?')[0].split('#')[0];
    }
  }

  /**
   * Load logs from localStorage
   */
  private loadLogsFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.logKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          this.logs.push(...parsed);
          this.cleanupOldLogs();
        }
      }
    } catch (error) {
      console.warn('Failed to load silent logs from storage:', error);
    }
  }

  /**
   * Save logs to localStorage
   */
  private saveLogsToStorage(): void {
    try {
      localStorage.setItem(this.logKey, JSON.stringify(this.logs));
    } catch (error) {
      // If storage is full, remove older logs and try again
      if (this.logs.length > 100) {
        this.logs.splice(0, 50);
        try {
          localStorage.setItem(this.logKey, JSON.stringify(this.logs));
        } catch {
          console.warn('Failed to save logs to storage');
        }
      }
    }
  }

  /**
   * Remove logs older than retention period
   */
  private cleanupOldLogs(): void {
    const cutoff = Date.now() - (this.config.retentionDays * 24 * 60 * 60 * 1000);
    const originalLength = this.logs.length;
    
    for (let i = this.logs.length - 1; i >= 0; i--) {
      if (this.logs[i].timestamp < cutoff) {
        this.logs.splice(i, 1);
      }
    }

    if (this.logs.length !== originalLength) {
      this.saveLogsToStorage();
    }
  }

  /**
   * Set up periodic cleanup
   */
  private setupPeriodicCleanup(): void {
    setInterval(() => {
      const now = Date.now();
      if (now - this.lastCleanup > 60 * 60 * 1000) { // Every hour
        this.cleanupOldLogs();
        this.lastCleanup = now;
      }
    }, 60 * 60 * 1000); // Check every hour
  }
}

// Global silent logger instance
export const silentLogger = new SilentLogger();

// Global error handler integration
window.addEventListener('error', (event) => {
  silentLogger.error('app', `Global error: ${event.error?.message || event.message}`, {
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    stack: event.error?.stack
  });
});

window.addEventListener('unhandledrejection', (event) => {
  silentLogger.error('app', `Unhandled promise rejection: ${event.reason}`, {
    reason: event.reason
  });
});

// Network monitoring integration
const originalFetch = window.fetch;
window.fetch = async (...args) => {
  const startTime = Date.now();
  const url = typeof args[0] === 'string' ? args[0] : 
             args[0] instanceof Request ? args[0].url : 
             args[0] instanceof URL ? args[0].href : 'unknown';
  const method = args[1]?.method || 'GET';

  try {
    const response = await originalFetch(...args);
    const duration = Date.now() - startTime;
    
    silentLogger.network(url, method, response.status, duration);
    
    return response;
  } catch (error) {
    const duration = Date.now() - startTime;
    silentLogger.network(url, method, 0, duration);
    silentLogger.error('network', `Fetch failed: ${error}`, { url, method });
    throw error;
  }
};