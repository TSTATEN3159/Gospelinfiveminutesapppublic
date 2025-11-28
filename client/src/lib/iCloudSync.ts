import { Capacitor, registerPlugin } from '@capacitor/core';

interface iCloudAvailability {
  available: boolean;
  status: 'available' | 'noAccount' | 'restricted' | 'couldNotDetermine' | 'temporarilyUnavailable' | 'unknown';
}

interface SaveResult {
  success: boolean;
  key: string;
  timestamp: number;
}

interface LoadResult {
  found: boolean;
  key: string;
  value?: string;
  lastModified?: number;
}

interface DeleteResult {
  success: boolean;
  key: string;
}

interface SyncResult {
  success: boolean;
  data: LoadResult[];
  timestamp: number;
}

interface LastSyncResult {
  timestamp: number;
  hasSync: boolean;
}

interface iCloudSyncPlugin {
  isAvailable(): Promise<iCloudAvailability>;
  saveData(options: { key: string; value: string }): Promise<SaveResult>;
  loadData(options: { key: string }): Promise<LoadResult>;
  deleteData(options: { key: string }): Promise<DeleteResult>;
  syncAll(): Promise<SyncResult>;
  getLastSyncTime(): Promise<LastSyncResult>;
}

const iCloudSyncNative = registerPlugin<iCloudSyncPlugin>('iCloudSync', {
  web: () => ({
    isAvailable: async () => ({ available: false, status: 'unknown' as const }),
    saveData: async () => ({ success: false, key: '', timestamp: 0 }),
    loadData: async () => ({ found: false, key: '' }),
    deleteData: async () => ({ success: false, key: '' }),
    syncAll: async () => ({ success: false, data: [], timestamp: 0 }),
    getLastSyncTime: async () => ({ timestamp: 0, hasSync: false }),
  }),
});

// Sync keys that we track
type SyncKey = 'bookmarks' | 'notes' | 'readingProgress' | 'settings' | 'streakData' | 'triviaStats';

class iCloudSyncService {
  private isSyncing = false;
  private syncEnabled = true;

  /**
   * Check if iCloud is available
   */
  async isAvailable(): Promise<iCloudAvailability> {
    if (!Capacitor.isNativePlatform()) {
      return { available: false, status: 'unknown' };
    }

    try {
      return await iCloudSyncNative.isAvailable();
    } catch (error) {
      console.error('[iCloudSync] Availability check failed:', error);
      return { available: false, status: 'unknown' };
    }
  }

  /**
   * Enable or disable sync
   */
  setSyncEnabled(enabled: boolean): void {
    this.syncEnabled = enabled;
    localStorage.setItem('iCloudSyncEnabled', String(enabled));
  }

  /**
   * Check if sync is enabled
   */
  isSyncEnabled(): boolean {
    const stored = localStorage.getItem('iCloudSyncEnabled');
    return stored !== 'false';
  }

  /**
   * Save data to iCloud
   */
  async save(key: SyncKey, data: unknown): Promise<boolean> {
    if (!Capacitor.isNativePlatform() || !this.isSyncEnabled()) {
      return false;
    }

    try {
      const value = JSON.stringify(data);
      const result = await iCloudSyncNative.saveData({ key, value });
      console.log(`[iCloudSync] Saved ${key}:`, result.success);
      return result.success;
    } catch (error) {
      console.error(`[iCloudSync] Save ${key} failed:`, error);
      return false;
    }
  }

  /**
   * Load data from iCloud
   */
  async load<T>(key: SyncKey): Promise<T | null> {
    if (!Capacitor.isNativePlatform() || !this.isSyncEnabled()) {
      return null;
    }

    try {
      const result = await iCloudSyncNative.loadData({ key });
      if (result.found && result.value) {
        return JSON.parse(result.value) as T;
      }
      return null;
    } catch (error) {
      console.error(`[iCloudSync] Load ${key} failed:`, error);
      return null;
    }
  }

  /**
   * Delete data from iCloud
   */
  async delete(key: SyncKey): Promise<boolean> {
    if (!Capacitor.isNativePlatform()) {
      return false;
    }

    try {
      const result = await iCloudSyncNative.deleteData({ key });
      return result.success;
    } catch (error) {
      console.error(`[iCloudSync] Delete ${key} failed:`, error);
      return false;
    }
  }

  /**
   * Sync all data from iCloud
   */
  async syncFromCloud(): Promise<boolean> {
    if (!Capacitor.isNativePlatform() || !this.isSyncEnabled() || this.isSyncing) {
      return false;
    }

    this.isSyncing = true;

    try {
      const result = await iCloudSyncNative.syncAll();
      
      if (result.success) {
        for (const item of result.data) {
          if (item.found && item.value) {
            // Check if cloud data is newer
            const localKey = `gospelApp_${item.key}`;
            const localData = localStorage.getItem(localKey);
            const localTimestamp = localStorage.getItem(`${localKey}_timestamp`);
            
            if (!localData || !localTimestamp || (item.lastModified && item.lastModified > parseFloat(localTimestamp))) {
              // Cloud data is newer, update local
              localStorage.setItem(localKey, item.value);
              localStorage.setItem(`${localKey}_timestamp`, String(item.lastModified));
              console.log(`[iCloudSync] Updated local ${item.key} from cloud`);
            }
          }
        }
        
        localStorage.setItem('lastCloudSync', String(result.timestamp));
        console.log('[iCloudSync] Sync completed:', result.timestamp);
      }

      this.isSyncing = false;
      return result.success;
    } catch (error) {
      console.error('[iCloudSync] Sync failed:', error);
      this.isSyncing = false;
      return false;
    }
  }

  /**
   * Push local data to iCloud
   */
  async pushToCloud(): Promise<boolean> {
    if (!Capacitor.isNativePlatform() || !this.isSyncEnabled()) {
      return false;
    }

    const keysToSync: SyncKey[] = ['bookmarks', 'notes', 'readingProgress', 'settings', 'streakData', 'triviaStats'];
    let success = true;

    for (const key of keysToSync) {
      const localKey = `gospelApp_${key}`;
      const localData = localStorage.getItem(localKey);
      
      if (localData) {
        try {
          const result = await iCloudSyncNative.saveData({ key, value: localData });
          if (result.success) {
            localStorage.setItem(`${localKey}_timestamp`, String(result.timestamp));
          } else {
            success = false;
          }
        } catch (error) {
          console.error(`[iCloudSync] Push ${key} failed:`, error);
          success = false;
        }
      }
    }

    return success;
  }

  /**
   * Get last sync time
   */
  async getLastSyncTime(): Promise<Date | null> {
    if (!Capacitor.isNativePlatform()) {
      return null;
    }

    try {
      const result = await iCloudSyncNative.getLastSyncTime();
      if (result.hasSync) {
        return new Date(result.timestamp * 1000);
      }
      return null;
    } catch (error) {
      console.error('[iCloudSync] Get last sync time failed:', error);
      return null;
    }
  }

  /**
   * Sync bookmarks specifically
   */
  async syncBookmarks(bookmarks: string[]): Promise<boolean> {
    return this.save('bookmarks', bookmarks);
  }

  /**
   * Sync notes specifically
   */
  async syncNotes(notes: Array<{ ref: string; text: string }>): Promise<boolean> {
    return this.save('notes', notes);
  }

  /**
   * Sync reading progress
   */
  async syncReadingProgress(progress: Record<string, unknown>): Promise<boolean> {
    return this.save('readingProgress', progress);
  }

  /**
   * Sync settings
   */
  async syncSettings(settings: Record<string, unknown>): Promise<boolean> {
    return this.save('settings', settings);
  }
}

export const iCloudSync = new iCloudSyncService();
