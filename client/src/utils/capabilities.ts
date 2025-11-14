/**
 * Browser Capability Checks
 * 
 * Always check if a capability exists before using it.
 * Never assume a browser API is available.
 * 
 * Usage:
 * ```typescript
 * import { capabilities } from '@/utils/capabilities';
 * 
 * if (!capabilities.textToSpeech) {
 *   return <p>Audio not available on this device.</p>;
 * }
 * ```
 */

// Explicit import to prevent tree-shaking in native builds
// This ensures @capacitor/core stays in the bundle for iOS/Android
import type { CapacitorGlobal } from '@capacitor/core';

declare global {
  interface Window {
    Capacitor?: CapacitorGlobal;
  }
}

export const capabilities = {
  /**
   * Check if localStorage is available
   * Some browsers block it in private mode or have it disabled
   */
  get localStorage(): boolean {
    if (typeof window === 'undefined') return false;
    try {
      const test = '__storage_test__';
      window.localStorage.setItem(test, test);
      window.localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Check if sessionStorage is available
   */
  get sessionStorage(): boolean {
    if (typeof window === 'undefined') return false;
    try {
      const test = '__storage_test__';
      window.sessionStorage.setItem(test, test);
      window.sessionStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Check if Web Share API is available
   */
  get share(): boolean {
    return typeof navigator !== 'undefined' && 'share' in navigator;
  },

  /**
   * Check if Clipboard API is available
   */
  get clipboard(): boolean {
    return typeof navigator !== 'undefined' && 'clipboard' in navigator;
  },

  /**
   * Check if Text-to-Speech (SpeechSynthesis) is available
   */
  get textToSpeech(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  },

  /**
   * Check if Speech Recognition is available
   */
  get speechRecognition(): boolean {
    return (
      typeof window !== 'undefined' &&
      ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)
    );
  },

  /**
   * Check if Notifications API is available
   */
  get notifications(): boolean {
    return typeof window !== 'undefined' && 'Notification' in window;
  },

  /**
   * Check if Geolocation API is available
   */
  get geolocation(): boolean {
    return typeof navigator !== 'undefined' && 'geolocation' in navigator;
  },

  /**
   * Check if Camera (getUserMedia) is available
   */
  get camera(): boolean {
    return (
      typeof navigator !== 'undefined' &&
      typeof navigator.mediaDevices !== 'undefined' &&
      'getUserMedia' in navigator.mediaDevices
    );
  },

  /**
   * Check if Microphone (getUserMedia) is available
   */
  get microphone(): boolean {
    return (
      typeof navigator !== 'undefined' &&
      typeof navigator.mediaDevices !== 'undefined' &&
      'getUserMedia' in navigator.mediaDevices
    );
  },

  /**
   * Check if Service Worker is available
   */
  get serviceWorker(): boolean {
    return typeof navigator !== 'undefined' && 'serviceWorker' in navigator;
  },

  /**
   * Check if IndexedDB is available
   */
  get indexedDB(): boolean {
    return typeof window !== 'undefined' && 'indexedDB' in window;
  },

  /**
   * Check if online/offline detection is available
   */
  get onlineStatus(): boolean {
    return typeof navigator !== 'undefined' && 'onLine' in navigator;
  },

  /**
   * Check if Capacitor Local Notifications are available (native iOS/Android)
   */
  get capacitorNotifications(): boolean {
    try {
      if (typeof window === 'undefined') return false;
      if (typeof (window as any).Capacitor === 'undefined') return false;
      
      const platform = (window as any).Capacitor.getPlatform();
      return platform === 'ios' || platform === 'android';
    } catch {
      return false;
    }
  },
};

/**
 * Safe wrapper for localStorage operations
 * Returns null/undefined if localStorage is not available
 */
export const safeLocalStorage = {
  getItem(key: string): string | null {
    if (!capabilities.localStorage) return null;
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },

  setItem(key: string, value: string): boolean {
    if (!capabilities.localStorage) return false;
    try {
      window.localStorage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  },

  removeItem(key: string): boolean {
    if (!capabilities.localStorage) return false;
    try {
      window.localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  },

  clear(): boolean {
    if (!capabilities.localStorage) return false;
    try {
      window.localStorage.clear();
      return true;
    } catch {
      return false;
    }
  },
};

/**
 * Safe wrapper for clipboard operations
 */
export const safeClipboard = {
  async writeText(text: string): Promise<boolean> {
    if (!capabilities.clipboard) {
      console.warn('Clipboard API not available');
      return false;
    }
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.error('Failed to write to clipboard:', error);
      return false;
    }
  },

  async readText(): Promise<string | null> {
    if (!capabilities.clipboard) {
      console.warn('Clipboard API not available');
      return null;
    }
    try {
      return await navigator.clipboard.readText();
    } catch (error) {
      console.error('Failed to read from clipboard:', error);
      return null;
    }
  },
};

/**
 * Safe wrapper for share API
 * Returns: 'shared' | 'copied' | 'failed'
 */
export const safeShare = async (data: ShareData): Promise<'shared' | 'copied' | 'failed'> => {
  if (!capabilities.share) {
    console.warn('Share API not available, falling back to clipboard');
    
    // Fallback to clipboard if available
    const textToCopy = data.url || data.text;
    if (textToCopy) {
      const copied = await safeClipboard.writeText(textToCopy);
      return copied ? 'copied' : 'failed';
    }
    
    return 'failed';
  }

  try {
    await navigator.share(data);
    return 'shared';
  } catch (error) {
    // User cancelled share or error occurred
    console.error('Share failed:', error);
    return 'failed';
  }
};
