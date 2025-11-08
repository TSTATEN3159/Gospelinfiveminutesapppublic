import { Capacitor, registerPlugin } from '@capacitor/core';

interface WidgetData {
  verse: string;
  reference: string;
  theme?: 'faith' | 'love' | 'hope' | 'peace' | 'wisdom';
}

interface WidgetUpdateResponse {
  success: boolean;
  message?: string;
  nextUpdate?: number;
  secondsUntilUpdate?: number;
}

interface WidgetDataResponse {
  verse: string;
  reference: string;
  theme: string;
  lastUpdated: number;
}

interface WidgetUpdaterPlugin {
  updateDailyVerse(data: WidgetData): Promise<WidgetUpdateResponse>;
  scheduleNextUpdate(): Promise<WidgetUpdateResponse>;
  getWidgetData(): Promise<WidgetDataResponse>;
}

const WidgetUpdater = registerPlugin<WidgetUpdaterPlugin>('WidgetUpdaterPlugin', {
  web: () => ({
    updateDailyVerse: async () => ({ success: false, message: 'Not available on web' }),
    scheduleNextUpdate: async () => ({ success: false, message: 'Not available on web' }),
    getWidgetData: async () => ({ verse: '', reference: '', theme: 'faith', lastUpdated: 0 }),
  }),
});

class WidgetUpdaterService {

  /**
   * Update the iOS widget with new daily verse
   */
  async updateDailyVerse(data: WidgetData): Promise<WidgetUpdateResponse> {
    if (!Capacitor.isNativePlatform()) {
      console.log('[WidgetUpdater] Web platform - skipping widget update');
      return { success: false, message: 'Not available on web platform' };
    }

    try {
      const result = await WidgetUpdater.updateDailyVerse({
        verse: data.verse,
        reference: data.reference,
        theme: data.theme || 'faith'
      });

      console.log('[WidgetUpdater] Widget updated:', result);
      return result;
    } catch (error) {
      console.error('[WidgetUpdater] Update error:', error);
      return { success: false, message: String(error) };
    }
  }

  /**
   * Schedule the next widget update at midnight
   */
  async scheduleNextUpdate(): Promise<WidgetUpdateResponse> {
    if (!Capacitor.isNativePlatform()) {
      console.log('[WidgetUpdater] Web platform - skipping schedule');
      return { success: false, message: 'Not available on web platform' };
    }

    try {
      const result = await WidgetUpdater.scheduleNextUpdate();
      console.log('[WidgetUpdater] Next update scheduled:', result);
      return result;
    } catch (error) {
      console.error('[WidgetUpdater] Schedule error:', error);
      return { success: false, message: String(error) };
    }
  }

  /**
   * Get current widget data
   */
  async getWidgetData(): Promise<WidgetDataResponse | null> {
    if (!Capacitor.isNativePlatform()) {
      console.log('[WidgetUpdater] Web platform - no widget data');
      return null;
    }

    try {
      const result = await WidgetUpdater.getWidgetData();
      return result;
    } catch (error) {
      console.error('[WidgetUpdater] Get data error:', error);
      return null;
    }
  }

  /**
   * Determine verse theme based on content
   */
  determineTheme(verse: string, reference: string): 'faith' | 'love' | 'hope' | 'peace' | 'wisdom' {
    const lowerVerse = verse.toLowerCase();
    const lowerRef = reference.toLowerCase();
    
    // Love keywords
    if (lowerVerse.includes('love') || lowerVerse.includes('beloved') || 
        lowerRef.includes('1 john') || lowerRef.includes('1 corinthians 13')) {
      return 'love';
    }
    
    // Peace keywords
    if (lowerVerse.includes('peace') || lowerVerse.includes('rest') || 
        lowerVerse.includes('anxiety') || lowerVerse.includes('worry')) {
      return 'peace';
    }
    
    // Hope keywords
    if (lowerVerse.includes('hope') || lowerVerse.includes('promise') || 
        lowerVerse.includes('future')) {
      return 'hope';
    }
    
    // Wisdom keywords  
    if (lowerVerse.includes('wisdom') || lowerVerse.includes('understanding') || 
        lowerRef.includes('proverbs') || lowerRef.includes('james')) {
      return 'wisdom';
    }
    
    // Default to faith
    return 'faith';
  }
}

export const widgetUpdater = new WidgetUpdaterService();
