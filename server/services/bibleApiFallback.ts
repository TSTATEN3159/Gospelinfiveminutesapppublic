import OpenAI from "openai";
import { apiUsageTracker } from "./apiUsageTracker";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface BibleVerse {
  text: string;
  reference: string;
  book: string;
  chapter: string;
  verse: string;
  translation: string;
  source: 'bolls' | 'api_bible' | 'openai' | 'getcontext';
}

export interface BiblePassage {
  text: string;
  reference: string;
  translation: string;
  source: 'bolls' | 'api_bible' | 'openai' | 'getcontext';
}

class BibleApiFallback {
  private readonly BOLLS_BASE_URL = 'https://bolls.life';
  private readonly API_BIBLE_BASE_URL = 'https://api.scripture.api.bible/v1';
  private readonly GETCONTEXT_BASE_URL = 'https://getcontext.xyz/api';

  // Version mapping for Bolls.life
  private readonly bollsVersionMap: Record<string, string> = {
    'KJV': 'KJV',
    'WEB': 'WEB',
    'ASV': 'ASV',
    'BBE': 'BBE',
    'NIV': 'KJV', // Bolls doesn't have NIV, fallback to KJV
  };

  // Bolls.life book name to numeric ID mapping (1-66)
  private readonly bookNameToId: Record<string, number> = {
    // Old Testament (1-39)
    'Genesis': 1, 'Exodus': 2, 'Leviticus': 3, 'Numbers': 4, 'Deuteronomy': 5,
    'Joshua': 6, 'Judges': 7, 'Ruth': 8, '1 Samuel': 9, '2 Samuel': 10,
    '1 Kings': 11, '2 Kings': 12, '1 Chronicles': 13, '2 Chronicles': 14,
    'Ezra': 15, 'Nehemiah': 16, 'Esther': 17, 'Job': 18, 'Psalms': 19, 'Psalm': 19,
    'Proverbs': 20, 'Ecclesiastes': 21, 'Song of Solomon': 22, 'Song of Songs': 22,
    'Isaiah': 23, 'Jeremiah': 24, 'Lamentations': 25, 'Ezekiel': 26, 'Daniel': 27,
    'Hosea': 28, 'Joel': 29, 'Amos': 30, 'Obadiah': 31, 'Jonah': 32, 'Micah': 33,
    'Nahum': 34, 'Habakkuk': 35, 'Zephaniah': 36, 'Haggai': 37, 'Zechariah': 38, 'Malachi': 39,
    // New Testament (40-66)
    'Matthew': 40, 'Mark': 41, 'Luke': 42, 'John': 43, 'Acts': 44,
    'Romans': 45, '1 Corinthians': 46, '2 Corinthians': 47, 'Galatians': 48,
    'Ephesians': 49, 'Philippians': 50, 'Colossians': 51, '1 Thessalonians': 52,
    '2 Thessalonians': 53, '1 Timothy': 54, '2 Timothy': 55, 'Titus': 56,
    'Philemon': 57, 'Hebrews': 58, 'James': 59, '1 Peter': 60, '2 Peter': 61,
    '1 John': 62, '2 John': 63, '3 John': 64, 'Jude': 65, 'Revelation': 66
  };

  // Version mapping for API.Bible
  private readonly apiBibleVersionMap: Record<string, string> = {
    'KJV': 'de4e12af7f28f599-01',
    'WEB': '9879dbb7cfe39e4d-03',
    'ASV': '06125adad2d5898a-01',
    'BBE': '65eec8e0b60e656b-01',
    'NIV': 'de4e12af7f28f599-02'
  };

  // Book abbreviation mapping for API.Bible
  private readonly bookAbbrevMap: Record<string, string> = {
    'Genesis': 'GEN', 'Exodus': 'EXO', 'Leviticus': 'LEV', 'Numbers': 'NUM', 'Deuteronomy': 'DEU',
    'Joshua': 'JOS', 'Judges': 'JDG', 'Ruth': 'RUT', '1 Samuel': '1SA', '2 Samuel': '2SA',
    '1 Kings': '1KI', '2 Kings': '2KI', '1 Chronicles': '1CH', '2 Chronicles': '2CH',
    'Ezra': 'EZR', 'Nehemiah': 'NEH', 'Esther': 'EST', 'Job': 'JOB', 'Psalm': 'PSA', 'Psalms': 'PSA',
    'Proverbs': 'PRO', 'Ecclesiastes': 'ECC', 'Song of Solomon': 'SNG', 'Song of Songs': 'SNG',
    'Isaiah': 'ISA', 'Jeremiah': 'JER', 'Lamentations': 'LAM', 'Ezekiel': 'EZK', 'Daniel': 'DAN',
    'Hosea': 'HOS', 'Joel': 'JOL', 'Amos': 'AMO', 'Obadiah': 'OBA', 'Jonah': 'JON', 'Micah': 'MIC',
    'Nahum': 'NAM', 'Habakkuk': 'HAB', 'Zephaniah': 'ZEP', 'Haggai': 'HAG', 'Zechariah': 'ZEC', 'Malachi': 'MAL',
    'Matthew': 'MAT', 'Mark': 'MRK', 'Luke': 'LUK', 'John': 'JHN', 'Acts': 'ACT',
    'Romans': 'ROM', '1 Corinthians': '1CO', '2 Corinthians': '2CO', 'Galatians': 'GAL',
    'Ephesians': 'EPH', 'Philippians': 'PHP', 'Colossians': 'COL', '1 Thessalonians': '1TH',
    '2 Thessalonians': '2TH', '1 Timothy': '1TI', '2 Timothy': '2TI', 'Titus': 'TIT',
    'Philemon': 'PHM', 'Hebrews': 'HEB', 'James': 'JAS', '1 Peter': '1PE', '2 Peter': '2PE',
    '1 John': '1JN', '2 John': '2JN', '3 John': '3JN', 'Jude': 'JUD', 'Revelation': 'REV'
  };

  /**
   * PRIMARY: Fetch from Bolls.life (unlimited, no API key)
   * Bolls.life requires numeric book IDs (1-66) instead of book names
   */
  private async fetchFromBolls(reference: string, version: string = 'KJV'): Promise<BibleVerse | null> {
    try {
      const bollsVersion = this.bollsVersionMap[version] || 'KJV';
      
      // Parse reference: "Romans 12:2" -> book, chapter, verse
      const parsed = this.parseReference(reference);
      if (!parsed) return null;

      // Get numeric book ID for Bolls.life (e.g., Romans = 45)
      const bookId = this.bookNameToId[parsed.book];
      if (!bookId) {
        console.error(`Unknown book name for Bolls: "${parsed.book}" from reference "${reference}"`);
        return null;
      }

      // Correct URL format: https://bolls.life/get-verse/KJV/45/12/2/
      const url = `${this.BOLLS_BASE_URL}/get-verse/${bollsVersion}/${bookId}/${parsed.chapter}/${parsed.verse}/`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Bolls API failed: ${response.status}`);

      const data = await response.json();
      
      // Bolls may return single object or array
      const verseData = Array.isArray(data) ? data[0] : data;
      
      // Clean HTML tags and Strong's numbers from verse text
      // Bolls.life includes Strong's Concordance numbers like "And2532 be4964"
      const cleanText = (verseData.text || verseData.verse || '')
        .replace(/<br\s*\/?>/gi, '\n')           // Convert <br> to newlines
        .replace(/<\/?[^>]+(>|$)/g, '')          // Remove HTML tags
        .replace(/\d+/g, '')                      // Remove all Strong's numbers
        .replace(/\s+/g, ' ')                     // Normalize whitespace
        .replace(/\s+([,:;.!?])/g, '$1')         // Fix spacing before punctuation
        .trim();
      
      return {
        text: cleanText,
        reference: `${parsed.book} ${parsed.chapter}:${parsed.verse}`,
        book: parsed.book,
        chapter: parsed.chapter.toString(),
        verse: parsed.verse.toString(),
        translation: bollsVersion,
        source: 'bolls'
      };
    } catch (error) {
      console.error('Bolls.life fetch failed:', error);
      return null;
    }
  }

  /**
   * SECONDARY: Fetch from API.Bible (5000 requests/day limit)
   */
  private async fetchFromApiBible(reference: string, version: string = 'KJV'): Promise<BibleVerse | null> {
    try {
      // Check if we have budget
      const canUse = await apiUsageTracker.canUseApiBible();
      if (!canUse) {
        console.log('API.Bible daily limit reached (5000), skipping');
        return null;
      }

      const API_KEY = process.env.API_BIBLE_KEY;
      if (!API_KEY) {
        console.log('API.Bible key not configured');
        return null;
      }

      const bibleId = this.apiBibleVersionMap[version] || this.apiBibleVersionMap['KJV'];
      const parsed = this.parseReference(reference);
      if (!parsed) return null;

      const bookAbbrev = this.bookAbbrevMap[parsed.book] || 'JHN';
      const verseId = `${bookAbbrev}.${parsed.chapter}.${parsed.verse}`;

      const url = `${this.API_BIBLE_BASE_URL}/bibles/${bibleId}/verses/${verseId}`;
      
      const response = await fetch(url, {
        headers: { 'api-key': API_KEY }
      });

      // Track request
      await apiUsageTracker.trackApiBibleRequest(response.ok);

      if (!response.ok) throw new Error(`API.Bible failed: ${response.status}`);

      const data = await response.json();
      const content = data.data.content.replace(/<[^>]*>/g, '').trim();

      return {
        text: content,
        reference: data.data.reference,
        book: parsed.book,
        chapter: parsed.chapter.toString(),
        verse: parsed.verse.toString(),
        translation: version,
        source: 'api_bible'
      };
    } catch (error) {
      console.error('API.Bible fetch failed:', error);
      return null;
    }
  }

  /**
   * TERTIARY: Fetch from OpenAI ($85/month limit)
   */
  private async fetchFromOpenAI(reference: string, version: string = 'KJV'): Promise<BibleVerse | null> {
    try {
      // Check if we have budget
      const canUse = await apiUsageTracker.canUseOpenAI();
      if (!canUse) {
        console.log('OpenAI monthly budget limit reached ($85), skipping');
        return null;
      }

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a Bible text provider. Return the EXACT text of Bible verses in ${version} version. Only return the verse text, no commentary or explanation.`
          },
          {
            role: "user",
            content: `Give me the exact text of ${reference} in ${version} version.`
          }
        ],
        max_completion_tokens: 300
      });

      // Track cost
      const usage = response.usage;
      if (usage) {
        await apiUsageTracker.trackOpenAIRequest(
          'gpt-4o-mini',
          usage.prompt_tokens,
          usage.completion_tokens
        );
      }

      const text = response.choices[0]?.message?.content?.trim();
      if (!text) return null;

      const parsed = this.parseReference(reference);
      if (!parsed) return null;

      return {
        text,
        reference,
        book: parsed.book,
        chapter: parsed.chapter.toString(),
        verse: parsed.verse.toString(),
        translation: version,
        source: 'openai'
      };
    } catch (error) {
      console.error('OpenAI fetch failed:', error);
      return null;
    }
  }

  /**
   * QUATERNARY: Fetch from GetContext.xyz (last resort)
   */
  private async fetchFromGetContext(reference: string): Promise<BibleVerse | null> {
    try {
      // GetContext might not have a verse API, but we'll try their generic Bible endpoint
      const response = await fetch(`${this.GETCONTEXT_BASE_URL}/bible/${encodeURIComponent(reference)}`);
      if (!response.ok) throw new Error(`GetContext failed: ${response.status}`);

      const data = await response.json();
      const parsed = this.parseReference(reference);
      if (!parsed) return null;

      return {
        text: data.text || data.verse || 'Verse text not available',
        reference,
        book: parsed.book,
        chapter: parsed.chapter.toString(),
        verse: parsed.verse.toString(),
        translation: 'KJV',
        source: 'getcontext'
      };
    } catch (error) {
      console.error('GetContext fetch failed:', error);
      return null;
    }
  }

  /**
   * Main method: Try all APIs in order with usage limits
   * Priority order: API.Bible → Bolls.life → OpenAI → GetContext.xyz
   */
  async getVerse(reference: string, version: string = 'KJV'): Promise<BibleVerse> {
    console.log(`Fetching verse: ${reference} (${version})`);

    // Try API.Bible first (5K daily limit - primary for reliability)
    let verse = await this.fetchFromApiBible(reference, version);
    if (verse) {
      console.log(`✅ Retrieved from API.Bible (${apiUsageTracker.getRemainingApiBibleRequests()} requests remaining today)`);
      return verse;
    }

    // Try Bolls.life second (unlimited - fallback)
    verse = await this.fetchFromBolls(reference, version);
    if (verse) {
      console.log(`✅ Retrieved from Bolls.life (fallback)`);
      return verse;
    }

    // Try OpenAI third ($85 monthly limit)
    verse = await this.fetchFromOpenAI(reference, version);
    if (verse) {
      console.log(`✅ Retrieved from OpenAI ($${apiUsageTracker.getRemainingOpenAIBudget().toFixed(2)} budget remaining this month)`);
      return verse;
    }

    // Try GetContext.xyz last (backup)
    verse = await this.fetchFromGetContext(reference);
    if (verse) {
      console.log(`✅ Retrieved from GetContext.xyz (final fallback)`);
      return verse;
    }

    // All APIs failed - return static fallback
    throw new Error(`All Bible APIs failed for ${reference}`);
  }

  /**
   * Parse reference string into components
   */
  private parseReference(reference: string): { book: string; chapter: number; verse: number } | null {
    const match = reference.match(/^(.+?)\s+(\d+):(\d+)$/);
    if (!match) return null;

    return {
      book: match[1].trim(),
      chapter: parseInt(match[2]),
      verse: parseInt(match[3])
    };
  }

  /**
   * Get API usage statistics
   */
  getUsageStats() {
    const stats = apiUsageTracker.getStats();
    return {
      apiBible: {
        requestsToday: stats?.apiBibleRequestsToday || 0,
        limit: 5000,
        remaining: apiUsageTracker.getRemainingApiBibleRequests()
      },
      openAI: {
        costThisMonth: stats?.openAICostThisMonth || 0,
        limit: 85,
        remaining: apiUsageTracker.getRemainingOpenAIBudget()
      }
    };
  }
}

export const bibleApiFallback = new BibleApiFallback();
