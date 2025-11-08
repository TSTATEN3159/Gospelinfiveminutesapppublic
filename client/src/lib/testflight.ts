import { Capacitor } from '@capacitor/core';

const plugin =
  (Capacitor as any).Plugins?.TestFlightFlag ||
  (window as any).Capacitor?.Plugins?.TestFlightFlag;

export async function isTestFlightBuild(): Promise<boolean> {
  if (!Capacitor.isNativePlatform()) {
    return false;
  }

  try {
    if (!plugin) {
      console.log('[TestFlight] Plugin not found - assuming production build');
      return false;
    }

    const result = await plugin.isTestFlight();
    return result.isTestFlight === true;
  } catch (error) {
    console.error('[TestFlight] Detection error:', error);
    return false;
  }
}
