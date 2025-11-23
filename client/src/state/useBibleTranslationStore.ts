import { create } from 'zustand';
import { BibleTranslationId, DEFAULT_BIBLE_TRANSLATION_ID } from '@/config/bibleTranslations';

interface BibleTranslationState {
  translationId: BibleTranslationId;
  setTranslationId: (id: BibleTranslationId) => void;
}

const STORAGE_KEY = 'bible.translationId';

export const useBibleTranslationStore = create<BibleTranslationState>((set) => {
  let initial: BibleTranslationId = DEFAULT_BIBLE_TRANSLATION_ID;
  if (typeof window !== 'undefined') {
    const saved = window.localStorage.getItem(STORAGE_KEY) as BibleTranslationId | null;
    if (saved) {
      initial = saved;
    }
  }

  return {
    translationId: initial,
    setTranslationId: (id) => {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, id);
      }
      set({ translationId: id });
    },
  };
});
