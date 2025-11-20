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

  const PARCHMENT_BG_URL = "https://images.unsplash.com/photo-1509266272358-7701da638078?w=1600&q=80";

  const html = `
<body style="margin:0;padding:0;background:#f5eee1;">
  <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color:#1f2933; padding:24px 0;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%">
      <tr>
        <td align="center">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width:100%; background:#fdf7eb; border-radius:24px; box-shadow:0 16px 40px rgba(15,23,42,0.25); overflow:hidden;">
            
            <!-- Header -->
            <tr>
              <td style="padding:20px 24px 8px 24px;">
                <h1 style="font-size:20px; margin:0 0 6px; color:#1f2933;">Good morning, ${name}</h1>
                <p style="font-size:13px; margin:0; color:#4b5563;">
                  Here is today's Scripture and a gentle nudge to keep growing in God's Word.
                </p>
              </td>
            </tr>

            <!-- Parchment Scripture block -->
            <tr>
              <td style="padding:12px 24px 0 24px;">
                <div
                  style="
                    background-image:url('${PARCHMENT_BG_URL}');
                    background-size:cover;
                    background-position:center;
                    border-radius:18px;
                    padding:20px 18px 22px 18px;
                    border:1px solid #e2c79f;
                  "
                >
                  <p style="font-size:11px; text-transform:uppercase; letter-spacing:0.12em; color:#92400e; margin:0 0 6px;">
                    Verse of the Day
                  </p>
                  <p style="font-size:15px; font-weight:700; margin:0 0 6px; color:#3b2f2f;">
                    ${verseReference}
                  </p>
                  <p style="font-size:14px; line-height:1.5; margin:0 0 12px; color:#3b2f2f;">
                    "${verseText}"
                  </p>
                  <p style="font-size:12px; font-weight:600; margin:0 0 4px; color:#6b4a2e;">
                    Meaning
                  </p>
                  <p style="font-size:13px; line-height:1.5; margin:0 0 8px; color:#3f2f23;">
                    ${meaning}
                  </p>
                  <p style="font-size:12px; font-weight:600; margin:8px 0 4px; color:#6b4a2e;">
                    Application for today
                  </p>
                  <p style="font-size:13px; line-height:1.5; margin:0; color:#3f2f23;">
                    ${application}
                  </p>
                </div>
              </td>
            </tr>

            <!-- Spacer -->
            <tr>
              <td style="height:16px;"></td>
            </tr>

            <!-- Trivia reminder block -->
            <tr>
              <td style="padding:0 24px 20px 24px;">
                <div style="border-radius:18px; background:#0f172a; padding:16px 18px; color:#e5e7eb;">
                  <p style="font-size:11px; text-transform:uppercase; letter-spacing:0.12em; color:#93c5fd; margin:0 0 4px;">
                    Bible Trivia Challenge
                  </p>
                  <p style="font-size:13px; margin:0 0 6px;">
                    ${
                      triviaStreak > 0
                        ? `Your Bible Trivia streak is <strong>${triviaStreak} day${
                            triviaStreak === 1 ? "" : "s"
                          }</strong>. Keep going as a <strong>${triviaTitle}</strong>!`
                        : `Start your Bible Trivia journey today and begin your first streak as a <strong>${triviaTitle}</strong>.`
                    }
                  </p>
                  <p style="font-size:12px; margin:0 0 12px; color:#cbd5e1;">
                    10 quick questions from Scripture. Keep your crown, deepen your roots in Christ.
                  </p>
                  <a
                    href="${APP_BASE_URL}/trivia"
                    style="
                      display:inline-block;
                      padding:8px 18px;
                      border-radius:999px;
                      background:#f59e0b;
                      color:#111827;
                      font-size:13px;
                      font-weight:600;
                      text-decoration:none;
                      box-shadow:0 10px 25px rgba(245,158,11,0.65);
                    "
                  >
                    Continue today's Bible Trivia
                  </a>
                </div>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:0 24px 18px 24px;">
                <p style="font-size:11px; color:#9ca3af; margin:8px 0 0;">
                  You are receiving this because you subscribed to the Daily Verse & Trivia email in the app.
                  You can turn this off in Settings at any time.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </div>
</body>
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
