import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Capacitor } from '@capacitor/core';
import { loadProducts, getEntitlements, purchase, restore } from '@/lib/storekit';
import { isTestFlightBuild } from '@/lib/testflight';

const PRODUCT_ID = '01version101';
const STORAGE_KEY = 'gospel_premium_purchased';

interface ProductInfo {
  id: string;
  displayName: string;
  description: string;
  price: string;
  type: string;
}

interface Entitlement {
  productId: string;
  expirationDate?: number | null;
}

interface PurchaseContextType {
  isPremium: boolean;
  isLoading: boolean;
  isTestFlight: boolean;
  products: ProductInfo[];
  purchaseProduct: (productId: string) => Promise<'success' | 'pending' | 'cancelled' | 'unknown'>;
  restorePurchases: () => Promise<{ success: boolean; message: string }>;
}

const PurchaseContext = createContext<PurchaseContextType | undefined>(undefined);

export function PurchaseProvider({ children }: { children: ReactNode }) {
  const [isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isTestFlight, setIsTestFlight] = useState(false);
  const [products, setProducts] = useState<ProductInfo[]>([]);

  useEffect(() => {
    (async () => {
      // Initialize purchases normally (no bypass in TestFlight)
      await initializePurchases();

      // TestFlight flag only for UI messaging
      isTestFlightBuild().then(isTF => {
        setIsTestFlight(isTF);
        if (isTF) {
          console.log('[Purchase] TestFlight detected - purchases will use sandbox (free for testing)');
        }
      });
    })();
  }, []);

  async function initializePurchases() {
    try {
      if (!Capacitor.isNativePlatform()) {
        console.log('[Purchase] Web platform - skipping StoreKit');
        const localPurchase = localStorage.getItem(STORAGE_KEY);
        setIsPremium(localPurchase === 'true');
        setIsLoading(false);
        return;
      }

      // Check for existing entitlements (works in both TestFlight and Production)
      const ents = await getEntitlements();
      const active = isActiveEntitlement(ents);
      setIsPremium(active);
      
      if (active) {
        localStorage.setItem(STORAGE_KEY, 'true');
      }

      // Load products (TestFlight uses sandbox pricing, Production uses real pricing)
      const prods = await loadProducts([PRODUCT_ID]);
      setProducts(prods);
    } catch (error) {
      console.error('[Purchase] Initialization error:', error);
      const localPurchase = localStorage.getItem(STORAGE_KEY);
      setIsPremium(localPurchase === 'true');
    } finally {
      setIsLoading(false);
    }
  }

  function isActiveEntitlement(ents: Entitlement[]): boolean {
    if (!ents || ents.length === 0) return false;
    const now = Date.now() / 1000;
    return ents.some(e => 
      e.productId === PRODUCT_ID && (!e.expirationDate || e.expirationDate > now)
    );
  }

  async function purchaseProduct(productId: string) {
    try {
      if (!Capacitor.isNativePlatform()) {
        console.log('[Purchase] Web platform - not available');
        throw new Error('Purchases are only available in the iOS app. Please download from the App Store.');
      }

      const status = await purchase(productId);
      
      if (status === 'success') {
        const ents = await getEntitlements();
        const active = isActiveEntitlement(ents);
        setIsPremium(active);
        
        if (active) {
          localStorage.setItem(STORAGE_KEY, 'true');
        }
      }
      
      return status;
    } catch (error) {
      console.error('[Purchase] Purchase error:', error);
      throw error;
    }
  }

  async function restorePurchases() {
    try {
      if (!Capacitor.isNativePlatform()) {
        console.log('[Purchase] Web platform - not available');
        return {
          success: false,
          message: 'Purchase restoration is only available in the iOS app. Download from the App Store to make a purchase.'
        };
      }

      const ents = await restore();
      const active = isActiveEntitlement(ents);
      setIsPremium(active);
      
      if (active) {
        localStorage.setItem(STORAGE_KEY, 'true');
        return {
          success: true,
          message: 'Your previous purchase has been restored successfully.'
        };
      } else {
        return {
          success: false,
          message: 'No previous purchases found on this Apple ID.'
        };
      }
    } catch (error) {
      console.error('[Purchase] Restore error:', error);
      throw error;
    }
  }

  return (
    <PurchaseContext.Provider value={{ isPremium, isLoading, isTestFlight, products, purchaseProduct, restorePurchases }}>
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
