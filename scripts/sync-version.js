#!/usr/bin/env node
/**
 * Sync version from package.json to iOS Info.plist
 * 
 * This ensures package.json is the single source of truth for version numbers.
 * Run this before building to keep versions in sync.
 * 
 * Usage:
 *   npm run sync:version
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PACKAGE_JSON_PATH = path.join(__dirname, '../package.json');
const INFO_PLIST_PATH = path.join(__dirname, '../ios/App/App/Info.plist');

function syncVersion() {
  // Read package.json version
  const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8'));
  const packageVersion = packageJson.version || '1.0.0';
  
  console.log(`📦 package.json version: ${packageVersion}`);
  
  // Check if Info.plist exists
  if (!fs.existsSync(INFO_PLIST_PATH)) {
    console.warn('⚠️  Info.plist not found. Run "npx cap sync ios" first.');
    return;
  }
  
  // Read Info.plist
  let infoPlistContent = fs.readFileSync(INFO_PLIST_PATH, 'utf8');
  
  // Extract current version
  const versionMatch = infoPlistContent.match(/<key>CFBundleShortVersionString<\/key>\s*<string>([\d.]+)<\/string>/);
  const currentVersion = versionMatch ? versionMatch[1] : null;
  
  if (currentVersion === packageVersion) {
    console.log('✅ Versions already in sync');
    return;
  }
  
  // Update Info.plist
  infoPlistContent = infoPlistContent.replace(
    /<key>CFBundleShortVersionString<\/key>\s*<string>[\d.]+<\/string>/,
    `<key>CFBundleShortVersionString</key>\n\t<string>${packageVersion}</string>`
  );
  
  fs.writeFileSync(INFO_PLIST_PATH, infoPlistContent, 'utf8');
  
  console.log(`✅ Synced Info.plist version: ${currentVersion} → ${packageVersion}`);
}

try {
  syncVersion();
} catch (error) {
  console.error('❌ Error syncing version:', error.message);
  process.exit(1);
}
