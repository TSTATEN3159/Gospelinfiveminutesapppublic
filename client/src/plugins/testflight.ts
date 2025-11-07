import { registerPlugin } from '@capacitor/core';

export interface TestFlightFlagPlugin {
  isTestFlight(): Promise<{ isTestFlight: boolean }>;
}

const TestFlightFlag = registerPlugin<TestFlightFlagPlugin>('TestFlightFlag', {
  web: () => ({
    async isTestFlight() {
      // On web, always return false (not TestFlight)
      return { isTestFlight: false };
    }
  })
});

export default TestFlightFlag;
