/**
 * Script to fetch complete KJV text for all parables and update parablesData.ts
 * This ensures 100% completeness of all parable scripture text
 * Usage: tsx scripts/update-parables-kjv.ts
 */

const KJV_BIBLE_ID = 'de4e12af7f28f599-02';
const API_BIBLE_BASE_URL = 'https://api.scripture.api.bible/v1';
const API_KEY = process.env.VITE_API_BIBLE_KEY || process.env.API_BIBLE_KEY;

if (!API_KEY) {
  console.error('Error: API_BIBLE_KEY or VITE_API_BIBLE_KEY environment variable not set');
  process.exit(1);
}

const bookMap: Record<string, string> = {
  'Matthew': 'MAT',
  'Mark': 'MRK',
  'Luke': 'LUK',
  'John': 'JHN',
};

interface ParableReference {
  id: string;
  title: string;
  reference: string;
}

const PARABLES: ParableReference[] = [
  { id: "sower", title: "The Parable of the Sower", reference: "Matthew 13:3-9, 18-23" },
  { id: "good-samaritan", title: "The Good Samaritan", reference: "Luke 10:30-37" },
  { id: "prodigal-son", title: "The Prodigal Son", reference: "Luke 15:11-32" },
  { id: "mustard-seed", title: "The Mustard Seed", reference: "Matthew 13:31-32" },
  { id: "lost-sheep", title: "The Lost Sheep", reference: "Luke 15:3-7" },
  { id: "rich-fool", title: "The Rich Fool", reference: "Luke 12:16-21" },
  { id: "wedding-feast", title: "The Wedding Feast", reference: "Matthew 22:2-14" },
  { id: "ten-virgins", title: "The Ten Virgins", reference: "Matthew 25:1-13" },
  { id: "talents", title: "The Talents", reference: "Matthew 25:14-30" },
  { id: "pharisee-tax-collector", title: "The Pharisee and Tax Collector", reference: "Luke 18:10-14" },
  { id: "unforgiving-servant", title: "The Unforgiving Servant", reference: "Matthew 18:23-35" },
  { id: "hidden-treasure", title: "The Hidden Treasure", reference: "Matthew 13:44" },
  { id: "pearl", title: "The Pearl of Great Price", reference: "Matthew 13:45-46" },
  { id: "wise-foolish-builders", title: "The Wise and Foolish Builders", reference: "Matthew 7:24-27" },
  { id: "persistent-widow", title: "The Persistent Widow", reference: "Luke 18:1-8" },
  { id: "workers-vineyard", title: "The Workers in the Vineyard", reference: "Matthew 20:1-16" },
  { id: "friend-at-midnight", title: "The Friend at Midnight", reference: "Luke 11:5-8" },
  { id: "sheep-goats", title: "The Sheep and the Goats", reference: "Matthew 25:31-46" },
  { id: "leaven", title: "The Leaven", reference: "Matthew 13:33" },
  { id: "rich-man-lazarus", title: "The Rich Man and Lazarus", reference: "Luke 16:19-31" },
];

function parseComplexReference(reference: string): Array<{ book: string; chapter: number; startVerse: number; endVerse: number }> {
  const ranges: Array<{ book: string; chapter: number; startVerse: number; endVerse: number }> = [];
  
  // Handle references like "Matthew 13:3-9, 18-23"
  const parts = reference.split(',').map(p => p.trim());
  
  for (const part of parts) {
    // Match "Book Chapter:StartVerse-EndVerse" or "Chapter:StartVerse-EndVerse" or "StartVerse-EndVerse"
    const fullMatch = part.match(/^([A-Za-z\s]+)\s+(\d+):(\d+)(?:-(\d+))?$/);
    const partialMatch = part.match(/^(\d+):(\d+)(?:-(\d+))?$/);
    const rangeOnlyMatch = part.match(/^(\d+)(?:-(\d+))?$/);
    
    if (fullMatch) {
      const [, book, chapter, startVerse, endVerse] = fullMatch;
      ranges.push({
        book: book.trim(),
        chapter: parseInt(chapter),
        startVerse: parseInt(startVerse),
        endVerse: endVerse ? parseInt(endVerse) : parseInt(startVerse)
      });
    } else if (partialMatch && ranges.length > 0) {
      // Uses the previous book
      const [, chapter, startVerse, endVerse] = partialMatch;
      ranges.push({
        book: ranges[ranges.length - 1].book,
        chapter: parseInt(chapter),
        startVerse: parseInt(startVerse),
        endVerse: endVerse ? parseInt(endVerse) : parseInt(startVerse)
      });
    } else if (rangeOnlyMatch && ranges.length > 0) {
      // Just a verse range, uses previous book and chapter
      const [, startVerse, endVerse] = rangeOnlyMatch;
      const prev = ranges[ranges.length - 1];
      ranges.push({
        book: prev.book,
        chapter: prev.chapter,
        startVerse: parseInt(startVerse),
        endVerse: endVerse ? parseInt(endVerse) : parseInt(startVerse)
      });
    }
  }
  
  return ranges;
}

async function fetchVerseRange(book: string, chapter: number, startVerse: number, endVerse: number): Promise<string> {
  const bookId = bookMap[book];
  if (!bookId) {
    throw new Error(`Unknown book: ${book}`);
  }
  
  const verseId = `${bookId}.${chapter}.${startVerse}-${bookId}.${chapter}.${endVerse}`;
  const url = `${API_BIBLE_BASE_URL}/bibles/${KJV_BIBLE_ID}/verses/${verseId}?content-type=text&include-notes=false&include-titles=false&include-chapter-numbers=false&include-verse-numbers=false&include-verse-spans=false`;
  
  console.log(`  Fetching ${book} ${chapter}:${startVerse}-${endVerse} (${verseId})...`);
  
  const response = await fetch(url, {
    headers: { 'api-key': API_KEY! }
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  let content = data.data.content
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  
  return content;
}

async function fetchCompleteParableText(reference: string): Promise<string> {
  const ranges = parseComplexReference(reference);
  const texts: string[] = [];
  
  for (const range of ranges) {
    const text = await fetchVerseRange(range.book, range.chapter, range.startVerse, range.endVerse);
    texts.push(text);
    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  return texts.join(' ');
}

async function main() {
  console.log('Fetching complete KJV text for all parables...\n');
  console.log('='.repeat(80));
  
  const results: Record<string, string> = {};
  
  for (const parable of PARABLES) {
    try {
      console.log(`\n${parable.title} (${parable.reference}):`);
      const text = await fetchCompleteParableText(parable.reference);
      results[parable.id] = text;
      console.log(`✓ Fetched ${text.length} characters`);
      console.log('-'.repeat(80));
    } catch (error) {
      console.error(`✗ Failed to fetch ${parable.title}:`, error);
    }
  }
  
  console.log('\n' + '='.repeat(80));
  console.log('\nCOMPLETE PARABLE TEXTS:\n');
  
  for (const parable of PARABLES) {
    if (results[parable.id]) {
      console.log(`\n// ${parable.title}`);
      console.log(`// ${parable.reference}`);
      console.log(`parable: "${results[parable.id]}",`);
      console.log('');
    }
  }
  
  console.log('\nDone! Copy the parable texts above to update parablesData.ts');
}

main();
