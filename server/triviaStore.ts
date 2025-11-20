import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateAITriviaQuestions } from "./ai-trivia-generator";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export type TriviaLevel = "beginner" | "intermediate" | "advanced";

export type TriviaCategory =
  | "oldTestament"
  | "gospels"
  | "epistles"
  | "prophecy"
  | "peopleOfGod"
  | "geography";

export interface StoredTriviaQuestion {
  id: string;
  level: TriviaLevel;
  question: string;
  choices: string[];
  correctIndex: number;
  reference?: string;
  category?: TriviaCategory;
}

const DATA_DIR = path.join(__dirname, "..", "data");
const DATA_FILE = path.join(DATA_DIR, "bible-trivia.json");

const memoryPool: Record<TriviaLevel, StoredTriviaQuestion[]> = {
  beginner: [],
  intermediate: [],
  advanced: [],
};

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function loadFromDisk() {
  try {
    ensureDataDir();
    if (!fs.existsSync(DATA_FILE)) return;

    const raw = fs.readFileSync(DATA_FILE, "utf8");
    if (!raw) return;
    const parsed: StoredTriviaQuestion[] = JSON.parse(raw);

    (["beginner", "intermediate", "advanced"] as TriviaLevel[]).forEach((lvl) => {
      memoryPool[lvl] = parsed.filter((q) => q.level === lvl);
    });

    console.log("[TriviaStore] Loaded", parsed.length, "questions from disk");
  } catch (err) {
    console.error("[TriviaStore] Failed to load from disk:", err);
  }
}

function saveToDisk() {
  try {
    ensureDataDir();
    const all: StoredTriviaQuestion[] = [
      ...memoryPool.beginner,
      ...memoryPool.intermediate,
      ...memoryPool.advanced,
    ];
    fs.writeFileSync(DATA_FILE, JSON.stringify(all, null, 2), "utf8");
  } catch (err) {
    console.error("[TriviaStore] Failed to save to disk:", err);
  }
}

loadFromDisk();

function normalizeFromAI(
  level: TriviaLevel,
  rawList: any[]
): StoredTriviaQuestion[] {
  return rawList.map((q, index) => {
    const text = q.question ?? q.text ?? q.prompt ?? "Missing question text";
    const choices = q.choices ?? q.options ?? [];
    const correctIndex =
      q.correctIndex ?? q.answerIndex ?? q.correctOptionIndex ?? 0;
    const reference = q.reference ?? q.verseReference ?? q.scripture ?? undefined;

    const category: TriviaCategory | undefined = q.category;

    return {
      id: q.id ?? `${level}-${Date.now()}-${index}`,
      level,
      question: text,
      choices,
      correctIndex,
      reference,
      category,
    };
  });
}

export async function topUpTriviaPool(
  level: TriviaLevel,
  targetSize = 200
): Promise<void> {
  const pool = memoryPool[level];

  if (pool.length >= targetSize) return;

  const needed = targetSize - pool.length;
  const batchSize = Math.min(10, needed);

  console.log(`[TriviaStore] Topping up ${level} by ${batchSize} questions...`);

  const aiQuestions = await generateAITriviaQuestions(level, batchSize);

  const normalized = normalizeFromAI(level, aiQuestions);
  pool.push(...normalized);
  saveToDisk();

  console.log(
    `[TriviaStore] ${level} pool now has ${pool.length} questions (target ${targetSize})`
  );
}

function sampleWithoutReplacement<T>(arr: T[], count: number): T[] {
  if (arr.length <= count) return [...arr];

  const indices = Array.from({ length: arr.length }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices.slice(0, count).map((i) => arr[i]);
}

export async function getRandomTriviaQuestions(
  level: TriviaLevel,
  count: number
): Promise<StoredTriviaQuestion[]> {
  const pool = memoryPool[level];

  if (pool.length < count) {
    await topUpTriviaPool(level, count * 5);
  }

  const selected = sampleWithoutReplacement(memoryPool[level], count);

  topUpTriviaPool(level, 200).catch((err) =>
    console.error("[TriviaStore] background topUp error:", err)
  );

  return selected;
}
