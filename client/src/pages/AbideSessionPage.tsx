import { useState } from "react";
import { CheckCircle2, ArrowRight, ArrowLeft, Home } from "lucide-react";
import { tapHaptic, successHaptic } from "@/lib/nativeEnhancements";
import {
  AbideFruitType,
  completeAbideToday,
  getTodaysFruit,
} from "@/lib/abideStorage";
import AbideOnboarding from "@/components/AbideOnboarding";

interface AbideSessionPageProps {
  onNavigate?: (page: string) => void;
}

const STEPS = ["Hear", "Reflect", "Act", "Pray"] as const;
type StepKey = (typeof STEPS)[number];

const FRUIT_VERSES: Record<AbideFruitType, { verse: string; reference: string }> = {
  "Love": {
    verse: "A new commandment I give to you, that you love one another: just as I have loved you, you also are to love one another.",
    reference: "John 13:34"
  },
  "Joy": {
    verse: "The joy of the Lord is your strength.",
    reference: "Nehemiah 8:10"
  },
  "Peace": {
    verse: "Peace I leave with you; my peace I give to you. Not as the world gives do I give to you. Let not your hearts be troubled, neither let them be afraid.",
    reference: "John 14:27"
  },
  "Patience": {
    verse: "Be patient, therefore, brothers, until the coming of the Lord. See how the farmer waits for the precious fruit of the earth, being patient about it.",
    reference: "James 5:7"
  },
  "Kindness": {
    verse: "Be kind to one another, tenderhearted, forgiving one another, as God in Christ forgave you.",
    reference: "Ephesians 4:32"
  },
  "Goodness": {
    verse: "Surely goodness and mercy shall follow me all the days of my life, and I shall dwell in the house of the Lord forever.",
    reference: "Psalm 23:6"
  },
  "Faithfulness": {
    verse: "The steadfast love of the Lord never ceases; his mercies never come to an end; they are new every morning; great is your faithfulness.",
    reference: "Lamentations 3:22-23"
  },
  "Gentleness": {
    verse: "Let your gentleness be evident to all. The Lord is near.",
    reference: "Philippians 4:5"
  },
  "Self-Control": {
    verse: "A man without self-control is like a city broken into and left without walls.",
    reference: "Proverbs 25:28"
  }
};

const FRUIT_ACTIONS: Record<AbideFruitType, string[]> = {
  "Love": [
    "Encourage someone who seems down today.",
    "Serve someone quietly without seeking recognition.",
    "Pray for someone who hurt you.",
    "Send a message of kindness to a friend or family member."
  ],
  "Joy": [
    "Thank God for 3 specific blessings today.",
    "Share something positive with someone who needs encouragement.",
    "Choose gratitude when facing a frustrating situation.",
    "Worship God through a song or prayer of praise."
  ],
  "Peace": [
    "Let go of one worry by giving it to God in prayer.",
    "Respond calmly to a stressful situation today.",
    "Be a peacemaker in a conflict you're aware of.",
    "Take 5 minutes of silence to rest in God's presence."
  ],
  "Patience": [
    "Wait without complaining in a slow line or traffic.",
    "Listen fully before responding in a conversation.",
    "Give someone grace when they make a mistake.",
    "Trust God's timing in something you've been waiting for."
  ],
  "Kindness": [
    "Compliment someone genuinely today.",
    "Help someone without being asked.",
    "Leave an encouraging note for someone.",
    "Buy coffee or a meal for someone unexpectedly."
  ],
  "Goodness": [
    "Do the right thing even when no one is watching.",
    "Stand up for what is true and good.",
    "Share something you have with someone in need.",
    "Speak truth with love in a difficult conversation."
  ],
  "Faithfulness": [
    "Keep a promise you made, even if it's inconvenient.",
    "Show up for someone who is counting on you.",
    "Spend consistent time in prayer or Scripture today.",
    "Be reliable in a small responsibility."
  ],
  "Gentleness": [
    "Speak softly to someone who is frustrated.",
    "Handle a difficult conversation with tenderness.",
    "Be patient with someone learning something new.",
    "Respond with grace instead of harshness."
  ],
  "Self-Control": [
    "Pause before reacting to something that upsets you.",
    "Say no to a temptation you've been struggling with.",
    "Limit screen time and spend it with God instead.",
    "Choose healthy words even when you want to vent."
  ]
};

const FRUIT_PRAYERS: Record<AbideFruitType, string> = {
  "Love": "Lord Jesus, thank You for loving me first. Fill me with Your Spirit so I can love others the way You have loved me. Help me to walk out this one step of obedience today. Amen.",
  "Joy": "Father, fill me with Your joy that doesn't depend on circumstances. Help me find my delight in You today. Let Your joy be my strength. Amen.",
  "Peace": "Prince of Peace, calm my anxious heart. Help me to trust You fully and rest in Your sovereignty. Guard my heart and mind today. Amen.",
  "Patience": "Lord, teach me to wait on You. Help me to be patient with others as You are patient with me. Grow endurance in my heart. Amen.",
  "Kindness": "Jesus, make me kind like You. Open my eyes to see those who need encouragement. Use me to spread Your kindness today. Amen.",
  "Goodness": "Holy Spirit, fill me with Your goodness. Help me do what is right and true. Let my life reflect Your character. Amen.",
  "Faithfulness": "Faithful Father, thank You for never leaving me. Help me be faithful in the small things and keep my commitments. Amen.",
  "Gentleness": "Gentle Savior, soften my heart. Help me respond with gentleness even when I want to react harshly. Amen.",
  "Self-Control": "Lord, strengthen me to resist temptation. Help me say no to what harms and yes to what honors You. Amen."
};

export default function AbideSessionPage({ onNavigate }: AbideSessionPageProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [reflection, setReflection] = useState("");
  const [isCompleting, setIsCompleting] = useState(false);

  const todayFruit = getTodaysFruit();
  const step: StepKey = STEPS[stepIndex];
  const verseData = FRUIT_VERSES[todayFruit];
  const actions = FRUIT_ACTIONS[todayFruit];
  const prayer = FRUIT_PRAYERS[todayFruit];

  const goNext = async () => {
    await tapHaptic();
    if (stepIndex < STEPS.length - 1) {
      setStepIndex((i) => i + 1);
    }
  };

  const goBack = async () => {
    await tapHaptic();
    if (stepIndex > 0) {
      setStepIndex((i) => i - 1);
    } else {
      onNavigate?.("home");
    }
  };

  const handleComplete = async () => {
    setIsCompleting(true);
    await successHaptic();
    completeAbideToday(todayFruit);
    onNavigate?.("home");
  };

  return (
    <div className="relative min-h-screen bg-black text-slate-50 pb-24">
      <AbideOnboarding />

      {/* Header */}
      <div className="px-4 pt-4 pb-2 flex items-center justify-between ios-safe-top">
        <button
          onClick={goBack}
          className="flex items-center text-sm px-3 py-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
          data-testid="button-abide-back"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </button>
        <p className="text-xs tracking-[0.16em] uppercase text-emerald-300/80">
          Abide · Step {stepIndex + 1} of {STEPS.length}
        </p>
        <button
          onClick={() => onNavigate?.("home")}
          className="flex items-center text-sm px-3 py-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
          data-testid="button-home"
        >
          <Home className="h-4 w-4" />
        </button>
      </div>

      {/* Step progress bar */}
      <div className="px-4 mb-4">
        <div className="flex gap-2">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full ${
                i <= stepIndex ? "bg-emerald-400" : "bg-slate-700"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content area */}
      <div className="px-4">
        {step === "Hear" && (
          <div className="rounded-3xl bg-gradient-to-br from-emerald-900/80 to-slate-900/80 border border-emerald-700/40 px-5 py-5 mb-4">
            <p className="text-xs uppercase tracking-[0.18em] text-emerald-200/80 mb-2">
              Step 1 · Hear the Word
            </p>
            <p className="text-sm text-emerald-50 mb-3">
              "{verseData.verse}"
            </p>
            <p className="text-xs text-emerald-200/80 mb-1">{verseData.reference}</p>
            <p className="text-[11px] text-slate-300/90">
              Take a slow breath. Let Jesus' word settle in your heart. This
              is today's fruit: <span className="text-emerald-200">{todayFruit}</span>.
            </p>
          </div>
        )}

        {step === "Reflect" && (
          <div className="rounded-3xl bg-slate-900/80 border border-slate-700/70 px-5 py-5 mb-4">
            <p className="text-xs uppercase tracking-[0.18em] text-emerald-200/80 mb-2">
              Step 2 · Reflect
            </p>
            <p className="text-sm text-slate-50 mb-3">
              Where is God inviting you to show <span className="text-emerald-300">{todayFruit.toLowerCase()}</span> today?
            </p>
            <textarea
              className="w-full rounded-2xl bg-black/60 border border-slate-700 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 resize-none min-h-[90px]"
              placeholder="Write a sentence or two about who God is putting on your heart..."
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              data-testid="textarea-abide-reflection"
            />
            <p className="text-[11px] text-slate-400 mt-2">
              This is just between you and the Lord. Writing helps you listen.
            </p>
          </div>
        )}

        {step === "Act" && (
          <div className="rounded-3xl bg-slate-900/80 border border-slate-700/70 px-5 py-5 mb-4">
            <p className="text-xs uppercase tracking-[0.18em] text-emerald-200/80 mb-2">
              Step 3 · Choose One Action
            </p>
            <p className="text-sm text-slate-50 mb-3">
              Choose <span className="font-semibold">one</span> way you will
              walk in {todayFruit.toLowerCase()} today:
            </p>
            <div className="space-y-2">
              {actions.map((action) => {
                const isSelected = selectedAction === action;
                return (
                  <button
                    key={action}
                    onClick={async () => {
                      await tapHaptic();
                      setSelectedAction(action);
                    }}
                    className={`w-full text-left text-[13px] rounded-2xl px-3 py-2 border transition ${
                      isSelected
                        ? "border-emerald-400 bg-emerald-900/60 text-emerald-100"
                        : "border-slate-700 bg-black/40 text-slate-200"
                    }`}
                    data-testid={`button-action-${action.slice(0, 20)}`}
                  >
                    {action}
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              Keep it small and real. Obedience grows fruit.
            </p>
          </div>
        )}

        {step === "Pray" && (
          <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-black border border-slate-700 px-5 py-5 mb-4">
            <p className="text-xs uppercase tracking-[0.18em] text-emerald-200/80 mb-2">
              Step 4 · Pray it In
            </p>
            <p className="text-sm text-slate-50 mb-3">
              Pray this simple prayer out loud or in your heart:
            </p>
            <p className="text-sm text-slate-200 italic mb-3">
              "{prayer}"
            </p>
            
            {/* Fruit preview with pop animation */}
            <div className="flex justify-center my-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 shadow-lg shadow-amber-700/50 fruit-pop" />
            </div>
            
            <p className="text-[11px] text-slate-400 text-center">
              When you're ready, mark today's Abide as done. Your fruit will
              grow on the Tree.
            </p>
          </div>
        )}
      </div>

      {/* Bottom actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 border-t border-slate-800 px-4 py-3 pb-safe">
        <div className="flex items-center justify-between">
          {stepIndex > 0 ? (
            <button
              onClick={goBack}
              className="text-[13px] text-slate-300 flex items-center"
              data-testid="button-abide-step-back"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </button>
          ) : (
            <div />
          )}

          {step !== "Pray" ? (
            <button
              onClick={goNext}
              className="ml-auto inline-flex items-center rounded-full bg-emerald-500 px-5 py-2 text-[13px] font-semibold text-black shadow-lg shadow-emerald-900/60"
              data-testid="button-abide-next"
            >
              Next
              <ArrowRight className="h-4 w-4 ml-1" />
            </button>
          ) : (
            <button
              disabled={isCompleting}
              onClick={handleComplete}
              className="ml-auto inline-flex items-center rounded-full bg-emerald-400 px-5 py-2 text-[13px] font-semibold text-black shadow-lg shadow-emerald-900/60 disabled:opacity-60"
              data-testid="button-abide-complete"
            >
              <CheckCircle2 className="h-4 w-4 mr-1" />
              Mark Today's Abide Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
