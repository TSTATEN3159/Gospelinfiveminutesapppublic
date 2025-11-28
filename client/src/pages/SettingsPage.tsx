import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, User, Bell, Shield, Database, Smartphone, Save, Edit3, Download, Trash2, Volume2, Home, Cloud, Mic, RefreshCw, CheckCircle2, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { bibleService } from "../services/bibleService";
import appStore from "@/lib/appStore";
import { ThemeToggle } from "@/components/ThemeToggle";
import { TextSizeControls } from "@/components/TextSizeControls";
import { ReminderSettings } from "@/components/settings/ReminderSettings";
import { iCloudSync } from "@/lib/iCloudSync";
import { siriShortcuts } from "@/lib/siriShortcuts";
import { liveActivity } from "@/lib/liveActivity";
import { Capacitor } from "@capacitor/core";
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
import { useTranslations } from "@/lib/translations";

interface SettingsPageProps {
  onNavigate?: (page: string) => void;
  streakDays?: number;
  language?: string;
  user?: {
    firstName: string;
    email: string;
    birthMonth: string;
    birthDay: string;
    appUserId?: string;
  };
}

interface UserProfile {
  firstName: string;
  email: string;
  birthMonth: string;
  birthDay: string;
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

export default function SettingsPage({ onNavigate, streakDays = 0, language = "en", user }: SettingsPageProps) {
  const { toast } = useToast();
  const t = useTranslations(language);
  
  // Initialize profile data from user prop or defaults
  const [profile, setProfile] = useState<UserProfile>({
    firstName: user?.firstName || 'John',
    email: user?.email || 'john.smith@email.com',
    birthMonth: user?.birthMonth || 'March',
    birthDay: user?.birthDay || '15',
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
    bibleVersion: 'KJV'
  });

  const [isEditing, setIsEditing] = useState(false);
  
  // Apple Features state
  const [iCloudCheckingAvailability, setICloudCheckingAvailability] = useState(true);
  const [iCloudEnabled, setICloudEnabled] = useState(false);
  const [iCloudAvailable, setICloudAvailable] = useState(false);
  const [iCloudSyncing, setICloudSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const [siriShortcutsSetup, setSiriShortcutsSetup] = useState<string[]>([]);
  const [liveActivitySupported, setLiveActivitySupported] = useState(false);
  const [liveActivityEnabled, setLiveActivityEnabled] = useState(false);
  const [liveActivityChecking, setLiveActivityChecking] = useState(true);
  const isIOS = Capacitor.getPlatform() === 'ios';
  
  // Refresh Siri shortcuts state
  const refreshSiriShortcuts = async () => {
    try {
      const shortcuts = await siriShortcuts.getVoiceShortcuts();
      setSiriShortcutsSetup(shortcuts.map(s => s.type));
    } catch (e) {
      console.error('[Settings] Failed to refresh Siri shortcuts:', e);
    }
  };
  
  // Check iCloud availability on mount
  useEffect(() => {
    const checkAppleFeatures = async () => {
      if (isIOS) {
        setICloudCheckingAvailability(true);
        try {
          // Check stored preference first
          const storedEnabled = iCloudSync.isSyncEnabled();
          setICloudEnabled(storedEnabled);
          
          // Check actual availability
          const availability = await iCloudSync.isAvailable();
          setICloudAvailable(availability.available);
          
          // If user has it enabled but iCloud isn't available, disable it
          if (storedEnabled && !availability.available) {
            setICloudEnabled(false);
            iCloudSync.setSyncEnabled(false);
          }
          
          const lastSync = await iCloudSync.getLastSyncTime();
          setLastSyncTime(lastSync);
          
          // Auto-donate Siri shortcuts
          await siriShortcuts.donateAllShortcuts();
          
          // Get existing voice shortcuts
          await refreshSiriShortcuts();
          
          // Check Live Activity support
          const liveActivityStatus = await liveActivity.isSupported();
          setLiveActivitySupported(liveActivityStatus.supported);
          setLiveActivityEnabled(liveActivityStatus.enabled && localStorage.getItem('liveActivityEnabled') === 'true');
          setLiveActivityChecking(false);
        } catch (e) {
          console.error('[Settings] Failed to check Apple features:', e);
        } finally {
          setICloudCheckingAvailability(false);
          setLiveActivityChecking(false);
        }
      } else {
        setICloudCheckingAvailability(false);
        setLiveActivityChecking(false);
      }
    };
    checkAppleFeatures();
  }, [isIOS]);
  
  // Handle iCloud toggle change
  const handleICloudToggle = async (checked: boolean) => {
    setICloudEnabled(checked);
    iCloudSync.setSyncEnabled(checked);
    
    if (checked) {
      setICloudSyncing(true);
      try {
        const success = await iCloudSync.pushToCloud();
        if (success) {
          const newSyncTime = await iCloudSync.getLastSyncTime();
          setLastSyncTime(newSyncTime);
          toast({
            title: "iCloud Sync Enabled",
            description: "Your data will now sync across devices",
          });
        } else {
          toast({
            title: "Sync Failed",
            description: "Unable to sync to iCloud. Please try again.",
            variant: "destructive",
          });
          setICloudEnabled(false);
          iCloudSync.setSyncEnabled(false);
        }
      } catch (e) {
        console.error('[Settings] iCloud sync error:', e);
        toast({
          title: "Sync Error",
          description: "An error occurred while syncing",
          variant: "destructive",
        });
        setICloudEnabled(false);
        iCloudSync.setSyncEnabled(false);
      } finally {
        setICloudSyncing(false);
      }
    } else {
      toast({
        title: "iCloud Sync Disabled",
        description: "Your data will only be stored locally",
      });
    }
  };
  
  // Handle manual sync
  const handleManualSync = async () => {
    setICloudSyncing(true);
    try {
      const success = await iCloudSync.syncFromCloud();
      if (success) {
        const newSyncTime = await iCloudSync.getLastSyncTime();
        setLastSyncTime(newSyncTime);
        toast({
          title: "Sync Complete",
          description: "Your data is up to date",
        });
      } else {
        toast({
          title: "Sync Failed",
          description: "Unable to sync from iCloud",
          variant: "destructive",
        });
      }
    } catch (e) {
      console.error('[Settings] Manual sync error:', e);
      toast({
        title: "Sync Error",
        description: "An error occurred while syncing",
        variant: "destructive",
      });
    } finally {
      setICloudSyncing(false);
    }
  };
  
  // Handle adding Siri shortcut
  const handleAddSiriShortcut = async (type: 'dailyVerse' | 'randomVerse' | 'prayerTime' | 'trivia') => {
    try {
      await siriShortcuts.presentAddToSiri(type);
      // Refresh shortcuts list after adding
      setTimeout(() => refreshSiriShortcuts(), 1000);
    } catch (e) {
      console.error('[Settings] Failed to add Siri shortcut:', e);
      toast({
        title: "Shortcut Error",
        description: "Unable to add Siri shortcut",
        variant: "destructive",
      });
    }
  };
  
  // Handle Live Activity toggle
  const handleLiveActivityToggle = async (checked: boolean) => {
    setLiveActivityEnabled(checked);
    localStorage.setItem('liveActivityEnabled', checked ? 'true' : 'false');
    
    if (checked) {
      // Start Live Activity with current verse
      try {
        const { apiUrl } = await import('@/lib/api-config');
        const response = await fetch(apiUrl('/api/daily-verse'));
        const data = await response.json();
        
        if (data.success && data.verse) {
          await liveActivity.startCountdown(data.verse.text, data.verse.reference);
          toast({
            title: "Live Activity Started",
            description: "Daily verse now shows on your lock screen",
          });
        }
      } catch (e) {
        console.error('[Settings] Failed to start Live Activity:', e);
        toast({
          title: "Live Activity Error",
          description: "Unable to start Live Activity",
          variant: "destructive",
        });
        setLiveActivityEnabled(false);
        localStorage.setItem('liveActivityEnabled', 'false');
      }
    } else {
      // Stop Live Activity
      try {
        await liveActivity.stopCountdown();
        toast({
          title: "Live Activity Stopped",
          description: "Removed from lock screen",
        });
      } catch (e) {
        console.error('[Settings] Failed to stop Live Activity:', e);
      }
    }
  };

  // Bible Version Selector Component
  const BibleVersionSelector = ({ value, onChange }: { value: string, onChange: (value: string) => void }) => {
    const { data: bibleVersions, isLoading } = useQuery({
      queryKey: ['/api/bible-versions'],
      queryFn: async () => {
        const { apiUrl } = await import('@/lib/api-config');
        return fetch(apiUrl('/api/bible-versions')).then(r => r.json());
      }
    });

    if (isLoading) {
      return (
        <div>
          <Label htmlFor="bibleVersion">{t.bibleVersion}</Label>
          <Select disabled>
            <SelectTrigger data-testid="select-bible-version">
              <SelectValue placeholder={t.loadingVersions} />
            </SelectTrigger>
          </Select>
        </div>
      );
    }

    const versions = bibleVersions?.success ? bibleVersions.versions : [];

    return (
      <div>
        <Label htmlFor="bibleVersion">{t.bibleVersion}</Label>
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

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem("gospelAppPreferences");
    if (savedPreferences) {
      try {
        const prefs = JSON.parse(savedPreferences);
        setPreferences(prefs);
      } catch (error) {
        console.error("Error loading preferences:", error);
      }
    }
  }, []);

  const months = [
    t.january, t.february, t.march, t.april, t.may, t.june,
    t.july, t.august, t.september, t.october, t.november, t.december
  ];

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

  const timezones = [
    { value: 'America/New_York', label: t.easternTime },
    { value: 'America/Chicago', label: t.centralTime },
    { value: 'America/Denver', label: t.mountainTime },
    { value: 'America/Los_Angeles', label: t.pacificTime },
    { value: 'UTC', label: t.utc }
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
          email: profile.email,
          birthMonth: profile.birthMonth,
          birthDay: profile.birthDay,
        };
        localStorage.setItem("gospelAppUser", JSON.stringify(updatedUserData));
      }

      // Also save to store for consistency
      appStore.saveProfile({
        name: profile.firstName,
        email: profile.email,
        birthdate: `${profile.birthMonth} ${profile.birthDay}`
      });
      
      setIsEditing(false);
      toast({
        title: t.profileUpdated,
        description: t.profileSavedSuccessfully,
      });
    } catch (error) {
      console.error("Error saving profile:", error);
      toast({
        title: "Error",
        description: t.failedToSaveProfile,
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
        storeProfile: appStore.loadProfile(),
        
        // Preferences
        preferences: preferences,
        
        // Offline reading data
        bookmarks: appStore.getBookmarks(),
        notes: appStore.getNotes(),
        todayReading: appStore.loadToday(),
        
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
        title: t.dataExported,
        description: t.dataDownloadedSuccessfully,
      });
    } catch (error) {
      console.error("Error exporting data:", error);
      toast({
        title: t.exportFailed,
        description: t.failedToExportData,
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
        email: '',
        birthMonth: 'January',
        birthDay: '1',
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
        bibleVersion: 'KJV'
      };

      setProfile(emptyProfile);
      setPreferences(emptyPreferences);

      // Persist the empty state to prevent repopulation on reload
      localStorage.setItem('gospelAppUser', JSON.stringify(emptyProfile));
      localStorage.setItem('gospelAppPreferences', JSON.stringify(emptyPreferences));
      localStorage.setItem('gospelAppStreakData', JSON.stringify({ streak: 0, lastVisit: null }));

      toast({
        title: t.accountDataDeleted,
        description: t.allDataRemovedFromDevice,
      });

      // Navigate back to home
      setTimeout(() => onNavigate?.('home'), 2000);
    } catch (error) {
      console.error("Error deleting account:", error);
      toast({
        title: t.deletionFailed,
        description: t.failedToDeleteAccountData,
        variant: "destructive",
      });
    }
  };

  const handlePreferenceChange = async (key: keyof AppPreferences, value: any) => {
    // Handle all preference changes (except daily reminders which are now managed by ReminderSettings)
    const newPreferences = { ...preferences, [key]: value };
    setPreferences(newPreferences);
    localStorage.setItem("gospelAppPreferences", JSON.stringify(newPreferences));
    
    toast({
      title: t.settingsUpdated,
      description: t.preferencesSaved,
    });
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header Section - Same style as HomePage */}
      <div className="bg-background border-b border-border px-4 py-6 ios-safe-top">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate?.('more')}
            className="mr-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            data-testid="button-back-settings"
            aria-label={t.goBackToMorePage}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground" style={{ 
              fontFamily: 'Dancing Script, Brush Script MT, cursive',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
            }}>
              {t.settings}
            </h1>
            <p className="text-muted-foreground mt-1">{t.settingsDescription}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate?.('home')}
            className="rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            data-testid="button-home"
            aria-label="Go home"
          >
            <Home className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Profile Section */}
        <Card className="shadow-lg border-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center justify-center gap-2 flex-1 text-center">
                <User className="w-5 h-5" />
                {t.profileInformation}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
                data-testid="button-edit-profile"
              >
                <Edit3 className="w-4 h-4 mr-1" />
                {isEditing ? t.cancel : t.edit}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="firstName">{t.firstName}</Label>
              <Input
                id="firstName"
                value={profile.firstName}
                onChange={(e) => setProfile(prev => ({ ...prev, firstName: e.target.value }))}
                disabled={!isEditing}
                data-testid="input-first-name"
              />
            </div>

            <div>
              <Label htmlFor="email">{t.email}</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                disabled={!isEditing}
                data-testid="input-email"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="birthMonth">{t.birthMonth}</Label>
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
                <Label htmlFor="birthDay">{t.birthDay}</Label>
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
              <Label htmlFor="timezone">{t.timezone}</Label>
              <Select
                value={profile.timezone}
                onValueChange={(value) => setProfile(prev => ({ ...prev, timezone: value }))}
                disabled={!isEditing}
              >
                <SelectTrigger data-testid="select-timezone">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map(tz => (
                    <SelectItem key={tz.value} value={tz.value}>{tz.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {isEditing && (
              <Button 
                onClick={handleSaveProfile}
                className="w-full"
                data-testid="button-save-profile"
              >
                <Save className="w-4 h-4 mr-2" />
                {t.saveProfile}
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="shadow-lg border-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 text-center">
              <Bell className="w-5 h-5" />
              {t.notifications}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ReminderSettings
              onSuccess={(message) => {
                toast({
                  title: t.success || "Success",
                  description: message,
                });
              }}
              onError={(message) => {
                toast({
                  title: t.error || "Error",
                  description: message,
                  variant: "destructive",
                });
              }}
              labels={{
                dailyVerse: t.dailyReminders,
                dailyVerseDesc: t.reminderToReadDailyVerse,
                readingPlan: "Bible Reading Plan",
                readingPlanDesc: "Daily reminder for your reading plan",
                reminderTime: t.reminderTime,
                testNotification: t.testNotification,
              }}
            />

            <div className="flex items-center justify-between pt-4 border-t">
              <div>
                <Label htmlFor="streakNotifications" className="font-medium">{t.streakNotifications}</Label>
                <p className="text-sm text-muted-foreground">{t.celebrateReadingStreaks}</p>
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
                <Label htmlFor="emailUpdates" className="font-medium">{t.emailUpdates}</Label>
                <p className="text-sm text-muted-foreground">{t.receiveNewsletters}</p>
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
              {t.appSettings}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Theme Selection */}
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Theme</Label>
                <p className="text-sm text-muted-foreground">Choose light, dark, or system theme</p>
              </div>
              <ThemeToggle />
            </div>
            
            {/* Text Size Controls */}
            <TextSizeControls 
              textSizeLabel={t.textSize}
              textSizeDescription={t.adjustTextSizeDesc}
              decreaseLabel={t.decreaseTextSize}
              increaseLabel={t.increaseTextSize}
            />
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="soundEnabled" className="font-medium">{t.soundEffects}</Label>
                <p className="text-sm text-muted-foreground">{t.enableAppSounds}</p>
              </div>
              <Switch
                id="soundEnabled"
                checked={preferences.soundEnabled}
                onCheckedChange={(checked) => handlePreferenceChange('soundEnabled', checked)}
                data-testid="switch-sound-enabled"
              />
            </div>

            <BibleVersionSelector 
              value={preferences.bibleVersion}
              onChange={(value) => handlePreferenceChange('bibleVersion', value)}
            />
            
            <Button 
              variant="outline" 
              className="w-full mt-4" 
              onClick={() => onNavigate?.('voice-settings')}
              data-testid="button-voice-settings"
            >
              <Volume2 className="w-4 h-4 mr-2" />
              Voice Settings
            </Button>
          </CardContent>
        </Card>

        {/* Apple Features (iOS only) */}
        {isIOS && (
          <Card className="shadow-lg border-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2 text-center">
                <Cloud className="w-5 h-5" />
                Apple Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* iCloud Sync */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label htmlFor="iCloudSync" className="font-medium flex items-center gap-2">
                      <Cloud className="w-4 h-4 text-blue-500" />
                      iCloud Sync
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Sync bookmarks, notes & progress across devices
                    </p>
                  </div>
                  <Switch
                    id="iCloudSync"
                    checked={iCloudEnabled}
                    disabled={!iCloudAvailable || iCloudCheckingAvailability || iCloudSyncing}
                    onCheckedChange={handleICloudToggle}
                    data-testid="switch-icloud-sync"
                  />
                </div>
                
                {iCloudCheckingAvailability && (
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <RefreshCw className="w-3 h-3 animate-spin" />
                    Checking iCloud availability...
                  </p>
                )}
                
                {!iCloudCheckingAvailability && !iCloudAvailable && (
                  <p className="text-xs text-amber-600 dark:text-amber-400">
                    Sign in to iCloud in Settings to enable sync
                  </p>
                )}
                
                {iCloudEnabled && iCloudAvailable && (
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-muted-foreground">
                      {lastSyncTime 
                        ? `Last synced: ${lastSyncTime.toLocaleString()}`
                        : 'Never synced'}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={iCloudSyncing}
                      onClick={handleManualSync}
                      data-testid="button-sync-now"
                    >
                      <RefreshCw className={`w-4 h-4 mr-1 ${iCloudSyncing ? 'animate-spin' : ''}`} />
                      {iCloudSyncing ? 'Syncing...' : 'Sync Now'}
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="border-t pt-4">
                {/* Live Activities */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Label htmlFor="liveActivity" className="font-medium flex items-center gap-2">
                        <Activity className="w-4 h-4 text-orange-500" />
                        Live Activities
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Show daily verse on lock screen & Dynamic Island
                      </p>
                    </div>
                    <Switch
                      id="liveActivity"
                      checked={liveActivityEnabled}
                      disabled={!liveActivitySupported || liveActivityChecking}
                      onCheckedChange={handleLiveActivityToggle}
                      data-testid="switch-live-activity"
                    />
                  </div>
                  
                  {liveActivityChecking && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      Checking Live Activity support...
                    </p>
                  )}
                  
                  {!liveActivityChecking && !liveActivitySupported && (
                    <p className="text-xs text-amber-600 dark:text-amber-400">
                      Live Activities require iOS 16.1 or later
                    </p>
                  )}
                  
                  {liveActivityEnabled && liveActivitySupported && (
                    <p className="text-xs text-green-600 dark:text-green-400">
                      Verse countdown active on lock screen
                    </p>
                  )}
                </div>
              </div>
              
              <div className="border-t pt-4">
                {/* Siri Shortcuts */}
                <div className="space-y-3">
                  <Label className="font-medium flex items-center gap-2">
                    <Mic className="w-4 h-4 text-purple-500" />
                    Siri Shortcuts
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Use voice commands like "Hey Siri, what's today's verse"
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-start"
                      onClick={() => handleAddSiriShortcut('dailyVerse')}
                      data-testid="button-siri-daily-verse"
                    >
                      {siriShortcutsSetup.includes('com.gospelapp.dailyverse') && (
                        <CheckCircle2 className="w-3 h-3 mr-1 text-green-500" />
                      )}
                      Today's Verse
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-start"
                      onClick={() => handleAddSiriShortcut('randomVerse')}
                      data-testid="button-siri-random-verse"
                    >
                      {siriShortcutsSetup.includes('com.gospelapp.randomverse') && (
                        <CheckCircle2 className="w-3 h-3 mr-1 text-green-500" />
                      )}
                      Random Verse
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-start"
                      onClick={() => handleAddSiriShortcut('prayerTime')}
                      data-testid="button-siri-prayer"
                    >
                      {siriShortcutsSetup.includes('com.gospelapp.prayertime') && (
                        <CheckCircle2 className="w-3 h-3 mr-1 text-green-500" />
                      )}
                      Prayer Time
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-start"
                      onClick={() => handleAddSiriShortcut('trivia')}
                      data-testid="button-siri-trivia"
                    >
                      {siriShortcutsSetup.includes('com.gospelapp.trivia') && (
                        <CheckCircle2 className="w-3 h-3 mr-1 text-green-500" />
                      )}
                      Bible Trivia
                    </Button>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-2">
                    Tap a button to add that command to Siri
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Data & Privacy */}
        <Card className="shadow-lg border-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 text-center">
              <Shield className="w-5 h-5" />
              {t.dataPrivacy}
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
              {t.viewPrivacyPolicy}
            </Button>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={handleExportData}
              data-testid="button-export-data"
            >
              <Download className="w-4 h-4 mr-2" />
              {t.exportMyData}
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full text-destructive border-destructive/20 hover:bg-destructive/10"
                  data-testid="button-delete-account"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  {t.deleteAccountData}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{t.deleteAllAccountData}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {t.deleteAccountWarning}
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>{t.deleteAccountWarningProfile}</li>
                      <li>{t.deleteAccountWarningBookmarks}</li>
                      <li>{t.deleteAccountWarningNotes}</li>
                      <li>{t.deleteAccountWarningPreferences}</li>
                      <li>{t.deleteAccountWarningStreak}</li>
                    </ul>
                    <p className="mt-3 font-semibold">{t.actionCannotBeUndone}</p>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel data-testid="button-cancel-delete">{t.cancel}</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleDeleteAccount}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    data-testid="button-confirm-delete"
                  >
                    {t.deleteAllData}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card className="shadow-lg border-2">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2 text-center">{t.accountActions}</h3>
            <p className="text-muted-foreground text-sm mb-4 text-center">
              {t.needHelpWithAccount}
            </p>
            <Button variant="outline" onClick={() => onNavigate?.('support')}>
              {t.contactSupport}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}