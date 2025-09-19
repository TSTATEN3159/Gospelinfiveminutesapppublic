import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TermsOfServicePageProps {
  onBack: () => void;
}

export default function TermsOfServicePage({ onBack }: TermsOfServicePageProps) {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-background px-4 py-6 border-b border-border sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack} data-testid="button-back" aria-label="Go back to More page">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground text-center flex-1">Terms of Service</h1>
        </div>
      </div>

      <div className="px-4 py-6 max-w-3xl mx-auto">
        <div className="bg-background rounded-lg p-6 shadow-lg border-2 space-y-6 text-sm">
          <div>
            <p className="text-muted-foreground mb-4">
              <strong>Effective Date:</strong> {new Date().toLocaleDateString()}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Welcome to The Gospel in 5 Minutes. These Terms of Service ("Terms") govern your use of our 
              mobile application and services. By using our app, you agree to these Terms.
            </p>
          </div>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3 text-center">1. License to Use</h2>
            <p className="text-muted-foreground">
              We grant you a limited, non-exclusive, non-transferable license to use The Gospel in 5 Minutes 
              for your personal, non-commercial use. This license does not include the right to resell, 
              redistribute, or create derivative works.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3 text-center">2. Acceptable Use</h2>
            <div className="space-y-3">
              <p className="text-muted-foreground">You agree to use our app in a manner consistent with:</p>
              <ul className="space-y-2 text-muted-foreground ml-4">
                <li>• Christian values and biblical principles</li>
                <li>• Respectful engagement with spiritual content</li>
                <li>• Lawful purposes only</li>
                <li>• Personal spiritual growth and education</li>
              </ul>
              <p className="text-muted-foreground font-medium">You agree NOT to:</p>
              <ul className="space-y-2 text-muted-foreground ml-4">
                <li>• Use the app for commercial purposes without permission</li>
                <li>• Attempt to reverse engineer or hack the app</li>
                <li>• Share inappropriate or offensive content</li>
                <li>• Violate any applicable laws or regulations</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3 text-center">3. AI-Powered Features</h2>
            <div className="space-y-3">
              <p className="text-muted-foreground">
                Our "Ask the Pastor" feature uses artificial intelligence to provide Biblical guidance. 
                Please understand:
              </p>
              <ul className="space-y-2 text-muted-foreground ml-4">
                <li>• AI responses are for educational and inspirational purposes</li>
                <li>• Responses should not replace professional counseling or medical advice</li>
                <li>• AI-generated content may contain errors or limitations</li>
                <li>• For serious spiritual matters, consult with a qualified pastor or counselor</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3 text-center">4. Content and Intellectual Property</h2>
            <div className="space-y-3">
              <p className="text-muted-foreground">
                <strong>Biblical Content:</strong> Scripture quotations are from public domain translations 
                or used under appropriate licenses.
              </p>
              <p className="text-muted-foreground">
                <strong>Original Content:</strong> Our original content, including study plans, commentary, 
                and app features, are protected by copyright and remain our property.
              </p>
              <p className="text-muted-foreground">
                <strong>User Content:</strong> Any questions or input you provide may be used to improve 
                our services while respecting your privacy.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3 text-center">5. Disclaimers</h2>
            <div className="space-y-3">
              <p className="text-muted-foreground">
                <strong>Educational Purpose:</strong> This app is for educational and inspirational purposes. 
                It is not a substitute for:
              </p>
              <ul className="space-y-2 text-muted-foreground ml-4">
                <li>• Professional pastoral counseling</li>
                <li>• Medical or psychological advice</li>
                <li>• Legal advice or financial guidance</li>
                <li>• Crisis intervention or emergency services</li>
              </ul>
              <p className="text-muted-foreground">
                <strong>Doctrinal Neutrality:</strong> While we strive for biblical accuracy, interpretations 
                may vary among Christian denominations. Consult your local church for doctrinal guidance.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3 text-center">6. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              To the maximum extent permitted by law, The Gospel in 5 Minutes and its creators shall not 
              be liable for any indirect, incidental, special, or consequential damages arising from your 
              use of the app, including but not limited to spiritual, emotional, or personal decisions 
              based on app content.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3 text-center">7. Termination</h2>
            <p className="text-muted-foreground">
              You may stop using the app at any time and delete your account. We reserve the right to 
              terminate or suspend access to users who violate these Terms or engage in inappropriate behavior.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3 text-center">8. Updates and Changes</h2>
            <p className="text-muted-foreground">
              We may update these Terms periodically. Continued use of the app after changes constitutes 
              acceptance of the new Terms. Material changes will be communicated through the app.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3 text-center">9. Governing Law</h2>
            <p className="text-muted-foreground">
              These Terms are governed by the laws of the United States. Any disputes will be resolved 
              through binding arbitration in accordance with Christian principles of reconciliation where possible.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3 text-center">10. Contact Information</h2>
            <div className="text-muted-foreground space-y-2">
              <p>For questions about these Terms, please contact us:</p>
              <p>
                <strong>Email:</strong> support@thegospelin5minutes.com<br />
                <strong>Facebook:</strong> @TheGospelIn5Minutes<br />
                <strong>Address:</strong> The Gospel in 5 Minutes, Legal Department
              </p>
            </div>
          </section>

          <div className="pt-4 border-t border-border">
            <p className="text-muted-foreground text-xs">
              By using The Gospel in 5 Minutes, you acknowledge that you have read, understood, and agree 
              to be bound by these Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}