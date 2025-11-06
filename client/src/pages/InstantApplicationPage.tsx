import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { CheckCircle, ArrowLeft, Target, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InstantApplicationPageProps {
  onNavigate: (page: string) => void;
}

export default function InstantApplicationPage({ onNavigate }: InstantApplicationPageProps) {
  const [verse, setVerse] = useState("");
  const [reference, setReference] = useState("");
  const [application, setApplication] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGetApplication = async () => {
    if (!verse.trim()) {
      toast({
        title: "Verse Required",
        description: "Please enter a Bible verse to get an application.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setApplication("");

    try {
      const response = await fetch('/api/verse-instant-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ verse, reference })
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to get application');
      }

      setApplication(data.application);
    } catch (error) {
      console.error('Instant Application error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-20 bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-500/10 via-background to-purple-600/10 px-4 py-8 border-b border-border ios-safe-top">
        <div className="max-w-sm mx-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('daily')}
            className="mb-4 -ml-2"
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Daily
          </Button>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/10 border-2 border-purple-500/20 mb-4 shadow-lg">
              <CheckCircle className="w-8 h-8 text-purple-600" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Instant Application</h1>
            <p className="text-muted-foreground text-sm">
              Get one simple action to live out any verse today
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-sm mx-auto px-4 py-6 space-y-4">
        {/* Input Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-600" />
              Enter a Bible Verse
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Reference (optional)
              </label>
              <Input
                placeholder="e.g., Philippians 4:6"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                data-testid="input-reference"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Verse Text
              </label>
              <Textarea
                placeholder='e.g., "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God."'
                value={verse}
                onChange={(e) => setVerse(e.target.value)}
                rows={5}
                className="resize-none"
                data-testid="input-verse"
              />
            </div>

            <Button
              onClick={handleGetApplication}
              disabled={isLoading || !verse.trim()}
              className="w-full"
              data-testid="button-get-application"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Action...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Get Action Step
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Result Card */}
        {application && (
          <Card className="border-purple-200 bg-purple-50/50 dark:bg-purple-950/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-purple-700 dark:text-purple-400">
                <Target className="w-5 h-5" />
                Try This Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed text-foreground font-medium" data-testid="text-application">
                {application}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Info Card */}
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-sm mb-2">How it works:</h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-purple-600">•</span>
                <span>Creates one specific, actionable step for today</span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-600">•</span>
                <span>Practical and doable within 24 hours</span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-600">•</span>
                <span>Moves Scripture from reading to doing</span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-600">•</span>
                <span>Helps you live out what you read</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
