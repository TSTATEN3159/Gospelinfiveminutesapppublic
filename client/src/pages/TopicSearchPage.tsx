import { useState } from "react";
import { BIBLE_TOPICS, TopicData } from "@/data/topics";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Book, Sparkles, Volume2, Loader2 } from "lucide-react";
import { toggleSpeech } from "@/utils/speechEngine";
import { useTopicApplication } from "@/hooks/useTopicApplication";

interface TopicSearchPageProps {
  onNavigate?: (page: string, searchQuery?: string) => void;
}

export default function TopicSearchPage({ onNavigate }: TopicSearchPageProps) {
  const [selectedTopic, setSelectedTopic] = useState<TopicData | null>(null);
  const [applicationText, setApplicationText] = useState<string | null>(null);
  const topicApplication = useTopicApplication();

  const onTopicSelect = (topicName: string) => {
    const topic = BIBLE_TOPICS.find(t => t.topic === topicName) || null;
    setSelectedTopic(topic);
    setApplicationText(null);
  };

  const handleGenerateApplication = () => {
    if (!selectedTopic) return;
    const refs = selectedTopic.verses.map(v => v.ref);
    setApplicationText(null);
    topicApplication.mutate(
      { topic: selectedTopic.topic, references: refs, translation: "KJV" },
      {
        onSuccess: (data) => {
          if (data.success && data.application) {
            setApplicationText(data.application);
          }
        }
      }
    );
  };

  const handleVerseClick = (reference: string) => {
    if (onNavigate) {
      onNavigate('search', reference);
    }
  };

  return (
    <div className="min-h-screen px-4 py-6 pb-24 bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-800">
      
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Book className="w-8 h-8 text-amber-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
              Topical Bible Search
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Explore 40+ Biblical topics with curated scriptures for spiritual growth and discipleship
          </p>
        </div>

        <div className="mb-8">
          <Select onValueChange={onTopicSelect}>
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
              {BIBLE_TOPICS.map((item) => (
                <SelectItem 
                  key={item.topic} 
                  value={item.topic}
                  className="text-base py-3"
                  data-testid={`topic-${item.topic.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {item.topic}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
            {BIBLE_TOPICS.length} spiritual topics available
          </p>
        </div>

        {selectedTopic && (
          <Card className="shadow-2xl border-amber-300 dark:border-amber-700 mb-10 animate-in fade-in duration-300">
            <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-t-lg">
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <Sparkles className="w-6 h-6" />
                Scriptures on {selectedTopic.topic}
              </CardTitle>
              <p className="text-sm text-amber-50 mt-1">
                {selectedTopic.verses.length} verse{selectedTopic.verses.length === 1 ? '' : 's'} to guide you
              </p>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {selectedTopic.verses.map((v, idx) => (
                <div
                  key={idx}
                  onClick={() => handleVerseClick(v.ref)}
                  className="p-4 rounded-lg bg-amber-50 dark:bg-gray-800 border-l-4 border-amber-500 cursor-pointer hover:bg-amber-100 dark:hover:bg-gray-700 transition-all hover:shadow-md hover:scale-[1.01]"
                  data-testid={`verse-${idx}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2">
                      <Book className="w-4 h-4" />
                      {v.ref}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSpeech(v.text);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs rounded-full bg-white dark:bg-gray-900 hover:bg-amber-100 dark:hover:bg-gray-700 shadow-sm border border-amber-200 dark:border-gray-600 transition-all"
                      data-testid={`button-listen-${idx}`}
                      aria-label={`Listen to ${v.ref}`}
                    >
                      <Volume2 className="w-3 h-3" />
                      Listen
                    </button>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed italic">
                    "{v.text}"
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {selectedTopic && (
          <Card className="max-w-2xl mx-auto mt-4 border-2 border-dashed border-amber-400 bg-gradient-to-br from-amber-50/80 to-orange-50/60 dark:from-gray-900/60 dark:to-gray-800/60 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  How to Live This Today
                </CardTitle>
                <Button
                  size="sm"
                  onClick={handleGenerateApplication}
                  disabled={topicApplication.isPending}
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                  data-testid="button-generate-application"
                >
                  {topicApplication.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-1 animate-spin" /> Thinking…
                    </>
                  ) : (
                    "Generate"
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {applicationText ? (
                <p className="text-sm leading-relaxed text-gray-800 dark:text-gray-200">
                  {applicationText}
                </p>
              ) : (
                <p className="text-xs text-amber-700/80 dark:text-amber-300/80">
                  Tap "Generate" for a short, practical way to obey these Scriptures today.
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {!selectedTopic && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-100 dark:bg-amber-900/30 mb-4">
              <Book className="w-10 h-10 text-amber-600 dark:text-amber-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Select a Topic to Begin
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              Choose from topics like Faith, Love, Hope, Prayer, Healing, and many more to discover what the Bible says.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
