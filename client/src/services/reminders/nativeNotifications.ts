import { LocalNotifications } from '@capacitor/local-notifications';
import {
  NOTIFICATION_IDS,
  requestNotificationPermission,
  scheduleDailyReminder,
  cancelReminder as cancelCapacitorReminder,
} from '@/utils/notifications';
import type {
  INotificationAdapter,
  PermissionResult,
  ScheduleReminderParams,
  NotificationChannel,
} from './types';

const CHANNEL_ID_MAP: Record<NotificationChannel, number> = {
  dailyVerse: NOTIFICATION_IDS.DAILY_VERSE,
  readingPlan: NOTIFICATION_IDS.READING_PLAN,
};

export class NativeNotificationAdapter implements INotificationAdapter {
  async checkPermission(): Promise<PermissionResult> {
    try {
      const permStatus = await LocalNotifications.checkPermissions();
      if (permStatus.display === 'granted') return 'granted';
      if (permStatus.display === 'denied') return 'denied';
      return 'default';
    } catch (error) {
      console.error('Native notification permission check failed:', error);
      return 'unsupported';
    }
  }

  async requestPermission(): Promise<PermissionResult> {
    try {
      const granted = await requestNotificationPermission();
      return granted ? 'granted' : 'denied';
    } catch (error) {
      console.error('Native notification permission request failed:', error);
      return 'unsupported';
    }
  }

  async scheduleReminder(params: ScheduleReminderParams): Promise<boolean> {
    try {
      const id = CHANNEL_ID_MAP[params.channel];
      await scheduleDailyReminder({
        id,
        hour: params.hour,
        minute: params.minute,
        title: params.title,
        body: params.body,
      });
      return true;
    } catch (error) {
      console.error(`Failed to schedule native reminder for ${params.channel}:`, error);
      return false;
    }
  }

  async cancelReminder(channel: NotificationChannel): Promise<boolean> {
    try {
      const id = CHANNEL_ID_MAP[channel];
      await cancelCapacitorReminder(id);
      return true;
    } catch (error) {
      console.error(`Failed to cancel native reminder for ${channel}:`, error);
      return false;
    }
  }

  async presentNow(title: string, body: string): Promise<boolean> {
    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            id: 999,
            title,
            body,
            schedule: { at: new Date(Date.now() + 1000) },
          },
        ],
      });
      return true;
    } catch (error) {
      console.error('Failed to present native notification:', error);
      return false;
    }
  }

  supportsChannel(channel: NotificationChannel): boolean {
    return channel in CHANNEL_ID_MAP;
  }
}
