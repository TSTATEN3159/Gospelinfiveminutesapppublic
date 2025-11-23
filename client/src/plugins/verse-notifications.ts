import { registerPlugin } from '@capacitor/core';

export interface VerseNotificationsPlugin {
  scheduleDaily(options: {
    verseText: string;
    reference: string;
    hour?: number;
    minute?: number;
  }): Promise<void>;
  cancelAll(): Promise<void>;
}

const VerseNotifications = registerPlugin<VerseNotificationsPlugin>('VerseNotifications');

export default VerseNotifications;
