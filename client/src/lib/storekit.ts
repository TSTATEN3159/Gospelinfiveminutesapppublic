import { Capacitor } from '@capacitor/core';

type ProductInfo = { id: string; displayName: string; description: string; price: string; type: string };
type Entitlement = { productId: string; expirationDate?: number | null; revocationDate?: number | null; ownershipType?: string };

const plugin =
  (Capacitor as any).Plugins?.StoreKitBridge ||
  (window as any).Capacitor?.Plugins?.StoreKitBridge;

function assertPlugin() {
  if (!plugin) throw new Error('StoreKitBridge not found (iOS build only). Did you run: npx cap sync ios ?');
}

export async function loadProducts(productIds: string[]): Promise<ProductInfo[]> {
  assertPlugin();
  const res = await plugin.loadProducts({ productIds });
  return res.products as ProductInfo[];
}

export async function purchase(productId: string): Promise<'success'|'pending'|'cancelled'|'unknown'> {
  assertPlugin();
  const res = await plugin.purchase({ productId });
  return res.status as any;
}

export async function restore(): Promise<Entitlement[]> {
  assertPlugin();
  const res = await plugin.restore({});
  return res.entitlements as Entitlement[];
}

export async function getEntitlements(): Promise<Entitlement[]> {
  assertPlugin();
  const res = await plugin.getEntitlements({});
  return res.entitlements as Entitlement[];
}

export async function presentOfferCodeRedemption(): Promise<void> {
  assertPlugin();
  await plugin.presentOfferCodeRedemption({});
}
