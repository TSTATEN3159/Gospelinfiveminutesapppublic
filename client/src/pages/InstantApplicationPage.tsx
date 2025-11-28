import { useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Target, Loader2, BookOpen, Sparkles, Home, Lightbulb, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScriptureReferencePicker, buildReferenceString } from "@/components/ScriptureReferencePicker";
import { FeatureBoundary } from "@/components/FeatureBoundary";
import { InstantApplicationProvider, useInstantApplication } from "@/context/InstantApplicationProvider";

interface InstantApplicationPageProps {
  onNavigate: (page: string) => void;
}

// Content component without background (to be wrapped by provider)
function InstantApplicationContent({ onNavigate }: InstantApplicationPageProps) {
  const { toast } = useToast();
  const {
    selection,
    verseText,
    application,
    loadingVerse,
    generatingApplication,
    verseError,
    applicationError,
    setSelection,
    loadVerse,
    generateApplication,
    clearErrors,
  } = useInstantApplication();

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
    if (applicationError) {
      toast({
        title: "Error Generating Application",
        description: applicationError,
        variant: "destructive",
      });
      clearErrors();
    }
  }, [applicationError, toast, clearErrors]);

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
        description: "Ready to create your action step.",
      });
    }
  };

  const handleGetApplication = async () => {
    if (!verseText.trim() || !selection) {
      toast({
        title: "Verse Text Required",
        description: "Please fetch a verse first to get an application.",
        variant: "destructive",
      });
      return;
    }

    const reference = buildReferenceString(selection);
    const success = await generateApplication(verseText, reference);

    if (success) {
      toast({
        title: "Application Generated",
        description: "Your action step is ready!",
      });
    }
  };

  return (
    <>
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 px-4 py-4 border-b border-purple-200/30 dark:border-purple-800/30 ios-safe-top shadow-sm">
        <div className="max-w-sm mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('daily')}
            className="hover-elevate active-elevate-2"
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('home')}
            className="hover-elevate active-elevate-2"
            data-testid="button-home"
          >
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
        </div>
      </div>

      {/* Title Section */}
      <div className="relative px-4 py-6">
        <div className="max-w-sm mx-auto">
          
          <div className="text-center">
            {/* Glass Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 mb-4 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
              <Target className="w-10 h-10 text-white relative z-10 drop-shadow-lg" />
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent"></div>
            </div>
            
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-2 drop-shadow-sm">
              Instant Application
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-400 font-medium">
              Transform Scripture into Action
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative max-w-sm mx-auto px-4 py-8 space-y-6">
        {/* Verse Input - Liquid Glass Card */}
        <div 
          className="relative rounded-3xl overflow-hidden backdrop-blur-2xl bg-white/40 dark:bg-gray-900/40 border border-white/50 dark:border-gray-700/50 shadow-2xl transition-all duration-500 hover:shadow-purple-500/20 hover:scale-[1.02]"
          style={{
            boxShadow: '0 8px 32px 0 rgba(147, 51, 234, 0.1), inset 0 1px 0 0 rgba(255, 255, 255, 0.5)'
          }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent opacity-50"></div>
          
          <CardHeader className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
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
              className="w-full h-14 text-lg rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 font-semibold"
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
            className="relative rounded-3xl overflow-hidden backdrop-blur-2xl bg-gradient-to-br from-purple-500/10 via-white/40 to-pink-500/10 dark:from-purple-900/20 dark:via-gray-900/40 dark:to-pink-900/20 border border-purple-200/50 dark:border-purple-700/50 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700"
            style={{
              boxShadow: '0 8px 32px 0 rgba(147, 51, 234, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.6)'
            }}
          >
            {/* Glass reflection */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/20 to-transparent opacity-60"></div>
            
            <CardHeader className="relative z-10 pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-purple-700 to-pink-700 bg-clip-text text-transparent">
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
                onClick={handleGetApplication}
                disabled={generatingApplication}
                className="w-full h-14 text-lg rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 font-semibold"
                data-testid="button-get-application"
              >
                {generatingApplication ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                    Creating Action...
                  </>
                ) : (
                  <>
                    <Target className="w-5 h-5 mr-3" />
                    Get Action Step
                  </>
                )}
              </Button>
            </CardContent>
          </div>
        )}

        {/* Application Result - Delightful Glass Card */}
        {application && (
          <div 
            className="relative rounded-3xl overflow-hidden backdrop-blur-2xl bg-gradient-to-br from-green-500/10 via-white/50 to-blue-500/10 dark:from-green-900/20 dark:via-gray-900/50 dark:to-blue-900/20 border border-green-200/50 dark:border-green-700/50 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700"
            style={{
              boxShadow: '0 8px 32px 0 rgba(34, 197, 94, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.7)'
            }}
          >
            {/* Premium shimmer */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/30 to-transparent opacity-70"></div>
            
            <CardHeader className="relative z-10 pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-green-500 to-blue-500 shadow-lg">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-green-700 to-blue-700 bg-clip-text text-transparent">
                  Try This Today
                </h3>
              </div>
            </CardHeader>
            
            <CardContent className="relative z-10">
              <div className="p-6 rounded-2xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-white/70 dark:border-gray-700/70 shadow-lg">
                <p className="text-lg leading-relaxed text-gray-900 dark:text-gray-50 font-semibold" data-testid="text-application">
                  {application}
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
                <Sparkles className="w-4 h-4 text-purple-600" />
                How it works
              </h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex gap-3 items-start">
                  <span className="text-purple-600 font-bold">1.</span>
                  <span>Enter any Bible verse reference</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-purple-600 font-bold">2.</span>
                  <span>The verse text is fetched and displayed</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-purple-600 font-bold">3.</span>
                  <span>Get one specific action based 100% on God's Word</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-purple-600 font-bold">4.</span>
                  <span>Live it out today!</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Bottom Navigation */}
        <div className="relative rounded-2xl overflow-hidden backdrop-blur-xl bg-white/40 dark:bg-gray-900/40 border border-white/50 dark:border-gray-700/50 p-4 shadow-lg mt-8">
          <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-50"></div>
          <div className="relative z-10">
            <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3 text-center">
              Explore More Features
            </h4>
            <div className="flex flex-col gap-2">
              <Button
                variant="ghost"
                onClick={() => onNavigate('plain-meaning')}
                className="w-full justify-start hover-elevate active-elevate-2 h-12"
                data-testid="nav-plain-meaning"
              >
                <Lightbulb className="w-5 h-5 mr-3 text-blue-600" />
                <span className="text-gray-700 dark:text-gray-300">Plain Meaning</span>
              </Button>
              <Button
                variant="ghost"
                onClick={() => onNavigate('topics')}
                className="w-full justify-start hover-elevate active-elevate-2 h-12"
                data-testid="nav-topics"
              >
                <Search className="w-5 h-5 mr-3 text-emerald-600" />
                <span className="text-gray-700 dark:text-gray-300">Topical Bible Search</span>
              </Button>
              <Button
                variant="ghost"
                onClick={() => onNavigate('daily')}
                className="w-full justify-start hover-elevate active-elevate-2 h-12"
                data-testid="nav-daily"
              >
                <BookOpen className="w-5 h-5 mr-3 text-amber-600" />
                <span className="text-gray-700 dark:text-gray-300">Daily Verse</span>
              </Button>
              <Button
                variant="ghost"
                onClick={() => onNavigate('home')}
                className="w-full justify-start hover-elevate active-elevate-2 h-12"
                data-testid="nav-home"
              >
                <Home className="w-5 h-5 mr-3 text-purple-600" />
                <span className="text-gray-700 dark:text-gray-300">Home</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Wrapper component that owns the background and wraps Provider + Content
// This ensures the boundary controls the ENTIRE page surface including background
function InstantApplicationPageLayout(props: InstantApplicationPageProps) {
  return (
    <div className="min-h-screen pb-20 bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-950">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 -right-20 w-72 h-72 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-20 left-20 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Provider + Content inside the background */}
      <InstantApplicationProvider>
        <InstantApplicationContent {...props} />
      </InstantApplicationProvider>
    </div>
  );
}

// Wrap the entire layout with FeatureBoundary at the highest level
// This ensures the boundary controls the full page surface (background + provider + content)
const InstantApplicationPageWithBoundary = FeatureBoundary.with(
  InstantApplicationPageLayout,
  "Instant Application (AI Action Generator)",
  (props) => () => props.onNavigate('daily')
);

export default InstantApplicationPageWithBoundary;
