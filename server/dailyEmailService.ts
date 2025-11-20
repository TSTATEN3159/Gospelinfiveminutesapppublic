import sgMail from "@sendgrid/mail";

// Use the published app URL for email links
const APP_BASE_URL = "https://thegospelin5minutes.org";

// Use Replit's SendGrid integration
async function getSendGridCredentials() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('SendGrid integration not available - missing authentication');
  }

  const connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=sendgrid',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  if (!connectionSettings || (!connectionSettings.settings.api_key || !connectionSettings.settings.from_email)) {
    throw new Error('SendGrid not connected');
  }
  
  const apiKey = connectionSettings.settings.api_key;
  const fromEmail = connectionSettings.settings.from_email;
  
  // Debug logging (safe - only shows first 3 chars)
  console.log(`[SendGrid] API key starts with: ${apiKey?.substring(0, 3) || 'N/A'}`);
  console.log(`[SendGrid] From email: ${fromEmail}`);
  
  return {apiKey, fromEmail};
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
  
  let apiKey: string;
  let fromEmail: string;
  
  // Try environment variable first, then fall back to integration
  const envApiKey = process.env.SENDGRID_API_KEY;
  
  if (envApiKey && envApiKey.startsWith('SG.')) {
    apiKey = envApiKey;
    fromEmail = "info@thegospelin5minutes.org"; // Verified sender email
    sgMail.setApiKey(apiKey);
    console.log('[DailyEmail] Using SENDGRID_API_KEY from environment');
  } else {
    try {
      const credentials = await getSendGridCredentials();
      apiKey = credentials.apiKey;
      fromEmail = credentials.fromEmail;
      sgMail.setApiKey(apiKey);
      console.log('[DailyEmail] Using SendGrid integration credentials');
    } catch (error: any) {
      if (error.message?.includes('SendGrid not connected')) {
        console.log('[DailyEmail] SendGrid not configured - skipping email');
        return;
      }
      console.error('[DailyEmail] Error getting SendGrid credentials:', error);
      throw error;
    }
  }

  const subject = `Your Daily Verse & Bible Trivia – ${verseReference}`;

  const PARCHMENT_BG_URL = "https://images.unsplash.com/photo-1509266272358-7701da638078?w=1600&q=80";
  
  // Create unsubscribe link
  const unsubscribeUrl = `${APP_BASE_URL}/unsubscribe?email=${encodeURIComponent(to)}`;

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
                <h1 style="font-size:20px; margin:0 0 6px; color:#1f2933;">Good morning, ${name}!</h1>
                <p style="font-size:13px; margin:0; color:#4b5563;">
                  Here is today's Scripture and a gentle nudge to keep growing in God's Word.
                </p>
              </td>
            </tr>

            <!-- Parchment Scripture block with visible edges -->
            <tr>
              <td style="padding:12px 24px 0 24px;">
                <!-- Outer container to show parchment edges -->
                <div style="background:#f5eee1; padding:20px; border-radius:18px;">
                  <div
                    style="
                      background-image:url('${PARCHMENT_BG_URL}');
                      background-size:contain;
                      background-repeat:no-repeat;
                      background-position:center;
                      padding:40px 30px;
                      min-height:280px;
                      position:relative;
                    "
                  >
                    <!-- Top: Verse only -->
                    <div style="margin-bottom:12px;">
                      <p style="font-size:11px; text-transform:uppercase; letter-spacing:0.12em; color:#f5d7a1; margin:0 0 6px; text-shadow:0 1px 3px rgba(0,0,0,0.3);">
                        Verse of the Day
                      </p>
                      <p style="font-size:15px; font-weight:700; margin:0 0 8px; color:#ffffff; text-shadow:0 2px 4px rgba(0,0,0,0.4);">
                        ${verseReference}
                      </p>
                      <p style="font-size:14px; line-height:1.6; margin:0; color:#ffffff; text-shadow:0 2px 4px rgba(0,0,0,0.5);">
                        "${verseText}"
                      </p>
                    </div>

                    <!-- Divider -->
                    <div style="height:1px; margin:14px 0; background:rgba(255,255,255,0.3);"></div>

                    <!-- Bottom: Meaning + Application -->
                    <div
                      style="
                        background:rgba(15,23,42,0.75);
                        border-radius:12px;
                        padding:14px 16px;
                        backdrop-filter:blur(10px);
                      "
                    >
                      <p style="font-size:12px; font-weight:600; margin:0 0 6px; color:#fbbf24;">
                        Meaning
                      </p>
                      <p style="font-size:13px; line-height:1.5; margin:0 0 10px; color:#e5e7eb;">
                        ${meaning}
                      </p>
                      <p style="font-size:12px; font-weight:600; margin:0 0 6px; color:#fbbf24;">
                        Application for today
                      </p>
                      <p style="font-size:13px; line-height:1.5; margin:0; color:#e5e7eb;">
                        ${application}
                      </p>
                    </div>
                  </div>
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
                  <p style="font-size:12px; margin:0 0 12px; color:#cbd5f5;">
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
                <p style="font-size:11px; color:#9ca3af; margin:8px 0 4px;">
                  You are receiving this because you subscribed to daily reminders from The Gospel in 5 Minutes.
                </p>
                <p style="font-size:11px; margin:4px 0 0;">
                  <a href="${unsubscribeUrl}" style="color:#f59e0b; text-decoration:underline;">Unsubscribe from daily emails</a>
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
    from: fromEmail, // Use the from_email configured in SendGrid integration
    subject,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log(`[DailyEmail] ✅ Sent to ${to}`);
  } catch (error: any) {
    console.error(`[DailyEmail] ❌ Failed to send to ${to}:`, error);
    if (error.response?.body?.errors) {
      console.error('[DailyEmail] SendGrid error details:', JSON.stringify(error.response.body.errors, null, 2));
    }
    throw error;
  }
}
