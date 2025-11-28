import TopicalBibleSearchCard from "@/components/TopicalBibleSearchCard";
import { BibleVersionCode } from "@/config/bibleVersions";
import { FeatureBoundary } from "@/components/FeatureBoundary";
import { HeaderNavigation } from "@/components/NavigationButtons";
import { AppPage } from "@/config/routesConfig";

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
    if (onNavigate) {
      onNavigate('image-scripture', payload);
    }
  };

  const handleNavigate = (page: AppPage) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <>
      {/* Header with Back and Home Buttons */}
      <div className="sticky top-0 z-10 bg-amber-50/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-amber-200 dark:border-gray-700 ios-safe-top">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HeaderNavigation
              currentPage="topic-search"
              onNavigate={handleNavigate}
              showHome={false}
            />
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
              Topical Bible Search
            </h1>
          </div>
          <HeaderNavigation
            currentPage="topic-search"
            onNavigate={handleNavigate}
            showBack={false}
          />
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
