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

  // Daily BibleProject video - Different video each day (with verified working URLs)
  getDailyBibleProjectVideo(): VideoItem {
    const bibleProjectVideos = [
      {
        id: 'genesis-overview',
        title: 'Genesis: In the Beginning',
        description: 'Discover how Genesis reveals God\'s character and His plan for creation.',
        subject: 'Creation, Fall, and God\'s Promise',
        duration: '8:02',
        category: 'sermon' as const,
        views: 0,
        videoUrl: 'https://www.youtube.com/watch?v=afbr4_dsMjI', // BibleProject Genesis 1-11 verified
        verseReference: 'Genesis 1:1',
        verseText: 'In the beginning God created the heavens and the earth.',
        thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
        source: 'BibleProject' as const
      },
      {
        id: 'justice-theme',
        title: 'Biblical Justice',
        description: 'Understanding God\'s heart for justice and righteousness.',
        subject: 'Justice, Mercy, and Walking Humbly',
        duration: '6:18',
        category: 'christian-advice' as const,
        views: 0,
        videoUrl: 'https://www.youtube.com/watch?v=A14THPoc4-4', // BibleProject Justice verified
        verseReference: 'Micah 6:8',
        verseText: 'He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly and to love mercy and to walk humbly with your God.',
        thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop',
        source: 'BibleProject' as const
      },
      {
        id: 'love-theme',
        title: 'God\'s Love',
        description: 'Exploring the depth and character of God\'s unconditional love.',
        subject: 'Divine Love and Sacrifice',
        duration: '7:24',
        category: 'christian-advice' as const,
        views: 0,
        videoUrl: 'https://www.youtube.com/watch?v=lTbvEUQdDu8', // BibleProject Love/Hesed verified
        verseReference: '1 John 4:19',
        verseText: 'We love because he first loved us.',
        thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop',
        source: 'BibleProject' as const
      },
      {
        id: 'peace-theme',
        title: 'Shalom: God\'s Peace',
        description: 'Understanding biblical peace as more than absence of conflict.',
        subject: 'True Peace and Wholeness',
        duration: '5:43',
        category: 'christian-advice' as const,
        views: 0,
        videoUrl: 'https://www.youtube.com/watch?v=oLYORLZOayk', // BibleProject Shalom verified
        verseReference: 'John 14:27',
        verseText: 'Peace I leave with you; my peace I give you. I do not give to you as the world gives.',
        thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
        source: 'BibleProject' as const
      },
      {
        id: 'wisdom-theme',
        title: 'Biblical Wisdom',
        description: 'Learning to live skillfully in God\'s world.',
        subject: 'Wisdom, Understanding, and Truth',
        duration: '6:42',
        category: 'christian-advice' as const,
        views: 0,
        videoUrl: 'https://www.youtube.com/watch?v=2b3LMNj44bc', // BibleProject Wisdom verified
        verseReference: 'Proverbs 9:10',
        verseText: 'The fear of the Lord is the beginning of wisdom, and knowledge of the Holy One is understanding.',
        thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop',
        source: 'BibleProject' as const
      },
      {
        id: 'gospel-theme',
        title: 'What is the Gospel?',
        description: 'The good news of Jesus Christ explained through animation.',
        subject: 'Salvation, Grace, and New Life',
        duration: '6:52',
        category: 'christian-advice' as const,
        views: 0,
        videoUrl: 'https://www.youtube.com/watch?v=xmFPS0f-kzs', // BibleProject Gospel verified
        verseReference: 'Romans 1:16',
        verseText: 'For I am not ashamed of the gospel, because it is the power of God that brings salvation to everyone who believes.',
        thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop',
        source: 'BibleProject' as const
      },
      {
        id: 'heaven-earth',
        title: 'Heaven and Earth',
        description: 'Understanding God\'s plan to unite heaven and earth.',
        subject: 'God\'s Kingdom and Eternal Plan',
        duration: '5:52',
        category: 'christian-advice' as const,
        views: 0,
        videoUrl: 'https://www.youtube.com/watch?v=Zy2AQlK6C5k', // BibleProject Heaven & Earth verified
        verseReference: 'Revelation 21:1',
        verseText: 'Then I saw "a new heaven and a new earth," for the first heaven and the first earth had passed away.',
        thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
        source: 'BibleProject' as const
      }
    ];

    // Get day of year to rotate videos
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    // Rotate through videos based on day of year
    const videoIndex = dayOfYear % bibleProjectVideos.length;
    return bibleProjectVideos[videoIndex];
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