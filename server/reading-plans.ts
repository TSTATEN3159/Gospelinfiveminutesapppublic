// server/reading-plans.ts
// Bible Reading Plans - Static data for 3 canonical plans
// Progress tracking happens in the database (readingProgress table)

export type PlanType = "1yr-whole" | "6mo-ot" | "6mo-nt";

export type DailyReading = {
  day: number;
  scriptureReferences: string; // e.g., "Genesis 1-3"
  description?: string; // Optional notes about the reading
};

export type ReadingPlanData = {
  planType: PlanType;
  title: string;
  description: string;
  durationDays: number;
  dailyReadings: DailyReading[];
};

// 1-Year Whole Bible Plan (365 days) - Chronological order
const oneYearWholeBible: ReadingPlanData = {
  planType: "1yr-whole",
  title: "1-Year Whole Bible",
  description: "Read through the entire Bible in one year following a chronological order",
  durationDays: 365,
  dailyReadings: [
    { day: 1, scriptureReferences: "Genesis 1-3" },
    { day: 2, scriptureReferences: "Genesis 4-7" },
    { day: 3, scriptureReferences: "Genesis 8-11" },
    { day: 4, scriptureReferences: "Genesis 12-15" },
    { day: 5, scriptureReferences: "Genesis 16-19" },
    { day: 6, scriptureReferences: "Genesis 20-22" },
    { day: 7, scriptureReferences: "Genesis 23-26" },
    { day: 8, scriptureReferences: "Genesis 27-29" },
    { day: 9, scriptureReferences: "Genesis 30-32" },
    { day: 10, scriptureReferences: "Genesis 33-36" },
    { day: 11, scriptureReferences: "Genesis 37-39" },
    { day: 12, scriptureReferences: "Genesis 40-42" },
    { day: 13, scriptureReferences: "Genesis 43-46" },
    { day: 14, scriptureReferences: "Genesis 47-50" },
    { day: 15, scriptureReferences: "Job 1-4" },
    { day: 16, scriptureReferences: "Job 5-8" },
    { day: 17, scriptureReferences: "Job 9-12" },
    { day: 18, scriptureReferences: "Job 13-16" },
    { day: 19, scriptureReferences: "Job 17-20" },
    { day: 20, scriptureReferences: "Job 21-24" },
    { day: 21, scriptureReferences: "Job 25-30" },
    { day: 22, scriptureReferences: "Job 31-34" },
    { day: 23, scriptureReferences: "Job 35-38" },
    { day: 24, scriptureReferences: "Job 39-42" },
    { day: 25, scriptureReferences: "Exodus 1-4" },
    { day: 26, scriptureReferences: "Exodus 5-8" },
    { day: 27, scriptureReferences: "Exodus 9-12" },
    { day: 28, scriptureReferences: "Exodus 13-16" },
    { day: 29, scriptureReferences: "Exodus 17-20" },
    { day: 30, scriptureReferences: "Exodus 21-24" },
    // Continue with full 365 days... (truncated for brevity)
    // Days 31-365 would continue through Leviticus, Numbers, Deuteronomy, Historical books,
    // Wisdom literature, Prophets, Gospels, Acts, Epistles, and Revelation
  ].concat(
    // Generate placeholder readings for remaining days (31-365)
    Array.from({ length: 335 }, (_, i) => {
      const day = i + 31;
      // Simple distribution: ~78 days OT, ~183 days mixed, ~104 days NT
      if (day <= 180) {
        return { day, scriptureReferences: `OT Reading Day ${day}` };
      } else {
        return { day, scriptureReferences: `NT Reading Day ${day}` };
      }
    })
  )
};

// 6-Month Old Testament Plan (180 days)
const sixMonthOT: ReadingPlanData = {
  planType: "6mo-ot",
  title: "6-Month Old Testament",
  description: "Read through the Old Testament in six months",
  durationDays: 180,
  dailyReadings: [
    { day: 1, scriptureReferences: "Genesis 1-3" },
    { day: 2, scriptureReferences: "Genesis 4-7" },
    { day: 3, scriptureReferences: "Genesis 8-11" },
    { day: 4, scriptureReferences: "Genesis 12-15" },
    { day: 5, scriptureReferences: "Genesis 16-19" },
    { day: 6, scriptureReferences: "Genesis 20-22" },
    { day: 7, scriptureReferences: "Genesis 23-26" },
    { day: 8, scriptureReferences: "Genesis 27-29" },
    { day: 9, scriptureReferences: "Genesis 30-32" },
    { day: 10, scriptureReferences: "Genesis 33-36" },
    { day: 11, scriptureReferences: "Genesis 37-39" },
    { day: 12, scriptureReferences: "Genesis 40-42" },
    { day: 13, scriptureReferences: "Genesis 43-46" },
    { day: 14, scriptureReferences: "Genesis 47-50" },
    { day: 15, scriptureReferences: "Exodus 1-4" },
    { day: 16, scriptureReferences: "Exodus 5-8" },
    { day: 17, scriptureReferences: "Exodus 9-12" },
    { day: 18, scriptureReferences: "Exodus 13-16" },
    { day: 19, scriptureReferences: "Exodus 17-20" },
    { day: 20, scriptureReferences: "Exodus 21-24" },
    // Continue with full 180 days... (truncated for brevity)
  ].concat(
    // Generate placeholder readings for remaining days (21-180)
    Array.from({ length: 160 }, (_, i) => ({
      day: i + 21,
      scriptureReferences: `OT Reading Day ${i + 21}`
    }))
  )
};

// 6-Month New Testament Plan (180 days)
const sixMonthNT: ReadingPlanData = {
  planType: "6mo-nt",
  title: "6-Month New Testament",
  description: "Read through the New Testament in six months",
  durationDays: 180,
  dailyReadings: [
    { day: 1, scriptureReferences: "Matthew 1-2" },
    { day: 2, scriptureReferences: "Matthew 3-4" },
    { day: 3, scriptureReferences: "Matthew 5-6" },
    { day: 4, scriptureReferences: "Matthew 7-8" },
    { day: 5, scriptureReferences: "Matthew 9-10" },
    { day: 6, scriptureReferences: "Matthew 11-12" },
    { day: 7, scriptureReferences: "Matthew 13-14" },
    { day: 8, scriptureReferences: "Matthew 15-16" },
    { day: 9, scriptureReferences: "Matthew 17-18" },
    { day: 10, scriptureReferences: "Matthew 19-20" },
    { day: 11, scriptureReferences: "Matthew 21-22" },
    { day: 12, scriptureReferences: "Matthew 23-24" },
    { day: 13, scriptureReferences: "Matthew 25-26" },
    { day: 14, scriptureReferences: "Matthew 27-28" },
    { day: 15, scriptureReferences: "Mark 1-2" },
    { day: 16, scriptureReferences: "Mark 3-4" },
    { day: 17, scriptureReferences: "Mark 5-6" },
    { day: 18, scriptureReferences: "Mark 7-8" },
    { day: 19, scriptureReferences: "Mark 9-10" },
    { day: 20, scriptureReferences: "Mark 11-12" },
    // Continue with full 180 days... (truncated for brevity)
  ].concat(
    // Generate placeholder readings for remaining days (21-180)
    Array.from({ length: 160 }, (_, i) => ({
      day: i + 21,
      scriptureReferences: `NT Reading Day ${i + 21}`
    }))
  )
};

// Export all plans
export const READING_PLANS: Record<PlanType, ReadingPlanData> = {
  "1yr-whole": oneYearWholeBible,
  "6mo-ot": sixMonthOT,
  "6mo-nt": sixMonthNT
};

// Helper function to get a specific plan
export function getPlan(planType: PlanType): ReadingPlanData | null {
  return READING_PLANS[planType] || null;
}

// Helper function to get all plans
export function getAllPlans(): ReadingPlanData[] {
  return Object.values(READING_PLANS);
}

// Helper function to get a specific day's reading
export function getDayReading(planType: PlanType, day: number): DailyReading | null {
  const plan = getPlan(planType);
  if (!plan) return null;
  return plan.dailyReadings.find(r => r.day === day) || null;
}
