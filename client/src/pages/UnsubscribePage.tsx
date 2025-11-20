import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function UnsubscribePage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUnsubscribed, setIsUnsubscribed] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, []);

  const handleUnsubscribe = async () => {
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/unsubscribe-daily-reminder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setIsUnsubscribed(true);
        toast({
          title: "Unsubscribed Successfully",
          description: data.message,
        });
      } else {
        setError(data.error || "Failed to unsubscribe. Please try again.");
      }
    } catch (err) {
      setError("There was a problem processing your request. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-amber-50 to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-amber-500 rounded-full flex items-center justify-center">
            {isUnsubscribed ? (
              <CheckCircle2 className="w-8 h-8 text-white" />
            ) : (
              <XCircle className="w-8 h-8 text-white" />
            )}
          </div>
          <CardTitle className="text-2xl">
            {isUnsubscribed ? "You've been unsubscribed" : "Unsubscribe from Daily Emails"}
          </CardTitle>
          <CardDescription>
            {isUnsubscribed
              ? "We're sorry to see you go. You won't receive any more daily reminder emails."
              : "We're sad to see you go, but we understand. Enter your email below to unsubscribe from daily reminder emails."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isUnsubscribed ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  data-testid="input-unsubscribe-email"
                />
              </div>

              {error && (
                <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                  {error}
                </div>
              )}

              <Button
                className="w-full"
                onClick={handleUnsubscribe}
                disabled={isLoading}
                data-testid="button-unsubscribe"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Unsubscribing...
                  </>
                ) : (
                  "Unsubscribe"
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Changed your mind?{" "}
                <button
                  onClick={() => setLocation("/")}
                  className="text-primary underline hover:no-underline"
                >
                  Go back to the app
                </button>
              </p>
            </div>
          ) : (
            <div className="space-y-4 text-center">
              <p className="text-sm text-muted-foreground">
                You can always re-subscribe by visiting the app and turning on Daily Reminders again.
              </p>
              <Button
                className="w-full"
                onClick={() => setLocation("/")}
                data-testid="button-back-to-app"
              >
                Return to App
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
