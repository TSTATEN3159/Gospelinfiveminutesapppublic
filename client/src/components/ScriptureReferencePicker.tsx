// client/src/components/ScriptureReferencePicker.tsx

import { useEffect, useState } from "react";
import { BIBLE_BOOKS, BibleBook, MAX_VERSES_PER_CHAPTER } from "@/data/bibleBooks";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";

export interface ScriptureReferenceSelection {
  bookId: string;
  bookName: string;
  chapter: number;
  verseStart: number;
  verseEnd?: number; // optional range support for later
}

interface ScriptureReferencePickerProps {
  label?: string;
  value?: ScriptureReferenceSelection;
  onChange?: (value: ScriptureReferenceSelection) => void;
  showRange?: boolean; // allow verse range selection
}

export function ScriptureReferencePicker({
  label = "Scripture",
  value,
  onChange,
  showRange = false
}: ScriptureReferencePickerProps) {
  const defaultBook: BibleBook = BIBLE_BOOKS[0];

  const [bookId, setBookId] = useState<string>(value?.bookId ?? defaultBook.id);
  const [chapter, setChapter] = useState<number>(value?.chapter ?? 1);
  const [verseStart, setVerseStart] = useState<number>(value?.verseStart ?? 1);
  const [verseEnd, setVerseEnd] = useState<number>(value?.verseEnd ?? value?.verseStart ?? 1);

  const currentBook = BIBLE_BOOKS.find(b => b.id === bookId) ?? defaultBook;

  // If external value changes, sync
  useEffect(() => {
    if (!value) return;
    setBookId(value.bookId);
    setChapter(value.chapter);
    setVerseStart(value.verseStart);
    setVerseEnd(value.verseEnd ?? value.verseStart);
  }, [value?.bookId, value?.chapter, value?.verseStart, value?.verseEnd]);

  const emitChange = (
    nextBookId = bookId,
    nextChapter = chapter,
    nextVerseStart = verseStart,
    nextVerseEnd = verseEnd
  ) => {
    const book = BIBLE_BOOKS.find(b => b.id === nextBookId) ?? defaultBook;
    const normalizedEnd = showRange
      ? Math.max(nextVerseStart, nextVerseEnd ?? nextVerseStart)
      : nextVerseStart;

    const selection: ScriptureReferenceSelection = {
      bookId: nextBookId,
      bookName: book.name,
      chapter: nextChapter,
      verseStart: nextVerseStart,
      verseEnd: showRange ? normalizedEnd : undefined
    };
    onChange?.(selection);
  };

  const handleBookChange = (id: string) => {
    setBookId(id);
    // reset chapter when switching book
    const newChapter = 1;
    const newVerseStart = 1;
    const newVerseEnd = showRange ? 1 : newVerseStart;
    setChapter(newChapter);
    setVerseStart(newVerseStart);
    setVerseEnd(newVerseEnd);
    emitChange(id, newChapter, newVerseStart, newVerseEnd);
  };

  const handleChapterChange = (val: string) => {
    const ch = Number(val) || 1;
    setChapter(ch);
    const newVerseStart = 1;
    const newVerseEnd = showRange ? 1 : newVerseStart;
    setVerseStart(newVerseStart);
    setVerseEnd(newVerseEnd);
    emitChange(bookId, ch, newVerseStart, newVerseEnd);
  };

  const handleVerseStartChange = (val: string) => {
    const vs = Number(val) || 1;
    setVerseStart(vs);
    emitChange(bookId, chapter, vs, verseEnd);
  };

  const handleVerseEndChange = (val: string) => {
    const ve = Number(val) || verseStart;
    setVerseEnd(ve);
    emitChange(bookId, chapter, verseStart, ve);
  };

  // Options
  const chapterOptions = Array.from({ length: currentBook.chapters }, (_, i) => i + 1);
  const verseOptions = Array.from({ length: MAX_VERSES_PER_CHAPTER }, (_, i) => i + 1);

  return (
    <div className="space-y-2">
      {label && (
        <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">
          {label}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {/* Book */}
        <Select value={bookId} onValueChange={handleBookChange}>
          <SelectTrigger 
            className="w-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700"
            data-testid="select-book"
          >
            <SelectValue placeholder="Book" />
          </SelectTrigger>
          <SelectContent className="max-h-72">
            {BIBLE_BOOKS.map(book => (
              <SelectItem key={book.id} value={book.id}>
                {book.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Chapter */}
        <Select value={String(chapter)} onValueChange={handleChapterChange}>
          <SelectTrigger 
            className="w-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700"
            data-testid="select-chapter"
          >
            <SelectValue placeholder="Chapter" />
          </SelectTrigger>
          <SelectContent className="max-h-60">
            {chapterOptions.map(ch => (
              <SelectItem key={ch} value={String(ch)}>
                {ch}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Verse or Verse Start */}
        <Select value={String(verseStart)} onValueChange={handleVerseStartChange}>
          <SelectTrigger 
            className="w-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700"
            data-testid="select-verse-start"
          >
            <SelectValue placeholder="Verse" />
          </SelectTrigger>
          <SelectContent className="max-h-60">
            {verseOptions.map(v => (
              <SelectItem key={v} value={String(v)}>
                {v}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {showRange && (
        <div className="grid grid-cols-[auto,1fr] gap-2 items-center pt-1">
          <span className="text-xs text-slate-500 dark:text-slate-400 text-right">
            to
          </span>
          <Select value={String(verseEnd)} onValueChange={handleVerseEndChange}>
            <SelectTrigger 
              className="w-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700"
              data-testid="select-verse-end"
            >
              <SelectValue placeholder="End verse" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {verseOptions.map(v => (
                <SelectItem key={v} value={String(v)}>
                  {v}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}

// Helper: build a human-readable reference like "John 3:16" or "John 3:16-18"
export function buildReferenceString(sel: ScriptureReferenceSelection): string {
  if (sel.verseEnd && sel.verseEnd > sel.verseStart) {
    return `${sel.bookName} ${sel.chapter}:${sel.verseStart}-${sel.verseEnd}`;
  }
  return `${sel.bookName} ${sel.chapter}:${sel.verseStart}`;
}
