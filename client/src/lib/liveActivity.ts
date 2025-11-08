import { Capacitor, registerPlugin } from '@capacitor/core';

interface LiveActivityResponse {
  success: boolean;
  activityId?: string;
  nextUpdate?: number;
  updated?: number;
  stopped?: number;
}

interface LiveActivitySupport {
  supported: boolean;
  enabled: boolean;
}

interface LiveActivityManagerPlugin {
  isLiveActivitySupported(): Promise<LiveActivitySupport>;
  startCountdown(options: { verse: string; reference: string }): Promise<LiveActivityResponse>;
  updateCountdown(options: { verse: string; reference: string }): Promise<LiveActivityResponse>;
  stopCountdown(): Promise<LiveActivityResponse>;
}

const LiveActivityManager = registerPlugin<LiveActivityManagerPlugin>('LiveActivityManagerPlugin', {
  web: () => ({
    isLiveActivitySupported: async () => ({ supported: false, enabled: false }),
    startCountdown: async () => ({ success: false }),
    updateCountdown: async () => ({ success: false }),
    stopCountdown: async () => ({ success: false }),
  }),
});

class LiveActivityService {
  /**
   * Check if Live Activities are supported and enabled
   */
  async isSupported(): Promise<LiveActivitySupport> {
    if (!Capacitor.isNativePlatform()) {
      return { supported: false, enabled: false };
    }

    try {
      const result = await LiveActivityManager.isLiveActivitySupported();
      return result;
    } catch (error) {
      console.error('[LiveActivity] Support check error:', error);
      return { supported: false, enabled: false };
    }
  }

  /**
   * Start the midnight verse countdown Live Activity
   */
  async startCountdown(verse: string, reference: string): Promise<LiveActivityResponse> {
    if (!Capacitor.isNativePlatform()) {
      console.log('[LiveActivity] Web platform - skipping');
      return { success: false };
    }

    try {
      const result = await LiveActivityManager.startCountdown({ verse, reference });
      console.log('[LiveActivity] Started countdown:', result);
      return result;
    } catch (error) {
      console.error('[LiveActivity] Start error:', error);
      return { success: false };
    }
  }

  /**
   * Update active Live Activity with new verse
   */
  async updateCountdown(verse: string, reference: string): Promise<LiveActivityResponse> {
    if (!Capacitor.isNativePlatform()) {
      console.log('[LiveActivity] Web platform - skipping update');
      return { success: false };
    }

    try {
      const result = await LiveActivityManager.updateCountdown({ verse, reference });
      console.log('[LiveActivity] Updated countdown:', result);
      return result;
    } catch (error) {
      console.error('[LiveActivity] Update error:', error);
      return { success: false };
    }
  }

  /**
   * Stop all active Live Activities
   */
  async stopCountdown(): Promise<LiveActivityResponse> {
    if (!Capacitor.isNativePlatform()) {
      console.log('[LiveActivity] Web platform - skipping stop');
      return { success: false };
    }

    try {
      const result = await LiveActivityManager.stopCountdown();
      console.log('[LiveActivity] Stopped countdown:', result);
      return result;
    } catch (error) {
      console.error('[LiveActivity] Stop error:', error);
      return { success: false };
    }
  }
}

export const liveActivity = new LiveActivityService();
