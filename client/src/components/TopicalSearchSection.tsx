import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search, Book, Crown, Heart, HandHeart, Gift, Users, ArrowLeft, ExternalLink } from 'lucide-react';
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

interface TopicalSearchSectionProps {
  onNavigateToScripture?: (reference: string) => void;
}

export function TopicalSearchSection({ onNavigateToScripture }: TopicalSearchSectionProps = {}) {
  const [selectedResult, setSelectedResult] = useState<TopicalSearchResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customSearch, setCustomSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle preset topic search
  const handleTopicSearch = async (topicId: string) => {
    setIsSearching(true);
    setError(null);
    try {
      const response = await apiRequest('POST', '/api/topical-search', { 
        topic: topicId, 
        version: 'NIV' 
      });
      const result = await response.json();
      
      console.log('Topical search result:', result);
      
      if (result && result.success && result.explanation) {
        setSelectedResult(result);
        setIsModalOpen(true);
      } else {
        setError('Failed to load topical information. Please try again.');
      }
    } catch (error) {
      console.error('Topical search failed:', error);
      setError('Failed to connect to Bible database. Please check your connection and try again.');
    } finally {
      setIsSearching(false);
    }
  };

  // Handle custom topic search
  const handleCustomSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSearch.trim()) return;
    
    setIsSearching(true);
    setError(null);
    try {
      const response = await apiRequest('POST', '/api/topical-search', { 
        topic: customSearch.trim(), 
        version: 'NIV' 
      });
      const result = await response.json();
      
      console.log('Custom search result:', result);
      
      if (result && result.success && result.explanation) {
        setSelectedResult(result);
        setIsModalOpen(true);
      } else {
        setError('Topic not found. Please try one of the preset topics or search for a biblical figure like Moses, David, or Paul.');
      }
    } catch (error) {
      console.error('Custom topical search failed:', error);
      setError('Failed to connect to Bible database. Please check your connection and try again.');
    } finally {
      setIsSearching(false);
    }
  };

  // Handle Scripture reference navigation
  const handleScriptureClick = (reference: string) => {
    if (onNavigateToScripture) {
      // Use the provided navigation callback
      onNavigateToScripture(reference);
    } else {
      // Fallback to opening Bible Gateway in a new window for real Scripture access
      const cleanRef = reference.replace(/\s+/g, '+');
      const url = `https://www.biblegateway.com/passage/?search=${encodeURIComponent(cleanRef)}&version=NIV`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  // Close modal and reset state
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedResult(null);
    setError(null);
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

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-center">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Preset Topic Tiles Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {presetTopics.map((topic) => {
            const IconComponent = topic.icon;
            return (
              <Card
                key={topic.id}
                className={`bg-gradient-to-br ${topic.gradient} ${topic.borderColor} border-2 hover-elevate cursor-pointer transition-all duration-200 shadow-sm ${isSearching ? 'opacity-50 pointer-events-none' : ''}`}
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
            {isSearching ? 'Searching Bible...' : 'Search Biblical Topic'}
          </Button>
        </form>
      </div>

      {/* Results Modal */}
      <Dialog open={isModalOpen} onOpenChange={closeModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="relative">
            <Button
              onClick={closeModal}
              variant="outline"
              size="sm"
              className="absolute -top-2 -left-2 mb-4"
              data-testid="button-back-to-topics"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Topics
            </Button>
            <DialogTitle className="text-2xl font-bold text-amber-800 mb-2 mt-8">
              {selectedResult?.explanation?.title || 'Biblical Information'}
            </DialogTitle>
          </DialogHeader>
          
          {selectedResult && (
            <div className="space-y-6">
              {/* Topic Explanation */}
              <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
                <p className="text-gray-800 leading-relaxed mb-4 text-base">
                  {selectedResult.explanation?.description || 'Biblical information about this topic.'}
                </p>
                
                {selectedResult.explanation?.keyThemes && selectedResult.explanation.keyThemes.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-3">Key Biblical Themes:</h4>
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

              {/* Main Scripture Verses */}
              {selectedResult.verses && selectedResult.verses.length > 0 && (
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">
                    Key Scripture Passages ({selectedResult.version || 'NIV'}):
                  </h4>
                  <div className="space-y-4">
                    {selectedResult.verses.map((verse, index) => (
                      <div 
                        key={index}
                        className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <p className="text-gray-800 mb-3 leading-relaxed text-lg italic">
                          "{verse.text}"
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-amber-700 font-semibold">
                            — {verse.reference} ({verse.translation})
                          </p>
                          <Button
                            onClick={() => handleScriptureClick(verse.reference)}
                            variant="outline"
                            size="sm"
                            className="text-amber-700 border-amber-300 hover:bg-amber-50"
                          >
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Read Full
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Scripture References */}
              {selectedResult.references && selectedResult.references.length > 0 && (
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">
                    Additional Scripture References:
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedResult.references.map((reference, index) => (
                      <Button
                        key={index}
                        onClick={() => handleScriptureClick(reference)}
                        variant="outline"
                        className="text-blue-700 border-blue-200 hover:bg-blue-50 justify-between p-3 h-auto"
                        data-testid={`link-scripture-${reference.replace(/[\s:]/g, '-')}`}
                      >
                        <span className="text-sm font-medium">{reference}</span>
                        <ExternalLink className="w-3 h-3 ml-2 flex-shrink-0" />
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* No results message */}
              {(!selectedResult.verses || selectedResult.verses.length === 0) && (
                <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 text-center">
                  <p className="text-gray-700">
                    This topic was not found in our biblical database. Try searching for one of the preset topics above, or search for a specific biblical figure like Moses, David, Paul, or Jesus.
                  </p>
                </div>
              )}

              {/* Footer with instruction */}
              <div className="text-center text-sm text-gray-500 pt-4 border-t border-gray-200">
                <p>Click on any Scripture reference to explore the full biblical context</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}