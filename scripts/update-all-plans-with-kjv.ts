/**
 * Script to update all discipleship plans with full embedded KJV Scripture text
 * Usage: tsx scripts/update-all-plans-with-kjv.ts
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// KJV Bible ID for API.Bible
const KJV_BIBLE_ID = 'de4e12af7f28f599-02';
const API_BIBLE_BASE_URL = 'https://api.scripture.api.bible/v1';
const API_KEY = process.env.VITE_API_BIBLE_KEY || process.env.API_BIBLE_KEY;

if (!API_KEY) {
  console.error('Error: API_BIBLE_KEY or VITE_API_BIBLE_KEY environment variable not set');
  process.exit(1);
}

interface ScriptureItem {
  reference: string;
  currentBody: string;
  lineNumber: number;
}

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
  const normalized = reference.replace(/–/g, '-');
  const match = normalized.match(/^(.+?)\s+(\d+):(\d+)(?:-(\d+))?$/);
  if (!match) throw new Error(`Invalid reference format: ${reference}`);

  const [, bookName, chapter, startVerse, endVerse] = match;
  const bookId = BOOK_MAP[bookName];
  if (!bookId) throw new Error(`Unknown book: ${bookName}`);

  if (endVerse) {
    return `${bookId}.${chapter}.${startVerse}-${bookId}.${chapter}.${endVerse}`;
  }
  return `${bookId}.${chapter}.${startVerse}`;
}

async function fetchKJVText(reference: string): Promise<string> {
  try {
    const verseId = referenceToVerseId(reference);
    const url = `${API_BIBLE_BASE_URL}/bibles/${KJV_BIBLE_ID}/verses/${verseId}?content-type=text&include-notes=false&include-titles=false&include-chapter-numbers=false&include-verse-numbers=false&include-verse-spans=false`;
    
    console.log(`  Fetching ${reference}...`);
    
    const response = await fetch(url, {
      headers: { 'api-key': API_KEY! }
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    let content = data.data.content
      .replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
      .replace(/\[\d+\]/g, '') // Remove footnote markers
      .trim();
    
    // Format multi-verse passages with line breaks
    if (content.includes('  ')) {
      const verses = content.split('  ').filter(v => v.trim());
      return verses.map(v => `> "${v.trim()}"`).join('  \n');
    }
    
    return `> "${content}"`;
  } catch (error) {
    console.error(`  ERROR fetching ${reference}:`, error);
    return `> "[Error fetching ${reference}]"`;
  }
}

async function extractScriptureReferences(fileContent: string): Promise<Array<{ref: string, meaning: string, app: string}>> {
  const references: Array<{ref: string, meaning: string, app: string}> = [];
  const lines = fileContent.split('\n');
  
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    
    // Look for scripture items
    if (line.includes('type: "scripture"')) {
      // Find the reference
      let refLine = i + 1;
      while (refLine < lines.length && !lines[refLine].includes('reference:')) {
        refLine++;
      }
      
      if (refLine < lines.length) {
        const refMatch = lines[refLine].match(/reference:\s*["']([^"']+)["']/);
        if (refMatch) {
          const ref = refMatch[1];
          
          // Extract existing meaning and application
          let bodyStart = i;
          while (bodyStart < lines.length && !lines[bodyStart].includes('body: `')) {
            bodyStart++;
          }
          
          let bodyEnd = bodyStart + 1;
          while (bodyEnd < lines.length && !lines[bodyEnd].trim().startsWith('`')) {
            bodyEnd++;
          }
          
          const bodyContent = lines.slice(bodyStart + 1, bodyEnd).join('\n');
          
          // Extract meaning and application
          const meaningMatch = bodyContent.match(/\*\*(?:Plain )?Meaning:\*\*\s*(.+?)(?=\n\n\*\*Application)/s);
          const appMatch = bodyContent.match(/\*\*Application:\*\*\s*(.+?)$/s);
          
          const meaning = meaningMatch ? meaningMatch[1].trim() : '';
          const app = appMatch ? appMatch[1].trim() : '';
          
          references.push({ ref, meaning, app });
        }
      }
    }
    i++;
  }
  
  return references;
}

async function main() {
  const filePath = join(process.cwd(), 'client/src/features/discipleship/discipleshipPlans.ts');
  console.log('Reading discipleship plans file...');
  
  let fileContent = readFileSync(filePath, 'utf-8');
  
  console.log('\nExtracting scripture references...');
  const references = await extractScriptureReferences(fileContent);
  console.log(`Found ${references.length} scripture items\n`);
  
  // Group references
  const uniqueRefs = Array.from(new Set(references.map(r => r.ref)));
  console.log(`Unique references: ${uniqueRefs.length}\n`);
  
  // Fetch all unique KJV texts
  const kjvTexts = new Map<string, string>();
  let count = 0;
  
  for (const ref of uniqueRefs) {
    count++;
    console.log(`[${count}/${uniqueRefs.length}] Fetching ${ref}...`);
    const kjvText = await fetchKJVText(ref);
    kjvTexts.set(ref, kjvText);
    
    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 300));
  }
  
  console.log(`\nFetched ${kjvTexts.size} KJV passages`);
  console.log('\nUpdating file...');
  
  // Now update the file
  for (const {ref, meaning, app} of references) {
    const kjvText = kjvTexts.get(ref);
    if (!kjvText) continue;
    
    // Find and replace the body content
    const oldPattern = new RegExp(
      `(reference:\\s*["']${ref.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'],?\\s*body:\\s*\`)([\\s\\S]*?)(\`,)`,
      'g'
    );
    
    const newBody = `
**Scripture (KJV)**  
${kjvText}

**Meaning:** ${meaning}  
**Application:** ${app}
    `.trim();
    
    fileContent = fileContent.replace(oldPattern, `$1${newBody}$3`);
  }
  
  console.log('Writing updated file...');
  writeFileSync(filePath, fileContent, 'utf-8');
  
  console.log('\n✓ Successfully updated all plans with embedded KJV Scripture!');
  console.log(`  Total scripture items updated: ${references.length}`);
}

main().catch(console.error);
