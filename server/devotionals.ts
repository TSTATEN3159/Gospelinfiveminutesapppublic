import type { Request, Response } from "express";
import devotional365Content from "./devotionals-content-365";

export type DevotionalEntry = {
  day: number;               // 1..365
  scriptureRef: string;      // e.g., "Psalm 1:1–3 (NKJV)"
  scriptureText: string;     // short passage or a key verse
  devotion: string;          // 120–250 words
  application: string;       // 2–5 bullet lines or 2–4 sentences
};

export type Gender = "men" | "women";

export type DevotionalPlan = {
  men: Record<string, DevotionalEntry>;
  women: Record<string, DevotionalEntry>;
};

// Generate a full 365-day plan with unique content for each day
function build365(): DevotionalPlan {
  const makeEntry = (day: number, gender: Gender): DevotionalEntry => {
    const key = String(day);
    const base = devotional365Content[key];
    
    if (!base) {
      // Fallback (should never happen as we have all 365 days)
      return {
        day,
        scriptureRef: `Psalm ${((day - 1) % 150) + 1}:1 (ESV)`,
        scriptureText: "God's Word is a lamp to our feet and a light to our path.",
        devotion: "Today's focus: walking in God's truth. His Word guides us in every season of life. Take time to meditate on Scripture and allow the Holy Spirit to illuminate its meaning for your circumstances today.",
        application: "• Read one chapter from the Psalms.\n• Pray for wisdom to apply God's Word.\n• Journal one truth that stands out to you."
      };
    }
    
    // Apply gentle gender-appropriate language adjustments
    const genderTweak = gender === "men" 
      ? base.devo 
      : base.devo.replace(/\b(man|men|he|his|him)\b/gi, (match) => {
          const lower = match.toLowerCase();
          if (lower === "man") return "person";
          if (lower === "men") return "people";
          if (lower === "he") return "they";
          if (lower === "his") return "their";
          if (lower === "him") return "them";
          return match;
        });
    
    return {
      day,
      scriptureRef: base.ref,
      scriptureText: base.text,
      devotion: genderTweak,
      application: base.app
    };
  };

  const men: Record<string, DevotionalEntry> = {};
  const women: Record<string, DevotionalEntry> = {};
  for (let d = 1; d <= 365; d++) {
    men[String(d)] = makeEntry(d, "men");
    women[String(d)] = makeEntry(d, "women");
  }
  return { men, women };
}

// In-memory cache (fast + zero DB required today)
let PLAN_CACHE: DevotionalPlan | null = null;
const getPlan = (): DevotionalPlan => (PLAN_CACHE ??= build365());

// --------- Route handlers ----------
export function getWholePlan(req: Request, res: Response) {
  res.json(getPlan());
}

export function getDay(req: Request, res: Response) {
  const gender = (req.params.gender ?? "").toLowerCase() as Gender;
  const day = Number(req.params.day);
  if (!["men", "women"].includes(gender) || !Number.isInteger(day) || day < 1 || day > 365) {
    return res.status(400).json({ success: false, error: "Invalid gender or day" });
  }
  const plan = getPlan();
  const entry = plan[gender][String(day)];
  res.json(entry);
}
