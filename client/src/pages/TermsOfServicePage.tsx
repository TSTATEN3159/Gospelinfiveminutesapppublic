import { useTranslations } from "@/lib/translations";
import { HeaderNavigation } from "@/components/NavigationButtons";
import { AppPage } from "@/config/routesConfig";

interface TermsOfServicePageProps {
  onBack: () => void;
  onNavigate?: (page: string) => void;
  language?: string;
}

export default function TermsOfServicePage({ onBack, onNavigate, language = "en" }: TermsOfServicePageProps) {
  const t = useTranslations(language);

  const handleNavigate = (page: AppPage) => {
    if (page === "more") {
      onBack();
    } else if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-background px-4 py-6 border-b border-border sticky top-0 z-10 ios-safe-top">
        <div className="flex items-center justify-between gap-3">
          <HeaderNavigation
            currentPage="terms"
            onNavigate={handleNavigate}
            showHome={false}
          />
          <h1 className="text-xl font-bold text-foreground text-center flex-1">{t.termsOfService}</h1>
          <HeaderNavigation
            currentPage="terms"
            onNavigate={handleNavigate}
            showBack={false}
          />
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
