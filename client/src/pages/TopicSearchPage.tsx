import TopicalBibleSearchCard from "@/components/TopicalBibleSearchCard";
import { BibleVersionCode } from "@/config/bibleVersions";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeatureBoundary } from "@/components/FeatureBoundary";

interface TopicSearchPageProps {
  onNavigate?: (page: string, data?: any) => void;
}

// Content component without background
function TopicSearchContent({ onNavigate }: TopicSearchPageProps) {
  const handleCreateImageFromVerse = (payload: {
    reference: string;
    text: string;
    version: BibleVersionCode;
  }) => {
    // Navigate to image scripture generator with pre-filled verse
    if (onNavigate) {
      onNavigate('image-scripture', payload);
    }
  };

  const handleBack = () => {
    if (onNavigate) {
      onNavigate('search');
    }
  };

  return (
    <>
      {/* Header with Back and Home Buttons */}
      <div className="sticky top-0 z-10 bg-amber-50/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-amber-200 dark:border-gray-700 ios-safe-top">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
              data-testid="button-back"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
              Topical Bible Search
            </h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate?.('home')}
            className="rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            data-testid="button-home"
            aria-label="Go home"
          >
            <Home className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        <TopicalBibleSearchCard 
          onNavigate={onNavigate}
          onCreateImageFromVerse={handleCreateImageFromVerse}
        />
      </div>
    </>
  );
}

// Wrapper component that owns the background
function TopicSearchPageLayout(props: TopicSearchPageProps) {
  return (
    <div className="min-h-screen pb-24 bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-800">
      <TopicSearchContent {...props} />
    </div>
  );
}

// Wrap the entire layout with FeatureBoundary
const TopicSearchPageWithBoundary = FeatureBoundary.with(
  TopicSearchPageLayout,
  "Topical Bible Search",
  (props) => props.onNavigate ? () => props.onNavigate?.('search') : undefined
);

export default TopicSearchPageWithBoundary;
