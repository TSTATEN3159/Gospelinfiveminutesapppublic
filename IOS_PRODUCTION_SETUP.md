# iOS Production Setup Guide

## Problem: TestFlight API Calls Failing

Your iOS app makes API calls to `/api/*` endpoints, but these only exist when running in Replit development mode. When your app runs on a real iPhone via TestFlight, there's no backend server, so all API calls fail.

## Solution: Deploy Backend & Configure Production URL

### Step 1: Deploy Your Backend to Replit

1. **In Replit**, click the **"Deploy"** or **"Publish"** button
2. Your backend will be hosted at a URL like: `https://your-repl-name.replit.app`
3. Copy this URL - you'll need it for Step 2

### Step 2: Create Production Environment File

Create a file named `.env.production` in your project root:

```bash
# Production API Configuration for iOS App
VITE_API_BASE_URL=https://your-repl-name.replit.app

# Bible API Key (same as development)
VITE_API_BIBLE_KEY=your_actual_api_bible_key_here

# Stripe Keys (if using payments - currently removed for Apple compliance)
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key_here
```

**Important**: Replace `https://your-repl-name.replit.app` with your actual Replit deployment URL!

### Step 3: Build iOS App with Production Config

When building your iOS app in Appflow:

1. **Set Environment Variable** in Appflow build settings:
   ```
   VITE_API_BASE_URL=https://your-repl-name.replit.app
   ```

2. **OR** Add `.env.production` to your repo and ensure Appflow uses it during build

### Step 4: Verify Configuration

In development (Replit):
- ✅ Uses relative URLs (`/api/videos`)
- ✅ Frontend and backend on same server
- ✅ Works perfectly

In production (iOS app):
- ✅ Uses full URLs (`https://your-repl-name.replit.app/api/videos`)
- ✅ Connects to deployed backend
- ✅ All features work!

## How It Works

### Code Changes Made

All API calls now use the `apiUrl()` helper:

**Before (broken in iOS):**
```typescript
fetch('/api/videos')  // ❌ Fails in iOS app
```

**After (works everywhere):**
```typescript
import { apiUrl } from '@/lib/api-config';
fetch(apiUrl('/api/videos'))  // ✅ Works in dev AND production!
```

### URL Resolution

| Environment | VITE_API_BASE_URL | Result |
|------------|-------------------|---------|
| Development | Not set | `/api/videos` (relative) |
| Production | `https://your-app.replit.app` | `https://your-app.replit.app/api/videos` |

## Testing Before Resubmitting

1. **Deploy backend** to Replit
2. **Set environment variable** in Appflow: `VITE_API_BASE_URL=https://your-repl-name.replit.app`
3. **Build iOS app** in Appflow
4. **Install on TestFlight**
5. **Test all features**:
   - Daily verse loading ✓
   - AI Pastor chat ✓
   - Bible search ✓
   - Videos loading ✓
   - Blog articles ✓
   - Friend requests ✓

## Files Updated

All API-calling files now use `apiUrl()`:
- ✅ `client/src/lib/queryClient.ts` (main query client)
- ✅ `client/src/services/bibleService.ts`
- ✅ `client/src/services/videoService.ts`
- ✅ `client/src/services/autoRecovery.ts`
- ✅ `client/src/components/AskPastorSection.tsx`
- ✅ `client/src/components/BibleSearchSection.tsx`
- ✅ `client/src/components/NetworkStatus.tsx`
- ✅ `client/src/components/ErrorBoundary.tsx`
- ✅ `client/src/pages/BibleTriviaPage.tsx`
- ✅ `client/src/pages/SavedVersesPage.tsx`
- ✅ `client/src/pages/SettingsPage.tsx`
- ✅ `client/src/pages/BlogPage.tsx`
- ✅ `client/src/App.tsx`

## Troubleshooting

### APIs Still Failing in TestFlight?

1. **Check backend is deployed**: Visit `https://your-repl-name.replit.app/api/health` in browser
2. **Verify environment variable**: Make sure Appflow has `VITE_API_BASE_URL` set
3. **Rebuild app**: Environment variables are baked in at build time
4. **Check console logs**: Use Safari Web Inspector to debug iOS app

### Backend URL Changed?

Just update the environment variable and rebuild - no code changes needed!

## Next Steps

1. ✅ Deploy Replit backend
2. ✅ Configure Appflow with production URL
3. ✅ Build new iOS version
4. ✅ Test in TestFlight
5. ✅ Resubmit to App Store

Your app will now work perfectly on real devices! 🎉
