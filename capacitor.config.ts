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
      'https://*.youtube.com',
      'https://youtube-nocookie.com',
      'https://www.youtube-nocookie.com',
      'https://*.youtube-nocookie.com',
      'https://youtu.be',
      'https://i.ytimg.com',
      'https://img.youtube.com',
      'https://*.ytimg.com',
      'https://googlevideo.com',
      'https://*.googlevideo.com'
    ]
  },
  ios: {
    contentInset: 'automatic',
    scheme: 'capacitor'
  },
  plugins: {
    LiveUpdates: {
      appId: '042a1261',
      channel: 'Production',
      autoUpdateMethod: 'background',
      maxVersions: 2
    }
  }
};

export default config;
