import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Trash2, BookOpen } from "lucide-react";
import { getBookmarks, removeBookmark, type Bookmark } from "@/services/bookmarkService";
import { useToast } from "@/hooks/use-toast";

interface BookmarksPageProps {
  onNavigate?: (page: string, searchQuery?: string) => void;
}

export default function BookmarksPage({ onNavigate }: BookmarksPageProps) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = () => {
    const bm = getBookmarks();
    setBookmarks(bm);
  };

  const handleRemoveBookmark = (reference: string) => {
    removeBookmark(reference);
    loadBookmarks();
    toast({
      title: "Bookmark Removed",
      description: `${reference} has been removed from your bookmarks.`,
    });
  };

  const handleLoadReference = (reference: string) => {
    if (onNavigate) {
      onNavigate('search', reference);
    }
  };

  return (
    <div className="min-h-screen pb-20 px-4 py-6 ios-safe-top ios-safe-bottom">
      <div className="max-w-md mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
            <CardTitle className="flex items-center gap-2">
              <Star className="w-6 h-6 fill-white" />
              Bookmarked Verses
            </CardTitle>
            <p className="text-sm text-white/90 mt-1">
              Your saved scriptures
            </p>
          </CardHeader>

          <CardContent className="p-6">
            {bookmarks.length === 0 && (
              <div className="text-center py-12">
                <div className="mb-4">
                  <BookOpen className="w-16 h-16 mx-auto text-gray-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  No Bookmarks Yet
                </h3>
                <p className="text-gray-500 text-sm mb-6">
                  Start bookmarking your favorite verses by clicking the star icon when reading scripture.
                </p>
                <Button
                  onClick={() => onNavigate?.('search')}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white"
                  data-testid="button-goto-search"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Find Verses
                </Button>
              </div>
            )}

            {bookmarks.length > 0 && (
              <div className="space-y-3">
                {bookmarks.map((bookmark) => (
                  <div
                    key={bookmark.reference}
                    className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200 hover:shadow-md transition-all"
                    data-testid={`bookmark-${bookmark.reference.replace(/\s/g, '-')}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <button
                          onClick={() => handleLoadReference(bookmark.reference)}
                          className="text-left hover:text-blue-600 transition-colors"
                          data-testid="button-load-bookmark"
                        >
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {bookmark.reference}
                          </h3>
                        </button>
                        {bookmark.version && (
                          <span className="text-xs text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded-full">
                            {bookmark.version}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => handleRemoveBookmark(bookmark.reference)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                        data-testid="button-remove-bookmark"
                        aria-label={`Remove ${bookmark.reference} from bookmarks`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {bookmark.text && (
                      <p className="text-sm text-gray-700 italic line-clamp-2">
                        "{bookmark.text}"
                      </p>
                    )}
                    
                    <p className="text-xs text-gray-400 mt-2">
                      Saved {new Date(bookmark.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {bookmarks.length > 0 && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              {bookmarks.length} verse{bookmarks.length === 1 ? '' : 's'} bookmarked
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
