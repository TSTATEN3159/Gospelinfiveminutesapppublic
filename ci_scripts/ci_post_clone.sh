#!/bin/sh
set -euo pipefail
echo ">>> ci_post_clone.sh running in $(pwd)"

cd ios/App

if [ -f "Gemfile" ]; then
  echo "Using Bundler to install CocoaPods…"
  bundle install
  bundle exec pod install --repo-update
else
  echo "Installing Pods with system CocoaPods…"
  pod install --repo-update
fi

echo ">>> Finished pod install in $(pwd)"
ls -1
