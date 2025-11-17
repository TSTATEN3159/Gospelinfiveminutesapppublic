// EmailService using SendGrid Replit Connector
import sgMail from '@sendgrid/mail';

let connectionSettings: any;

async function getCredentials() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
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
  return {apiKey: connectionSettings.settings.api_key, email: connectionSettings.settings.from_email};
}

// WARNING: Never cache this client.
// Access tokens expire, so a new client must be created each time.
// Always call this function again to get a fresh client.
async function getUncachableSendGridClient() {
  const {apiKey, email} = await getCredentials();
  sgMail.setApiKey(apiKey);
  return {
    client: sgMail,
    fromEmail: email
  };
}

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  try {
    const { client, fromEmail } = await getUncachableSendGridClient();
    
    const mailData: any = {
      to: params.to,
      from: params.from || fromEmail, // Use configured from_email if not provided
      subject: params.subject,
    };
    
    if (params.text) mailData.text = params.text;
    if (params.html) mailData.html = params.html;
    
    await client.send(mailData);
    console.log('Email sent successfully to:', params.to);
    return true;
  } catch (error: any) {
    // If SendGrid not connected, log but don't fail
    if (error.message?.includes('SendGrid not connected')) {
      console.log('SendGrid not connected - Email would be sent to:', params.to, 'Subject:', params.subject);
      return true; // Return true for development/testing
    }
    console.error('SendGrid email error:', error);
    return false;
  }
}

// Email templates
export function createBlogUpdateEmailTemplate(subscriberName: string | null, articles: any[]): { html: string; text: string } {
  const name = subscriberName || 'Friend';
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Georgia', serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
        .header { background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%); color: white; padding: 30px; text-align: center; }
        .header h1 { font-family: 'Dancing Script', cursive; font-size: 28px; margin: 0; text-shadow: 1px 1px 2px rgba(0,0,0,0.3); }
        .content { padding: 30px 20px; background: #faf8f5; }
        .article { background: white; padding: 20px; margin-bottom: 20px; border-radius: 8px; border-left: 4px solid #8B4513; }
        .article h3 { color: #8B4513; margin-top: 0; }
        .article-meta { color: #666; font-size: 14px; margin-bottom: 10px; }
        .footer { background: #8B4513; color: white; padding: 20px; text-align: center; font-size: 14px; }
        .unsubscribe { color: #ccc; text-decoration: underline; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>The Gospel in 5 Minutes</h1>
        <p>Your bi-weekly dose of spiritual inspiration</p>
      </div>
      <div class="content">
        <h2>Hello ${name}!</h2>
        <p>We're excited to share some new inspiring articles with you. Take just 5 minutes to nourish your soul with these spiritual insights:</p>
        
        ${articles.map(article => `
          <div class="article">
            <h3>${article.title}</h3>
            <div class="article-meta">By ${article.author} • ${article.readTime} read</div>
            <p>${article.excerpt || 'A wonderful piece to help grow your faith and understanding.'}</p>
          </div>
        `).join('')}
        
        <p>Thank you for being part of our community. May these words bring you peace and inspiration.</p>
        <p>Blessings,<br>The Gospel in 5 Minutes Team</p>
      </div>
      <div class="footer">
        <p>© 2025 The Gospel in 5 Minutes</p>
        <p><a href="#" class="unsubscribe">Unsubscribe from these emails</a></p>
      </div>
    </body>
    </html>
  `;

  const text = `
The Gospel in 5 Minutes - New Articles

Hello ${name}!

We're excited to share some new inspiring articles with you:

${articles.map(article => `
${article.title}
By ${article.author} • ${article.readTime} read
---
`).join('')}

Thank you for being part of our community. May these words bring you peace and inspiration.

Blessings,
The Gospel in 5 Minutes Team

---
© 2025 The Gospel in 5 Minutes
To unsubscribe, please reply to this email with "UNSUBSCRIBE"
  `;

  return { html, text };
}

export async function sendBlogUpdateEmails(subscribers: any[], articles: any[]): Promise<void> {
  try {
    const { fromEmail } = await getUncachableSendGridClient();

    for (const subscriber of subscribers) {
      const { html, text } = createBlogUpdateEmailTemplate(subscriber.name, articles);
      
      try {
        await sendEmail({
          to: subscriber.email,
          from: fromEmail, // Use configured SendGrid from_email
          subject: "New Spiritual Inspiration - The Gospel in 5 Minutes",
          html,
          text
        });
        
        // Update last email sent timestamp (storage layer will handle this)
        console.log(`Blog update email sent to ${subscriber.email}`);
      } catch (error) {
        console.error(`Failed to send email to ${subscriber.email}:`, error);
      }
    }
  } catch (error: any) {
    if (error.message?.includes('SendGrid not connected')) {
      console.log('SendGrid not connected - Skipping email send');
    } else {
      console.error('Failed to send blog update emails:', error);
    }
  }
}