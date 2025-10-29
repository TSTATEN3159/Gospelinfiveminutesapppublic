import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, ExternalLink, BookOpen } from "lucide-react";
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
    _ytApiReadyPromise?: Promise<void>;
    _ytApiReadyResolve?: () => void;
  }
}

// Single promise that resolves when YouTube API is fully loaded
function ensureYouTubeAPI(): Promise<void> {
  // Return existing promise if API loading already in progress
  if (window._ytApiReadyPromise) {
    return window._ytApiReadyPromise;
  }

  // API already loaded and ready
  if (window.YT && window.YT.Player) {
    return Promise.resolve();
  }

  // Create new promise for API loading
  window._ytApiReadyPromise = new Promise<void>((resolve) => {
    window._ytApiReadyResolve = resolve;
    
    // Load YouTube IFrame API script
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    tag.async = true;
    
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // YouTube API calls this when ready
    window.onYouTubeIframeAPIReady = () => {
      if (window._ytApiReadyResolve) {
        window._ytApiReadyResolve();
      }
    };
  });

  return window._ytApiReadyPromise;
}

export function VideoPlayer({ video, isOpen, onClose }: VideoPlayerProps) {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isInitializingRef = useRef(false);

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

  // Initialize YouTube player when modal opens
  useEffect(() => {
    if (!isOpen || !videoId || !containerRef.current) {
      return;
    }

    // Prevent duplicate initialization
    if (isInitializingRef.current) {
      return;
    }

    isInitializingRef.current = true;
    setIsLoading(true);

    // Cleanup any existing player first
    if (playerRef.current && playerRef.current.destroy) {
      try {
        playerRef.current.destroy();
      } catch (e) {
        console.warn('Error destroying previous player:', e);
      }
      playerRef.current = null;
    }

    // Clear container
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }

    // Ensure YouTube API is loaded, then initialize player
    ensureYouTubeAPI()
      .then(() => {
        if (!isOpen || !containerRef.current) {
          isInitializingRef.current = false;
          return;
        }

        try {
          // Determine origin for WKWebView compatibility
          let playerOrigin = window.location.origin;
          
          // Handle Capacitor schemes, file://, and null origins
          if (!playerOrigin || 
              playerOrigin === 'null' ||
              playerOrigin.includes('capacitor://') || 
              playerOrigin.includes('ionic://') || 
              playerOrigin.includes('file://')) {
            playerOrigin = 'https://localhost';
          }

          // Create player
          playerRef.current = new window.YT.Player(containerRef.current, {
            videoId: videoId,
            width: '100%',
            height: '100%',
            playerVars: {
              playsinline: 1,              // CRITICAL for iOS inline playback
              autoplay: 0,                 // Don't autoplay (better UX)
              rel: 0,                      // Don't show related videos
              modestbranding: 1,           // Minimal YouTube branding
              origin: playerOrigin,        // Required for WKWebView/Capacitor
              enablejsapi: 1,              // Enable JavaScript API
              controls: 1,                 // Show player controls
              fs: 1,                       // Allow fullscreen
              cc_load_policy: 0,           // Don't show captions by default
              iv_load_policy: 3,           // Hide video annotations
            },
            events: {
              onReady: (event: any) => {
                // CRITICAL: Set playsinline attribute on iframe for iOS WKWebView
                try {
                  const iframe = event.target.getIframe();
                  if (iframe) {
                    iframe.setAttribute('playsinline', '1');
                    iframe.setAttribute('webkit-playsinline', '1');
                  }
                } catch (e) {
                  console.warn('Could not set playsinline on iframe:', e);
                }
                
                setIsLoading(false);
                isInitializingRef.current = false;
              },
              onError: (event: any) => {
                console.error('YouTube Player Error:', event.data);
                setIsLoading(false);
                isInitializingRef.current = false;
                // Errors 150, 152, 153 are restriction/configuration errors
              },
              onStateChange: () => {
                // Player state changed (playing, paused, etc.)
              }
            }
          });
        } catch (error) {
          console.error('Error initializing YouTube player:', error);
          setIsLoading(false);
          isInitializingRef.current = false;
        }
      })
      .catch((error) => {
        console.error('Error loading YouTube API:', error);
        setIsLoading(false);
        isInitializingRef.current = false;
      });

    // Cleanup on unmount or modal close
    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        try {
          playerRef.current.destroy();
        } catch (e) {
          console.warn('Error in cleanup:', e);
        }
        playerRef.current = null;
      }
      isInitializingRef.current = false;
    };
  }, [isOpen, videoId]);

  // Cleanup on close
  const handleClose = () => {
    if (playerRef.current && playerRef.current.destroy) {
      try {
        playerRef.current.destroy();
      } catch (e) {
        console.warn('Error destroying player on close:', e);
      }
      playerRef.current = null;
    }
    setIsLoading(true);
    isInitializingRef.current = false;
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
            <div className="aspect-video w-full mb-4 bg-black rounded-lg overflow-hidden relative">
              <div 
                ref={containerRef}
                className="w-full h-full"
                data-testid="video-player"
              />
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="text-white text-sm">Loading player...</div>
                </div>
              )}
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