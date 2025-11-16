import { Browser } from "@capacitor/browser";
import {
  buildBibleGatewayUrl,
  type ExternalTranslationCode,
} from "@/utils/externalBibleLinks";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

interface MoreTranslationsProps {
  reference: string;
}

const EXTERNAL_TRANSLATIONS: { code: ExternalTranslationCode; label: string }[] =
  [
    { code: "NIV", label: "NIV" },
    { code: "NLT", label: "NLT" },
    { code: "NKJV", label: "NKJV" },
    { code: "NASB1995", label: "NASB 1995" },
    { code: "MSG", label: "The Message" },
  ];

export function MoreTranslations({ reference }: MoreTranslationsProps) {
  const handleOpen = async (code: ExternalTranslationCode) => {
    const url = buildBibleGatewayUrl(reference, code);

    await Browser.open({
      url,
      presentationStyle: "fullscreen",
    });
  };

  return (
    <div className="mt-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3">
      <div className="flex items-center gap-2 mb-2">
        <BookOpen className="w-4 h-4 text-slate-500 dark:text-slate-400" />
        <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">
          More translations (opens reader view)
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {EXTERNAL_TRANSLATIONS.map((t) => (
          <Button
            key={t.code}
            size="sm"
            variant="outline"
            className="text-xs"
            onClick={() => handleOpen(t.code)}
            data-testid={`button-translation-${t.code.toLowerCase()}`}
          >
            {t.label}
          </Button>
        ))}
      </div>
      <p className="mt-2 text-[10px] text-slate-400 dark:text-slate-500">
        Text shown in an external reader (BibleGateway). Your verse selection is
        preserved.
      </p>
    </div>
  );
}
