import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Lightbulb, ArrowLeft, Sparkles, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PlainMeaningPageProps {
  onNavigate: (page: string) => void;
}

export default function PlainMeaningPage({ onNavigate }: PlainMeaningPageProps) {
  const [verse, setVerse] = useState("");
  const [reference, setReference] = useState("");
  const [plainMeaning, setPlainMeaning] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGetPlainMeaning = async () => {
    if (!verse.trim()) {
      toast({
        title: "Verse Required",
        description: "Please enter a Bible verse to simplify.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setPlainMeaning("");

    try {
      const response = await fetch('/api/verse-plain-meaning', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ verse, reference })
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to get plain meaning');
      }

      setPlainMeaning(data.plainMeaning);
    } catch (error) {
      console.error('Plain Meaning error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to simplify verse. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-20 bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-500/10 via-background to-blue-600/10 px-4 py-8 border-b border-border ios-safe-top">
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
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 border-2 border-blue-500/20 mb-4 shadow-lg">
              <Lightbulb className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Plain Meaning</h1>
            <p className="text-muted-foreground text-sm">
              Transform any verse into simple, everyday language
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
              <Sparkles className="w-5 h-5 text-blue-600" />
              Enter a Bible Verse
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Reference (optional)
              </label>
              <Input
                placeholder="e.g., John 15:5"
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
                placeholder='e.g., "I am the vine; you are the branches. If you remain in me and I in you, you will bear much fruit; apart from me you can do nothing."'
                value={verse}
                onChange={(e) => setVerse(e.target.value)}
                rows={5}
                className="resize-none"
                data-testid="input-verse"
              />
            </div>

            <Button
              onClick={handleGetPlainMeaning}
              disabled={isLoading || !verse.trim()}
              className="w-full"
              data-testid="button-get-plain-meaning"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Simplifying...
                </>
              ) : (
                <>
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Get Plain Meaning
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Result Card */}
        {plainMeaning && (
          <Card className="border-blue-200 bg-blue-50/50 dark:bg-blue-950/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-blue-700 dark:text-blue-400">
                <Lightbulb className="w-5 h-5" />
                Plain Meaning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed text-foreground" data-testid="text-plain-meaning">
                {plainMeaning}
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
                <span className="text-blue-600">•</span>
                <span>Keeps full theological meaning and integrity</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600">•</span>
                <span>Uses parallel verses for additional context</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600">•</span>
                <span>Translates into clear, everyday language</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600">•</span>
                <span>Bridges between Bible text and daily application</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
