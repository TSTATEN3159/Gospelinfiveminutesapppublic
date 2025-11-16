import { useState } from "react";
import { TOPICAL_BIBLE_TOPICS, TopicDefinition, BibleVersionCode } from "@/data/topicalBibleTopics";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Book, Sparkles, Volume2, Loader2, AlertCircle } from "lucide-react";
import { toggleSpeech } from "@/utils/speechEngine";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiUrl } from "@/lib/api-config";

interface BibleVerse {
  reference: string;
  text: string;
  version: string;
}

interface TopicalBibleSearchCardProps {
  onNavigate?: (page: string, searchQuery?: string) => void;
}

export default function TopicalBibleSearchCard({ onNavigate }: TopicalBibleSearchCardProps) {
  const [selectedTopic, setSelectedTopic] = useState<TopicDefinition | null>(null);
  const [selectedVersion, setSelectedVersion] = useState<BibleVersionCode>("KJV");
  const [applicationText, setApplicationText] = useState<string | null>(null);

  const handleTopicSelect = (topicId: string) => {
    const topic = TOPICAL_BIBLE_TOPICS.find(t => t.id === topicId) || null;
    setSelectedTopic(topic);
    setApplicationText(null);
  };

  // Fetch verses for selected topic and version
  const { data: verses = [], isLoading: isLoadingVerses } = useQuery<BibleVerse[]>({
    queryKey: ['/api/bible-verse/batch', selectedTopic?.id, selectedVersion],
    enabled: !!selectedTopic,
    queryFn: async () => {
      if (!selectedTopic) return [];

      // Fetch all verses for this topic in parallel
      const versePromises = selectedTopic.references.map(async (reference) => {
        const response = await fetch(
          apiUrl(`/api/bible-verse?reference=${encodeURIComponent(reference)}&version=${selectedVersion}`)
        );
        
        if (!response.ok) {
          throw new Error(`Failed to fetch ${reference}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
          return {
            reference: data.reference,
            text: data.text,
            version: data.version
          };
        }
        
        return null;
      });

      const results = await Promise.all(versePromises);
      return results.filter((v): v is BibleVerse => v !== null);
    }
  });

  // AI Application Generator
  const applicationMutation = useMutation({
    mutationFn: async () => {
      if (!selectedTopic || verses.length === 0) {
        throw new Error("No topic or verses selected");
      }

      const response = await fetch(apiUrl("/api/topical-application"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: selectedTopic.name,
          references: selectedTopic.references,
          translation: selectedVersion
        })
      });

      if (!response.ok) {
        throw new Error("Failed to generate application");
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || "Failed to generate application");
      }

      return data.application;
    },
    onSuccess: (application) => {
      setApplicationText(application);
    }
  });

  const handleGenerateApplication = () => {
    if (!selectedTopic || verses.length === 0) return;
    setApplicationText(null);
    applicationMutation.mutate();
  };

  const handleVerseClick = (reference: string) => {
    if (onNavigate) {
      onNavigate('search', reference);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Book className="w-8 h-8 text-amber-600 dark:text-amber-500" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
            Topical Bible Search
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Explore {TOPICAL_BIBLE_TOPICS.length}+ Biblical topics with curated scriptures in multiple versions
        </p>
      </div>

      {/* Topic Selector */}
      <div className="mb-6">
        <Select onValueChange={handleTopicSelect}>
          <SelectTrigger 
            className="w-full py-6 bg-white shadow-lg dark:bg-gray-800 border-2 border-amber-400 rounded-xl text-lg font-medium hover:border-amber-500 transition-colors"
            data-testid="select-topic"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <SelectValue placeholder="Choose a Biblical Topic..." />
            </div>
          </SelectTrigger>
          <SelectContent className="max-h-[400px]">
            {TOPICAL_BIBLE_TOPICS.map((topic) => (
              <SelectItem 
                key={topic.id} 
                value={topic.id}
                className="text-base py-3"
                data-testid={`topic-${topic.id}`}
              >
                <div>
                  <div className="font-semibold">{topic.name}</div>
                  <div className="text-xs text-muted-foreground">{topic.description}</div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
          {TOPICAL_BIBLE_TOPICS.length} spiritual topics available
        </p>
      </div>

      {/* Bible Version Selector (only show when topic is selected) */}
      {selectedTopic && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Bible Version
          </label>
          <Select value={selectedVersion} onValueChange={(v) => setSelectedVersion(v as BibleVersionCode)}>
            <SelectTrigger 
              className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
              data-testid="select-version"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="KJV" data-testid="version-kjv">King James Version (KJV)</SelectItem>
              <SelectItem value="WEB" data-testid="version-web">World English Bible (WEB)</SelectItem>
              <SelectItem value="ASV" data-testid="version-asv">American Standard Version (ASV)</SelectItem>
              <SelectItem value="BBE" data-testid="version-bbe">Bible in Basic English (BBE)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Loading State */}
      {selectedTopic && isLoadingVerses && (
        <Card className="shadow-lg mb-6">
          <CardContent className="p-8 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3 text-amber-500" />
            <p className="text-gray-600 dark:text-gray-400">
              Loading verses from {selectedVersion}...
            </p>
          </CardContent>
        </Card>
      )}

      {/* Verses Display */}
      {selectedTopic && !isLoadingVerses && verses.length > 0 && (
        <Card className="shadow-2xl border-amber-300 dark:border-amber-700 mb-10 animate-in fade-in duration-300">
          <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Sparkles className="w-6 h-6" />
              {selectedTopic.name}
            </CardTitle>
            <p className="text-sm text-amber-50 mt-1">
              {selectedTopic.description}
            </p>
            <p className="text-xs text-amber-100 mt-2">
              {verses.length} verse{verses.length === 1 ? '' : 's'} • {selectedVersion}
            </p>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {verses.map((verse, idx) => (
              <div
                key={idx}
                onClick={() => handleVerseClick(verse.reference)}
                className="p-4 rounded-lg bg-amber-50 dark:bg-gray-800 border-l-4 border-amber-500 cursor-pointer hover:bg-amber-100 dark:hover:bg-gray-700 transition-all hover:shadow-md hover:scale-[1.01]"
                data-testid={`verse-${idx}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2">
                    <Book className="w-4 h-4" />
                    {verse.reference}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSpeech(verse.text);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs rounded-full bg-white dark:bg-gray-900 hover:bg-amber-100 dark:hover:bg-gray-700 shadow-sm border border-amber-200 dark:border-gray-600 transition-all"
                    data-testid={`button-listen-${idx}`}
                    aria-label={`Listen to ${verse.reference}`}
                  >
                    <Volume2 className="w-3 h-3" />
                    <span className="font-medium">Listen</span>
                  </button>
                </div>
                <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                  {verse.text}
                </p>
              </div>
            ))}

            {/* AI Application Generator */}
            <div className="pt-4 border-t border-amber-200 dark:border-gray-700">
              <Button
                onClick={handleGenerateApplication}
                disabled={applicationMutation.isPending}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-6 rounded-xl shadow-lg transition-all hover:shadow-xl"
                data-testid="button-generate-application"
              >
                {applicationMutation.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    How to Live This Today
                  </>
                )}
              </Button>

              {applicationMutation.isError && (
                <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-800 dark:text-red-200">
                      Failed to generate application
                    </p>
                    <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                      Please try again in a moment.
                    </p>
                  </div>
                </div>
              )}

              {applicationText && (
                <div className="mt-4 p-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-2 border-purple-200 dark:border-purple-800 rounded-xl animate-in fade-in duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <h3 className="text-lg font-bold text-purple-900 dark:text-purple-100">
                      Practical Application
                    </h3>
                  </div>
                  <p className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
                    {applicationText}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error State */}
      {selectedTopic && !isLoadingVerses && verses.length === 0 && (
        <Card className="shadow-lg mb-6">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
            <p className="text-gray-600 dark:text-gray-400">
              No verses found for this topic. Please try selecting a different topic.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
