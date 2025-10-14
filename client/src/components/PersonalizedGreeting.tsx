import { useState, useEffect } from 'react';
// @ts-ignore - appStore is a JS file
import { store } from '@/lib/appStore';

export default function PersonalizedGreeting() {
  const [greeting, setGreeting] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Load user profile from localStorage
    const profile = store.loadProfile();
    const firstName = profile.name ? profile.name.split(' ')[0] : '';
    setUserName(firstName);

    // Determine time-based greeting
    const updateGreeting = () => {
      const hour = new Date().getHours();
      
      if (hour >= 5 && hour < 12) {
        setGreeting('Good morning');
      } else if (hour >= 12 && hour < 17) {
        setGreeting('Good afternoon');
      } else {
        setGreeting('Good evening');
      }
    };

    updateGreeting();
    
    // Update greeting every minute in case time changes
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!userName) {
    return null;
  }

  return (
    <div className="text-center mb-5">
      <div 
        className="text-lg font-bold text-amber-900" 
        style={{ 
          fontFamily: 'Dancing Script, Brush Script MT, cursive'
        }}
        data-testid="text-personalized-greeting"
      >
        <div>{greeting}</div>
        <div>{userName}</div>
      </div>
    </div>
  );
}
