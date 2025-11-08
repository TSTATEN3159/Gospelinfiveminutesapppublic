import { Capacitor } from '@capacitor/core';

type ProductInfo = { id: string; displayName: string; description: string; price: string; type: string };
type Ent = { productId: string; expirationDate?: number | null };

const plugin =
  (Capacitor as any).Plugins?.StoreKitBridge ||
  (window as any).Capacitor?.Plugins?.StoreKitBridge;

export async function loadProducts(productIds: string[]): Promise<ProductInfo[]> {
  if (!plugin) throw new Error('StoreKitBridge not found (iOS build only).');
  const res = await plugin.loadProducts({ productIds });
  return res.products as ProductInfo[];
}

export async function purchase(productId: string) {
  const res = await plugin.purchase({ productId });
  return res.status as 'success'|'pending'|'cancelled'|'unknown';
}

export async function restore() {
  const res = await plugin.restore({});
  return res.entitlements as Ent[];
}

export async function getEntitlements() {
  const res = await plugin.getEntitlements({});
  return res.entitlements as Ent[];
}
