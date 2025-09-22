import { ArrowLeft, Mail, MessageCircle, Trash2, Download, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

interface SupportPageProps {
  onBack: () => void;
}

export default function SupportPage({ onBack }: SupportPageProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteData = async () => {
    if (showDeleteConfirm) {
      setIsDeleting(true);
      
      try {
        // Get user data to extract appUserId
        const userData = localStorage.getItem("gospelAppUser");
        
        if (userData) {
          const user = JSON.parse(userData);
          
          if (user.appUserId) {
            // Make API call to delete user account from server
            const response = await fetch(`/api/users/${user.appUserId}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            
            const result = await response.json();
            
            if (result.success) {
              // Server deletion successful, now clear local storage
              localStorage.clear();
              
              // Show confirmation
              alert("Your account and all associated data have been permanently deleted from our servers. The app will now restart.");
              
              // Reload the app to reset state
              window.location.reload();
            } else {
              // Server deletion failed
              console.error("Server deletion failed:", result.error);
              alert("Failed to delete your account from our servers. Please contact support for assistance.");
              setIsDeleting(false);
              setShowDeleteConfirm(false);
            }
          } else {
            // No server account exists, just clear local data
            localStorage.clear();
            alert("Your local data has been deleted successfully. The app will now restart.");
            window.location.reload();
          }
        } else {
          // No user data exists
          localStorage.clear();
          alert("No user data found. The app will now restart.");
          window.location.reload();
        }
      } catch (error) {
        console.error("Error deleting user account:", error);
        alert("An error occurred while deleting your account. Please contact support for assistance.");
        setIsDeleting(false);
        setShowDeleteConfirm(false);
      }
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
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-background px-4 py-6 border-b border-border sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack} data-testid="button-back" aria-label="Go back to More page">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground text-center flex-1">Support & Privacy</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Contact Support */}
        <Card className="shadow-lg border-2">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4 text-center">Contact Support</h2>
            <div className="flex justify-center mb-4">
              <MessageCircle className="w-6 h-6 text-primary" />
            </div>
            <p className="text-muted-foreground mb-4 text-center">
              Need help? Have questions? We're here to support your spiritual journey.
            </p>
            <div className="space-y-3">
              <a 
                href="mailto:support@thegospelin5minutes.com"
                className="flex items-center gap-2 text-primary hover:text-foreground transition-colors"
                data-testid="link-email-support"
              >
                <Mail className="w-4 h-4" />
                support@thegospelin5minutes.com
              </a>
              <a 
                href="https://www.facebook.com/TheGospelIn5Minutes"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:text-foreground transition-colors"
                data-testid="link-facebook-support"
              >
                <MessageCircle className="w-4 h-4" />
                Message us on Facebook
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Controls */}
        <Card className="shadow-lg border-2">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4 text-center">Your Privacy Rights</h2>
            <div className="flex justify-center mb-4">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <p className="text-muted-foreground mb-4 text-center">
              Manage your personal data and privacy settings.
            </p>
            
            <div className="space-y-4">
              {/* Export Data */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-foreground">Export My Data</h3>
                  <p className="text-sm text-muted-foreground">Download a copy of your personal data</p>
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
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <h3 className="font-medium text-foreground">Delete My Data</h3>
                  <p className="text-sm text-muted-foreground">Permanently remove all your personal information</p>
                </div>
                <Button 
                  variant={showDeleteConfirm ? "destructive" : "outline"}
                  size="sm" 
                  onClick={handleDeleteData}
                  disabled={isDeleting}
                  data-testid="button-delete-data"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  {isDeleting ? "Deleting..." : showDeleteConfirm ? "Confirm Delete" : "Delete Data"}
                </Button>
              </div>

              {showDeleteConfirm && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                  <p className="text-sm text-destructive font-medium mb-2">Are you sure?</p>
                  <p className="text-sm text-destructive mb-3">
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
        <Card className="shadow-lg border-2">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4 text-center">App Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Version</span>
                <span className="text-foreground" data-testid="text-app-version">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Build</span>
                <span className="text-foreground" data-testid="text-app-build">2025.01.01</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Platform</span>
                <span className="text-foreground" data-testid="text-app-platform">iOS</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Resources */}
        <Card className="border-destructive/20 bg-destructive/5 shadow-lg border-2">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-destructive mb-2 text-center">Crisis Resources</h2>
            <p className="text-sm text-destructive mb-4">
              If you're experiencing a mental health crisis or having thoughts of self-harm, 
              please reach out for immediate professional help:
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-destructive font-medium">
                National Suicide Prevention Lifeline: <a href="tel:988" className="underline hover:text-foreground transition-colors" data-testid="link-suicide-prevention">988</a>
              </p>
              <p className="text-destructive font-medium">
                Crisis Text Line: Text HOME to <a href="sms:741741" className="underline hover:text-foreground transition-colors" data-testid="link-crisis-text">741741</a>
              </p>
              <p className="text-destructive">
                Remember: This app is for spiritual encouragement, not crisis intervention.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}