/**
 * Type definitions for appStore.js
 * LocalStorage-based application state management
 */

export interface TriviaStats {
  displayName: string;
  dailyStreak: number;
  lastDailyDate: string | null;
  dailyCrowns: number;
  highestTitle: "None" | "Bible Student" | "Bible Scholar" | "Bible Expert" | "Defender of the Faith";
  mastery: {
    oldTestament: number;
    gospels: number;
    epistles: number;
    prophecy: number;
    peopleOfGod: number;
    geography: number;
  };
  powerUps: {
    secondChance: number;
    revealScripture: number;
    removeTwo: number;
  };
}

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
  
  // Trivia Stats - tracks daily streaks, crowns, mastery, titles
  getTriviaStats(): TriviaStats;
  saveTriviaStats(stats: TriviaStats): void;
  resetTriviaStats(): void;
}

declare const appStore: AppStore;
export default appStore;  // Match the actual default export from .js file
