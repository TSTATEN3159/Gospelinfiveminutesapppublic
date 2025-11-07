#!/bin/sh

# Xcode Cloud Post-Clone Script
# This script runs after the repository is cloned in Xcode Cloud
# Purpose: Install CocoaPods dependencies for iOS build

set -e

echo "📦 Installing CocoaPods dependencies..."

# Navigate to iOS directory
cd ios/App

# Install CocoaPods if not already installed
if ! command -v pod &> /dev/null; then
    echo "Installing CocoaPods..."
    gem install cocoapods
fi

# Install iOS dependencies
echo "Running pod install..."
pod install

echo "✅ CocoaPods dependencies installed successfully"
