import { getBibleVerse } from './bibleService';

interface NotificationPreferences {
  dailyReminders: boolean;
  reminderTime: string;
}

class NotificationService {
  private static instance: NotificationService;
  private notificationId: number | null = null;

  private constructor() {}

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  async requestPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications');
      return 'denied';
    }

    if (Notification.permission === 'granted') {
      return 'granted';
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission;
    }

    return Notification.permission;
  }

  async showDailyVerseNotification(): Promise<void> {
    try {
      const permission = await this.requestPermission();
      if (permission !== 'granted') {
        console.warn('Notification permission not granted');
        return;
      }

      // Get today's verse
      const dailyVerse = await getBibleVerse();
      
      const notification = new Notification('Your Daily Verse', {
        body: `${dailyVerse.reference}: "${dailyVerse.text}"`,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: 'daily-verse',
        requireInteraction: false,
        silent: false,
        data: {
          reference: dailyVerse.reference,
          text: dailyVerse.text
        }
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      // Auto close after 10 seconds
      setTimeout(() => {
        notification.close();
      }, 10000);

    } catch (error) {
      console.error('Error showing daily verse notification:', error);
    }
  }

  scheduleDailyReminders(preferences: NotificationPreferences): void {
    // Clear existing scheduled notifications
    this.clearScheduledReminders();

    if (!preferences.dailyReminders) {
      return;
    }

    // Parse reminder time (format: "HH:MM")
    const [hours, minutes] = preferences.reminderTime.split(':').map(Number);
    
    // Calculate next notification time
    const now = new Date();
    const nextNotification = new Date();
    nextNotification.setHours(hours, minutes, 0, 0);

    // If the time has already passed today, schedule for tomorrow
    if (nextNotification <= now) {
      nextNotification.setDate(nextNotification.getDate() + 1);
    }

    const timeUntilNext = nextNotification.getTime() - now.getTime();

    console.log(`Daily reminder scheduled for ${nextNotification.toLocaleString()}`);

    // Schedule the first notification
    this.notificationId = window.setTimeout(() => {
      this.showDailyVerseNotification();
      
      // Schedule recurring daily notifications
      this.notificationId = window.setInterval(() => {
        this.showDailyVerseNotification();
      }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds
      
    }, timeUntilNext);

    // Save only the essential scheduling info
    localStorage.setItem('dailyReminderScheduled', JSON.stringify({
      reminderTime: preferences.reminderTime,
      scheduledAt: new Date().getTime()
    }));
  }

  clearScheduledReminders(): void {
    if (this.notificationId) {
      clearTimeout(this.notificationId);
      clearInterval(this.notificationId);
      this.notificationId = null;
    }
    localStorage.removeItem('dailyReminderScheduled');
    console.log('Daily reminders cleared');
  }

  // Check if we need to reschedule notifications on app startup
  restoreScheduledReminders(preferences: NotificationPreferences): void {
    if (!preferences.dailyReminders) {
      this.clearScheduledReminders();
      return;
    }

    // Always reschedule when reminders are enabled
    // This ensures notifications work after page reload since timers are lost
    this.scheduleDailyReminders(preferences);
  }

  async testNotification(): Promise<{ success: boolean; message: string }> {
    if (!('Notification' in window)) {
      return {
        success: false,
        message: 'Notifications are not supported in this browser'
      };
    }

    const permission = await this.requestPermission();
    
    if (permission === 'granted') {
      new Notification('Test Notification', {
        body: 'Daily verse reminders are working! You\'ll receive your next reminder at the scheduled time.',
        icon: '/favicon.ico',
        tag: 'test-notification'
      });
      return {
        success: true,
        message: 'Test notification sent successfully!'
      };
    } else if (permission === 'denied') {
      return {
        success: false,
        message: 'Notifications are blocked. Please enable them in your browser settings.'
      };
    } else {
      return {
        success: false,
        message: 'Notification permission was not granted'
      };
    }
  }
}

export const notificationService = NotificationService.getInstance();