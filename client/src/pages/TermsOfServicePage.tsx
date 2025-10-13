import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/lib/translations";

interface TermsOfServicePageProps {
  onBack: () => void;
  language?: string;
}

export default function TermsOfServicePage({ onBack, language = "en" }: TermsOfServicePageProps) {
  const t = useTranslations(language);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-background px-4 py-6 border-b border-border sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack} data-testid="button-back" aria-label="Go back to More page" className="h-11 w-11 bg-accent/50 dark:bg-accent/30 hover:bg-accent dark:hover:bg-accent shadow-lg hover:shadow-xl transition-all duration-300 rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground text-center flex-1">{t.termsOfService}</h1>
        </div>
      </div>

      <div className="px-4 py-6 max-w-3xl mx-auto">
        <div className="bg-background rounded-lg p-6 shadow-lg border-2 space-y-6 text-sm">
          <div>
            <p className="text-muted-foreground mb-4">
              <strong>{t.effectiveDate}</strong> {new Date().toLocaleDateString()}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t.tosWelcomeText}
            </p>
          </div>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3 text-center">{t.tosSection1Title}</h2>
            <p className="text-muted-foreground">
              {t.tosSection1Content}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3 text-center">{t.tosSection2Title}</h2>
            <div className="space-y-3">
              <p className="text-muted-foreground">{t.tosSection2Intro}</p>
              <ul className="space-y-2 text-muted-foreground ml-4">
                <li>• {t.tosSection2Item1}</li>
                <li>• {t.tosSection2Item2}</li>
                <li>• {t.tosSection2Item3}</li>
                <li>• {t.tosSection2Item4}</li>
              </ul>
              <p className="text-muted-foreground font-medium">{t.tosSection2NotIntro}</p>
              <ul className="space-y-2 text-muted-foreground ml-4">
                <li>• {t.tosSection2NotItem1}</li>
                <li>• {t.tosSection2NotItem2}</li>
                <li>• {t.tosSection2NotItem3}</li>
                <li>• {t.tosSection2NotItem4}</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3 text-center">{t.tosSection3Title}</h2>
            <div className="space-y-3">
              <p className="text-muted-foreground">
                {t.tosSection3Intro}
              </p>
              <ul className="space-y-2 text-muted-foreground ml-4">
                <li>• {t.tosSection3Item1}</li>
                <li>• {t.tosSection3Item2}</li>
                <li>• {t.tosSection3Item3}</li>
                <li>• {t.tosSection3Item4}</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3 text-center">{t.tosSection4Title}</h2>
            <div className="space-y-3">
              <p className="text-muted-foreground">
                <strong>{t.tosSection4BiblicalContentLabel}</strong> {t.tosSection4BiblicalContentText}
              </p>
              <p className="text-muted-foreground">
                <strong>{t.tosSection4OriginalContentLabel}</strong> {t.tosSection4OriginalContentText}
              </p>
              <p className="text-muted-foreground">
                <strong>{t.tosSection4UserContentLabel}</strong> {t.tosSection4UserContentText}
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3 text-center">{t.tosSection5Title}</h2>
            <div className="space-y-3">
              <p className="text-muted-foreground">
                <strong>{t.tosSection5EducationalLabel}</strong> {t.tosSection5EducationalText}
              </p>
              <ul className="space-y-2 text-muted-foreground ml-4">
                <li>• {t.tosSection5Item1}</li>
                <li>• {t.tosSection5Item2}</li>
                <li>• {t.tosSection5Item3}</li>
                <li>• {t.tosSection5Item4}</li>
              </ul>
              <p className="text-muted-foreground">
                <strong>{t.tosSection5DoctrinalLabel}</strong> {t.tosSection5DoctrinalText}
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3 text-center">{t.tosSection6Title}</h2>
            <p className="text-muted-foreground">
              {t.tosSection6Content}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3 text-center">{t.tosSection7Title}</h2>
            <p className="text-muted-foreground">
              {t.tosSection7Content}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3 text-center">{t.tosSection8Title}</h2>
            <p className="text-muted-foreground">
              {t.tosSection8Content}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3 text-center">{t.tosSection9Title}</h2>
            <p className="text-muted-foreground">
              {t.tosSection9Content}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3 text-center">{t.tosSection10Title}</h2>
            <div className="text-muted-foreground space-y-2">
              <p>{t.tosSection10Intro}</p>
              <p>
                <strong>{t.contactEmailLabel}</strong> {t.tosSection10Email}<br />
                <strong>{t.contactFacebookLabel}</strong> {t.tosSection10Facebook}<br />
                <strong>{t.contactAddressLabel}</strong> {t.tosSection10Address}
              </p>
            </div>
          </section>

          <div className="pt-4 border-t border-border">
            <p className="text-muted-foreground text-xs">
              {t.tosFinalAcknowledgement}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
