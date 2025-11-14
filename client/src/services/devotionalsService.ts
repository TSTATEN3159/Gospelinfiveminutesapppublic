import { apiUrl } from '@/lib/api-config';

export interface DevotionalEntry {
  day: number;
  scriptureRef: string;
  scriptureText: string;
  devotion: string;
  application: string;
}

export interface DevotionalPlan {
  [gender: string]: {
    [day: string]: DevotionalEntry;
  };
}

class DevotionalsService {
  async getPlan(): Promise<DevotionalPlan> {
    const url = apiUrl("/api/devotionals/365");
    const response = await fetch(url, { method: "GET" });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    // Unwrap the { success, plan } structure from API
    return data.plan || data;
  }

  getEntry(plan: DevotionalPlan, gender: string, day: number): DevotionalEntry | null {
    const record = plan[gender] || {};
    return record[String(day)] || null;
  }
}

export const devotionalsService = new DevotionalsService();
