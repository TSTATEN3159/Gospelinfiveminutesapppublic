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
  
  const prompt = `You are a Biblical scholar creating trivia questions based solely on the Christian Bible (Old and New Testament). Generate ${count} multiple-choice questions at the ${levelConfig.name} level.

LEVEL: ${levelConfig.name}
DIFFICULTY: ${levelConfig.difficulty}

STRICT REQUIREMENTS:
1. ALL questions must be based ONLY on the Holy Bible (66 books of Protestant Canon)
2. Questions must be factually accurate according to Scripture
3. Include specific Bible verse references (Book.Chapter.Verse format, e.g., "JHN.3.16")
4. Each question has exactly 4 options (A, B, C, D)
5. Only ONE correct answer
6. Provide a brief explanation citing the specific verse

DIFFICULTY GUIDELINES BY LEVEL:
- Beginner: Well-known stories, main characters, famous verses (e.g., Noah's ark, 10 Commandments)
- Student: Specific events, lesser-known characters, context (e.g., Who wrote Philippians? What city was Lydia from?)
- Scholar: Theological concepts, prophecy fulfillment, cross-references (e.g., How many years between Abraham and Moses?)
- Expert: Original language nuances, detailed chronology, obscure facts (e.g., How many stones did David pick for Goliath?)

FORMAT YOUR RESPONSE AS VALID JSON ARRAY:
[
  {
    "question": "Who led the Israelites out of Egypt?",
    "options": ["Moses", "Joshua", "Aaron", "David"],
    "correctAnswer": 0,
    "verse": "EXO.3.10",
    "explanation": "God called Moses to lead His people out of Egyptian bondage (Exodus 3:10)"
  }
]

Generate ${count} questions now. Return ONLY the JSON array, no additional text.`;

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
      temperature: 0.8,
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
