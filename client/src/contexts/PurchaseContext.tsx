import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Capacitor } from '@capacitor/core';
import { loadProducts, getEntitlements, purchase, restore } from '@/lib/storekit';

const PRODUCT_ID = 'com.tstaten.gospelin5minutes.lifetime_unlock';
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
  products: ProductInfo[];
  purchaseProduct: (productId: string) => Promise<'success' | 'pending' | 'cancelled' | 'unknown'>;
  restorePurchases: () => Promise<void>;
}

const PurchaseContext = createContext<PurchaseContextType | undefined>(undefined);

export function PurchaseProvider({ children }: { children: ReactNode }) {
  const [isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<ProductInfo[]>([]);

  useEffect(() => {
    initializePurchases();
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

      const ents = await getEntitlements();
      const active = isActiveEntitlement(ents);
      setIsPremium(active);
      
      if (active) {
        localStorage.setItem(STORAGE_KEY, 'true');
      }

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
        console.log('[Purchase] Web platform - simulating purchase');
        localStorage.setItem(STORAGE_KEY, 'true');
        setIsPremium(true);
        return 'success' as const;
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
        console.log('[Purchase] Web platform - checking local storage');
        const localPurchase = localStorage.getItem(STORAGE_KEY);
        setIsPremium(localPurchase === 'true');
        return;
      }

      const ents = await restore();
      const active = isActiveEntitlement(ents);
      setIsPremium(active);
      
      if (active) {
        localStorage.setItem(STORAGE_KEY, 'true');
      }
    } catch (error) {
      console.error('[Purchase] Restore error:', error);
      throw error;
    }
  }

  return (
    <PurchaseContext.Provider value={{ isPremium, isLoading, products, purchaseProduct, restorePurchases }}>
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
