const STORAGE_KEY = "bibleBookmarks";

export interface Bookmark {
  reference: string;
  text?: string;
  version?: string;
  timestamp: number;
}

export function getBookmarks(): Bookmark[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading bookmarks:", error);
    return [];
  }
}

export function isBookmarked(reference: string): boolean {
  const bookmarks = getBookmarks();
  return bookmarks.some(b => b.reference === reference);
}

export function toggleBookmark(reference: string, text?: string, version?: string): boolean {
  try {
    let bookmarks = getBookmarks();
    const existingIndex = bookmarks.findIndex(b => b.reference === reference);
    
    if (existingIndex >= 0) {
      // Remove bookmark
      bookmarks = bookmarks.filter(b => b.reference !== reference);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
      return false; // Not bookmarked anymore
    } else {
      // Add bookmark
      bookmarks.push({
        reference,
        text,
        version,
        timestamp: Date.now()
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
      return true; // Now bookmarked
    }
  } catch (error) {
    console.error("Error toggling bookmark:", error);
    return false;
  }
}

export function removeBookmark(reference: string): void {
  try {
    let bookmarks = getBookmarks();
    bookmarks = bookmarks.filter(b => b.reference !== reference);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  } catch (error) {
    console.error("Error removing bookmark:", error);
  }
}

export function clearAllBookmarks(): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  } catch (error) {
    console.error("Error clearing bookmarks:", error);
  }
}
