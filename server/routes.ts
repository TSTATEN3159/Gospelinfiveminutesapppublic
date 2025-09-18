import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import OpenAI from "openai";
import { storage } from "./storage";

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

  const httpServer = createServer(app);

  return httpServer;
}
