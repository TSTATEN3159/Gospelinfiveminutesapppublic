import { useCallback, useEffect, useState } from "react";
import { speak as voicePlayerSpeak, stopSpeaking, isTextToSpeechSupported } from "@/utils/voicePlayer";

const LANGUAGE_VOICE_MAP: Record<string, string> = {
  'en': 'en-US',
  'es': 'es-ES',
  'fr': 'fr-FR',
  'pt': 'pt-PT',
  'zh': 'zh-CN',
  'ar': 'ar-SA',
  'hi': 'hi-IN'
};

/**
 * Hook for text-to-speech functionality
 * Uses Capacitor TTS plugin with premium female voices:
 * - iOS: Siri Female, Samantha Enhanced
 * - Android: Google Female, Wavenet
 */
export const useTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const checkSupport = async () => {
      const isSupported = await isTextToSpeechSupported();
      setSupported(isSupported);
      setIsInitialized(true);
    };
    
    checkSupport();
  }, []);

  const cancel = useCallback(async () => {
    if (!supported) return;
    await stopSpeaking();
    setIsSpeaking(false);
  }, [supported]);

  const speak = useCallback(
    async (text: string, langCode: string = "en") => {
      if (!supported || !text) return;

      await stopSpeaking();
      setIsSpeaking(true);

      const voiceLang = LANGUAGE_VOICE_MAP[langCode] || 'en-US';
      
      try {
        await voicePlayerSpeak(text, voiceLang);
        setIsSpeaking(false);
      } catch (err) {
        console.error("TTS error:", err);
        setIsSpeaking(false);
      }
    },
    [supported]
  );

  return { supported, isSpeaking, speak, cancel, isInitialized };
};
