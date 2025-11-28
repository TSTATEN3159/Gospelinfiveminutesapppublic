import { useState } from "react";
import { Heart, Share2, BookmarkPlus, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { safeShare } from "@/utils/capabilities";
import { MoreTranslationsCard } from "./MoreTranslationsCard";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import mountainPeakImage from '@assets/stock_images/snowy_peak_bright_bl_12e01717.jpg';

interface DailyVerseHeroCardProps {
  onPress?: () => void;
  reference?: string;
  text?: string;
  loading?: boolean;
}

export function DailyVerseHeroCard({ onPress, reference, text, loading }: DailyVerseHeroCardProps) {
  const { toast } = useToast();
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  // Use provided verse data or fallback while loading
  const displayReference = reference || "John 3:16";
  const displayText = text || "For God so loved the world, that he gave his only begotten Son...";

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareText = `"${displayText}"\n\n— ${displayReference}\n\nShared from The Gospel in 5 Minutes`;
    const shared = await safeShare({
      title: "Today's Focus Verse",
      text: shareText
    });
    
    if (shared) {
      toast({
        title: "Verse Shared",
        description: "Daily verse shared successfully!",
      });
    }
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    const bookmarks = JSON.parse(localStorage.getItem('bibleBookmarks_v2') || '[]');
    const newBookmark = {
      id: Date.now().toString(),
      reference: displayReference,
      text: displayText,
      folder: 'My Verses',
      note: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    bookmarks.push(newBookmark);
    localStorage.setItem('bibleBookmarks_v2', JSON.stringify(bookmarks));
    
    toast({
      title: "Verse Saved",
      description: `${displayReference} saved to My Verses`,
    });
  };

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const copyText = `${displayText}\n\n— ${displayReference}`;
    try {
      await navigator.clipboard.writeText(copyText);
      toast({
        title: "Copied",
        description: "Verse copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Could not copy verse",
        variant: "destructive",
      });
    }
  };

  const handleEmailSignup = async () => {
    const trimmedEmail = emailInput.trim();
    
    if (!trimmedEmail) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
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
          email: trimmedEmail,
          firstName: nameInput.trim() || undefined,
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
    <div
      className="w-full text-left rounded-2xl overflow-hidden bg-black shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
      data-testid="card-daily-verse-hero"
    >
      <button
        type="button"
        onClick={onPress}
        className="w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
      >
        <div className="relative w-full aspect-[16/10]">
        <img
          src={mountainPeakImage}
          alt={displayReference}
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

        <div className="absolute inset-0 flex flex-col justify-end px-5 pb-5 gap-1">
          <p className="text-xs font-semibold text-slate-300/90 tracking-wide uppercase">
            Daily Verse
          </p>
          <p className="text-sm font-bold text-amber-300 mt-0.5">{displayReference}</p>
          <p className="mt-2 text-[15px] leading-relaxed text-white font-light">
            {loading ? "Loading today's verse..." : displayText}
          </p>
        </div>
      </div>
      </button>

      <div className="flex items-center justify-between px-5 py-3 bg-black/95">
        <div className="flex items-center gap-4 text-[11px] text-slate-400">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 hover:text-slate-200 transition-colors"
            data-testid="button-share-verse-hero"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share
          </button>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 hover:text-slate-200 transition-colors"
            data-testid="button-save-verse-hero"
          >
            <BookmarkPlus className="w-3.5 h-3.5" />
            Save
          </button>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 hover:text-slate-200 transition-colors"
            data-testid="button-copy-verse-hero"
          >
            <Heart className="w-3.5 h-3.5" />
            Copy
          </button>
        </div>
        
        <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
          <DialogTrigger asChild>
            <button
              className="inline-flex items-center gap-1.5 text-[11px] text-amber-400 hover:text-amber-300 transition-colors font-medium"
              data-testid="button-daily-reminder-hero"
            >
              <Mail className="w-3.5 h-3.5" />
              Daily Reminders
            </button>
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
                <label htmlFor="reminder-name-hero" className="text-sm font-medium text-foreground">
                  Name (Optional)
                </label>
                <input
                  id="reminder-name-hero"
                  type="text"
                  placeholder="Your name"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  data-testid="input-reminder-name-hero"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="reminder-email-hero" className="text-sm font-medium text-foreground">
                  Email Address *
                </label>
                <input
                  id="reminder-email-hero"
                  type="email"
                  placeholder="your.email@example.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  data-testid="input-reminder-email-hero"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => setIsEmailDialogOpen(false)}
                disabled={isSubscribing}
                data-testid="button-cancel-reminder-hero"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleEmailSignup}
                disabled={isSubscribing}
                data-testid="button-subscribe-reminder-hero"
              >
                {isSubscribing ? "Signing Up..." : "Sign Up"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-black/95">
        <MoreTranslationsCard reference={displayReference} tone="dark" className="mx-4 mt-4 mb-4" />
      </div>
    </div>
  );
}
