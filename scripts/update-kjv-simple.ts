/**
 * Simple targeted script to update scripture items with KJV text
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const KJV_BIBLE_ID = 'de4e12af7f28f599-02';
const API_BIBLE_BASE_URL = 'https://api.scripture.api.bible/v1';
const API_KEY = process.env.VITE_API_BIBLE_KEY || process.env.API_BIBLE_KEY;

const BOOK_MAP: Record<string, string> = {
  'Genesis': 'GEN', 'Exodus': 'EXO', 'Leviticus': 'LEV', 'Numbers': 'NUM', 'Deuteronomy': 'DEU',
  'Joshua': 'JOS', 'Judges': 'JDG', 'Ruth': 'RUT', '1 Samuel': '1SA', '2 Samuel': '2SA',
  '1 Kings': '1KI', '2 Kings': '2KI', '1 Chronicles': '1CH', '2 Chronicles': '2CH',
  'Ezra': 'EZR', 'Nehemiah': 'NEH', 'Esther': 'EST', 'Job': 'JOB', 'Psalm': 'PSA', 'Psalms': 'PSA',
  'Proverbs': 'PRO', 'Ecclesiastes': 'ECC', 'Song of Solomon': 'SNG', 'Isaiah': 'ISA',
  'Jeremiah': 'JER', 'Lamentations': 'LAM', 'Ezekiel': 'EZK', 'Daniel': 'DAN', 'Hosea': 'HOS',
  'Joel': 'JOL', 'Amos': 'AMO', 'Obadiah': 'OBA', 'Jonah': 'JON', 'Micah': 'MIC', 'Nahum': 'NAM',
  'Habakkuk': 'HAB', 'Zephaniah': 'ZEP', 'Haggai': 'HAG', 'Zechariah': 'ZEC', 'Malachi': 'MAL',
  'Matthew': 'MAT', 'Mark': 'MRK', 'Luke': 'LUK', 'John': 'JHN', 'Acts': 'ACT', 'Romans': 'ROM',
  '1 Corinthians': '1CO', '2 Corinthians': '2CO', 'Galatians': 'GAL', 'Ephesians': 'EPH',
  'Philippians': 'PHP', 'Colossians': 'COL', '1 Thessalonians': '1TH', '2 Thessalonians': '2TH',
  '1 Timothy': '1TI', '2 Timothy': '2TI', 'Titus': 'TIT', 'Philemon': 'PHM', 'Hebrews': 'HEB',
  'James': 'JAS', '1 Peter': '1PE', '2 Peter': '2PE', '1 John': '1JN', '2 John': '2JN',
  '3 John': '3JN', 'Jude': 'JUD', 'Revelation': 'REV',
};

function referenceToVerseId(reference: string): string {
  // Handle comma-separated verses like "Matthew 4:4, 11" - just use first part
  if (reference.includes(',')) {
    const firstPart = reference.split(',')[0].trim();
    return referenceToVerseId(firstPart);
  }

  const normalized = reference.replace(/–/g, '-');
  const match = normalized.match(/^(.+?)\s+(\d+):(\d+)(?:-(\d+))?$/);
  if (!match) throw new Error(`Invalid: ${reference}`);

  const [, bookName, chapter, startVerse, endVerse] = match;
  const bookId = BOOK_MAP[bookName];
  if (!bookId) throw new Error(`Unknown book: ${bookName}`);

  return endVerse 
    ? `${bookId}.${chapter}.${startVerse}-${bookId}.${chapter}.${endVerse}`
    : `${bookId}.${chapter}.${startVerse}`;
}

async function fetchKJVText(reference: string): Promise<string> {
  try {
    const verseId = referenceToVerseId(reference);
    const url = `${API_BIBLE_BASE_URL}/bibles/${KJV_BIBLE_ID}/verses/${verseId}?content-type=text&include-notes=false&include-titles=false&include-chapter-numbers=false&include-verse-numbers=false&include-verse-spans=false`;

    const response = await fetch(url, { headers: { 'api-key': API_KEY! } });
    if (!response.ok) return '';

    const data = await response.json();
    let content = data.data.content
      .replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
      .replace(/\[\d+\]/g, '')
      .trim();

    return `> "${content}"`;
  } catch (error) {
    return '';
  }
}

async function main() {
  console.log('🚀 Starting simple KJV update...\n');

  const filePath = join(process.cwd(), 'client/src/features/discipleship/discipleshipPlans.ts');
  let content = readFileSync(filePath, 'utf-8');

  // Find all unique references that need updating
  const refMatches = content.match(/reference:\s*["']([^"']+)["']/g) || [];
  const allRefs = refMatches.map(m => m.match(/["']([^"']+)["']/)![1]);
  const uniqueRefs = Array.from(new Set(allRefs));

  console.log(`Total references found: ${allRefs.length}`);
  console.log(`Unique references: ${uniqueRefs.length}\n`);

  // Fetch all KJV texts
  const kjvMap = new Map<string, string>();
  
  for (let i = 0; i < uniqueRefs.length; i++) {
    const ref = uniqueRefs[i];
    console.log(`[${i + 1}/${uniqueRefs.length}] Fetching ${ref}...`);
    const kjv = await fetchKJVText(ref);
    if (kjv) kjvMap.set(ref, kjv);
    await new Promise(r => setTimeout(r, 300));
  }

  console.log(`\n✓ Fetched ${kjvMap.size} KJV texts\n`);
  console.log('Updating file...\n');

  // Now do replacements reference by reference
  let updateCount = 0;

  for (const [ref, kjv] of kjvMap) {
    if (!kjv) continue;

    // Find all occurrences of this reference
    const escRef = ref.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(
      `(reference:\\s*["']${escRef}["'],\\s*\n\\s*body:\\s*\`)([\\s\\S]*?)(\`(?:\\.trim\\(\\))?[,\\s]*\n)`,
      'g'
    );

    let matches = 0;
    content = content.replace(pattern, (match, prefix, body, suffix) => {
      // Skip if already has Scripture (KJV)
      if (body.includes('**Scripture (KJV)**')) {
        return match;
      }

      // Extract meaning and application
      const meaningMatch = body.match(/\*\*(?:Plain )?Meaning:\*\*\s*([^\n]+)/);
      const appMatch = body.match(/\*\*Application:\*\*\s*([^\n]+)/);

      if (!meaningMatch || !appMatch) {
        console.log(`  ⚠️  Could not parse: ${ref}`);
        return match;
      }

      const meaning = meaningMatch[1].trim();
      const application = appMatch[1].trim();

      // Build new body
      const newBody = `
**Scripture (KJV)**  
${kjv}

**Meaning:** ${meaning}  
**Application:** ${application}
  `.trim();

      // Ensure .trim() is present
      const newSuffix = suffix.includes('.trim()') ? suffix : suffix.replace('`', '`.trim()');

      matches++;
      return `${prefix}${newBody}${newSuffix}`;
    });

    if (matches > 0) {
      updateCount += matches;
      console.log(`  ✓ Updated ${matches}x: ${ref}`);
    }
  }

  // Write back
  writeFileSync(filePath, content, 'utf-8');

  console.log(`\n✨ Total updates: ${updateCount}`);

  // Verify
  console.log('\n🔍 Verification:');
  const meaningCount = (content.match(/\*\*Meaning:\*\*/g) || []).length;
  const plainMeaningCount = (content.match(/\*\*Plain Meaning:\*\*/g) || []).length;
  const kjvCount = (content.match(/\*\*Scripture \(KJV\)\*\*/g) || []).length;

  console.log(`  **Meaning:** ${meaningCount}`);
  console.log(`  **Plain Meaning:** ${plainMeaningCount}`);
  console.log(`  **Scripture (KJV)** ${kjvCount}`);

  if (meaningCount === 366 && plainMeaningCount === 0 && kjvCount === 366) {
    console.log('\n✅ All checks passed!');
  } else {
    console.log('\n⚠️  Some items may need manual review');
  }
}

main().catch(console.error);
