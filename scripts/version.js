#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PACKAGE_JSON_PATH = path.join(__dirname, '..', 'package.json');
const INFO_PLIST_PATH = path.join(__dirname, '..', 'ios', 'App', 'App', 'Info.plist');

function readPackageJson() {
  const content = fs.readFileSync(PACKAGE_JSON_PATH, 'utf8');
  return JSON.parse(content);
}

function writePackageJson(pkg) {
  fs.writeFileSync(PACKAGE_JSON_PATH, JSON.stringify(pkg, null, 2) + '\n');
}

function readInfoPlist() {
  return fs.readFileSync(INFO_PLIST_PATH, 'utf8');
}

function writeInfoPlist(content) {
  fs.writeFileSync(INFO_PLIST_PATH, content);
}

function updateInfoPlistVersion(plistContent, version, build) {
  let updated = plistContent;
  
  if (version) {
    updated = updated.replace(
      /(<key>CFBundleShortVersionString<\/key>\s*<string>)[^<]*(<\/string>)/,
      `$1${version}$2`
    );
  }
  
  if (build) {
    updated = updated.replace(
      /(<key>CFBundleVersion<\/key>\s*<string>)[^<]*(<\/string>)/,
      `$1${build}$2`
    );
  }
  
  return updated;
}

function parseVersion(version) {
  const parts = version.split('.');
  return {
    major: parseInt(parts[0] || '0'),
    minor: parseInt(parts[1] || '0'),
    patch: parseInt(parts[2] || '0')
  };
}

function formatVersion({ major, minor, patch }) {
  return `${major}.${minor}.${patch}`;
}

function incrementVersion(version, type) {
  const v = parseVersion(version);
  
  switch (type) {
    case 'major':
      v.major++;
      v.minor = 0;
      v.patch = 0;
      break;
    case 'minor':
      v.minor++;
      v.patch = 0;
      break;
    case 'patch':
      v.patch++;
      break;
    default:
      throw new Error(`Invalid version type: ${type}`);
  }
  
  return formatVersion(v);
}

function showCurrentVersions() {
  const pkg = readPackageJson();
  const plist = readInfoPlist();
  
  const versionMatch = plist.match(/<key>CFBundleShortVersionString<\/key>\s*<string>([^<]*)<\/string>/);
  const buildMatch = plist.match(/<key>CFBundleVersion<\/key>\s*<string>([^<]*)<\/string>/);
  
  console.log('\n📱 Current Versions:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📦 package.json:  ${pkg.version}`);
  console.log(`🍎 iOS Version:   ${versionMatch ? versionMatch[1] : 'Not found'}`);
  console.log(`🔢 iOS Build:     ${buildMatch ? buildMatch[1] : 'Not found'}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

function updateVersion(type, customVersion = null, customBuild = null) {
  const pkg = readPackageJson();
  const plist = readInfoPlist();
  
  const currentBuildMatch = plist.match(/<key>CFBundleVersion<\/key>\s*<string>([^<]*)<\/string>/);
  const currentBuild = currentBuildMatch ? parseInt(currentBuildMatch[1]) : 1;
  
  let newVersion;
  if (customVersion) {
    newVersion = customVersion;
  } else if (type) {
    newVersion = incrementVersion(pkg.version, type);
  } else {
    newVersion = pkg.version;
  }
  
  const newBuild = customBuild || (currentBuild + 1).toString();
  
  pkg.version = newVersion;
  writePackageJson(pkg);
  
  const updatedPlist = updateInfoPlistVersion(plist, newVersion, newBuild);
  writeInfoPlist(updatedPlist);
  
  console.log('\n✅ Version Updated Successfully!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📦 package.json:  ${newVersion}`);
  console.log(`🍎 iOS Version:   ${newVersion}`);
  console.log(`🔢 iOS Build:     ${newBuild}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  console.log('💡 Next Steps:');
  console.log('   1. Commit these changes to git');
  console.log('   2. Build your iOS app with: npx cap sync ios');
  console.log('   3. Open in Xcode: npx cap open ios\n');
}

function syncVersions() {
  const plist = readInfoPlist();
  const versionMatch = plist.match(/<key>CFBundleShortVersionString<\/key>\s*<string>([^<]*)<\/string>/);
  
  if (versionMatch) {
    const iosVersion = versionMatch[1];
    const pkg = readPackageJson();
    pkg.version = iosVersion;
    writePackageJson(pkg);
    
    console.log(`\n✅ Synced package.json to match iOS version: ${iosVersion}\n`);
  } else {
    console.log('\n❌ Could not find iOS version in Info.plist\n');
  }
}

function showHelp() {
  console.log(`
📱 iOS Version Manager for The Gospel in 5 Minutes
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Usage:
  npm run version [command] [options]

Commands:
  show                    Show current versions
  patch                   Increment patch version (1.0.0 → 1.0.1)
  minor                   Increment minor version (1.0.0 → 1.1.0)
  major                   Increment major version (1.0.0 → 2.0.0)
  set <version> [build]   Set specific version and optionally build number
  sync                    Sync package.json version from Info.plist
  help                    Show this help message

Examples:
  npm run version show
  npm run version patch              # 1.0.7 → 1.0.8, build 11 → 12
  npm run version minor              # 1.0.7 → 1.1.0, build 11 → 12
  npm run version major              # 1.0.7 → 2.0.0, build 11 → 12
  npm run version set 1.2.0          # Set to 1.2.0, auto-increment build
  npm run version set 1.2.0 15       # Set to 1.2.0 and build 15
  npm run version sync               # Sync package.json from iOS

Notes:
  • Updates both package.json and ios/App/App/Info.plist
  • Build number auto-increments unless specified
  • Always commit changes after updating version

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
}

const args = process.argv.slice(2);
const command = args[0];

try {
  switch (command) {
    case 'show':
    case undefined:
      showCurrentVersions();
      break;
    case 'patch':
    case 'minor':
    case 'major':
      updateVersion(command);
      break;
    case 'set':
      if (!args[1]) {
        console.error('❌ Error: Please specify a version number');
        console.log('   Example: npm run version set 1.2.0\n');
        process.exit(1);
      }
      updateVersion(null, args[1], args[2]);
      break;
    case 'sync':
      syncVersions();
      break;
    case 'help':
    case '--help':
    case '-h':
      showHelp();
      break;
    default:
      console.error(`❌ Unknown command: ${command}`);
      showHelp();
      process.exit(1);
  }
} catch (error) {
  console.error(`❌ Error: ${error.message}\n`);
  process.exit(1);
}
