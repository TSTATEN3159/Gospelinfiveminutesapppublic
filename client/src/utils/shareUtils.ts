export const APP_STORE_URL = 'https://apps.apple.com/us/app/the-gospel-in-five-minutes/id6754119791';

export async function shareAppWithIcon(toast: any): Promise<'shared' | 'copied' | 'cancelled' | 'failed'> {
  const shareData = {
    title: 'The Gospel in 5 Minutes',
    text: 'Download The Gospel in 5 Minutes app - daily Bible verses and spiritual guidance!',
    url: APP_STORE_URL
  };

  try {
    const iconResponse = await fetch('/icon-512.png');
    if (iconResponse.ok) {
      const iconBlob = await iconResponse.blob();
      const iconFile = new File([iconBlob], 'gospel-app-icon.png', { type: 'image/png' });
      
      if (navigator.canShare && navigator.canShare({ files: [iconFile] })) {
        await navigator.share({
          ...shareData,
          files: [iconFile]
        });
        return 'shared';
      }
    }
  } catch (err) {
    console.log('File share not supported, falling back to URL share');
  }

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return 'shared';
    } catch (err) {
      return 'cancelled';
    }
  } else {
    try {
      await navigator.clipboard.writeText(APP_STORE_URL);
      toast({
        title: "Link copied!",
        description: "App Store link copied to clipboard successfully.",
      });
      return 'copied';
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Unable to copy link. Please try again.",
        variant: "destructive",
      });
      return 'failed';
    }
  }
}

interface VerseShareData {
  text: string;
  reference: string;
  version: string;
}

export async function shareVerse(verse: VerseShareData, toast: any): Promise<'shared' | 'copied' | 'cancelled' | 'failed'> {
  const verseText = `"${verse.text}" - ${verse.reference} (${verse.version})`;
  const fullShareText = `${verseText}\n\nShared from The Gospel in 5 Minutes app\n${APP_STORE_URL}`;
  const shareData = {
    title: verse.reference,
    text: `${verseText}\n\nShared from The Gospel in 5 Minutes app`,
    url: APP_STORE_URL
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return 'shared';
    } catch (err) {
      return 'cancelled';
    }
  } else {
    try {
      await navigator.clipboard.writeText(fullShareText);
      toast({
        title: "Verse copied!",
        description: "The verse and app link have been copied to your clipboard.",
      });
      return 'copied';
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Unable to copy verse. Please try again.",
        variant: "destructive",
      });
      return 'failed';
    }
  }
}
