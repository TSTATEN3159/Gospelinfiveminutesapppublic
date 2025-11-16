import { useMemo } from "react";

// Import high-definition stock photo for the right side
import bibleStudyImage from '@assets/stock_images/bible_study_desk_ope_97d3d592.jpg';

type Verse = {
  ref: string;
  text: string;
};

const VERSES: Verse[] = [
  { ref: "Psalm 23:1", text: "The Lord is my shepherd; I shall not want." },
  { ref: "John 3:16", text: "For God so loved the world that he gave his one and only Son." },
  { ref: "Romans 8:28", text: "And we know that in all things God works for the good of those who love him." },
  { ref: "Proverbs 3:5–6", text: "Trust in the Lord with all your heart and lean not on your own understanding." },
  { ref: "Philippians 4:6–7", text: "Do not be anxious about anything, but in every situation, present your requests to God." },
  { ref: "Isaiah 41:10", text: "Fear not, for I am with you; be not dismayed, for I am your God." },
  { ref: "Matthew 11:28", text: "Come to me, all you who are weary and burdened, and I will give you rest." },
  { ref: "Romans 8:31", text: "If God is for us, who can be against us?" },
  { ref: "Hebrews 11:1", text: "Now faith is confidence in what we hope for and assurance about what we do not see." },
  { ref: "Galatians 2:20", text: "I live by faith in the Son of God, who loved me and gave himself for me." },
  { ref: "2 Corinthians 5:17", text: "If anyone is in Christ, the new creation has come: The old has gone, the new is here!" },
  { ref: "Ephesians 2:8–9", text: "It is by grace you have been saved, through faith—and this is the gift of God." },
  { ref: "Psalm 119:105", text: "Your word is a lamp for my feet, a light on my path." },
  { ref: "Joshua 1:9", text: "Be strong and courageous. Do not be afraid; for the Lord your God will be with you wherever you go." },
  { ref: "Isaiah 40:31", text: "Those who hope in the Lord will renew their strength; they will soar on wings like eagles." },
  { ref: "Romans 12:1–2", text: "Offer your bodies as a living sacrifice... Do not conform to the pattern of this world." },
  { ref: "Colossians 3:16", text: "Let the word of Christ dwell in you richly." },
  { ref: "1 Thessalonians 5:16–18", text: "Rejoice always, pray continually, give thanks in all circumstances." },
  { ref: "Psalm 46:1", text: "God is our refuge and strength, an ever-present help in trouble." },
  { ref: "John 15:5", text: "I am the vine; you are the branches. If you remain in me and I in you, you will bear much fruit." },
  { ref: "James 1:5", text: "If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault." },
  { ref: "1 Peter 5:7", text: "Cast all your anxiety on him because he cares for you." },
  { ref: "Psalm 37:4", text: "Take delight in the Lord, and he will give you the desires of your heart." },
  { ref: "Micah 6:8", text: "Act justly, love mercy, and walk humbly with your God." },
  { ref: "John 8:12", text: "I am the light of the world. Whoever follows me will never walk in darkness." },
];

export default function ScriptureTickerPanel() {
  const featuredVerse = useMemo(() => {
    const idx = Math.floor(Math.random() * VERSES.length);
    return VERSES[idx];
  }, []);

  const tickerContent = VERSES.map((v, i) => (
    <div key={i} className="inline-flex items-center gap-3 pr-16">
      <span className="text-[10px] md:text-xs font-semibold text-emerald-300 uppercase tracking-wide">
        Verse
      </span>
      <span className="text-xs md:text-sm text-slate-100 whitespace-nowrap">
        {v.ref} — {v.text}
      </span>
    </div>
  ));

  return (
    <section 
      className="w-full rounded-3xl bg-slate-900 text-slate-100 shadow-[0_20px_60px_rgba(15,23,42,0.55)] overflow-hidden"
      data-testid="scripture-ticker-panel"
    >
      <div className="grid md:grid-cols-[2fr,1.5fr] gap-0 items-stretch">
        {/* LEFT SIDE: Static verse + ticker */}
        <div className="p-4 md:p-6 flex flex-col justify-between min-w-0">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.25em] text-emerald-300 mb-2">
              TODAY&apos;S FOCUS VERSE
            </p>
            <p className="text-base md:text-xl font-semibold text-slate-100 leading-snug mb-3 whitespace-normal break-words">
              &ldquo;{featuredVerse.text}&rdquo;
            </p>
            <p className="text-xs md:text-sm font-medium text-emerald-200">
              {featuredVerse.ref}
            </p>
          </div>

          {/* Scrolling ticker with many verses */}
          <div className="mt-4 pt-3 border-t border-slate-700">
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-1">
              Meditate as you move
            </p>
            <div className="h-8 md:h-10 overflow-hidden relative">
              <div className="ticker-wrapper">
                <div className="ticker-content">
                  {tickerContent}
                  {tickerContent}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Single clean focused HD photo */}
        <div className="relative h-48 md:h-full min-h-[200px] overflow-hidden rounded-r-3xl">
          <img
            src={bibleStudyImage}
            alt="Bible study desk with open Bible"
            className="w-full h-full object-cover"
          />
          {/* Subtle overlay for cohesion with dark theme */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-slate-900/0 via-slate-900/5 to-slate-900/30" />
        </div>
      </div>

      <style>{`
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .ticker-wrapper {
          display: flex;
          width: 100%;
        }

        .ticker-content {
          display: flex;
          animation: ticker 120s linear infinite;
        }

        .ticker-content:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
