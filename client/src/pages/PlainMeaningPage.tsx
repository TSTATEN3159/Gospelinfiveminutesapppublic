/**
 * Plain Meaning Page (Refactored with Feature Sandbox)
 * 
 * This page is now wrapped in:
 * 1. FeatureBoundary - Catches and isolates errors
 * 2. PlainMeaningProvider - Manages feature-specific state
 * 3. Service Layer - Handles all API calls safely
 * 
 * If this feature crashes, it won't take down the whole app!
 */

import { useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, ArrowLeft, Sparkles, Loader2, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScriptureReferencePicker, buildReferenceString } from "@/components/ScriptureReferencePicker";
import { PlainMeaningProvider, usePlainMeaning } from "@/context/PlainMeaningProvider";
import { FeatureBoundary } from "@/components/FeatureBoundary";

interface PlainMeaningPageProps {
  onNavigate: (page: string) => void;
}

// Content component without background (to be wrapped by provider)
function PlainMeaningContent({ onNavigate }: PlainMeaningPageProps) {
  const { toast } = useToast();
  const {
    selection,
    verseText,
    plainMeaning,
    loadingVerse,
    generatingPlainMeaning,
    verseError,
    plainMeaningError,
    setSelection,
    loadVerse,
    generatePlainMeaning,
    clearErrors,
  } = usePlainMeaning();

  // Show toast on errors
  useEffect(() => {
    if (verseError) {
      toast({
        title: "Error Loading Verse",
        description: verseError,
        variant: "destructive",
      });
      clearErrors();
    }
  }, [verseError, toast, clearErrors]);

  useEffect(() => {
    if (plainMeaningError) {
      toast({
        title: "Error Generating Plain Meaning",
        description: plainMeaningError,
        variant: "destructive",
      });
      clearErrors();
    }
  }, [plainMeaningError, toast, clearErrors]);

  const handleLoadVerse = async () => {
    if (!selection) {
      toast({
        title: "Reference Required",
        description: "Please select a Bible verse reference.",
        variant: "destructive",
      });
      return;
    }

    const reference = buildReferenceString(selection);
    const success = await loadVerse(reference);

    if (success) {
      toast({
        title: "Verse Loaded",
        description: "Ready to simplify into everyday language.",
      });
    }
  };

  const handleGetPlainMeaning = async () => {
    if (!verseText.trim() || !selection) {
      toast({
        title: "Verse Text Required",
        description: "Please load a verse first to simplify.",
        variant: "destructive",
      });
      return;
    }

    const reference = buildReferenceString(selection);
    const success = await generatePlainMeaning(verseText, reference);

    if (success) {
      toast({
        title: "Plain Meaning Generated",
        description: "Scripture simplified into everyday language!",
      });
    }
  };

  return (
    <>

      {/* Header - Now relative to parent */}
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
            <ScriptureReferencePicker
              label="Select Scripture Reference"
              value={selection ?? undefined}
              onChange={setSelection}
            />

            <Button
              onClick={handleLoadVerse}
              disabled={loadingVerse || !selection}
              className="w-full h-14 text-lg rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 font-semibold"
              data-testid="button-fetch-verse"
            >
              {loadingVerse ? (
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
                  {selection ? buildReferenceString(selection) : ""}
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
                disabled={generatingPlainMeaning}
                className="w-full h-14 text-lg rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 hover:from-blue-700 hover:via-cyan-700 hover:to-blue-700 shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 font-semibold"
                data-testid="button-get-plain-meaning"
              >
                {generatingPlainMeaning ? (
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
    </>
  );
}

// Wrapper component that owns the background and wraps Provider + Content
// This ensures the boundary controls the ENTIRE page surface including background
function PlainMeaningPageLayout(props: PlainMeaningPageProps) {
  return (
    <div className="min-h-screen pb-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-950 dark:via-blue-950/20 dark:to-gray-950">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-72 h-72 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 -right-20 w-72 h-72 bg-cyan-300 dark:bg-cyan-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-20 left-20 w-72 h-72 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Provider + Content inside the background */}
      <PlainMeaningProvider>
        <PlainMeaningContent {...props} />
      </PlainMeaningProvider>
    </div>
  );
}

// Wrap the entire layout with FeatureBoundary at the highest level
// This ensures the boundary controls the full page surface (background + provider + content)
const PlainMeaningPageWithBoundary = FeatureBoundary.with(
  PlainMeaningPageLayout,
  "Plain Meaning (AI Verse Simplifier)",
  (props) => () => props.onNavigate('daily')
);

export default PlainMeaningPageWithBoundary;
