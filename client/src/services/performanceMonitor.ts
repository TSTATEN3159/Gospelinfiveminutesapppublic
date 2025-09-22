/**
 * Apple-Compliant Performance Monitoring Service
 * Tracks app performance without affecting user experience
 * Privacy-focused, no user data collection
 */

import { silentLogger } from './silentLogger';

interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  category: 'navigation' | 'render' | 'api' | 'memory' | 'user';
}

interface PerformanceThreshold {
  metric: string;
  warning: number;
  critical: number;
}

class PerformanceMonitor {
  private readonly thresholds: PerformanceThreshold[] = [
    { metric: 'page_load', warning: 3000, critical: 5000 },
    { metric: 'api_response', warning: 2000, critical: 5000 },
    { metric: 'component_render', warning: 100, critical: 500 },
    { metric: 'memory_heap', warning: 50, critical: 80 }, // MB
    { metric: 'user_interaction', warning: 100, critical: 300 }
  ];

  private readonly metrics: PerformanceMetric[] = [];
  private observerActive = false;

  constructor() {
    this.initializeMonitoring();
  }

  /**
   * Initialize Apple-compliant performance monitoring
   */
  private initializeMonitoring(): void {
    // Navigation timing
    this.trackNavigationTiming();
    
    // User interaction timing
    this.trackUserInteractions();
    
    // Memory usage monitoring
    this.trackMemoryUsage();
    
    // Core Web Vitals
    this.trackCoreWebVitals();

    silentLogger.info('performance', 'Performance monitoring initialized');
  }

  /**
   * Track page load and navigation performance
   */
  private trackNavigationTiming(): void {
    if (typeof window !== 'undefined' && 'performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          
          if (navigation) {
            const loadTime = navigation.loadEventEnd - navigation.fetchStart;
            const domComplete = navigation.domComplete - navigation.fetchStart;
            const firstPaint = this.getFirstPaint();

            this.recordMetric('page_load', loadTime, 'navigation');
            this.recordMetric('dom_complete', domComplete, 'navigation');
            
            if (firstPaint) {
              this.recordMetric('first_paint', firstPaint, 'render');
            }

            silentLogger.performance('page_load', loadTime, {
              domComplete,
              firstPaint
            });
          }
        }, 100);
      });
    }
  }

  /**
   * Track user interaction response times
   */
  private trackUserInteractions(): void {
    if (typeof window !== 'undefined') {
      const interactionEvents = ['click', 'touchstart', 'keydown'];
      
      interactionEvents.forEach(eventType => {
        document.addEventListener(eventType, (event) => {
          const startTime = performance.now();
          
          // Use requestAnimationFrame to measure render time
          requestAnimationFrame(() => {
            const endTime = performance.now();
            const interactionTime = endTime - startTime;
            
            if (interactionTime > 16) { // Only track slower interactions
              this.recordMetric('user_interaction', interactionTime, 'user');
              
              const target = event.target as Element;
              const elementInfo = target?.tagName || 'unknown';
              
              silentLogger.userAction(eventType, elementInfo, {
                responseTime: interactionTime
              });
            }
          });
        });
      });
    }
  }

  /**
   * Monitor memory usage
   */
  private trackMemoryUsage(): void {
    if (typeof window !== 'undefined' && 'performance' in window && 'memory' in (performance as any)) {
      const checkMemory = () => {
        const memory = (performance as any).memory;
        const heapUsed = Math.round(memory.usedJSHeapSize / 1024 / 1024); // MB
        const heapTotal = Math.round(memory.totalJSHeapSize / 1024 / 1024); // MB
        const heapPercent = Math.round((heapUsed / heapTotal) * 100);

        this.recordMetric('memory_heap', heapPercent, 'memory');

        // Log memory warnings
        const threshold = this.thresholds.find(t => t.metric === 'memory_heap');
        if (threshold) {
          if (heapPercent > threshold.critical) {
            silentLogger.warn('performance', `Critical memory usage: ${heapPercent}%`, {
              heapUsed,
              heapTotal
            });
          } else if (heapPercent > threshold.warning) {
            silentLogger.info('performance', `High memory usage: ${heapPercent}%`, {
              heapUsed,
              heapTotal
            });
          }
        }
      };

      // Check memory every 30 seconds
      setInterval(checkMemory, 30000);
      checkMemory(); // Initial check
    }
  }

  /**
   * Track Core Web Vitals
   */
  private trackCoreWebVitals(): void {
    if (typeof window !== 'undefined') {
      // Track Largest Contentful Paint (LCP)
      this.trackLCP();
      
      // Track First Input Delay (FID)
      this.trackFID();
      
      // Track Cumulative Layout Shift (CLS)
      this.trackCLS();
    }
  }

  /**
   * Track Largest Contentful Paint
   */
  private trackLCP(): void {
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          
          if (lastEntry) {
            this.recordMetric('lcp', lastEntry.startTime, 'render');
            silentLogger.performance('largest_contentful_paint', lastEntry.startTime);
          }
        });

        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (error) {
        silentLogger.debug('performance', 'LCP tracking not supported');
      }
    }
  }

  /**
   * Track First Input Delay
   */
  private trackFID(): void {
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            this.recordMetric('fid', (entry as any).processingStart - entry.startTime, 'user');
            silentLogger.performance('first_input_delay', (entry as any).processingStart - entry.startTime);
          });
        });

        observer.observe({ entryTypes: ['first-input'] });
      } catch (error) {
        silentLogger.debug('performance', 'FID tracking not supported');
      }
    }
  }

  /**
   * Track Cumulative Layout Shift
   */
  private trackCLS(): void {
    if ('PerformanceObserver' in window) {
      try {
        let clsScore = 0;
        
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (!(entry as any).hadRecentInput) {
              clsScore += (entry as any).value;
            }
          });
          
          this.recordMetric('cls', clsScore, 'render');
          silentLogger.performance('cumulative_layout_shift', clsScore);
        });

        observer.observe({ entryTypes: ['layout-shift'] });
      } catch (error) {
        silentLogger.debug('performance', 'CLS tracking not supported');
      }
    }
  }

  /**
   * Get first paint timing
   */
  private getFirstPaint(): number | null {
    if ('performance' in window) {
      const paintEntries = performance.getEntriesByType('paint');
      const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
      return firstPaint ? firstPaint.startTime : null;
    }
    return null;
  }

  /**
   * Record a performance metric
   */
  private recordMetric(name: string, value: number, category: PerformanceMetric['category']): void {
    const metric: PerformanceMetric = {
      name,
      value,
      timestamp: Date.now(),
      category
    };

    this.metrics.push(metric);

    // Rotate metrics (keep last 1000)
    if (this.metrics.length > 1000) {
      this.metrics.splice(0, this.metrics.length - 1000);
    }

    // Check thresholds
    this.checkThreshold(metric);
  }

  /**
   * Check if metric exceeds performance thresholds
   */
  private checkThreshold(metric: PerformanceMetric): void {
    const threshold = this.thresholds.find(t => t.metric === metric.name);
    if (!threshold) return;

    if (metric.value > threshold.critical) {
      silentLogger.warn('performance', 
        `Critical performance issue: ${metric.name} = ${metric.value}ms (threshold: ${threshold.critical}ms)`);
    } else if (metric.value > threshold.warning) {
      silentLogger.info('performance', 
        `Performance warning: ${metric.name} = ${metric.value}ms (threshold: ${threshold.warning}ms)`);
    }
  }

  /**
   * Track API call performance
   */
  public trackAPICall(url: string, duration: number, success: boolean): void {
    this.recordMetric('api_response', duration, 'api');
    
    const threshold = this.thresholds.find(t => t.metric === 'api_response');
    if (threshold && duration > threshold.warning) {
      silentLogger.performance('slow_api_call', duration, {
        url: url.split('?')[0], // Remove query params
        success
      });
    }
  }

  /**
   * Track component render performance
   */
  public trackComponentRender(componentName: string, duration: number): void {
    this.recordMetric('component_render', duration, 'render');
    
    const threshold = this.thresholds.find(t => t.metric === 'component_render');
    if (threshold && duration > threshold.warning) {
      silentLogger.performance('slow_component_render', duration, {
        component: componentName
      });
    }
  }

  /**
   * Get performance summary for health monitoring
   */
  public getPerformanceSummary(): Record<string, any> {
    const now = Date.now();
    const recentMetrics = this.metrics.filter(m => now - m.timestamp < 5 * 60 * 1000); // Last 5 minutes

    const summary: Record<string, any> = {
      totalMetrics: this.metrics.length,
      recentMetrics: recentMetrics.length
    };

    // Calculate averages for each metric type
    const metricTypes = Array.from(new Set(recentMetrics.map(m => m.name)));
    metricTypes.forEach(type => {
      const typeMetrics = recentMetrics.filter(m => m.name === type);
      if (typeMetrics.length > 0) {
        const average = typeMetrics.reduce((sum, m) => sum + m.value, 0) / typeMetrics.length;
        summary[`avg_${type}`] = Math.round(average);
      }
    });

    return summary;
  }

  /**
   * Clear all metrics (for privacy compliance)
   */
  public clearMetrics(): void {
    this.metrics.length = 0;
    silentLogger.info('performance', 'Performance metrics cleared');
  }
}

// Create global performance monitor instance
export const performanceMonitor = new PerformanceMonitor();

// Export React hook for component performance tracking
export function usePerformanceTracking(componentName: string) {
  return {
    trackRender: (duration: number) => {
      performanceMonitor.trackComponentRender(componentName, duration);
    }
  };
}