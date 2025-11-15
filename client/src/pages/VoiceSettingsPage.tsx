import { useEffect, useState } from "react";
import { useVoiceSettings } from "@/context/VoiceSettingsContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getAvailableVoices } from "@/utils/voicePlayer";
import { Volume2, Check } from "lucide-react";
import { TextToSpeech } from "@capacitor-community/text-to-speech";

interface VoiceOption {
  index: number;
  name: string;
  lang: string;
  isLocal: boolean;
  isFemale: boolean;
  isPremium: boolean;
}

export default function VoiceSettingsPage() {
  const { selectedVoiceIndex, setSelectedVoiceIndex } = useVoiceSettings();
  const [voices, setVoices] = useState<VoiceOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVoices();
  }, []);

  const loadVoices = async () => {
    setLoading(true);
    try {
      const availableVoices = await getAvailableVoices();
      
      const voiceOptions: VoiceOption[] = availableVoices.map((voice, index) => {
        const nameLower = voice.name.toLowerCase();
        const uriLower = voice.voiceURI.toLowerCase();
        
        const isFemale = 
          nameLower.includes('female') || 
          nameLower.includes('samantha') ||
          nameLower.includes('karen') ||
          nameLower.includes('moira') ||
          nameLower.includes('fiona') ||
          nameLower.includes('victoria') ||
          nameLower.includes('susan') ||
          nameLower.includes('siri') && !nameLower.includes('male');
        
        const isPremium = 
          nameLower.includes('premium') ||
          nameLower.includes('enhanced') ||
          uriLower.includes('siri') ||
          nameLower.includes('wavenet');

        return {
          index,
          name: voice.name,
          lang: voice.lang,
          isLocal: voice.localService,
          isFemale,
          isPremium
        };
      });

      setVoices(voiceOptions);
    } catch (err) {
      console.error("Failed to load voices:", err);
    } finally {
      setLoading(false);
    }
  };

  const testVoice = async (voiceIndex: number) => {
    try {
      await TextToSpeech.speak({
        text: "This is how I will sound when reading Bible verses.",
        lang: "en-US",
        rate: 0.95,
        pitch: 1.05,
        volume: 1.0,
        voice: voiceIndex,
        category: "playback",
      });
    } catch (err) {
      console.error("Test voice error:", err);
    }
  };

  const selectVoice = (index: number | null) => {
    setSelectedVoiceIndex(index);
  };

  const getVoiceDescription = (voice: VoiceOption) => {
    const parts = [];
    if (voice.isPremium) parts.push("Premium");
    if (voice.isFemale) parts.push("Female");
    if (voice.isLocal) parts.push("Local");
    parts.push(voice.lang);
    return parts.join(" • ");
  };

  return (
    <div className="min-h-screen bg-background p-4 pb-20">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Voice Settings
          </h1>
          <p className="text-muted-foreground">
            Choose your preferred voice for text-to-speech features
          </p>
        </div>

        {loading ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">Loading available voices...</p>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card 
              className={`cursor-pointer transition-all ${
                selectedVoiceIndex === null 
                  ? "border-primary border-2" 
                  : "hover-elevate"
              }`}
              onClick={() => selectVoice(null)}
              data-testid="voice-option-auto"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      Automatic (Recommended)
                      {selectedVoiceIndex === null && (
                        <Check className="h-5 w-5 text-primary" />
                      )}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      Automatically selects the best natural female voice available on your device
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">Available Voices</h2>
              
              {voices.map((voice) => (
                <Card
                  key={voice.index}
                  className={`cursor-pointer transition-all ${
                    selectedVoiceIndex === voice.index 
                      ? "border-primary border-2" 
                      : "hover-elevate"
                  }`}
                  data-testid={`voice-option-${voice.index}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div 
                        className="flex-1 min-w-0"
                        onClick={() => selectVoice(voice.index)}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-foreground truncate">
                            {voice.name}
                          </h3>
                          {selectedVoiceIndex === voice.index && (
                            <Check className="h-5 w-5 text-primary flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {getVoiceDescription(voice)}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {voice.isPremium && (
                            <Badge variant="default" className="text-xs">
                              Premium
                            </Badge>
                          )}
                          {voice.isFemale && (
                            <Badge variant="secondary" className="text-xs">
                              Female
                            </Badge>
                          )}
                          {voice.isLocal && (
                            <Badge variant="outline" className="text-xs">
                              Offline
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          testVoice(voice.index);
                        }}
                        data-testid={`test-voice-${voice.index}`}
                        className="flex-shrink-0"
                      >
                        <Volume2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {voices.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">
                    No voices found. Text-to-speech may not be available on this device.
                  </p>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
}
