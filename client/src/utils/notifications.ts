import {
  LocalNotifications,
  PermissionStatus,
} from "@capacitor/local-notifications";

export async function requestNotificationPermission(): Promise<boolean> {
  try {
    const permStatus: PermissionStatus = await LocalNotifications.checkPermissions();

    if (permStatus.display === "granted") {
      return true;
    }

    const newStatus = await LocalNotifications.requestPermissions();
    return newStatus.display === "granted";
  } catch (error) {
    console.error("Error requesting notification permission:", error);
    return false;
  }
}

export type ScheduleDailyReminderOptions = {
  id: number;
  hour: number;
  minute: number;
  title: string;
  body: string;
};

export async function scheduleDailyReminder(options: ScheduleDailyReminderOptions): Promise<void> {
  const granted = await requestNotificationPermission();
  if (!granted) {
    throw new Error("Notification permission not granted");
  }

  const { id, hour, minute, title, body } = options;

  await LocalNotifications.schedule({
    notifications: [
      {
        id,
        title,
        body,
        schedule: {
          repeats: true,
          on: { hour, minute },
        },
        sound: undefined,
      },
    ],
  });
}

export async function cancelReminder(id: number): Promise<void> {
  try {
    await LocalNotifications.cancel({ notifications: [{ id }] });
  } catch (error) {
    console.error("Error canceling reminder:", error);
    throw error;
  }
}

export const NOTIFICATION_IDS = {
  DAILY_VERSE: 1,
  READING_PLAN: 2,
} as const;
