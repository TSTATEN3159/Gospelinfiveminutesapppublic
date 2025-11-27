import { Haptics, ImpactStyle, NotificationType } from "@capacitor/haptics";
import { Share } from "@capacitor/share";

/**
 * Light tap for general interactions (buttons, tabs, etc.)
 */
export async function tapHaptic() {
  try {
    await Haptics.impact({ style: ImpactStyle.Light });
  } catch {
    // ignore on web
  }
}

/**
 * Stronger feedback for success states (saved verse, correct answer, etc.)
 */
export async function successHaptic() {
  try {
    await Haptics.notification({ type: NotificationType.Success });
  } catch {
    // ignore on web
  }
}

/**
 * Error feedback (wrong trivia answer, failed action, etc.)
 */
export async function errorHaptic() {
  try {
    await Haptics.notification({ type: NotificationType.Error });
  } catch {
    // ignore on web
  }
}

/**
 * Native iOS / Android share sheet for verses, devotionals, etc.
 */
export async function shareVerse(options: {
  verseText: string;
  reference: string;
  url?: string;
}) {
  const { verseText, reference, url } = options;

  const text = `"${verseText}"\n\n— ${reference}`;
  const title = `The Gospel in Five Minutes — ${reference}`;

  try {
    await Share.share({
      title,
      text,
      url,
      dialogTitle: "Share this verse",
    });
    await successHaptic();
  } catch {
    // user cancelled or not supported
    await tapHaptic();
  }
}
