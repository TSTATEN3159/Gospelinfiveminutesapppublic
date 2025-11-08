import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, ArrowLeft, Target, Loader2, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InstantApplicationPageProps {
  onNavigate: (page: string) => void;
}

export default function InstantApplicationPage({ onNavigate }: InstantApplicationPageProps) {
  const [reference, setReference] = useState("");
  const [verseText, setVerseText] = useState("");
  const [application, setApplication] = useState("");
  const [isLoadingVerse, setIsLoadingVerse] = useState(false);
  const [isLoadingApplication, setIsLoadingApplication] = useState(false);
  const { toast } = useToast();

  const handleFetchVerse = async () => {
    if (!reference.trim()) {
      toast({
        title: "Reference Required",
        description: "Please enter a Bible verse reference (e.g., John 3:16).",
        variant: "destructive"
      });
      return;
    }

    setIsLoadingVerse(true);
    setVerseText("");
    setApplication("");

    try {
      const response = await fetch(`/api/bible-passage?reference=${encodeURIComponent(reference)}`);
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch verse');
      }

      // Extract just the verse text without the reference header
      const text = data.text.replace(/^.+?\n\n/, '').trim();
      setVerseText(text);
      
      toast({
        title: "Verse Loaded",
        description: "You can now get your application step.",
      });
    } catch (error) {
      console.error('Verse fetch error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch verse. Please check your reference and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoadingVerse(false);
    }
  };

  const handleGetApplication = async () => {
    if (!verseText.trim()) {
      toast({
        title: "Verse Text Required",
        description: "Please fetch a verse first to get an application.",
        variant: "destructive"
      });
      return;
    }

    setIsLoadingApplication(true);
    setApplication("");

    try {
      const response = await fetch('/api/verse-instant-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          verse: verseText, 
          reference 
        })
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
      setIsLoadingApplication(false);
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
              Get one simple action to live out God's Word today
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-sm mx-auto px-4 py-6 space-y-4">
        {/* Verse Input Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-600" />
              Enter Bible Verse Reference
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Verse Reference
              </label>
              <Input
                placeholder="e.g., John 3:16 or Philippians 4:6-7"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !isLoadingVerse) {
                    handleFetchVerse();
                  }
                }}
                data-testid="input-reference"
              />
            </div>

            <Button
              onClick={handleFetchVerse}
              disabled={isLoadingVerse || !reference.trim()}
              className="w-full"
              data-testid="button-fetch-verse"
            >
              {isLoadingVerse ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Fetching Verse...
                </>
              ) : (
                <>
                  <BookOpen className="w-4 h-4 mr-2" />
                  Fetch Verse
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Verse Text Display */}
        {verseText && (
          <Card className="border-purple-200 bg-purple-50/30 dark:bg-purple-950/10">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-purple-700 dark:text-purple-400">
                <BookOpen className="w-5 h-5" />
                {reference}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed text-foreground italic" data-testid="text-verse">
                "{verseText}"
              </p>
              
              <Button
                onClick={handleGetApplication}
                disabled={isLoadingApplication}
                className="w-full mt-4"
                data-testid="button-get-application"
              >
                {isLoadingApplication ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Action...
                  </>
                ) : (
                  <>
                    <Target className="w-4 h-4 mr-2" />
                    Get Action Step
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Application Result Card */}
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
                <span>Enter any Bible verse reference</span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-600">•</span>
                <span>The verse text is fetched and displayed</span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-600">•</span>
                <span>Creates one specific, actionable step based 100% on God's Word</span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-600">•</span>
                <span>Practical and doable within 24 hours</span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-600">•</span>
                <span>Moves Scripture from reading to doing</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
