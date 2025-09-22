import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import OpenAI from "openai";
import Stripe from "stripe";
import { storage } from "./storage";
import { insertSubscriberSchema, insertAppUserSchema, insertFriendshipSchema } from "@shared/schema";
import { sendBlogUpdateEmails } from "./email-service";
import { appMonitor } from "./services/appMonitor";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Lazy initialize Stripe only when needed for donations
let stripe: Stripe | null = null;
const getStripeClient = (): Stripe => {
  if (!stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
    }
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2023-10-16" as any,
    });
  }
  return stripe;
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Stripe webhook endpoint for secure donation recording
  app.post('/api/stripe-webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'] as string;
    let event: Stripe.Event;

    try {
      const stripe = getStripeClient();
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
      
      if (!webhookSecret) {
        console.error('Missing STRIPE_WEBHOOK_SECRET environment variable');
        return res.status(400).json({ error: 'Webhook secret not configured' });
      }

      // Verify webhook signature
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return res.status(400).json({ error: 'Webhook signature verification failed' });
    }

    // Handle the event
    try {
      if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        
        // Check if we've already recorded this donation
        const existingDonation = await storage.getDonationByPaymentIntent(paymentIntent.id);
        if (existingDonation) {
          console.log('Donation already recorded:', paymentIntent.id);
          return res.status(200).json({ received: true });
        }

        // Record the verified donation from Stripe
        await storage.recordDonation({
          amountCents: paymentIntent.amount, // Stripe amounts are already in cents
          currency: paymentIntent.currency.toUpperCase(),
          paymentIntentId: paymentIntent.id,
          status: 'succeeded', // Verified by Stripe
          metadata: JSON.stringify({
            app: 'Gospel in 5 Minutes',
            type: 'donation',
            amount_formatted: `$${(paymentIntent.amount / 100).toFixed(2)}`,
            stripe_created: paymentIntent.created,
          })
        });

        console.log('Donation recorded successfully:', {
          id: paymentIntent.id,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency
        });
      }

      res.status(200).json({ received: true });
    } catch (error) {
      console.error('Error processing webhook:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Payment verification endpoint - verifies payment with Stripe and records donation
  app.post("/api/verify-payment", async (req, res) => {
    try {
      const { paymentIntentId } = req.body;
      
      if (!paymentIntentId) {
        return res.status(400).json({
          success: false,
          error: "Payment intent ID is required"
        });
      }

      const stripe = getStripeClient();
      
      // Check if we've already recorded this donation
      const existingDonation = await storage.getDonationByPaymentIntent(paymentIntentId);
      if (existingDonation) {
        return res.json({ 
          success: true, 
          message: "Donation already recorded",
          donation: existingDonation 
        });
      }

      // Retrieve payment intent from Stripe to verify
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      
      if (paymentIntent.status === 'succeeded') {
        // Record the verified donation
        const donation = await storage.recordDonation({
          amountCents: paymentIntent.amount,
          currency: paymentIntent.currency.toUpperCase(),
          paymentIntentId: paymentIntent.id,
          status: 'succeeded',
          metadata: JSON.stringify({
            app: 'Gospel in 5 Minutes',
            type: 'donation',
            amount_formatted: `$${(paymentIntent.amount / 100).toFixed(2)}`,
            stripe_created: paymentIntent.created,
            verified_at: new Date().toISOString()
          })
        });

        console.log('Payment verified and donation recorded:', {
          id: paymentIntent.id,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency
        });

        return res.json({ 
          success: true, 
          donation,
          message: "Payment verified and donation recorded"
        });
      } else {
        return res.status(400).json({
          success: false,
          error: `Payment not successful. Status: ${paymentIntent.status}`
        });
      }
    } catch (error: any) {
      console.error("Payment verification error:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to verify payment" 
      });
    }
  });

  // Temporary admin endpoint to find recent payment intents
  app.get("/api/find-recent-payments", async (req, res) => {
    try {
      const stripe = getStripeClient();
      
      // Get recent payment intents from Stripe
      const paymentIntents = await stripe.paymentIntents.list({
        limit: 10,
        created: {
          gte: Math.floor(Date.now() / 1000) - (24 * 60 * 60), // Last 24 hours
        }
      });

      const payments = paymentIntents.data.map(pi => ({
        id: pi.id,
        amount: pi.amount,
        currency: pi.currency,
        status: pi.status,
        created: new Date(pi.created * 1000).toISOString()
      }));

      res.json({ 
        success: true, 
        payments 
      });
    } catch (error: any) {
      console.error("Error finding recent payments:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to find recent payments" 
      });
    }
  });

  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // API.Bible integration for multiple Bible versions
  const getApiBibleVerse = async (bibleId: string = 'de4e12af7f28f599-02', verseId?: string) => {
    const API_KEY = process.env.API_BIBLE_KEY;
    if (!API_KEY) {
      throw new Error('API_BIBLE_KEY not configured');
    }

    const endpoint = verseId 
      ? `/bibles/${bibleId}/verses/${verseId}` 
      : `/bibles/${bibleId}/verses/JHN.3.16`; // Default to John 3:16
    
    const response = await fetch(`https://api.scripture.api.bible/v1${endpoint}`, {
      headers: {
        'api-key': API_KEY
      }
    });
    
    if (!response.ok) {
      throw new Error(`API.Bible request failed: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data;
  };

  // Bible version mapping - maps abbreviations to API.Bible IDs
  const bibleVersionMapping: { [key: string]: { id: string, name: string } } = {
    'NIV': { id: 'de4e12af7f28f599-02', name: 'New International Version' },
    'KJV': { id: 'de4e12af7f28f599-01', name: 'King James Version' },
    'ESV': { id: '01b29f4e-0790-11e9-8515-23df8c4a3ba3', name: 'English Standard Version' },
    'NLT': { id: '01b29f4e-0790-11e9-8b69-5ba9a4dbc48e', name: 'New Living Translation' },
    'MSG': { id: '01b29f4e-0790-11e9-8c1b-4b8a3ba3f8d8', name: 'The Message' }
  };

  // Daily verse selection based on day of year for consistency
  const getDailyVerseReference = (): string => {
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    const verses = [
      'JHN.3.16', 'PSA.23.1', 'PRO.3.5-6', 'JER.29.11', 'PHP.4.13',
      'ROM.8.28', 'ISA.41.10', 'JHN.14.6', 'PSA.119.105', 'MAT.28.20',
      'HEB.11.1', 'ROM.10.9', 'EPH.2.8-9', 'PSA.46.10', 'JHN.15.13',
      'ROM.5.8', 'PSA.121.1-2', 'JHN.10.10', 'PHP.4.19', 'MAT.11.28',
      'PSA.34.18', 'ROM.12.2', 'JHN.1.1', 'PSA.91.2', 'EPH.6.10',
      'JOS.1.9', 'PSA.27.1', 'ROM.15.13', 'JHN.16.33', 'PSA.18.2'
    ];
    return verses[dayOfYear % verses.length];
  };

  // Get daily verse from API.Bible
  app.get("/api/daily-verse", async (req, res) => {
    try {
      const version = req.query.version as string || 'NIV';
      const versionInfo = bibleVersionMapping[version.toUpperCase()];
      
      if (!versionInfo) {
        return res.status(400).json({ 
          success: false, 
          error: `Unsupported Bible version: ${version}. Supported versions: ${Object.keys(bibleVersionMapping).join(', ')}` 
        });
      }
      
      const dailyReference = getDailyVerseReference();
      const verse = await getApiBibleVerse(versionInfo.id, dailyReference);
      
      // Parse reference to extract components
      const refParts = verse.reference.match(/^(.+?)\s+(\d+):(\d+(?:-\d+)?)$/);
      
      const result = {
        text: verse.content.replace(/<[^>]*>/g, '').trim(), // Remove HTML tags
        reference: verse.reference,
        book: refParts ? refParts[1] : 'Unknown',
        chapter: refParts ? refParts[2] : '1',
        verse: refParts ? refParts[3] : '1',
        translation: version.toUpperCase(),
        translationName: versionInfo.name,
        date: new Date().toDateString()
      };
      
      res.json({ success: true, verse: result });
    } catch (error) {
      console.error('Error fetching daily verse:', error);
      
      // Fallback to inspirational verses with requested translation noted
      const requestedVersion = req.query.version as string || 'NIV';
      const fallbackVerses = [
        {
          text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
          reference: "Proverbs 3:5-6",
          book: "Proverbs",
          chapter: "3",
          verse: "5-6",
          translation: "NIV",
          translationName: "New International Version (Fallback)",
          date: new Date().toDateString()
        },
        {
          text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, to give you hope and a future.",
          reference: "Jeremiah 29:11",
          book: "Jeremiah",
          chapter: "29",
          verse: "11",
          translation: "NIV",
          translationName: "New International Version (Fallback)",
          date: new Date().toDateString()
        }
      ];
      
      const randomVerse = fallbackVerses[Math.floor(Math.random() * fallbackVerses.length)];
      res.json({ 
        success: true, 
        verse: randomVerse, 
        fallback: true,
        requestedVersion 
      });
    }
  });

  // Get available Bible versions (using our supported mapping)
  app.get("/api/bible-versions", async (req, res) => {
    try {
      const versions = Object.entries(bibleVersionMapping).map(([abbrev, info]) => ({
        id: info.id,
        abbreviation: abbrev,
        name: info.name,
        language: 'English'
      }));
      
      res.json({ success: true, versions });
    } catch (error) {
      console.error('Error returning Bible versions:', error);
      res.status(500).json({ success: false, error: 'Failed to get Bible versions' });
    }
  });

  // Bible Search OpenAI Route - for retrieving Bible chapters and verses
  const bibleSearchSchema = z.object({
    query: z.string().min(1).max(100), // e.g. "John 3:16" or "Psalm 23"
    version: z.string().optional().default("NIV"), // Bible version
  });

  // Topical Bible Search - for finding verses related to specific topics
  const topicalSearchSchema = z.object({
    topic: z.string().min(1).max(50), // e.g. "salvation", "faith", "moses", "paul"
    version: z.string().optional().default("NIV"), // Bible version
  });

  // Predefined topical searches with carefully selected verses
  const topicalVerseDatabase = {
    "kingdom of god": [
      "MAT.6.33", "MRK.1.15", "LUK.17.21", "JHN.3.3", "ROM.14.17", 
      "1CO.4.20", "COL.1.13", "MAT.5.3", "MAT.13.31"
    ],
    "salvation": [
      "ROM.10.9", "EPH.2.8", "EPH.2.9", "JHN.3.16", "ACT.4.12", "ROM.6.23",
      "TIT.3.5", "2CO.5.17", "1JN.5.13", "ROM.1.16", "JHN.14.6", "ROM.5.8", "1PE.1.23"
    ],
    "faith": [
      "HEB.11.1", "ROM.10.17", "EPH.2.8", "HEB.11.6", "2CO.5.7",
      "MAT.17.20", "MRK.11.22", "GAL.2.20", "ROM.1.17"
    ],
    "prayer": [
      "MAT.6.9", "MAT.6.11", "1TH.5.17", "PHP.4.6", "PHP.4.7", "JHN.14.13", "JHN.14.14", "1JN.5.14",
      "JAM.5.16", "LUK.11.9", "MRK.11.24", "COL.4.2", "EPH.6.18", "ROM.8.26", "MAT.7.7"
    ],
    "giving": [
      "2CO.9.7", "MAL.3.10", "LUK.6.38", "ACT.20.35", "1TI.6.17", "1TI.6.18",
      "PRO.11.25", "MAT.6.19", "MAT.6.20", "2CO.8.9", "HEB.13.16", "PRO.19.17", "LUK.14.13"
    ],
    "kingdom character": [
      "MAT.5.3", "MAT.5.4", "MAT.5.9", "GAL.5.22", "GAL.5.23", "1CO.13.4", "1CO.13.5", "PHP.4.8", "COL.3.12",
      "2PE.1.5", "2PE.1.6", "1TI.6.11", "TIT.2.11", "ROM.12.9", "ROM.12.10", "EPH.4.32", "MIC.6.8"
    ],
    // Biblical figures
    "moses": [
      "EXO.3.4", "EXO.14.13", "EXO.14.14", "DEU.34.10", "HEB.11.24", "HEB.11.25", "NUM.12.3",
      "EXO.33.11", "DEU.18.18", "EXO.7.1", "NUM.20.12", "DEU.34.5"
    ],
    "david": [
      "1SA.16.7", "PSA.23.1", "2SA.7.28", "1SA.17.45", "PSA.51.10"
    ],
    "paul": [
      "ACT.9.15", "PHP.3.13", "PHP.3.14", "2TI.4.7", "2TI.4.8", "GAL.2.20", "1CO.15.10",
      "ACT.13.9", "ROM.1.1", "1CO.9.16", "EPH.3.8", "1TI.1.15", "ROM.15.20"
    ],
    "peter": [
      "MAT.16.16", "JHN.21.15", "JHN.21.16", "JHN.21.17", "ACT.2.14", "1PE.5.8", "2PE.3.18",
      "MAT.14.29", "ACT.10.34", "1PE.2.9", "ACT.4.13", "GAL.2.7"
    ],
    "jesus": [
      "JHN.14.6", "JHN.8.12", "JHN.10.11", "MAT.11.28", "JHN.1.1",
      "PHP.2.5", "PHP.2.6", "PHP.2.7", "HEB.4.15", "REV.1.8", "JHN.3.16", "MAT.28.18", "LUK.19.10"
    ],
    "adam": [
      "GEN.1.27", "GEN.2.7", "ROM.5.12", "1CO.15.22", "GEN.3.19"
    ]
  };

  // Topic explanations based on Biblical knowledge
  const topicalExplanations = {
    "kingdom of god": {
      title: "The Kingdom of God",
      description: "The Kingdom of God refers to God's sovereign rule and reign, both in heaven and on earth. It represents God's divine authority, His righteous government, and the realm where His will is perfectly done. Jesus taught extensively about this kingdom, describing it as both a present reality in the hearts of believers and a future hope when Christ returns.",
      keyThemes: ["God's sovereignty", "Righteousness and justice", "Present and future reality", "Spiritual transformation"]
    },
    "salvation": {
      title: "Salvation",
      description: "Salvation is God's gracious deliverance of humanity from sin and its consequences. It is a free gift from God, received by faith in Jesus Christ, not by human works or merit. Salvation includes forgiveness of sins, reconciliation with God, and eternal life.",
      keyThemes: ["Grace through faith", "Freedom from sin", "Eternal life", "Reconciliation with God"]
    },
    "faith": {
      title: "Faith",
      description: "Faith is confident trust and belief in God and His promises, even when we cannot see the full picture. It is both a gift from God and a choice we make to trust Him. Biblical faith involves believing God's word, depending on His character, and acting on that belief.",
      keyThemes: ["Trust in God", "Believing His promises", "Acting on belief", "Confidence in the unseen"]
    },
    "prayer": {
      title: "Prayer",
      description: "Prayer is communication with God - both speaking to Him and listening for His voice. It includes worship, confession, thanksgiving, and making requests. Prayer is the means by which believers maintain fellowship with God and participate in His work on earth.",
      keyThemes: ["Communication with God", "Fellowship and intimacy", "Intercession and petition", "Worship and thanksgiving"]
    },
    "giving": {
      title: "Giving",
      description: "Biblical giving reflects God's generous nature and acknowledges that everything we have belongs to Him. It includes financial giving, time, talents, and resources. Generous giving demonstrates trust in God's provision and love for others.",
      keyThemes: ["Generosity reflects God's nature", "Stewardship of resources", "Trust in God's provision", "Love in action"]
    },
    "kingdom character": {
      title: "Kingdom Character",
      description: "Kingdom character refers to the moral and spiritual qualities that should characterize those who belong to God's kingdom. These traits reflect God's own character and are developed through the Holy Spirit's work in a believer's life.",
      keyThemes: ["Christ-like character", "Fruit of the Spirit", "Moral transformation", "Reflecting God's nature"]
    },
    "moses": {
      title: "Moses",
      description: "Moses was the great prophet and lawgiver whom God used to deliver the Israelites from slavery in Egypt. He received the Ten Commandments and the Law at Mount Sinai and led God's people through 40 years in the wilderness toward the Promised Land.",
      keyThemes: ["Deliverer of Israel", "Prophet and lawgiver", "Faithful servant", "Intercession for the people"]
    },
    "david": {
      title: "King David",
      description: "David was Israel's greatest king, described as 'a man after God's own heart.' He was a shepherd, warrior, poet, and king who wrote many of the Psalms. Despite his failures, David's heart consistently turned back to God in repentance and worship.",
      keyThemes: ["Man after God's heart", "Worship and praise", "Repentance and forgiveness", "Messianic lineage"]
    },
    "paul": {
      title: "The Apostle Paul",
      description: "Paul, formerly known as Saul, was dramatically converted from a persecutor of Christians to become the greatest missionary and theologian of the early church. He wrote much of the New Testament and planted churches throughout the Roman Empire.",
      keyThemes: ["Dramatic conversion", "Missionary to the Gentiles", "Grace and justification", "Perseverance in ministry"]
    },
    "peter": {
      title: "The Apostle Peter",
      description: "Peter was one of Jesus' closest disciples and became a key leader in the early church. Though he denied Jesus during the crucifixion, he was restored and became a bold preacher of the Gospel, eventually martyred for his faith.",
      keyThemes: ["Impulsive but devoted disciple", "Restoration after failure", "Bold preaching", "Church leadership"]
    },
    "jesus": {
      title: "Jesus Christ",
      description: "Jesus Christ is the Son of God, fully God and fully man, who came to earth to save humanity from sin. He lived a perfect life, died on the cross for our sins, and rose again, proving His victory over sin and death.",
      keyThemes: ["Son of God", "Savior of the world", "Perfect sacrifice", "Resurrection and eternal life"]
    },
    "adam": {
      title: "Adam",
      description: "Adam was the first human being, created by God in His own image. He lived in perfect fellowship with God in the Garden of Eden until he disobeyed God's command, bringing sin and death into the world.",
      keyThemes: ["First human", "Made in God's image", "The Fall", "Representative of humanity"]
    }
  };

  app.post("/api/topical-search", async (req, res) => {
    try {
      const { topic, version } = topicalSearchSchema.parse(req.body);
      console.log("Topical Search - Topic:", topic, "Version:", version);
      
      const normalizedTopic = topic.toLowerCase().trim();
      
      // Check if we have predefined verses for this topic
      const verseRefs = topicalVerseDatabase[normalizedTopic] || topicalVerseDatabase[normalizedTopic.replace(/[^a-z\s]/g, '')] || [];
      const explanation = topicalExplanations[normalizedTopic] || topicalExplanations[normalizedTopic.replace(/[^a-z\s]/g, '')];
      
      if (verseRefs.length === 0 && !explanation) {
        // Topic not found in our database, search using generic approach
        return res.json({
          success: true,
          topic: topic,
          explanation: {
            title: topic.charAt(0).toUpperCase() + topic.slice(1),
            description: `Information about "${topic}" not found in our topical database. Please try one of the preset topics or search for a specific Bible verse reference instead.`,
            keyThemes: ["Please try a specific verse reference", "Or use one of the preset topics"]
          },
          verses: [],
          references: []
        });
      }
      
      // Get the Bible version info
      const versionInfo = bibleVersionMapping[version.toUpperCase()] || bibleVersionMapping['NIV'];
      
      // Fetch the actual verses from API.Bible - Get 3 key verses with full text
      const verses = [];
      const allReferences = [...verseRefs]; // Keep all references for clickable links
      let successfulFetches = 0;
      
      for (const verseRef of verseRefs.slice(0, 5)) { // Try up to 5 verses to get at least 3 successful ones
        if (successfulFetches >= 3) break; // Stop once we have 3 successful verses
        
        try {
          const verse = await getApiBibleVerse(versionInfo.id, verseRef);
          
          if (verse && verse.content && verse.reference) {
            const refParts = verse.reference.match(/^(.+?)\s+(\d+):(\d+(?:-\d+)?)$/);
            const cleanText = verse.content.replace(/<[^>]*>/g, '').trim();
            
            if (cleanText.length > 0) { // Only add non-empty verses
              verses.push({
                text: cleanText,
                reference: verse.reference,
                book: refParts ? refParts[1] : 'Unknown',
                chapter: refParts ? refParts[2] : '1',
                verse: refParts ? refParts[3] : '1',
                translation: version.toUpperCase()
              });
              successfulFetches++;
            }
          }
        } catch (error) {
          console.error(`Error fetching verse ${verseRef}:`, error);
          // Continue with other verses even if one fails
        }
      }
      
      // If we couldn't fetch any verses from API, provide fallback content
      if (verses.length === 0 && explanation) {
        console.log(`No verses fetched for ${normalizedTopic}, providing topic information only`);
      }

      // Prepare 10+ references for clickable navigation
      const references = allReferences.map(ref => {
        // Convert API.Bible format (MAT.6.33) to readable format (Matthew 6:33)
        const bookMap: { [key: string]: string } = {
          'MAT': 'Matthew', 'MRK': 'Mark', 'LUK': 'Luke', 'JHN': 'John',
          'ACT': 'Acts', 'ROM': 'Romans', '1CO': '1 Corinthians', '2CO': '2 Corinthians',
          'GAL': 'Galatians', 'EPH': 'Ephesians', 'PHP': 'Philippians', 'COL': 'Colossians',
          '1TH': '1 Thessalonians', '2TH': '2 Thessalonians', '1TI': '1 Timothy', '2TI': '2 Timothy',
          'TIT': 'Titus', 'PHM': 'Philemon', 'HEB': 'Hebrews', 'JAM': 'James',
          '1PE': '1 Peter', '2PE': '2 Peter', '1JN': '1 John', '2JN': '2 John', '3JN': '3 John',
          'JUD': 'Jude', 'REV': 'Revelation', 'GEN': 'Genesis', 'EXO': 'Exodus',
          'LEV': 'Leviticus', 'NUM': 'Numbers', 'DEU': 'Deuteronomy', 'JOS': 'Joshua',
          'JDG': 'Judges', 'RUT': 'Ruth', '1SA': '1 Samuel', '2SA': '2 Samuel',
          '1KI': '1 Kings', '2KI': '2 Kings', '1CH': '1 Chronicles', '2CH': '2 Chronicles',
          'EZR': 'Ezra', 'NEH': 'Nehemiah', 'EST': 'Esther', 'JOB': 'Job',
          'PSA': 'Psalms', 'PRO': 'Proverbs', 'ECC': 'Ecclesiastes', 'SNG': 'Song of Songs',
          'ISA': 'Isaiah', 'JER': 'Jeremiah', 'LAM': 'Lamentations', 'EZK': 'Ezekiel',
          'DAN': 'Daniel', 'HOS': 'Hosea', 'JOL': 'Joel', 'AMO': 'Amos',
          'OBA': 'Obadiah', 'JON': 'Jonah', 'MIC': 'Micah', 'NAM': 'Nahum',
          'HAB': 'Habakkuk', 'ZEP': 'Zephaniah', 'HAG': 'Haggai', 'ZEC': 'Zechariah', 'MAL': 'Malachi'
        };
        
        const parts = ref.split('.');
        if (parts.length === 3) {
          const book = bookMap[parts[0]] || parts[0];
          const chapter = parts[1];
          const verse = parts[2];
          return `${book} ${chapter}:${verse}`;
        }
        return ref;
      });
      
      res.json({
        success: true,
        topic: explanation?.title || topic,
        explanation: explanation || {
          title: topic.charAt(0).toUpperCase() + topic.slice(1),
          description: `Biblical information about ${topic}`,
          keyThemes: ["Related biblical themes"]
        },
        verses,
        references,
        version: version.toUpperCase()
      });
      
    } catch (error) {
      console.error('Topical search error:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to retrieve topical information. Please try again.' 
      });
    }
  });

  app.post("/api/bible-search", async (req, res) => {
    try {
      const { query, version } = bibleSearchSchema.parse(req.body);
      console.log("Bible Search - Query:", query, "Version:", version);

      // Try API.Bible first, fallback to OpenAI if needed
      try {
        const API_KEY = process.env.API_BIBLE_KEY;
        if (API_KEY && query.length >= 3) {
          const bibleId = version === 'NIV' ? 'de4e12af7f28f599-02' : 'de4e12af7f28f599-01';
          const searchResponse = await fetch(`https://api.scripture.api.bible/v1/bibles/${bibleId}/search?query=${encodeURIComponent(query)}&limit=10`, {
            headers: {
              'api-key': API_KEY
            }
          });
          
          if (searchResponse.ok) {
            const searchData = await searchResponse.json();
            const verses = searchData.data.verses.map((verse: any) => {
              const refParts = verse.reference.match(/^(.+?)\s+(\d+):(\d+(?:-\d+)?)$/);
              
              return {
                text: verse.text.replace(/<[^>]*>/g, '').trim(),
                reference: verse.reference,
                book: refParts ? refParts[1] : 'Unknown',
                chapter: refParts ? refParts[2] : '1',
                verse: refParts ? refParts[3] : '1',
                translation: version
              };
            });
            
            if (verses.length > 0) {
              return res.json({ success: true, verses, source: 'api.bible' });
            }
          }
        }
      } catch (apiBibleError) {
        console.log('API.Bible search failed, falling back to OpenAI:', apiBibleError);
      }

      // Fallback to OpenAI for search
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a Bible scholar providing accurate Bible text. When given a Bible reference:
            1. Return the EXACT Bible text for the requested reference in the specified version (${version})
            2. If it's a chapter reference (e.g. "John 3"), return the ENTIRE chapter
            3. If it's a verse reference (e.g. "John 3:16"), return just that verse
            4. Always include the complete reference at the beginning
            5. Use proper formatting with verse numbers for chapters
            6. Be precise and accurate with the biblical text
            7. If the reference is unclear or doesn't exist, explain what's wrong and suggest corrections`
          },
          {
            role: "user", 
            content: `Please provide the Bible text for: ${query} (${version} version)`
          }
        ],
        max_completion_tokens: 2000 // Longer for full chapters
      });

      const content = response.choices[0].message.content;
      if (!content) {
        throw new Error("No response content from OpenAI");
      }

      res.json({
        success: true,
        text: content,
        reference: query,
        version: version,
        query: query
      });

    } catch (error) {
      console.error("Bible Search API error:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: "Invalid search query. Please provide a valid Bible reference."
        });
      }

      res.status(500).json({
        success: false,
        error: "I'm having trouble retrieving the Bible text right now. Please try again in a moment."
      });
    }
  });

  // Ask Pastor OpenAI Route
  const askPastorSchema = z.object({
    question: z.string().min(1).max(1000),
  });

  app.post("/api/ask-pastor", async (req, res) => {
    try {
      const { question } = askPastorSchema.parse(req.body);
      console.log("Ask Pastor - Question:", question);

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a wise, compassionate pastor providing Bible-based guidance. Always:
            1. Be encouraging and loving in your responses
            2. Include relevant Bible verses with references when applicable
            3. Provide practical, faith-based advice
            4. Keep responses concise but meaningful (2-3 paragraphs max)
            5. If you reference a Bible verse, include the full reference (book, chapter:verse)
            6. Respond in a warm, pastoral tone
            7. If the question is not faith/Bible related, gently redirect to spiritual matters`
          },
          {
            role: "user",
            content: question
          }
        ],
        max_completion_tokens: 400
      });

      const content = response.choices[0].message.content;
      if (!content) {
        throw new Error("No response content from OpenAI");
      }
      
      // Extract scripture reference if mentioned (simple pattern matching)
      const scriptureMatch = content.match(/(\d?\s?[A-Za-z]+\s+\d+:\d+(-\d+)?)/);
      const scriptureRef = scriptureMatch ? scriptureMatch[0] : null;
      
      res.json({
        success: true,
        response: content,
        scriptureRef: scriptureRef
      });

    } catch (error) {
      console.error("Ask Pastor API error:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: "Invalid question format. Please provide a valid question."
        });
      }

      res.status(500).json({
        success: false,
        error: "I'm having trouble connecting right now. Please try again in a moment."
      });
    }
  });

  // Bible Trivia Route - Using curated questions with Bible API verses
  const bibleTriviaSchema = z.object({
    difficulty: z.enum(['easy', 'medium', 'difficult']),
    count: z.number().min(1).max(10).default(10)
  });

  // Curated Bible trivia questions organized by difficulty
  const triviaQuestions = {
    easy: [
      {
        question: "Who built the ark to survive the great flood?",
        options: ["Moses", "Noah", "Abraham", "David"],
        correctAnswer: 1,
        verse: "GEN.6.19"
      },
      {
        question: "What did God create on the first day?",
        options: ["Animals", "Light", "Plants", "Humans"],
        correctAnswer: 1,
        verse: "GEN.1.3"
      },
      {
        question: "Who was swallowed by a great fish?",
        options: ["Jonah", "Job", "Joshua", "Jeremiah"],
        correctAnswer: 0,
        verse: "JON.1.17"
      },
      {
        question: "How many disciples did Jesus choose?",
        options: ["10", "11", "12", "13"],
        correctAnswer: 2,
        verse: "MAT.10.1"
      },
      {
        question: "What did Jesus turn water into at the wedding?",
        options: ["Bread", "Wine", "Oil", "Honey"],
        correctAnswer: 1,
        verse: "JHN.2.9"
      },
      {
        question: "Who betrayed Jesus with a kiss?",
        options: ["Peter", "John", "Judas", "Thomas"],
        correctAnswer: 2,
        verse: "MAT.26.49"
      },
      {
        question: "What were the names of Adam and Eve's first two sons?",
        options: ["Cain and Abel", "Jacob and Esau", "Isaac and Ishmael", "Peter and Andrew"],
        correctAnswer: 0,
        verse: "GEN.4.1"
      },
      {
        question: "How many days and nights did it rain during the flood?",
        options: ["30", "40", "50", "60"],
        correctAnswer: 1,
        verse: "GEN.7.12"
      },
      {
        question: "What did Moses part to help the Israelites escape Egypt?",
        options: ["The Jordan River", "The Red Sea", "The Dead Sea", "The Mediterranean Sea"],
        correctAnswer: 1,
        verse: "EXO.14.21"
      },
      {
        question: "Who was the strongest man in the Bible?",
        options: ["David", "Goliath", "Samson", "Solomon"],
        correctAnswer: 2,
        verse: "JDG.16.17"
      }
    ],
    medium: [
      {
        question: "Which king of Israel was known for his wisdom?",
        options: ["David", "Solomon", "Saul", "Hezekiah"],
        correctAnswer: 1,
        verse: "1KI.3.12"
      },
      {
        question: "What was Paul's name before his conversion?",
        options: ["Silas", "Saul", "Simon", "Stephen"],
        correctAnswer: 1,
        verse: "ACT.13.9"
      },
      {
        question: "How many plagues did God send upon Egypt?",
        options: ["7", "8", "9", "10"],
        correctAnswer: 3,
        verse: "EXO.7.14"
      },
      {
        question: "Which prophet was taken up to heaven in a whirlwind?",
        options: ["Elijah", "Elisha", "Isaiah", "Ezekiel"],
        correctAnswer: 0,
        verse: "2KI.2.11"
      },
      {
        question: "Who interpreted Pharaoh's dreams about seven fat and seven lean cows?",
        options: ["Daniel", "Joseph", "Moses", "Aaron"],
        correctAnswer: 1,
        verse: "GEN.41.25"
      },
      {
        question: "What was the name of the garden where Adam and Eve lived?",
        options: ["Eden", "Gethsemane", "Olive", "Paradise"],
        correctAnswer: 0,
        verse: "GEN.2.8"
      },
      {
        question: "How many years did the Israelites wander in the wilderness?",
        options: ["30", "40", "50", "70"],
        correctAnswer: 1,
        verse: "NUM.14.33"
      },
      {
        question: "Which Gospel was written by a tax collector?",
        options: ["Matthew", "Mark", "Luke", "John"],
        correctAnswer: 0,
        verse: "MAT.9.9"
      },
      {
        question: "What did Jesus say is the greatest commandment?",
        options: ["Do not steal", "Honor your parents", "Love the Lord your God", "Do not murder"],
        correctAnswer: 2,
        verse: "MAT.22.37"
      },
      {
        question: "Who was the first martyr of the Christian church?",
        options: ["James", "Stephen", "Peter", "Paul"],
        correctAnswer: 1,
        verse: "ACT.7.59"
      }
    ],
    difficult: [
      {
        question: "Which prophet saw a vision of a valley of dry bones?",
        options: ["Isaiah", "Jeremiah", "Ezekiel", "Daniel"],
        correctAnswer: 2,
        verse: "EZK.37.1"
      },
      {
        question: "How many books are in the Protestant Old Testament?",
        options: ["37", "38", "39", "40"],
        correctAnswer: 2,
        verse: null
      },
      {
        question: "Which king of Babylon saw the writing on the wall?",
        options: ["Nebuchadnezzar", "Belshazzar", "Darius", "Cyrus"],
        correctAnswer: 1,
        verse: "DAN.5.5"
      },
      {
        question: "What was the name of Abraham's nephew who was saved from Sodom?",
        options: ["Isaac", "Ishmael", "Lot", "Laban"],
        correctAnswer: 2,
        verse: "GEN.19.16"
      },
      {
        question: "Which apostle replaced Judas Iscariot?",
        options: ["Matthias", "Mark", "Luke", "Barnabas"],
        correctAnswer: 0,
        verse: "ACT.1.26"
      },
      {
        question: "How many years did Methuselah live?",
        options: ["929", "949", "959", "969"],
        correctAnswer: 3,
        verse: "GEN.5.27"
      },
      {
        question: "Which judge of Israel made a foolish vow concerning his daughter?",
        options: ["Gideon", "Jephthah", "Samson", "Samuel"],
        correctAnswer: 1,
        verse: "JDG.11.30"
      },
      {
        question: "What was the original language of most of the Old Testament?",
        options: ["Greek", "Latin", "Hebrew", "Aramaic"],
        correctAnswer: 2,
        verse: null
      },
      {
        question: "Which city was Jonah told to go to preach?",
        options: ["Babylon", "Nineveh", "Damascus", "Tyre"],
        correctAnswer: 1,
        verse: "JON.1.2"
      },
      {
        question: "How many silver pieces did Judas receive for betraying Jesus?",
        options: ["20", "25", "30", "35"],
        correctAnswer: 2,
        verse: "MAT.26.15"
      }
    ]
  };

  app.post("/api/bible-trivia", async (req, res) => {
    try {
      const { difficulty, count } = bibleTriviaSchema.parse(req.body);
      console.log("Bible Trivia - Difficulty:", difficulty, "Count:", count);

      // Get questions for the specified difficulty
      const questionPool = triviaQuestions[difficulty];
      
      // Shuffle and select the requested number of questions
      const shuffled = [...questionPool].sort(() => Math.random() - 0.5);
      const selectedQuestions = shuffled.slice(0, Math.min(count, questionPool.length));

      // Fetch actual verse text from Bible API for questions that have verse references
      const questionsWithVerses = await Promise.all(
        selectedQuestions.map(async (q, index) => {
          let verseReference = null;
          let verseText = null;
          
          if (q.verse) {
            try {
              const verseData = await getApiBibleVerse('de4e12af7f28f599-02', q.verse);
              if (verseData) {
                verseReference = verseData.reference;
                // Clean the HTML tags from the verse content
                verseText = verseData.content?.replace(/<[^>]*>/g, '').trim();
              }
            } catch (error) {
              console.log(`Could not fetch verse ${q.verse} from Bible API:`, error);
              // Fallback to verse ID
              verseReference = q.verse;
            }
          }

          return {
            id: index + 1,
            question: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer,
            verse: verseReference || q.verse,
            verseText: verseText,
            difficulty: difficulty
          };
        })
      );

      res.json({
        success: true,
        questions: questionsWithVerses
      });

    } catch (error) {
      console.error("Bible Trivia API error:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: "Invalid request format. Please specify difficulty and count."
        });
      }

      res.status(500).json({
        success: false,
        error: "I'm having trouble loading trivia questions right now. Please try again in a moment."
      });
    }
  });

  // Stripe donation route for one-time payments
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { amount } = req.body;
      
      // Validate amount
      if (!amount || typeof amount !== 'number' || amount < 1 || amount > 10000) {
        return res.status(400).json({ 
          error: "Invalid amount. Must be between $1 and $10,000." 
        });
      }

      const stripeClient = getStripeClient();
    const paymentIntent = await stripeClient.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: "usd",
        metadata: {
          app: "Gospel in 5 Minutes",
          type: "donation"
        }
      });
      
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      console.error("Stripe payment intent error:", error);
      res.status(500).json({ 
        error: "Error creating payment intent: " + error.message 
      });
    }
  });

  // Secure donation checkout for $5 Bible donations
  app.post("/api/create-donation-checkout", async (req, res) => {
    try {
      const stripeClient = getStripeClient();
      
      // Create Stripe Checkout session with fixed $5 amount (server-side controlled)
      const session = await stripeClient.checkout.sessions.create({
        payment_method_types: ['card'],
        automatic_payment_methods: {
          enabled: true,
        },
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Bible for Someone in Need',
              description: 'Help us place a Bible in the hands of someone who desperately needs to hear God\'s Word',
              images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop'],
            },
            unit_amount: 500, // $5.00 in cents - server-side controlled
          },
          quantity: 1,
        }],
        mode: 'payment',
        success_url: `${req.headers.origin || 'https://www.thegospelin5minutes.org'}/?donation=success`,
        cancel_url: `${req.headers.origin || 'https://www.thegospelin5minutes.org'}/?donation=cancelled`,
        metadata: {
          app: 'Gospel in 5 Minutes',
          type: 'bible_donation',
          amount: '5.00'
        },
        payment_intent_data: {
          metadata: {
            purpose: 'Bible distribution for those without access'
          }
        }
      });
      
      res.json({ url: session.url });
    } catch (error: any) {
      console.error("Stripe checkout creation error:", error);
      res.status(500).json({ 
        error: "Unable to create donation checkout session"
      });
    }
  });

  // Donation statistics endpoints
  app.get("/api/donation-stats", async (req, res) => {
    try {
      const donations = await storage.getAllDonations();
      
      const totalDonations = donations.reduce((sum, donation) => {
        return sum + (donation.amountCents / 100); // Convert cents to dollars
      }, 0);
      
      const monthlyDonations = donations
        .filter(donation => {
          const donationDate = new Date(donation.createdAt);
          const now = new Date();
          return donationDate.getMonth() === now.getMonth() && 
                 donationDate.getFullYear() === now.getFullYear();
        })
        .reduce((sum, donation) => {
          return sum + (donation.amountCents / 100); // Convert cents to dollars
        }, 0);
      
      const donationCount = donations.length;
      const biblesPurchased = Math.floor(totalDonations / 5); // Assuming $5 per Bible
      const biblesDistributed = Math.floor(biblesPurchased * 0.95); // 95% distribution rate

      res.json({
        success: true,
        stats: {
          totalDonations,
          monthlyDonations,
          donationCount,
          biblesPurchased,
          biblesDistributed,
          impactReach: biblesDistributed * 3 // Estimate 3 people reached per Bible
        }
      });
    } catch (error) {
      console.error("Get donation stats error:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to get donation statistics" 
      });
    }
  });


  // Christian Video Content Routes - Christian Context API + TBN+ integration
  app.get("/api/videos", async (req, res) => {
    try {
      const { category, limit = 10 } = req.query;

      // Define themes for different categories
      const themes = {
        sermon: ['Faith', 'Grace', 'God\'s Love', 'Salvation', 'Hope'],
        'gospel-tidbits': ['Wisdom', 'Encouragement', 'Peace', 'Joy', 'Strength'],
        'christian-advice': ['Guidance', 'Purpose', 'Relationships', 'Trust', 'Forgiveness']
      };

      const videos = [];
      const categoryThemes = themes[category as keyof typeof themes] || themes.sermon;
      const numVideos = Math.min(parseInt(limit as string), 10);

      // Fetch videos from Christian Context API in parallel for better performance
      const themePromises = categoryThemes.slice(0, numVideos).map(async (theme: string, i: number) => {
        try {
          const apiUrl = `https://getcontext.xyz/api/api.php?query=${encodeURIComponent(theme)}`;
          const response = await fetch(apiUrl);
          
          if (response.ok) {
            const data = await response.json();
            // API working correctly - debug logging removed
            
            // Ensure completeness of Bible data with fallbacks - using correct field names
            const verseReference = data.verse_reference || null;
            const verseText = data.verse_content || (verseReference ? `"Bible verse from ${verseReference}"` : null);
            const commentary = data.commentary_content || (verseReference ? `Explore the spiritual wisdom in ${verseReference}` : null);
            
            return {
              id: `context_${Date.now()}_${i}`,
              title: verseReference ? `${theme}: ${verseReference}` : `${theme} - Christian Wisdom`,
              description: verseText || `Explore biblical wisdom on ${theme.toLowerCase()} through Scripture and sermon insights.`,
              duration: data.duration || undefined, // Only use real duration from API
              category: category || 'sermon',
              views: data.views || undefined, // Only use real view count from API
              thumbnail: `https://images.unsplash.com/photo-${1507003211169 + i}?w=300&h=200&fit=crop`,
              videoUrl: data.sermon_url || null,
              verseReference,
              verseText,
              commentary,
              source: 'Christian Context API'
            };
          }
          return null;
        } catch (apiError: any) {
          console.error(`ERROR fetching ${theme}:`, apiError.message);
          return null;
        }
      });

      // Wait for all API calls to complete
      const apiResults = await Promise.allSettled(themePromises);
      
      // Add successful results to videos array
      apiResults.forEach((result: any) => {
        if (result.status === 'fulfilled' && result.value) {
          videos.push(result.value);
        }
      });

      // Add BibleProject content recommendations (embeddable animated Bible videos)
      const bibleProjectCategories = [
        {
          id: 'bibleproject_overview',
          title: 'BibleProject: Book Overviews',
          description: 'Beautiful animated videos explaining every book of the Bible in 5-10 minutes.',
          category: 'sermon',
          views: undefined,
          duration: undefined,
          source: 'BibleProject',
          // Use YouTube embed for BibleProject videos (they allow embedding)
          videoUrl: 'https://www.youtube.com/watch?v=GQI72THyO5I', // Genesis Overview
          verseReference: 'Genesis 1:1',
          verseText: 'In the beginning God created the heavens and the earth.',
          commentary: 'Explore the foundational themes of the Bible through BibleProject\'s animated overviews.',
          thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop'
        },
        {
          id: 'bibleproject_themes',
          title: 'BibleProject: Biblical Themes',
          description: 'Deep dives into biblical themes like justice, love, and redemption through animation.',
          category: 'christian-advice',
          views: undefined,
          duration: undefined,
          source: 'BibleProject',
          // Use YouTube embed for BibleProject theme videos
          videoUrl: 'https://www.youtube.com/watch?v=A14THPoc4-4', // Justice video
          verseReference: 'Micah 6:8',
          verseText: 'He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly and to love mercy and to walk humbly with your God.',
          commentary: 'Understanding biblical justice and how it applies to our lives today.',
          thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=200&fit=crop'
        }
      ];

      // Add BibleProject content to results
      if (!category || category === 'sermon') {
        videos.push(bibleProjectCategories[0]);
      }
      if (!category || category === 'christian-advice') {
        videos.push(bibleProjectCategories[1]);
      }

      res.json({
        success: true,
        videos: videos,
        total: videos.length,
        sources: ['Christian Context API', 'BibleProject']
      });

    } catch (error) {
      console.error("Video content API error:", error);
      res.status(500).json({
        success: false,
        error: "Unable to fetch video content. Please try again.",
        videos: []
      });
    }
  });

  // Blog articles endpoint using Christian Context API
  app.get("/api/blog-articles", async (req, res) => {
    try {
      const { limit = 5 } = req.query;

      // Christian blog themes for diverse content
      const blogThemes = [
        'Faith', 'Prayer', 'Grace', 'Hope', 'Peace', 
        'Wisdom', 'Trust', 'Love', 'Strength', 'Forgiveness',
        'Salvation', 'Joy', 'Guidance', 'Purpose', 'Relationships'
      ];

      const articles: any[] = [];
      const numArticles = Math.min(parseInt(limit as string), 10);

      // Fetch articles from Christian Context API in parallel
      const themePromises = blogThemes.slice(0, numArticles).map(async (theme: string, i: number) => {
        try {
          const apiUrl = `https://getcontext.xyz/api/api.php?query=${encodeURIComponent(theme)}`;
          const response = await fetch(apiUrl);
          
          if (response.ok) {
            const data = await response.json();
            
            // Transform API data to blog article format
            const verseReference = data.verse_reference || null;
            const verseText = data.verse_content || null;
            const commentary = data.commentary_content || null;
            
            // Create comprehensive article content from API data
            const fullContent = `
              ${verseReference ? `<h3>Scripture Focus: ${verseReference}</h3>` : `<h3>Exploring ${theme} in Christian Life</h3>`}
              ${verseText ? `<blockquote class="bible-verse">"${verseText}"</blockquote>` : ''}
              ${commentary ? `<div class="commentary">${commentary}</div>` : ''}
              
              <h4>Introduction</h4>
              <p>The biblical theme of ${theme.toLowerCase()} stands as one of the most profound and transformative aspects of our Christian faith. Throughout Scripture, we see countless examples of how God calls His people to embrace and embody this essential characteristic. As we dive deeper into understanding ${theme.toLowerCase()}, we discover that it's not merely a concept to comprehend, but a living reality meant to shape every aspect of our daily walk with Christ.</p>
              
              <p>In our modern world, filled with challenges and uncertainties, the biblical understanding of ${theme.toLowerCase()} offers us both comfort and direction. It serves as an anchor for our souls and a compass for our decisions. When we truly grasp what God's Word teaches about ${theme.toLowerCase()}, we find ourselves equipped to navigate life's complexities with wisdom and grace.</p>
              
              <h4>Biblical Foundation</h4>
              <p>The foundation of ${theme.toLowerCase()} in Scripture runs deep, woven throughout both the Old and New Testaments. From the earliest pages of Genesis to the final chapters of Revelation, we see this theme consistently presented as central to God's character and His desires for His people. The Hebrew and Greek words used to describe ${theme.toLowerCase()} carry rich meanings that go far beyond our modern understanding.</p>
              
              <p>In the Old Testament, we witness the patriarchs, kings, and prophets grappling with questions of ${theme.toLowerCase()}. Their stories serve as powerful examples of both triumph and failure, showing us the consequences of embracing or rejecting God's call to live out this principle. These narratives aren't merely historical accounts; they're timeless lessons that speak directly to our contemporary situations.</p>
              
              <p>The New Testament further develops our understanding through the teachings and example of Jesus Christ. He perfectly embodied ${theme.toLowerCase()} in His earthly ministry, demonstrating what it looks like when this biblical principle is lived out in human form. The apostles then took these teachings and applied them to the early church, giving us practical guidance for community life and personal growth.</p>
              
              <h4>Practical Application</h4>
              <p>Understanding ${theme.toLowerCase()} intellectually is only the beginning; the real transformation comes when we begin to apply these truths to our everyday lives. This application doesn't happen overnight but is a gradual process of spiritual growth and character development. It requires intentionality, prayer, and often the support of fellow believers who can encourage us along the way.</p>
              
              <p>In our relationships with family, friends, and colleagues, ${theme.toLowerCase()} manifests in countless ways. It influences how we communicate, how we handle conflict, how we show love and support, and how we respond to hurt or disappointment. When we allow biblical principles to guide these interactions, we become living testimonies of God's transforming power.</p>
              
              <p>Our professional lives also provide numerous opportunities to demonstrate ${theme.toLowerCase()}. Whether we're dealing with difficult customers, challenging deadlines, ethical dilemmas, or workplace conflicts, our response can either reflect Christ's character or fall short of His calling. The marketplace becomes a mission field where our integrity and character speak volumes about our faith.</p>
              
              <h4>Overcoming Challenges</h4>
              <p>Living out ${theme.toLowerCase()} in a fallen world isn't always easy. We face internal struggles with our own sinful nature, external pressures from a culture that often opposes biblical values, and spiritual warfare that seeks to undermine our faith. Recognizing these challenges is the first step toward overcoming them with God's help.</p>
              
              <p>When we fail to exemplify ${theme.toLowerCase()} as we should, God's grace provides both forgiveness and the power to start fresh. The Christian life isn't about perfection but about progress, and every failure becomes an opportunity to experience God's mercy anew and to grow in our understanding of His love.</p>
              
              <h4>Growing in Understanding</h4>
              <p>Our journey toward a deeper understanding of ${theme.toLowerCase()} continues throughout our lifetime. Through regular Bible study, prayer, fellowship with other believers, and the guidance of the Holy Spirit, we gradually mature in our faith and become more like Christ. This growth often comes through both joyful experiences and difficult trials that test and refine our character.</p>
              
              ${verseReference ? `<p>As we meditate on ${verseReference} today, let us consider how God's Word speaks directly to our current circumstances. This verse isn't merely ancient text but living truth that has the power to transform our perspective and guide our actions.</p>` : ''}
              
              <h4>Conclusion</h4>
              <p>The biblical theme of ${theme.toLowerCase()} challenges us to live differently than the world around us. It calls us to a higher standard, a deeper love, and a more authentic faith. As we continue to grow in our understanding and application of these truths, we become instruments of God's grace in a world that desperately needs to see His love in action.</p>
              
              <p>May we be people who not only understand ${theme.toLowerCase()} but who embody it in such a way that others are drawn to the source of our hope and strength. In doing so, we fulfill our calling as salt and light in this world, bringing glory to God and blessing to those around us.</p>
              
              <h4>Reflection Questions</h4>
              <ul>
              <li>How has your understanding of ${theme.toLowerCase()} grown over the past year?</li>
              <li>What specific areas of your life need more of this biblical principle?</li>
              <li>How can you encourage others in their journey toward greater ${theme.toLowerCase()}?</li>
              <li>What practical steps will you take this week to apply these truths?</li>
              </ul>
              
              <p><strong>Prayer:</strong> Heavenly Father, thank You for revealing Yourself to us through Your Word and for showing us what it means to live with authentic ${theme.toLowerCase()}. Help us to grow in our understanding of this vital aspect of Christian character. Transform our hearts and minds so that we might reflect Your nature more clearly to those around us. Give us strength to overcome the challenges we face and wisdom to apply Your truth in practical ways. Guide us by Your Spirit and help us to trust in Your perfect plan for our lives. May our lives be a testimony to Your goodness and grace. In Jesus' name, Amen.</p>
            `;

            return {
              id: `article_${Date.now()}_${i}`,
              title: verseReference ? `${theme}: Reflections on ${verseReference}` : `Walking in ${theme}: A Christian Perspective`,
              excerpt: verseText ? `"${verseText}" - Explore this powerful Scripture and discover how it applies to your Christian walk.` : `Discover biblical insights on ${theme.toLowerCase()} and how to apply God's truth to your daily life.`,
              content: fullContent,
              author: `Christian Context Ministry`,
              publishDate: new Date().toISOString().split('T')[0], // Today's date
              readTime: Math.floor(Math.random() * 4) + 3, // 3-6 minutes
              views: Math.floor(Math.random() * 5000) + 1000, // 1000-6000 views
              category: theme === 'Prayer' ? 'Prayer & Devotion' : 
                       theme === 'Faith' || theme === 'Trust' ? 'Faith & Trust' :
                       theme === 'Peace' || theme === 'Hope' ? 'Mental Health & Faith' :
                       theme === 'Grace' || theme === 'Salvation' ? 'Theology' :
                       'Christian Living',
              verseReference,
              verseText,
              source: 'Christian Context API'
            };
          }
          return null;
        } catch (apiError: any) {
          console.error(`ERROR fetching blog content for ${theme}:`, apiError.message);
          return null;
        }
      });

      // Wait for all API calls to complete
      const apiResults = await Promise.allSettled(themePromises);
      
      // Add successful results to articles array
      apiResults.forEach((result: any) => {
        if (result.status === 'fulfilled' && result.value) {
          articles.push(result.value);
        }
      });

      res.json({
        success: true,
        articles: articles as any[]
      });

    } catch (error) {
      console.error('Blog articles API error:', error);
      return res.status(500).json({ 
        success: false, 
        error: "Unable to load blog articles at this time" 
      });
    }
  });

  // Blog Subscription Routes
  app.post("/api/subscribe", async (req, res) => {
    try {
      const subscriberData = insertSubscriberSchema.parse(req.body);
      
      // Check if already subscribed
      const existingSubscriber = await storage.getSubscriber(subscriberData.email);
      if (existingSubscriber && existingSubscriber.isActive) {
        return res.json({
          success: true,
          message: "You're already subscribed to our blog updates!"
        });
      }
      
      // Create new subscriber or reactivate existing
      if (existingSubscriber && !existingSubscriber.isActive) {
        // Reactivate existing subscriber - need to fix this implementation
        const updatedSubscriber = await storage.createSubscriber(subscriberData); // For now, create new
        res.json({
          success: true,
          message: "Welcome back! Your subscription has been reactivated."
        });
      } else {
        // Create new subscriber
        const newSubscriber = await storage.createSubscriber(subscriberData);
        res.json({
          success: true,
          message: "Thank you for subscribing! You'll receive our bi-weekly updates.",
          subscriber: {
            email: newSubscriber.email,
            name: newSubscriber.name
          }
        });
      }
    } catch (error) {
      console.error("Subscription error:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: "Please provide a valid email address."
        });
      }
      
      res.status(500).json({
        success: false,
        error: "There was an issue processing your subscription. Please try again."
      });
    }
  });
  
  app.post("/api/unsubscribe", async (req, res) => {
    try {
      const { email } = z.object({ email: z.string().email() }).parse(req.body);
      
      const success = await storage.unsubscribe(email);
      if (success) {
        res.json({
          success: true,
          message: "You've been successfully unsubscribed from our blog updates."
        });
      } else {
        res.status(404).json({
          success: false,
          error: "Email address not found in our subscription list."
        });
      }
    } catch (error) {
      console.error("Unsubscribe error:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: "Please provide a valid email address."
        });
      }
      
      res.status(500).json({
        success: false,
        error: "There was an issue processing your unsubscribe request."
      });
    }
  });
  
  // Admin route to manually send blog updates (for testing/manual triggers)
  app.post("/api/send-blog-updates", async (req, res) => {
    try {
      const subscribers = await storage.getAllActiveSubscribers();
      
      if (subscribers.length === 0) {
        return res.json({
          success: true,
          message: "No active subscribers to send updates to."
        });
      }
      
      // Mock articles for now - in a real implementation, these would come from a CMS or database
      const articles = [
        {
          title: "Walking in Faith Through Difficult Times",
          author: "Pastor Michael Chen",
          readTime: "4 min",
          excerpt: "Learn how to maintain your faith when life gets challenging, with biblical wisdom and practical guidance."
        },
        {
          title: "The Power of Daily Prayer", 
          author: "Sarah Johnson",
          readTime: "3 min",
          excerpt: "Discover how a consistent prayer life can transform your relationship with God and bring peace to your heart."
        }
      ];
      
      await sendBlogUpdateEmails(subscribers, articles);
      
      // Update last email sent for all subscribers
      for (const subscriber of subscribers) {
        await storage.updateLastEmailSent(subscriber.email);
      }
      
      res.json({
        success: true,
        message: `Blog updates sent to ${subscribers.length} subscribers.`
      });
      
    } catch (error) {
      console.error("Send blog updates error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to send blog updates."
      });
    }
  });
  
  // Get subscriber count (for admin/analytics)
  app.get("/api/subscribers/count", async (req, res) => {
    try {
      const subscribers = await storage.getAllActiveSubscribers();
      res.json({
        success: true,
        count: subscribers.length
      });
    } catch (error) {
      console.error("Get subscriber count error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to get subscriber count."
      });
    }
  });

  // App User Routes
  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertAppUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getAppUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: "A user with this email already exists."
        });
      }
      
      const newUser = await storage.createAppUser(userData);
      res.json({
        success: true,
        message: "User profile created successfully!",
        user: {
          id: newUser.id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email
        }
      });
    } catch (error) {
      console.error("Create user error:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: "Please provide valid user information."
        });
      }
      
      res.status(500).json({
        success: false,
        error: "Failed to create user profile."
      });
    }
  });

  app.get("/api/users/search", async (req, res) => {
    try {
      const { q } = z.object({ q: z.string().min(1) }).parse(req.query);
      
      const users = await storage.searchAppUsers(q);
      
      res.json({
        success: true,
        users: users.map(user => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }))
      });
    } catch (error) {
      console.error("Search users error:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: "Please provide a search query."
        });
      }
      
      res.status(500).json({
        success: false,
        error: "Failed to search users."
      });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const { id } = z.object({ id: z.string().min(1) }).parse(req.params);
      
      const user = await storage.getAppUser(id);
      if (!user) {
        return res.status(404).json({
          success: false,
          error: "User not found."
        });
      }
      
      res.json({
        success: true,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          joinDate: user.joinDate
        }
      });
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to get user information."
      });
    }
  });

  // Delete user account - Apple Store compliance requirement
  app.delete("/api/users/:id", async (req, res) => {
    try {
      const { id } = z.object({ id: z.string().min(1) }).parse(req.params);
      
      // Check if user exists
      const user = await storage.getAppUser(id);
      if (!user) {
        return res.status(404).json({
          success: false,
          error: "User not found."
        });
      }
      
      // Delete the user account and all related data
      const deleted = await storage.deleteAppUser(id);
      
      if (deleted) {
        res.json({
          success: true,
          message: "User account and all associated data have been permanently deleted."
        });
      } else {
        res.status(500).json({
          success: false,
          error: "Failed to delete user account."
        });
      }
    } catch (error) {
      console.error("Delete user error:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: "Invalid user ID."
        });
      }
      
      res.status(500).json({
        success: false,
        error: "Failed to delete user account."
      });
    }
  });

  // Friends Routes
  app.post("/api/friends/request", async (req, res) => {
    try {
      const { requesterId, addresseeId } = z.object({
        requesterId: z.string().min(1),
        addresseeId: z.string().min(1)
      }).parse(req.body);
      
      // Check if users exist
      const requester = await storage.getAppUser(requesterId);
      const addressee = await storage.getAppUser(addresseeId);
      
      if (!requester || !addressee) {
        return res.status(404).json({
          success: false,
          error: "One or both users not found."
        });
      }
      
      // Check if friendship already exists
      const existingFriendship = await storage.getFriendship(requesterId, addresseeId);
      if (existingFriendship) {
        return res.status(400).json({
          success: false,
          error: "Friend request already exists or you are already friends."
        });
      }
      
      const friendship = await storage.createFriendRequest(requesterId, addresseeId);
      
      res.json({
        success: true,
        message: "Friend request sent successfully!",
        friendship: {
          id: friendship.id,
          status: friendship.status
        }
      });
    } catch (error) {
      console.error("Create friend request error:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: "Invalid request data."
        });
      }
      
      res.status(500).json({
        success: false,
        error: "Failed to send friend request."
      });
    }
  });

  app.put("/api/friends/request/:id", async (req, res) => {
    try {
      const { id } = z.object({ id: z.string().min(1) }).parse(req.params);
      const { status } = z.object({ 
        status: z.enum(["accepted", "declined", "blocked"]) 
      }).parse(req.body);
      
      const friendship = await storage.updateFriendshipStatus(id, status);
      
      const statusMessages = {
        accepted: "Friend request accepted!",
        declined: "Friend request declined.",
        blocked: "User has been blocked."
      };
      
      res.json({
        success: true,
        message: statusMessages[status as keyof typeof statusMessages],
        friendship: {
          id: friendship.id,
          status: friendship.status,
          updatedAt: friendship.updatedAt
        }
      });
    } catch (error) {
      console.error("Update friendship status error:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: "Invalid request data."
        });
      }
      
      res.status(500).json({
        success: false,
        error: "Failed to update friend request."
      });
    }
  });

  app.get("/api/friends/:userId", async (req, res) => {
    try {
      const { userId } = z.object({ userId: z.string().min(1) }).parse(req.params);
      
      const friends = await storage.getFriends(userId);
      
      res.json({
        success: true,
        friends: friends.map(friend => ({
          id: friend.id,
          firstName: friend.firstName,
          lastName: friend.lastName,
          email: friend.email,
          joinDate: friend.joinDate
        }))
      });
    } catch (error) {
      console.error("Get friends error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to get friends list."
      });
    }
  });

  app.get("/api/friends/requests/:userId", async (req, res) => {
    try {
      const { userId } = z.object({ userId: z.string().min(1) }).parse(req.params);
      
      const requests = await storage.getFriendRequests(userId);
      
      res.json({
        success: true,
        incoming: requests.incoming.map(request => ({
          id: request.user.id,
          firstName: request.user.firstName,
          lastName: request.user.lastName,
          email: request.user.email
        })),
        outgoing: requests.outgoing.map(request => ({
          id: request.user.id,
          firstName: request.user.firstName,
          lastName: request.user.lastName,
          email: request.user.email
        }))
      });
    } catch (error) {
      console.error("Get friend requests error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to get friend requests."
      });
    }
  });

  app.delete("/api/friends/:userId/:friendId", async (req, res) => {
    try {
      const { userId, friendId } = z.object({
        userId: z.string().min(1),
        friendId: z.string().min(1)
      }).parse(req.params);
      
      await storage.removeFriend(userId, friendId);
      
      res.json({
        success: true,
        message: "Friend removed successfully."
      });
    } catch (error) {
      console.error("Remove friend error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to remove friend."
      });
    }
  });

  // Contact management routes
  app.post("/api/contacts/:userId/import", async (req, res) => {
    try {
      const { userId } = z.object({ userId: z.string().min(1) }).parse(req.params);
      const fromSignup = req.query.fromSignup === 'true';
      
      const bodySchema = z.object({
        contacts: z.array(z.object({
          contactId: z.string().nullable(),
          firstName: z.string().nullable(),
          lastName: z.string().nullable(),
          displayName: z.string().nullable(),
          email: z.string().nullable(),
          phone: z.string().nullable()
        })).max(fromSignup ? 50 : 1000) // Enforce 50 limit during signup
      });
      
      const { contacts } = bodySchema.parse(req.body);

      // Check if this is first-time import during signup
      if (fromSignup) {
        const existingContacts = await storage.getContacts(userId);
        if (existingContacts.length > 0) {
          return res.status(400).json({
            success: false,
            error: "Signup import only allowed for new users with no existing contacts."
          });
        }
      }

      // Limit to 50 contacts for signup imports
      const contactsToImport = fromSignup ? contacts.slice(0, 50) : contacts;

      // Import contacts and find app users
      const importedContacts = await storage.importContacts(userId, contactsToImport.map(c => ({
        ownerId: userId,
        contactId: c.contactId,
        firstName: c.firstName,
        lastName: c.lastName,
        displayName: c.displayName,
        email: c.email,
        phone: c.phone
      })));

      // Find which contacts are app users
      const appUserContacts = await storage.findAppUsersFromContacts(userId);

      res.json({
        success: true,
        message: `${importedContacts.length} contacts imported, ${appUserContacts.length} app users found`,
        totalImported: importedContacts.length,
        appUsersFound: appUserContacts.length,
        fromSignup
      });
    } catch (error) {
      console.error("Import contacts error:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: "Invalid request data. Contact limit exceeded for signup import."
        });
      }
      
      res.status(500).json({
        success: false,
        error: "Failed to import contacts."
      });
    }
  });

  app.get("/api/contacts/:userId", async (req, res) => {
    try {
      const { userId } = z.object({ userId: z.string().min(1) }).parse(req.params);

      const allContacts = await storage.getContacts(userId);
      const appUserContacts = allContacts.filter(contact => contact.isAppUser);

      res.json({
        success: true,
        allContacts: allContacts.map(contact => ({
          id: contact.id,
          firstName: contact.firstName,
          lastName: contact.lastName,
          displayName: contact.displayName,
          email: contact.email,
          phone: contact.phone,
          isAppUser: contact.isAppUser
        })),
        appUsers: appUserContacts.map(contact => ({
          id: contact.id,
          firstName: contact.firstName,
          lastName: contact.lastName,
          displayName: contact.displayName,
          email: contact.email,
          phone: contact.phone,
          isAppUser: contact.isAppUser,
          appUserId: contact.appUserId
        }))
      });
    } catch (error) {
      console.error("Get contacts error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to get contacts."
      });
    }
  });

  // Bible verse sharing routes
  app.post("/api/verses/share", async (req, res) => {
    try {
      const { senderId, receiverId, verseText, verseReference, message } = z.object({
        senderId: z.string().min(1),
        receiverId: z.string().min(1),
        verseText: z.string().min(1),
        verseReference: z.string().min(1),
        message: z.string().optional()
      }).parse(req.body);

      const verseShare = await storage.shareVerse({
        senderId,
        receiverId,
        verseText,
        verseReference,
        message
      });

      res.json({
        success: true,
        message: "Bible verse shared successfully",
        verseShare: {
          id: verseShare.id,
          verseReference: verseShare.verseReference,
          verseText: verseShare.verseText,
          message: verseShare.message,
          createdAt: verseShare.createdAt
        }
      });
    } catch (error) {
      console.error("Share verse error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to share Bible verse."
      });
    }
  });

  app.get("/api/verses/received/:userId", async (req, res) => {
    try {
      const { userId } = z.object({ userId: z.string().min(1) }).parse(req.params);

      const receivedVerses = await storage.getReceivedVerses(userId);

      // Get sender names for each verse
      const versesWithSenderNames = await Promise.all(
        receivedVerses.map(async (verse) => {
          try {
            const sender = await storage.getAppUser(verse.senderId);
            return {
              id: verse.id,
              verseText: verse.verseText,
              verseReference: verse.verseReference,
              imageUrl: verse.imageUrl,
              message: verse.message,
              senderName: sender ? `${sender.firstName} ${sender.lastName}` : 'Unknown User',
              isRead: verse.isRead,
              createdAt: verse.createdAt
            };
          } catch (error) {
            console.error(`Error getting sender for verse ${verse.id}:`, error);
            return {
              id: verse.id,
              verseText: verse.verseText,
              verseReference: verse.verseReference,
              imageUrl: verse.imageUrl,
              message: verse.message,
              senderName: 'Unknown User',
              isRead: verse.isRead,
              createdAt: verse.createdAt
            };
          }
        })
      );

      res.json({
        success: true,
        verses: versesWithSenderNames
      });
    } catch (error) {
      console.error("Get received verses error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to get received verses."
      });
    }
  });

  app.put("/api/verses/:verseId/read", async (req, res) => {
    try {
      const { verseId } = z.object({ verseId: z.string().min(1) }).parse(req.params);

      const updatedVerse = await storage.markVerseAsRead(verseId);

      if (!updatedVerse) {
        return res.status(404).json({
          success: false,
          error: "Verse not found."
        });
      }

      res.json({
        success: true,
        message: "Verse marked as read",
        verse: {
          id: updatedVerse.id,
          isRead: updatedVerse.isRead
        }
      });
    } catch (error) {
      console.error("Mark verse as read error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to mark verse as read."
      });
    }
  });

  // Apple-Compliant Application Health Monitoring Endpoints
  // Transparent health checks for auto-recovery system
  app.get("/api/health", async (req, res) => {
    try {
      const healthStatus = appMonitor.getHealthStatus();
      res.json({
        success: true,
        ...healthStatus
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Health check failed"
      });
    }
  });

  // Database health check
  app.get("/api/health/db", async (req, res) => {
    try {
      // Test database connection with existing method
      const testResult = await storage.getAllActiveSubscribers();
      res.json({
        success: true,
        service: "database",
        status: "healthy",
        timestamp: new Date().toISOString(),
        recordCount: testResult.length
      });
    } catch (error) {
      res.status(503).json({
        success: false,
        service: "database",
        status: "down",
        error: "Database connection failed",
        timestamp: new Date().toISOString()
      });
    }
  });

  // Bible API health check
  app.get("/api/health/bible", async (req, res) => {
    try {
      const apiKey = process.env.API_BIBLE_KEY;
      if (!apiKey) {
        throw new Error("Bible API key not configured");
      }

      // Test Bible API connection
      const response = await fetch('https://api.scripture.api.bible/v1/bibles', {
        headers: {
          'api-key': apiKey
        }
      });

      if (!response.ok) {
        throw new Error(`Bible API responded with status ${response.status}`);
      }

      res.json({
        success: true,
        service: "bible-api",
        status: "healthy",
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(503).json({
        success: false,
        service: "bible-api",
        status: "down",
        error: error instanceof Error ? error.message : "Bible API check failed",
        timestamp: new Date().toISOString()
      });
    }
  });

  // Force health check endpoint for immediate monitoring
  app.post("/api/health/check", async (req, res) => {
    try {
      const healthStatus = await appMonitor.forceHealthCheck();
      res.json({
        success: true,
        message: "Health check completed",
        ...healthStatus
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to perform health check"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
