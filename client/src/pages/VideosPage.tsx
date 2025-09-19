import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, Clock, Users, Heart, Lightbulb, BookOpen, ExternalLink } from "lucide-react";
import { videoService, type VideoItem } from "@/services/videoService";
import { VideoPlayer } from "@/components/VideoPlayer";
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
  const [currentVideo, setCurrentVideo] = useState<VideoItem | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
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
    setCurrentVideo(video);
    setIsPlayerOpen(true);
  };

  const handleClosePlayer = () => {
    setIsPlayerOpen(false);
    setCurrentVideo(null);
  };

  // App Store compliance: Only show legitimate API content - no mock/fallback data

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
        return 'bg-primary/10 text-primary';
      case 'gospel-tidbits':
        return 'bg-primary/10 text-primary';
      case 'christian-advice':
        return 'bg-primary/10 text-primary';
      default:
        return 'bg-muted text-muted-foreground';
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
      <div className="bg-background px-4 py-6 border-b border-border ios-safe-top">
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
            <h1 className="text-2xl font-bold text-primary drop-shadow-sm" style={{ 
              fontFamily: 'Dancing Script, Brush Script MT, cursive'
            }}>
              Faith Videos
            </h1>
            <p className="text-muted-foreground mt-1">Sermons, Gospel insights, and Christian guidance</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Featured Video */}
        <Card className="bg-primary/5 border-primary/20 shadow-lg border-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 text-primary text-center">
              <Play className="w-5 h-5" />
              Featured This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="animate-pulse space-y-3">
                <div className="aspect-video bg-muted rounded-lg"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-full"></div>
              </div>
            ) : featuredVideo ? (
              <div 
                className="cursor-pointer" 
                onClick={() => handleVideoClick(featuredVideo)}
                data-testid="featured-video"
              >
                <div className="relative mb-3">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center hover-elevate">
                      <Play className="w-6 h-6 text-primary-foreground ml-1" />
                    </div>
                  </div>
                  {featuredVideo.duration && (
                    <div className="absolute bottom-2 right-2 bg-foreground/80 text-background text-xs px-2 py-1 rounded">
                      {featuredVideo.duration}
                    </div>
                  )}
                  {featuredVideo.source === 'BibleProject' && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-primary text-primary-foreground">
                        <Play className="w-3 h-3 mr-1" />
                        BibleProject
                      </Badge>
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{featuredVideo.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">{featuredVideo.description}</p>
                <div className="flex items-center gap-2">
                  <Badge className={getCategoryColor(featuredVideo.category)}>
                    {getCategoryIcon(featuredVideo.category)}
                    <span className="ml-1">{getCategoryName(featuredVideo.category)}</span>
                  </Badge>
                  {featuredVideo.views && (
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {featuredVideo.views.toLocaleString()} views
                    </span>
                  )}
                  <span className="text-xs text-primary font-medium">
                    {featuredVideo.source}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No featured video available</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Video Categories */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4 text-center">Browse by Category</h2>
          <div className="grid grid-cols-3 gap-3 mb-6">
            <Card 
              className={`text-center hover-elevate cursor-pointer shadow-lg border-2 ${
                selectedCategory === 'sermon' ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => handleCategoryFilter(selectedCategory === 'sermon' ? null : 'sermon')}
              data-testid="category-sermon"
            >
              <CardContent className="p-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div className="text-sm font-medium text-foreground">Sermons</div>
                <div className="text-xs text-muted-foreground">Faith messages</div>
              </CardContent>
            </Card>
            
            <Card 
              className={`text-center hover-elevate cursor-pointer shadow-lg border-2 ${
                selectedCategory === 'gospel-tidbits' ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => handleCategoryFilter(selectedCategory === 'gospel-tidbits' ? null : 'gospel-tidbits')}
              data-testid="category-tidbits"
            >
              <CardContent className="p-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Lightbulb className="w-6 h-6 text-primary" />
                </div>
                <div className="text-sm font-medium text-foreground">Gospel Tidbits</div>
                <div className="text-xs text-muted-foreground">Quick insights</div>
              </CardContent>
            </Card>
            
            <Card 
              className={`text-center hover-elevate cursor-pointer shadow-lg border-2 ${
                selectedCategory === 'christian-advice' ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => handleCategoryFilter(selectedCategory === 'christian-advice' ? null : 'christian-advice')}
              data-testid="category-advice"
            >
              <CardContent className="p-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div className="text-sm font-medium text-foreground">Christian Advice</div>
                <div className="text-xs text-muted-foreground">Life guidance</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Video List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground text-center flex-1">
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
                <Card key={i} className="animate-pulse shadow-lg border-2">
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <div className="w-20 h-14 bg-muted rounded"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-muted rounded w-3/4"></div>
                        <div className="h-3 bg-muted rounded w-full"></div>
                        <div className="h-3 bg-muted rounded w-1/2"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : videos.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No videos available</p>
              <p className="text-muted-foreground/70 text-sm">Please check your internet connection and try again</p>
            </div>
          ) : (
            <div className="space-y-4">
              {videos.filter(video => video.id !== featuredVideo?.id).map((video) => (
                <Card 
                  key={video.id} 
                  className="hover-elevate cursor-pointer shadow-lg border-2"
                  onClick={() => handleVideoClick(video)}
                  data-testid={`video-${video.id}`}
                >
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <div className="relative flex-shrink-0">
                        <div className="w-20 h-14 bg-muted rounded flex items-center justify-center">
                          <Play className="w-4 h-4 text-muted-foreground" />
                        </div>
                        {video.duration && (
                          <div className="absolute bottom-1 right-1 bg-foreground/80 text-background text-xs px-1 rounded">
                            {video.duration}
                          </div>
                        )}
                        {video.source === 'BibleProject' && (
                          <div className="absolute -top-1 -right-1">
                            <Play className="w-3 h-3 text-primary" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground text-sm mb-1 line-clamp-2">
                          {video.title}
                        </h3>
                        <p className="text-muted-foreground text-xs mb-2 line-clamp-2">
                          {video.description}
                        </p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge className={`text-xs ${getCategoryColor(video.category)}`}>
                            {getCategoryIcon(video.category)}
                            <span className="ml-1">{getCategoryName(video.category)}</span>
                          </Badge>
                          {video.views && (
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {video.views.toLocaleString()}
                            </span>
                          )}
                          <Badge 
                            className={`text-xs ${
                              video.source === 'BibleProject' ? 'bg-primary text-primary-foreground' : 'bg-primary text-primary-foreground'
                            }`}
                            data-testid={`badge-source-${video.id}`}
                          >
                            {video.source === 'BibleProject' && <Play className="w-3 h-3 mr-1" />}
                            {video.source}
                          </Badge>
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
        <Card className="bg-primary/5 border-primary/20 shadow-lg border-2">
          <CardContent className="p-6 text-center">
            <Play className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-lg font-bold text-foreground mb-2 text-center">
              More Videos Coming Soon!
            </h3>
            <p className="text-muted-foreground text-sm mb-4 text-center">
              We're constantly adding new sermons, Gospel insights, and Christian advice videos. 
              Check back regularly for fresh spiritual content!
            </p>
          </CardContent>
        </Card>

        {/* Video Player Modal */}
        <VideoPlayer
          video={currentVideo}
          isOpen={isPlayerOpen}
          onClose={handleClosePlayer}
        />
      </div>
    </div>
  );
}