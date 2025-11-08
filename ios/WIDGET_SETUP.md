# iOS Widget Setup Guide

## Overview
This guide walks you through setting up the iOS Home Screen and Lock Screen widgets for "The Gospel in 5 Minutes" app.

## Features
- **Daily Verse Widget**: Displays God's Word on the iPhone home screen
- **Multiple Sizes**: Small, Medium, and Large widget options
- **Auto-Update**: Widget refreshes at midnight with new verse
- **Theme Colors**: Dynamic colors based on verse content (Faith, Love, Hope, Peace, Wisdom)
- **App Groups**: Shared data between main app and widget extension

---

## Setup Steps

### 1. Add Widget Extension in Xcode

1. Open `ios/App/App.xcworkspace` in Xcode
2. **File → New → Target**
3. Select **Widget Extension**
4. Name it **GospelWidget**
5. Language: **Swift**
6. **Do NOT** select "Include Configuration Intent"
7. Click **Finish**
8. When prompted, click **Activate** to activate the scheme

### 2. Configure App Groups

#### A. Enable App Groups for Main App
1. Select the **App** target
2. Go to **Signing & Capabilities**
3. Click **+ Capability**
4. Add **App Groups**
5. Click the **+** button under App Groups
6. Add: `group.com.gospelapp.shared`
7. Ensure it's checked

#### B. Enable App Groups for Widget
1. Select the **GospelWidget** target
2. Go to **Signing & Capabilities**
3. Click **+ Capability**
4. Add **App Groups**
5. Click the **+** button under App Groups
6. Add the SAME group: `group.com.gospelapp.shared`
7. Ensure it's checked

### 3. Replace Widget Files

#### A. Replace GospelWidget.swift
1. Delete the auto-generated `GospelWidget.swift` file
2. Copy the file from `ios/App/GospelWidget/GospelWidget.swift`
3. Ensure it's in the GospelWidget target

#### B. Replace Info.plist
1. Replace the GospelWidget's `Info.plist` with our version
2. Located at `ios/App/GospelWidget/Info.plist`

### 4. Add Widget Updater Plugin

1. The plugin files should already be in `ios/App/App/Plugins/`:
   - `WidgetUpdater.swift`
   - `WidgetUpdater.m` (Capacitor registration)
2. **In Xcode**, verify both files are in the **App** target:
   - Right-click `Plugins` folder → **Add Files to "App"**
   - Select both `WidgetUpdater.swift` and `WidgetUpdater.m`
   - Ensure **"App" target** is checked
   - Click **Add**
3. **Repeat** for Live Activity Manager:
   - Add `LiveActivityManager.swift`
   - Add `LiveActivityManager.m`
   - Both must be in **App** target

### 5. Verify Plugin Registration

1. Open `ios/App/App/Plugins/` in Xcode
2. You should see:
   - ✅ `WidgetUpdater.swift`
   - ✅ `WidgetUpdater.m`
   - ✅ `LiveActivityManager.swift`
   - ✅ `LiveActivityManager.m`
3. Check **Build Phases** → **Compile Sources**:
   - Both `.swift` files should be listed
   - Both `.m` files should be listed
4. If missing, manually add them to the target

### 6. Enable Live Activities Capability (iOS 16.1+)

**CRITICAL STEPS - Live Activity will NOT work without these:**

#### Option A: Using Xcode UI (Recommended)
1. Select the **App** target in Xcode
2. Go to **Signing & Capabilities** tab
3. Click **+ Capability** button
4. Search for and add **Push Notifications**
5. Click **+ Capability** again
6. Scroll to find **Background Modes**, add it
7. In Background Modes, check **Remote notifications**
8. **MOST IMPORTANT**: Xcode 14.1+ should show a **"Supports Live Activities"** toggle
   - If visible, turn it **ON**
   - This adds `com.apple.developer.usernotifications.activities` entitlement

#### Option B: Manual Entitlements (If Option A doesn't work)
1. Open `ios/App/App/App.entitlements` in Xcode
2. Ensure these keys exist:
   ```xml
   <key>com.apple.security.application-groups</key>
   <array>
       <string>group.com.gospelapp.shared</string>
   </array>
   <key>com.apple.developer.usernotifications.time-sensitive</key>
   <true/>
   <key>com.apple.developer.usernotifications.activities</key>
   <true/>
   ```

#### Verification
After enabling capabilities, verify in `App.entitlements`:
- ✅ `com.apple.security.application-groups` with your group ID
- ✅ `com.apple.developer.usernotifications.activities` set to `true`
- ✅ App target **Build Settings** → **CODE_SIGN_ENTITLEMENTS** points to `App/App.entitlements`

**Without the `activities` entitlement, `ActivityAuthorizationInfo().areActivitiesEnabled` returns `false` and Live Activity will fail silently!**

### 7. Build & Run

1. Select the **App** scheme (not GospelWidget)
2. Build and run on a physical device or simulator
3. Long-press the home screen
4. Tap the **+** button (top-left)
5. Search for "Daily Verse"
6. Select your preferred size
7. Tap **Add Widget**

---

## How It Works

### Data Flow

```
Main App (React/Capacitor)
    ↓
widgetUpdater.updateDailyVerse()
    ↓
WidgetUpdaterPlugin (Swift)
    ↓
UserDefaults (App Groups)
    ↓
Widget Timeline Provider
    ↓
Widget UI (SwiftUI)
```

### Automatic Updates

1. **On App Launch**: Daily verse loads and updates widget
2. **At Midnight**: Widget timeline schedules automatic refresh
3. **Manual Update**: User can trigger update anytime in app

### Theme Detection

The widget automatically determines theme colors based on verse content:
- **Faith**: Blue gradient (default)
- **Love**: Pink/red gradient
- **Hope**: Green gradient
- **Peace**: Cyan gradient
- **Wisdom**: Purple gradient

---

## Testing

### Test Widget Updates

1. Open the app
2. The daily verse should load
3. Widget should automatically update
4. Check widget on home screen - should show current verse

### Test Different Sizes

Add all three widget sizes to see different layouts:
- **Small**: Verse snippet with icon
- **Medium**: Verse with book icon
- **Large**: Full verse with date

### Test Theme Colors

Load different verses to see theme changes:
- **John 3:16** → Love (pink)
- **Philippians 4:6** → Peace (cyan)
- **Proverbs 3:5** → Wisdom (purple)
- **Hebrews 11:1** → Faith (blue)

---

## Troubleshooting

### Widget Not Showing
- Ensure App Groups are configured correctly
- Both App and Widget must use `group.com.gospelapp.shared`
- Rebuild the project

### Widget Not Updating
- Check that `widgetUpdater.updateDailyVerse()` is being called
- Verify App Groups have the same identifier
- Check Xcode console for widget logs

### Build Errors
- Clean build folder: **Product → Clean Build Folder**
- Restart Xcode
- Ensure all files are in correct targets

---

## Live Activity Setup (iOS 16.1+)

### What is Live Activity?
Live Activity shows a **countdown to midnight** on:
- **Lock Screen**: Persistent banner with verse and countdown
- **Dynamic Island** (iPhone 14 Pro+): Interactive countdown display
- Updates in real-time without opening the app

### Setup Steps

1. **Add Live Activity File**
   - File is located at `ios/App/GospelWidget/LiveActivityWidget.swift`
   - Should be included in **GospelWidget** target

2. **Enable Required Capabilities**
   - Select **App** target
   - Go to **Signing & Capabilities**
   - Ensure **App Groups** is configured
   - Ensure **Push Notifications** is added (for Live Activities)
   - Ensure **Background Modes** → **Remote notifications** is checked

3. **Add Live Activity Manager Plugin**
   - File: `ios/App/App/Plugins/LiveActivityManager.swift`
   - Should be in **App** target

4. **Test Live Activity**
   - Open app on iOS 16.1+ device
   - Daily verse loads automatically
   - Live Activity starts countdown to midnight
   - Check Lock Screen for countdown banner
   - Check Dynamic Island (iPhone 14 Pro+) for compact view

### How It Works

**Automatic Activation:**
- App launches → Daily verse loads
- Widget updates with verse
- Live Activity starts countdown
- Updates every minute until midnight
- At midnight, refreshes with new verse

**User Experience:**
- **Lock Screen**: Full verse with countdown timer
- **Dynamic Island - Compact**: Book icon + time remaining
- **Dynamic Island - Expanded**: Current verse + countdown
- **Tap**: Opens app to full verse

---

## Advanced Features

### Custom Themes
Edit `themeColors()` function in `GospelWidget.swift` to customize gradient colors.

### Update Frequency
Widget updates at midnight by default. To change:
- Edit `getTimeline()` in `Provider` struct
- Modify the `nextDate` calculation

### Live Activity Customization
Edit `LiveActivityWidget.swift` to customize:
- Countdown format
- Display layout
- Colors and fonts
- Dynamic Island presentation

### Background Refresh
For more frequent updates, enable:
1. **Signing & Capabilities**
2. Add **Background Modes**
3. Check **Background fetch**

---

## Production Checklist

Before App Store submission:

- [ ] Widget displays correctly in all three sizes
- [ ] App Groups are configured in App Store Connect
- [ ] Widget updates automatically at midnight
- [ ] Theme colors display correctly
- [ ] Live Activity countdown works on iOS 16.1+ devices
- [ ] All plugin files (.swift and .m) are in App target Build Phases
- [ ] Push Notifications capability is enabled
- [ ] Background Modes → Remote notifications is checked
- [ ] Privacy Policy mentions widget data usage
- [ ] Screenshots include widget and Live Activity examples

---

## Support

For issues or questions:
1. Check Xcode console logs
2. Verify App Groups configuration
3. Ensure widget extension is properly added to project

**Widget Bundle ID**: Should be `{your-app-bundle-id}.GospelWidget`

Example: If app is `com.yourcompany.gospelapp`, widget is `com.yourcompany.gospelapp.GospelWidget`
