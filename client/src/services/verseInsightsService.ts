import { apiUrl } from '@/lib/api-config';

export interface VersePassageResponse {
  text: string;
  reference: string;
  error?: string;
}

export interface PlainMeaningResponse {
  plainMeaning: string;
  error?: string;
}

export interface InstantApplicationResponse {
  application: string;
  error?: string;
}

class VerseInsightsService {
  async fetchPassage(reference: string): Promise<VersePassageResponse> {
    try {
      const response = await fetch(apiUrl(`/api/bible-passage?reference=${encodeURIComponent(reference)}`));
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch Bible passage');
      }

      return {
        text: data.text || '',
        reference: data.reference || reference,
      };
    } catch (error) {
      console.error('Error fetching Bible passage:', error);
      
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
          throw new Error('Network error. Please check your internet connection.');
        }
        throw error;
      }
      
      throw new Error('Failed to fetch Bible passage. Please try again.');
    }
  }

  async getPlainMeaning({ verse, reference }: { verse: string; reference: string }): Promise<PlainMeaningResponse> {
    try {
      const response = await fetch(apiUrl('/api/verse-plain-meaning'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ verse, reference }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to generate Plain Meaning');
      }

      return {
        plainMeaning: data.plainMeaning || "I couldn't generate a simplified meaning for this verse. Please try again.",
      };
    } catch (error) {
      console.error('Error getting Plain Meaning:', error);
      
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
          throw new Error('Network error. Please check your internet connection.');
        }
        throw error;
      }
      
      throw new Error('Failed to generate Plain Meaning. Please try again.');
    }
  }

  async getInstantApplication({ verse, reference }: { verse: string; reference: string }): Promise<InstantApplicationResponse> {
    try {
      const response = await fetch(apiUrl('/api/verse-instant-application'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ verse, reference }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to generate Instant Application');
      }

      return {
        application: data.application || "I couldn't generate practical steps for this verse. Please try again.",
      };
    } catch (error) {
      console.error('Error getting Instant Application:', error);
      
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
          throw new Error('Network error. Please check your internet connection.');
        }
        throw error;
      }
      
      throw new Error('Failed to generate Instant Application. Please try again.');
    }
  }
}

export const verseInsightsService = new VerseInsightsService();
