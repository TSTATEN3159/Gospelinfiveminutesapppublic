# Quick Setup: iOS Auto-Versioning

## ✅ What's Already Done

I've created two automated version management scripts:

1. **`scripts/bump-ios-version.js`** - Auto-increments iOS version numbers
2. **`scripts/sync-version.js`** - Syncs package.json version to Info.plist

Both scripts are **ready to use** and have been tested successfully:
- ✅ Current version: 1.0.0 (Build 8)
- ✅ Scripts work with your ES module setup
- ✅ Compatible with Appflow CI/CD

## 🚀 How to Use Right Now

### Option 1: Run Directly (No Setup Required)

```bash
# Increment build number only (7 → 8)
node scripts/bump-ios-version.js

# Increment patch version (1.0.0 → 1.0.1)
node scripts/bump-ios-version.js patch

# Increment minor version (1.0.0 → 1.1.0)
node scripts/bump-ios-version.js minor

# Increment major version (1.0.0 → 2.0.0)
node scripts/bump-ios-version.js major

# Sync package.json version to Info.plist
node scripts/sync-version.js
```

### Option 2: Add to package.json (Optional - For Convenience)

**Manually add these to your `package.json` scripts:**

```json
{
  "scripts": {
    "bump:ios": "node scripts/bump-ios-version.js",
    "bump:ios:patch": "node scripts/bump-ios-version.js patch",
    "bump:ios:minor": "node scripts/bump-ios-version.js minor",
    "bump:ios:major": "node scripts/bump-ios-version.js major",
    "sync:version": "node scripts/sync-version.js",
    "build:ios": "node scripts/sync-version.js && node scripts/bump-ios-version.js && npm run build && npx cap sync ios"
  }
}
```

Then you can use shorthand:
```bash
npm run bump:ios        # Increment build
npm run bump:ios:patch  # Bump to 1.0.1
npm run build:ios       # Full iOS build
```

## 🔄 Workflow Examples

### Before Each TestFlight Upload

```bash
# Quick version bump
node scripts/bump-ios-version.js

# Build app
npm run build
npx cap sync ios
npx cap open ios

# Upload from Xcode
```

Output: `1.0.0 (8)` → `1.0.0 (9)`

### For Bug Fix Release

```bash
# Bump patch version
node scripts/bump-ios-version.js patch

# Build and deploy
npm run build
npx cap sync ios
```

Output: `1.0.0 (8)` → `1.0.1 (9)`

### For New Feature Release

```bash
# Bump minor version
node scripts/bump-ios-version.js minor

# Build and deploy
npm run build
npx cap sync ios
```

Output: `1.0.0 (8)` → `1.1.0 (9)`

## 🤖 Appflow Automation

### Auto-Increment on Every Appflow Build

In **Ionic Appflow** → **Build Settings** → **Advanced**:

**Pre-build command:**
```bash
node scripts/bump-ios-version.js
```

This automatically bumps the build number before each Appflow build!

### Sync from package.json

If you update `package.json` version manually:

**Pre-build command:**
```bash
node scripts/sync-version.js && node scripts/bump-ios-version.js
```

This syncs the version AND increments the build number.

## 📊 What Just Happened

When you ran the test, the script:
1. ✅ Read `Info.plist`
2. ✅ Found version `1.0.0 (7)`
3. ✅ Incremented to `1.0.0 (8)`
4. ✅ Updated `Info.plist` successfully

Your Info.plist now shows:
```xml
<key>CFBundleShortVersionString</key>
<string>1.0.0</string>
<key>CFBundleVersion</key>
<string>8</string>
```

## 🎯 Quick Reference

| What You Want | Command |
|---------------|---------|
| Just bump build number | `node scripts/bump-ios-version.js` |
| Bug fix release (1.0.0 → 1.0.1) | `node scripts/bump-ios-version.js patch` |
| New feature (1.0.0 → 1.1.0) | `node scripts/bump-ios-version.js minor` |
| Major update (1.0.0 → 2.0.0) | `node scripts/bump-ios-version.js major` |
| Sync from package.json | `node scripts/sync-version.js` |

## ✅ Benefits

1. **No More Manual Editing** - Info.plist updates automatically
2. **Never Forget** - Build numbers always increment
3. **TestFlight Ready** - Apple requires unique build numbers
4. **Appflow Compatible** - Works perfectly with CI/CD
5. **Version Consistency** - package.json and Info.plist stay in sync

## 📖 Full Documentation

See **IOS_VERSION_MANAGEMENT.md** for:
- Complete usage guide
- Version numbering best practices
- Appflow integration details
- Troubleshooting guide

---

**Your iOS app now has professional version management!** 🎉

Next time you build for TestFlight, just run:
```bash
node scripts/bump-ios-version.js
```
