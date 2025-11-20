// Simple on-device storage using localStorage with in-memory fallback
// Safe for restricted contexts (private mode, disabled storage, etc.)

import { safeLocalStorage } from '../utils/capabilities.ts';

const KEY_TODAY = 'dg_todayReading';
const KEY_BOOKMARKS = 'dg_bookmarks';
const KEY_NOTES = 'dg_notes';
const KEY_PROFILE = 'dg_profile';
const KEY_READING_PROGRESS = 'dg_readingProgress';
const KEY_DISCIPLESHIP_PROGRESS = 'dg_discipleshipProgress';
const KEY_TRIVIA_STATS = 'dg_triviaStats';

let hasWarnedAboutStorage = false;

const warnStorageUnavailable = () => {
  if (!hasWarnedAboutStorage) {
    console.warn('[appStore] localStorage unavailable - using in-memory fallback. Data will not persist.');
    hasWarnedAboutStorage = true;
  }
};

const memoryCache = {};

const safeGetItem = (key) => {
  const value = safeLocalStorage.getItem(key);
  if (value === null && memoryCache[key] !== undefined) {
    warnStorageUnavailable();
    return memoryCache[key];
  }
  return value;
};

const safeSetItem = (key, value) => {
  const success = safeLocalStorage.setItem(key, value);
  if (!success) {
    warnStorageUnavailable();
    memoryCache[key] = value;
  }
};

const safeRemoveItem = (key) => {
  const success = safeLocalStorage.removeItem(key);
  if (!success) {
    warnStorageUnavailable();
    delete memoryCache[key];
  }
};

const appStore = {
  // TODAY'S READING
  saveToday(content) {
    safeSetItem(KEY_TODAY, JSON.stringify({ content, savedAt: Date.now() }));
  },
  loadToday() {
    const raw = safeGetItem(KEY_TODAY);
    return raw ? JSON.parse(raw).content : null;
  },

  // BOOKMARKS
  addBookmark(ref) {
    const list = appStore.getBookmarks();
    if (!list.includes(ref)) list.push(ref);
    safeSetItem(KEY_BOOKMARKS, JSON.stringify(list));
  },
  getBookmarks() {
    const raw = safeGetItem(KEY_BOOKMARKS);
    return raw ? JSON.parse(raw) : [];
  },
  removeBookmark(ref) {
    const list = appStore.getBookmarks().filter(x => x !== ref);
    safeSetItem(KEY_BOOKMARKS, JSON.stringify(list));
  },

  // NOTES
  addNote(ref, text) {
    const notes = appStore.getNotes();
    const existingIndex = notes.findIndex(note => note.ref === ref);
    
    if (existingIndex >= 0) {
      notes[existingIndex] = { 
        ...notes[existingIndex],
        text, 
        updatedAt: Date.now() 
      };
    } else {
      notes.push({ ref, text, createdAt: Date.now() });
    }
    
    safeSetItem(KEY_NOTES, JSON.stringify(notes));
  },
  getNotes() {
    const raw = safeGetItem(KEY_NOTES);
    return raw ? JSON.parse(raw) : [];
  },
  deleteNote(index) {
    const notes = appStore.getNotes();
    notes.splice(index, 1);
    safeSetItem(KEY_NOTES, JSON.stringify(notes));
  },

  // PROFILE (name, email, birthdate)
  saveProfile({ name, email, birthdate }) {
    safeSetItem(KEY_PROFILE, JSON.stringify({ name, email, birthdate }));
  },
  loadProfile() {
    const raw = safeGetItem(KEY_PROFILE);
    return raw ? JSON.parse(raw) : { name: '', email: '', birthdate: '' };
  },
  deleteProfile() {
    safeRemoveItem(KEY_PROFILE);
  },

  // READING PLAN PROGRESS
  markDayComplete(planType, dayNumber) {
    const raw = safeGetItem(KEY_READING_PROGRESS);
    const progress = raw ? JSON.parse(raw) : {};
    
    if (!progress[planType]) {
      progress[planType] = {};
    }
    
    progress[planType][dayNumber] = {
      completedAt: new Date().toISOString()
    };
    
    safeSetItem(KEY_READING_PROGRESS, JSON.stringify(progress));
    
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('readingProgressChanged', { 
        detail: { planType, dayNumber } 
      }));
    }
  },
  
  markDayIncomplete(planType, dayNumber) {
    const raw = safeGetItem(KEY_READING_PROGRESS);
    const progress = raw ? JSON.parse(raw) : {};
    
    if (progress[planType] && progress[planType][dayNumber]) {
      delete progress[planType][dayNumber];
      safeSetItem(KEY_READING_PROGRESS, JSON.stringify(progress));
      
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('readingProgressChanged', { 
          detail: { planType, dayNumber } 
        }));
      }
    }
  },
  
  getReadingProgress(planType) {
    const raw = safeGetItem(KEY_READING_PROGRESS);
    const progress = raw ? JSON.parse(raw) : {};
    return progress[planType] || {};
  },
  
  getAllReadingProgress() {
    const raw = safeGetItem(KEY_READING_PROGRESS);
    return raw ? JSON.parse(raw) : {};
  },

  // DISCIPLESHIP PLAN PROGRESS
  markDiscipleshipDayComplete(planId, dayNumber) {
    const raw = safeGetItem(KEY_DISCIPLESHIP_PROGRESS);
    const progress = raw ? JSON.parse(raw) : {};
    
    if (!progress[planId]) {
      progress[planId] = { completedDays: {}, isSaved: false };
    }
    
    progress[planId].completedDays[dayNumber] = {
      completedAt: new Date().toISOString()
    };
    
    safeSetItem(KEY_DISCIPLESHIP_PROGRESS, JSON.stringify(progress));
    
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('discipleshipProgressChanged', { 
        detail: { planId, dayNumber } 
      }));
    }
  },
  
  markDiscipleshipDayIncomplete(planId, dayNumber) {
    const raw = safeGetItem(KEY_DISCIPLESHIP_PROGRESS);
    const progress = raw ? JSON.parse(raw) : {};
    
    if (progress[planId]?.completedDays?.[dayNumber]) {
      delete progress[planId].completedDays[dayNumber];
      safeSetItem(KEY_DISCIPLESHIP_PROGRESS, JSON.stringify(progress));
      
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('discipleshipProgressChanged', { 
          detail: { planId, dayNumber } 
        }));
      }
    }
  },
  
  toggleDiscipleshipPlanSaved(planId) {
    const raw = safeGetItem(KEY_DISCIPLESHIP_PROGRESS);
    const progress = raw ? JSON.parse(raw) : {};
    
    if (!progress[planId]) {
      progress[planId] = { completedDays: {}, isSaved: true };
    } else {
      progress[planId].isSaved = !progress[planId].isSaved;
    }
    
    safeSetItem(KEY_DISCIPLESHIP_PROGRESS, JSON.stringify(progress));
    
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('discipleshipProgressChanged', { 
        detail: { planId } 
      }));
    }
  },
  
  getDiscipleshipPlanProgress(planId) {
    const raw = safeGetItem(KEY_DISCIPLESHIP_PROGRESS);
    const progress = raw ? JSON.parse(raw) : {};
    return progress[planId] || { completedDays: {}, isSaved: false };
  },
  
  getAllDiscipleshipProgress() {
    const raw = safeGetItem(KEY_DISCIPLESHIP_PROGRESS);
    return raw ? JSON.parse(raw) : {};
  },

  // TRIVIA STATS (streaks, crowns, mastery, titles, power-ups)
  getTriviaStats() {
    // Default stats for new users
    const defaults = {
      displayName: "Guest",
      dailyStreak: 0,
      lastDailyDate: null,
      dailyCrowns: 0,
      highestTitle: "None",
      mastery: {
        oldTestament: 0,
        gospels: 0,
        epistles: 0,
        prophecy: 0,
        peopleOfGod: 0,
        geography: 0,
      },
      powerUps: {
        secondChance: 3,
        revealScripture: 2,
        removeTwo: 2,
      },
    };
    
    const raw = safeGetItem(KEY_TRIVIA_STATS);
    if (!raw) {
      return JSON.parse(JSON.stringify(defaults)); // Return deep clone of defaults
    }
    
    try {
      const stored = JSON.parse(raw);
      
      // Defensive schema validation - merge stored data with defaults
      // This handles corrupted or legacy data gracefully
      return {
        displayName: stored.displayName || defaults.displayName,
        dailyStreak: typeof stored.dailyStreak === 'number' ? stored.dailyStreak : defaults.dailyStreak,
        lastDailyDate: stored.lastDailyDate || defaults.lastDailyDate,
        dailyCrowns: typeof stored.dailyCrowns === 'number' ? stored.dailyCrowns : defaults.dailyCrowns,
        highestTitle: stored.highestTitle || defaults.highestTitle,
        mastery: {
          oldTestament: typeof stored.mastery?.oldTestament === 'number' ? stored.mastery.oldTestament : defaults.mastery.oldTestament,
          gospels: typeof stored.mastery?.gospels === 'number' ? stored.mastery.gospels : defaults.mastery.gospels,
          epistles: typeof stored.mastery?.epistles === 'number' ? stored.mastery.epistles : defaults.mastery.epistles,
          prophecy: typeof stored.mastery?.prophecy === 'number' ? stored.mastery.prophecy : defaults.mastery.prophecy,
          peopleOfGod: typeof stored.mastery?.peopleOfGod === 'number' ? stored.mastery.peopleOfGod : defaults.mastery.peopleOfGod,
          geography: typeof stored.mastery?.geography === 'number' ? stored.mastery.geography : defaults.mastery.geography,
        },
        powerUps: {
          secondChance: typeof stored.powerUps?.secondChance === 'number' ? stored.powerUps.secondChance : defaults.powerUps.secondChance,
          revealScripture: typeof stored.powerUps?.revealScripture === 'number' ? stored.powerUps.revealScripture : defaults.powerUps.revealScripture,
          removeTwo: typeof stored.powerUps?.removeTwo === 'number' ? stored.powerUps.removeTwo : defaults.powerUps.removeTwo,
        },
      };
    } catch (err) {
      console.error('[appStore] Failed to parse trivia stats, returning defaults:', err);
      return JSON.parse(JSON.stringify(defaults)); // Return deep clone of defaults
    }
  },

  saveTriviaStats(stats) {
    safeSetItem(KEY_TRIVIA_STATS, JSON.stringify(stats));
  },

  resetTriviaStats() {
    safeRemoveItem(KEY_TRIVIA_STATS);
  },

  // GENERIC GET/SET
  get(key) {
    const raw = safeGetItem(key);
    return raw ? JSON.parse(raw) : null;
  },
  set(key, value) {
    safeSetItem(key, JSON.stringify(value));
  }
};

export default appStore;
