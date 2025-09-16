import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Share2, Book } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Verse {
  text: string;
  reference: string;
  chapter: string;
  book: string;
}

interface DailyVerseCardProps {
  verse: Verse;
  backgroundImage?: string;
}

export default function DailyVerseCard({ verse, backgroundImage }: DailyVerseCardProps) {
  const { toast } = useToast();
  const [isSharing, setIsSharing] = useState(false);

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
    toast({
      title: "Opening Chapter",
      description: `Loading ${verse.book} ${verse.chapter}...`,
    });
  };

  return (
    <Card className="relative overflow-hidden min-h-[300px] shadow-lg" data-testid="card-dailyVerse">
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-80"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30" />
      
      <CardContent className="relative z-10 p-8 h-full flex flex-col justify-between text-white">
        <div className="text-center space-y-6">
          <h2 className="text-2xl font-bold">Today's Verse</h2>
          
          <blockquote className="text-lg leading-relaxed font-serif italic">
            "{verse.text}"
          </blockquote>
          
          <cite className="text-sm font-semibold not-italic">
            - {verse.reference}
          </cite>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-8">
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
            onClick={goToChapter}
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            data-testid="button-chapter"
          >
            <Book className="w-4 h-4 mr-2" />
            Read Chapter
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}