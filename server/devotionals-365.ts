import { type Express } from "express";
import { z } from "zod";
import { storage } from "./storage";
import { insertDevotionalProgressSchema } from "@shared/schema";
import { getWholePlan, getDay } from "./devotionals";

/**
 * Mounts all 365-day devotional endpoints including:
 * - GET /api/devotionals/365 - Get whole plan
 * - GET /api/devotionals/365/:gender/:day - Get specific day
 * - POST /api/devotionals/365/progress - Save progress & streak
 * - GET /api/devotionals/365/progress/:userId - Get user's progress & streak
 */
export function mountDevotionals365(app: Express): void {
  // Devotional progress routes MUST come BEFORE the generic /:gender/:day route
  // to prevent route conflicts
  
  // POST /api/devotionals/365/progress - Save devotional progress and streak
  app.post("/api/devotionals/365/progress", async (req, res) => {
    try {
      const validated = insertDevotionalProgressSchema.extend({
        completedAtISO: z.string().optional(),
      }).parse(req.body);

      if (validated.day < 1 || validated.day > 365) {
        return res.status(400).json({
          success: false,
          error: "Day must be between 1 and 365"
        });
      }

      // Mark devotional complete (idempotent)
      await storage.markDevotionalComplete({
        userId: validated.userId,
        day: validated.day,
      });

      // Get all completed days for this user
      const allProgress = await storage.getDevotionalProgress(validated.userId);
      const completedDays = allProgress.map(p => p.day).sort((a, b) => a - b);
      
      // Calculate streak (consecutive days from most recent)
      let streak = 0;
      if (completedDays.length > 0) {
        const sortedDesc = [...completedDays].sort((a, b) => b - a);
        streak = 1;
        for (let i = 1; i < sortedDesc.length; i++) {
          if (sortedDesc[i] === sortedDesc[i - 1] - 1) {
            streak++;
          } else {
            break;
          }
        }
      }

      // Get most recent completion date
      const mostRecentProgress = allProgress.sort((a, b) => 
        new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
      )[0];
      const lastReadISO = mostRecentProgress ? mostRecentProgress.completedAt.toISOString() : null;

      res.json({
        success: true,
        progress: {
          completedDays,
          lastReadISO,
          streak
        }
      });
    } catch (error) {
      console.error("Error saving devotional progress:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: "Validation error",
          details: error.errors
        });
      }
      res.status(500).json({
        success: false,
        error: "Failed to save devotional progress"
      });
    }
  });

  // GET /api/devotionals/365/progress/:userId - Get user's devotional progress and streak
  app.get("/api/devotionals/365/progress/:userId", async (req, res) => {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({
          success: false,
          error: "User ID is required"
        });
      }

      // Get all completed days for this user
      const allProgress = await storage.getDevotionalProgress(userId);
      const completedDays = allProgress.map(p => p.day).sort((a, b) => a - b);
      
      // Calculate streak (consecutive days from most recent)
      let streak = 0;
      if (completedDays.length > 0) {
        const sortedDesc = [...completedDays].sort((a, b) => b - a);
        streak = 1;
        for (let i = 1; i < sortedDesc.length; i++) {
          if (sortedDesc[i] === sortedDesc[i - 1] - 1) {
            streak++;
          } else {
            break;
          }
        }
      }

      // Get most recent completion date
      const mostRecentProgress = allProgress.sort((a, b) => 
        new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
      )[0];
      const lastReadISO = mostRecentProgress ? mostRecentProgress.completedAt.toISOString() : null;

      res.json({
        success: true,
        progress: {
          completedDays,
          lastReadISO,
          streak
        }
      });
    } catch (error) {
      console.error("Error fetching devotional progress:", error);
      res.status(500).json({
        success: false,
        error: "Failed to fetch devotional progress"
      });
    }
  });

  // Generic devotional routes (MUST come after progress routes)
  app.get("/api/devotionals/365", getWholePlan);
  app.get("/api/devotionals/365/:gender/:day", getDay);
}
