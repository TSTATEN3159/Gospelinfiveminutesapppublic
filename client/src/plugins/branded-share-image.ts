import { registerPlugin } from '@capacitor/core';

export interface BrandedShareImagePlugin {
  shareVerse(options: {
    verseText: string;
    reference: string;
    tagline?: string;
  }): Promise<void>;
}

const BrandedShareImage = registerPlugin<BrandedShareImagePlugin>(
  'BrandedShareImage'
);

export default BrandedShareImage;
