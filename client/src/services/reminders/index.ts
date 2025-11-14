import { capabilities, safeLocalStorage } from '@/utils/capabilities';
import { NativeNotificationAdapter } from './nativeNotifications';
import { WebNotificationAdapter } from './webNotifications';
import type {
  INotificationAdapter,
  ReminderPreferences,
  NotificationChannel,
  PermissionResult,
} from './types';

export * from './types';

const REMINDER_PREFS_KEY = 'gospel-app-reminder-preferences';

const DEFAULT_PREFERENCES: ReminderPreferences = {
  dailyVerse: {
    enabled: false,
    time: '08:00',
  },
  readingPlan: {
    enabled: false,
    time: '19:00',
  },
};

class ReminderManager {
  private adapter: INotificationAdapter;
  private preferences: ReminderPreferences;

  constructor() {
    this.adapter = capabilities.capacitorNotifications
      ? new NativeNotificationAdapter()
      : new WebNotificationAdapter();
    
    this.preferences = this.loadPreferences();
  }

  private loadPreferences(): ReminderPreferences {
    const stored = safeLocalStorage.getItem(REMINDER_PREFS_KEY);
    if (!stored) return { ...DEFAULT_PREFERENCES };

    try {
      return JSON.parse(stored) as ReminderPreferences;
    } catch {
      return { ...DEFAULT_PREFERENCES };
    }
  }

  private savePreferences(): void {
    safeLocalStorage.setItem(REMINDER_PREFS_KEY, JSON.stringify(this.preferences));
  }

  async checkPermission(): Promise<PermissionResult> {
    return this.adapter.checkPermission();
  }

  async requestPermission(): Promise<PermissionResult> {
    return this.adapter.requestPermission();
  }

  async upsertReminder(
    channel: NotificationChannel,
    enabled: boolean,
    time: string
  ): Promise<{ success: boolean; message: string }> {
    this.preferences[channel] = { enabled, time };
    this.savePreferences();

    if (!enabled) {
      const canceled = await this.adapter.cancelReminder(channel);
      return {
        success: canceled,
        message: canceled ? `${channel} reminder disabled` : 'Failed to cancel reminder',
      };
    }

    const permission = await this.adapter.checkPermission();
    if (permission !== 'granted') {
      const granted = await this.adapter.requestPermission();
      if (granted !== 'granted') {
        this.preferences[channel].enabled = false;
        this.savePreferences();
        return {
          success: false,
          message: 'Notification permission not granted',
        };
      }
    }

    const [hourStr, minuteStr] = time.split(':');
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);

    const scheduled = await this.adapter.scheduleReminder({
      channel,
      title: channel === 'dailyVerse' ? 'Daily Verse' : 'Bible Reading Plan',
      body:
        channel === 'dailyVerse'
          ? 'Your verse of the day is ready. Tap to read and meditate.'
          : 'Time for your daily Bible reading. Stay on track with your plan!',
      hour,
      minute,
    });

    return {
      success: scheduled,
      message: scheduled
        ? `${channel} reminder scheduled for ${time}`
        : `Failed to schedule ${channel} reminder`,
    };
  }

  async cancelReminder(channel: NotificationChannel): Promise<boolean> {
    this.preferences[channel].enabled = false;
    this.savePreferences();
    return this.adapter.cancelReminder(channel);
  }

  async testNotification(): Promise<{ success: boolean; message: string }> {
    const permission = await this.adapter.checkPermission();
    
    if (permission !== 'granted') {
      const granted = await this.adapter.requestPermission();
      if (granted !== 'granted') {
        return {
          success: false,
          message: 'Notification permission not granted',
        };
      }
    }

    const presented = await this.adapter.presentNow(
      'Test Notification',
      'Reminders are working! You\'ll receive your next reminder at the scheduled time.'
    );

    return {
      success: presented,
      message: presented
        ? 'Test notification sent successfully!'
        : 'Failed to send test notification',
    };
  }

  async initializeFromStorage(): Promise<void> {
    for (const channel of ['dailyVerse', 'readingPlan'] as NotificationChannel[]) {
      const pref = this.preferences[channel];
      if (pref.enabled) {
        await this.upsertReminder(channel, true, pref.time);
      }
    }
  }

  getPreferences(): ReminderPreferences {
    return { ...this.preferences };
  }

  isNativeNotifications(): boolean {
    return capabilities.capacitorNotifications;
  }
}

export const reminderManager = new ReminderManager();
