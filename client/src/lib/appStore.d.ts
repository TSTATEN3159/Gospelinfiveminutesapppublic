/**
 * Type definitions for appStore.js
 * LocalStorage-based application state management
 */

export interface AppStore {
  getAllReadingProgress(): Record<string, Record<number, { completedAt: string }>>;
  getReadingProgress(planType: string): Record<number, { completedAt: string }>;
  setReadingProgress(planType: string, dayNumber: number): void;
  // Add other methods as needed
}

declare const appStore: AppStore;
export default appStore;  // Match the actual default export from .js file
