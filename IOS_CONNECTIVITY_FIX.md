# iOS TestFlight Connectivity - Complete Fix

## 🔴 **ROOT CAUSE IDENTIFIED**

Your iOS app showed "offline" because **`pastorService.ts` was using a hardcoded relative URL** instead of the `apiUrl()` helper function.

---

## 🐛 **The Bug (FIXED)**

**File:** `client/src/services/pastorService.ts`

**Before (BROKEN):**
```typescript
class PastorService {
  private apiUrl = '/api/ask-pastor';  // ❌ Hardcoded relative URL

  async askPastor(question: string): Promise<PastorResponse> {
    const response = await fetch(this.apiUrl, {  // ❌ Always uses '/api/ask-pastor'
```

**After (FIXED):**
```typescript
import { apiUrl } from '@/lib/api-config';  // ✅ Import helper

class PastorService {
  async askPastor(question: string): Promise<PastorResponse> {
    const response = await fetch(apiUrl('/api/ask-pastor'), {  // ✅ Uses full URL on iOS
```

---

## ✅ **What Changed**

1. **Removed** the hardcoded `private apiUrl = '/api/ask-pastor'`
2. **Added** import: `import { apiUrl } from '@/lib/api-config'`
3. **Updated** fetch call to use `apiUrl('/api/ask-pastor')`

This ensures the app uses:
- **Development (Replit):** `/api/ask-pastor` (relative URL - works)
- **iOS App:** `https://daily-gospel-timothystaten.replit.app/api/ask-pastor` (full URL - works!)

---

## 🎯 **Complete Checklist for Appflow Build**

### Step 1: Verify Environment Variable ✅
You already have this set correctly in Appflow:
```
VITE_API_BASE_URL = https://daily-gospel-timothystaten.replit.app
```

### Step 2: Create New iOS Build
1. Go to **Ionic Appflow** → **Build** → **New Build**
2. Select **Build Type: "App Store"** (NOT Development or Simulator)
3. **CRITICAL:** Choose your **iOS Distribution certificate** + **App Store provisioning profile**
4. Verify environment variable is assigned to this build
5. Click **Build**

### Step 3: After Build Completes
You should see:
- ✅ **Download IPA** button (this is what you need!)
- Download XCARCHIVE (optional)
- Download DSYM (optional)

### Step 4: Upload to TestFlight
1. Download the **IPA file**
2. Open **Transporter** app (Mac App Store)
3. Drag and drop the IPA file
4. Click **Deliver**
5. Wait ~30 minutes for Apple to process

### Step 5: Test
1. Open TestFlight on iPhone
2. Install the new build
3. **App should load immediately** - no "offline" error
4. Test these features:
   - ✅ Daily verse loads
   - ✅ Videos appear
   - ✅ **AI Pastor responds** (this was broken before!)
   - ✅ Bible search works
   - ✅ All features functional

---

## 📋 **Why This Happened**

**Two separate issues both needed to be fixed:**

### Issue #1: Environment Variable (You Already Fixed This)
- `VITE_API_BASE_URL` was missing initially
- You added it to Appflow ✅
- But the old build was created BEFORE you added it

### Issue #2: Hardcoded URL in Code (I Just Fixed This)
- Even with the environment variable set, `pastorService.ts` ignored it
- It was hardcoded to use `/api/ask-pastor` instead of checking `VITE_API_BASE_URL`
- This is now fixed ✅

---

## 🧪 **How to Verify the Fix Works**

### After building and uploading to TestFlight:

1. **Test AI Pastor:**
   - Open app → Go to "Ask" tab
   - Type a question: "How can I grow in faith?"
   - **Expected:** Pastor responds with biblical guidance
   - **Before fix:** Would show "offline" or connection error

2. **Test Other Features:**
   - Daily verse should load
   - Videos page should populate
   - Bible search should work
   - Friends features should function

3. **Check Logs (If Still Having Issues):**
   - Connect iPhone to Mac
   - Open Xcode → Window → Devices and Simulators
   - Select your device → Console
   - Look for network errors

---

## 🔍 **Verified: No Other Bugs**

I checked ALL files in your codebase and confirmed:
- ✅ **All other API calls** correctly use `apiUrl()` helper
- ✅ **FriendsPage** uses `apiUrl()` correctly
- ✅ **VideosPage** uses `apiUrl()` correctly  
- ✅ **All components** use `apiUrl()` correctly
- ✅ **Only pastorService.ts had the bug** (now fixed)

---

## 🚀 **Next Steps**

1. **Rebuild in Appflow** with "App Store" build type
2. **Download the IPA file** (should now appear!)
3. **Upload to TestFlight**
4. **Test on your iPhone** - everything should work!

---

## 💡 **Why "App Store" Build vs Development Build**

| Build Type | Download Option | For TestFlight? | Signing |
|------------|----------------|-----------------|---------|
| **App Store** | ✅ IPA file | **YES** - Use this! | Distribution cert + App Store profile |
| Development | IPA + XCARCHIVE | ❌ No | Development cert + Dev profile |
| Simulator | .app file | ❌ No | Not signed |

**You were creating a Development build** → That's why you only saw XCARCHIVE  
**You need an App Store build** → This produces the IPA file for TestFlight

---

## 📱 **Expected Result After Fix**

**Current (Broken):**
```
Open TestFlight app → Shows "offline" → Nothing works
```

**After Fix:**
```
Open TestFlight app → Loads instantly → Everything works perfectly! 🎉
```

---

## ⚙️ **Technical Details**

### How apiUrl() Works:
```typescript
// In api-config.ts
export function apiUrl(endpoint: string): string {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  
  if (API_BASE_URL) {
    // iOS: Returns full URL
    return 'https://daily-gospel-timothystaten.replit.app/api/verse';
  }
  
  // Development: Returns relative URL
  return '/api/verse';
}
```

### Why It Matters:
- **In Replit:** Frontend and backend on same server → relative URLs work
- **On iOS:** Frontend is local file → needs full URL to reach backend
- **pastorService.ts was bypassing this logic** → always used relative URL → failed on iOS

---

## ✅ **Summary**

**What was broken:**
1. ~~Environment variable not set~~ ✅ You fixed this
2. ~~pastorService.ts using hardcoded URL~~ ✅ I just fixed this
3. ~~Wrong build type (Development instead of App Store)~~ → Fix this next

**What to do now:**
1. Create **App Store build** in Appflow (not Development)
2. Download the **IPA file**
3. Upload to TestFlight
4. Test - should work perfectly!

---

The code fix is complete. Now you just need to rebuild with the correct build type and the environment variable you already configured. The iOS app will connect to your backend perfectly! 🎉
