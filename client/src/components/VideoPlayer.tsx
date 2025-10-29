import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, ExternalLink, BookOpen, Play } from "lucide-react";
import type { VideoItem } from "@/services/videoService";

interface VideoPlayerProps {
  video: VideoItem | null;
  isOpen: boolean;
  onClose: () => void;
}

// Declare YouTube IFrame API types
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export function VideoPlayer({ video, isOpen, onClose }: VideoPlayerProps) {
  const [playerReady, setPlayerReady] = useState(false);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  if (!video) return null;

  // Extract YouTube video ID from various URL formats
  const getYouTubeId = (url: string): string | null => {
    try {
      const urlObj = new URL(url);
      
      // Handle youtube.com/watch?v=VIDEO_ID
      if (urlObj.hostname.includes('youtube.com') && urlObj.searchParams.has('v')) {
        return urlObj.searchParams.get('v');
      }
      
      // Handle youtu.be/VIDEO_ID
      if (urlObj.hostname === 'youtu.be') {
        return urlObj.pathname.replace('/', '');
      }
      
      // Handle youtube.com/embed/VIDEO_ID
      if (urlObj.pathname.includes('/embed/')) {
        return urlObj.pathname.split('/embed/')[1]?.split('?')[0];
      }
      
      return null;
    } catch {
      return null;
    }
  };

  const videoId = video.videoUrl ? getYouTubeId(video.videoUrl) : null;
  const hasVideo = !!(video.videoUrl || video.externalUrl);

  // Load YouTube IFrame API for iOS compatibility
  useEffect(() => {
    if (!videoId || !isOpen) return;

    // Load YouTube IFrame API script if not already loaded
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      // Wait for API to load
      window.onYouTubeIframeAPIReady = () => {
        setPlayerReady(true);
      };
    } else {
      setPlayerReady(true);
    }

    return () => {
      // Cleanup player on unmount
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [videoId, isOpen]);

  // Initialize YouTube player when API is ready
  useEffect(() => {
    if (!playerReady || !videoId || !isOpen || !containerRef.current) return;
    if (playerRef.current) return; // Player already initialized

    try {
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: videoId,
        width: '100%',
        height: '100%',
        playerVars: {
          playsinline: 1,        // Critical for iOS inline playback
          autoplay: 0,           // Don't autoplay (better UX)
          rel: 0,                // Don't show related videos
          modestbranding: 1,     // Minimal YouTube branding
          origin: window.location.origin, // Required for WKWebView
          enablejsapi: 1,        // Enable JavaScript API
          controls: 1,           // Show player controls
          fs: 1,                 // Allow fullscreen
        },
        events: {
          onError: (event: any) => {
            console.error('YouTube Player Error:', event.data);
            // Errors 150, 152, 153 are restriction/configuration errors
            // These indicate the video can't be played in embedded mode
          }
        }
      });
    } catch (error) {
      console.error('Error initializing YouTube player:', error);
    }
  }, [playerReady, videoId, isOpen]);

  // Cleanup on close
  const handleClose = () => {
    if (playerRef.current && playerRef.current.destroy) {
      playerRef.current.destroy();
      playerRef.current = null;
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl w-full h-[90vh] p-0">
        <DialogHeader className="p-4 pb-2">
          <DialogTitle className="flex items-center justify-between">
            <span className="text-lg font-semibold pr-8">{video.title}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              data-testid="button-close-video"
              className="h-9 w-9 border-2 border-border bg-background hover:bg-accent hover:border-accent-border shadow-md hover:shadow-lg transition-all duration-200"
              aria-label="Close video player"
            >
              <X className="w-5 h-5" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 p-4 pt-0 overflow-y-auto">
          {/* Video Player Section - YouTube IFrame API (iOS-compatible) */}
          {videoId ? (
            <div className="aspect-video w-full mb-4 bg-black rounded-lg overflow-hidden">
              <div 
                ref={containerRef}
                className="w-full h-full"
                data-testid="video-player"
              />
            </div>
          ) : hasVideo ? (
            <div className="aspect-video w-full mb-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
              <div className="text-center p-8">
                <ExternalLink className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  {video.source} Content
                </h3>
                <p className="text-blue-700 mb-4">
                  This video is available from {video.source}
                </p>
              </div>
            </div>
          ) : (
            <div className="aspect-video w-full mb-4 bg-gradient-to-br from-amber-50 to-orange-100 rounded-lg flex items-center justify-center">
              <div className="text-center p-8">
                <BookOpen className="w-16 h-16 mx-auto mb-4 text-amber-600" />
                <h3 className="text-xl font-bold text-amber-900 mb-2">
                  Scripture Study
                </h3>
                <p className="text-amber-700 mb-4">
                  This content focuses on Bible study and reflection
                </p>
              </div>
            </div>
          )}

          {/* Video Information */}
          <div className="space-y-4">
            {/* Description */}
            <div>
              <p className="text-gray-700 mb-3">{video.description}</p>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className="bg-green-600 text-white">
                  {video.source}
                </Badge>
                {video.duration && (
                  <Badge variant="outline">
                    {video.duration}
                  </Badge>
                )}
                {video.views && (
                  <Badge variant="outline">
                    {video.views.toLocaleString()} views
                  </Badge>
                )}
              </div>
            </div>

            {/* Bible Verse Section */}
            {video.verseReference && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  {video.verseReference}
                </h4>
                {video.verseText && (
                  <p className="text-blue-800 italic mb-2">
                    {video.verseText.replace(/"/g, '')}
                  </p>
                )}
                {video.commentary && (
                  <p className="text-blue-700 text-sm">
                    {video.commentary}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}