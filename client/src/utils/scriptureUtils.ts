import bibleStructure from "@/data/bibleStructure.json";
import { BOOK_NAME_MAP } from "@/data/bookNames";

interface Reference {
  bookIndex: number;
  chapter: number;
  verse: number;
}

const books = Object.keys(bibleStructure);

export function getNextReference(
  bookIndex: number,
  chapter: number,
  verse: number,
  mode: "verse" | "range" | "chapter",
  versesInChapter: number,
  rangeSize: number = 3
): Reference | null {
  const bookName = books[bookIndex];
  const bookData = bibleStructure[bookName as keyof typeof bibleStructure];
  
  if (!bookData) return null;

  if (mode === "chapter") {
    // Move to next chapter
    if (chapter < bookData.chapters.length) {
      return { bookIndex, chapter: chapter + 1, verse: 1 };
    } else if (bookIndex < books.length - 1) {
      // Move to next book, chapter 1
      return { bookIndex: bookIndex + 1, chapter: 1, verse: 1 };
    }
    return null; // End of Bible
  }

  if (mode === "verse") {
    // Move to next verse
    if (verse < versesInChapter) {
      return { bookIndex, chapter, verse: verse + 1 };
    } else if (chapter < bookData.chapters.length) {
      // Move to next chapter, verse 1
      return { bookIndex, chapter: chapter + 1, verse: 1 };
    } else if (bookIndex < books.length - 1) {
      // Move to next book
      return { bookIndex: bookIndex + 1, chapter: 1, verse: 1 };
    }
    return null; // End of Bible
  }

  if (mode === "range") {
    // Move to next range
    if (verse + rangeSize <= versesInChapter) {
      return { bookIndex, chapter, verse: verse + rangeSize };
    } else if (chapter < bookData.chapters.length) {
      // Move to next chapter
      return { bookIndex, chapter: chapter + 1, verse: 1 };
    } else if (bookIndex < books.length - 1) {
      // Move to next book
      return { bookIndex: bookIndex + 1, chapter: 1, verse: 1 };
    }
    return null; // End of Bible
  }

  return null;
}

export function getPrevReference(
  bookIndex: number,
  chapter: number,
  verse: number,
  mode: "verse" | "range" | "chapter",
  rangeSize: number = 3
): Reference | null {
  const bookName = books[bookIndex];
  const bookData = bibleStructure[bookName as keyof typeof bibleStructure];
  
  if (!bookData) return null;

  if (mode === "chapter") {
    // Move to previous chapter
    if (chapter > 1) {
      return { bookIndex, chapter: chapter - 1, verse: 1 };
    } else if (bookIndex > 0) {
      // Move to previous book, last chapter
      const prevBookName = books[bookIndex - 1];
      const prevBookData = bibleStructure[prevBookName as keyof typeof bibleStructure];
      return { bookIndex: bookIndex - 1, chapter: prevBookData.chapters.length, verse: 1 };
    }
    return null; // Beginning of Bible
  }

  if (mode === "verse") {
    // Move to previous verse
    if (verse > 1) {
      return { bookIndex, chapter, verse: verse - 1 };
    } else if (chapter > 1) {
      // Move to previous chapter, last verse
      const prevChapterVerses = bookData.chapters[chapter - 2];
      return { bookIndex, chapter: chapter - 1, verse: prevChapterVerses };
    } else if (bookIndex > 0) {
      // Move to previous book
      const prevBookName = books[bookIndex - 1];
      const prevBookData = bibleStructure[prevBookName as keyof typeof bibleStructure];
      const lastChapter = prevBookData.chapters.length;
      const lastVerse = prevBookData.chapters[lastChapter - 1];
      return { bookIndex: bookIndex - 1, chapter: lastChapter, verse: lastVerse };
    }
    return null; // Beginning of Bible
  }

  if (mode === "range") {
    // Move to previous range
    if (verse > rangeSize) {
      return { bookIndex, chapter, verse: verse - rangeSize };
    } else if (chapter > 1) {
      // Move to previous chapter
      const prevChapterVerses = bookData.chapters[chapter - 2];
      return { bookIndex, chapter: chapter - 1, verse: prevChapterVerses };
    } else if (bookIndex > 0) {
      // Move to previous book
      const prevBookName = books[bookIndex - 1];
      const prevBookData = bibleStructure[prevBookName as keyof typeof bibleStructure];
      const lastChapter = prevBookData.chapters.length;
      const lastVerse = prevBookData.chapters[lastChapter - 1];
      return { bookIndex: bookIndex - 1, chapter: lastChapter, verse: lastVerse };
    }
    return null; // Beginning of Bible
  }

  return null;
}

export function getBookIndexByName(bookName: string): number {
  return books.findIndex(b => b === bookName);
}

export function getBookNameByIndex(index: number): string {
  return books[index] || "Genesis";
}

export function formatReference(bookIndex: number, chapter: number, verse: number, mode: "verse" | "range" | "chapter", rangeSize: number = 3): string {
  const bookName = getBookNameByIndex(bookIndex);
  
  if (mode === "chapter") {
    return `${bookName} ${chapter}`;
  }
  
  if (mode === "verse") {
    return `${bookName} ${chapter}:${verse}`;
  }
  
  if (mode === "range") {
    const bookData = bibleStructure[bookName as keyof typeof bibleStructure];
    const versesInChapter = bookData?.chapters[chapter - 1] || 1;
    const endVerse = Math.min(verse + rangeSize - 1, versesInChapter);
    return `${bookName} ${chapter}:${verse}-${endVerse}`;
  }
  
  return `${bookName} ${chapter}:${verse}`;
}
