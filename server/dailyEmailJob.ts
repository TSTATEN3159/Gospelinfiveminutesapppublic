import { sendDailyDiscipleshipEmail } from "./dailyEmailService";
import { generateMeaningAndApplication } from "./dailyVerseAI";
import { db } from "./db";
import { appUsers, triviaStats } from "@shared/schema";
import { eq } from "drizzle-orm";
import { bibleApiFallback } from "./services/bibleApiFallback";

interface EmailUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

async function getAllEmailSubscribers(): Promise<EmailUser[]> {
  try {
    const users = await db
      .select({
        id: appUsers.id,
        email: appUsers.email,
        firstName: appUsers.firstName,
        lastName: appUsers.lastName,
      })
      .from(appUsers)
      .where(eq(appUsers.wantsDailyEmail, true));
    
    return users;
  } catch (error) {
    console.error("[DailyEmail] Error fetching subscribers:", error);
    return [];
  }
}

async function getTodaysVerse() {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  
  const verses = [
    { ref: "JHN.3.16", text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life." },
    { ref: "ROM.8.28", text: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose." },
    { ref: "PSA.23.1", text: "The LORD is my shepherd; I shall not want." },
    { ref: "PHP.4.13", text: "I can do all things through Christ which strengtheneth me." },
    { ref: "PRO.3.5-6", text: "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths." },
  ];
  
  const selectedVerse = verses[dayOfYear % verses.length];
  
  try {
    const verseData = await bibleApiFallback.getVerse("de4e12af7f28f599-02", selectedVerse.ref);
    return {
      reference: verseData.reference || selectedVerse.ref,
      text: verseData.text?.replace(/<[^>]*>/g, '').trim() || selectedVerse.text
    };
  } catch (error) {
    console.log("[DailyEmail] Using fallback verse");
    return {
      reference: selectedVerse.ref,
      text: selectedVerse.text
    };
  }
}

async function getTriviaStatsForUser(userId: string) {
  try {
    const stats = await db
      .select()
      .from(triviaStats)
      .where(eq(triviaStats.userId, userId))
      .limit(1);
    
    if (stats.length === 0) {
      return { dailyStreak: 0, highestTitle: "Bible Student" };
    }
    
    const userStats = stats[0];
    
    return {
      dailyStreak: userStats.dailyStreak || 0,
      highestTitle: userStats.highestTitle === "None" ? "Bible Student" : userStats.highestTitle
    };
  } catch (error) {
    console.error(`[DailyEmail] Error fetching trivia stats for ${userId}:`, error);
    return { dailyStreak: 0, highestTitle: "Bible Student" };
  }
}

export async function runDailyEmailJob() {
  console.log("[DailyEmail] 📧 Starting daily email job…");

  const users = await getAllEmailSubscribers();
  
  if (users.length === 0) {
    console.log("[DailyEmail] No subscribers found");
    return;
  }

  console.log(`[DailyEmail] Found ${users.length} subscriber(s)`);

  const verse = await getTodaysVerse();
  console.log(`[DailyEmail] Today's verse: ${verse.reference}`);

  let successCount = 0;
  let failCount = 0;

  for (const user of users) {
    try {
      const { meaning, application } = await generateMeaningAndApplication(
        verse,
        user.firstName
      );
      
      const stats = await getTriviaStatsForUser(user.id);

      await sendDailyDiscipleshipEmail({
        to: user.email,
        name: user.firstName,
        verseReference: verse.reference,
        verseText: verse.text,
        meaning,
        application,
        triviaTitle: stats.highestTitle,
        triviaStreak: stats.dailyStreak,
      });

      successCount++;
    } catch (err) {
      console.error(`[DailyEmail] Failed for user ${user.email}:`, err);
      failCount++;
    }
  }

  console.log(`[DailyEmail] ✅ Job complete: ${successCount} sent, ${failCount} failed`);
}
