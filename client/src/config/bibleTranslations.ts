export type BibleTranslationId = 'niv' | 'kjv' | 'web' | 'bbe' | 'asv' | 'es-rvr1960';

export interface BibleTranslation {
  id: BibleTranslationId;
  label: string;
  shortLabel: string;
  languageCode: 'en' | 'es';
  apiCode: string;
}

export const BIBLE_TRANSLATIONS: BibleTranslation[] = [
  {
    id: 'kjv',
    label: 'English – King James Version',
    shortLabel: 'KJV',
    languageCode: 'en',
    apiCode: 'KJV',
  },
  {
    id: 'web',
    label: 'English – World English Bible',
    shortLabel: 'WEB',
    languageCode: 'en',
    apiCode: 'WEB',
  },
  {
    id: 'bbe',
    label: 'English – Bible in Basic English',
    shortLabel: 'BBE',
    languageCode: 'en',
    apiCode: 'BBE',
  },
  {
    id: 'asv',
    label: 'English – American Standard Version',
    shortLabel: 'ASV',
    languageCode: 'en',
    apiCode: 'ASV',
  },
  {
    id: 'es-rvr1960',
    label: 'Español – Reina-Valera 1960',
    shortLabel: 'RVR1960',
    languageCode: 'es',
    apiCode: 'RVR1960',
  },
];

export const DEFAULT_BIBLE_TRANSLATION_ID: BibleTranslationId = 'kjv';

export function getBibleTranslationById(id: BibleTranslationId): BibleTranslation {
  return (
    BIBLE_TRANSLATIONS.find((t) => t.id === id) ??
    BIBLE_TRANSLATIONS.find((t) => t.id === DEFAULT_BIBLE_TRANSLATION_ID)!
  );
}

export function languageCodeToVoiceLocale(languageCode: 'en' | 'es'): string {
  switch (languageCode) {
    case 'es':
      return 'es-ES'; // Spanish (Spain) - safe default
    case 'en':
    default:
      return 'en-US'; // English (US) default
  }
}
