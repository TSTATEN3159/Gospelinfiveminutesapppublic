import { db } from "../db";
import { sql } from "drizzle-orm";

interface UsageStats {
  apiBibleRequestsToday: number;
  openAICostThisMonth: number;
  lastReset: string;
}

class ApiUsageTracker {
  private readonly API_BIBLE_DAILY_LIMIT = 5000;
  private readonly OPENAI_MONTHLY_LIMIT_USD = 85;
  private stats: UsageStats | null = null;
  private lastStatsLoad = 0;
  private readonly CACHE_DURATION = 60000; // 1 minute

  constructor() {
    this.initializeStats();
  }

  private async initializeStats() {
    const today = new Date().toISOString().split('T')[0];
    const thisMonth = new Date().toISOString().substring(0, 7); // YYYY-MM

    // Load or initialize stats from database
    try {
      const result = await db.execute(sql`
        SELECT 
          COALESCE((SELECT COUNT(*) FROM api_usage_log 
            WHERE service = 'api_bible' 
            AND DATE(created_at) = ${today}), 0) as api_bible_requests,
          COALESCE((SELECT SUM(cost_usd) FROM api_usage_log 
            WHERE service = 'openai' 
            AND DATE_FORMAT(created_at, '%Y-%m') = ${thisMonth}), 0) as openai_cost
      `);

      const row: any = result.rows?.[0] || { api_bible_requests: 0, openai_cost: 0 };
      
      this.stats = {
        apiBibleRequestsToday: Number(row.api_bible_requests || 0),
        openAICostThisMonth: Number(row.openai_cost || 0),
        lastReset: today
      };
    } catch (error) {
      console.error('Failed to initialize API usage stats:', error);
      // Fallback to conservative defaults
      this.stats = {
        apiBibleRequestsToday: 0,
        openAICostThisMonth: 0,
        lastReset: today
      };
    }

    this.lastStatsLoad = Date.now();
  }

  private async refreshStats() {
    const now = Date.now();
    if (now - this.lastStatsLoad > this.CACHE_DURATION) {
      await this.initializeStats();
    }
  }

  async canUseApiBible(): Promise<boolean> {
    await this.refreshStats();
    return (this.stats?.apiBibleRequestsToday || 0) < this.API_BIBLE_DAILY_LIMIT;
  }

  async canUseOpenAI(): Promise<boolean> {
    await this.refreshStats();
    return (this.stats?.openAICostThisMonth || 0) < this.OPENAI_MONTHLY_LIMIT_USD;
  }

  async trackApiBibleRequest(success: boolean = true) {
    const today = new Date().toISOString().split('T')[0];
    
    // Reset daily counter if it's a new day
    if (this.stats?.lastReset !== today) {
      this.stats = {
        apiBibleRequestsToday: 0,
        openAICostThisMonth: this.stats?.openAICostThisMonth || 0,
        lastReset: today
      };
    }

    if (this.stats) {
      this.stats.apiBibleRequestsToday++;
    }

    // Log to database
    try {
      await db.execute(sql`
        INSERT INTO api_usage_log (service, endpoint, success, cost_usd, metadata, created_at)
        VALUES ('api_bible', 'verse_lookup', ${success}, 0, '{}', NOW())
      `);
    } catch (error) {
      console.error('Failed to log API.Bible request:', error);
    }
  }

  async trackOpenAIRequest(model: string, promptTokens: number, completionTokens: number) {
    // GPT-4o-mini pricing (as of 2024)
    const INPUT_COST_PER_1M = 0.15;
    const OUTPUT_COST_PER_1M = 0.60;

    const inputCost = (promptTokens / 1_000_000) * INPUT_COST_PER_1M;
    const outputCost = (completionTokens / 1_000_000) * OUTPUT_COST_PER_1M;
    const totalCost = inputCost + outputCost;

    if (this.stats) {
      this.stats.openAICostThisMonth += totalCost;
    }

    // Log to database
    try {
      await db.execute(sql`
        INSERT INTO api_usage_log (service, endpoint, success, cost_usd, metadata, created_at)
        VALUES (
          'openai', 
          ${model}, 
          true, 
          ${totalCost},
          ${JSON.stringify({ promptTokens, completionTokens, inputCost, outputCost })},
          NOW()
        )
      `);
    } catch (error) {
      console.error('Failed to log OpenAI request:', error);
    }

    return totalCost;
  }

  getStats(): UsageStats | null {
    return this.stats ? { ...this.stats } : null;
  }

  getRemainingApiBibleRequests(): number {
    return Math.max(0, this.API_BIBLE_DAILY_LIMIT - (this.stats?.apiBibleRequestsToday || 0));
  }

  getRemainingOpenAIBudget(): number {
    return Math.max(0, this.OPENAI_MONTHLY_LIMIT_USD - (this.stats?.openAICostThisMonth || 0));
  }
}

export const apiUsageTracker = new ApiUsageTracker();
