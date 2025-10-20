#!/usr/bin/env node
/**
 * Auto-increment iOS version numbers in Info.plist
 * 
 * This script:
 * 1. Reads current version from Info.plist
 * 2. Increments build number (CFBundleVersion)
 * 3. Optionally updates version string (CFBundleShortVersionString)
 * 
 * Usage:
 *   npm run bump:ios              - Increment build number only
 *   npm run bump:ios patch        - Increment patch version (1.0.0 -> 1.0.1)
 *   npm run bump:ios minor        - Increment minor version (1.0.0 -> 1.1.0)
 *   npm run bump:ios major        - Increment major version (1.0.0 -> 2.0.0)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INFO_PLIST_PATH = path.join(__dirname, '../ios/App/App/Info.plist');

// Parse Info.plist XML
function parseInfoPlist(content) {
  const versionMatch = content.match(/<key>CFBundleShortVersionString<\/key>\s*<string>([\d.]+)<\/string>/);
  const buildMatch = content.match(/<key>CFBundleVersion<\/key>\s*<string>(\d+)<\/string>/);
  
  return {
    version: versionMatch ? versionMatch[1] : '1.0.0',
    build: buildMatch ? parseInt(buildMatch[1]) : 1,
  };
}

// Update Info.plist with new values
function updateInfoPlist(content, newVersion, newBuild) {
  let updated = content.replace(
    /<key>CFBundleShortVersionString<\/key>\s*<string>[\d.]+<\/string>/,
    `<key>CFBundleShortVersionString</key>\n\t<string>${newVersion}</string>`
  );
  
  updated = updated.replace(
    /<key>CFBundleVersion<\/key>\s*<string>\d+<\/string>/,
    `<key>CFBundleVersion</key>\n\t<string>${newBuild}</string>`
  );
  
  return updated;
}

// Increment version number
function incrementVersion(version, type = 'patch') {
  const parts = version.split('.').map(Number);
  
  switch (type) {
    case 'major':
      parts[0]++;
      parts[1] = 0;
      parts[2] = 0;
      break;
    case 'minor':
      parts[1]++;
      parts[2] = 0;
      break;
    case 'patch':
    default:
      parts[2]++;
      break;
  }
  
  return parts.join('.');
}

// Main function
function bumpVersion() {
  const versionType = process.argv[2]; // 'major', 'minor', 'patch', or undefined
  
  // Check if Info.plist exists
  if (!fs.existsSync(INFO_PLIST_PATH)) {
    console.error('❌ Info.plist not found. Run "npx cap sync ios" first.');
    process.exit(1);
  }
  
  // Read current Info.plist
  const content = fs.readFileSync(INFO_PLIST_PATH, 'utf8');
  const { version, build } = parseInfoPlist(content);
  
  console.log(`📱 Current iOS version: ${version} (${build})`);
  
  // Calculate new version
  let newVersion = version;
  let newBuild = build + 1;
  
  if (versionType && ['major', 'minor', 'patch'].includes(versionType)) {
    newVersion = incrementVersion(version, versionType);
    console.log(`🔼 Bumping ${versionType} version`);
  } else {
    console.log(`🔼 Incrementing build number only`);
  }
  
  // Update Info.plist
  const updatedContent = updateInfoPlist(content, newVersion, newBuild);
  fs.writeFileSync(INFO_PLIST_PATH, updatedContent, 'utf8');
  
  console.log(`✅ Updated iOS version: ${newVersion} (${newBuild})`);
  
  // Also update package.json if version changed
  if (newVersion !== version) {
    const packageJsonPath = path.join(__dirname, '../package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJson.version = newVersion;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n', 'utf8');
    console.log(`✅ Updated package.json version: ${newVersion}`);
  }
}

// Run the script
try {
  bumpVersion();
} catch (error) {
  console.error('❌ Error bumping version:', error.message);
  process.exit(1);
}
