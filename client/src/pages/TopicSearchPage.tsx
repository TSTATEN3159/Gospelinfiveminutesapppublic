import TopicalBibleSearchCard from "@/components/TopicalBibleSearchCard";
import { BibleVersionCode } from "@/config/bibleVersions";

interface TopicSearchPageProps {
  onNavigate?: (page: string, data?: any) => void;
}

export default function TopicSearchPage({ onNavigate }: TopicSearchPageProps) {
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

  return (
    <div className="min-h-screen px-4 py-6 pb-24 bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-800">
      <TopicalBibleSearchCard 
        onNavigate={onNavigate}
        onCreateImageFromVerse={handleCreateImageFromVerse}
      />
    </div>
  );
}
