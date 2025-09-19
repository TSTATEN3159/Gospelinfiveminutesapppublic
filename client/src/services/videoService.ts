export interface VideoItem {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: 'sermon' | 'gospel-tidbits' | 'christian-advice';
  views: number;
  thumbnail: string;
  videoUrl?: string;
  externalUrl?: string;
  verseReference?: string;
  verseText?: string;
  commentary?: string;
  source: 'Christian Context API' | 'TBN+' | 'Local';
}

export interface VideoResponse {
  success: boolean;
  videos: VideoItem[];
  total: number;
  sources: string[];
  error?: string;
}

class VideoService {
  private cache = new Map<string, VideoResponse & { timestamp: number }>();
  private cacheTimeout = 5 * 60 * 1000; // 5 minutes

  // Get cache key for requests
  private getCacheKey(category?: string, limit?: number): string {
    return `videos_${category || 'all'}_${limit || 10}`;
  }

  // Check if cache is still valid
  private isCacheValid(timestamp: number): boolean {
    return Date.now() - timestamp < this.cacheTimeout;
  }

  // Fetch videos from API
  async getVideos(category?: string, limit = 10): Promise<VideoItem[]> {
    const cacheKey = this.getCacheKey(category, limit);
    const cached = this.cache.get(cacheKey);

    // Return cached data if still valid
    if (cached && this.isCacheValid(cached.timestamp)) {
      return cached.videos;
    }

    try {
      const params = new URLSearchParams();
      if (category) params.append('category', category);
      params.append('limit', limit.toString());

      const response = await fetch(`/api/videos?${params}`);
      const data: VideoResponse = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch videos');
      }

      // Cache the results
      this.cache.set(cacheKey, {
        ...data,
        timestamp: Date.now()
      });

      return data.videos;
    } catch (error) {
      console.error('Video service error:', error);
      
      // Return fallback content if API fails
      return this.getFallbackVideos(category);
    }
  }

  // Get featured video (first sermon video)
  async getFeaturedVideo(): Promise<VideoItem | null> {
    try {
      const videos = await this.getVideos('sermon', 1);
      return videos.length > 0 ? videos[0] : null;
    } catch (error) {
      console.error('Error fetching featured video:', error);
      return null;
    }
  }

  // Get videos by category
  async getVideosByCategory(category: VideoItem['category']): Promise<VideoItem[]> {
    return this.getVideos(category, 10);
  }

  // Search videos by title or description
  async searchVideos(query: string): Promise<VideoItem[]> {
    try {
      const allVideos = await this.getVideos(undefined, 50);
      const searchTerm = query.toLowerCase();
      
      return allVideos.filter(video =>
        video.title.toLowerCase().includes(searchTerm) ||
        video.description.toLowerCase().includes(searchTerm) ||
        (video.verseReference && video.verseReference.toLowerCase().includes(searchTerm))
      );
    } catch (error) {
      console.error('Video search error:', error);
      return [];
    }
  }

  // Fallback videos if API fails
  private getFallbackVideos(category?: string): VideoItem[] {
    const fallbackVideos: VideoItem[] = [
      {
        id: 'fallback_1',
        title: 'Finding Peace in God\'s Promises',
        description: 'Discover how God\'s promises can bring peace to your anxious heart in times of trouble.',
        duration: '12:35',
        category: 'sermon',
        views: 3420,
        thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop',
        source: 'Local'
      },
      {
        id: 'fallback_2',
        title: 'The Power of Prayer in 3 Minutes',
        description: 'Quick wisdom on how prayer transforms our daily walk with Christ.',
        duration: '3:12',
        category: 'gospel-tidbits',
        views: 8750,
        thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=200&fit=crop',
        source: 'Local'
      },
      {
        id: 'fallback_3',
        title: 'Overcoming Fear with Faith',
        description: 'Biblical guidance on conquering fear and anxiety through trusting in God\'s plan.',
        duration: '8:45',
        category: 'christian-advice',
        views: 5670,
        thumbnail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop',
        source: 'Local'
      }
    ];

    if (category) {
      return fallbackVideos.filter(video => video.category === category);
    }
    return fallbackVideos;
  }

  // Open external video links
  openExternalVideo(video: VideoItem): void {
    if (video.externalUrl) {
      window.open(video.externalUrl, '_blank', 'noopener,noreferrer');
    } else if (video.videoUrl) {
      window.open(video.videoUrl, '_blank', 'noopener,noreferrer');
    }
  }
}

export const videoService = new VideoService();