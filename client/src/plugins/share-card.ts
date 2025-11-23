import { registerPlugin } from '@capacitor/core';

export interface ShareCardPlugin {
  share(options: { verseText: string; reference: string }): Promise<void>;
}

const ShareCard = registerPlugin<ShareCardPlugin>('ShareCard');

export default ShareCard;
