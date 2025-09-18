import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import OpenAI from "openai";
import { storage } from "./storage";
import { insertSubscriberSchema } from "@shared/schema";
import { sendBlogUpdateEmails } from "./email-service";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

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

  const httpServer = createServer(app);

  return httpServer;
}
