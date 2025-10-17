export interface BibleVerse {
  text: string;
  reference: string;
  chapter: string;
  verse: string;
  book: string;
  translation?: string;
}

export interface BibleVersion {
  id: string;
  name: string;
  abbreviation: string;
  language: string;
  description?: string;
}

export interface ApiBibleVerse {
  id: string;
  orgId: string;
  bookId: string;
  chapterId: string;
  content: string;
  reference: string;
  verseCount: number;
  copyright: string;
}

export interface DailyVerse extends BibleVerse {
  date: string;
  meaning?: string;
  application?: string;
}

class BibleService {
  private cache = new Map<string, DailyVerse>();
  private versionsCache = new Map<string, BibleVersion[]>();
  private readonly API_BIBLE_BASE_URL = 'https://api.scripture.api.bible/v1';
  private readonly API_KEY = import.meta.env.VITE_API_BIBLE_KEY;
  
  // Get today's date as cache key
  private getTodayKey(): string {
    return new Date().toDateString();
  }

  // Safe fetch wrapper that prevents unhandled rejections
  private async safeFetch(url: string): Promise<Response> {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  // Fetch from Our Manna API (daily verse service) - HTTPS version
  private async fetchFromOurManna(): Promise<BibleVerse> {
    const response = await this.safeFetch('https://www.ourmanna.com/verses/api/get?format=json');
    if (!response.ok) throw new Error('Our Manna API failed');
    
    const data = await response.json();
    
    // Parse reference to extract book, chapter, verse
    const reference = data.verse.details.reference;
    const refParts = reference.match(/^(.+?)\s+(\d+):(\d+(?:-\d+)?)$/);
    
    return {
      text: data.verse.details.text,
      reference,
      book: refParts ? refParts[1] : 'Unknown',
      chapter: refParts ? refParts[2] : '1',
      verse: refParts ? refParts[3] : '1',
      translation: data.verse.details.version || 'KJV'
    };
  }

  // Fetch from Bible-API.com (backup service)
  private async fetchFromBibleAPI(): Promise<BibleVerse> {
    const response = await this.safeFetch('https://bible-api.com/random');
    if (!response.ok) throw new Error('Bible-API failed');
    
    const data = await response.json();
    
    // Parse reference to extract book, chapter, verse
    const reference = data.reference;
    const refParts = reference.match(/^(.+?)\s+(\d+):(\d+(?:-\d+)?)$/);
    
    return {
      text: data.text,
      reference,
      book: refParts ? refParts[1] : 'Unknown',
      chapter: refParts ? refParts[2] : '1',
      verse: refParts ? refParts[3] : '1',
      translation: data.translation_name || 'WEB'
    };
  }

  // Fetch from Bolls.life (another backup)
  private async fetchFromBolls(): Promise<BibleVerse> {
    const response = await this.safeFetch('https://bolls.life/get-random-verse/ESV/');
    if (!response.ok) throw new Error('Bolls API failed');
    
    const data = await response.json();
    return {
      text: data.text,
      reference: `${data.book} ${data.chapter}:${data.verse}`,
      book: data.book,
      chapter: data.chapter.toString(),
      verse: data.verse.toString(),
      translation: 'ESV'
    };
  }

  // Try multiple APIs with fallbacks
  private async fetchVerse(): Promise<BibleVerse> {
    const apis = [
      this.fetchFromOurManna.bind(this),
      this.fetchFromBibleAPI.bind(this),
      this.fetchFromBolls.bind(this)
    ];

    for (const api of apis) {
      try {
        const verse = await api();
        if (verse.text && verse.reference) {
          return verse;
        }
      } catch (error) {
        // Silently continue to next API - no console logging to prevent error spam
        continue;
      }
    }

    // Final fallback - return a static verse if all APIs fail
    throw new Error('All Bible APIs failed');
  }

  // Fetch verse from backend API (which calls API.Bible)
  private async fetchFromBackendApi(version: string = 'KJV'): Promise<BibleVerse> {
    const { apiUrl } = await import('@/lib/api-config');
    const response = await fetch(apiUrl(`/api/daily-verse?version=${encodeURIComponent(version)}`));
    
    if (!response.ok) {
      throw new Error(`Backend API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    if (!data.success) {
      throw new Error('Backend API returned error');
    }
    
    return data.verse;
  }

  // Get available Bible versions from backend
  async getBibleVersions(): Promise<BibleVersion[]> {
    const cacheKey = 'bible_versions';
    
    if (this.versionsCache.has(cacheKey)) {
      return this.versionsCache.get(cacheKey)!;
    }

    try {
      const { apiUrl } = await import('@/lib/api-config');
      const response = await fetch(apiUrl('/api/bible-versions'));
      
      if (!response.ok) {
        throw new Error(`Failed to fetch Bible versions: ${response.status}`);
      }
      
      const data = await response.json();
      if (!data.success) {
        throw new Error('Backend API returned error');
      }
      
      this.versionsCache.set(cacheKey, data.versions);
      return data.versions;
    } catch (error) {
      console.error('Error fetching Bible versions:', error);
      // Return default free/public domain versions on error
      const defaultVersions: BibleVersion[] = [
        { id: 'KJV', name: 'King James Version', abbreviation: 'KJV', language: 'English' },
        { id: 'WEB', name: 'World English Bible', abbreviation: 'WEB', language: 'English' },
        { id: 'ASV', name: 'American Standard Version', abbreviation: 'ASV', language: 'English' },
        { id: 'BBE', name: 'Bible in Basic English', abbreviation: 'BBE', language: 'English' }
      ];
      this.versionsCache.set(cacheKey, defaultVersions);
      return defaultVersions;
    }
  }

  // Get daily verse with caching and API.Bible integration
  async getDailyVerse(translation: string = 'KJV'): Promise<DailyVerse> {
    const todayKey = `${this.getTodayKey()}_${translation}`;
    
    // Check cache first
    if (this.cache.has(todayKey)) {
      return this.cache.get(todayKey)!;
    }

    let dailyVerse: DailyVerse;
    
    try {
      // Try to get verse from backend API (which calls API.Bible)
      const verse = await this.fetchFromBackendApi(translation);
      
      dailyVerse = {
        ...verse,
        date: this.getTodayKey(),
        meaning: this.generateMeaning(verse),
        application: this.generateApplication(verse)
      };
    } catch (error) {
      console.error('Backend API failed, using fallback verse:', error);
      
      // Fallback to inspirational verses if API fails
      const fallbackVerses = [
        {
          text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
          reference: "Proverbs 3:5-6",
          book: "Proverbs",
          chapter: "3",
          verse: "5-6",
          translation: "NIV"
        },
        {
          text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, to give you hope and a future.",
          reference: "Jeremiah 29:11",
          book: "Jeremiah",
          chapter: "29",
          verse: "11",
          translation: "NIV"
        },
        {
          text: "I can do all this through him who gives me strength.",
          reference: "Philippians 4:13",
          book: "Philippians",
          chapter: "4",
          verse: "13",
          translation: "NIV"
        }
      ];
      
      const randomVerse = fallbackVerses[Math.floor(Math.random() * fallbackVerses.length)];
      
      dailyVerse = {
        ...randomVerse,
        date: this.getTodayKey(),
        meaning: this.generateMeaning(randomVerse),
        application: this.generateApplication(randomVerse)
      };
    }

    // Cache for today
    this.cache.set(todayKey, dailyVerse);
    
    // Store in localStorage for offline access
    localStorage.setItem('gospelApp_dailyVerse', JSON.stringify(dailyVerse));
    
    return dailyVerse;
  }

  // Generate simple meaning for verses
  private generateMeaning(verse: BibleVerse): string {
    const meanings = {
      'trust': 'This verse teaches us about placing our confidence and faith in God rather than relying solely on our own understanding.',
      'love': 'This passage reveals the depth of God\'s love for humanity and calls us to love others in the same way.',
      'faith': 'This scripture encourages us to have unwavering faith and confidence in God\'s promises and character.',
      'hope': 'This verse reminds us that our hope comes from God and that He provides strength for every situation.',
      'peace': 'This passage teaches about the peace that comes from God and how it surpasses human understanding.',
      'strength': 'This scripture shows us that our strength comes from the Lord and He empowers us in times of weakness.',
      'wisdom': 'This verse highlights the importance of seeking God\'s wisdom and understanding in all aspects of life.',
      'joy': 'This passage speaks about the joy that comes from knowing God and walking in His ways.'
    };

    const text = verse.text.toLowerCase();
    for (const [keyword, meaning] of Object.entries(meanings)) {
      if (text.includes(keyword)) {
        return meaning;
      }
    }

    return 'This verse provides guidance and encouragement for our daily walk with God, reminding us of His faithfulness and love.';
  }

  // Generate simple application for verses
  private generateApplication(verse: BibleVerse): string {
    const applications = {
      'trust': 'Today, bring your concerns and decisions to God in prayer. Instead of relying only on your own judgment, ask for His guidance and wisdom.',
      'love': 'Look for opportunities to show love to others today - through kind words, helpful actions, or simply being present for someone who needs support.',
      'faith': 'When you face challenges today, remember to have faith in God\'s goodness and His ability to work all things together for your good.',
      'hope': 'If you\'re feeling discouraged, take time to remember God\'s faithfulness in the past and trust in His promises for your future.',
      'peace': 'In moments of anxiety or stress today, pause and pray, asking God to fill your heart with His peace that transcends understanding.',
      'strength': 'When you feel weak or overwhelmed, remember that God\'s strength is made perfect in your weakness. Lean on Him for support.',
      'wisdom': 'Before making important decisions today, ask God for wisdom and discernment. Seek His perspective through prayer and Scripture.',
      'joy': 'Choose to find joy in God\'s presence today. Celebrate His goodness and share that joy with others around you.'
    };

    const text = verse.text.toLowerCase();
    for (const [keyword, application] of Object.entries(applications)) {
      if (text.includes(keyword)) {
        return application;
      }
    }

    return 'Reflect on this verse throughout your day. Consider how God might be speaking to you through these words and how you can apply them to your current circumstances.';
  }

  // Search for specific verses using API.Bible
  async searchVerses(query: string, bibleId: string = 'de4e12af7f28f599-02'): Promise<BibleVerse[]> {
    if (!this.API_KEY || query.length < 3) {
      return [];
    }
    
    try {
      const response = await fetch(`${this.API_BIBLE_BASE_URL}/bibles/${bibleId}/search?query=${encodeURIComponent(query)}&limit=10`, {
        headers: {
          'api-key': this.API_KEY
        }
      });
      
      if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`);
      }
      
      const data = await response.json();
      
      return data.data.verses.map((verse: any) => {
        const refParts = verse.reference.match(/^(.+?)\s+(\d+):(\d+(?:-\d+)?)$/);
        
        return {
          text: verse.text.replace(/<[^>]*>/g, '').trim(),
          reference: verse.reference,
          book: refParts ? refParts[1] : 'Unknown',
          chapter: refParts ? refParts[2] : '1',
          verse: refParts ? refParts[3] : '1',
          translation: bibleId === '9879dbb7cfe39e4d-03' ? 'WEB' : 'KJV'
        };
      });
    } catch (error) {
      console.error('Bible search failed:', error);
      return [];
    }
  }

  // Get specific verse by reference
  async getVerse(reference: string, bibleId: string = 'de4e12af7f28f599-02'): Promise<BibleVerse | null> {
    if (!this.API_KEY) {
      return null;
    }
    
    try {
      // For now, return null since we're focusing on daily verses from backend
      return null;
    } catch (error) {
      console.error('Failed to fetch specific verse:', error);
      return null;
    }
  }
  
  // Helper to format reference for API.Bible
  private formatReferenceForApi(reference: string): string {
    // This is a simplified version - in a full implementation,
    // you'd want a complete book name to abbreviation mapping
    const bookMappings: { [key: string]: string } = {
      'john': 'JHN',
      'genesis': 'GEN',
      'psalms': 'PSA',
      'proverbs': 'PRO',
      'matthew': 'MAT',
      'romans': 'ROM',
      'philippians': 'PHP',
      'jeremiah': 'JER'
    };
    
    const parts = reference.toLowerCase().match(/^(.+?)\s+(\d+):(\d+(?:-\d+)?)$/);
    if (!parts) return 'JHN.3.16'; // Default fallback
    
    const book = bookMappings[parts[1]] || 'JHN';
    return `${book}.${parts[2]}.${parts[3]}`;
  }
}

export const bibleService = new BibleService();

// For notifications service to access verses with version preference
export const getBibleVerse = (version?: string) => {
  // Get user's preferred version from localStorage if not provided
  if (!version) {
    const savedPreferences = localStorage.getItem("gospelAppPreferences");
    if (savedPreferences) {
      try {
        const prefs = JSON.parse(savedPreferences);
        version = prefs.bibleVersion || 'NIV';
      } catch (e) {
        version = 'NIV';
      }
    } else {
      version = 'NIV';
    }
  }
  return bibleService.getDailyVerse(version);
};