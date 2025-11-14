import { apiUrl } from '@/lib/api-config';

export interface BibleSearchResult {
  reference: string;
  text: string;
  book: string;
  chapter: number;
  verse: number;
}

export interface BibleSearchResponse {
  success: boolean;
  results?: BibleSearchResult[];
  error?: string;
}

class BibleSearchService {
  async search(query: string): Promise<BibleSearchResponse> {
    const response = await fetch(apiUrl('/api/bible-search'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error('Failed to search Bible verses');
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Search failed');
    }

    return data;
  }
}

export const bibleSearchService = new BibleSearchService();
