import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/lib/translations";

interface PrivacyPolicyPageProps {
  onBack: () => void;
  language?: string;
}

export default function PrivacyPolicyPage({ onBack, language = "en" }: PrivacyPolicyPageProps) {
  const t = useTranslations(language);
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-background px-4 py-6 border-b border-border sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack} data-testid="button-back" aria-label="Go back to More page">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground text-center flex-1">{t.privacyPolicyTitle}</h1>
        </div>
      </div>

      <div className="px-4 py-6 max-w-3xl mx-auto">
        <div className="bg-background rounded-lg p-6 shadow-lg border-2 space-y-6 text-sm">
          <div>
            <p className="text-muted-foreground mb-4">
              <strong>{t.effectiveDate}</strong> {new Date().toLocaleDateString()}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t.privacyIntro}
            </p>
          </div>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3 text-center">{t.infoWeCollect}</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-medium text-foreground">{t.personalInformation}</h3>
                <p className="text-muted-foreground">
                  {t.personalInfoDesc}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-foreground">{t.usageData}</h3>
                <p className="text-muted-foreground">
                  {t.usageDataDesc}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-foreground">{t.aiPastorQuestions}</h3>
                <p className="text-muted-foreground">
                  {t.aiPastorQuestionsDesc}
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3 text-center">{t.howWeUseInfo}</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• {t.usePersonalizeDailyVerses}</li>
              <li>• {t.useTrackProgress}</li>
              <li>• {t.useProvideBiblicalGuidance}</li>
              <li>• {t.useSendRelevantContent}</li>
              <li>• {t.useImproveApp}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3 text-center">{t.dataSharingThirdParties}</h2>
            <div className="space-y-3">
              <p className="text-muted-foreground">
                <strong>{t.openAIServicesLabel}</strong> {t.openAIServicesDesc} <a href="https://openai.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-foreground transition-colors" data-testid="link-openai-privacy">{t.openAIPrivacyPolicyLink}</a>
              </p>
              <p className="text-muted-foreground">
                <strong>{t.noSellingLabel}</strong> {t.noSellingDesc}
              </p>
              <p className="text-muted-foreground">
                <strong>{t.analyticsLabel}</strong> {t.analyticsDesc}
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3 text-center">{t.dataStorageSecurity}</h2>
            <p className="text-muted-foreground">
              {t.dataStorageSecurityDesc}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3 text-center">{t.yourRightsChoices}</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• <strong>{t.rightsAccessLabel}</strong> {t.rightsAccessDesc}</li>
              <li>• <strong>{t.rightsCorrectionLabel}</strong> {t.rightsCorrectionDesc}</li>
              <li>• <strong>{t.rightsDeletionLabel}</strong> {t.rightsDeletionDesc}</li>
              <li>• <strong>{t.rightsPortabilityLabel}</strong> {t.rightsPortabilityDesc}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3 text-center">{t.childrensPrivacy}</h2>
            <p className="text-muted-foreground">
              {t.childrensPrivacyDesc}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3 text-center">{t.dataRetention}</h2>
            <p className="text-muted-foreground">
              {t.dataRetentionDesc}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3 text-center">{t.changesToPolicy}</h2>
            <p className="text-muted-foreground">
              {t.changesToPolicyDesc}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3 text-center">{t.contactUs}</h2>
            <div className="text-muted-foreground space-y-2">
              <p>{t.contactUsIntro}</p>
              <p>
                <strong>{t.contactEmailLabel}</strong> privacy@thegospelin5minutes.com<br />
                <strong>{t.contactFacebookLabel}</strong> @TheGospelIn5Minutes<br />
                <strong>{t.contactAddressLabel}</strong> The Gospel in 5 Minutes, Privacy Officer
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}