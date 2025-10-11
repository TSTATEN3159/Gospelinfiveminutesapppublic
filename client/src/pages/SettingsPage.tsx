import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, User, Bell, Shield, Database, Smartphone, Save, Edit3, TestTube, Download, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { notificationService } from "../services/notificationService";
import { bibleService } from "../services/bibleService";
import { store } from "@/lib/appStore";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import forestPathImage from '@assets/stock_images/peaceful_forest_path_c4eefddd.jpg';

interface SettingsPageProps {
  onNavigate?: (page: string) => void;
  streakDays?: number;
  user?: {
    firstName: string;
    lastName: string;
    email: string;
    birthMonth: string;
    birthDay: string;
    phone: string;
    appUserId?: string;
  };
}

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthMonth: string;
  birthDay: string;
  preferredName: string;
  timezone: string;
}

interface AppPreferences {
  dailyReminders: boolean;
  reminderTime: string;
  streakNotifications: boolean;
  emailUpdates: boolean;
  soundEnabled: boolean;
  darkMode: boolean;
  language: string;
  bibleVersion: string;
}

export default function SettingsPage({ onNavigate, streakDays = 0, user }: SettingsPageProps) {
  const { toast } = useToast();
  
  // Initialize profile data from user prop or defaults
  const [profile, setProfile] = useState<UserProfile>({
    firstName: user?.firstName || 'John',
    lastName: user?.lastName || 'Smith',
    email: user?.email || 'john.smith@email.com',
    phone: user?.phone || '+1 (555) 123-4567',
    birthMonth: user?.birthMonth || 'March',
    birthDay: user?.birthDay || '15',
    preferredName: user?.firstName || 'John',
    timezone: 'America/New_York'
  });

  const [preferences, setPreferences] = useState<AppPreferences>({
    dailyReminders: true,
    reminderTime: '08:00',
    streakNotifications: true,
    emailUpdates: false,
    soundEnabled: true,
    darkMode: false,
    language: 'en',
    bibleVersion: 'NIV'
  });

  const [isEditing, setIsEditing] = useState(false);

  // Bible Version Selector Component
  const BibleVersionSelector = ({ value, onChange }: { value: string, onChange: (value: string) => void }) => {
    const { data: bibleVersions, isLoading } = useQuery({
      queryKey: ['/api/bible-versions'],
      queryFn: () => fetch('/api/bible-versions').then(r => r.json())
    });

    if (isLoading) {
      return (
        <div>
          <Label htmlFor="bibleVersion">Bible Version</Label>
          <Select disabled>
            <SelectTrigger data-testid="select-bible-version">
              <SelectValue placeholder="Loading versions..." />
            </SelectTrigger>
          </Select>
        </div>
      );
    }

    const versions = bibleVersions?.success ? bibleVersions.versions : [];

    return (
      <div>
        <Label htmlFor="bibleVersion">Bible Version</Label>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger data-testid="select-bible-version">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {versions.map((version: any) => (
              <SelectItem key={version.abbreviation} value={version.abbreviation}>
                {version.name} ({version.abbreviation})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  };

  // Load preferences from localStorage and restore notifications on mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem("gospelAppPreferences");
    if (savedPreferences) {
      try {
        const prefs = JSON.parse(savedPreferences);
        setPreferences(prefs);
        
        // Restore scheduled notifications if enabled
        if (prefs.dailyReminders) {
          notificationService.restoreScheduledReminders(prefs);
        }
      } catch (error) {
        console.error("Error loading preferences:", error);
      }
    }
  }, []);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

  const timezones = [
    { value: 'America/New_York', label: 'Eastern Time (EST)' },
    { value: 'America/Chicago', label: 'Central Time (CST)' },
    { value: 'America/Denver', label: 'Mountain Time (MST)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PST)' },
    { value: 'UTC', label: 'UTC' }
  ];

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' },
    { value: 'pt', label: 'Português' }
  ];

  const handleSaveProfile = () => {
    try {
      // Save to both gospelAppUser (for compatibility) and store (for consistency)
      const existingUserData = localStorage.getItem("gospelAppUser");
      if (existingUserData) {
        const userData = JSON.parse(existingUserData);
        const updatedUserData = {
          ...userData,
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
          phone: profile.phone,
          birthMonth: profile.birthMonth,
          birthDay: profile.birthDay,
        };
        localStorage.setItem("gospelAppUser", JSON.stringify(updatedUserData));
      }

      // Also save to store for consistency
      store.saveProfile({
        name: `${profile.firstName} ${profile.lastName}`,
        email: profile.email,
        birthdate: `${profile.birthMonth} ${profile.birthDay}`
      });
      
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile information has been saved successfully.",
      });
    } catch (error) {
      console.error("Error saving profile:", error);
      toast({
        title: "Error",
        description: "Failed to save profile changes. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleExportData = () => {
    try {
      // Export all user data from all storage sources
      const userData = {
        // Profile data from both sources
        profile: JSON.parse(localStorage.getItem("gospelAppUser") || "{}"),
        storeProfile: store.loadProfile(),
        
        // Preferences
        preferences: preferences,
        
        // Offline reading data
        bookmarks: store.getBookmarks(),
        notes: store.getNotes(),
        todayReading: store.loadToday(),
        
        // Streak data
        streakData: JSON.parse(localStorage.getItem("gospelAppStreakData") || "{}"),
        
        // Export metadata
        exportDate: new Date().toISOString(),
        appVersion: "1.0.0"
      };

      const dataStr = JSON.stringify(userData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `gospel-app-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Data Exported",
        description: "Your data has been downloaded successfully.",
      });
    } catch (error) {
      console.error("Error exporting data:", error);
      toast({
        title: "Export Failed",
        description: "Failed to export your data. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAccount = () => {
    try {
      // Clear ALL app data from localStorage - comprehensive cleanup
      const keysToRemove = [
        // Store keys (from appStore.js)
        'dg_todayReading',
        'dg_bookmarks', 
        'dg_notes',
        'dg_profile',
        // App keys
        'gospel5min_bookmarks',
        'gospel5min_notes',
        'gospelAppUser',
        'gospelAppPreferences',
        'gospelAppStreakData'
      ];

      keysToRemove.forEach(key => localStorage.removeItem(key));

      // Reset local state
      const emptyProfile = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        birthMonth: 'January',
        birthDay: '1',
        preferredName: '',
        timezone: 'America/New_York'
      };

      const emptyPreferences = {
        dailyReminders: false,
        reminderTime: '08:00',
        streakNotifications: false,
        emailUpdates: false,
        soundEnabled: true,
        darkMode: false,
        language: 'en',
        bibleVersion: 'NIV'
      };

      setProfile(emptyProfile);
      setPreferences(emptyPreferences);

      // Persist the empty state to prevent repopulation on reload
      localStorage.setItem('gospelAppUser', JSON.stringify(emptyProfile));
      localStorage.setItem('gospelAppPreferences', JSON.stringify(emptyPreferences));
      localStorage.setItem('gospelAppStreakData', JSON.stringify({ streak: 0, lastVisit: null }));

      // Clear notifications
      notificationService.clearScheduledReminders();

      toast({
        title: "Account Data Deleted",
        description: "All your local data has been removed from this device.",
      });

      // Navigate back to home
      setTimeout(() => onNavigate?.('home'), 2000);
    } catch (error) {
      console.error("Error deleting account:", error);
      toast({
        title: "Deletion Failed",
        description: "Failed to delete account data. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePreferenceChange = async (key: keyof AppPreferences, value: any) => {
    // Handle daily reminders specifically with permission check first
    if (key === 'dailyReminders') {
      if (value) {
        const permission = await notificationService.requestPermission();
        if (permission === 'granted') {
          const newPreferences = { ...preferences, [key]: value };
          setPreferences(newPreferences);
          localStorage.setItem("gospelAppPreferences", JSON.stringify(newPreferences));
          
          notificationService.scheduleDailyReminders(newPreferences);
          toast({
            title: "Daily Reminders Enabled",
            description: `You'll receive daily verse reminders at ${newPreferences.reminderTime}.`,
          });
        } else {
          // Keep the setting as false and don't save to localStorage
          toast({
            title: "Permission Required",
            description: "Please allow notifications to receive daily verse reminders.",
            variant: "destructive",
          });
          return; // Don't update preferences or localStorage
        }
      } else {
        const newPreferences = { ...preferences, [key]: value };
        setPreferences(newPreferences);
        localStorage.setItem("gospelAppPreferences", JSON.stringify(newPreferences));
        
        notificationService.clearScheduledReminders();
        toast({
          title: "Daily Reminders Disabled",
          description: "You will no longer receive daily verse reminders.",
        });
      }
    } else {
      // Handle all other preference changes normally
      const newPreferences = { ...preferences, [key]: value };
      setPreferences(newPreferences);
      localStorage.setItem("gospelAppPreferences", JSON.stringify(newPreferences));
      
      if (key === 'reminderTime' && newPreferences.dailyReminders) {
        // Reschedule with new time
        notificationService.scheduleDailyReminders(newPreferences);
        toast({
          title: "Reminder Time Updated",
          description: `Daily reminders will now be sent at ${value}.`,
        });
      } else {
        toast({
          title: "Settings Updated",
          description: "Your preferences have been saved.",
        });
      }
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header Section - Same style as HomePage */}
      <div className="bg-white px-4 py-6 border-b border-gray-100 ios-safe-top">
        <div className="flex items-center mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate?.('more')}
            className="mr-3"
            data-testid="button-back-settings"
            aria-label="Go back to More page"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold" style={{ 
              fontFamily: 'Dancing Script, Brush Script MT, cursive',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
              color: '#8B4513'
            }}>
              Settings
            </h1>
            <p className="text-gray-600 mt-1">Manage your profile and preferences</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Profile Section */}
        <Card className="shadow-lg border-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center justify-center gap-2 flex-1 text-center">
                <User className="w-5 h-5" />
                Profile Information
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
                data-testid="button-edit-profile"
              >
                <Edit3 className="w-4 h-4 mr-1" />
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={profile.firstName}
                  onChange={(e) => setProfile(prev => ({ ...prev, firstName: e.target.value }))}
                  disabled={true}
                  className="bg-muted"
                  data-testid="input-first-name"
                  title="Name cannot be changed once set"
                />
                <p className="text-xs text-muted-foreground mt-1">Name cannot be changed</p>
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={profile.lastName}
                  onChange={(e) => setProfile(prev => ({ ...prev, lastName: e.target.value }))}
                  disabled={true}
                  className="bg-muted"
                  data-testid="input-last-name"
                  title="Name cannot be changed once set"
                />
                <p className="text-xs text-muted-foreground mt-1">Name cannot be changed</p>
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                disabled={!isEditing}
                data-testid="input-email"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={profile.phone}
                onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                disabled={!isEditing}
                data-testid="input-phone"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="birthMonth">Birth Month</Label>
                <Select
                  value={profile.birthMonth}
                  onValueChange={(value) => setProfile(prev => ({ ...prev, birthMonth: value }))}
                  disabled={!isEditing}
                >
                  <SelectTrigger data-testid="select-birth-month">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map(month => (
                      <SelectItem key={month} value={month}>{month}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="birthDay">Birth Day</Label>
                <Select
                  value={profile.birthDay}
                  onValueChange={(value) => setProfile(prev => ({ ...prev, birthDay: value }))}
                  disabled={!isEditing}
                >
                  <SelectTrigger data-testid="select-birth-day">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map(day => (
                      <SelectItem key={day} value={day}>{day}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <Select
                value={profile.timezone}
                onValueChange={(value) => setProfile(prev => ({ ...prev, timezone: value }))}
                disabled={true}
              >
                <SelectTrigger data-testid="select-timezone" className="bg-muted">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map(tz => (
                    <SelectItem key={tz.value} value={tz.value}>{tz.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">Timezone cannot be changed</p>
            </div>

            {isEditing && (
              <Button 
                onClick={handleSaveProfile}
                className="w-full"
                data-testid="button-save-profile"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Profile
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="shadow-lg border-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 text-center">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="dailyReminders" className="font-medium">Daily Reminders</Label>
                <p className="text-sm text-muted-foreground">Get reminded to read your daily verse</p>
              </div>
              <Switch
                id="dailyReminders"
                checked={preferences.dailyReminders}
                onCheckedChange={(checked) => handlePreferenceChange('dailyReminders', checked)}
                data-testid="switch-daily-reminders"
              />
            </div>

            {preferences.dailyReminders && (
              <div className="space-y-3">
                <div>
                  <Label htmlFor="reminderTime">Reminder Time</Label>
                  <Input
                    id="reminderTime"
                    type="time"
                    value={preferences.reminderTime}
                    onChange={(e) => handlePreferenceChange('reminderTime', e.target.value)}
                    data-testid="input-reminder-time"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => notificationService.testNotification()}
                  className="w-full"
                  data-testid="button-test-notification"
                >
                  <TestTube className="w-4 h-4 mr-2" />
                  Test Notification
                </Button>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="streakNotifications" className="font-medium">Streak Notifications</Label>
                <p className="text-sm text-muted-foreground">Celebrate your reading streaks</p>
              </div>
              <Switch
                id="streakNotifications"
                checked={preferences.streakNotifications}
                onCheckedChange={(checked) => handlePreferenceChange('streakNotifications', checked)}
                data-testid="switch-streak-notifications"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="emailUpdates" className="font-medium">Email Updates</Label>
                <p className="text-sm text-muted-foreground">Receive newsletters and updates</p>
              </div>
              <Switch
                id="emailUpdates"
                checked={preferences.emailUpdates}
                onCheckedChange={(checked) => handlePreferenceChange('emailUpdates', checked)}
                data-testid="switch-email-updates"
              />
            </div>
          </CardContent>
        </Card>

        {/* App Settings */}
        <Card className="shadow-lg border-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 text-center">
              <Smartphone className="w-5 h-5" />
              App Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="soundEnabled" className="font-medium">Sound Effects</Label>
                <p className="text-sm text-muted-foreground">Enable app sounds and notifications</p>
              </div>
              <Switch
                id="soundEnabled"
                checked={preferences.soundEnabled}
                onCheckedChange={(checked) => handlePreferenceChange('soundEnabled', checked)}
                data-testid="switch-sound-enabled"
              />
            </div>

            <div>
              <Label htmlFor="language">App Language</Label>
              <Select
                value={preferences.language}
                onValueChange={(value) => handlePreferenceChange('language', value)}
              >
                <SelectTrigger data-testid="select-app-language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map(lang => (
                    <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <BibleVersionSelector 
              value={preferences.bibleVersion}
              onChange={(value) => handlePreferenceChange('bibleVersion', value)}
            />
          </CardContent>
        </Card>

        {/* Data & Privacy */}
        <Card className="shadow-lg border-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 text-center">
              <Shield className="w-5 h-5" />
              Data & Privacy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => onNavigate?.('privacy')}
              data-testid="button-view-privacy"
            >
              <Shield className="w-4 h-4 mr-2" />
              View Privacy Policy
            </Button>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={handleExportData}
              data-testid="button-export-data"
            >
              <Download className="w-4 h-4 mr-2" />
              Export My Data
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full text-destructive border-destructive/20 hover:bg-destructive/10"
                  data-testid="button-delete-account"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account Data
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete All Account Data?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete all your data from this device, including:
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Profile information</li>
                      <li>Bookmarks and saved verses</li>
                      <li>Personal notes</li>
                      <li>App preferences</li>
                      <li>Reading streak data</li>
                    </ul>
                    <p className="mt-3 font-semibold">This action cannot be undone.</p>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel data-testid="button-cancel-delete">Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleDeleteAccount}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    data-testid="button-confirm-delete"
                  >
                    Delete All Data
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card className="shadow-lg border-2">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2 text-center">Account Actions</h3>
            <p className="text-muted-foreground text-sm mb-4 text-center">
              Need help with your account? Contact our support team.
            </p>
            <Button variant="outline" onClick={() => onNavigate?.('support')}>
              Contact Support
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}