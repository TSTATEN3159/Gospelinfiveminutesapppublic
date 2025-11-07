#!/bin/sh
set -euo pipefail

# Move into the iOS project folder
cd ios

# Install CocoaPods
if [ -f "Gemfile" ]; then
  echo "Using Bundler to install CocoaPods…"
  bundle install
  bundle exec pod install --repo-update
else
  echo "Installing Pods with system CocoaPods…"
  pod install --repo-update
fi
