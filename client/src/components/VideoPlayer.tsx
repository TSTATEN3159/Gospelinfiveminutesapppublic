import { useState } from "react";
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

export function VideoPlayer({ video, isOpen, onClose }: VideoPlayerProps) {
  if (!video) return null;

  // Extract embeddable video URL from different sources
  const getEmbedUrl = (url: string): string | null => {
    // Handle YouTube URLs
    const youtubePatterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/
    ];

    for (const pattern of youtubePatterns) {
      const match = url.match(pattern);
      if (match) {
        return `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0&modestbranding=1`;
      }
    }

    // Handle BibleProject URLs (via YouTube)
    if (url.includes('bibleproject.com/videos/')) {
      // BibleProject videos are hosted on YouTube, so we'd need to extract the YouTube ID
      // For now, return null and handle BibleProject URLs as external links
      return null;
    }

    return null;
  };

  // Check if this is a playable video (has videoUrl or externalUrl)
  const hasVideo = !!(video.videoUrl || video.externalUrl);
  const embedUrl = video.videoUrl ? getEmbedUrl(video.videoUrl) : null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full h-[90vh] p-0">
        <DialogHeader className="p-4 pb-2">
          <DialogTitle className="flex items-center justify-between">
            <span className="text-lg font-semibold pr-8">{video.title}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              data-testid="button-close-video"
              className="h-9 w-9 border-2 border-border bg-background hover:bg-accent hover:border-accent-border shadow-md hover:shadow-lg transition-all duration-200"
              aria-label="Close video player"
            >
              <X className="w-5 h-5" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 p-4 pt-0">
          {/* Video Player Section */}
          {hasVideo && embedUrl ? (
            <div className="aspect-video w-full mb-4 bg-black rounded-lg overflow-hidden">
              <iframe
                src={embedUrl}
                title={video.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                data-testid="video-iframe"
              />
            </div>
          ) : video.externalUrl ? (
            <div className="aspect-video w-full mb-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
              <div className="text-center p-8">
                <ExternalLink className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  {video.source} Platform
                </h3>
                <p className="text-blue-700 mb-4">
                  This content is available on the {video.source} platform
                </p>
                <Button
                  onClick={() => window.open(video.externalUrl, '_blank', 'noopener,noreferrer')}
                  className="bg-blue-600 hover:bg-blue-700"
                  data-testid="button-open-external"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open in {video.source}
                </Button>
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