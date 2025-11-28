import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, Copy, Sparkles, Compass, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
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
  "Cheerful", "Stressed", "Optimistic", "Ashamed", "Proud", "Jealous", "Patient", "Impatient", "Forgiving", "Resentful",
  "Lost", "Empty", "Searching", "Hopeless", "Broken", "Guilty"
];

const gospelPromptEmotions = ["Lost", "Empty", "Searching", "Hopeless", "Broken", "Guilty", "Confused", "Lonely"];

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
  },
  "Lost": {
    verse: "For the Son of man is come to seek and to save that which was lost.",
    reference: "Luke 19:10",
    encouragement: "Jesus came specifically for you. He's not angry—He's searching for you with love."
  },
  "Empty": {
    verse: "Jesus said unto her, I am the resurrection, and the life: he that believeth in me, though he were dead, yet shall he live.",
    reference: "John 11:25",
    encouragement: "That empty feeling is real—and Jesus offers to fill it with life that truly satisfies."
  },
  "Searching": {
    verse: "And ye shall seek me, and find me, when ye shall search for me with all your heart.",
    reference: "Jeremiah 29:13",
    encouragement: "Your search matters. God promises that those who genuinely seek Him will find Him."
  },
  "Hopeless": {
    verse: "For I know the thoughts that I think toward you, saith the Lord, thoughts of peace, and not of evil, to give you an expected end.",
    reference: "Jeremiah 29:11",
    encouragement: "Even when you can't see hope, God has a plan and a future for you. Don't give up."
  },
  "Broken": {
    verse: "The Lord is nigh unto them that are of a broken heart; and saveth such as be of a contrite spirit.",
    reference: "Psalm 34:18",
    encouragement: "God draws close to the brokenhearted. Your brokenness is not the end—it's where His healing begins."
  },
  "Guilty": {
    verse: "If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.",
    reference: "1 John 1:9",
    encouragement: "Guilt doesn't have to be permanent. God offers complete forgiveness and a fresh start."
  }
};

interface EmotionScriptureSectionProps {
  backgroundImage?: string;
  onNavigate?: (page: string) => void;
}

export default function EmotionScriptureSection({ backgroundImage, onNavigate }: EmotionScriptureSectionProps) {
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

  const popularEmotions = ["Anxious", "Joyful", "Peaceful", "Grateful", "Worried", "Hopeful"];

  return (
    <Card className="relative overflow-hidden min-h-[350px] flex flex-col shadow-lg border-2" data-testid="card-emotionScripture">
      {backgroundImage && (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-700/60 via-purple-500/20 to-purple-900/80" />
        </>
      )}
      
      <CardHeader className={cn("relative z-10 flex-shrink-0 border-b py-4 px-6", backgroundImage ? "bg-gradient-to-r from-purple-500/10 to-transparent" : "bg-purple-700")}>
        <div className="flex items-center gap-5">
          <Avatar className="h-14 w-14 border-2 border-purple-200">
            <AvatarFallback className="bg-purple-100 text-purple-600">
              <Heart className="w-7 h-7" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <CardTitle className={cn("flex items-center gap-3 text-2xl font-semibold tracking-tight", backgroundImage ? "text-white" : "text-white")}>
              <Compass className="w-6 h-6" />
              Feelings & Scripture
            </CardTitle>
            <p className={cn("text-base leading-relaxed", backgroundImage ? "text-white/90" : "text-purple-100")}>
              Find God's word for your heart today
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative z-10 flex-1 flex flex-col p-6 space-y-4">
        {!selectedEmotion && (
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 text-center space-y-4">
            <div className="flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-purple-600 mb-2" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How are you feeling today?</h3>
              <p className="text-gray-600 text-sm mb-4">Choose an emotion and discover God's comfort for your heart</p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {popularEmotions.map((emotion) => (
                  <Badge 
                    key={emotion}
                    variant="secondary" 
                    className="cursor-pointer hover-elevate p-2 justify-center"
                    onClick={() => handleEmotionSelect(emotion)}
                    data-testid={`emotion-${emotion.toLowerCase()}`}
                  >
                    {emotion}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
        
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
          <label className="text-sm font-medium mb-3 block text-gray-800" htmlFor="emotion-select">
            Search all emotions
          </label>
          <Select value={selectedEmotion} onValueChange={handleEmotionSelect}>
            <SelectTrigger data-testid="select-emotion" className="border-gray-300" id="emotion-select">
              <SelectValue placeholder="Or search from 40+ emotions..." />
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
          <div className="flex-1 flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-700 font-medium">Finding God's word for you...</p>
              <p className="text-gray-500 text-sm mt-1">Searching Scripture for comfort</p>
            </div>
          </div>
        )}

        {scriptureResponse && !isLoading && (
          <div className="flex-1 flex flex-col space-y-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-200" data-testid="scripture-response">
              <div className="text-center space-y-4">
                <div className="bg-purple-50 rounded-lg p-4">
                  <blockquote className="text-lg italic font-serif leading-relaxed text-gray-800 mb-3">
                    "{scriptureResponse.verse}"
                  </blockquote>
                  <cite className="text-sm font-semibold text-purple-700">— {scriptureResponse.reference}</cite>
                </div>
                
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-lg border border-amber-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-4 h-4 text-amber-600" />
                    <span className="text-sm font-medium text-amber-800">Personal Encouragement</span>
                  </div>
                  <p className="text-amber-800 text-sm leading-relaxed">
                    {scriptureResponse.encouragement}
                  </p>
                </div>

                <div className="flex gap-2 justify-center pt-2">
                  <Button 
                    onClick={copyScripture}
                    className="bg-purple-600 text-white"
                    data-testid="button-copyScripture"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Scripture
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setSelectedEmotion("");
                      setScriptureResponse(null);
                    }}
                    data-testid="button-try-another"
                  >
                    Try Another
                  </Button>
                </div>
                
                {/* Gospel invitation for spiritual searching emotions */}
                {gospelPromptEmotions.includes(selectedEmotion) && onNavigate && (
                  <div className="mt-4 bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="w-4 h-4 text-indigo-600" />
                      <span className="text-sm font-medium text-indigo-800">There's More...</span>
                    </div>
                    <p className="text-indigo-700 text-sm leading-relaxed mb-3">
                      If you're searching for real answers, there's a message that has changed billions of lives—and it could change yours.
                    </p>
                    <Button 
                      onClick={() => onNavigate('gospel')}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700"
                      data-testid="button-discover-gospel"
                    >
                      Discover the Good News
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Show selected emotion when scripture is displayed */}
        {selectedEmotion && scriptureResponse && (
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3">
            <div className="flex items-center justify-center gap-2">
              <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                Currently exploring: {selectedEmotion}
              </Badge>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}