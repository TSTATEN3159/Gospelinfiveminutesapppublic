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
  source: 'Christian Context API' | 'BibleProject' | 'Local';
  subject?: string;
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

      const { apiUrl } = await import('@/lib/api-config');
      const response = await fetch(apiUrl(`/api/videos?${params}`));
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
      
      // App Store compliance: Return empty array instead of mock content
      return [];
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

  // Daily Gospel video using Christian Context API (same as Faith Videos page)
  async getDailyGospelVideo(): Promise<VideoItem | null> {
    try {
      // Use Christian Context API (same as Faith Videos page)
      const response = await fetch(`/api/videos?category=sermon&limit=1`);
      const data = await response.json();
      
      if (data.success && data.videos.length > 0) {
        const video = data.videos[0];
        
        // Themes that rotate daily for subject line
        const dailyThemes = [
          'Faith', 'Grace', 'God\'s Love', 'Salvation', 'Hope', 
          'Peace', 'Joy', 'Strength', 'Wisdom', 'Forgiveness'
        ];

        // Get day of year to rotate themes
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = now.getTime() - start.getTime();
        const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
        
        // Select today's theme
        const todayTheme = dailyThemes[dayOfYear % dailyThemes.length];

        return {
          ...video,
          subject: `Today's Focus: ${todayTheme}`,
          id: `daily_gospel_${dayOfYear}`,
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching daily gospel video:', error);
      return null;
    }
  }

  // App Store compliance: No fallback/mock content allowed

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