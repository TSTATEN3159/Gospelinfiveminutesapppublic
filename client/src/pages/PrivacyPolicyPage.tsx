import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PrivacyPolicyPageProps {
  onBack: () => void;
}

export default function PrivacyPolicyPage({ onBack }: PrivacyPolicyPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-6 border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack} data-testid="button-back" aria-label="Go back to More page">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-gray-900">Privacy Policy</h1>
        </div>
      </div>

      <div className="px-4 py-6 max-w-3xl mx-auto">
        <div className="bg-white rounded-lg p-6 shadow-sm space-y-6 text-sm">
          <div>
            <p className="text-gray-600 mb-4">
              <strong>Effective Date:</strong> {new Date().toLocaleDateString()}
            </p>
            <p className="text-gray-700 leading-relaxed">
              The Gospel in 5 Minutes ("we," "our," or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, and safeguard your information when you use our mobile application.
            </p>
          </div>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Information We Collect</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-medium text-gray-800">Personal Information</h3>
                <p className="text-gray-700">
                  When you register, we collect your first name, last name, email address, phone number, 
                  and birth month/day to personalize your spiritual journey.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Usage Data</h3>
                <p className="text-gray-700">
                  We track your daily app usage, streak counters, verse preferences, and language settings 
                  to improve your experience and provide personalized content.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">AI Pastor Questions</h3>
                <p className="text-gray-700">
                  Questions submitted to our "Ask the Pastor" feature are processed by OpenAI's services 
                  to provide Biblical guidance. These interactions are subject to OpenAI's privacy policy.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">How We Use Your Information</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• Personalize daily verses and spiritual content</li>
              <li>• Track your progress and maintain streak counters</li>
              <li>• Provide AI-powered Biblical guidance and answers</li>
              <li>• Send relevant spiritual content based on your preferences</li>
              <li>• Improve app functionality and user experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Data Sharing and Third Parties</h2>
            <div className="space-y-3">
              <p className="text-gray-700">
                <strong>OpenAI Services:</strong> Your "Ask the Pastor" questions are processed by OpenAI 
                to generate Biblical responses. <a href="https://openai.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">OpenAI's privacy policy</a> applies to this processing.
              </p>
              <p className="text-gray-700">
                <strong>No Selling:</strong> We do not sell, rent, or trade your personal information to third parties.
              </p>
              <p className="text-gray-700">
                <strong>Analytics:</strong> We may use anonymized usage data to improve app performance and features.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Data Storage and Security</h2>
            <p className="text-gray-700">
              Your personal information is stored locally on your device and on secure servers. 
              We implement appropriate security measures to protect your data from unauthorized access, 
              alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Your Rights and Choices</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Access:</strong> You can view your personal information in the app settings</li>
              <li>• <strong>Correction:</strong> You can update your information at any time</li>
              <li>• <strong>Deletion:</strong> You can delete your account and all associated data</li>
              <li>• <strong>Data Portability:</strong> You can export your data in a readable format</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Children's Privacy</h2>
            <p className="text-gray-700">
              Our app is designed for users 13 years and older. We do not knowingly collect personal 
              information from children under 13. If you believe we have collected information from a 
              child under 13, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Data Retention</h2>
            <p className="text-gray-700">
              We retain your personal information for as long as your account is active or as needed 
              to provide services. You can request deletion of your data at any time through the app settings.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Changes to This Policy</h2>
            <p className="text-gray-700">
              We may update this Privacy Policy periodically. We will notify you of any material changes 
              by posting the new policy in the app and updating the effective date.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Contact Us</h2>
            <div className="text-gray-700 space-y-2">
              <p>If you have questions about this Privacy Policy, please contact us:</p>
              <p>
                <strong>Email:</strong> privacy@thegospelin5minutes.com<br />
                <strong>Facebook:</strong> @TheGospelIn5Minutes<br />
                <strong>Address:</strong> The Gospel in 5 Minutes, Privacy Officer
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}