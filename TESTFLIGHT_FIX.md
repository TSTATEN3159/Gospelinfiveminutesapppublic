# CRITICAL: TestFlight "Offline" Error Fix

## 🔴 Problem Identified

Your TestFlight app shows **"you're currently offline"** because:

**The iOS app is NOT connecting to your backend API.**

---

## Root Cause

Your app uses relative URLs (`/api/verse`) instead of full URLs when `VITE_API_BASE_URL` is not set:

```typescript
// api-config.ts (Line 10-17)
const productionUrl = import.meta.env.VITE_API_BASE_URL;

if (productionUrl) {
  return productionUrl;  // ✅ This should be used
}

return '';  // ❌ iOS app is using this (empty string)
```

When empty:
```typescript
apiUrl('/api/verse')  →  '/api/verse'  ❌ Doesn't work on iPhone
```

When set correctly:
```typescript
apiUrl('/api/verse')  →  'https://daily-gospel-timothystaten.replit.app/api/verse'  ✅ Works
```

---

## 🔧 Solution

### If Building in Ionic Appflow:

1. **Go to Appflow** → Your App → **Build** → **Environments**
2. **Add Environment Variable**:
   ```
   Key:   VITE_API_BASE_URL
   Value: https://daily-gospel-timothystaten.replit.app
   ```
3. **Rebuild your iOS app**
4. **Upload to TestFlight again**

### If Building Locally (Xcode):

**Option 1: Create .env.production file (Recommended)**

Create a file named `.env.production` in your project root:

```bash
VITE_API_BASE_URL=https://daily-gospel-timothystaten.replit.app
```

Then build:
```bash
npm run build
npx cap sync ios
npx cap open ios
```

**Option 2: Set environment variable before building**

```bash
export VITE_API_BASE_URL=https://daily-gospel-timothystaten.replit.app
npm run build
npx cap sync ios
npx cap open ios
```

---

## Verification Steps

### 1. Check if environment variable is set during build

Look for this in build output:
```
✓ building for production...
  VITE_API_BASE_URL: https://daily-gospel-timothystaten.replit.app
```

### 2. Verify in built files

After building, check the compiled code:
```bash
grep -r "daily-gospel-timothystaten.replit.app" dist/public/assets/
```

You should see your backend URL in the JavaScript bundle.

### 3. Test in TestFlight

After rebuild and upload:
1. Open app in TestFlight
2. App should connect immediately
3. No "offline" message
4. Daily verse, videos, etc. should load

---

## Why This Happened

**Vite Environment Variables** only get embedded during build time:

| When | VITE_API_BASE_URL | Result |
|------|-------------------|--------|
| Local dev | Not needed | Relative URLs work (same server) |
| iOS build without env var | ❌ Not set | App uses `/api/verse` (fails) |
| iOS build with env var | ✅ Set | App uses full URL (works) |

---

## Quick Test

Want to verify your backend is reachable from iOS?

**From iPhone Safari**, visit:
```
https://daily-gospel-timothystaten.replit.app/api/health
```

You should see:
```json
{"success":true,"overall":"degraded","services":[...]}
```

If this works in Safari but not in your app, it confirms the environment variable issue.

---

## For Appflow Users

### Complete Setup:

1. **Appflow** → **Environments** → **Create New Environment**
2. **Name**: `Production iOS`
3. **Add Variables**:
   ```
   VITE_API_BASE_URL=https://daily-gospel-timothystaten.replit.app
   ```
4. **Build Settings** → Select this environment
5. **Rebuild**

### Pre-build Script (Optional - Verification)

Add this to verify environment is set:

**Appflow Pre-build command**:
```bash
echo "VITE_API_BASE_URL is: $VITE_API_BASE_URL"
node scripts/sync-version.js
node scripts/bump-ios-version.js
```

This will print the variable in build logs so you can verify it's set.

---

## Common Mistakes to Avoid

❌ **Don't** set environment variables in iOS Xcode build settings  
✅ **Do** set them before running `npm run build`

❌ **Don't** add VITE_API_BASE_URL to Info.plist  
✅ **Do** add it to Appflow environment or .env.production

❌ **Don't** try to set it at runtime in the app  
✅ **Do** set it at build time (Vite embeds it)

---

## Troubleshooting

### App still shows "offline" after setting variable

1. **Verify build includes the variable**:
   ```bash
   # After building
   grep "daily-gospel" dist/public/assets/*.js
   ```
   Should find your backend URL

2. **Check iOS app logs**:
   - Connect iPhone to Mac
   - Open Xcode → Window → Devices and Simulators
   - Select your iPhone → Open Console
   - Run app and check for network errors

3. **Test API directly**:
   Open Safari on iPhone and visit:
   ```
   https://daily-gospel-timothystaten.replit.app/api/daily-verse
   ```

### Build succeeds but variable not embedded

Make sure you're using:
```bash
npm run build  # ✅ Correct - uses Vite
```

Not:
```bash
tsc  # ❌ Wrong - TypeScript doesn't embed env vars
```

---

## Expected Result

After fixing:

✅ **App loads immediately** (no "offline" message)  
✅ **Daily verse appears**  
✅ **Videos load**  
✅ **AI Pastor works**  
✅ **Bible search functions**  
✅ **All features work**

---

## Summary

**The fix is simple**: Set `VITE_API_BASE_URL` environment variable during the build process.

**In Appflow**: Add to environment configuration  
**Locally**: Create `.env.production` file or export variable

Then rebuild and re-upload to TestFlight.

**Your backend is working fine** - the iOS app just doesn't know where to find it!
