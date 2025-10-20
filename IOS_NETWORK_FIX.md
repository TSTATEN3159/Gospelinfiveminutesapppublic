# iOS Network Configuration Fix for TestFlight

## Problem
TestFlight cannot connect to your backend API because iOS requires specific `Info.plist` configuration for all network requests, even HTTPS.

## Apple's Requirements (App Transport Security)

Apple enforces **App Transport Security (ATS)** which:
- Blocks all HTTP (non-HTTPS) requests by default
- Requires explicit permission for HTTPS requests to external servers
- Needs Info.plist configuration even for secure HTTPS connections

## Solution: Configure Info.plist

You need to add network permissions to `ios/App/App/Info.plist`

### Step 1: Locate Info.plist

If you haven't synced Capacitor yet:
```bash
npm run build
npx cap sync ios
```

This creates: `ios/App/App/Info.plist`

### Step 2: Add Network Configuration

Open `ios/App/App/Info.plist` and add this **before the closing `</dict></plist>`**:

```xml
<!-- Network Permissions for Backend API -->
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSExceptionDomains</key>
    <dict>
        <key>daily-gospel-timothystaten.replit.app</key>
        <dict>
            <key>NSIncludesSubdomains</key>
            <true/>
            <key>NSExceptionAllowsInsecureHTTPLoads</key>
            <false/>
            <key>NSExceptionRequiresForwardSecrecy</key>
            <true/>
            <key>NSExceptionMinimumTLSVersion</key>
            <string>TLSv1.2</string>
        </dict>
        <!-- Allow API.Bible requests -->
        <key>api.scripture.api.bible</key>
        <dict>
            <key>NSIncludesSubdomains</key>
            <true/>
            <key>NSExceptionRequiresForwardSecrecy</key>
            <true/>
        </dict>
        <!-- GetContext API for videos -->
        <key>getcontext.xyz</key>
        <dict>
            <key>NSIncludesSubdomains</key>
            <true/>
            <key>NSExceptionRequiresForwardSecrecy</key>
            <true/>
        </dict>
    </dict>
</dict>

<!-- Internet Permission -->
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsArbitraryLoadsInWebContent</key>
    <true/>
</dict>
```

### Step 3: Update Capacitor Config

Update your `capacitor.config.ts`:

```typescript
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.timothystaten.gospelin5minutes',
  appName: 'The Gospel in 5 Minutes',
  webDir: 'dist/public',
  server: { 
    androidScheme: 'https',
    // Allow cleartext traffic for development (remove for production)
    cleartext: false,
    // iOS-specific server config
    iosScheme: 'capacitor',
    // IMPORTANT: Allow access to external servers
    allowNavigation: [
      'https://daily-gospel-timothystaten.replit.app',
      'https://api.scripture.api.bible',
      'https://getcontext.xyz'
    ]
  },
  ios: {
    contentInset: 'automatic',
    // Use WKWebView scheme handler
    scheme: 'capacitor'
  }
};

export default config;
```

## Complete Info.plist Example

Here's the full section to add to `ios/App/App/Info.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <!-- ... existing keys ... -->
    
    <!-- App Transport Security Configuration -->
    <key>NSAppTransportSecurity</key>
    <dict>
        <!-- Whitelist specific domains (RECOMMENDED for App Store) -->
        <key>NSExceptionDomains</key>
        <dict>
            <!-- Your Replit Backend -->
            <key>daily-gospel-timothystaten.replit.app</key>
            <dict>
                <key>NSIncludesSubdomains</key>
                <true/>
                <key>NSExceptionRequiresForwardSecrecy</key>
                <true/>
                <key>NSExceptionMinimumTLSVersion</key>
                <string>TLSv1.2</string>
            </dict>
            
            <!-- Bible API -->
            <key>api.scripture.api.bible</key>
            <dict>
                <key>NSIncludesSubdomains</key>
                <true/>
                <key>NSExceptionRequiresForwardSecrecy</key>
                <true/>
            </dict>
            
            <!-- GetContext API -->
            <key>getcontext.xyz</key>
            <dict>
                <key>NSIncludesSubdomains</key>
                <true/>
                <key>NSExceptionRequiresForwardSecrecy</key>
                <true/>
            </dict>
        </dict>
        
        <!-- Allow web content loading (for video embeds, etc.) -->
        <key>NSAllowsArbitraryLoadsInWebContent</key>
        <true/>
    </dict>
    
    <!-- ... rest of Info.plist ... -->
</dict>
</plist>
```

## For Ionic Appflow

### Option 1: Manual Info.plist (Recommended)

After each Appflow build, you may need to manually edit Info.plist in Xcode:

1. Download the build
2. Open in Xcode
3. Select App target → Info tab
4. Add the NSAppTransportSecurity keys above
5. Re-archive and upload to TestFlight

### Option 2: Pre-build Hook (Advanced)

Create `ios/App/capacitor.config.json` with:

```json
{
  "appId": "com.timothystaten.gospelin5minutes",
  "appName": "The Gospel in 5 Minutes",
  "webDir": "dist/public",
  "server": {
    "androidScheme": "https",
    "allowNavigation": [
      "https://daily-gospel-timothystaten.replit.app"
    ]
  }
}
```

## Testing Network Connectivity

### Test 1: Check SSL/TLS (from Mac)

```bash
nscurl --ats-diagnostics https://daily-gospel-timothystaten.replit.app
```

This shows if your server meets Apple's requirements.

### Test 2: Check CORS Headers

Your backend needs these headers for iOS:

```typescript
// In server/index.ts
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'capacitor://localhost');
  res.header('Access-Control-Allow-Origin', 'ionic://localhost');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
```

### Test 3: In TestFlight

After adding Info.plist config:
1. Rebuild iOS app
2. Upload to TestFlight
3. Open Safari on iPhone → Settings → Advanced → Web Inspector
4. Check for network errors in console

## Common Errors & Fixes

### Error: "The resource could not be loaded because the App Transport Security policy"

**Fix**: Add your domain to NSExceptionDomains in Info.plist

### Error: "Failed to load resource: The Internet connection appears to be offline"

**Fix**: 
1. Check Info.plist has network permissions
2. Verify VITE_API_BASE_URL is set correctly
3. Test backend URL in browser first

### Error: "CORS policy: No 'Access-Control-Allow-Origin' header"

**Fix**: Update backend CORS to allow `capacitor://localhost`

## Apple App Store Submission Notes

When submitting to App Store, Apple may ask why you need network permissions:

**Justification Template**:
> "This app requires network access to:
> 1. Fetch daily Bible verses from our API server (daily-gospel-timothystaten.replit.app)
> 2. Access Bible.org API for scripture content (api.scripture.api.bible)
> 3. Load Christian video content from GetContext API (getcontext.xyz)
> 
> All connections use HTTPS with TLS 1.2+ encryption. No user data is transmitted over insecure connections."

## Checklist

Before uploading to TestFlight:

- [ ] Info.plist has NSAppTransportSecurity configured
- [ ] All API domains whitelisted
- [ ] capacitor.config.ts updated with allowNavigation
- [ ] Built with `npm run build`
- [ ] Synced with `npx cap sync ios`
- [ ] VITE_API_BASE_URL environment variable set
- [ ] Backend CORS allows capacitor://localhost
- [ ] Tested with nscurl (if on Mac)

## Next Steps

1. Run `npx cap sync ios` to update iOS project
2. Edit `ios/App/App/Info.plist` with network config above
3. Rebuild in Xcode or Appflow
4. Upload to TestFlight
5. Test on physical device

Your API calls are correct - this is purely an iOS configuration issue!
