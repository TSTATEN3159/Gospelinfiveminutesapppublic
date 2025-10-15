import { useState, useEffect } from 'react';
import { Sunrise, Sun, Moon } from 'lucide-react';
import { useTranslations } from '@/lib/translations';
// @ts-ignore - appStore is a JS file
import { appStore } from '@/lib/appStore';

interface HomePageProps {
  user?: {
    firstName: string;
  };
  language?: string;
}

export default function PersonalizedGreeting({ user, language = 'en' }: HomePageProps = {}) {
  const t = useTranslations(language);
  const [timeIcon, setTimeIcon] = useState<'morning' | 'afternoon' | 'evening'>('morning');
  const [userName, setUserName] = useState('');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    // Load user profile from localStorage
    const profile = appStore.loadProfile();
    
    // Try to get name from different sources
    let firstName = '';
    if (user?.firstName) {
      firstName = user.firstName;
    } else if (profile?.name) {
      firstName = profile.name.split(' ')[0];
    }
    
    setUserName(firstName);

    // Determine time-based greeting
    const updateGreeting = () => {
      const hour = new Date().getHours();
      
      if (hour >= 5 && hour < 12) {
        setGreeting(t.goodMorning);
        setTimeIcon('morning');
      } else if (hour >= 12 && hour < 17) {
        setGreeting(t.goodAfternoon);
        setTimeIcon('afternoon');
      } else {
        setGreeting(t.goodEvening);
        setTimeIcon('evening');
      }
    };

    updateGreeting();
    
    // Update greeting every minute in case time changes
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, [user, t]);

  const IconComponent = timeIcon === 'morning' ? Sunrise : timeIcon === 'afternoon' ? Sun : Moon;

  return (
    <div className="flex items-center justify-center gap-2 mb-5">
      <IconComponent className="w-7 h-7 text-amber-600 dark:text-amber-400" aria-hidden="true" />
      <div 
        className="text-2xl font-bold text-gray-900 dark:text-gray-100" 
        style={{ 
          fontFamily: 'Dancing Script, Brush Script MT, cursive'
        }}
        data-testid="text-personalized-greeting"
      >
        {greeting}{userName ? `, ${userName}` : ''}
      </div>
    </div>
  );
}
