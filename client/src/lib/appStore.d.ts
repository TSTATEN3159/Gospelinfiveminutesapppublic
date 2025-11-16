/**
 * Type definitions for appStore.js
 * LocalStorage-based application state management
 */

export interface AppStore {
  // Reading Progress
  getAllReadingProgress(): Record<string, Record<number, { completedAt: string }>>;
  getReadingProgress(planType: string): Record<number, { completedAt: string }>;
  setReadingProgress(planType: string, dayNumber: number): void;
  
  // Bookmarks - stores array of reference strings
  getBookmarks(): string[];
  addBookmark(reference: string): void;
  removeBookmark(reference: string): void;
  
  // Notes - stores array of note objects
  getNotes(): Array<{ ref: string; text: string; timestamp: number }>;
  addNote(reference: string, text: string): void;
  removeNote(reference: string): void;
  
  // Profile - stores user profile data
  loadProfile(): { name: string; email: string; birthdate: string };
  saveProfile(profile: { name: string; email: string; birthdate: string }): void;
  deleteProfile(): void;
}

declare const appStore: AppStore;
export default appStore;  // Match the actual default export from .js file
