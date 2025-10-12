import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookmarkCheck, BookmarkX, ChevronLeft, Book, Loader2 } from "lucide-react";
import { store } from "@/lib/appStore";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "@/lib/translations";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SavedVersesPageProps {
  onBack?: () => void;
  language?: string;
}

interface VerseContent {
  text: string;
  reference: string;
}

export default function SavedVersesPage({ onBack, language = "en" }: SavedVersesPageProps) {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [selectedVerse, setSelectedVerse] = useState<VerseContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const t = useTranslations(language);

  useEffect(() => {
    // Load bookmarks when page opens
    const savedBookmarks = store.getBookmarks();
    setBookmarks(savedBookmarks);
  }, []);

  const removeBookmark = (ref: string) => {
    store.removeBookmark(ref);
    setBookmarks(store.getBookmarks());
    toast({
      title: t.bookmarkRemoved,
      description: `${ref} ${t.removedFromSavedVerses}`,
    });
  };

  const fetchAndDisplayVerse = async (reference: string) => {
    setIsLoading(true);
    setIsDialogOpen(true);

    try {
      const response = await fetch('/api/bible-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: reference,
          version: 'NIV'
        }),
      });

      const data = await response.json();

      if (data.success && data.verses && data.verses.length > 0) {
        setSelectedVerse({
          text: data.verses[0].text,
          reference: data.verses[0].reference,
        });
      } else if (data.success && data.text) {
        // OpenAI fallback response
        setSelectedVerse({
          text: data.text,
          reference: reference,
        });
      } else {
        throw new Error('Failed to fetch verse');
      }
    } catch (error) {
      console.error('Error fetching verse:', error);
      toast({
        title: t.errorLoadingVerse,
        description: t.couldNotLoadVerse,
        variant: "destructive",
      });
      setIsDialogOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-6 border-b border-gray-200 sticky top-0 z-10 ios-safe-top">
        <div className="flex items-center gap-3 mb-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            data-testid="button-back"
            aria-label="Go back"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t.savedVerses}</h1>
            <p className="text-sm text-gray-600">
              {bookmarks.length} {bookmarks.length === 1 ? t.verse : t.verses} {t.saved}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        {bookmarks.length === 0 ? (
          <Card className="bg-white shadow-sm">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookmarkCheck className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t.noSavedVersesYet}
              </h3>
              <p className="text-gray-600">
                {t.bookmarkVersesMessage}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {bookmarks.map((reference, index) => (
              <Card 
                key={`${reference}-${index}`} 
                className="bg-white shadow-sm hover:shadow-md transition-shadow"
                data-testid={`card-bookmark-${index}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <BookmarkCheck className="w-5 h-5 text-blue-600" />
                        <h3 className="font-semibold text-gray-900">
                          {reference}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        {t.tapToViewVerseInContext}
                      </p>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeBookmark(reference)}
                          data-testid={`button-remove-bookmark-${index}`}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <BookmarkX className="w-4 h-4 mr-1" />
                          {t.remove}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => fetchAndDisplayVerse(reference)}
                          data-testid={`button-read-verse-${index}`}
                        >
                          <Book className="w-4 h-4 mr-1" />
                          {t.read}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Verse Display Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {selectedVerse?.reference || t.scripture}
            </DialogTitle>
            <DialogDescription>
              {t.bibleVerse}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : selectedVerse ? (
              <div className="space-y-4">
                <p className="text-base leading-relaxed text-gray-700">
                  "{selectedVerse.text}"
                </p>
                <p className="text-sm font-semibold text-gray-600">
                  - {selectedVerse.reference}
                </p>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                {t.noVerseContentAvailable}
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
