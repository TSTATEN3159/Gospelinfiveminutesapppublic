import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search, Book, Crown, Heart, HandHeart, Gift, Users, ArrowLeft, ExternalLink, X, Compass, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
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
  backgroundImage?: string;
}

export function TopicalSearchSection({ onNavigateToScripture, backgroundImage }: TopicalSearchSectionProps = {}) {
  const [selectedResult, setSelectedResult] = useState<TopicalSearchResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customSearch, setCustomSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Scripture viewer modal state
  const [scriptureViewerOpen, setScriptureViewerOpen] = useState(false);
  const [selectedScripture, setSelectedScripture] = useState<any>(null);
  const [loadingScripture, setLoadingScripture] = useState(false);
  const [scriptureError, setScriptureError] = useState<string | null>(null);

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

  // Handle Scripture reference navigation - show in-app modal
  const handleScriptureClick = async (reference: string) => {
    setLoadingScripture(true);
    setScriptureError(null);
    setScriptureViewerOpen(true);
    
    try {
      const response = await apiRequest('POST', '/api/bible-search', {
        query: reference,
        version: 'NIV'
      });
      const result = await response.json();
      
      if (result && result.success) {
        if (result.verses && result.verses.length > 0) {
          // Use structured verse data if available
          setSelectedScripture({
            reference: reference,
            verses: result.verses,
            source: 'api'
          });
        } else if (result.text) {
          // Use text-based result from OpenAI fallback
          setSelectedScripture({
            reference: reference,
            text: result.text,
            source: 'openai'
          });
        } else {
          setScriptureError('Scripture content not available.');
        }
      } else {
        setScriptureError('Failed to load Scripture content.');
      }
    } catch (error) {
      console.error('Failed to fetch Scripture:', error);
      setScriptureError('Failed to connect to Bible database.');
    } finally {
      setLoadingScripture(false);
    }
  };

  // Close modal and reset state
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedResult(null);
    setError(null);
  };
  
  // Close Scripture viewer modal
  const closeScriptureViewer = () => {
    setScriptureViewerOpen(false);
    setSelectedScripture(null);
    setScriptureError(null);
  };

  return (
    <>
      {/* Topical Search Section */}
      <Card className="relative overflow-hidden min-h-[400px] shadow-lg border-2" data-testid="card-topicalSearch">
        {backgroundImage && (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${backgroundImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-amber-700/60 via-amber-500/20 to-amber-900/80" />
          </>
        )}
        
        <CardHeader className={cn("relative z-10 border-b", backgroundImage ? "bg-gradient-to-r from-amber-500/10 to-transparent" : "bg-amber-700")}>
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 border-2 border-amber-200">
              <AvatarFallback className="bg-amber-100 text-amber-600">
                <Lightbulb className="w-6 h-6" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className={cn("flex items-center gap-2 text-xl", backgroundImage ? "text-white" : "text-white")}>
                <Compass className="w-5 h-5" />
                Topical Bible Search
              </CardTitle>
              <p className={cn("text-sm", backgroundImage ? "text-white/90" : "text-amber-100")}>
                Explore key Biblical topics and discover God's wisdom
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative z-10 p-6 space-y-6">

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center">
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Preset Topic Tiles Grid */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-sm space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Popular Biblical Topics</h3>
              <p className="text-gray-600 text-sm">Explore key themes in Scripture</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
          {presetTopics.map((topic) => {
            const IconComponent = topic.icon;
            return (
              <Card
                key={topic.id}
                className={`
                  relative bg-gradient-to-br ${topic.gradient} 
                  border-4 ${topic.borderColor} 
                  hover-elevate cursor-pointer 
                  transition-all duration-300 
                  shadow-lg hover:shadow-xl 
                  before:absolute before:inset-0 before:rounded-lg 
                  before:bg-gradient-to-br before:from-white/30 before:to-transparent 
                  before:pointer-events-none
                  ring-2 ring-white/40 ring-inset
                  outline outline-2 outline-gray-400/30 outline-offset-2
                  backdrop-blur-sm
                  transform hover:scale-[1.02]
                  ${isSearching ? 'opacity-50 pointer-events-none' : ''}
                `}
                onClick={() => handleTopicSearch(topic.id)}
                data-testid={`tile-topic-${topic.id.replace(/\s+/g, '-')}`}
              >
                <CardContent className="relative p-5 text-center z-10">
                  <div className={`
                    w-14 h-14 bg-white/90 rounded-full 
                    flex items-center justify-center mx-auto mb-4
                    shadow-lg border-2 border-white/60
                    ring-1 ring-gray-200/50
                  `}>
                    <IconComponent 
                      className={`w-7 h-7 ${topic.iconColor} stroke-[1.5]`} 
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden="true" 
                    />
                  </div>
                  <h4 className="text-sm font-semibold text-gray-800 leading-tight">
                    {topic.title}
                  </h4>
                </CardContent>
              </Card>
            );
          })}
            </div>
          </div>

          {/* Custom Search Bar */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-sm">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Custom Search</h3>
              <p className="text-gray-600 text-sm">Search for specific biblical figures or topics</p>
            </div>
            <form onSubmit={handleCustomSearch} className="space-y-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search for Moses, Adam, Paul, or any biblical topic..."
              value={customSearch}
              onChange={(e) => setCustomSearch(e.target.value)}
              className="pr-12"
              data-testid="input-custom-topical-search"
              aria-label="Custom topical search input"
              disabled={isSearching}
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          
              <Button 
                type="submit" 
                disabled={isSearching || !customSearch.trim()}
                className="w-full bg-amber-600 text-white"
                data-testid="button-custom-topical-search"
                aria-label="Search for custom biblical topic"
              >
                {isSearching ? 'Searching Bible...' : 'Search Biblical Topic'}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>

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

      {/* Scripture Viewer Modal */}
      <Dialog open={scriptureViewerOpen} onOpenChange={setScriptureViewerOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-amber-800 pr-8">
              {selectedScripture?.reference || 'Scripture Passage'}
            </DialogTitle>
            <Button
              onClick={closeScriptureViewer}
              variant="ghost" 
              size="sm"
              className="text-gray-500 hover:text-gray-700"
              data-testid="button-close-scripture"
            >
              <X className="w-5 h-5" />
            </Button>
          </DialogHeader>
          
          {loadingScripture && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading Scripture...</p>
              </div>
            </div>
          )}
          
          {scriptureError && (
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <p className="text-red-700">{scriptureError}</p>
            </div>
          )}
          
          {selectedScripture && !loadingScripture && !scriptureError && (
            <div className="space-y-6">
              {selectedScripture.source === 'api' && selectedScripture.verses && (
                <div className="space-y-4">
                  {selectedScripture.verses.map((verse: any, index: number) => (
                    <div key={index} className="bg-amber-50 p-6 rounded-lg border border-amber-200">
                      <p className="text-gray-800 text-lg leading-relaxed mb-3">
                        {verse.text}
                      </p>
                      <p className="text-amber-700 font-semibold">
                        — {verse.reference} ({verse.translation})
                      </p>
                    </div>
                  ))}
                </div>
              )}
              
              {selectedScripture.source === 'openai' && selectedScripture.text && (
                <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
                  <div 
                    className="text-gray-800 text-lg leading-relaxed prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: selectedScripture.text.replace(/\*\*/g, '') }}
                  />
                </div>
              )}
              
              <div className="text-center text-sm text-gray-500 pt-4 border-t border-gray-200">
                <p>Scripture content from the Holy Bible</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}