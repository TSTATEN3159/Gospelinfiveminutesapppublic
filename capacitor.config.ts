import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.timothystaten.gospelin5minutes',
  appName: 'The Gospel in 5 Minutes',
  webDir: 'dist/public',
  server: { 
    androidScheme: 'https',
    iosScheme: 'capacitor',
    // Allow navigation to backend API and external services
    allowNavigation: [
      'https://daily-gospel-timothystaten.replit.app',
      'https://api.scripture.api.bible',
      'https://getcontext.xyz',
      'https://youtube.com',
      'https://www.youtube.com',
      'https://youtu.be'
    ]
  },
  ios: {
    contentInset: 'automatic',
    scheme: 'capacitor'
  }
};

export default config;
