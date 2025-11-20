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

function getDailyVerseReference(): string {
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
}

async function getTodaysVerse() {
  const dailyReferenceApiBible = getDailyVerseReference();
  
  const [bookCode, chapter, verseNum] = dailyReferenceApiBible.split('.');
  const bookNames: { [key: string]: string } = {
    'JHN': 'John', 'PSA': 'Psalms', 'PRO': 'Proverbs', 'JER': 'Jeremiah',
    'PHP': 'Philippians', 'ROM': 'Romans', 'ISA': 'Isaiah', 'HEB': 'Hebrews',
    'MAT': 'Matthew', 'EPH': 'Ephesians', 'JOS': 'Joshua'
  };
  const bookName = bookNames[bookCode] || bookCode;
  const dailyReference = `${bookName} ${chapter}:${verseNum}`;
  
  try {
    const verseData = await bibleApiFallback.getVerse(dailyReference, 'KJV');
    return {
      reference: verseData.reference || dailyReference,
      text: verseData.text?.replace(/<[^>]*>/g, '').trim() || verseData.text
    };
  } catch (error) {
    console.log("[DailyEmail] Error fetching verse, using fallback");
    return {
      reference: dailyReference,
      text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life."
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
