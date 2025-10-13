import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, Clock, Users, Heart, Lightbulb, BookOpen, ExternalLink } from "lucide-react";
import { videoService, type VideoItem } from "@/services/videoService";
import { VideoPlayer } from "@/components/VideoPlayer";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from '@/lib/translations';
import worshipImage from '@assets/stock_images/church_worship_hands_6ff9edc7.jpg';

interface VideosPageProps {
  onNavigate?: (page: string) => void;
  streakDays?: number;
  language?: string;
}

// VideoItem interface is now imported from videoService

export default function VideosPage({ onNavigate, streakDays = 0, language = "en" }: VideosPageProps) {
  const t = useTranslations(language);
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
        title: t.loadingError,
        description: t.videoContentNotAvailable,
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
        return t.sermon;
      case 'gospel-tidbits':
        return t.gospelTidbits;
      case 'christian-advice':
        return t.christianAdvice;
      default:
        return t.video;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-20">
      {/* Professional Header Section */}
      <div className="bg-white dark:bg-gray-900 px-6 py-8 border-b border-slate-200 dark:border-slate-800 ios-safe-top">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate?.('more')}
            className="mr-4 h-11 w-11 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105"
            data-testid="button-back-videos"
            aria-label="Go back to More page"
          >
            <ArrowLeft className="w-5 h-5 text-slate-700 dark:text-slate-300" />
          </Button>
          <div className="flex-1 text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-3" style={{ 
              fontFamily: 'Dancing Script, Brush Script MT, cursive',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
            }}>
              {t.videosPageTitle}
            </h1>
            <div className="h-1.5 w-32 bg-gradient-to-r from-slate-500 via-blue-500 to-indigo-500 rounded-full mx-auto shadow-sm mb-4" />
            <p className="text-slate-600 dark:text-slate-400 font-semibold text-lg">{t.videosPageSubtitle}</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        <div className="max-w-4xl mx-auto space-y-6">
        {/* Professional Featured Video */}
        <Card className="overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-slate-100/90 via-blue-50/95 to-indigo-100/90 dark:from-slate-900/70 dark:via-blue-900/70 dark:to-indigo-900/70 transform hover:scale-[1.02] transition-all duration-500">
          <div className="bg-gradient-to-r from-slate-600 via-blue-600 to-indigo-600 p-1.5 shadow-xl">
            <div className="bg-gradient-to-br from-white dark:from-gray-800 to-slate-50/60 dark:to-slate-900/30 rounded-t-lg">
              <CardHeader className="text-center pb-6 pt-8">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-600 via-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300">
                    <Play className="w-8 h-8 text-white" />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full" />
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-800 bg-clip-text text-transparent text-center">
                  {t.featuredThisWeek}
                </CardTitle>
                <p className="text-slate-600 dark:text-slate-400 font-semibold text-lg text-center mt-3">
                  {t.handpickedSpiritualContent}
                </p>
              </CardHeader>
            </div>
          </div>
          <CardContent className="p-6 bg-gradient-to-br from-white/95 via-slate-50/90 to-blue-50/95 dark:from-gray-800/95 dark:via-slate-900/30 dark:to-blue-900/30">
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
                      {featuredVideo.views.toLocaleString()} {t.views}
                    </span>
                  )}
                  <span className="text-xs text-primary font-medium">
                    {featuredVideo.source}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">{t.noFeaturedVideoAvailable}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Professional Video Categories */}
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-800 bg-clip-text text-transparent mb-6 text-center">{t.browseByCategory}</h2>
          <p className="text-slate-600 dark:text-slate-400 font-medium text-center mb-8">{t.discoverTailoredContent}</p>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card 
              className={`text-center cursor-pointer shadow-2xl border-0 bg-gradient-to-br from-blue-100/90 to-indigo-100/90 dark:from-blue-900/60 dark:to-indigo-900/60 transform hover:scale-105 transition-all duration-500 ${
                selectedCategory === 'sermon' ? 'ring-4 ring-blue-400/60 scale-105' : ''
              }`}
              onClick={() => handleCategoryFilter(selectedCategory === 'sermon' ? null : 'sermon')}
              data-testid="category-sermon"
            >
              <CardContent className="p-5">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-xl transform hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-7 h-7 text-white" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full" />
                </div>
                <div className="text-base font-bold text-slate-800 dark:text-slate-200">{t.sermons}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">{t.faithMessages}</div>
              </CardContent>
            </Card>
            
            <Card 
              className={`text-center cursor-pointer shadow-2xl border-0 bg-gradient-to-br from-amber-100/90 to-yellow-100/90 dark:from-amber-900/60 dark:to-yellow-900/60 transform hover:scale-105 transition-all duration-500 ${
                selectedCategory === 'gospel-tidbits' ? 'ring-4 ring-amber-400/60 scale-105' : ''
              }`}
              onClick={() => handleCategoryFilter(selectedCategory === 'gospel-tidbits' ? null : 'gospel-tidbits')}
              data-testid="category-tidbits"
            >
              <CardContent className="p-5">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-xl transform hover:scale-110 transition-transform duration-300">
                  <Lightbulb className="w-7 h-7 text-white" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full" />
                </div>
                <div className="text-base font-bold text-slate-800 dark:text-slate-200">{t.gospelTidbits}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">{t.quickInsights}</div>
              </CardContent>
            </Card>
            
            <Card 
              className={`text-center cursor-pointer shadow-2xl border-0 bg-gradient-to-br from-rose-100/90 to-pink-100/90 dark:from-rose-900/60 dark:to-pink-900/60 transform hover:scale-105 transition-all duration-500 ${
                selectedCategory === 'christian-advice' ? 'ring-4 ring-rose-400/60 scale-105' : ''
              }`}
              onClick={() => handleCategoryFilter(selectedCategory === 'christian-advice' ? null : 'christian-advice')}
              data-testid="category-advice"
            >
              <CardContent className="p-5">
                <div className="w-14 h-14 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-xl transform hover:scale-110 transition-transform duration-300">
                  <Heart className="w-7 h-7 text-white" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full" />
                </div>
                <div className="text-base font-bold text-slate-800 dark:text-slate-200">{t.christianAdvice}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">{t.lifeGuidance}</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Professional Video List */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-800 bg-clip-text text-transparent text-center flex-1">
              {selectedCategory ? `${getCategoryName(selectedCategory)} ${t.categoryVideos}` : t.recentVideos}
            </h2>
            {selectedCategory && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleCategoryFilter(null)}
                className="bg-gradient-to-r from-slate-100 to-blue-100 border-slate-300 hover:from-slate-200 hover:to-blue-200 text-slate-700 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                data-testid="button-clear-filter"
              >
                {t.showAll}
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
              <p className="text-muted-foreground mb-4">{t.noVideosAvailable}</p>
              <p className="text-muted-foreground/70 text-sm">{t.checkInternetConnection}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {videos.filter(video => video.id !== featuredVideo?.id).map((video) => (
                <Card 
                  key={video.id} 
                  className="cursor-pointer shadow-lg border-0 bg-gradient-to-r from-slate-50/90 via-blue-50/90 to-indigo-50/90 dark:from-slate-900/60 dark:via-blue-900/60 dark:to-indigo-900/60 transform hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl"
                  onClick={() => handleVideoClick(video)}
                  data-testid={`video-${video.id}`}
                >
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <div className="relative flex-shrink-0">
                        <div className="w-20 h-14 bg-gradient-to-br from-slate-200 via-blue-200 to-indigo-200 dark:from-slate-700 dark:via-blue-700 dark:to-indigo-700 rounded-lg flex items-center justify-center shadow-lg">
                          <div className="w-8 h-8 bg-gradient-to-br from-slate-500 to-blue-500 rounded-full flex items-center justify-center">
                            <Play className="w-4 h-4 text-white" />
                          </div>
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

        {/* Professional Coming Soon Notice */}
        <Card className="shadow-2xl border-0 bg-gradient-to-br from-emerald-100/90 via-teal-100/90 to-green-100/90 dark:from-emerald-900/60 dark:via-teal-900/60 dark:to-green-900/60 overflow-hidden transform hover:scale-[1.02] transition-all duration-500">
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 p-1.5 shadow-xl">
            <div className="bg-gradient-to-br from-white dark:from-gray-800 to-emerald-50/60 dark:to-emerald-900/30 rounded-t-lg">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 via-teal-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl transform hover:scale-110 transition-transform duration-300">
                  <Play className="w-10 h-10 text-white" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-800 via-teal-700 to-green-800 bg-clip-text text-transparent mb-4 text-center">
                  {t.moreVideosComingSoon}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-base font-medium mb-4 text-center leading-relaxed">
                  {t.moreVideosDescription}
                </p>
              </CardContent>
            </div>
          </div>
        </Card>

        {/* Video Player Modal */}
        <VideoPlayer
          video={currentVideo}
          isOpen={isPlayerOpen}
          onClose={handleClosePlayer}
        />
        </div>
      </div>
    </div>
  );
}