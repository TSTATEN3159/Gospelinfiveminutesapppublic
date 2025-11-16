import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Copy, Book, BookOpen, Sparkles, ScrollText, Volume2, VolumeX, Mic, MicOff, Image as ImageIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { toggleSpeech, getIsSpeaking } from "@/utils/speechEngine";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useTranslations } from "@/lib/translations";
import { fetchVerseText } from "@/services/bibleService";
import bibleStudyImage from '@assets/stock_images/two_people_reading_b_2fa31c4a.jpg';
import { appStore } from "@/lib/appStore";
import ScriptureImageGenerator from "./ScriptureImageGenerator";
import ScriptureSelector from "./ScriptureSelector";
import ScriptureCard from "./ScriptureCard";
import { getVersion, setVersion } from "@/store/versionPrefs";
import { getNextReference, getPrevReference, getBookIndexByName, formatReference } from "@/utils/scriptureUtils";
import bibleStructure from "@/data/bibleStructure.json";

interface SearchResult {
  text: string;
  reference: string;
  version: string;
}

const VERSIONS = ["KJV", "WEB", "BBE", "ASV"];

// todo: remove mock functionality - replace with real Bible API
const mockSearchResults: Record<string, SearchResult> = {
  "John 3:16": {
    text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    reference: "John 3:16",
    version: "NIV"
  },
  "Psalm 23:1": {
    text: "The Lord is my shepherd, I lack nothing.",
    reference: "Psalm 23:1", 
    version: "NIV"
  },
  "Romans 8:28": {
    text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
    reference: "Romans 8:28",
    version: "NIV"
  }
};

interface BibleSearchSectionProps {
  backgroundImage?: string;
  initialSearchQuery?: string;
  onSearchUsed?: () => void;
  language?: string;
}

// Language code mapping for speech recognition
const SPEECH_LANG_MAP: Record<string, string> = {
  'en': 'en-US',
  'es': 'es-ES',
  'fr': 'fr-FR',
  'pt': 'pt-PT',
  'zh': 'zh-CN',
  'ar': 'ar-SA',
  'hi': 'hi-IN'
};

export default function BibleSearchSection({ backgroundImage, initialSearchQuery, onSearchUsed, language = "en" }: BibleSearchSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVersion, setSelectedVersion] = useState(getVersion());
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [compareVersion, setCompareVersion] = useState<string | null>(null);
  const [compareResult, setCompareResult] = useState<SearchResult | null>(null);
  const [sideBySide, setSideBySide] = useState(false);
  const [currentReference, setCurrentReference] = useState("");
  const [currentBookIndex, setCurrentBookIndex] = useState(0);
  const [currentChapter, setCurrentChapter] = useState(1);
  const [currentVerse, setCurrentVerse] = useState(1);
  const [currentMode, setCurrentMode] = useState<"verse" | "range" | "chapter">("verse");
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [showVoicePermissionDialog, setShowVoicePermissionDialog] = useState(false);
  const [isImageGeneratorOpen, setIsImageGeneratorOpen] = useState(false);
  const [highlightedWordIndex, setHighlightedWordIndex] = useState<number | null>(null);
  const { toast } = useToast();
  const t = useTranslations(language);
  const { supported: ttsSupported, isSpeaking, speak, cancel, isInitialized: ttsInitialized } = useTextToSpeech();
  const speechLang = SPEECH_LANG_MAP[language] || 'en-US';
  const { 
    initialized: speechInitialized,
    supported: speechSupported, 
    listening, 
    transcript, 
    error: speechError,
    startListening, 
    stopListening 
  } = useSpeechRecognition({ lang: speechLang });
  const ranInitial = useRef<string | null>(null);
  const hasShownTTSWarning = useRef(false);
  const voicePermissionGranted = useRef(false);

  // Show toast once if TTS is not supported
  useEffect(() => {
    if (ttsInitialized && !ttsSupported && !hasShownTTSWarning.current) {
      hasShownTTSWarning.current = true;
      toast({
        title: "Text-to-Speech Unavailable",
        description: t.ttsNotSupported,
        variant: "destructive"
      });
    }
  }, [ttsInitialized, ttsSupported, t.ttsNotSupported, toast]);

  // Handle speech recognition transcript - auto-search when voice input received
  useEffect(() => {
    if (transcript && transcript.trim()) {
      setSearchQuery(transcript);
      // Auto-trigger search for seamless voice experience
      handleSearch(transcript.trim());
    }
  }, [transcript]);

  // Handle speech recognition errors
  useEffect(() => {
    if (speechError) {
      toast({
        title: "Voice Search Error",
        description: speechError,
        variant: "destructive"
      });
    }
  }, [speechError, toast]);

  // Show toast if speech recognition is not supported
  useEffect(() => {
    if (speechInitialized && !speechSupported) {
      toast({
        title: "Voice Search Unavailable",
        description: t.voiceSearchNotSupported,
        variant: "default"
      });
    }
  }, [speechInitialized, speechSupported, t.voiceSearchNotSupported, toast]);

  // Listen for Bible version changes from Settings
  useEffect(() => {
    const handleStorageChange = () => {
      const prefs = appStore.get('gospelAppPreferences');
      if (prefs?.bibleVersion && prefs.bibleVersion !== selectedVersion) {
        setSelectedVersion(prefs.bibleVersion);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    // Also check on component mount/updates
    const interval = setInterval(handleStorageChange, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [selectedVersion]);

  // Handle initial search query from navigation
  useEffect(() => {
    if (initialSearchQuery && initialSearchQuery.trim() && ranInitial.current !== initialSearchQuery) {
      setSearchQuery(initialSearchQuery);
      // Auto-search the initial query immediately
      handleSearch(initialSearchQuery);
      ranInitial.current = initialSearchQuery;
      onSearchUsed?.(); // Clear the search query from parent
    }
  }, [initialSearchQuery]);

  const parseReference = (ref: string) => {
    // Parse reference like "Genesis 1:1" or "John 3:16-18" or "John 3"
    const match = ref.match(/^(.+?)\s+(\d+)(?::(\d+)(?:-(\d+))?)?$/);
    if (match) {
      const bookName = match[1];
      const chapter = parseInt(match[2]);
      const verse = match[3] ? parseInt(match[3]) : 1;
      const endVerse = match[4] ? parseInt(match[4]) : null;
      
      const bookIndex = getBookIndexByName(bookName);
      const mode = endVerse ? "range" : (!match[3] ? "chapter" : "verse");
      
      setCurrentBookIndex(bookIndex);
      setCurrentChapter(chapter);
      setCurrentVerse(verse);
      setCurrentMode(mode);
    }
  };

  const changeVersion = (v: string) => {
    setSelectedVersion(v);
    setVersion(v);
    
    // Auto re-search when switching versions if we have a current reference
    if (currentReference) {
      handleSearch(currentReference, v);
    }
  };

  const handleNext = () => {
    const bookName = Object.keys(bibleStructure)[currentBookIndex];
    const bookData = bibleStructure[bookName as keyof typeof bibleStructure];
    const versesInChapter = bookData?.chapters[currentChapter - 1] || 1;
    
    const next = getNextReference(currentBookIndex, currentChapter, currentVerse, currentMode, versesInChapter, 3);
    if (next) {
      const ref = formatReference(next.bookIndex, next.chapter, next.verse, currentMode, 3);
      handleSearch(ref);
    }
  };

  const handlePrev = () => {
    const prev = getPrevReference(currentBookIndex, currentChapter, currentVerse, currentMode, 3);
    if (prev) {
      const ref = formatReference(prev.bookIndex, prev.chapter, prev.verse, currentMode, 3);
      handleSearch(ref);
    }
  };

  const handleSearch = async (q?: string, versionOverride?: string) => {
    const query = (q ?? searchQuery).trim();
    if (!query) return;

    setIsLoading(true);
    setHasSearched(true);
    setCurrentReference(query);
    
    // Parse the reference to track navigation state
    parseReference(query);

    try {
      // Fetch primary version
      const primaryVersion = versionOverride || selectedVersion;
      const result = await fetchVerseText(query, primaryVersion);

      setSearchResult({
        text: result.text,
        reference: result.reference,
        version: result.version
      });

      // Fetch compare version if enabled
      if (compareVersion) {
        try {
          const compareResult = await fetchVerseText(query, compareVersion);
          setCompareResult({
            text: compareResult.text,
            reference: compareResult.reference,
            version: compareResult.version
          });
        } catch (error) {
          console.error('Compare version error:', error);
          setCompareResult(null);
        }
      }

    } catch (error: any) {
      console.error('Bible search error:', error);
      
      // The service already provides friendly error messages
      toast({
        title: "Search Error",
        description: error.message || "Unable to retrieve Bible text. Please try again.",
        variant: "destructive"
      });
      
      // Show a helpful fallback message in the UI
      setSearchResult({
        text: `Sorry, I'm having trouble retrieving "${query}" right now. Please try again in a moment, or try a different Bible reference like "John 3:16" or "Psalm 23".`,
        reference: query,
        version: versionOverride || selectedVersion
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyVerse = async () => {
    if (!searchResult) return;
    try {
      await navigator.clipboard.writeText(`"${searchResult.text}" - ${searchResult.reference} (${searchResult.version})`);
      toast({
        title: "Verse Copied!",
        description: "The verse has been copied to your clipboard.",
      });
    } catch (err) {
      console.log("Copy failed:", err);
    }
  };

  const handleTTSClick = () => {
    if (!searchResult) return;
    
    if (isSpeaking) {
      cancel();
    } else {
      const textToSpeak = `${searchResult.text}. ${searchResult.reference}`;
      speak(textToSpeak, language);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleVoiceSearchClick = () => {
    if (listening) {
      stopListening();
    } else {
      // Show permission dialog on first use
      if (!voicePermissionGranted.current) {
        setShowVoicePermissionDialog(true);
      } else {
        startListening();
      }
    }
  };

  const handleVoicePermissionAccept = () => {
    voicePermissionGranted.current = true;
    setShowVoicePermissionDialog(false);
    startListening();
  };

  const handleVoicePermissionDecline = () => {
    setShowVoicePermissionDialog(false);
    toast({
      title: "Voice search declined",
      description: "You can continue using text search to find Bible verses.",
      duration: 3000,
    });
  };

  return (
    <>
    <Card className="relative overflow-hidden min-h-[400px] shadow-lg border-2" data-testid="card-bibleSearch">
      {backgroundImage && (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-green-700/60 via-green-500/20 to-green-900/80" />
        </>
      )}
      
      <CardHeader className={cn("relative z-10 border-b", backgroundImage ? "bg-gradient-to-r from-green-500/10 to-transparent" : "bg-green-700")}>
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 border-2 border-green-200">
            <AvatarFallback className="bg-green-100 text-green-600">
              <ScrollText className="w-6 h-6" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className={cn("flex items-center gap-2 text-xl", backgroundImage ? "text-white" : "text-white")}>
              <Search className="w-5 h-5" />
              Scripture Finder
            </CardTitle>
            <p className={cn("text-sm", backgroundImage ? "text-white/90" : "text-green-100")}>
              Discover God's Word instantly by reference
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative z-10 space-y-6 p-6">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-sm space-y-4">
          {/* Version Tabs */}
          <div>
            <label className="text-sm font-medium mb-2 block text-gray-900">
              Bible Version
            </label>
            <div className="flex gap-2 overflow-x-auto pb-2" data-testid="version-tabs">
              {VERSIONS.map(v => (
                <button
                  key={v}
                  onClick={() => changeVersion(v)}
                  className={`px-3 py-1 rounded-full font-semibold text-sm border transition-all ${
                    selectedVersion === v
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-400 hover:border-blue-400"
                  }`}
                  data-testid={`button-version-${v.toLowerCase()}`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Compare Mode Toggle */}
          <div className="flex justify-end">
            <label className="flex gap-2 text-xs items-center cursor-pointer hover:text-blue-600 transition-colors" data-testid="label-compare-toggle">
              <input
                type="checkbox"
                checked={!!compareVersion}
                onChange={() => {
                  const newCompareVersion = compareVersion ? null : "WEB";
                  setCompareVersion(newCompareVersion);
                  // If enabling compare and we have results, fetch comparison
                  if (newCompareVersion && currentReference) {
                    handleSearch(currentReference);
                  }
                }}
                className="w-4 h-4 rounded"
                data-testid="checkbox-compare-version"
              />
              <span>Compare Version</span>
            </label>
          </div>

          <div className="flex gap-2">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter verse reference (e.g., John 3:16)"
              className="flex-1"
              data-testid="input-search"
            />
            {speechSupported && (
              <Button
                variant="outline"
                size="icon"
                onClick={handleVoiceSearchClick}
                disabled={isLoading}
                className={cn(
                  listening && "bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
                )}
                data-testid="button-voice-search"
                aria-label={listening ? t.stopVoiceSearch : t.startVoiceSearch}
              >
                {listening ? (
                  <MicOff className="w-4 h-4" />
                ) : (
                  <Mic className="w-4 h-4" />
                )}
              </Button>
            )}
            <Button 
              onClick={() => handleSearch()} 
              disabled={!searchQuery.trim() || isLoading}
              className="bg-green-600 text-white"
              data-testid="button-search"
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
          {listening && (
            <p className="text-sm text-green-700 font-medium animate-pulse flex items-center gap-2">
              <Mic className="w-4 h-4" />
              {t.listening}
            </p>
          )}
          
          <div className="pt-4 border-t">
            <p className="text-sm font-medium mb-3 text-gray-700">Or select a verse:</p>
            <ScriptureSelector onReferenceSelected={(ref) => handleSearch(ref)} />
          </div>
        </div>

        {isLoading && (
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 text-center">
            <div className="relative mx-auto w-16 h-16 mb-4">
              <div className="absolute inset-0 rounded-full border-4 border-green-100"></div>
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-green-500 animate-spin"></div>
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-green-600 animate-pulse" />
              </div>
            </div>
            <p className="text-gray-800 font-medium">Searching Scripture...</p>
            <p className="text-xs text-gray-600 mt-1">Finding God's Word for you</p>
          </div>
        )}

        {searchResult && !isLoading && (
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-sm space-y-4" data-testid="search-result">
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-500">Tap verse to listen</p>
              
              {/* View Mode Toggle (Only show if comparing) */}
              {compareVersion && compareResult && (
                <div className="flex gap-2 text-xs">
                  <button 
                    onClick={() => setSideBySide(false)} 
                    className={`px-2 py-1 rounded ${!sideBySide ? "font-bold underline text-blue-600" : "text-gray-600 hover:text-blue-600"}`}
                    data-testid="button-view-vertical"
                  >
                    Vertical
                  </button>
                  <button 
                    onClick={() => setSideBySide(true)} 
                    className={`px-2 py-1 rounded ${sideBySide ? "font-bold underline text-blue-600" : "text-gray-600 hover:text-blue-600"}`}
                    data-testid="button-view-sidebyside"
                  >
                    Side-by-Side
                  </button>
                </div>
              )}
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex justify-between items-center py-2 border-y border-gray-200">
              <Button
                onClick={handlePrev}
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                data-testid="button-prev-scripture"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              
              <span className="text-sm font-semibold text-gray-600">
                {searchResult.reference}
              </span>
              
              <Button
                onClick={handleNext}
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                data-testid="button-next-scripture"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Scripture Display */}
            {!sideBySide && (
              <div className="space-y-4" data-testid="display-vertical">
                <ScriptureCard 
                  text={searchResult.text} 
                  version={searchResult.version} 
                  reference={searchResult.reference}
                />
                {compareVersion && compareResult && (
                  <ScriptureCard 
                    text={compareResult.text} 
                    version={compareResult.version}
                    reference={compareResult.reference}
                  />
                )}
              </div>
            )}
            
            {sideBySide && compareVersion && compareResult && (
              <div className="grid grid-cols-2 gap-4" data-testid="display-sidebyside">
                <ScriptureCard 
                  text={searchResult.text} 
                  version={searchResult.version}
                  reference={searchResult.reference}
                />
                <ScriptureCard 
                  text={compareResult.text} 
                  version={compareResult.version}
                  reference={compareResult.reference}
                />
              </div>
            )}

            <div className="flex justify-center gap-2 flex-wrap">
              <Button 
                onClick={copyVerse}
                className="bg-green-600 text-white"
                data-testid="button-copyVerse"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Verse
              </Button>
              
              <Button
                onClick={() => setIsImageGeneratorOpen(true)}
                variant="outline"
                data-testid="button-create-image-search"
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                Create Image
              </Button>
              
              {ttsSupported && (
                <Button
                  onClick={handleTTSClick}
                  variant="outline"
                  disabled={!searchResult || isLoading}
                  data-testid="button-tts-search-verse"
                  aria-label={isSpeaking ? t.stopListening : t.listenToVerse}
                >
                  {isSpeaking ? (
                    <>
                      <VolumeX className="w-4 h-4 mr-2 text-blue-600" />
                      {t.stopListening}
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 mr-2" />
                      {t.listenToVerse}
                    </>
                  )}
                </Button>
              )}
            </div>
            
            {/* Scripture Image Generator */}
            {searchResult && (
              <ScriptureImageGenerator
                open={isImageGeneratorOpen}
                onOpenChange={setIsImageGeneratorOpen}
                initialVerse={searchResult.text}
                initialReference={searchResult.reference}
              />
            )}
          </div>
        )}

        {hasSearched && !searchResult && !isLoading && (
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 text-center">
            <div className="relative mx-auto w-16 h-16 mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Book className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">No Results Found</h3>
            <p className="text-gray-600 text-sm leading-relaxed max-w-md mx-auto">
              Please check your verse reference and try again.<br />
              <span className="text-green-600 font-medium">Try: John 3:16, Psalm 23:1, or Romans 8:28</span>
            </p>
          </div>
        )}
        
        {/* Enhanced Scripture Image */}
        {!isLoading && (
          <div className="mt-8">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src={bibleStudyImage}
                alt="Two people studying the Bible together"
                className="w-full h-40 object-cover transition-transform duration-700 hover:scale-105"
                style={{ objectPosition: 'center' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-6 right-6">
                <p className="text-white font-serif text-sm italic opacity-95 text-center font-medium">
                  "Your word is a lamp for my feet, a light on my path" - Psalm 119:105
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>

    <AlertDialog open={showVoicePermissionDialog} onOpenChange={setShowVoicePermissionDialog}>
      <AlertDialogContent data-testid="dialog-voice-permission">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Mic className="w-5 h-5 text-green-600" />
            Microphone Permission
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-3">
            <p>
              Voice search lets you speak Bible verses instead of typing. For example, say "John 3:16" and we'll search for it.
            </p>
            <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg space-y-2 text-sm">
              <p className="font-medium text-blue-900 dark:text-blue-100">Your Privacy:</p>
              <ul className="list-disc list-inside space-y-1 text-blue-800 dark:text-blue-200">
                <li>Your voice is processed locally by your device</li>
                <li>No audio is sent to our servers</li>
                <li>We don't record or store your voice</li>
                <li>You can revoke permission anytime in your browser settings</li>
              </ul>
            </div>
            <p className="text-sm text-muted-foreground">
              Your browser will ask for microphone permission next. If your device or browser doesn't support speech recognition, you can keep using text search.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel 
            onClick={handleVoicePermissionDecline}
            data-testid="button-voice-permission-cancel"
          >
            Keep Using Text Search
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleVoicePermissionAccept}
            className="bg-green-600 hover:bg-green-700"
            data-testid="button-voice-permission-accept"
          >
            Allow & Start Listening
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  );
}