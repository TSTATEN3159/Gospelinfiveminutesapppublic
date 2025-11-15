# 📱 iOS Version Management Guide

## Quick Start

Your app version is managed in two places:
- **package.json**: `"version": "1.0.0"`
- **iOS Info.plist**: Version `1.0.7`, Build `11`

## Usage

### Show Current Versions
```bash
node scripts/version.js show
```

### Increment Version (Patch)
Increments patch number (1.0.7 → 1.0.8) and build number (11 → 12):
```bash
node scripts/version.js patch
```

### Increment Version (Minor)
Increments minor number (1.0.7 → 1.1.0, resets patch to 0) and build number:
```bash
node scripts/version.js minor
```

### Increment Version (Major)
Increments major number (1.0.7 → 2.0.0, resets minor and patch to 0) and build number:
```bash
node scripts/version.js major
```

### Set Specific Version
Set custom version and auto-increment build:
```bash
node scripts/version.js set 1.2.0
```

Set custom version AND custom build number:
```bash
node scripts/version.js set 1.2.0 15
```

### Sync package.json from iOS
If Info.plist is your source of truth, sync package.json to match:
```bash
node scripts/version.js sync
```

## Version Strategy

### Semantic Versioning (MAJOR.MINOR.PATCH)

- **MAJOR** (1.0.0 → 2.0.0): Breaking changes, major redesigns
- **MINOR** (1.0.0 → 1.1.0): New features, no breaking changes  
- **PATCH** (1.0.0 → 1.0.1): Bug fixes, small improvements

### Build Number

The build number (CFBundleVersion) **must always increment** for App Store submissions. It's automatically incremented with each version change.

## Typical Release Workflow

### 1. **TestFlight Beta Release**
```bash
# Feature update
node scripts/version.js minor
# Result: 1.0.7 → 1.1.0, Build 11 → 12

# Bug fix
node scripts/version.js patch  
# Result: 1.1.0 → 1.1.1, Build 12 → 13
```

### 2. **Sync iOS Project**
```bash
npx cap sync ios
```

### 3. **Open in Xcode**
```bash
npx cap open ios
```

### 4. **Build & Archive**
In Xcode:
1. Product → Archive
2. Upload to App Store Connect
3. Submit to TestFlight or App Review

### 5. **Commit Changes**
```bash
git add package.json ios/App/App/Info.plist
git commit -m "Bump version to 1.1.0 (build 12)"
git push
```

## App Store Guidelines

### Version Requirements
- **First submission**: Start at 1.0.0
- **Updates**: Increment based on change type
- **Rejected build**: Keep version, increment build only
- **Major redesign**: Use new major version (2.0.0)

### Build Number Rules
- Must be **unique** for each upload
- Must be **greater than** previous builds
- Can be **any format** (we use simple integers: 1, 2, 3...)
- **Never reuse** a build number

## Examples

### Scenario 1: Feature Release
```bash
# Adding AI verse simplification feature
node scripts/version.js minor
# 1.0.7 → 1.1.0, Build 11 → 12
```

### Scenario 2: Bug Fix
```bash
# Fixing crash on verse sharing
node scripts/version.js patch
# 1.1.0 → 1.1.1, Build 12 → 13
```

### Scenario 3: Rejected by App Review
```bash
# Keep version 1.1.1, just increment build
node scripts/version.js set 1.1.1 14
# Version stays 1.1.1, Build 13 → 14
```

### Scenario 4: Major Redesign
```bash
# Complete UI overhaul for iOS 18
node scripts/version.js major
# 1.1.1 → 2.0.0, Build 14 → 15
```

## Troubleshooting

### "Version already exists" in App Store Connect
This means you uploaded a build with this version before. Either:
```bash
# Option 1: Increment build only
node scripts/version.js set 1.1.0 14

# Option 2: Increment patch version
node scripts/version.js patch
```

### package.json and Info.plist out of sync
```bash
# Sync package.json to match iOS (recommended)
node scripts/version.js sync

# Or manually set both
node scripts/version.js set 1.0.7 11
```

### Need to see what changed
```bash
git diff package.json ios/App/App/Info.plist
```

## Files Updated

When you run the version script, it updates:
1. **package.json** → `"version": "1.x.x"`
2. **ios/App/App/Info.plist** → `<CFBundleShortVersionString>` and `<CFBundleVersion>`

## Tips

✅ **Always increment build number** for new uploads  
✅ **Use semantic versioning** for user-facing changes  
✅ **Commit version changes** before building  
✅ **Tag releases** in git: `git tag v1.1.0`  
✅ **Document changes** in release notes  

❌ **Don't skip versions** (1.0.7 → 1.0.9)  
❌ **Don't reuse build numbers**  
❌ **Don't change version** after App Store upload  
❌ **Don't forget** to sync with `npx cap sync ios`  

## Quick Reference

| Command | Effect | Example |
|---------|--------|---------|
| `show` | Display current versions | 1.0.7 (build 11) |
| `patch` | Bug fixes | 1.0.7 → 1.0.8 |
| `minor` | New features | 1.0.7 → 1.1.0 |
| `major` | Breaking changes | 1.0.7 → 2.0.0 |
| `set X.Y.Z` | Custom version | → 1.2.3 |
| `set X.Y.Z B` | Custom version & build | → 1.2.3 (build 15) |
| `sync` | Copy iOS → package.json | package.json = 1.0.7 |

---

**Questions?** Check [Apple's App Store Connect Help](https://developer.apple.com/help/app-store-connect/) for official guidelines.
