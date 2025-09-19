import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search, Book, Crown, Heart, HandHeart, Gift, Users } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

// Types for topical search results
interface TopicalSearchResult {
  success: boolean;
  topic: string;
  explanation: {
    title: string;
    description: string;
    keyThemes: string[];
  };
  verses: Array<{
    text: string;
    reference: string;
    book: string;
    chapter: string;
    verse: string;
    translation: string;
  }>;
  references: string[];
  version: string;
}

// Preset topics configuration with warm, spiritual designs
const presetTopics = [
  {
    id: 'kingdom of god',
    title: 'Kingdom of God',
    icon: Crown,
    gradient: 'from-amber-50 to-yellow-50',
    borderColor: 'border-amber-200',
    iconColor: 'text-amber-600',
    bgColor: 'bg-amber-100'
  },
  {
    id: 'salvation',
    title: 'Salvation',
    icon: Heart,
    gradient: 'from-rose-50 to-pink-50',
    borderColor: 'border-rose-200',
    iconColor: 'text-rose-600',
    bgColor: 'bg-rose-100'
  },
  {
    id: 'faith',
    title: 'Faith',
    icon: Book,
    gradient: 'from-blue-50 to-indigo-50',
    borderColor: 'border-blue-200',
    iconColor: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    id: 'prayer',
    title: 'Prayer',
    icon: HandHeart,
    gradient: 'from-purple-50 to-violet-50',
    borderColor: 'border-purple-200',
    iconColor: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  {
    id: 'giving',
    title: 'Giving',
    icon: Gift,
    gradient: 'from-green-50 to-emerald-50',
    borderColor: 'border-green-200',
    iconColor: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  {
    id: 'kingdom character',
    title: 'Kingdom Character',
    icon: Users,
    gradient: 'from-orange-50 to-amber-50',
    borderColor: 'border-orange-200',
    iconColor: 'text-orange-600',
    bgColor: 'bg-orange-100'
  }
];

export function TopicalSearchSection() {
  const [selectedResult, setSelectedResult] = useState<TopicalSearchResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customSearch, setCustomSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Handle preset topic search
  const handleTopicSearch = async (topicId: string) => {
    setIsSearching(true);
    try {
      const result = await apiRequest('POST', '/api/topical-search', { 
        topic: topicId, 
        version: 'NIV' 
      }) as TopicalSearchResult;
      
      setSelectedResult(result);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Topical search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle custom topic search
  const handleCustomSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSearch.trim()) return;
    
    setIsSearching(true);
    try {
      const result = await apiRequest('POST', '/api/topical-search', { 
        topic: customSearch.trim(), 
        version: 'NIV' 
      }) as TopicalSearchResult;
      
      setSelectedResult(result);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Custom topical search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <>
      {/* Topical Search Section */}
      <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 rounded-2xl p-6 border border-amber-200 shadow-lg">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-amber-700" aria-hidden="true" />
          </div>
          <h3 className="text-xl font-bold text-amber-800 mb-2">
            Topical Bible Search
          </h3>
          <p className="text-amber-700 text-sm leading-relaxed max-w-sm mx-auto">
            Explore key Biblical topics or search for specific people, places, and concepts
          </p>
        </div>

        {/* Preset Topic Tiles Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {presetTopics.map((topic) => {
            const IconComponent = topic.icon;
            return (
              <Card
                key={topic.id}
                className={`bg-gradient-to-br ${topic.gradient} ${topic.borderColor} border-2 hover-elevate cursor-pointer transition-all duration-200 shadow-sm`}
                onClick={() => handleTopicSearch(topic.id)}
                data-testid={`tile-topic-${topic.id.replace(/\s+/g, '-')}`}
              >
                <CardContent className="p-4 text-center">
                  <div className={`w-10 h-10 ${topic.bgColor} rounded-full flex items-center justify-center mx-auto mb-3`}>
                    <IconComponent className={`w-5 h-5 ${topic.iconColor}`} aria-hidden="true" />
                  </div>
                  <h4 className="text-sm font-semibold text-gray-800 leading-tight">
                    {topic.title}
                  </h4>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Custom Search Bar */}
        <form onSubmit={handleCustomSearch} className="space-y-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search for Moses, Adam, Paul, or any biblical topic..."
              value={customSearch}
              onChange={(e) => setCustomSearch(e.target.value)}
              className="pr-12 bg-white/80 border-amber-300 focus:border-amber-500 focus:ring-amber-500 placeholder:text-amber-600/60"
              data-testid="input-custom-topical-search"
              aria-label="Custom topical search input"
              disabled={isSearching}
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-600" />
          </div>
          
          <Button 
            type="submit" 
            disabled={isSearching || !customSearch.trim()}
            className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-medium shadow-md"
            data-testid="button-custom-topical-search"
            aria-label="Search for custom biblical topic"
          >
            {isSearching ? 'Searching...' : 'Search Biblical Topic'}
          </Button>
        </form>
      </div>

      {/* Results Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-amber-800 mb-2">
              {selectedResult?.explanation.title}
            </DialogTitle>
          </DialogHeader>
          
          {selectedResult && (
            <div className="space-y-6">
              {/* Topic Explanation */}
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <p className="text-gray-800 leading-relaxed mb-4">
                  {selectedResult.explanation.description}
                </p>
                
                {selectedResult.explanation.keyThemes.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-2">Key Themes:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedResult.explanation.keyThemes.map((theme, index) => (
                        <span 
                          key={index}
                          className="bg-amber-200 text-amber-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {theme}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Scripture Verses */}
              {selectedResult.verses.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    Supporting Scripture ({selectedResult.version}):
                  </h4>
                  <div className="space-y-4">
                    {selectedResult.verses.map((verse, index) => (
                      <div 
                        key={index}
                        className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
                      >
                        <p className="text-gray-800 mb-2 leading-relaxed italic">
                          "{verse.text}"
                        </p>
                        <p className="text-amber-700 font-semibold text-sm">
                          — {verse.reference} ({verse.translation})
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* No results message */}
              {selectedResult.verses.length === 0 && (
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-center">
                  <p className="text-gray-700">
                    This topic was not found in our database. Try searching for one of the preset topics above, or search for a specific Bible verse reference instead.
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}