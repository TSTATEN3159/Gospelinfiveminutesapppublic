import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Heart, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ScriptureResponse {
  verse: string;
  reference: string;
  encouragement: string;
}

const emotions = [
  "Anxious", "Peaceful", "Joyful", "Worried", "Grateful", "Lonely", "Hopeful", "Afraid", "Loved", "Sad",
  "Angry", "Confused", "Confident", "Overwhelmed", "Blessed", "Discouraged", "Excited", "Tired", "Curious", "Content",
  "Frustrated", "Amazed", "Nervous", "Calm", "Hurt", "Inspired", "Doubtful", "Secure", "Restless", "Thoughtful",
  "Cheerful", "Stressed", "Optimistic", "Ashamed", "Proud", "Jealous", "Patient", "Impatient", "Forgiving", "Resentful"
  // Add more emotions to reach 100+
];

const mockScriptures: Record<string, ScriptureResponse> = {
  "Anxious": {
    verse: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.",
    reference: "Philippians 4:6",
    encouragement: "God invites you to bring all your worries to Him. He cares for you and wants to give you His peace."
  },
  "Joyful": {
    verse: "This is the day the Lord has made; let us rejoice and be glad in it.",
    reference: "Psalm 118:24",
    encouragement: "Your joy is a reflection of God's goodness in your life. Celebrate the gift of today!"
  },
  "Lonely": {
    verse: "The Lord your God goes with you; he will never leave you nor forsake you.",
    reference: "Deuteronomy 31:6",
    encouragement: "You are never truly alone. God's presence is with you always, offering comfort and companionship."
  }
};

interface EmotionScriptureSectionProps {
  backgroundImage?: string;
}

export default function EmotionScriptureSection({ backgroundImage }: EmotionScriptureSectionProps) {
  const [selectedEmotion, setSelectedEmotion] = useState("");
  const [scriptureResponse, setScriptureResponse] = useState<ScriptureResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleEmotionSelect = async (emotion: string) => {
    setSelectedEmotion(emotion);
    setIsLoading(true);

    // todo: remove mock functionality - replace with real Bible API
    setTimeout(() => {
      const response = mockScriptures[emotion] || {
        verse: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
        reference: "Romans 8:28",
        encouragement: "God is working in your situation, even when you can't see it. Trust in His plan for your life."
      };
      setScriptureResponse(response);
      setIsLoading(false);
    }, 1000);
  };

  const copyScripture = async () => {
    if (!scriptureResponse) return;
    try {
      await navigator.clipboard.writeText(`"${scriptureResponse.verse}" - ${scriptureResponse.reference}`);
      toast({
        title: "Scripture Copied!",
        description: "The verse has been copied to your clipboard.",
      });
    } catch (err) {
      console.log("Copy failed:", err);
    }
  };

  return (
    <Card className="relative overflow-hidden min-h-[400px]" data-testid="card-emotionScripture">
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      
      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Heart className="w-6 h-6 text-accent" />
          Feelings & Scripture
        </CardTitle>
        <p className="text-muted-foreground">
          Share how you're feeling today and find God's word for your heart
        </p>
      </CardHeader>

      <CardContent className="relative z-10 space-y-6">
        <div>
          <label className="text-sm font-medium mb-2 block">
            How are you feeling today?
          </label>
          <Select value={selectedEmotion} onValueChange={handleEmotionSelect}>
            <SelectTrigger data-testid="select-emotion">
              <SelectValue placeholder="Choose your emotion..." />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {emotions.map(emotion => (
                <SelectItem key={emotion} value={emotion}>
                  {emotion}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {isLoading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-2">Finding God's word for you...</p>
          </div>
        )}

        {scriptureResponse && !isLoading && (
          <div className="space-y-4 p-6 bg-secondary/50 rounded-lg" data-testid="scripture-response">
            <blockquote className="text-lg italic font-serif leading-relaxed">
              "{scriptureResponse.verse}"
            </blockquote>
            <cite className="text-sm font-semibold">- {scriptureResponse.reference}</cite>
            
            <p className="text-muted-foreground bg-white/80 p-3 rounded">
              💝 {scriptureResponse.encouragement}
            </p>

            <Button 
              variant="outline" 
              size="sm" 
              onClick={copyScripture}
              data-testid="button-copyScripture"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Scripture
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}