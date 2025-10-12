# Apple Pay Setup Guide for iOS App

## Overview

This app now supports **Apple Pay for donations** on iOS, providing a seamless, App Store-compliant payment experience. Apple charges **0% fees for nonprofit donations** via Apple Pay (compared to Stripe's 2.9% + $0.30).

---

## Prerequisites

1. **Apple Developer Account** (Individual or Organization)
   - Enroll at https://developer.apple.com/programs/
   - Cost: $99/year

2. **Stripe Account** configured for Apple Pay
   - Dashboard: https://dashboard.stripe.com

3. **Mac with Xcode** (version 15.0 or later)
   - Download from Mac App Store

---

## Step 1: Register Apple Merchant ID

### 1.1 Create Merchant ID

1. Go to [Apple Developer Identifiers](https://developer.apple.com/account/resources/identifiers/list)
2. Click the **"+"** button to create a new identifier
3. Select **"Merchant IDs"** and click **Continue**
4. Enter details:
   - **Description**: `The Gospel in 5 Minutes Donations`
   - **Identifier**: `merchant.com.thegospelin5minutes` (or your own format)
5. Click **Continue** then **Register**

### 1.2 Note Your Merchant ID

Copy your merchant ID (e.g., `merchant.com.thegospelin5minutes`) - you'll need it later.

---

## Step 2: Generate Apple Pay Payment Processing Certificate

### 2.1 In Stripe Dashboard

1. Visit [Stripe Apple Pay Settings](https://dashboard.stripe.com/settings/apple_pay)
2. Click **"Add new application"**
3. Download the **Certificate Signing Request (CSR)** file

### 2.2 In Apple Developer Portal

1. Go to your Merchant ID in [Apple Developer Identifiers](https://developer.apple.com/account/resources/identifiers/list/merchant)
2. Click on your merchant ID
3. Under **Apple Pay Payment Processing Certificate**, click **Create Certificate**
4. Upload the **CSR file** you downloaded from Stripe
5. Click **Continue**
6. Download the generated certificate (`.cer` file)

### 2.3 Upload Certificate to Stripe

1. Return to [Stripe Apple Pay Settings](https://dashboard.stripe.com/settings/apple_pay)
2. Upload the `.cer` certificate file you just downloaded
3. Click **Upload**

✅ **Apple Pay is now configured in Stripe!**

---

## Step 3: Configure Apple Pay in Xcode

### 3.1 Open iOS Project

```bash
cd ios/App
open App.xcworkspace
```

**IMPORTANT**: Always open `.xcworkspace`, NOT `.xcodeproj`!

### 3.2 Add Apple Pay Capability

1. In Xcode, select your app target (`App`)
2. Go to **Signing & Capabilities** tab
3. Click **"+ Capability"** button
4. Search for and add **"Apple Pay"**
5. In the Apple Pay section, click **"+"** to add your merchant ID:
   - Select: `merchant.com.thegospelin5minutes` (or your merchant ID)
6. Ensure the checkbox is selected

### 3.3 Update Merchant ID in Environment (Optional)

If you used a different merchant ID than `merchant.com.thegospelin5minutes`, you can configure it via environment variable:

1. In Xcode, select your app target
2. Go to **Info** tab
3. Add a new property:
   - Key: `VITE_APPLE_MERCHANT_ID`
   - Value: Your actual merchant ID

Or add it to your `.env` file:

```bash
VITE_APPLE_MERCHANT_ID=merchant.com.thegospelin5minutes
```

---

## Step 4: Configure Signing & Provisioning

### 4.1 Team & Bundle ID

1. In Xcode **Signing & Capabilities** tab
2. Select your **Team** from dropdown
3. Verify **Bundle Identifier**: `com.thegospelin5minutes` (or your custom ID)
4. Enable **"Automatically manage signing"**

### 4.2 Provisioning Profile

Xcode will automatically create a provisioning profile with Apple Pay entitlements.

---

## Step 5: Test Apple Pay

### 5.1 Prerequisites for Testing

- **Physical iOS device** (Simulator doesn't support real Apple Pay transactions)
- **Apple Pay enabled** on the device (Settings → Wallet & Apple Pay)
- **Card added** to Apple Wallet (can use test cards)

### 5.2 Test Card Setup (Sandbox)

For testing, add a test card to your device's Apple Wallet:

**Stripe Test Cards**:
- Card Number: `4242 4242 4242 4242`
- Expiry: Any future date
- CVV: Any 3 digits

More test cards: https://stripe.com/docs/testing#cards

### 5.3 Run on Device

1. Connect your iOS device to Mac
2. In Xcode, select your device from the scheme selector
3. Click **Run** (▶️ button)
4. Navigate to **More → Donate**
5. Enter an amount and tap **Donate**
6. Apple Pay sheet should appear
7. Complete payment with Face ID/Touch ID

### 5.4 Verify Payment

1. Check Stripe Dashboard: https://dashboard.stripe.com/test/payments
2. You should see the test payment
3. Check app logs for success confirmation

---

## Step 6: App Store Submission

### 6.1 Nonprofit Verification (Required for 0% Fees)

Apple offers **0% fees for verified nonprofits**:

1. Register at [Benevity Causes Portal](https://causes.benevity.org)
2. Provide your organization's nonprofit status
3. Or obtain a **Candid Seal of Transparency** (free): https://help.candid.org/s/

### 6.2 App Store Metadata

In App Store Connect, ensure you mention:

- **"Apple Pay supported for donations"**
- **"0% Apple fees for nonprofit donations"**
- Screenshots showing Apple Pay donation flow

### 6.3 Review Notes

Add to **App Review Information**:

```
This app uses Apple Pay for nonprofit donations. 
Merchant ID: merchant.com.thegospelin5minutes
Donations are processed via Stripe and benefit our nonprofit mission.
```

---

## Troubleshooting

### Issue: "Apple Pay Not Available" Error

**Solutions**:
1. Ensure device has Apple Pay enabled (Settings → Wallet & Apple Pay)
2. Add a card to Apple Wallet
3. Verify merchant ID matches between code and Xcode capabilities

### Issue: Certificate Error in Stripe

**Solutions**:
1. Ensure you uploaded the correct `.cer` file from Apple
2. Verify CSR was generated from Stripe (not elsewhere)
3. Re-download certificate from Apple and re-upload to Stripe

### Issue: "Invalid Merchant ID" Error

**Solutions**:
1. Verify merchant ID in code matches Apple Developer Portal
2. Check `VITE_APPLE_MERCHANT_ID` environment variable
3. Ensure merchant ID is added in Xcode capabilities
4. Clean build folder in Xcode (Product → Clean Build Folder)

### Issue: Payment Fails on Real Device

**Solutions**:
1. Use live Stripe keys (not test keys) for production
2. Ensure device region/currency matches app settings
3. Check Stripe webhook configuration for payment confirmation
4. Verify backend `/api/create-payment-intent` endpoint is accessible

---

## Architecture Notes

### How Apple Pay Works in This App

1. **Platform Detection**: App detects iOS using Capacitor
2. **Payment Flow**:
   - User selects amount → taps "Donate"
   - App checks Apple Pay availability
   - Backend creates Stripe PaymentIntent
   - Apple Pay sheet presented with payment summary
   - User authorizes with Face ID/Touch ID
   - Stripe processes payment
   - App receives success/failure event
   - Donation recorded in database

### Code Structure

- **Frontend**: `client/src/pages/DonationPage.tsx`
  - Imports `@capacitor-community/stripe` for Apple Pay
  - Uses `StripeCapacitor.createApplePay()` for iOS
  - Falls back to web Stripe for web/Android

- **Backend**: `server/routes.ts`
  - `/api/create-payment-intent` - Creates Stripe PaymentIntent
  - `/api/stripe-webhook` - Verifies and records donations
  - `/api/verify-payment` - Manual payment verification

### Environment Variables

```bash
# Required for Stripe
VITE_STRIPE_PUBLIC_KEY=pk_live_xxx  # Frontend Stripe key
STRIPE_SECRET_KEY=sk_live_xxx       # Backend Stripe key

# Optional for custom merchant ID
VITE_APPLE_MERCHANT_ID=merchant.com.thegospelin5minutes
```

---

## Production Checklist

Before App Store submission:

- [ ] Apple Merchant ID registered and configured
- [ ] Payment Processing Certificate uploaded to Stripe
- [ ] Apple Pay capability added in Xcode
- [ ] Tested on physical iOS device
- [ ] Live Stripe keys configured (not test keys)
- [ ] Nonprofit verification completed (for 0% fees)
- [ ] Privacy Policy updated with payment processing disclosure
- [ ] App Store metadata includes Apple Pay mention
- [ ] Screenshot of Apple Pay donation flow included

---

## Resources

- **Stripe Apple Pay Docs**: https://stripe.com/docs/apple-pay
- **Apple Pay Guidelines**: https://developer.apple.com/apple-pay/
- **Capacitor Stripe Plugin**: https://stripe.capacitorjs.jp/docs/apple-pay/
- **Nonprofit 0% Fees**: https://developer.apple.com/apple-pay/nonprofits/
- **Benevity Registration**: https://causes.benevity.org

---

## Support

For issues:
1. Check Xcode console logs for errors
2. Review Stripe Dashboard event logs
3. Test with Stripe test cards first
4. Ensure all certificates are valid and not expired

**Your app is now ready for Apple Pay donations!** 🎉
