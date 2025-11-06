import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Purchases, LOG_LEVEL, CustomerInfo, PurchasesOfferings } from '@revenuecat/purchases-capacitor';
import { Capacitor } from '@capacitor/core';

interface PurchaseContextType {
  isPremium: boolean;
  isLoading: boolean;
  offerings: PurchasesOfferings | null;
  purchaseProduct: () => Promise<void>;
  restorePurchases: () => Promise<void>;
  customerInfo: CustomerInfo | null;
}

const PurchaseContext = createContext<PurchaseContextType | undefined>(undefined);

interface PurchaseProviderProps {
  children: ReactNode;
}

export function PurchaseProvider({ children }: PurchaseProviderProps) {
  const [isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [offerings, setOfferings] = useState<PurchasesOfferings | null>(null);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);

  // Initialize RevenueCat
  useEffect(() => {
    async function initializeRevenueCat() {
      // Only initialize on native platforms
      if (!Capacitor.isNativePlatform()) {
        console.log('[RevenueCat] Web platform detected - skipping initialization');
        setIsLoading(false);
        // On web, grant premium for testing
        setIsPremium(true);
        return;
      }

      try {
        // Enable debug logging in development
        await Purchases.setLogLevel({ level: LOG_LEVEL.DEBUG });

        // Configure RevenueCat with iOS API key
        // TODO: Replace with actual RevenueCat API key from dashboard
        const apiKey = Capacitor.getPlatform() === 'ios' 
          ? 'appl_YOUR_IOS_API_KEY_HERE' 
          : 'goog_YOUR_ANDROID_API_KEY_HERE';

        await Purchases.configure({
          apiKey: apiKey,
          appUserID: undefined // Let RevenueCat generate anonymous ID
        });

        console.log('[RevenueCat] Configured successfully');

        // Check current purchase status
        await checkPurchaseStatus();

        // Load available offerings (products)
        await loadOfferings();
      } catch (error) {
        console.error('[RevenueCat] Initialization error:', error);
        setIsLoading(false);
      }
    }

    initializeRevenueCat();
  }, []);

  // Check if user has purchased premium
  async function checkPurchaseStatus() {
    try {
      const info = await Purchases.getCustomerInfo();
      setCustomerInfo(info.customerInfo);

      // Check if user has the "premium" entitlement
      const hasPremium = info.customerInfo.entitlements.active['premium'] !== undefined;
      setIsPremium(hasPremium);
      
      console.log('[RevenueCat] Premium status:', hasPremium);
      setIsLoading(false);
    } catch (error) {
      console.error('[RevenueCat] Error checking purchase status:', error);
      setIsLoading(false);
    }
  }

  // Load available products/offerings
  async function loadOfferings() {
    try {
      const result = await Purchases.getOfferings();
      setOfferings(result);
      
      console.log('[RevenueCat] Offerings loaded:', result);
    } catch (error) {
      console.error('[RevenueCat] Error loading offerings:', error);
    }
  }

  // Purchase the premium product
  async function purchaseProduct() {
    if (!offerings?.current) {
      console.error('[RevenueCat] No offerings available');
      throw new Error('Product offerings are not available. Please try again later.');
    }

    try {
      setIsLoading(true);

      // Get the lifetime package
      const lifetimePackage = offerings.current.availablePackages.find(
        pkg => pkg.identifier === '$rc_lifetime' || pkg.packageType === 'LIFETIME'
      );

      if (!lifetimePackage) {
        console.error('[RevenueCat] Lifetime package not found');
        setIsLoading(false);
        throw new Error('Product not found. Please contact support.');
      }

      // Make the purchase
      const { customerInfo: info } = await Purchases.purchasePackage({
        aPackage: lifetimePackage
      });

      // Update premium status
      const hasPremium = info.entitlements.active['premium'] !== undefined;
      setIsPremium(hasPremium);
      setCustomerInfo(info);

      console.log('[RevenueCat] Purchase successful, premium:', hasPremium);
      setIsLoading(false);
    } catch (error: any) {
      console.error('[RevenueCat] Purchase error:', error);
      
      // Check if user cancelled
      if (error.userCancelled) {
        console.log('[RevenueCat] User cancelled purchase');
      }
      
      setIsLoading(false);
      throw error;
    }
  }

  // Restore previous purchases
  async function restorePurchases() {
    try {
      setIsLoading(true);
      const { customerInfo: info } = await Purchases.restorePurchases();
      
      // Update premium status
      const hasPremium = info.entitlements.active['premium'] !== undefined;
      setIsPremium(hasPremium);
      setCustomerInfo(info);

      console.log('[RevenueCat] Purchases restored, premium:', hasPremium);
      setIsLoading(false);
    } catch (error) {
      console.error('[RevenueCat] Restore error:', error);
      setIsLoading(false);
      throw error;
    }
  }

  return (
    <PurchaseContext.Provider 
      value={{ 
        isPremium, 
        isLoading, 
        offerings, 
        purchaseProduct, 
        restorePurchases,
        customerInfo 
      }}
    >
      {children}
    </PurchaseContext.Provider>
  );
}

export function usePurchase() {
  const context = useContext(PurchaseContext);
  if (context === undefined) {
    throw new Error('usePurchase must be used within a PurchaseProvider');
  }
  return context;
}
