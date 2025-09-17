import { ArrowLeft, Mail, MessageCircle, Trash2, Download, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

interface SupportPageProps {
  onBack: () => void;
}

export default function SupportPage({ onBack }: SupportPageProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteData = () => {
    if (showDeleteConfirm) {
      // Clear all local storage
      localStorage.clear();
      
      // Show confirmation
      alert("Your data has been deleted successfully. The app will now restart.");
      
      // Reload the app to reset state
      window.location.reload();
    } else {
      setShowDeleteConfirm(true);
    }
  };

  const handleExportData = () => {
    const userData = {
      user: localStorage.getItem("gospelAppUser"),
      language: localStorage.getItem("gospelAppLanguage"),
      streak: localStorage.getItem("gospelAppStreak"),
      lastVisit: localStorage.getItem("gospelAppLastVisit"),
      exportDate: new Date().toISOString(),
    };

    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `gospel-app-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-6 border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack} data-testid="button-back">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-gray-900">Support & Privacy</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Contact Support */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <MessageCircle className="w-6 h-6 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Contact Support</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Need help? Have questions? We're here to support your spiritual journey.
            </p>
            <div className="space-y-3">
              <a 
                href="mailto:support@thegospelin5minutes.com"
                className="flex items-center gap-2 text-blue-600"
                data-testid="link-email-support"
              >
                <Mail className="w-4 h-4" />
                support@thegospelin5minutes.com
              </a>
              <a 
                href="https://www.facebook.com/TheGospelIn5Minutes"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600"
                data-testid="link-facebook-support"
              >
                <MessageCircle className="w-4 h-4" />
                Message us on Facebook
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Controls */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-green-600" />
              <h2 className="text-lg font-semibold text-gray-900">Your Privacy Rights</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Manage your personal data and privacy settings.
            </p>
            
            <div className="space-y-4">
              {/* Export Data */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Export My Data</h3>
                  <p className="text-sm text-gray-600">Download a copy of your personal data</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleExportData}
                  data-testid="button-export-data"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>

              {/* Delete Data */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div>
                  <h3 className="font-medium text-gray-900">Delete My Data</h3>
                  <p className="text-sm text-gray-600">Permanently remove all your personal information</p>
                </div>
                <Button 
                  variant={showDeleteConfirm ? "destructive" : "outline"}
                  size="sm" 
                  onClick={handleDeleteData}
                  data-testid="button-delete-data"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  {showDeleteConfirm ? "Confirm Delete" : "Delete Data"}
                </Button>
              </div>

              {showDeleteConfirm && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-red-800 font-medium mb-2">Are you sure?</p>
                  <p className="text-sm text-red-700 mb-3">
                    This will permanently delete all your data including your profile, streak count, 
                    preferences, and settings. This action cannot be undone.
                  </p>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setShowDeleteConfirm(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={handleDeleteData}
                    >
                      Yes, Delete All Data
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* App Information */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">App Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Version</span>
                <span className="text-gray-900">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Build</span>
                <span className="text-gray-900">2025.01.01</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Platform</span>
                <span className="text-gray-900">iOS</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Resources */}
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-orange-900 mb-2">Crisis Resources</h2>
            <p className="text-sm text-orange-800 mb-4">
              If you're experiencing a mental health crisis or having thoughts of self-harm, 
              please reach out for immediate professional help:
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-orange-900 font-medium">
                National Suicide Prevention Lifeline: <a href="tel:988" className="underline">988</a>
              </p>
              <p className="text-orange-900 font-medium">
                Crisis Text Line: Text HOME to <a href="sms:741741" className="underline">741741</a>
              </p>
              <p className="text-orange-800">
                Remember: This app is for spiritual encouragement, not crisis intervention.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}