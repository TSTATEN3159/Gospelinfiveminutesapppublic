import TopicalBibleSearchCard from "@/components/TopicalBibleSearchCard";

interface TopicSearchPageProps {
  onNavigate?: (page: string, searchQuery?: string) => void;
}

export default function TopicSearchPage({ onNavigate }: TopicSearchPageProps) {
  return (
    <div className="min-h-screen px-4 py-6 pb-24 bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-800">
      <TopicalBibleSearchCard onNavigate={onNavigate} />
    </div>
  );
}
