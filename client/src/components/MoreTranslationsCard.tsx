import { Browser } from "@capacitor/browser";
import { BookOpenText } from "lucide-react";
import { cn } from "@/lib/utils";

type ExternalTranslationCode = "NIV" | "NLT" | "NKJV" | "NASB1995" | "MSG";

const EXTERNAL_TRANSLATIONS: { code: ExternalTranslationCode; label: string }[] =
  [
    { code: "NIV", label: "NIV" },
    { code: "NLT", label: "NLT" },
    { code: "NKJV", label: "NKJV" },
    { code: "NASB1995", label: "NASB 1995" },
    { code: "MSG", label: "The Message" },
  ];

const BIBLEGATEWAY_CODES: Record<ExternalTranslationCode, string> = {
  NIV: "NIV",
  NLT: "NLT",
  NKJV: "NKJV",
  NASB1995: "NASB1995",
  MSG: "MSG",
};

function buildBibleGatewayUrl(reference: string, translation: ExternalTranslationCode) {
  const versionCode = BIBLEGATEWAY_CODES[translation];
  const encodedRef = encodeURIComponent(reference.trim());
  return `https://www.biblegateway.com/passage/?search=${encodedRef}&version=${versionCode}`;
}

interface MoreTranslationsCardProps {
  reference: string;
  tone?: "dark" | "light";
}

export function MoreTranslationsCard({
  reference,
  tone = "light",
}: MoreTranslationsCardProps) {
  const handleOpen = async (code: ExternalTranslationCode) => {
    const url = buildBibleGatewayUrl(reference, code);
    await Browser.open({
      url,
      presentationStyle: "fullscreen",
    });
  };

  const isDark = tone === "dark";

  return (
    <section
      className={cn(
        "mx-4 mt-4 rounded-3xl border shadow-[0_18px_45px_rgba(15,23,42,0.40)] overflow-hidden",
        isDark
          ? "bg-slate-950/95 border-slate-800/80"
          : "bg-slate-50 border-slate-200"
      )}
    >
      <header className="flex items-center gap-3 px-4 pt-3 pb-2">
        <div
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-2xl",
            isDark ? "bg-amber-400/10 text-amber-300" : "bg-sky-100 text-sky-600"
          )}
        >
          <BookOpenText className="h-4 w-4" />
        </div>
        <div className="flex flex-col">
          <span
            className={cn(
              "text-[11px] font-semibold tracking-[0.16em] uppercase",
              isDark ? "text-slate-400" : "text-slate-500"
            )}
          >
            More translations
          </span>
          <span
            className={cn(
              "text-xs",
              isDark ? "text-slate-300" : "text-slate-600"
            )}
          >
            View <span className="font-semibold">{reference}</span> in other
            Bible versions.
          </span>
        </div>
      </header>

      <div className="flex flex-wrap gap-2 px-4 pb-3">
        {EXTERNAL_TRANSLATIONS.map((t) => (
          <button
            key={t.code}
            type="button"
            onClick={() => handleOpen(t.code)}
            data-testid={`button-translation-${t.code.toLowerCase()}`}
            className={cn(
              "px-3 py-1.5 rounded-2xl text-xs font-medium border",
              "transition shadow-sm active:scale-[0.97]",
              isDark
                ? "bg-slate-900/70 border-slate-700 text-slate-100 hover:bg-slate-800"
                : "bg-white border-slate-200 text-slate-800 hover:bg-slate-100"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <footer
        className={cn(
          "border-t px-4 py-2 text-[10px]",
          isDark
            ? "border-slate-800/80 text-slate-500"
            : "border-slate-200 text-slate-500"
        )}
      >
        Text opens in a secure reader view powered by{" "}
        <span className="font-semibold">BibleGateway</span> on top of
        DailyGospel. Tap <span className="font-semibold">Done</span> to return
        here.
      </footer>
    </section>
  );
}
