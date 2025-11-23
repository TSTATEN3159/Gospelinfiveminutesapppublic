import { registerPlugin } from '@capacitor/core';

export interface VerseSpeechPlugin {
  speak(options: {
    verseText: string;
    reference: string;
    languageCode?: string; // e.g., 'en-US' or 'es-ES'
  }): Promise<void>;
  stop(): Promise<void>;
  isSpeaking(): Promise<{ isSpeaking: boolean }>;
}

const VerseSpeech = registerPlugin<VerseSpeechPlugin>('VerseSpeech');

export default VerseSpeech;
