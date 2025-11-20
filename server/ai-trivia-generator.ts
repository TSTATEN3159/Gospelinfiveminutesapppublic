import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface TriviaQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  verse: string;
  explanation: string;
}

interface LevelConfig {
  name: string;
  difficulty: string;
  questionsRequired: number;
  nextLevel: string | null;
}

export const TRIVIA_LEVELS: Record<string, LevelConfig> = {
  beginner: {
    name: 'Beginner',
    difficulty: 'basic Bible stories and well-known verses',
    questionsRequired: 20,
    nextLevel: 'student'
  },
  student: {
    name: 'Student',
    difficulty: 'moderate knowledge of Bible events, characters, and teachings',
    questionsRequired: 40,
    nextLevel: 'scholar'
  },
  scholar: {
    name: 'Scholar',
    difficulty: 'advanced understanding of Biblical context, prophecies, and theology',
    questionsRequired: 60,
    nextLevel: 'expert'
  },
  expert: {
    name: 'Expert',
    difficulty: 'deep Biblical knowledge including original languages, cross-references, and detailed theology',
    questionsRequired: Infinity,
    nextLevel: null
  }
};

export async function generateAITriviaQuestions(
  level: string,
  count: number = 10
): Promise<TriviaQuestion[]> {
  const levelConfig = TRIVIA_LEVELS[level] || TRIVIA_LEVELS.beginner;
  
  // Add a random session seed so each call has a different context
  const sessionSeed = typeof crypto !== 'undefined' && crypto.randomUUID 
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2, 10);

  console.log(`[AI Trivia] Generating ${count} ${level} questions with session: ${sessionSeed}`);

  const prompt = `You are a Biblical scholar creating unique Bible trivia questions. Generate ${count} completely unique multiple-choice questions at the ${levelConfig.name} level.

SESSION_ID: ${sessionSeed}
LEVEL: ${levelConfig.name}
DIFFICULTY: ${levelConfig.difficulty}

CRITICAL ANTI-REPETITION RULES:
1. NEVER repeat the same question wording within this batch
2. NEVER repeat the same answer wording within this batch
3. Each question MUST come from a DIFFERENT book of the Bible
4. Vary categories widely: narrative, wisdom, prophecy, epistles, gospels, law, psalms
5. Mix Old Testament (at least 40%) and New Testament (at least 40%) questions
6. For each new SESSION_ID, generate COMPLETELY DIFFERENT questions - do not reuse patterns

STRICT REQUIREMENTS:
1. ALL questions based ONLY on the Holy Bible (66 books of Protestant Canon)
2. Questions must be factually accurate according to Scripture
3. Include specific verse references in OSIS format (Book.Chapter.Verse, e.g., "JHN.3.16")
4. Each question has exactly 4 options
5. Only ONE correct answer
6. Brief explanation citing the specific verse

DIFFICULTY GUIDELINES:
- Beginner: Famous stories, well-known characters, basic teachings (e.g., Creation, David & Goliath, Lord's Prayer)
- Student: Specific events, lesser-known characters, connections (e.g., Paul's missionary journeys, minor prophets)
- Scholar: Theological concepts, prophecy fulfillment, detailed cross-references (e.g., Types of Christ, covenants, chronology)
- Expert: Deep knowledge, original language insights, obscure details (e.g., Genealogies, specific numbers, Hebrew/Greek context)

TOPIC VARIETY CHECKLIST (use different topics from this list):
- Creation & Genesis narratives
- Exodus & wilderness wandering
- Judges & early Israel
- Kings & kingdoms
- Major prophets (Isaiah, Jeremiah, Ezekiel, Daniel)
- Minor prophets
- Wisdom literature (Proverbs, Ecclesiastes, Job)
- Psalms & worship
- Gospel narratives (Matthew, Mark, Luke, John)
- Acts & early church
- Paul's epistles
- General epistles
- Revelation & prophecy

FORMAT YOUR RESPONSE AS VALID JSON ARRAY:
[
  {
    "question": "Who led the Israelites out of Egypt?",
    "options": ["Moses", "Joshua", "Aaron", "David"],
    "correctAnswer": 0,
    "verse": "EXO.3.10",
    "explanation": "God called Moses to lead His people out of Egyptian bondage (Exodus 3:10)."
  }
]

Generate ${count} COMPLETELY UNIQUE questions now. Return ONLY the JSON array, no additional text.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a Biblical scholar who creates accurate, engaging Bible trivia questions based solely on Scripture. You always respond with valid JSON arrays.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      // Slightly higher temperature and top_p for more variety while maintaining accuracy
      temperature: 0.9,
      top_p: 0.95,
      max_tokens: 2000,
    });

    const responseText = completion.choices[0]?.message?.content?.trim();
    
    if (!responseText) {
      throw new Error('No response from AI');
    }

    // Extract JSON from response (handle potential markdown code blocks)
    let jsonText = responseText;
    if (responseText.includes('```json')) {
      const match = responseText.match(/```json\n?([\s\S]*?)\n?```/);
      if (match) {
        jsonText = match[1];
      }
    } else if (responseText.includes('```')) {
      const match = responseText.match(/```\n?([\s\S]*?)\n?```/);
      if (match) {
        jsonText = match[1];
      }
    }

    const questions = JSON.parse(jsonText) as TriviaQuestion[];
    
    // Validate structure
    if (!Array.isArray(questions) || questions.length === 0) {
      throw new Error('Invalid questions format');
    }

    // Validate each question
    for (const q of questions) {
      if (!q.question || !Array.isArray(q.options) || q.options.length !== 4 ||
          typeof q.correctAnswer !== 'number' || q.correctAnswer < 0 || q.correctAnswer > 3) {
        throw new Error('Invalid question structure');
      }
    }

    // Log book distribution to help verify variety
    const books = questions.map(q => q.verse?.split('.')[0]).filter(Boolean);
    const uniqueBooks = new Set(books);
    console.log(`[AI Trivia] Generated ${questions.length} questions from ${uniqueBooks.size} unique books:`, Array.from(uniqueBooks).join(', '));

    return questions.slice(0, count);
    
  } catch (error) {
    console.error('AI Trivia Generation Error:', error);
    throw new Error('Failed to generate trivia questions');
  }
}

export function calculateLevel(totalCorrectAnswers: number): string {
  if (totalCorrectAnswers >= TRIVIA_LEVELS.scholar.questionsRequired) return 'expert';
  if (totalCorrectAnswers >= TRIVIA_LEVELS.student.questionsRequired) return 'scholar';
  if (totalCorrectAnswers >= TRIVIA_LEVELS.beginner.questionsRequired) return 'student';
  return 'beginner';
}

export function getNextLevelProgress(totalCorrectAnswers: number): {
  currentLevel: string;
  nextLevel: string | null;
  progress: number;
  questionsUntilNext: number;
} {
  const currentLevel = calculateLevel(totalCorrectAnswers);
  const levelConfig = TRIVIA_LEVELS[currentLevel];
  const nextLevel = levelConfig.nextLevel;
  
  if (!nextLevel) {
    return {
      currentLevel,
      nextLevel: null,
      progress: 100,
      questionsUntilNext: 0
    };
  }
  
  const nextLevelConfig = TRIVIA_LEVELS[nextLevel];
  const questionsUntilNext = nextLevelConfig.questionsRequired - totalCorrectAnswers;
  const currentLevelStart = currentLevel === 'beginner' ? 0 : 
    TRIVIA_LEVELS[currentLevel === 'student' ? 'beginner' : 
                 currentLevel === 'scholar' ? 'student' : 'scholar'].questionsRequired;
  
  const progress = Math.min(100, Math.round(
    ((totalCorrectAnswers - currentLevelStart) / 
     (nextLevelConfig.questionsRequired - currentLevelStart)) * 100
  ));
  
  return {
    currentLevel,
    nextLevel,
    progress,
    questionsUntilNext
  };
}
