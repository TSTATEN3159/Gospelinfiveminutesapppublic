# iOS Version Management - Auto-Increment System

## Overview
This system automatically manages version numbers for your iOS app, keeping `package.json` and `Info.plist` in sync.

## Two Version Numbers Explained

Your iOS app has TWO version numbers in `Info.plist`:

1. **CFBundleShortVersionString** (e.g., `1.0.0`) 
   - User-facing version number
   - Follows semantic versioning (major.minor.patch)
   - Shown in App Store: "Version 1.0.0"
   - Update for new features/releases

2. **CFBundleVersion** (e.g., `7`)
   - Internal build number
   - Auto-increments with each build
   - Apple uses this to track builds
   - Must always increase

## Scripts Created

### 1. `bump-ios-version.js` - Auto-Increment Versions
Located: `scripts/bump-ios-version.js`

**What it does:**
- Reads current version from `Info.plist`
- Increments build number automatically
- Optionally bumps semantic version (1.0.0 → 1.0.1)
- Syncs changes to `package.json`

### 2. `sync-version.js` - Sync Versions
Located: `scripts/sync-version.js`

**What it does:**
- Reads version from `package.json`
- Updates `Info.plist` to match
- Ensures consistency across files

## How to Use

### Option 1: Add to package.json (Recommended)

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "bump:ios": "node scripts/bump-ios-version.js",
    "bump:ios:patch": "node scripts/bump-ios-version.js patch",
    "bump:ios:minor": "node scripts/bump-ios-version.js minor",
    "bump:ios:major": "node scripts/bump-ios-version.js major",
    "sync:version": "node scripts/sync-version.js",
    "build:ios": "npm run sync:version && npm run bump:ios && npm run build && npx cap sync ios"
  }
}
```

Then use:
```bash
# Before each iOS build (auto-increments build number)
npm run build:ios

# For version updates
npm run bump:ios:patch  # 1.0.0 → 1.0.1
npm run bump:ios:minor  # 1.0.0 → 1.1.0
npm run bump:ios:major  # 1.0.0 → 2.0.0

# Just sync without incrementing
npm run sync:version
```

### Option 2: Run Scripts Directly

```bash
# Auto-increment build number only
node scripts/bump-ios-version.js

# Bump patch version (1.0.0 → 1.0.1) and increment build
node scripts/bump-ios-version.js patch

# Bump minor version (1.0.0 → 1.1.0) and increment build
node scripts/bump-ios-version.js minor

# Bump major version (1.0.0 → 2.0.0) and increment build
node scripts/bump-ios-version.js major

# Sync package.json version to Info.plist
node scripts/sync-version.js
```

## Workflow Examples

### For Daily Development Builds
```bash
# Build for testing (auto-increments build number)
npm run build:ios
# Output: Version 1.0.0 (8) → 1.0.0 (9)
```

### For Bug Fix Release
```bash
# Increment patch version
npm run bump:ios:patch
# Output: 1.0.0 (9) → 1.0.1 (10)

# Build and deploy
npm run build:ios
npx cap open ios
```

### For New Feature Release
```bash
# Increment minor version
npm run bump:ios:minor
# Output: 1.0.1 (10) → 1.1.0 (11)

# Build and deploy
npm run build:ios
npx cap open ios
```

### For Major Release
```bash
# Increment major version
npm run bump:ios:major
# Output: 1.1.0 (11) → 2.0.0 (12)

# Build and deploy
npm run build:ios
npx cap open ios
```

## For Ionic Appflow

### Automatic Version Bump on Each Build

Create a **pre-build hook** in Appflow:

1. Go to Appflow → Build → Automation
2. Add "Pre-build command":
   ```bash
   node scripts/bump-ios-version.js
   ```

This automatically increments the build number with every Appflow build!

### Manual Version Control

If you prefer manual control:

1. Update version in `package.json` before pushing to GitHub:
   ```json
   {
     "version": "1.0.1"
   }
   ```

2. Add pre-build command in Appflow:
   ```bash
   node scripts/sync-version.js
   ```

This syncs your `package.json` version to `Info.plist` during build.

## Version Numbering Best Practices

### Semantic Versioning (CFBundleShortVersionString)

Follow this pattern for user-facing versions:

- **1.0.0** - Initial App Store release
- **1.0.1** - Bug fixes, minor improvements
- **1.1.0** - New features, no breaking changes
- **2.0.0** - Major update, breaking changes

### Build Numbers (CFBundleVersion)

- Auto-increment on every build
- Never reuse a build number
- TestFlight requires build numbers to always increase
- Can reset to 1 when bumping major version (optional)

## Example Timeline

```
Development Phase:
1.0.0 (1)   - Initial development
1.0.0 (2)   - Bug fixes
1.0.0 (3)   - More fixes
1.0.0 (4)   - Feature added
1.0.0 (5)   - Ready for TestFlight

TestFlight Beta:
1.0.0 (6)   - TestFlight build 1
1.0.0 (7)   - TestFlight build 2 (fixes)
1.0.0 (8)   - TestFlight build 3 (more fixes)

App Store Release:
1.0.0 (9)   - App Store submission

Post-Launch Updates:
1.0.1 (10)  - Bug fix update
1.0.2 (11)  - Another bug fix
1.1.0 (12)  - New feature release
2.0.0 (13)  - Major redesign
```

## Troubleshooting

### "Info.plist not found"
Run `npx cap sync ios` first to generate the iOS project.

### Build number not incrementing
Make sure you run the script before building:
```bash
node scripts/bump-ios-version.js
npm run build
npx cap sync ios
```

### Versions out of sync
Run sync script to align everything:
```bash
node scripts/sync-version.js
```

### Apple rejects build (duplicate version)
Each TestFlight/App Store upload must have a UNIQUE build number. Always increment before uploading:
```bash
node scripts/bump-ios-version.js
```

## Git Workflow

### Recommended: Version Control

**Add to `.gitignore`:**
```
# Don't commit build numbers (they auto-increment)
# But DO commit version strings
```

**Commit strategy:**
```bash
# Update version for release
npm run bump:ios:minor

# Commit the version change
git add package.json ios/App/App/Info.plist
git commit -m "Bump version to 1.1.0"
git push

# Appflow will auto-increment build number during CI/CD
```

## Quick Reference

| Command | What it does | Example |
|---------|--------------|---------|
| `npm run bump:ios` | Increment build only | 1.0.0 (7) → 1.0.0 (8) |
| `npm run bump:ios:patch` | Bump patch version | 1.0.0 (7) → 1.0.1 (8) |
| `npm run bump:ios:minor` | Bump minor version | 1.0.0 (7) → 1.1.0 (8) |
| `npm run bump:ios:major` | Bump major version | 1.0.0 (7) → 2.0.0 (8) |
| `npm run sync:version` | Sync from package.json | Uses package.json as source |
| `npm run build:ios` | Full build workflow | Sync + bump + build + cap sync |

## Integration with Appflow

**Full automation setup:**

1. **Pre-build command** (in Appflow settings):
   ```bash
   node scripts/bump-ios-version.js
   ```

2. **Commit changes back** (optional, in Appflow settings):
   - Enable "Commit build artifacts"
   - Pattern: `ios/App/App/Info.plist`

This ensures every Appflow build has a unique, incremented build number!

---

**Your iOS app now has professional, automated version management!** 🎉
