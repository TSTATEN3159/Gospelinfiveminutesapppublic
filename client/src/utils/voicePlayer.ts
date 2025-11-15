import { TextToSpeech } from '@capacitor-community/text-to-speech';

/**
 * Premium Voice Player for iOS and Android
 * Automatically selects the best natural female voice:
 * - iOS: Siri Female, Samantha Enhanced, or best available female
 * - Android: Google Female, Wavenet, or best available female
 */

let cachedVoices: SpeechSynthesisVoice[] | null = null;
let bestFemaleVoiceIndex: number | undefined = undefined;

/**
 * Find the best natural female voice available
 * Priority order:
 * 1. Siri Female (iOS premium)
 * 2. Samantha Enhanced (iOS)
 * 3. Google voices with "female" in name
 * 4. Any voice with "female" in name
 * 5. Default voice
 */
async function getBestFemaleVoice(lang: string = 'en-US'): Promise<number | undefined> {
  try {
    if (bestFemaleVoiceIndex !== undefined && cachedVoices) {
      return bestFemaleVoiceIndex;
    }

    const { voices } = await TextToSpeech.getSupportedVoices();
    cachedVoices = voices;
    
    if (!voices || voices.length === 0) {
      return undefined;
    }

    // Filter voices by language
    const langPrefix = lang.split('-')[0];
    const matchingLanguageVoices = voices.filter(v => 
      v.lang.toLowerCase().startsWith(langPrefix.toLowerCase())
    );

    const voicesToSearch = matchingLanguageVoices.length > 0 ? matchingLanguageVoices : voices;

    // Priority 1: Siri Female (iOS premium)
    let voiceIndex = voicesToSearch.findIndex(v => 
      v.voiceURI.includes('Siri') && 
      (v.voiceURI.includes('Female') || v.voiceURI.includes('female'))
    );

    // Priority 2: Samantha Enhanced (iOS high quality)
    if (voiceIndex === -1) {
      voiceIndex = voicesToSearch.findIndex(v => 
        v.name.toLowerCase().includes('samantha') && 
        (v.name.toLowerCase().includes('enhanced') || v.name.toLowerCase().includes('premium'))
      );
    }

    // Priority 3: Any Samantha voice (iOS)
    if (voiceIndex === -1) {
      voiceIndex = voicesToSearch.findIndex(v => 
        v.name.toLowerCase().includes('samantha')
      );
    }

    // Priority 4: Google Female voices (Android)
    if (voiceIndex === -1) {
      voiceIndex = voicesToSearch.findIndex(v => 
        v.name.toLowerCase().includes('google') && 
        v.name.toLowerCase().includes('female')
      );
    }

    // Priority 5: Any voice with "female" in name
    if (voiceIndex === -1) {
      voiceIndex = voicesToSearch.findIndex(v => 
        v.name.toLowerCase().includes('female')
      );
    }

    // Priority 6: Warm-sounding female voice names
    if (voiceIndex === -1) {
      const warmFemaleNames = ['karen', 'moira', 'fiona', 'zira', 'susan', 'victoria'];
      voiceIndex = voicesToSearch.findIndex(v => 
        warmFemaleNames.some(name => v.name.toLowerCase().includes(name))
      );
    }

    // Get the actual index in the original voices array
    if (voiceIndex !== -1) {
      const selectedVoice = voicesToSearch[voiceIndex];
      bestFemaleVoiceIndex = voices.findIndex(v => v.voiceURI === selectedVoice.voiceURI);
      console.log(`Selected voice: ${selectedVoice.name} (${selectedVoice.lang})`);
      return bestFemaleVoiceIndex;
    }

    return undefined;
  } catch (err) {
    console.error("Error finding voice:", err);
    return undefined;
  }
}

export async function speak(text: string, lang: string = 'en-US') {
  try {
    const voiceIndex = await getBestFemaleVoice(lang);

    await TextToSpeech.speak({
      text,
      lang,
      rate: 0.95,     // Slightly slower for warmth, clarity, and caring tone
      pitch: 1.05,    // Slightly higher for a warm, friendly, feminine tone
      volume: 1.0,
      voice: voiceIndex,
      category: 'playback',
    });
  } catch (err) {
    console.error("Speech error:", err);
  }
}

export async function stopSpeaking() {
  try {
    await TextToSpeech.stop();
  } catch (err) {
    console.error("Stop speaking error:", err);
  }
}

/**
 * Check if text-to-speech is supported on this device
 */
export async function isTextToSpeechSupported(): Promise<boolean> {
  try {
    const voices = await TextToSpeech.getSupportedVoices();
    return voices.voices && voices.voices.length > 0;
  } catch {
    return false;
  }
}
