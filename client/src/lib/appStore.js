// Simple on-device storage using localStorage (works offline)

const KEY_TODAY = 'dg_todayReading';
const KEY_BOOKMARKS = 'dg_bookmarks';
const KEY_NOTES = 'dg_notes';
const KEY_PROFILE = 'dg_profile'; // name, email, birthdate

export const store = {
  // TODAY'S READING
  saveToday(content) {
    localStorage.setItem(KEY_TODAY, JSON.stringify({ content, savedAt: Date.now() }));
  },
  loadToday() {
    const raw = localStorage.getItem(KEY_TODAY);
    return raw ? JSON.parse(raw).content : null;
  },

  // BOOKMARKS
  addBookmark(ref) {
    const list = store.getBookmarks();
    if (!list.includes(ref)) list.push(ref);
    localStorage.setItem(KEY_BOOKMARKS, JSON.stringify(list));
  },
  getBookmarks() {
    return JSON.parse(localStorage.getItem(KEY_BOOKMARKS) || '[]');
  },
  removeBookmark(ref) {
    const list = store.getBookmarks().filter(x => x !== ref);
    localStorage.setItem(KEY_BOOKMARKS, JSON.stringify(list));
  },

  // NOTES
  addNote(ref, text) {
    const notes = store.getNotes();
    notes.push({ ref, text, createdAt: Date.now() });
    localStorage.setItem(KEY_NOTES, JSON.stringify(notes));
  },
  getNotes() {
    return JSON.parse(localStorage.getItem(KEY_NOTES) || '[]');
  },
  deleteNote(index) {
    const notes = store.getNotes();
    notes.splice(index, 1);
    localStorage.setItem(KEY_NOTES, JSON.stringify(notes));
  },

  // PROFILE (name, email, birthdate)
  saveProfile({ name, email, birthdate }) {
    localStorage.setItem(KEY_PROFILE, JSON.stringify({ name, email, birthdate }));
  },
  loadProfile() {
    const raw = localStorage.getItem(KEY_PROFILE);
    return raw ? JSON.parse(raw) : { name: '', email: '', birthdate: '' };
  },
  deleteProfile() {
    localStorage.removeItem(KEY_PROFILE);
  }
};
