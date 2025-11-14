import { apiUrl } from '@/lib/api-config';

export interface TriviaQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  verse?: string | null;
  verseText?: string | null;
  explanation?: string;
  level: string;
}

export interface TriviaGenerateParams {
  level?: string;
  count?: number;
  useAI?: boolean;
}

export interface TriviaResponse {
  success: boolean;
  questions?: TriviaQuestion[];
  error?: string;
}

class TriviaService {
  async generateQuiz(params: TriviaGenerateParams): Promise<TriviaResponse> {
    const response = await fetch(apiUrl('/api/bible-trivia'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error('Failed to generate trivia questions');
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to generate trivia');
    }

    return data;
  }
}

export const triviaService = new TriviaService();
