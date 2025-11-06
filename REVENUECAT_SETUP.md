# RevenueCat Setup Guide - $3.99 One-Time Purchase

This guide walks you through setting up the $3.99 one-time purchase for "The Gospel in 5 Minutes" iOS app.

## Overview

- **Product Type**: Non-Consumable In-App Purchase (one-time, lifetime access)
- **Price**: $3.99 USD
- **Product ID**: `gospel_lifetime_access`
- **RevenueCat Entitlement**: `premium`
- **RevenueCat Package**: Lifetime ($rc_lifetime)

---

## Step 1: Create RevenueCat Account

1. Go to https://www.revenuecat.com
2. Click **"Sign Up"**
3. Create your account (free for up to $2,500/month in revenue)
4. Create a new **Project**: "The Gospel in 5 Minutes"

---

## Step 2: Add Your iOS App to RevenueCat

1. In RevenueCat dashboard, click **"Apps"**
2. Click **"+ Add App"**
3. Select **iOS**
4. Fill in details:
   - **App Name**: The Gospel in 5 Minutes
   - **Bundle ID**: `com.thegospelin5minutes.app` (or your actual bundle ID)
5. Click **"Save"**

---

## Step 3: Connect App Store Connect

RevenueCat needs access to App Store Connect to validate purchases:

### Generate App Store Connect API Key:

1. Go to https://appstoreconnect.apple.com
2. Navigate to **Users and Access** → **Keys** (under "Integrations")
3. Click **"+"** to generate a new key
4. **Name**: RevenueCat Integration
5. **Access**: **Admin** (required for RevenueCat)
6. Click **"Generate"**
7. **Download the .p8 file** immediately (you can only download once!)
8. Note the **Key ID** and **Issuer ID**

### Upload to RevenueCat:

1. In RevenueCat dashboard, go to your iOS app
2. Navigate to **"Service Credentials"**
3. Click **"Add App Store Connect API Key"**
4. Upload the **.p8 file**
5. Enter **Key ID** and **Issuer ID**
6. Click **"Save"**

---

## Step 4: Create In-App Purchase in App Store Connect

1. Go to https://appstoreconnect.apple.com
2. Select your app: **"The Gospel in 5 Minutes"**
3. Navigate to **"In-App Purchases"** tab
4. Click **"+"** → **"Non-Consumable"**

### Product Details:

- **Reference Name**: Gospel Lifetime Access
- **Product ID**: `gospel_lifetime_access` (MUST match exactly)
- **Price**: Select $3.99 USD tier

### Localization (English - U.S.):

- **Display Name**: Full Access
- **Description**: One-time purchase for lifetime access to all premium features including AI Pastor, Bible Reading Plans, daily devotionals, videos, and more.

### Review Information:

- **Screenshot**: Upload a screenshot of the paywall page
- **Review Notes**: "One-time purchase unlocks all premium features. No subscriptions, no recurring charges."

5. Click **"Save"**

**⚠️ Important**: The product won't be active until your app is submitted for review!

---

## Step 5: Create Product in RevenueCat

1. In RevenueCat dashboard, go to **"Products"**
2. Click **"+ Add Product"**
3. Select **iOS** platform
4. **Product ID**: `gospel_lifetime_access` (must match App Store Connect)
5. **Product Type**: Non-Consumable
6. Click **"Add"**

---

## Step 6: Create Entitlement in RevenueCat

Entitlements define what users get access to:

1. In RevenueCat dashboard, go to **"Entitlements"**
2. Click **"+ New Entitlement"**
3. **Identifier**: `premium`
4. **Description**: Full access to all premium features
5. Click **"Save"**

---

## Step 7: Create Offering in RevenueCat

Offerings group products together:

1. In RevenueCat dashboard, go to **"Offerings"**
2. Click **"+ New Offering"**
3. **Identifier**: `default` (this is your current offering)
4. **Description**: Main offering for Gospel app
5. Click **"Create"**

### Add Package to Offering:

1. Click **"+ Add Package"**
2. **Package Type**: Lifetime (`$rc_lifetime`)
3. **Product**: Select `gospel_lifetime_access`
4. **Entitlement**: Select `premium`
5. Click **"Save"**

6. Click **"Make Current"** to set this as the active offering

---

## Step 8: Get Your RevenueCat API Keys

1. In RevenueCat dashboard, go to **"API Keys"** (under Project Settings)
2. Copy your **Public iOS SDK Key** (starts with `appl_...`)
3. This key is safe to use in client-side code

---

## Step 9: Update the App Code

Open `client/src/contexts/PurchaseContext.tsx` and replace the API key:

```typescript
// Line ~41
const apiKey = Capacitor.getPlatform() === 'ios' 
  ? 'appl_YOUR_ACTUAL_KEY_HERE'  // ← Replace with your actual key
  : 'goog_YOUR_ANDROID_API_KEY_HERE';
```

**Example**:
```typescript
const apiKey = Capacitor.getPlatform() === 'ios' 
  ? 'appl_AbCdEfGhIjKlMnOpQrStUvWxYz'  // Your actual RevenueCat iOS key
  : 'goog_YOUR_ANDROID_API_KEY_HERE';
```

---

## Step 10: Test in Sandbox

Before submitting to App Store:

### Create Sandbox Tester:

1. Go to https://appstoreconnect.apple.com
2. Navigate to **Users and Access** → **Sandbox Testers**
3. Click **"+"**
4. Create a test Apple ID (use a unique email)
5. **Important**: Use this account ONLY for testing, never sign into iCloud with it

### Test the Purchase:

1. Build and run your app on a real iOS device (not simulator)
2. Go to the paywall page
3. Click **"Unlock for $3.99"**
4. Sign in with your **sandbox tester account**
5. Complete the test purchase (it's free in sandbox)
6. Verify you get premium access

### Test Restore Purchases:

1. Delete the app
2. Reinstall it
3. Go to More page → Click **"Restore"**
4. Sign in with same sandbox account
5. Verify premium access is restored

---

## Step 11: Submit to App Store

1. Build your app in Xcode or Appflow
2. Upload to App Store Connect
3. In App Store Connect, go to your app submission
4. **In-App Purchases Section**:
   - Select `gospel_lifetime_access`
   - Ensure it's marked **"Ready to Submit"**
5. Submit your app for review

**⚠️ Apple Review Tips**:
- Clearly describe what premium features include
- Make sure the paywall UI is clear and not deceptive
- The "Restore" button must be easily accessible (it is in More page)
- Don't mention "donation" or "charity" - this is a content purchase

---

## Pricing Tiers (Reference)

If you want to change the price later:

- **$0.99** - Tier 1
- **$1.99** - Tier 2
- **$2.99** - Tier 3
- **$3.99** - Tier 4 ← Current
- **$4.99** - Tier 5
- **$9.99** - Tier 10

---

## Troubleshooting

### "Product not found" in app

**Solution**: 
- Wait 2-4 hours after creating product in App Store Connect
- Make sure Product ID matches exactly: `gospel_lifetime_access`
- Verify App Store Connect API key is uploaded to RevenueCat

### Purchase fails in production

**Solution**:
- Ensure in-app purchase is approved by Apple (check App Store Connect)
- Verify RevenueCat API key is correct
- Check that user is signed into a valid Apple ID

### Restore doesn't work

**Solution**:
- RevenueCat automatically links purchases to the Apple ID
- Make sure the same Apple ID is used
- Call `restorePurchases()` which queries Apple's servers

---

## Support

- **RevenueCat Docs**: https://docs.revenuecat.com
- **RevenueCat Support**: support@revenuecat.com
- **Apple Developer**: https://developer.apple.com/contact/

---

## Security Notes

✅ **DO**:
- Keep your App Store Connect API key (.p8 file) secure
- Use RevenueCat's Public SDK key in your app (it's safe)
- Test thoroughly in sandbox before production

❌ **DON'T**:
- Never commit .p8 files to git
- Don't use production Apple IDs for testing (use sandbox testers)
- Don't share your RevenueCat secret API keys

---

## Next Steps After Setup

Once everything is working:

1. Monitor revenue in RevenueCat dashboard
2. Check customer support messages for purchase issues  
3. Consider adding more offerings (e.g., promotional pricing)
4. Track conversion rates and optimize paywall UI

---

**Questions?** Feel free to ask for help setting up any step!
