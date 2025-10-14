import { useState, useEffect } from 'react';
import { Sunrise, Sun, Moon } from 'lucide-react';
// @ts-ignore - appStore is a JS file
import { store } from '@/lib/appStore';

interface HomePageProps {
  user?: {
    firstName: string;
  };
}

export default function PersonalizedGreeting({ user }: HomePageProps = {}) {
  const [greeting, setGreeting] = useState('');
  const [timeIcon, setTimeIcon] = useState<'morning' | 'afternoon' | 'evening'>('morning');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Load user profile from localStorage
    const profile = store.loadProfile();
    console.log('Profile data:', profile); // Debug log
    
    // Try to get name from different sources
    let firstName = '';
    if (user?.firstName) {
      firstName = user.firstName;
    } else if (profile?.name) {
      firstName = profile.name.split(' ')[0];
    }
    
    console.log('First name:', firstName); // Debug log
    setUserName(firstName);

    // Determine time-based greeting
    const updateGreeting = () => {
      const hour = new Date().getHours();
      
      if (hour >= 5 && hour < 12) {
        setGreeting('Good morning');
        setTimeIcon('morning');
      } else if (hour >= 12 && hour < 17) {
        setGreeting('Good afternoon');
        setTimeIcon('afternoon');
      } else {
        setGreeting('Good evening');
        setTimeIcon('evening');
      }
    };

    updateGreeting();
    
    // Update greeting every minute in case time changes
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, [user]);

  const IconComponent = timeIcon === 'morning' ? Sunrise : timeIcon === 'afternoon' ? Sun : Moon;

  return (
    <div className="flex items-center justify-center gap-2 mb-5">
      <IconComponent className="w-5 h-5 text-amber-600" aria-hidden="true" />
      <div 
        className="text-lg font-bold text-amber-900" 
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
