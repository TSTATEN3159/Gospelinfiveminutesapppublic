# iOS Appflow Setup Guide

## Overview
Your app is now ready for iOS deployment via Ionic Appflow. All API calls have been refactored to use direct URLs instead of proxies, making them compatible with mobile deployment.

## What Was Fixed
✅ **All proxy API calls removed** - Previously used relative URLs like `/api/verse` which only work when frontend and backend are on the same server
✅ **Direct API calls implemented** - Now uses `apiUrl()` helper to call full URLs like `https://daily-gospel-timothystaten.replit.app/api/verse`
✅ **Production backend deployed** - Backend is live at https://daily-gospel-timothystaten.replit.app
✅ **Environment variable ready** - `VITE_API_BASE_URL` configured for production builds

## Files Changed
The following files were updated to use `apiUrl()` instead of direct `fetch('/api/...')` calls:

1. **client/src/services/videoService.ts** - Daily gospel video API call
2. **client/src/pages/FriendsPage.tsx** - User search, friends list, contacts, verse sharing
3. **client/src/pages/SupportPage.tsx** - Account deletion API call

All other files were already using `apiUrl()` correctly.

## How It Works

### Development (Replit)
When running locally, `VITE_API_BASE_URL` is empty, so API calls use relative URLs:
```
fetch(apiUrl('/api/verse'))  →  fetch('/api/verse')
```
This works because frontend and backend run on the same server (localhost:5000).

### Production iOS (Appflow)
When building for iOS, set `VITE_API_BASE_URL` to your production backend:
```
VITE_API_BASE_URL=https://daily-gospel-timothystaten.replit.app
```

Then API calls use full URLs:
```
fetch(apiUrl('/api/verse'))  →  fetch('https://daily-gospel-timothystaten.replit.app/api/verse')
```

The iOS app (running locally on the phone) makes requests to your remote backend server.

## Appflow Configuration

### 1. Connect Your GitHub Repository
1. Push your code to GitHub
2. In Ionic Appflow, connect to your GitHub repository
3. Select the branch you want to deploy from (usually `main`)

### 2. Set Environment Variables
In Appflow → Build → Environment:

**Required:**
```bash
VITE_API_BASE_URL=https://daily-gospel-timothystaten.replit.app
```

**Optional (if you want different Bible API key for iOS):**
```bash
VITE_API_BIBLE_KEY=your-api-bible-key-here
```

### 3. Build Configuration
- **Platform**: iOS
- **Build Type**: Development (for testing) or Production (for App Store)
- **Build Stack**: Latest iOS stack
- **Certificate**: Add your Apple Developer certificate
- **Provisioning Profile**: Add your provisioning profile

### 4. Trigger Build
1. Click "Create a new build"
2. Select your branch
3. Choose iOS platform
4. Wait for build to complete
5. Download the `.ipa` file or deploy to TestFlight

## Capacitor Configuration

Your `capacitor.config.ts` is already configured correctly:

```typescript
const config: CapacitorConfig = {
  appId: 'com.timothystaten.gospelin5minutes',
  appName: 'The Gospel in 5 Minutes',
  webDir: 'dist/public',
  server: { 
    androidScheme: 'https' 
  },
  ios: {
    contentInset: 'automatic'
  }
};
```

## Testing Your iOS Build

### 1. Test Backend is Accessible
Before deploying to iOS, verify your backend is accessible:

```bash
curl https://daily-gospel-timothystaten.replit.app/api/health
```

Expected response:
```json
{
  "success": true,
  "overall": "healthy" or "degraded",
  "services": [...]
}
```

### 2. Test API Endpoints
Test key endpoints your app uses:

```bash
# Daily verse
curl https://daily-gospel-timothystaten.replit.app/api/daily-verse

# Bible versions
curl https://daily-gospel-timothystaten.replit.app/api/bible-versions

# Videos
curl https://daily-gospel-timothystaten.replit.app/api/videos?limit=5
```

### 3. Build Locally First (Optional)
Test the production build locally before deploying to Appflow:

```bash
# Set production environment variable
export VITE_API_BASE_URL=https://daily-gospel-timothystaten.replit.app

# Build the app
npm run build

# Sync with Capacitor
npx cap sync ios

# Open in Xcode (if on Mac)
npx cap open ios
```

## Troubleshooting

### Issue: API calls fail in iOS app
**Solution**: Verify `VITE_API_BASE_URL` is set correctly in Appflow environment variables

### Issue: CORS errors
**Solution**: Your backend already has CORS enabled. If still seeing errors, check that your Replit deployment is running

### Issue: Blank screen in iOS app
**Solution**: 
1. Check browser console in iOS simulator for errors
2. Verify all assets are loading (check Network tab)
3. Ensure `webDir: 'dist/public'` points to your built frontend

### Issue: Backend connection timeout
**Solution**: Your Replit deployment may have degraded database performance. Check deployment health:
```bash
curl https://daily-gospel-timothystaten.replit.app/api/health
```

## Production Checklist

Before submitting to App Store:

- [ ] Backend deployed and accessible at https://daily-gospel-timothystaten.replit.app
- [ ] Environment variable `VITE_API_BASE_URL` set in Appflow
- [ ] All API endpoints tested and returning data
- [ ] No donation features (Apple compliance ✅)
- [ ] Privacy Policy and Terms of Service updated with server URL
- [ ] Apple Developer certificate added to Appflow
- [ ] Provisioning profile configured
- [ ] App icons and splash screens added
- [ ] App Store listing prepared

## Next Steps

1. **Push code to GitHub** - Ensure all changes are committed
2. **Configure Appflow** - Add environment variables
3. **Trigger first build** - Test with Development build type
4. **Download .ipa** - Install on test device via TestFlight
5. **Submit to App Store** - Once testing is complete

## Support

If you encounter issues:
1. Check Appflow build logs for errors
2. Verify backend is running: https://daily-gospel-timothystaten.replit.app
3. Test API endpoints manually with curl
4. Check iOS device logs for runtime errors

---

**Your app is now fully compatible with iOS deployment via Appflow!** 🎉
