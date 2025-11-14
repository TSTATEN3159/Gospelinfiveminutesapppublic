export type NotificationChannel = 'dailyVerse' | 'readingPlan';

export type PermissionResult = 'granted' | 'denied' | 'default' | 'unsupported';

export interface ScheduleReminderParams {
  channel: NotificationChannel;
  title: string;
  body: string;
  hour: number;
  minute: number;
}

export interface ReminderPreference {
  enabled: boolean;
  time: string;
}

export interface ReminderPreferences {
  dailyVerse: ReminderPreference;
  readingPlan: ReminderPreference;
}

export interface INotificationAdapter {
  checkPermission(): Promise<PermissionResult>;
  requestPermission(): Promise<PermissionResult>;
  scheduleReminder(params: ScheduleReminderParams): Promise<boolean>;
  cancelReminder(channel: NotificationChannel): Promise<boolean>;
  presentNow(title: string, body: string): Promise<boolean>;
  supportsChannel(channel: NotificationChannel): boolean;
}
