import { apiUrl } from '@/lib/api-config';

export interface TriviaQuestion {
  question: string;
  correctAnswer: string;
  wrongAnswers: string[];
  explanation: string;
  scripture: string;
}

export interface TriviaGenerateParams {
  level?: number;
  count?: number;
  useAI?: boolean;
  difficulty?: string;
}

export interface TriviaResponse {
  success: boolean;
  questions?: TriviaQuestion[];
  question?: string;
  correctAnswer?: string;
  wrongAnswers?: string[];
  explanation?: string;
  scripture?: string;
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
