#!/bin/sh
set -euo pipefail

# Find the Podfile location (handles ios/App, ios, etc.)
PODFILE_DIR="$(git ls-files | grep -E '(^|/)Podfile$' | head -n1 | xargs dirname)"

if [ -z "${PODFILE_DIR}" ]; then
  echo "❌ No Podfile found in repo."
  exit 1
fi

echo "➡️ Running CocoaPods in: ${PODFILE_DIR}"
cd "${PODFILE_DIR}"

if [ -f "Gemfile" ]; then
  echo "Using Bundler to install CocoaPods…"
  bundle install
  bundle exec pod install --repo-update
else
  echo "Installing Pods with system CocoaPods…"
  pod install --repo-update
fi
