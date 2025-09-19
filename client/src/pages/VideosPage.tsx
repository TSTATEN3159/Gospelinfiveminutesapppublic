import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, Clock, Users, Heart, Lightbulb, BookOpen, ExternalLink } from "lucide-react";
import { videoService, type VideoItem } from "@/services/videoService";
import { useToast } from "@/hooks/use-toast";

interface VideosPageProps {
  onNavigate?: (page: string) => void;
  streakDays?: number;
}

// VideoItem interface is now imported from videoService

export default function VideosPage({ onNavigate, streakDays = 0 }: VideosPageProps) {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [featuredVideo, setFeaturedVideo] = useState<VideoItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<VideoItem['category'] | null>(null);
  const { toast } = useToast();

  // Load videos on component mount
  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    setLoading(true);
    try {
      // Load featured video and all videos in parallel
      const [featured, allVideos] = await Promise.all([
        videoService.getFeaturedVideo(),
        videoService.getVideos(undefined, 20)
      ]);

      setFeaturedVideo(featured);
      setVideos(allVideos);
    } catch (error) {
      console.error('Error loading videos:', error);
      toast({
        title: "Loading Error",
        description: "Some video content may not be available right now.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryFilter = async (category: VideoItem['category'] | null) => {
    setSelectedCategory(category);
    setLoading(true);
    
    try {
      const categoryVideos = category 
        ? await videoService.getVideosByCategory(category)
        : await videoService.getVideos(undefined, 20);
      setVideos(categoryVideos);
    } catch (error) {
      console.error('Error filtering videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoClick = (video: VideoItem) => {
    if (video.externalUrl || video.videoUrl) {
      videoService.openExternalVideo(video);
    } else {
      toast({
        title: "Coming Soon",
        description: "This video will be available soon!",
      });
    }
  };

  // Use fallback videos during loading
  const displayVideos = videos.length > 0 ? videos : [
    {
      id: '1',
      title: 'Finding Peace in God\'s Promises',
      description: 'Discover how God\'s promises can bring peace to your anxious heart in times of trouble.',
      duration: '12:35',
      category: 'sermon',
      views: 3420,
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop'
    },
    {
      id: '2', 
      title: 'The Power of Prayer in 3 Minutes',
      description: 'Quick wisdom on how prayer transforms our daily walk with Christ.',
      duration: '3:12',
      category: 'gospel-tidbits',
      views: 8750,
      thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=200&fit=crop'
    },
    {
      id: '3',
      title: 'Overcoming Fear with Faith',
      description: 'Biblical guidance on conquering fear and anxiety through trusting in God\'s plan.',
      duration: '8:45',
      category: 'christian-advice',
      views: 5670,
      thumbnail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop'
    },
    {
      id: '4',
      title: 'Jesus\' Love - The Ultimate Gospel',
      description: 'A powerful 15-minute sermon on the depth of Christ\'s love for humanity.',
      duration: '15:20',
      category: 'sermon',
      views: 12300,
      thumbnail: 'https://images.unsplash.com/photo-1518102594912-28d7669f7dd7?w=300&h=200&fit=crop'
    },
    {
      id: '5',
      title: 'Why We Forgive: Gospel Truth',
      description: 'Understanding forgiveness through Christ\'s example in just 4 minutes.',
      duration: '4:08',
      category: 'gospel-tidbits',
      views: 6890,
      thumbnail: 'https://images.unsplash.com/photo-1488998527040-85054a85150e?w=300&h=200&fit=crop'
    },
    {
      id: '6',
      title: 'Building Stronger Christian Relationships',
      description: 'Practical advice for nurturing relationships that honor God and build His kingdom.',
      duration: '11:22',
      category: 'christian-advice',
      views: 4210,
      thumbnail: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=300&h=200&fit=crop'
    }
  ];

  const getCategoryIcon = (category: VideoItem['category']) => {
    switch (category) {
      case 'sermon':
        return <BookOpen className="w-4 h-4" />;
      case 'gospel-tidbits':
        return <Lightbulb className="w-4 h-4" />;
      case 'christian-advice':
        return <Heart className="w-4 h-4" />;
      default:
        return <Play className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: VideoItem['category']) => {
    switch (category) {
      case 'sermon':
        return 'bg-blue-100 text-blue-800';
      case 'gospel-tidbits':
        return 'bg-amber-100 text-amber-800';
      case 'christian-advice':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryName = (category: VideoItem['category']) => {
    switch (category) {
      case 'sermon':
        return 'Sermon';
      case 'gospel-tidbits':
        return 'Gospel Tidbits';
      case 'christian-advice':
        return 'Christian Advice';
      default:
        return 'Video';
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header Section */}
      <div className="bg-white px-4 py-6 border-b border-gray-100 ios-safe-top">
        <div className="flex items-center mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate?.('more')}
            className="mr-3"
            data-testid="button-back-videos"
            aria-label="Go back to More page"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold" style={{ 
              color: '#8B4513',
              fontFamily: 'Dancing Script, Brush Script MT, cursive',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
            }}>
              Faith Videos
            </h1>
            <p className="text-gray-600 mt-1">Sermons, Gospel insights, and Christian guidance</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Featured Video */}
        <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-800">
              <Play className="w-5 h-5" />
              Featured This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="animate-pulse space-y-3">
                <div className="aspect-video bg-gray-300 rounded-lg"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded w-full"></div>
              </div>
            ) : featuredVideo ? (
              <div 
                className="cursor-pointer" 
                onClick={() => handleVideoClick(featuredVideo)}
                data-testid="featured-video"
              >
                <div className="relative mb-3">
                  <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center hover-elevate">
                      <Play className="w-6 h-6 text-white ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    {featuredVideo.duration}
                  </div>
                  {featuredVideo.source === 'TBN+' && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-blue-600 text-white">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Free
                      </Badge>
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{featuredVideo.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{featuredVideo.description}</p>
                <div className="flex items-center gap-2">
                  <Badge className={getCategoryColor(featuredVideo.category)}>
                    {getCategoryIcon(featuredVideo.category)}
                    <span className="ml-1">{getCategoryName(featuredVideo.category)}</span>
                  </Badge>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {featuredVideo.views.toLocaleString()} views
                  </span>
                  <span className="text-xs text-blue-600 font-medium">
                    {featuredVideo.source}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No featured video available</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Video Categories */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Browse by Category</h2>
          <div className="grid grid-cols-3 gap-3 mb-6">
            <Card 
              className={`text-center hover-elevate cursor-pointer ${
                selectedCategory === 'sermon' ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => handleCategoryFilter(selectedCategory === 'sermon' ? null : 'sermon')}
              data-testid="category-sermon"
            >
              <CardContent className="p-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-sm font-medium text-gray-900">Sermons</div>
                <div className="text-xs text-gray-500">Faith messages</div>
              </CardContent>
            </Card>
            
            <Card 
              className={`text-center hover-elevate cursor-pointer ${
                selectedCategory === 'gospel-tidbits' ? 'ring-2 ring-amber-500' : ''
              }`}
              onClick={() => handleCategoryFilter(selectedCategory === 'gospel-tidbits' ? null : 'gospel-tidbits')}
              data-testid="category-tidbits"
            >
              <CardContent className="p-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Lightbulb className="w-6 h-6 text-amber-600" />
                </div>
                <div className="text-sm font-medium text-gray-900">Gospel Tidbits</div>
                <div className="text-xs text-gray-500">Quick insights</div>
              </CardContent>
            </Card>
            
            <Card 
              className={`text-center hover-elevate cursor-pointer ${
                selectedCategory === 'christian-advice' ? 'ring-2 ring-green-500' : ''
              }`}
              onClick={() => handleCategoryFilter(selectedCategory === 'christian-advice' ? null : 'christian-advice')}
              data-testid="category-advice"
            >
              <CardContent className="p-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Heart className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-sm font-medium text-gray-900">Christian Advice</div>
                <div className="text-xs text-gray-500">Life guidance</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Video List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {selectedCategory ? `${getCategoryName(selectedCategory)} Videos` : 'Recent Videos'}
            </h2>
            {selectedCategory && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleCategoryFilter(null)}
                data-testid="button-clear-filter"
              >
                Show All
              </Button>
            )}
          </div>
          
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <div className="w-20 h-14 bg-gray-300 rounded"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-300 rounded w-full"></div>
                        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {displayVideos.filter(video => video.id !== featuredVideo?.id).map((video) => (
                <Card 
                  key={video.id} 
                  className="hover-elevate cursor-pointer"
                  onClick={() => handleVideoClick(video)}
                  data-testid={`video-${video.id}`}
                >
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <div className="relative flex-shrink-0">
                        <div className="w-20 h-14 bg-gray-200 rounded flex items-center justify-center">
                          <Play className="w-4 h-4 text-gray-600" />
                        </div>
                        <div className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs px-1 rounded">
                          {video.duration}
                        </div>
                        {video.source === 'TBN+' && (
                          <div className="absolute -top-1 -right-1">
                            <ExternalLink className="w-3 h-3 text-blue-600" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
                          {video.title}
                        </h3>
                        <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                          {video.description}
                        </p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge className={`text-xs ${getCategoryColor(video.category)}`}>
                            {getCategoryIcon(video.category)}
                            <span className="ml-1">{getCategoryName(video.category)}</span>
                          </Badge>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {video.views.toLocaleString()}
                          </span>
                          <span className="text-xs text-blue-600 font-medium">
                            {video.source}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Coming Soon Notice */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-6 text-center">
            <Play className="w-12 h-12 mx-auto mb-4 text-blue-600" />
            <h3 className="text-lg font-bold text-blue-900 mb-2">
              More Videos Coming Soon!
            </h3>
            <p className="text-blue-700 text-sm mb-4">
              We're constantly adding new sermons, Gospel insights, and Christian advice videos. 
              Check back regularly for fresh spiritual content!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}