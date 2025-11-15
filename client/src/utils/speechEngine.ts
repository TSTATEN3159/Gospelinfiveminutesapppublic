import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { safeLocalStorage } from '@/utils/capabilities';

let isSpeaking = false;
let currentWordIndex = 0;
let highlightInterval: NodeJS.Timeout | null = null;

/**
 * Global TTS engine with word-by-word highlighting
 * Note: Word sync is approximate (500ms intervals) since Capacitor TTS
 * doesn't provide native word boundary events
 */

export async function speak(
  text: string,
  onWordHighlight?: (wordIndex: number) => void
) {
  if (!text) return;

  // Stop any existing speech
  await stopSpeech();

  // Get user's preferred voice or auto-select
  const preferredVoiceIndex = safeLocalStorage.getItem("preferredVoiceIndex");
  let voiceIndex: number | undefined;

  if (preferredVoiceIndex !== null) {
    const index = parseInt(preferredVoiceIndex, 10);
    if (!isNaN(index)) {
      voiceIndex = index;
    }
  }

  const words = text.split(" ");
  currentWordIndex = 0;
  isSpeaking = true;

  // Start word highlighting (approximate sync)
  if (onWordHighlight) {
    highlightInterval = setInterval(() => {
      if (!isSpeaking || currentWordIndex >= words.length) {
        if (highlightInterval) {
          clearInterval(highlightInterval);
          highlightInterval = null;
        }
        return;
      }
      
      onWordHighlight(currentWordIndex);
      currentWordIndex++;
    }, 500); // Approximate 500ms per word (120 WPM)
  }

  try {
    await TextToSpeech.speak({
      text,
      lang: "en-US",
      voice: voiceIndex,
      rate: 0.95,     // Warm, caring pace
      pitch: 1.05,    // Soft, feminine tone
      volume: 1.0,
      category: "playback"
    });
  } catch (err) {
    console.error("Speech error:", err);
  } finally {
    if (highlightInterval) {
      clearInterval(highlightInterval);
      highlightInterval = null;
    }
    isSpeaking = false;
    currentWordIndex = 0;
  }
}

export async function stopSpeech() {
  isSpeaking = false;
  currentWordIndex = 0;
  
  if (highlightInterval) {
    clearInterval(highlightInterval);
    highlightInterval = null;
  }
  
  try {
    await TextToSpeech.stop();
  } catch (err) {
    console.error("Stop speech error:", err);
  }
}

export async function toggleSpeech(
  text: string,
  onWordHighlight?: (wordIndex: number) => void
) {
  if (isSpeaking) {
    await stopSpeech();
  } else {
    await speak(text, onWordHighlight);
  }
}

export function getIsSpeaking(): boolean {
  return isSpeaking;
}
