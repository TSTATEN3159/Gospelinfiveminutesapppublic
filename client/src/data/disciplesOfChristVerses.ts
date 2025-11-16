export interface DisciplesVerse {
  ref: string;
  text: string;
  step: string;
}

// Curated verses with practical daily steps for Disciples of Christ feature
export const disciplesVerses: DisciplesVerse[] = [
  {
    ref: "James 1:5",
    text: "If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you.",
    step: "Before your next decision today, pause for three seconds and whisper, 'Lord, give me wisdom.'"
  },
  {
    ref: "Matthew 5:44",
    text: "But I tell you, love your enemies and pray for those who persecute you.",
    step: "Think of someone difficult in your life and say one prayer for their well-being today."
  },
  {
    ref: "Philippians 4:6-7",
    text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.",
    step: "Write down one worry and speak it to God, then thank Him for one blessing."
  },
  {
    ref: "Proverbs 3:5-6",
    text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    step: "Identify one area where you're trying to control everything, and surrender it to God today."
  },
  {
    ref: "Colossians 3:23",
    text: "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.",
    step: "Do your next task—even if mundane—as an offering to God with excellence."
  },
  {
    ref: "1 Thessalonians 5:16-18",
    text: "Rejoice always, pray continually, give thanks in all circumstances; for this is God's will for you in Christ Jesus.",
    step: "Set an hourly reminder to pause and thank God for one thing every hour today."
  },
  {
    ref: "Romans 12:2",
    text: "Do not conform to the pattern of this world, but be transformed by the renewing of your mind.",
    step: "When you catch yourself scrolling mindlessly, stop and read one Bible verse instead."
  },
  {
    ref: "Galatians 6:9",
    text: "Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up.",
    step: "Encourage someone who's struggling today—a simple text can plant seeds of hope."
  },
  {
    ref: "Ephesians 4:32",
    text: "Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you.",
    step: "Show unexpected kindness to one person today—pay for coffee, help with a chore, or offer genuine praise."
  },
  {
    ref: "Hebrews 10:24-25",
    text: "And let us consider how we may spur one another on toward love and good deeds, not giving up meeting together.",
    step: "Reach out to one fellow believer today to check in and pray together, even briefly."
  }
];

const STORAGE_KEY = 'disciplesOfChrist_verse';
const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000; // 2 days in milliseconds

interface StoredVerseData {
  index: number;
  lastRotation: number; // timestamp of last rotation
}

// Get verse index based on 2-day rotation with localStorage persistence
export function getCurrentDisciplesVerseIndex(): number {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const now = Date.now();
    
    if (stored) {
      const data: StoredVerseData = JSON.parse(stored);
      const timeSinceRotation = now - data.lastRotation;
      
      // If less than 2 days have passed, return stored index
      if (timeSinceRotation < TWO_DAYS_MS) {
        return data.index;
      }
      
      // Time to rotate - calculate next index
      const rotationsPassed = Math.floor(timeSinceRotation / TWO_DAYS_MS);
      const newIndex = (data.index + rotationsPassed) % disciplesVerses.length;
      
      // Store new index and timestamp
      const newData: StoredVerseData = {
        index: newIndex,
        lastRotation: now
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      
      return newIndex;
    }
    
    // First time - initialize with index 0
    const initialData: StoredVerseData = {
      index: 0,
      lastRotation: now
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    
    return 0;
  } catch (error) {
    // Fallback to time-based rotation if localStorage fails
    console.error('localStorage error in disciplesOfChrist:', error);
    const startDate = new Date('2025-01-01').getTime();
    const daysSinceStart = Math.floor((Date.now() - startDate) / TWO_DAYS_MS);
    return daysSinceStart % disciplesVerses.length;
  }
}

// Get current verse for Disciples of Christ
export function getCurrentDisciplesVerse(): DisciplesVerse {
  const index = getCurrentDisciplesVerseIndex();
  return disciplesVerses[index];
}
