/**
 * Script to fetch KJV verses from API.Bible for all discipleship plan scripture references
 * Usage: tsx scripts/fetch-kjv-verses.ts
 */

// KJV Bible ID for API.Bible
const KJV_BIBLE_ID = 'de4e12af7f28f599-02';
const API_BIBLE_BASE_URL = 'https://api.scripture.api.bible/v1';
const API_KEY = process.env.VITE_API_BIBLE_KEY || process.env.API_BIBLE_KEY;

if (!API_KEY) {
  console.error('Error: API_BIBLE_KEY or VITE_API_BIBLE_KEY environment variable not set');
  process.exit(1);
}

interface VerseData {
  data: {
    id: string;
    orgId: string;
    bookId: string;
    chapterId: string;
    content: string;
    reference: string;
    verseCount: number;
    copyright: string;
  };
}

/**
 * Convert reference like "Romans 8:1" to API.Bible verse ID format
 */
function referenceToVerseId(reference: string): string {
  // Book name mappings to API.Bible book IDs
  const bookMap: Record<string, string> = {
    'Genesis': 'GEN',
    'Exodus': 'EXO',
    'Leviticus': 'LEV',
    'Numbers': 'NUM',
    'Deuteronomy': 'DEU',
    'Joshua': 'JOS',
    'Judges': 'JDG',
    'Ruth': 'RUT',
    '1 Samuel': '1SA',
    '2 Samuel': '2SA',
    '1 Kings': '1KI',
    '2 Kings': '2KI',
    '1 Chronicles': '1CH',
    '2 Chronicles': '2CH',
    'Ezra': 'EZR',
    'Nehemiah': 'NEH',
    'Esther': 'EST',
    'Job': 'JOB',
    'Psalm': 'PSA',
    'Psalms': 'PSA',
    'Proverbs': 'PRO',
    'Ecclesiastes': 'ECC',
    'Song of Solomon': 'SNG',
    'Isaiah': 'ISA',
    'Jeremiah': 'JER',
    'Lamentations': 'LAM',
    'Ezekiel': 'EZK',
    'Daniel': 'DAN',
    'Hosea': 'HOS',
    'Joel': 'JOL',
    'Amos': 'AMO',
    'Obadiah': 'OBA',
    'Jonah': 'JON',
    'Micah': 'MIC',
    'Nahum': 'NAM',
    'Habakkuk': 'HAB',
    'Zephaniah': 'ZEP',
    'Haggai': 'HAG',
    'Zechariah': 'ZEC',
    'Malachi': 'MAL',
    'Matthew': 'MAT',
    'Mark': 'MRK',
    'Luke': 'LUK',
    'John': 'JHN',
    'Acts': 'ACT',
    'Romans': 'ROM',
    '1 Corinthians': '1CO',
    '2 Corinthians': '2CO',
    'Galatians': 'GAL',
    'Ephesians': 'EPH',
    'Philippians': 'PHP',
    'Colossians': 'COL',
    '1 Thessalonians': '1TH',
    '2 Thessalonians': '2TH',
    '1 Timothy': '1TI',
    '2 Timothy': '2TI',
    'Titus': 'TIT',
    'Philemon': 'PHM',
    'Hebrews': 'HEB',
    'James': 'JAS',
    '1 Peter': '1PE',
    '2 Peter': '2PE',
    '1 John': '1JN',
    '2 John': '2JN',
    '3 John': '3JN',
    'Jude': 'JUD',
    'Revelation': 'REV',
  };

  // Parse reference like "Romans 8:1" or "Romans 8:1-2" or "Romans 8:1–2" (en-dash)
  // Normalize en-dash to hyphen first
  const normalized = reference.replace(/–/g, '-');
  const match = normalized.match(/^(.+?)\s+(\d+):(\d+)(?:-(\d+))?$/);
  if (!match) {
    throw new Error(`Invalid reference format: ${reference}`);
  }

  const [, bookName, chapter, startVerse, endVerse] = match;
  const bookId = bookMap[bookName];
  
  if (!bookId) {
    throw new Error(`Unknown book: ${bookName}`);
  }

  // Format: BOOKID.CHAPTER.VERSE or BOOKID.CHAPTER.VERSE-BOOKID.CHAPTER.ENDVERSE
  if (endVerse) {
    return `${bookId}.${chapter}.${startVerse}-${bookId}.${chapter}.${endVerse}`;
  }
  return `${bookId}.${chapter}.${startVerse}`;
}

/**
 * Fetch a verse from API.Bible
 */
async function fetchVerse(reference: string): Promise<string> {
  try {
    const verseId = referenceToVerseId(reference);
    const url = `${API_BIBLE_BASE_URL}/bibles/${KJV_BIBLE_ID}/verses/${verseId}?content-type=text&include-notes=false&include-titles=false&include-chapter-numbers=false&include-verse-numbers=false`;
    
    console.log(`Fetching ${reference} (${verseId})...`);
    
    const response = await fetch(url, {
      headers: {
        'api-key': API_KEY!
      }
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data: VerseData = await response.json();
    
    // Clean up the content - remove HTML tags and extra whitespace
    let content = data.data.content
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/\s+/g, ' ')     // Normalize whitespace
      .trim();
    
    // Format as blockquote
    const lines = content.split('. ').filter(l => l.trim());
    const formatted = lines.map(line => `> "${line.trim()}${line.endsWith('.') ? '' : '.'}"`).join('  \n');
    
    return formatted;
  } catch (error) {
    console.error(`Error fetching ${reference}:`, error);
    throw error;
  }
}

/**
 * Sample references to test
 */
const sampleReferences = [
  'Romans 8:1',
  'Psalm 103:12',
  'Colossians 2:13–14',
  'John 1:12',
  'Romans 8:15–16',
  '1 John 3:1',
];

async function main() {
  console.log('Fetching KJV verses from API.Bible...\n');
  console.log('='.repeat(80));
  
  for (const ref of sampleReferences) {
    try {
      const verse = await fetchVerse(ref);
      console.log(`\n${ref}:`);
      console.log(verse);
      console.log('-'.repeat(80));
      
      // Rate limiting - wait 500ms between requests
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`Failed to fetch ${ref}`);
    }
  }
  
  console.log('\n' + '='.repeat(80));
  console.log('Done!');
}

main();
