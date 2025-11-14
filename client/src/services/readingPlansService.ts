import { apiUrl } from '@/lib/api-config';

export interface ReadingPlan {
  id: string;
  name: string;
  description: string;
  duration: string;
  readings: Array<{
    day: number;
    passages: string[];
  }>;
}

class ReadingPlansService {
  async getPlans(): Promise<{ success: true; plans: ReadingPlan[] }> {
    const response = await fetch(apiUrl("/api/reading-plans"), {
      cache: "no-store"
    });
    
    if (!response.ok) {
      throw new Error("Failed to fetch reading plans");
    }
    
    return response.json();
  }
}

export const readingPlansService = new ReadingPlansService();
