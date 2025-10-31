import type { Request, Response } from "express";

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

// --- Minimal seed content (Days 1–3 real text), rest are clean placeholders.
// You can expand/replace later from DB/OpenAI without changing the client.
const seedDays = (): Record<string, { ref: string; text: string; devo: string; app: string }> => ({
  "1": {
    ref: "Psalm 1:1–3 (NKJV)",
    text:
      "Blessed is the man who walks not in the counsel of the ungodly... he shall be like a tree planted by the rivers of water...",
    devo:
      "God's blessing flows where our roots are sunk in His Word. The ungodly offer quick counsel, but Scripture forms slow strength. Planted people prosper in seasons and endure in droughts. Choose your counsel and your rhythms—Scripture daily, prayerfully, expectantly.",
    app:
      "• Pick a 10-minute daily Scripture slot and protect it.\n• Replace one ungodly input today (video/podcast) with Psalm 1.\n• Pray: 'Root me by Your river, Lord.'"
  },
  "2": {
    ref: "John 15:5 (ESV)",
    text: "I am the vine; you are the branches... apart from me you can do nothing.",
    devo:
      "Fruit isn't forced—it's produced by abiding. Jesus does the heavy lifting when we remain in Him. Your job is connection; His job is transformation. Practice awareness of Christ's presence through the day, not merely morning devotions.",
    app:
      "• Whisper 'I abide in You' before each task today.\n• Identify one branch-breaking habit; replace it with prayer.\n• End day asking: Where did I notice Christ's help?"
  },
  "3": {
    ref: "Philippians 4:6–7 (NIV)",
    text: "Do not be anxious about anything... present your requests to God...",
    devo:
      "Anxiety shrinks when prayer expands. Paul gives a pathway: refuse worry, present requests, give thanks, then receive peace. Peace doesn't wait for solved problems—it comes from the guarding presence of God in Christ.",
    app:
      "• Write 3 worries → convert each into a request.\n• Thank God for one specific past rescue.\n• Breathe: 'Your peace guards me in Christ.'"
  }
});

// Generate a full 365-day plan by blending seeds + structured placeholders
function build365(): DevotionalPlan {
  const base = seedDays();
  const makeEntry = (day: number, gender: Gender): DevotionalEntry => {
    const key = String(day);
    if (base[key]) {
      const b = base[key];
      // tiny gender tweak in voice (optional)
      const tweak = gender === "men" ? "" : " (Sisters, take this to heart.)";
      return {
        day,
        scriptureRef: b.ref,
        scriptureText: b.text,
        devotion: b.devo + tweak,
        application: b.app
      };
    }
    // clean, App Store–safe placeholders for the rest
    return {
      day,
      scriptureRef: `Proverbs ${((day - 1) % 31) + 1}:${(day % 7) + 1} (ESV)`,
      scriptureText: "Wise living grows from listening to God's instruction.",
      devotion:
        "Today's focus: simple obedience. Choose one instruction of Jesus and practice it deliberately—gentleness with a hard person, secrecy in generosity, or patient prayer. Small obedience, repeated daily, forms Christlike character.",
      application:
        "• Read one Proverb aloud.\n• Name one small act of obedience and do it.\n• Journal one sentence: 'Today I obeyed Jesus in ____.'"
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
