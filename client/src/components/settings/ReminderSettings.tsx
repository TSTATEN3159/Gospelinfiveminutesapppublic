import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TestTube } from 'lucide-react';
import { reminderManager } from '@/services/reminders';
import type { NotificationChannel } from '@/services/reminders';

interface ReminderSettingsProps {
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
  labels: {
    dailyVerse: string;
    dailyVerseDesc: string;
    readingPlan: string;
    readingPlanDesc: string;
    reminderTime: string;
    testNotification: string;
  };
}

export function ReminderSettings({ onSuccess, onError, labels }: ReminderSettingsProps) {
  const [dailyVerseEnabled, setDailyVerseEnabled] = useState(false);
  const [dailyVerseTime, setDailyVerseTime] = useState('08:00');
  
  const [readingPlanEnabled, setReadingPlanEnabled] = useState(false);
  const [readingPlanTime, setReadingPlanTime] = useState('19:00');

  const [testingNotification, setTestingNotification] = useState(false);

  useEffect(() => {
    const initializeReminders = async () => {
      await reminderManager.initializeFromStorage();
      const prefs = reminderManager.getPreferences();
      setDailyVerseEnabled(prefs.dailyVerse.enabled);
      setDailyVerseTime(prefs.dailyVerse.time);
      setReadingPlanEnabled(prefs.readingPlan.enabled);
      setReadingPlanTime(prefs.readingPlan.time);
    };
    initializeReminders();
  }, []);

  const handleToggle = async (channel: NotificationChannel, enabled: boolean, time: string) => {
    const result = await reminderManager.upsertReminder(channel, enabled, time);
    
    if (result.success) {
      onSuccess?.(result.message);
      
      if (channel === 'dailyVerse') {
        setDailyVerseEnabled(enabled);
      } else {
        setReadingPlanEnabled(enabled);
      }
    } else {
      onError?.(result.message);
      
      if (channel === 'dailyVerse') {
        setDailyVerseEnabled(false);
      } else {
        setReadingPlanEnabled(false);
      }
    }
  };

  const handleTimeChange = async (channel: NotificationChannel, time: string, enabled: boolean) => {
    if (channel === 'dailyVerse') {
      setDailyVerseTime(time);
    } else {
      setReadingPlanTime(time);
    }

    if (enabled) {
      const result = await reminderManager.upsertReminder(channel, true, time);
      if (result.success) {
        onSuccess?.(result.message);
      } else {
        onError?.(result.message);
      }
    }
  };

  const handleTestNotification = async () => {
    setTestingNotification(true);
    const result = await reminderManager.testNotification();
    setTestingNotification(false);

    if (result.success) {
      onSuccess?.(result.message);
    } else {
      onError?.(result.message);
    }
  };

  return (
    <div className="space-y-4">
      {/* Daily Verse Reminder */}
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="dailyVerseReminder" className="font-medium">{labels.dailyVerse}</Label>
          <p className="text-sm text-muted-foreground">{labels.dailyVerseDesc}</p>
        </div>
        <Switch
          id="dailyVerseReminder"
          checked={dailyVerseEnabled}
          onCheckedChange={(checked) => handleToggle('dailyVerse', checked, dailyVerseTime)}
          data-testid="switch-daily-verse-reminder"
        />
      </div>

      {dailyVerseEnabled && (
        <div className="space-y-2 pl-4 border-l-2 border-muted">
          <div>
            <Label htmlFor="dailyVerseTime">{labels.reminderTime}</Label>
            <Input
              id="dailyVerseTime"
              type="time"
              value={dailyVerseTime}
              onChange={(e) => handleTimeChange('dailyVerse', e.target.value, true)}
              data-testid="input-daily-verse-time"
            />
          </div>
        </div>
      )}

      {/* Reading Plan Reminder */}
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="readingPlanReminder" className="font-medium">{labels.readingPlan}</Label>
          <p className="text-sm text-muted-foreground">{labels.readingPlanDesc}</p>
        </div>
        <Switch
          id="readingPlanReminder"
          checked={readingPlanEnabled}
          onCheckedChange={(checked) => handleToggle('readingPlan', checked, readingPlanTime)}
          data-testid="switch-reading-plan-reminder"
        />
      </div>

      {readingPlanEnabled && (
        <div className="space-y-2 pl-4 border-l-2 border-muted">
          <div>
            <Label htmlFor="readingPlanTime">{labels.reminderTime}</Label>
            <Input
              id="readingPlanTime"
              type="time"
              value={readingPlanTime}
              onChange={(e) => handleTimeChange('readingPlan', e.target.value, true)}
              data-testid="input-reading-plan-time"
            />
          </div>
        </div>
      )}

      {/* Test Notification Button */}
      {(dailyVerseEnabled || readingPlanEnabled) && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleTestNotification}
          disabled={testingNotification}
          className="w-full"
          data-testid="button-test-notification"
        >
          <TestTube className="w-4 h-4 mr-2" />
          {testingNotification ? 'Sending...' : labels.testNotification}
        </Button>
      )}
    </div>
  );
}
