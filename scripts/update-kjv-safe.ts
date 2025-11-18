/**
 * Safer script to update scripture items with KJV text
 * Processes file line-by-line to avoid memory issues
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const KJV_BIBLE_ID = 'de4e12af7f28f599-02';
const API_BIBLE_BASE_URL = 'https://api.scripture.api.bible/v1';
const API_KEY = process.env.VITE_API_BIBLE_KEY || process.env.API_BIBLE_KEY;

if (!API_KEY) {
  console.error('Error: API key not set');
  process.exit(1);
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
  // Handle comma-separated verses like "Matthew 4:4, 11"
  if (reference.includes(',')) {
    const parts = reference.split(',').map(s => s.trim());
    const [bookChapter] = parts[0].split(':');
    const verses = parts.map((p, i) => {
      if (i === 0) return p.split(':')[1];
      return p;
    });
    // Just use the first verse for comma-separated
    const normalized = `${bookChapter}:${verses[0]}`;
    return referenceToVerseId(normalized);
  }

  const normalized = reference.replace(/–/g, '-');
  const match = normalized.match(/^(.+?)\s+(\d+):(\d+)(?:-(\d+))?$/);
  if (!match) throw new Error(`Invalid reference: ${reference}`);

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

    const response = await fetch(url, { headers: { 'api-key': API_KEY! } });
    if (!response.ok) {
      console.warn(`  Warning: Could not fetch ${reference}`);
      return '';
    }

    const data = await response.json();
    let content = data.data.content
      .replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
      .replace(/\[\d+\]/g, '')
      .trim();

    // Format as blockquote - for multi-verse, try to add line breaks
    if (reference.includes('-') || reference.includes('–')) {
      // Try to split on periods for better formatting
      const sentences = content.split(/\.\s+/);
      if (sentences.length > 1) {
        return sentences.map(s => `> "${s.trim()}${s.endsWith('.') ? '' : '.'}"`.replace('..', '.')).join('  \n');
      }
    }

    return `> "${content}"`;
  } catch (error) {
    console.warn(`  Warning: Error fetching ${reference}`);
    return '';
  }
}

interface ScriptureBlock {
  startLine: number;
  endLine: number;
  reference: string;
  hasKJV: boolean;
  id: string;
}

function findScriptureBlocks(lines: string[]): ScriptureBlock[] {
  const blocks: ScriptureBlock[] = [];
  let i = 0;

  while (i < lines.length) {
    if (lines[i].includes('type: "scripture"')) {
      const startLine = i - 1; // Include the opening brace
      let endLine = i;
      let reference = '';
      let id = '';
      let hasKJV = false;

      // Find the end of this scripture block
      while (endLine < lines.length && !lines[endLine].trim().startsWith('},')) {
        const line = lines[endLine];
        
        if (line.includes('reference:')) {
          const match = line.match(/reference:\s*["']([^"']+)["']/);
          if (match) reference = match[1];
        }
        
        if (line.includes('id:')) {
          const match = line.match(/id:\s*["']([^"']+)["']/);
          if (match) id = match[1];
        }
        
        if (line.includes('**Scripture (KJV)**')) {
          hasKJV = true;
        }
        
        endLine++;
      }

      if (reference && !hasKJV) {
        blocks.push({ startLine, endLine, reference, hasKJV: false, id });
      }

      i = endLine + 1;
    } else {
      i++;
    }
  }

  return blocks;
}

function extractMeaningAndApplication(lines: string[], startLine: number, endLine: number): { meaning: string, application: string } {
  const bodyLines = lines.slice(startLine, endLine + 1).join('\n');
  
  const meaningMatch = bodyContent.match(/\*\*(?:Plain )?Meaning:\*\*\s*([^\n]+)/);
  const appMatch = bodyLines.match(/\*\*Application:\*\*\s*([^\n]+)/);
  
  return {
    meaning: meaningMatch ? meaningMatch[1].trim() : 'No meaning found',
    application: appMatch ? appMatch[1].trim() : 'No application found'
  };
}

async function main() {
  console.log('🚀 Starting safer KJV update...\n');

  const filePath = join(process.cwd(), 'client/src/features/discipleship/discipleshipPlans.ts');
  const lines = readFileSync(filePath, 'utf-8').split('\n');

  console.log('📖 Finding scripture blocks...');
  const blocks = findScriptureBlocks(lines);
  console.log(`Found ${blocks.length} scripture blocks needing KJV text\n`);

  // Fetch KJV texts
  const kjvMap = new Map<string, string>();
  const uniqueRefs = Array.from(new Set(blocks.map(b => b.reference)));
  
  console.log(`Fetching ${uniqueRefs.length} unique references...\n`);
  
  for (let i = 0; i < uniqueRefs.length; i++) {
    const ref = uniqueRefs[i];
    console.log(`[${i + 1}/${uniqueRefs.length}] ${ref}`);
    const kjv = await fetchKJVText(ref);
    if (kjv) kjvMap.set(ref, kjv);
    await new Promise(r => setTimeout(r, 300));
  }

  console.log(`\n✓ Fetched ${kjvMap.size} KJV passages\n`);
  console.log('Updating file...\n');

  // Now update blocks from bottom to top (so line numbers stay valid)
  let updateCount = 0;
  
  for (const block of blocks.reverse()) {
    const kjv = kjvMap.get(block.reference);
    if (!kjv) {
      console.log(`  Skip (no KJV): ${block.reference}`);
      continue;
    }

    // Find body line
    let bodyLineIdx = -1;
    for (let i = block.startLine; i <= block.endLine; i++) {
      if (lines[i].includes('body: `')) {
        bodyLineIdx = i;
        break;
      }
    }

    if (bodyLineIdx === -1) {
      console.log(`  Skip (no body): ${block.reference}`);
      continue;
    }

    // Find where body ends (line with closing `)
    let bodyEndIdx = bodyLineIdx + 1;
    while (bodyEndIdx < lines.length && !lines[bodyEndIdx].trim().startsWith('`')) {
      bodyEndIdx++;
    }

    // Extract current meaning/application
    const bodyContent = lines.slice(bodyLineIdx + 1, bodyEndIdx).join('\n');
    const meaningMatch = bodyContent.match(/\*\*(?:Plain )?Meaning:\*\*\s*([^\n]+)/);
    const appMatch = bodyContent.match(/\*\*Application:\*\*\s*([^\n]+)/);

    const meaning = meaningMatch ? meaningMatch[1].trim() : 'No meaning found';
    const application = appMatch ? appMatch[1].trim() : 'No application found';

    // Build new body
    const newBody = [
      '',
      '**Scripture (KJV)**  ',
      kjv,
      '',
      `**Meaning:** ${meaning}  `,
      `**Application:** ${application}`,
      '  '.trim(),
    ];

    // Replace the lines
    const hasTrim = lines[bodyEndIdx].includes('.trim()');
    lines[bodyEndIdx] = hasTrim ? '`.trim(),' : '`,'
    
    // Remove old body content
    lines.splice(bodyLineIdx + 1, bodyEndIdx - bodyLineIdx - 1, ...newBody);

    updateCount++;
    console.log(`  ✓ ${block.reference}`);
  }

  // Write back
  writeFileSync(filePath, lines.join('\n'), 'utf-8');

  console.log(`\n✨ Updated ${updateCount} scripture items!`);
  
  // Verify
  const final = lines.join('\n');
  console.log('\n🔍 Verification:');
  console.log(`  **Meaning:** ${(final.match(/\*\*Meaning:\*\*/g) || []).length}`);
  console.log(`  **Plain Meaning:** ${(final.match(/\*\*Plain Meaning:\*\*/g) || []).length}`);
  console.log(`  **Scripture (KJV)** ${(final.match(/\*\*Scripture \(KJV\)\*\*/g) || []).length}`);
}

main().catch(console.error);
