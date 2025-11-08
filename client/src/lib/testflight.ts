import { Capacitor } from '@capacitor/core';

export async function isTestFlightBuild(): Promise<boolean> {
  if (!Capacitor.isNativePlatform()) return false;
  
  // Heuristic: in TestFlight, the app store receipt is usually a sandbox receipt.
  // If you implemented the TestFlightFlag plugin, prefer that. Otherwise just return false
  // and rely on reviewers using sandbox anyway.
  return false; // Safe default; banner is optional.
}
