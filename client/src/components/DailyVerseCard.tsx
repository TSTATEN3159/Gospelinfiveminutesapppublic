import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Copy, Share2, Book, Lightbulb, Heart, Bookmark, BookmarkCheck, StickyNote, Volume2, VolumeX, Image as ImageIcon, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useTranslations } from "@/lib/translations";
import appStore from "@/lib/appStore";
import { toggleSpeech, getIsSpeaking } from "@/utils/speechEngine";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import ScriptureImageGenerator from "./ScriptureImageGenerator";

interface Verse {
  text: string;
  reference: string;
  chapter: string;
  book: string;
  meaning?: string;
  application?: string;
}

interface DailyVerseCardProps {
  verse: Verse;
  backgroundImage?: string;
  onNavigate?: (page: string, searchQuery?: string) => void;
  language?: string;
}

export default function DailyVerseCard({ verse, backgroundImage, onNavigate, language = "en" }: DailyVerseCardProps) {
  const { toast } = useToast();
  const t = useTranslations(language);
  const { supported: ttsSupported, isSpeaking, speak, cancel } = useTextToSpeech();
  const [isSharing, setIsSharing] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);
  const [hasExistingNote, setHasExistingNote] = useState(false);
  const [isImageGeneratorOpen, setIsImageGeneratorOpen] = useState(false);
  const [highlightedWordIndex, setHighlightedWordIndex] = useState<number | null>(null);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  useEffect(() => {
    const bookmarks = appStore.getBookmarks();
    setIsBookmarked(bookmarks.includes(verse.reference));
    
    // Check if note exists for this verse
    const notes = appStore.getNotes();
    const existingNote = notes.find((note: any) => note.ref === verse.reference);
    setHasExistingNote(!!existingNote);
  }, [verse.reference]);

  // Load existing note when dialog opens
  useEffect(() => {
    if (isNoteDialogOpen) {
      const notes = appStore.getNotes();
      const existingNote = notes.find((note: any) => note.ref === verse.reference);
      if (existingNote) {
        setNoteText(existingNote.text);
      } else {
        setNoteText("");
      }
    }
  }, [isNoteDialogOpen, verse.reference]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`"${verse.text}" - ${verse.reference}`);
      toast({
        title: "Verse Copied!",
        description: "The verse has been copied to your clipboard.",
      });
    } catch (err) {
      console.log("Copy verse failed:", err);
      toast({
        title: "Copy Failed",
        description: "Please try copying the verse manually.",
        variant: "destructive",
      });
    }
  };

  const shareVerse = async () => {
    setIsSharing(true);
    const shareData = {
      title: "Daily Bible Verse",
      text: `"${verse.text}" - ${verse.reference}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback to copying
        await copyToClipboard();
      }
    } catch (err) {
      console.log("Share verse failed:", err);
    } finally {
      setIsSharing(false);
    }
  };

  const goToChapter = () => {
    console.log(`Navigate to ${verse.book} ${verse.chapter}`);
    
    if (onNavigate) {
      // Navigate to search page with the chapter reference
      const chapterReference = `${verse.book} ${verse.chapter}`;
      onNavigate("search", chapterReference);
      toast({
        title: "Opening Chapter",
        description: `Loading ${verse.book} ${verse.chapter}...`,
      });
    } else {
      toast({
        title: "Navigation not available",
        description: "Chapter reading functionality is being set up.",
        variant: "destructive",
      });
    }
  };

  const toggleBookmark = () => {
    if (isBookmarked) {
      appStore.removeBookmark(verse.reference);
      setIsBookmarked(false);
      toast({
        title: "Bookmark Removed",
        description: "Verse removed from bookmarks.",
      });
    } else {
      appStore.addBookmark(verse.reference);
      setIsBookmarked(true);
      toast({
        title: "Verse Bookmarked!",
        description: "You can find this verse in your saved bookmarks.",
      });
    }
  };

  const saveNote = () => {
    if (!noteText.trim()) {
      toast({
        title: "Note is empty",
        description: "Please write a note before saving.",
        variant: "destructive",
      });
      return;
    }
    
    appStore.addNote(verse.reference, noteText.trim());
    setHasExistingNote(true); // Update button state immediately
    setNoteText("");
    setIsNoteDialogOpen(false);
    toast({
      title: "Note Saved!",
      description: "Your note has been saved with this verse.",
    });
  };

  const handleTTSClick = () => {
    if (!verse) return;
    
    if (isSpeaking) {
      cancel();
    } else {
      const textToSpeak = `${verse.text}. ${verse.reference}`;
      speak(textToSpeak, language);
    }
  };

  // todo: Replace with API call to get meaning and application
  const getMeaning = () => {
    return verse.meaning || "This verse teaches us about trusting God completely rather than relying on our own understanding. It emphasizes surrendering our will to God's wisdom and allowing Him to guide our paths. When we acknowledge God in all our decisions, He promises to direct our steps toward righteousness.";
  };

  const getApplication = () => {
    return verse.application || "Today, bring every decision—big or small—to God in prayer. Before acting on your own understanding, pause and ask for His wisdom. Trust that His guidance, even when it doesn't align with your plans, leads to the best outcome for your life.";
  };

  const handleEmailSignup = async () => {
    if (!emailInput.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubscribing(true);
    
    try {
      const response = await fetch("/api/subscribe-daily-reminder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailInput.trim(),
          name: nameInput.trim() || undefined,
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast({
          title: "Welcome!",
          description: data.message || "You're now signed up for daily verse reminders!",
        });
        setEmailInput("");
        setNameInput("");
        setIsEmailDialogOpen(false);
      } else {
        toast({
          title: "Signup Failed",
          description: data.error || "Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Email signup error:", error);
      toast({
        title: "Connection Error",
        description: "Unable to process your signup. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <Card className="relative overflow-hidden shadow-lg" data-testid="card-dailyVerse">
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-80"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30" />
      
      <CardContent className="relative z-10 p-6 text-white space-y-6">
        {/* Verse Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-2xl font-bold">Daily Verse</h2>
            <Volume2 className="w-4 h-4 text-white/70" />
          </div>
          <p className="text-xs text-white/70">Tap to listen</p>
          
          <blockquote 
            className="text-lg leading-relaxed font-serif italic cursor-pointer hover:bg-white/10 transition-all rounded-lg p-3 select-none"
            onClick={() => {
              toggleSpeech(verse.text, (wordIndex: number) => {
                setHighlightedWordIndex(wordIndex);
              });
              // Clear highlighting when speech ends
              if (getIsSpeaking()) {
                setHighlightedWordIndex(null);
              }
            }}
            data-testid="text-verse-tap-to-read"
          >
            "
            {highlightedWordIndex !== null ? (
              verse.text.split(" ").map((word, i) => (
                <span 
                  key={i} 
                  className={`${
                    i === highlightedWordIndex 
                      ? "bg-yellow-300 text-gray-900 px-1 rounded transition-all" 
                      : ""
                  }`}
                >
                  {word}
                  {" "}
                </span>
              ))
            ) : (
              verse.text
            )}
            "
          </blockquote>
          
          <cite className="text-sm font-semibold not-italic">
            - {verse.reference}
          </cite>
        </div>

        <Separator className="bg-white/30" />

        {/* Meaning Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 justify-center">
            <Lightbulb className="w-5 h-5 text-yellow-300" />
            <h3 className="font-bold text-lg">Meaning</h3>
          </div>
          <p className="text-sm leading-relaxed text-white/90 text-center">
            {getMeaning()}
          </p>
        </div>

        <Separator className="bg-white/30" />

        {/* Application Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 justify-center">
            <Heart className="w-5 h-5 text-red-300" />
            <h3 className="font-bold text-lg">Application</h3>
          </div>
          <p className="text-sm leading-relaxed text-white/90 text-center">
            {getApplication()}
          </p>
        </div>

        <Separator className="bg-white/30" />

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleBookmark}
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            data-testid="button-bookmark"
          >
            {isBookmarked ? <BookmarkCheck className="w-4 h-4 mr-2" /> : <Bookmark className="w-4 h-4 mr-2" />}
            {isBookmarked ? "Saved" : "Bookmark"}
          </Button>

          <Dialog open={isNoteDialogOpen} onOpenChange={setIsNoteDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                data-testid="button-add-note"
              >
                <StickyNote className="w-4 h-4 mr-2" />
                {hasExistingNote ? "Edit Note" : "Add Note"}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{hasExistingNote ? "Edit Note" : "Add Note"}</DialogTitle>
                <DialogDescription>
                  Write a personal note or reflection for {verse.reference}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Textarea
                  placeholder="Write your thoughts, reflections, or prayers..."
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  className="min-h-[120px]"
                  data-testid="textarea-note"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsNoteDialogOpen(false)} data-testid="button-cancel-note">
                  Cancel
                </Button>
                <Button onClick={saveNote} data-testid="button-save-note">
                  Save Note
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            data-testid="button-copy"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </Button>
          
          {ttsSupported && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleTTSClick}
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              data-testid="button-tts-verse"
              aria-label={isSpeaking ? t.stopListening : t.listenToVerse}
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-4 h-4 mr-2" />
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
          
          <Button
            variant="outline"
            size="sm"
            onClick={shareVerse}
            disabled={isSharing}
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            data-testid="button-share"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsImageGeneratorOpen(true)}
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            data-testid="button-create-image-daily"
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Create Image
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={goToChapter}
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            data-testid="button-chapter"
          >
            <Book className="w-4 h-4 mr-2" />
            Read Chapter
          </Button>
          
          <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                data-testid="button-daily-reminder-signup"
              >
                <Mail className="w-4 h-4 mr-2" />
                Daily Reminders
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Sign Up for Daily Reminders</DialogTitle>
                <DialogDescription>
                  Receive the Daily Verse with meaning and application in your inbox every morning at 7 AM.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="reminder-name" className="text-sm font-medium">
                    Name (Optional)
                  </label>
                  <input
                    id="reminder-name"
                    type="text"
                    placeholder="Your name"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    data-testid="input-reminder-name"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="reminder-email" className="text-sm font-medium">
                    Email Address *
                  </label>
                  <input
                    id="reminder-email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    data-testid="input-reminder-email"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setIsEmailDialogOpen(false)}
                  data-testid="button-cancel-reminder"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleEmailSignup}
                  disabled={isSubscribing}
                  data-testid="button-subscribe-reminder"
                >
                  {isSubscribing ? "Signing Up..." : "Sign Up"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
      
      {/* Scripture Image Generator */}
      <ScriptureImageGenerator
        open={isImageGeneratorOpen}
        onOpenChange={setIsImageGeneratorOpen}
        initialVerse={verse.text}
        initialReference={verse.reference}
      />
    </Card>
  );
}