export type ParsedReference = {
  book: string;
  chapter: number;
  verses?: string;
};

// Extremely flexible regex that handles all real-world Bible reference formats:
// - "John 3:16" (standard)
// - "John 3 16" (voice dictation without colon)
// - "1 John 1:9" (numbered books)
// - "Psalm 23" (chapter only, no verse)
// - "John 3:16-18" (verse ranges)
// - "John 3:16, 18" (comma-separated with spaces)
// - "John 3:16-18, 20" (ranges and commas mixed)
// - "John 3:16a" (partial verses with letters)
// - "Song of Solomon 2:4" (multi-word books)
// Verse pattern ensures: digit(s) + optional letter(s), with comma/hyphen separators
const REFERENCE_REGEX =
  /^\s*([1-3]?\s*[A-Za-z]+(?:\s+[A-Za-z]+)*)\s+(\d+)(?:\s*:?\s*(\d+[a-z]?(?:\s*[-,]\s*\d+[a-z]*)*))?\s*$/i;

export function parseReference(input: string): ParsedReference {
  const trimmed = input.trim();

  if (!trimmed) {
    throw new Error('Please enter a verse like "John 3:16" or "Psalm 23".');
  }

  const match = trimmed.match(REFERENCE_REGEX);

  if (!match) {
    throw new Error(
      'I couldn\'t understand that reference. Try formats like "John 3:16", "Psalm 23", or "1 John 1:9".'
    );
  }

  const bookRaw = match[1];
  const chapterRaw = match[2];
  const versesRaw = match[3]; // May be undefined for chapter-only

  const book = bookRaw.replace(/\s+/g, " ").trim();
  const chapter = parseInt(chapterRaw, 10);

  if (Number.isNaN(chapter) || chapter <= 0) {
    throw new Error('Chapter must be a positive number, e.g. "John 3:16".');
  }

  // Clean up verse string if present (remove extra whitespace)
  const verses = versesRaw ? versesRaw.replace(/\s+/g, " ").trim() : undefined;

  return {
    book,
    chapter,
    verses,
  };
}
