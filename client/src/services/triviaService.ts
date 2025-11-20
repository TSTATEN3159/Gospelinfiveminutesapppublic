import { apiUrl } from '@/lib/api-config';
import appStore from '@/lib/appStore';

export type TriviaLevel = 'beginner' | 'intermediate' | 'advanced';

export interface RawTriviaQuestion {
  id?: string | number;
  question?: string;
  text?: string;
  prompt?: string;
  options?: string[];
  choices?: string[];
  correctAnswer?: number;
  correctIndex?: number;
  answerIndex?: number;
  correctOptionIndex?: number;
  verse?: string;
  reference?: string;
  verseReference?: string;
  scripture?: string;
  verseText?: string;
  explanation?: string;
  level?: string;
}

export interface TriviaQuestion {
  id: string;
  text: string;
  choices: string[];
  // correctIndex is NEVER sent to frontend - kept server-side for security
  reference?: string;
  explanation?: string;
  category?: "oldTestament" | "gospels" | "epistles" | "prophecy" | "peopleOfGod" | "geography";
}

export interface CheckAnswerResult {
  success: boolean;
  isCorrect: boolean;
  correctIndex: number;
  correctAnswer: string;
  reference?: string;
  explanation?: string;
}

export type TriviaMode = "classic" | "daily" | "survival" | "speed";

export interface TriviaStats {
  userId: string;
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

/**
 * Normalizes whatever shape the backend returns into a clean TriviaQuestion
 */
function normalizeQuestion(raw: RawTriviaQuestion, index: number): TriviaQuestion {
  const text =
    raw.question ??
    raw.text ??
    raw.prompt ??
    'Question missing from API response';

  const choices = raw.choices ?? raw.options ?? [];

  const reference =
    raw.verse ??
    raw.reference ??
    raw.verseReference ??
    raw.scripture ??
    undefined;

  const explanation = raw.explanation ?? undefined;

  return {
    id: raw.id ? String(raw.id) : String(index),
    text,
    choices,
    // correctIndex is NOT included - kept server-side for security
    reference,
    explanation,
  };
}

/**
 * Fetches one round of trivia (10 questions) from your backend.
 * IMPORTANT: useAI: true ensures we use the AI generator and not a dummy list.
 */
export async function fetchBibleTriviaQuestions(
  level: TriviaLevel,
  count = 10
): Promise<TriviaQuestion[]> {
  const response = await fetch(apiUrl('/api/bible-trivia'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      level,
      count,
      useAI: true,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch bible trivia: ${response.statusText}`);
  }

  const data = await response.json();

  if (!data.success && data.error) {
    throw new Error(data.error);
  }

  // Support either { questions: [...] } or just [...] from backend
  const rawList: RawTriviaQuestion[] = Array.isArray(data.questions)
    ? data.questions
    : Array.isArray(data)
    ? data
    : [];

  return rawList.map(normalizeQuestion);
}

/**
 * Get current user's trivia stats (streak, titles, mastery, power-ups)
 * Now using client-side localStorage for proper per-device tracking
 */
export async function getTriviaStats(): Promise<TriviaStats> {
  const stats = appStore.getTriviaStats();
  return {
    userId: 'local-user',
    displayName: stats.displayName,
    dailyStreak: stats.dailyStreak,
    lastDailyDate: stats.lastDailyDate,
    dailyCrowns: stats.dailyCrowns,
    highestTitle: stats.highestTitle as any,
    mastery: stats.mastery,
    powerUps: stats.powerUps,
  };
}

/**
 * Record a trivia game result and get updated stats
 * Now using client-side localStorage for proper per-device tracking
 */
export async function recordTriviaResult(params: {
  mode: TriviaMode;
  level?: TriviaLevel;
  correctCount: number;
  totalCount: number;
  categoriesHit?: TriviaQuestion["category"][];
  powerUpsUsed?: {
    secondChance: number;
    removeTwo: number;
    revealScripture: number;
  };
}): Promise<TriviaStats> {
  const { mode, level, correctCount, totalCount, categoriesHit = [], powerUpsUsed } = params;
  const stats = appStore.getTriviaStats();
  
  // Deduct power-ups that were actually used during gameplay
  if (powerUpsUsed) {
    stats.powerUps.secondChance = Math.max(0, stats.powerUps.secondChance - powerUpsUsed.secondChance);
    stats.powerUps.removeTwo = Math.max(0, stats.powerUps.removeTwo - powerUpsUsed.removeTwo);
    stats.powerUps.revealScripture = Math.max(0, stats.powerUps.revealScripture - powerUpsUsed.revealScripture);
  }

  // 1) Daily streak & crowns
  if (mode === "daily") {
    const today = new Date().toISOString().slice(0, 10);

    if (stats.lastDailyDate === today) {
      // already played today – no streak change
    } else if (stats.lastDailyDate === null) {
      stats.dailyStreak = 1;
    } else {
      const last = new Date(stats.lastDailyDate);
      const diffMs = new Date(today).getTime() - last.getTime();
      const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        stats.dailyStreak += 1;
      } else {
        stats.dailyStreak = 1;
      }
    }

    stats.lastDailyDate = today;

    if (correctCount >= 9) {
      stats.dailyCrowns += 1;
      stats.powerUps.secondChance += 1;
    }
  }

  // 2) Titles from classic levels
  if (mode === "classic" && level && correctCount >= 9) {
    if (level === "beginner" && stats.highestTitle === "None") {
      stats.highestTitle = "Bible Student";
    } else if (level === "intermediate") {
      if (stats.highestTitle === "None" || stats.highestTitle === "Bible Student") {
        stats.highestTitle = "Bible Scholar";
      }
    } else if (level === "advanced") {
      if (
        stats.highestTitle === "None" ||
        stats.highestTitle === "Bible Student" ||
        stats.highestTitle === "Bible Scholar"
      ) {
        stats.highestTitle = "Bible Expert";
      }
    }
  }

  // 3) Endgame "Defender of the Faith" for perfect advanced or strong survival
  if (
    (mode === "classic" && level === "advanced" && correctCount === totalCount) ||
    (mode === "survival" && correctCount >= 30)
  ) {
    stats.highestTitle = "Defender of the Faith";
    stats.powerUps.secondChance += 2;
    stats.powerUps.revealScripture += 2;
  }

  // 4) Mastery update – simple incremental approach
  categoriesHit.forEach((cat) => {
    if (cat && stats.mastery[cat] !== undefined) {
      const current = stats.mastery[cat];
      stats.mastery[cat] = Math.min(100, current + Math.round((correctCount / totalCount) * 5));
    }
  });

  // Save to localStorage
  appStore.saveTriviaStats(stats);
  
  return {
    userId: 'local-user',
    displayName: stats.displayName,
    dailyStreak: stats.dailyStreak,
    lastDailyDate: stats.lastDailyDate,
    dailyCrowns: stats.dailyCrowns,
    highestTitle: stats.highestTitle as any,
    mastery: stats.mastery,
    powerUps: stats.powerUps,
  };
}

/**
 * Get friends & family leaderboard (top 20 users by streak and crowns)
 * Note: With client-side storage, leaderboard only shows current user's stats
 */
export async function getTriviaLeaderboard(): Promise<TriviaStats[]> {
  const currentStats = await getTriviaStats();
  // Return just the current user for now (leaderboard requires server-side storage)
  return [currentStats];
}

/**
 * Check answer server-side - the answer key NEVER leaves the server
 * This ensures the correct answer is always accurate
 */
export async function checkTriviaAnswer(
  questionId: string,
  selectedIndex: number
): Promise<CheckAnswerResult> {
  const res = await fetch(apiUrl('/api/trivia/check-answer'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      questionId,
      selectedIndex,
    }),
  });
  
  if (!res.ok) {
    throw new Error('Failed to check answer');
  }
  
  const data = await res.json();
  
  if (!data.success) {
    throw new Error(data.error || 'Failed to check answer');
  }
  
  return data;
}
