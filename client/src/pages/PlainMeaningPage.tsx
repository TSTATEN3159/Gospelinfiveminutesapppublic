import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lightbulb, ArrowLeft, Sparkles, Loader2, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useVersePassageMutation, usePlainMeaningMutation } from "@/hooks/useVerseInsights";
import { runSafely } from "@/utils/featureGuard";

interface PlainMeaningPageProps {
  onNavigate: (page: string) => void;
}

export default function PlainMeaningPage({ onNavigate }: PlainMeaningPageProps) {
  const [reference, setReference] = useState("");
  const [verseText, setVerseText] = useState("");
  const [plainMeaning, setPlainMeaning] = useState("");
  const { toast } = useToast();

  const versePassageMutation = useVersePassageMutation();
  const plainMeaningMutation = usePlainMeaningMutation();

  const handleLoadVerse = async () => {
    if (!reference.trim()) {
      toast({
        title: "Reference Required",
        description: "Please enter a Bible verse reference (e.g., John 15:5).",
        variant: "destructive"
      });
      return;
    }

    setVerseText("");
    setPlainMeaning("");

    const result = await runSafely(
      {
        featureName: "Load Verse",
        userMessage: "Sorry, I couldn't load that verse. Please check the reference and try again."
      },
      async () => await versePassageMutation.mutateAsync(reference)
    );

    if (!result) {
      toast({
        title: "Error",
        description: "Sorry, I couldn't load that verse. Please check the reference and try again.",
        variant: "destructive"
      });
      return;
    }

    setVerseText(result.text.trim());
    toast({
      title: "Verse Loaded",
      description: "Ready to simplify into everyday language.",
    });
  };

  const handleGetPlainMeaning = async () => {
    if (!verseText.trim()) {
      toast({
        title: "Verse Text Required",
        description: "Please load a verse first to simplify.",
        variant: "destructive"
      });
      return;
    }

    setPlainMeaning("");

    const result = await runSafely(
      {
        featureName: "Plain Meaning",
        userMessage: "Sorry, I couldn't simplify that verse. Please try again."
      },
      async () => await plainMeaningMutation.mutateAsync({ verse: verseText, reference })
    );

    if (!result) {
      toast({
        title: "Error",
        description: "Sorry, I couldn't simplify that verse. Please try again.",
        variant: "destructive"
      });
      return;
    }

    setPlainMeaning(result.plainMeaning);
  };

  return (
    <div className="min-h-screen pb-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-950 dark:via-blue-950/20 dark:to-gray-950">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-72 h-72 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 -right-20 w-72 h-72 bg-cyan-300 dark:bg-cyan-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-20 left-20 w-72 h-72 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Header */}
      <div className="relative backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 px-4 py-6 border-b border-blue-200/20 dark:border-blue-800/20 ios-safe-top">
        <div className="max-w-sm mx-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('daily')}
            className="mb-6 -ml-2 hover-elevate active-elevate-2"
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <div className="text-center">
            {/* Glass Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-4 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
              <Lightbulb className="w-10 h-10 text-white relative z-10 drop-shadow-lg" />
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent"></div>
            </div>
            
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2 drop-shadow-sm">
              Plain Meaning
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-400 font-medium">
              Scripture in Everyday Language
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative max-w-sm mx-auto px-4 py-8 space-y-6">
        {/* Verse Input - Liquid Glass Card */}
        <div 
          className="relative rounded-3xl overflow-hidden backdrop-blur-2xl bg-white/40 dark:bg-gray-900/40 border border-white/50 dark:border-gray-700/50 shadow-2xl transition-all duration-500 hover:shadow-blue-500/20 hover:scale-[1.02]"
          style={{
            boxShadow: '0 8px 32px 0 rgba(59, 130, 246, 0.1), inset 0 1px 0 0 rgba(255, 255, 255, 0.5)'
          }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent opacity-50"></div>
          
          <CardHeader className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Enter Verse</h2>
            </div>
          </CardHeader>
          
          <CardContent className="relative z-10 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Reference
              </label>
              <Input
                placeholder="John 15:5"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !versePassageMutation.isPending) {
                    handleLoadVerse();
                  }
                }}
                className="h-14 text-lg backdrop-blur-xl bg-white/60 dark:bg-gray-800/60 border-white/50 dark:border-gray-700/50 rounded-2xl shadow-lg focus:shadow-blue-500/30 transition-all duration-300 font-medium"
                data-testid="input-reference"
              />
            </div>

            <Button
              onClick={handleLoadVerse}
              disabled={versePassageMutation.isPending || !reference.trim()}
              className="w-full h-14 text-lg rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 font-semibold"
              data-testid="button-fetch-verse"
            >
              {versePassageMutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                  Loading Verse...
                </>
              ) : (
                <>
                  <BookOpen className="w-5 h-5 mr-3" />
                  Load Verse
                </>
              )}
            </Button>
          </CardContent>
        </div>

        {/* Verse Text Display - Premium Glass Card */}
        {verseText && (
          <div 
            className="relative rounded-3xl overflow-hidden backdrop-blur-2xl bg-gradient-to-br from-blue-500/10 via-white/40 to-cyan-500/10 dark:from-blue-900/20 dark:via-gray-900/40 dark:to-cyan-900/20 border border-blue-200/50 dark:border-blue-700/50 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700"
            style={{
              boxShadow: '0 8px 32px 0 rgba(59, 130, 246, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.6)'
            }}
          >
            {/* Glass reflection */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/20 to-transparent opacity-60"></div>
            
            <CardHeader className="relative z-10 pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">
                  {reference}
                </h3>
              </div>
            </CardHeader>
            
            <CardContent className="relative z-10 space-y-4">
              <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl border border-white/60 dark:border-gray-700/60 shadow-lg">
                <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-100 font-serif italic" data-testid="text-verse">
                  "{verseText}"
                </p>
              </div>
              
              <Button
                onClick={handleGetPlainMeaning}
                disabled={plainMeaningMutation.isPending}
                className="w-full h-14 text-lg rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 hover:from-blue-700 hover:via-cyan-700 hover:to-blue-700 shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 font-semibold"
                data-testid="button-get-plain-meaning"
              >
                {plainMeaningMutation.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                    Simplifying...
                  </>
                ) : (
                  <>
                    <Lightbulb className="w-5 h-5 mr-3" />
                    Simplify to Everyday Language
                  </>
                )}
              </Button>
            </CardContent>
          </div>
        )}

        {/* Plain Meaning Result - Delightful Glass Card */}
        {plainMeaning && (
          <div 
            className="relative rounded-3xl overflow-hidden backdrop-blur-2xl bg-gradient-to-br from-amber-500/10 via-white/50 to-yellow-500/10 dark:from-amber-900/20 dark:via-gray-900/50 dark:to-yellow-900/20 border border-amber-200/50 dark:border-amber-700/50 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700"
            style={{
              boxShadow: '0 8px 32px 0 rgba(251, 191, 36, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.7)'
            }}
          >
            {/* Premium shimmer */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/30 to-transparent opacity-70"></div>
            
            <CardHeader className="relative z-10 pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 shadow-lg">
                  <Lightbulb className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-amber-700 to-yellow-700 bg-clip-text text-transparent">
                  In Everyday Language
                </h3>
              </div>
            </CardHeader>
            
            <CardContent className="relative z-10">
              <div className="p-6 rounded-2xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-white/70 dark:border-gray-700/70 shadow-lg">
                <p className="text-lg leading-relaxed text-gray-900 dark:text-gray-50 font-medium" data-testid="text-plain-meaning">
                  {plainMeaning}
                </p>
              </div>
            </CardContent>
          </div>
        )}

        {/* Info Card - Subtle Glass */}
        {!verseText && (
          <div className="relative rounded-2xl overflow-hidden backdrop-blur-xl bg-white/30 dark:bg-gray-900/30 border border-white/40 dark:border-gray-700/40 p-6 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-50"></div>
            
            <div className="relative z-10">
              <h3 className="font-bold text-sm mb-3 text-gray-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                How it works
              </h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex gap-3 items-start">
                  <span className="text-blue-600 font-bold">1.</span>
                  <span>Enter any Bible verse reference</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-blue-600 font-bold">2.</span>
                  <span>The verse text is loaded and displayed</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-blue-600 font-bold">3.</span>
                  <span>AI transforms it into simple, everyday language</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-blue-600 font-bold">4.</span>
                  <span>Understand God's Word clearly!</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
