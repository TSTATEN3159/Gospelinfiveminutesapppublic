/**
 * Simple script to fetch and print KJV verses for a given list of references
 */

const KJV_BIBLE_ID = 'de4e12af7f28f599-02';
const API_BIBLE_BASE_URL = 'https://api.scripture.api.bible/v1';
const API_KEY = process.env.VITE_API_BIBLE_KEY || process.env.API_BIBLE_KEY;

const BOOK_MAP: Record<string, string> = {
  'Romans': 'ROM', 'Psalm': 'PSA', 'Psalms': 'PSA', 'John': 'JHN', 'Colossians': 'COL',
  '1 John': '1JN', '2 Corinthians': '2CO', 'Ephesians': 'EPH', 'Galatians': 'GAL',
  'Philippians': 'PHP', '1 Peter': '1PE', 'Matthew': 'MAT', 'Mark': 'MRK',
  'Isaiah': 'ISA', 'Proverbs': 'PRO', 'Hebrews': 'HEB', 'James': 'JAS',
  'Luke': 'LUK', 'Acts': 'ACT', 'Ezekiel': 'EZK', '2 Timothy': '2TI',
  '1 Corinthians': '1CO', 'Revelation': 'REV', 'Genesis': 'GEN', 'Jeremiah': 'JER',
};

function referenceToVerseId(ref: string): string {
  const normalized = ref.replace(/–/g, '-');
  const match = normalized.match(/^(.+?)\s+(\d+):(\d+)(?:-(\d+))?$/);
  if (!match) throw new Error(`Invalid: ${ref}`);
  
  const [, bookName, chapter, startVerse, endVerse] = match;
  const bookId = BOOK_MAP[bookName];
  if (!bookId) throw new Error(`Unknown book: ${bookName}`);
  
  return endVerse 
    ? `${bookId}.${chapter}.${startVerse}-${bookId}.${chapter}.${endVerse}`
    : `${bookId}.${chapter}.${startVerse}`;
}

async function fetchAndPrintVerse(ref: string) {
  const verseId = referenceToVerseId(ref);
  const url = `${API_BIBLE_BASE_URL}/bibles/${KJV_BIBLE_ID}/verses/${verseId}?content-type=text&include-notes=false&include-titles=false&include-chapter-numbers=false&include-verse-numbers=false&include-verse-spans=false`;
  
  const response = await fetch(url, { headers: { 'api-key': API_KEY! } });
  const data = await response.json();
  
  let content = data.data.content
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .replace(/\[\d+\]/g, '')
    .trim();
  
  console.log(`\n${'='.repeat(80)}`);
  console.log(`📖 ${ref}`);
  console.log('='.repeat(80));
  console.log(content);
  console.log('\nFormatted for TypeScript:');
  console.log(`> "${content}"`);
}

// Get references from command line or use samples
const refs = process.argv.slice(2);
const samples = refs.length > 0 ? refs : [
  'Romans 8:1',
  'Psalm 103:12',
  'Colossians 2:13–14',
  'John 1:12',
  '1 John 3:1',
];

(async () => {
  for (const ref of samples) {
    await fetchAndPrintVerse(ref);
    await new Promise(r => setTimeout(r, 300));
  }
})();
