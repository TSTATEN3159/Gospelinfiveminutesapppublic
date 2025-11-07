import { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import TestFlightFlag from '@/plugins/testflight';

export function useTestFlight() {
  const [isTestFlight, setIsTestFlight] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkTestFlight() {
      // Only check on native platforms
      if (!Capacitor.isNativePlatform()) {
        setIsTestFlight(false);
        setIsLoading(false);
        return;
      }

      try {
        const result = await TestFlightFlag.isTestFlight();
        setIsTestFlight(result.isTestFlight);
        console.log('[TestFlight] Running in TestFlight:', result.isTestFlight);
      } catch (error) {
        console.error('[TestFlight] Detection error:', error);
        setIsTestFlight(false);
      } finally {
        setIsLoading(false);
      }
    }

    checkTestFlight();
  }, []);

  return { isTestFlight, isLoading };
}
