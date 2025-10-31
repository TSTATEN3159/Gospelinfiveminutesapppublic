import { LocalNotifications } from '@capacitor/local-notifications';
import { PushNotifications } from '@capacitor/push-notifications';

export interface NotificationPreferences {
  dailyReminders: boolean;
  reminderTime: string;
  readingPlanReminders?: boolean;
  readingPlanTime?: string;
}

export interface NotificationSchedule {
  hour: number;
  minute: number;
}

class NotificationService {
  private static instance: NotificationService;
  private initialized = false;

  private constructor() {}

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  async initialize() {
    if (this.initialized) return true;

    try {
      // Request permissions for local notifications
      const { display } = await LocalNotifications.requestPermissions();
      
      if (display === 'granted') {
        console.log('[Notifications] Permission granted');
        this.initialized = true;
        return true;
      } else {
        console.log('[Notifications] Permission denied');
        return false;
      }
    } catch (error) {
      console.error('[Notifications] Failed to initialize:', error);
      return false;
    }
  }

  async scheduleDailyDevotional(schedule: NotificationSchedule) {
    try {
      const initialized = await this.initialize();
      if (!initialized) return false;
      
      // Cancel existing devotional notifications by ID
      await LocalNotifications.cancel({ notifications: [{ id: 1 }] });

      // Schedule repeating daily notification using 'on' property
      // Note: Using 'on' alone creates a recurring daily notification
      await LocalNotifications.schedule({
        notifications: [
          {
            id: 1,
            title: 'Daily Devotional',
            body: 'Your daily scripture is ready! Start your day with God\'s word.',
            schedule: {
              on: {
                hour: schedule.hour,
                minute: schedule.minute
              },
              allowWhileIdle: true,
            },
            extra: {
              type: 'daily-devotional',
              route: '/daily'
            }
          }
        ]
      });

      console.log('[Notifications] Daily devotional scheduled (repeating daily) at', `${schedule.hour}:${schedule.minute}`);
      return true;
    } catch (error) {
      console.error('[Notifications] Failed to schedule daily devotional:', error);
      return false;
    }
  }

  async scheduleReadingPlanReminder(schedule: NotificationSchedule, planName: string = 'Bible in 1 Year') {
    try {
      const initialized = await this.initialize();
      if (!initialized) return false;
      
      // Cancel existing reading plan notifications by ID
      await LocalNotifications.cancel({ notifications: [{ id: 2 }] });

      // Schedule repeating daily notification using 'on' property
      // Note: Using 'on' alone creates a recurring daily notification
      await LocalNotifications.schedule({
        notifications: [
          {
            id: 2,
            title: planName,
            body: 'Time for today\'s reading! Continue your journey through the Bible.',
            schedule: {
              on: {
                hour: schedule.hour,
                minute: schedule.minute
              },
              allowWhileIdle: true,
            },
            extra: {
              type: 'reading-plan',
              route: '/readingplans'
            }
          }
        ]
      });

      console.log('[Notifications] Reading plan reminder scheduled (repeating daily) at', `${schedule.hour}:${schedule.minute}`);
      return true;
    } catch (error) {
      console.error('[Notifications] Failed to schedule reading plan reminder:', error);
      return false;
    }
  }

  async sendStreakAlert(streakDays: number) {
    try {
      const initialized = await this.initialize();
      if (!initialized) return false;

      await LocalNotifications.schedule({
        notifications: [
          {
            id: 999,
            title: `🔥 ${streakDays} Day Streak!`,
            body: `Amazing! You've maintained your streak for ${streakDays} days. Keep it going!`,
            schedule: {
              at: new Date(Date.now() + 1000), // Send immediately
              allowWhileIdle: true,
            },
            extra: {
              type: 'streak-alert',
              streakDays
            }
          }
        ]
      });

      console.log('[Notifications] Streak alert sent for', streakDays, 'days');
      return true;
    } catch (error) {
      console.error('[Notifications] Failed to send streak alert:', error);
      return false;
    }
  }

  async scheduleDailyReminders(preferences: NotificationPreferences): Promise<boolean> {
    if (!preferences.dailyReminders) {
      await this.clearScheduledReminders();
      return false;
    }

    // Parse reminder time (format: "HH:MM")
    const [hours, minutes] = preferences.reminderTime.split(':').map(Number);
    
    // Schedule daily devotional
    const devotionalScheduled = await this.scheduleDailyDevotional({ hour: hours, minute: minutes });
    
    // Schedule reading plan reminder if enabled
    if (preferences.readingPlanReminders && preferences.readingPlanTime) {
      const [planHours, planMinutes] = preferences.readingPlanTime.split(':').map(Number);
      await this.scheduleReadingPlanReminder({ hour: planHours, minute: planMinutes });
    }

    // Save preferences
    localStorage.setItem('notificationPreferences', JSON.stringify(preferences));
    
    return devotionalScheduled;
  }

  async cancelNotificationsByIds(ids: number[]) {
    try {
      await LocalNotifications.cancel({ 
        notifications: ids.map(id => ({ id }))
      });
      console.log('[Notifications] Cancelled notification IDs:', ids);
    } catch (error) {
      console.error('[Notifications] Failed to cancel notifications:', error);
    }
  }

  async clearScheduledReminders(): Promise<void> {
    try {
      const pending = await LocalNotifications.getPending();
      if (pending.notifications.length > 0) {
        await LocalNotifications.cancel({ 
          notifications: pending.notifications.map(n => ({ id: n.id }))
        });
        console.log('[Notifications] Cancelled all notifications');
      }
      localStorage.removeItem('notificationPreferences');
    } catch (error) {
      console.error('[Notifications] Failed to clear notifications:', error);
    }
  }

  // Check if we need to reschedule notifications on app startup
  async restoreScheduledReminders(preferences: NotificationPreferences): Promise<void> {
    if (!preferences.dailyReminders) {
      await this.clearScheduledReminders();
      return;
    }

    // Always reschedule when reminders are enabled
    // This ensures notifications work after app restart
    await this.scheduleDailyReminders(preferences);
  }

  async getPendingNotifications() {
    try {
      const pending = await LocalNotifications.getPending();
      return pending.notifications;
    } catch (error) {
      console.error('[Notifications] Failed to get pending notifications:', error);
      return [];
    }
  }

  async registerPushNotifications() {
    try {
      // Request permission to use push notifications
      let permStatus = await PushNotifications.requestPermissions();

      if (permStatus.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        await PushNotifications.register();
        console.log('[Push Notifications] Registered successfully');
      } else {
        console.log('[Push Notifications] Permission denied');
      }
    } catch (error) {
      console.error('[Push Notifications] Failed to register:', error);
    }
  }

  // Listen for push notification registration token
  onPushRegistration(callback: (token: string) => void) {
    PushNotifications.addListener('registration', (token) => {
      console.log('[Push Notifications] Registration token:', token.value);
      callback(token.value);
    });
  }

  // Listen for push notification errors
  onPushRegistrationError(callback: (error: any) => void) {
    PushNotifications.addListener('registrationError', (error) => {
      console.error('[Push Notifications] Registration error:', error);
      callback(error);
    });
  }

  // Listen for incoming push notifications
  onPushReceived(callback: (notification: any) => void) {
    PushNotifications.addListener('pushNotificationReceived', (notification) => {
      console.log('[Push Notifications] Received:', notification);
      callback(notification);
    });
  }

  // Listen for notification tap actions
  onNotificationAction(callback: (action: any) => void) {
    PushNotifications.addListener('pushNotificationActionPerformed', (action) => {
      console.log('[Push Notifications] Action performed:', action);
      callback(action);
    });
  }

  async testNotification(): Promise<{ success: boolean; message: string }> {
    try {
      const initialized = await this.initialize();
      
      if (!initialized) {
        return {
          success: false,
          message: 'Notification permission denied. Please enable in Settings.'
        };
      }

      await LocalNotifications.schedule({
        notifications: [
          {
            id: 9999,
            title: 'Test Notification',
            body: 'Daily reminders are working! You\'ll receive your next reminder at the scheduled time.',
            schedule: {
              at: new Date(Date.now() + 1000),
              allowWhileIdle: true,
            },
            extra: {
              type: 'test'
            }
          }
        ]
      });

      return {
        success: true,
        message: 'Test notification sent successfully!'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to send test notification'
      };
    }
  }
}

export const notificationService = NotificationService.getInstance();