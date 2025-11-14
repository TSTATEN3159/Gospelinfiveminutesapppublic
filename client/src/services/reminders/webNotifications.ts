import type {
  INotificationAdapter,
  PermissionResult,
  ScheduleReminderParams,
  NotificationChannel,
} from './types';

export class WebNotificationAdapter implements INotificationAdapter {
  private scheduledTimers: Map<string, number> = new Map();

  async checkPermission(): Promise<PermissionResult> {
    if (!('Notification' in window)) {
      return 'unsupported';
    }
    return Notification.permission as PermissionResult;
  }

  async requestPermission(): Promise<PermissionResult> {
    if (!('Notification' in window)) {
      console.warn('Web Notifications not supported in this browser');
      return 'unsupported';
    }

    if (Notification.permission === 'granted') {
      return 'granted';
    }

    if (Notification.permission === 'denied') {
      return 'denied';
    }

    try {
      const permission = await Notification.requestPermission();
      return permission as PermissionResult;
    } catch (error) {
      console.error('Failed to request notification permission:', error);
      return 'denied';
    }
  }

  async scheduleReminder(params: ScheduleReminderParams): Promise<boolean> {
    try {
      // Verify notification API is available
      if (!('Notification' in window)) {
        console.warn('Web Notifications not supported in this browser');
        return false;
      }

      // Check and request permission if needed
      let permission = await this.checkPermission();
      if (permission !== 'granted') {
        // Try to request permission
        permission = await this.requestPermission();
        if (permission !== 'granted') {
          console.warn(`Cannot schedule reminder: permission is ${permission}`);
          return false;
        }
      }

      // Final verification that permission is actually granted
      if (Notification.permission !== 'granted') {
        console.warn('Permission check mismatch - aborting schedule');
        return false;
      }

      const now = new Date();
      const nextNotification = new Date();
      nextNotification.setHours(params.hour, params.minute, 0, 0);

      if (nextNotification <= now) {
        nextNotification.setDate(nextNotification.getDate() + 1);
      }

      const timeUntilNext = nextNotification.getTime() - now.getTime();

      const showNotification = () => {
        // Final permission check before showing notification
        if (Notification.permission !== 'granted') {
          console.warn('Permission revoked - cannot show notification');
          return;
        }
        new Notification(params.title, {
          body: params.body,
          icon: '/favicon.ico',
          tag: params.channel,
          requireInteraction: false,
        });
      };

      const timeoutId = window.setTimeout(() => {
        showNotification();
        
        const intervalId = window.setInterval(() => {
          showNotification();
        }, 24 * 60 * 60 * 1000);
        
        this.scheduledTimers.set(params.channel, intervalId);
      }, timeUntilNext);

      // Only clear old timer AFTER new one is successfully scheduled
      const oldTimerId = this.scheduledTimers.get(params.channel);
      if (oldTimerId) {
        clearTimeout(oldTimerId);
        clearInterval(oldTimerId);
      }
      
      this.scheduledTimers.set(params.channel, timeoutId);
      return true;
    } catch (error) {
      console.error(`Failed to schedule web reminder for ${params.channel}:`, error);
      return false;
    }
  }

  async cancelReminder(channel: NotificationChannel): Promise<boolean> {
    try {
      const timerId = this.scheduledTimers.get(channel);
      if (timerId) {
        clearTimeout(timerId);
        clearInterval(timerId);
        this.scheduledTimers.delete(channel);
      }
      return true;
    } catch (error) {
      console.error(`Failed to cancel web reminder for ${channel}:`, error);
      return false;
    }
  }

  async presentNow(title: string, body: string): Promise<boolean> {
    try {
      const permission = await this.checkPermission();
      if (permission !== 'granted') {
        return false;
      }

      new Notification(title, {
        body,
        icon: '/favicon.ico',
        tag: 'test-notification',
      });
      return true;
    } catch (error) {
      console.error('Failed to present web notification:', error);
      return false;
    }
  }

  supportsChannel(channel: NotificationChannel): boolean {
    return channel === 'dailyVerse' || channel === 'readingPlan';
  }
}
