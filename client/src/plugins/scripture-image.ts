import { registerPlugin } from '@capacitor/core';

export interface ScriptureImagePlugin {
  generate(options: {
    verseText: string;
    reference: string;
    width?: number;
    height?: number;
  }): Promise<{ fileUrl: string }>;
}

const ScriptureImage = registerPlugin<ScriptureImagePlugin>('ScriptureImage');

export default ScriptureImage;
