import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import bibleStructure from "@/data/bibleStructure.json";

interface ScriptureSelectorProps {
  onReferenceSelected: (ref: string) => void;
}

export default function ScriptureSelector({ onReferenceSelected }: ScriptureSelectorProps) {
  const [selectedBook, setSelectedBook] = useState("Genesis");
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [selectedVerse, setSelectedVerse] = useState<number>(1);

  const books = Object.keys(bibleStructure);

  const chapterCount = bibleStructure[selectedBook as keyof typeof bibleStructure]?.chapters?.length || 1;
  const versesInChapter = bibleStructure[selectedBook as keyof typeof bibleStructure]?.chapters[selectedChapter - 1] || 1;

  useEffect(() => {
    setSelectedChapter(1);
    setSelectedVerse(1);
  }, [selectedBook]);

  useEffect(() => {
    setSelectedVerse(1);
  }, [selectedChapter]);

  const handleSubmit = () => {
    onReferenceSelected(`${selectedBook} ${selectedChapter}:${selectedVerse}`);
  };

  return (
    <div className="p-4 space-y-3 rounded-lg bg-card border" data-testid="scripture-selector">
      <div className="space-y-2">
        <label className="text-sm font-semibold">Book</label>
        <select
          value={selectedBook}
          onChange={(e) => setSelectedBook(e.target.value)}
          className="w-full border rounded-lg p-2 bg-background text-foreground"
          data-testid="select-book"
        >
          {books.map((book) => (
            <option key={book} value={book}>
              {book}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-semibold">Chapter</label>
          <select
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(Number(e.target.value))}
            className="w-full border rounded-lg p-2 bg-background text-foreground"
            data-testid="select-chapter"
          >
            {Array.from({ length: chapterCount }, (_, i) => i + 1).map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold">Verse</label>
          <select
            value={selectedVerse}
            onChange={(e) => setSelectedVerse(Number(e.target.value))}
            className="w-full border rounded-lg p-2 bg-background text-foreground"
            data-testid="select-verse"
          >
            {Array.from({ length: versesInChapter }, (_, i) => i + 1).map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>
      </div>

      <Button className="w-full bg-green-600 hover:bg-green-700 text-white" onClick={handleSubmit} data-testid="button-search-verse-selector">
        Search Verse
      </Button>
    </div>
  );
}
