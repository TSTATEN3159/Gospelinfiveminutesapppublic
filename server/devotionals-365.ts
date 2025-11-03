import express from "express";
import { z } from "zod";
import { storage } from "./storage";
import { insertDevotionalProgressSchema } from "@shared/schema";
import { getWholePlan, getDay } from "./devotionals";

const router = express.Router();

// ===== PROGRESS TRACKING ENDPOINTS =====

// POST /api/devotionals/365/progress - Save devotional progress and streak
router.post("/api/devotionals/365/progress", async (req, res) => {
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
    
    // Get most recent completion date (sort by timestamp, not day number)
    const sortedByTime = [...allProgress].sort((a, b) => 
      new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
    );
    const lastReadISO = sortedByTime.length > 0 
      ? sortedByTime[0].completedAt.toISOString() 
      : null;

    // Calculate streak (consecutive days from highest completed day backward)
    let streak = 0;
    const daySet = new Set(completedDays);
    let cursor = completedDays[completedDays.length - 1] ?? 0;
    while (daySet.has(cursor)) {
      streak++;
      cursor--;
    }

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
router.get("/api/devotionals/365/progress/:userId", async (req, res) => {
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
    
    // Get most recent completion date (sort by timestamp, not day number)
    const sortedByTime = [...allProgress].sort((a, b) => 
      new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
    );
    const lastReadISO = sortedByTime.length > 0 
      ? sortedByTime[0].completedAt.toISOString() 
      : null;

    // Calculate streak (consecutive days from highest completed day backward)
    let streak = 0;
    const daySet = new Set(completedDays);
    let cursor = completedDays[completedDays.length - 1] ?? 0;
    while (daySet.has(cursor)) {
      streak++;
      cursor--;
    }

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

// ===== CONTENT ENDPOINTS =====

// GET /api/devotionals/365/:gender/:day - Get specific day's devotional
router.get("/api/devotionals/365/:gender/:day", async (req, res) => {
  try {
    // Disable caching so iOS doesn't reuse old responses
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
    
    // Delegate to existing handler
    getDay(req, res);
  } catch (e) {
    console.error("[API] 365/:gender/:day error", e);
    return res.status(500).json({ success: false, error: "devotional_day_failed" });
  }
});

// GET /api/devotionals/365 - Get whole 365-day plan
router.get("/api/devotionals/365", async (req, res) => {
  try {
    // Disable caching so iOS doesn't reuse old responses
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
    
    // Delegate to existing handler
    getWholePlan(req, res);
  } catch (e) {
    console.error("[API] 365/all error", e);
    return res.status(500).json({ success: false, error: "devotional_all_failed" });
  }
});

export default router;
