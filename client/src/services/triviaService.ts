import { apiUrl } from '@/lib/api-config';

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
 */
export async function getTriviaStats(): Promise<TriviaStats> {
  const res = await fetch(apiUrl('/api/trivia/stats'));
  if (!res.ok) throw new Error('Failed to load trivia stats');
  return res.json();
}

/**
 * Record a trivia game result and get updated stats
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
  const res = await fetch(apiUrl('/api/trivia/record-result'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  if (!res.ok) throw new Error('Failed to record trivia result');
  return res.json();
}

/**
 * Get friends & family leaderboard (top 20 users by streak and crowns)
 */
export async function getTriviaLeaderboard(): Promise<TriviaStats[]> {
  const res = await fetch(apiUrl('/api/trivia/leaderboard'));
  if (!res.ok) throw new Error('Failed to load leaderboard');
  return res.json();
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
