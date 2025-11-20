import sgMail from "@sendgrid/mail";

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const APP_BASE_URL = process.env.REPL_ID 
  ? `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`
  : "http://localhost:5000";

if (!SENDGRID_API_KEY) {
  console.warn("[DailyEmail] SENDGRID_API_KEY is not set – emails will NOT send.");
} else {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

export interface DailyEmailPayload {
  to: string;
  name?: string;
  verseReference: string;
  verseText: string;
  meaning: string;
  application: string;
  triviaTitle: string;
  triviaStreak: number;
}

export async function sendDailyDiscipleshipEmail(payload: DailyEmailPayload) {
  if (!SENDGRID_API_KEY) {
    console.log("[DailyEmail] Skipping email - no API key configured");
    return;
  }

  const {
    to,
    name = "Friend",
    verseReference,
    verseText,
    meaning,
    application,
    triviaTitle,
    triviaStreak,
  } = payload;

  const subject = `Your Daily Verse & Bible Trivia – ${verseReference}`;

  const triviaLine =
    triviaStreak > 0
      ? `Your Bible Trivia streak is currently <strong>${triviaStreak} day${
          triviaStreak === 1 ? "" : "s"
        }</strong>. Keep going as a <strong>${triviaTitle}</strong>!`
      : `Start your Bible Trivia journey today and begin your first streak as a <strong>${triviaTitle}</strong>.`;

  const html = `
  <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color:#0f172a; padding:24px;">
    <h1 style="font-size:20px; margin:0 0 12px;">Good morning, ${name}</h1>
    <p style="font-size:14px; margin:0 0 16px;">Here is your daily verse and a reminder to grow in God's Word.</p>

    <div style="border-radius:12px; padding:16px; background:#fefce8; border:1px solid #facc15; margin-bottom:16px;">
      <p style="font-size:13px; text-transform:uppercase; letter-spacing:0.05em; color:#854d0e; margin:0 0 4px;">
        Verse of the Day
      </p>
      <p style="font-size:15px; font-weight:600; margin:0 0 4px;">${verseReference}</p>
      <p style="font-size:14px; margin:0;">"${verseText}"</p>
    </div>

    <div style="margin-bottom:16px;">
      <h2 style="font-size:15px; margin:0 0 4px;">Meaning</h2>
      <p style="font-size:14px; margin:0;">${meaning}</p>
    </div>

    <div style="margin-bottom:20px;">
      <h2 style="font-size:15px; margin:0 0 4px;">Application for Today</h2>
      <p style="font-size:14px; margin:0;">${application}</p>
    </div>

    <div style="border-radius:12px; padding:16px; background:#eff6ff; border:1px solid #60a5fa; margin-bottom:20px;">
      <p style="font-size:13px; text-transform:uppercase; letter-spacing:0.05em; color:#1d4ed8; margin:0 0 4px;">
        Bible Trivia Challenge
      </p>
      <p style="font-size:14px; margin:0 0 8px;">
        ${triviaLine}
      </p>
      <a href="${APP_BASE_URL}/trivia"
         style="display:inline-block; margin-top:8px; background:#f59e0b; color:#111827;
                padding:8px 16px; border-radius:999px; font-size:13px; font-weight:600;
                text-decoration:none;">
        Continue today's Bible Trivia
      </a>
    </div>

    <p style="font-size:11px; color:#6b7280; margin-top:16px;">
      You're receiving this because you subscribed to the Daily Verse & Trivia email in the app.
      You can turn this off in Settings at any time.
    </p>
  </div>
  `;

  const msg = {
    to,
    from: "noreply@thegospelin5minutes.com",
    subject,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log(`[DailyEmail] ✅ Sent to ${to}`);
  } catch (error) {
    console.error(`[DailyEmail] ❌ Failed to send to ${to}:`, error);
    throw error;
  }
}
