const STORAGE_KEY = "bibleBookmarks_v2";

export interface BookmarkFolder {
  id: string;
  name: string;
  createdAt: string;
}

export interface BookmarkItem {
  id: string;
  reference: string;
  folderId: string;
  note: string;
  createdAt: string;
  updatedAt: string;
}

interface BookmarkState {
  folders: BookmarkFolder[];
  bookmarks: BookmarkItem[];
}

function loadState(): BookmarkState {
  if (typeof window === "undefined") {
    return { folders: [], bookmarks: [] };
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const defaultFolder: BookmarkFolder = {
      id: "default",
      name: "My Verses",
      createdAt: new Date().toISOString(),
    };
    const initial: BookmarkState = { folders: [defaultFolder], bookmarks: [] };
    saveState(initial);
    return initial;
  }

  try {
    const parsed = JSON.parse(raw) as BookmarkState;
    return {
      folders: parsed.folders ?? [],
      bookmarks: parsed.bookmarks ?? [],
    };
  } catch {
    const fallback: BookmarkState = { folders: [], bookmarks: [] };
    saveState(fallback);
    return fallback;
  }
}

function saveState(state: BookmarkState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function getFolders(): BookmarkFolder[] {
  return loadState().folders;
}

export function getBookmarksForFolder(folderId: string): BookmarkItem[] {
  const state = loadState();
  return state.bookmarks
    .filter((b) => b.folderId === folderId)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function addFolder(name: string): BookmarkFolder {
  const state = loadState();
  const id = `folder-${Date.now()}`;

  const folder: BookmarkFolder = {
    id,
    name: name.trim() || "New Folder",
    createdAt: new Date().toISOString(),
  };

  state.folders.push(folder);
  saveState(state);
  return folder;
}

export function renameFolder(id: string, newName: string) {
  const state = loadState();
  const folder = state.folders.find((f) => f.id === id);
  if (!folder) return;

  folder.name = newName.trim() || folder.name;
  saveState(state);
}

export function deleteFolder(id: string) {
  const state = loadState();
  state.folders = state.folders.filter((f) => f.id !== id);
  state.bookmarks = state.bookmarks.filter((b) => b.folderId !== id);
  saveState(state);
}

export function isBookmarked(reference: string, folderId?: string): boolean {
  const state = loadState();
  if (folderId) {
    return state.bookmarks.some(
      (b) => b.reference === reference && b.folderId === folderId
    );
  }
  return state.bookmarks.some((b) => b.reference === reference);
}

export function toggleBookmark(
  reference: string,
  folderId: string,
  initialNote: string = ""
): { added: boolean; item?: BookmarkItem } {
  const state = loadState();

  const existing = state.bookmarks.find(
    (b) => b.reference === reference && b.folderId === folderId
  );

  if (existing) {
    state.bookmarks = state.bookmarks.filter((b) => b.id !== existing.id);
    saveState(state);
    return { added: false };
  }

  const item: BookmarkItem = {
    id: `bm-${Date.now()}`,
    reference,
    folderId,
    note: initialNote,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  state.bookmarks.push(item);
  saveState(state);
  return { added: true, item };
}

export function updateBookmarkNote(id: string, note: string) {
  const state = loadState();
  const item = state.bookmarks.find((b) => b.id === id);
  if (!item) return;
  item.note = note;
  item.updatedAt = new Date().toISOString();
  saveState(state);
}

export function deleteBookmark(id: string) {
  const state = loadState();
  state.bookmarks = state.bookmarks.filter((b) => b.id !== id);
  saveState(state);
}
