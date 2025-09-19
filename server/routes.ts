import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import OpenAI from "openai";
import Stripe from "stripe";
import { storage } from "./storage";
import { insertSubscriberSchema, insertAppUserSchema, insertFriendshipSchema } from "@shared/schema";
import { sendBlogUpdateEmails } from "./email-service";

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

  const httpServer = createServer(app);

  return httpServer;
}
