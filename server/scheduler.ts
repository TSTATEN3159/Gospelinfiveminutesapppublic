import { sendBlogUpdateEmails } from './email-service.js';
import { storage } from './storage.js';

class BlogUpdateScheduler {
  private intervalId: NodeJS.Timeout | null = null;

  /**
   * Start the automatic blog update scheduler
   * Sends blog updates every 2 weeks (14 days)
   */
  start() {
    // 14 days in milliseconds
    const TWO_WEEKS = 14 * 24 * 60 * 60 * 1000;
    
    console.log('Starting blog update scheduler - will send updates every 2 weeks');
    
    // Send immediately on startup (for testing, can be removed later)
    // this.sendBlogUpdate();
    
    // Set interval to send updates every 2 weeks
    this.intervalId = setInterval(async () => {
      console.log('Scheduled blog update triggered');
      await this.sendBlogUpdate();
    }, TWO_WEEKS);
  }

  /**
   * Stop the scheduler
   */
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log('Blog update scheduler stopped');
    }
  }

  /**
   * Manually trigger a blog update
   */
  async sendBlogUpdate(): Promise<void> {
    try {
      console.log('Sending scheduled blog update...');
      
      // Get all subscribers from the database
      const subscribers = await storage.getAllActiveSubscribers();
      
      if (!subscribers || subscribers.length === 0) {
        console.log('No subscribers found - skipping blog update');
        return;
      }
      
      // Get sample blog articles to send
      const articles = this.generateBlogArticles();
      
      // Send emails to all subscribers
      await sendBlogUpdateEmails(subscribers, articles);
      
      console.log(`Blog update sent successfully to ${subscribers.length} subscribers`);
    } catch (error) {
      console.error('Failed to send scheduled blog update:', error);
    }
  }

  /**
   * Generate sample blog articles for the update email
   */
  private generateBlogArticles() {
    return [
      {
        title: 'Walking by Faith, Not by Sight',
        excerpt: 'Discover how to trust God\'s plan even when the path ahead seems uncertain. Learn biblical principles for navigating life\'s challenges with unwavering faith.',
        author: 'Pastor David Chen',
        readTime: '4 min'
      },
      {
        title: 'The Power of Daily Prayer in Your Christian Walk',
        excerpt: 'Transform your spiritual life through consistent prayer. Explore practical tips and biblical foundations for developing a meaningful prayer routine.',
        author: 'Sarah Martinez',
        readTime: '6 min'
      },
      {
        title: 'Finding Peace in God\'s Promises During Difficult Times',
        excerpt: 'When life becomes overwhelming, God\'s promises provide an anchor for our souls. Discover scriptural truths that offer comfort and strength in trials.',
        author: 'Rev. Michael Johnson',
        readTime: '5 min'
      }
    ];
  }
}

export { BlogUpdateScheduler };