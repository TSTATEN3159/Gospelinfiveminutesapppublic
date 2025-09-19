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
      apiVersion: "2023-10-16",
    });
  }
  return stripe;
};

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Bible Search OpenAI Route - for retrieving Bible chapters and verses
  const bibleSearchSchema = z.object({
    query: z.string().min(1).max(100), // e.g. "John 3:16" or "Psalm 23"
    version: z.string().optional().default("NIV"), // Bible version
  });

  app.post("/api/bible-search", async (req, res) => {
    try {
      const { query, version } = bibleSearchSchema.parse(req.body);
      console.log("Bible Search - Query:", query, "Version:", version);

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
      const categoryThemes = themes[category as string] || themes.sermon;
      const numVideos = Math.min(parseInt(limit as string), 10);

      // Fetch videos from Christian Context API in parallel for better performance
      const themePromises = categoryThemes.slice(0, numVideos).map(async (theme, i) => {
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
        } catch (apiError) {
          console.error(`ERROR fetching ${theme}:`, apiError.message);
          return null;
        }
      });

      // Wait for all API calls to complete
      const apiResults = await Promise.allSettled(themePromises);
      
      // Add successful results to videos array
      apiResults.forEach((result) => {
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
        incoming: requests.incoming.map(user => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        })),
        outgoing: requests.outgoing.map(user => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
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
