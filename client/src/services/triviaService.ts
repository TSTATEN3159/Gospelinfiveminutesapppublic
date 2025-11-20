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
  correctIndex: number;
  reference?: string;
  explanation?: string;
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

  const correctIndex =
    raw.correctAnswer ??
    raw.correctIndex ??
    raw.answerIndex ??
    raw.correctOptionIndex ??
    0;

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
    correctIndex,
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
