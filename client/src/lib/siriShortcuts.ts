import { Capacitor, registerPlugin } from '@capacitor/core';

type ShortcutType = 'dailyVerse' | 'randomVerse' | 'prayerTime' | 'searchVerse' | 'bookmarks' | 'trivia';

interface DonateResult {
  success: boolean;
  type: string;
  title: string;
  note?: string;
}

interface PresentResult {
  success: boolean;
  presented: boolean;
}

interface VoiceShortcut {
  identifier: string;
  phrase: string;
  title: string;
  type: string;
}

interface ShortcutsResult {
  shortcuts: VoiceShortcut[];
}

interface DeleteResult {
  success: boolean;
}

interface SiriShortcutsPlugin {
  donateShortcut(options: { type: string; title?: string; suggestedPhrase?: string }): Promise<DonateResult>;
  presentShortcut(options: { type: string }): Promise<PresentResult>;
  getVoiceShortcuts(): Promise<ShortcutsResult>;
  deleteShortcut(options: { identifier: string }): Promise<DeleteResult>;
  addListener(eventName: 'shortcutAdded' | 'shortcutCancelled', callback: (data: unknown) => void): Promise<{ remove: () => void }>;
}

const SiriShortcutsNative = registerPlugin<SiriShortcutsPlugin>('SiriShortcuts', {
  web: () => ({
    donateShortcut: async () => ({ success: false, type: '', title: '' }),
    presentShortcut: async () => ({ success: false, presented: false }),
    getVoiceShortcuts: async () => ({ shortcuts: [] }),
    deleteShortcut: async () => ({ success: false }),
    addListener: async () => ({ remove: () => {} }),
  }),
});

class SiriShortcutsService {
  private listeners: Map<string, () => void> = new Map();

  /**
   * Check if Siri Shortcuts are available
   */
  isAvailable(): boolean {
    return Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'ios';
  }

  /**
   * Donate a shortcut to Siri (makes it available for suggestions)
   */
  async donateShortcut(type: ShortcutType, title?: string, suggestedPhrase?: string): Promise<boolean> {
    if (!this.isAvailable()) {
      console.log('[SiriShortcuts] Not available on this platform');
      return false;
    }

    try {
      const result = await SiriShortcutsNative.donateShortcut({
        type,
        title,
        suggestedPhrase,
      });
      console.log('[SiriShortcuts] Donated:', result);
      return result.success;
    } catch (error) {
      console.error('[SiriShortcuts] Donate error:', error);
      return false;
    }
  }

  /**
   * Present the "Add to Siri" sheet for a shortcut
   */
  async presentAddToSiri(type: ShortcutType): Promise<boolean> {
    if (!this.isAvailable()) {
      return false;
    }

    try {
      const result = await SiriShortcutsNative.presentShortcut({ type });
      return result.presented;
    } catch (error) {
      console.error('[SiriShortcuts] Present error:', error);
      return false;
    }
  }

  /**
   * Get all voice shortcuts the user has set up
   */
  async getVoiceShortcuts(): Promise<VoiceShortcut[]> {
    if (!this.isAvailable()) {
      return [];
    }

    try {
      const result = await SiriShortcutsNative.getVoiceShortcuts();
      return result.shortcuts;
    } catch (error) {
      console.error('[SiriShortcuts] Get shortcuts error:', error);
      return [];
    }
  }

  /**
   * Delete a voice shortcut
   */
  async deleteShortcut(identifier: string): Promise<boolean> {
    if (!this.isAvailable()) {
      return false;
    }

    try {
      const result = await SiriShortcutsNative.deleteShortcut({ identifier });
      return result.success;
    } catch (error) {
      console.error('[SiriShortcuts] Delete error:', error);
      return false;
    }
  }

  /**
   * Donate "Today's Verse" shortcut automatically
   */
  async donateDailyVerse(): Promise<boolean> {
    return this.donateShortcut('dailyVerse', "Today's Bible Verse", "What's today's verse");
  }

  /**
   * Donate "Random Verse" shortcut
   */
  async donateRandomVerse(): Promise<boolean> {
    return this.donateShortcut('randomVerse', 'Random Bible Verse', 'Give me a Bible verse');
  }

  /**
   * Donate "Prayer Time" shortcut
   */
  async donatePrayerTime(): Promise<boolean> {
    return this.donateShortcut('prayerTime', 'Start Prayer Time', 'Start prayer time');
  }

  /**
   * Donate "Bible Trivia" shortcut
   */
  async donateTrivia(): Promise<boolean> {
    return this.donateShortcut('trivia', 'Bible Trivia', 'Start Bible trivia');
  }

  /**
   * Donate all available shortcuts
   */
  async donateAllShortcuts(): Promise<void> {
    if (!this.isAvailable()) {
      return;
    }

    await Promise.all([
      this.donateDailyVerse(),
      this.donateRandomVerse(),
      this.donatePrayerTime(),
      this.donateTrivia(),
    ]);

    console.log('[SiriShortcuts] All shortcuts donated');
  }

  /**
   * Listen for shortcut events
   */
  async onShortcutAdded(callback: (data: { phrase: string; identifier: string }) => void): Promise<void> {
    if (!this.isAvailable()) {
      return;
    }

    const listener = await SiriShortcutsNative.addListener('shortcutAdded', callback as (data: unknown) => void);
    this.listeners.set('shortcutAdded', listener.remove);
  }

  /**
   * Clean up listeners
   */
  removeAllListeners(): void {
    this.listeners.forEach((remove) => remove());
    this.listeners.clear();
  }

  /**
   * Get suggested phrases for display
   */
  getSuggestedPhrases(): Record<ShortcutType, string[]> {
    return {
      dailyVerse: [
        "What's today's verse",
        "Read today's verse",
        "Daily Bible verse",
        "Morning verse",
      ],
      randomVerse: [
        "Give me a Bible verse",
        "Random Scripture",
        "Inspire me with a verse",
      ],
      prayerTime: [
        "Start prayer time",
        "Time to pray",
        "Quiet time",
      ],
      searchVerse: [
        "Search the Bible",
        "Find a verse",
        "Look up Scripture",
      ],
      bookmarks: [
        "Show my saved verses",
        "My bookmarks",
        "Favorite verses",
      ],
      trivia: [
        "Start Bible trivia",
        "Bible quiz",
        "Test my Bible knowledge",
      ],
    };
  }
}

export const siriShortcuts = new SiriShortcutsService();
