import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, BookOpen, Clock, Eye, Heart, Mail, AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import bibleGoldenImage from '@assets/stock_images/open_bible_golden_su_6f7daf93.jpg';

interface BlogPageProps {
  onNavigate?: (page: string) => void;
  streakDays?: number;
}

interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  readTime: number;
  views: number;
  category: string;
}

export default function BlogPage({ onNavigate, streakDays = 0 }: BlogPageProps) {
  const { toast } = useToast();
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const [subscribeForm, setSubscribeForm] = useState({ name: '', email: '' });
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);

  const handleSubscribe = async () => {
    if (!subscribeForm.email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to subscribe.",
        variant: "destructive"
      });
      return;
    }

    setIsSubscribing(true);
    try {
      const response = await apiRequest('POST', '/api/subscribe', {
        email: subscribeForm.email,
        name: subscribeForm.name || null
      });
      
      const data = await response.json();

      if (data.success) {
        toast({
          title: "Successfully Subscribed!",
          description: data.message || "Thank you for subscribing to our blog updates.",
          variant: "default"
        });
        
        // Reset form and close modal
        setSubscribeForm({ name: '', email: '' });
        setIsSubscribeModalOpen(false);
      } else {
        throw new Error(data.error || 'Subscription failed');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        title: "Subscription Failed",
        description: "There was an error processing your subscription. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  // Fetch articles from Christian Context API
  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/blog-articles?limit=5');
        const data = await response.json();
        
        if (data.success && data.articles) {
          setArticles(data.articles);
        } else {
          throw new Error(data.error || 'Failed to load articles');
        }
      } catch (err) {
        console.error('Error loading blog articles:', err);
        setError('Unable to load articles. Please try again later.');
        
        // Fallback to ensure app doesn't break
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  const handleArticleClick = (article: BlogArticle) => {
    setSelectedArticle(article);
  };

  const getCategoryColor = (category: string) => {
    // Use semantic tokens for unified appearance and dark mode compatibility
    return 'bg-primary/10 text-primary';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen pb-20 bg-white dark:bg-gray-900">
      {/* Professional Header Section */}
      <div className="bg-white dark:bg-gray-800 px-4 py-8 border-b border-slate-200/60 dark:border-slate-700/60 ios-safe-top shadow-lg">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate?.('more')}
            className="mr-3 shadow-lg bg-gradient-to-br from-slate-100 to-blue-100 dark:from-slate-700 dark:to-blue-700"
            data-testid="button-back-blog"
            aria-label="Go back to More page"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1 text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-800 bg-clip-text text-transparent mb-2" style={{ 
              fontFamily: 'Dancing Script, Brush Script MT, cursive',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
            }}>
              Christian Blog
            </h1>
            <p className="text-slate-600 dark:text-slate-400 font-semibold text-lg">Inspiring articles to grow your faith</p>
            <div className="w-24 h-1 bg-gradient-to-r from-slate-400 via-blue-500 to-indigo-500 mx-auto mt-3 rounded-full shadow-lg"></div>
          </div>
        </div>
      </div>

      <div className="px-4 py-8 space-y-8 max-w-4xl mx-auto">
        {/* Professional Featured Article */}
        {articles.length > 0 && (
          <Card className="shadow-2xl border-0 bg-white dark:bg-gray-800 hover-elevate">
            <div className="bg-gradient-to-r from-slate-600 via-blue-600 to-indigo-600 p-1.5 shadow-xl">
              <div className="bg-white dark:bg-gray-800 rounded-t-lg">
                <CardHeader className="text-center pb-6 pt-8">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-slate-600 via-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl hover-elevate">
                      <BookOpen className="w-8 h-8 text-white" />
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full" />
                    </div>
                  </div>
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-800 bg-clip-text text-transparent text-center">
                    Featured Article
                  </CardTitle>
                  <p className="text-slate-600 dark:text-slate-400 font-semibold text-lg text-center mt-3">
                    Today's highlighted Christian insight
                  </p>
                </CardHeader>
              </div>
            </div>
            <CardContent className="p-8 bg-white dark:bg-gray-800">
              <div className="text-center mb-6">
                <Badge className="bg-gradient-to-r from-slate-500 to-blue-500 text-white border-0 shadow-lg px-4 py-2 text-sm font-semibold" variant="secondary">
                  {articles[0].category}
                </Badge>
              </div>
              <h3 className="font-bold text-slate-800 dark:text-slate-200 mt-4 mb-4 text-2xl text-center leading-tight">{articles[0].title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-base mb-6 leading-relaxed text-center font-medium">{articles[0].excerpt}</p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-600 dark:text-slate-400 font-medium mb-4">
                <span className="bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full">By {articles[0].author}</span>
                <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full">
                  <Clock className="w-4 h-4" />
                  {articles[0].readTime} min read
                </span>
                <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full">
                  <Eye className="w-4 h-4" />
                  {articles[0].views.toLocaleString()} views
                </span>
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-500 text-center mb-6 font-medium">
                Published {formatDate(articles[0].publishDate)}
              </div>
              <div className="text-center">
                <Button 
                  className="bg-gradient-to-r from-slate-600 via-blue-600 to-indigo-600 text-white border-0 shadow-xl px-8 py-3 text-base font-semibold"
                  onClick={() => handleArticleClick(articles[0])}
                  data-testid="button-read-featured"
                >
                  Read Full Article
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Professional Recent Articles */}
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-800 bg-clip-text text-transparent mb-6 text-center">Recent Articles</h2>
          <p className="text-slate-600 dark:text-slate-400 font-medium text-center mb-8">Latest insights to strengthen your faith journey</p>
          <div className="space-y-6">
            {articles.slice(1).map((article) => (
              <Card 
                key={article.id} 
                className="cursor-pointer shadow-2xl border-0 bg-white dark:bg-gray-800 hover-elevate"
                onClick={() => handleArticleClick(article)}
                data-testid={`card-article-${article.id}`}
              >
                <CardContent className="p-6 bg-white dark:bg-gray-800">
                  <div className="flex justify-between items-start mb-4">
                    <Badge className="bg-gradient-to-r from-slate-500 to-blue-500 text-white border-0 shadow-lg px-3 py-1.5 text-sm font-semibold" variant="secondary">
                      {article.category}
                    </Badge>
                    <div className="text-sm text-slate-500 dark:text-slate-500 font-medium bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full">
                      {formatDate(article.publishDate)}
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-3 text-xl leading-tight text-center">{article.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-base mb-4 leading-relaxed font-medium">{article.excerpt}</p>
                  
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-400 font-medium">
                      <span className="bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full">By {article.author}</span>
                      <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full">
                        <Clock className="w-4 h-4" />
                        {article.readTime} min
                      </span>
                      <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full">
                        <Eye className="w-4 h-4" />
                        {article.views.toLocaleString()}
                      </span>
                    </div>
                    <Button 
                      className="bg-gradient-to-r from-slate-600 to-blue-600 text-white border-0 shadow-lg px-6 py-2 text-sm font-semibold"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleArticleClick(article);
                      }}
                      data-testid={`button-read-more-${article.id}`}
                    >
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Professional Categories Section */}
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-800 bg-clip-text text-transparent mb-6 text-center">Browse by Topic</h2>
          <p className="text-slate-600 dark:text-slate-400 font-medium text-center mb-8">Explore content organized by spiritual themes</p>
          <div className="grid grid-cols-2 gap-4">
            {['Faith & Trust', 'Prayer & Devotion', 'Mental Health & Faith', 'Evangelism', 'Theology', 'Christian Living'].map((category) => (
              <Card key={category} className="cursor-pointer shadow-2xl border-0 bg-white dark:bg-gray-800 hover-elevate">
                <CardContent className="p-5 text-center bg-white dark:bg-gray-800">
                  <div className="text-base font-bold text-slate-800 dark:text-slate-200 mb-2">{category}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 font-medium bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full inline-block">
                    {articles.filter(a => a.category === category).length || Math.floor(Math.random() * 8) + 3} articles
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Professional Newsletter Signup */}
        <Card className="shadow-2xl border-0 bg-white dark:bg-gray-800 hover-elevate">
          <div className="bg-gradient-to-r from-slate-600 via-blue-600 to-indigo-600 p-1.5 shadow-xl">
            <div className="bg-white dark:bg-gray-800 rounded-t-lg">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-slate-500 via-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl hover-elevate">
                  <Heart className="w-10 h-10 text-white" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-800 bg-clip-text text-transparent mb-4 text-center">
                  Never Miss an Article
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-base font-medium mb-6 text-center leading-relaxed">
                  Get the latest Christian insights and faith-building content delivered to your inbox.
                </p>
                <Dialog open={isSubscribeModalOpen} onOpenChange={setIsSubscribeModalOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      className="bg-gradient-to-r from-slate-600 via-blue-600 to-indigo-600 text-white border-0 shadow-xl px-8 py-3 text-base font-semibold"
                      data-testid="button-subscribe-blog"
                    >
                      <Mail className="w-5 h-5 mr-2" />
                      Subscribe to Updates
                    </Button>
                  </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-center text-primary drop-shadow-sm" style={{ 
                    fontFamily: 'Dancing Script, Brush Script MT, cursive',
                    fontSize: '1.5rem'
                  }}>
                    Subscribe to Our Blog
                  </DialogTitle>
                  <DialogDescription className="text-center text-muted-foreground text-sm">
                    Join our community and receive bi-weekly Christian insights and faith-building content delivered to your inbox.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <p className="text-center text-muted-foreground text-sm">
                    Get bi-weekly Christian insights and faith-building content delivered to your inbox.
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="subscriber-name">Name (Optional)</Label>
                      <Input
                        id="subscriber-name"
                        type="text"
                        placeholder="Your name"
                        value={subscribeForm.name}
                        onChange={(e) => setSubscribeForm(prev => ({ ...prev, name: e.target.value }))}
                        data-testid="input-subscriber-name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="subscriber-email">Email Address *</Label>
                      <Input
                        id="subscriber-email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={subscribeForm.email}
                        onChange={(e) => setSubscribeForm(prev => ({ ...prev, email: e.target.value }))}
                        required
                        data-testid="input-subscriber-email"
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 pt-4">
                    <Button 
                      onClick={handleSubscribe}
                      disabled={!subscribeForm.email || isSubscribing}
                      className="w-full"
                      variant="default"
                      data-testid="button-confirm-subscribe"
                    >
                      {isSubscribing ? 'Subscribing...' : 'Subscribe to Updates'}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsSubscribeModalOpen(false)}
                      className="w-full"
                      data-testid="button-cancel-subscribe"
                    >
                      Cancel
                    </Button>
                  </div>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    We'll send you updates every two weeks. You can unsubscribe at any time.
                  </p>
                </div>
              </DialogContent>
            </Dialog>
              </CardContent>
            </div>
          </div>
        </Card>
      </div>

      {/* Article Detail Modal */}
      <Dialog open={!!selectedArticle} onOpenChange={() => setSelectedArticle(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedArticle && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold mb-2 text-center">
                  {selectedArticle.title}
                </DialogTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <Badge className={getCategoryColor(selectedArticle.category)} variant="secondary">
                    {selectedArticle.category}
                  </Badge>
                  <span>By {selectedArticle.author}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {selectedArticle.readTime} min read
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {selectedArticle.views.toLocaleString()} views
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Published {formatDate(selectedArticle.publishDate)}
                </div>
              </DialogHeader>
              
              <div className="mt-6">
                <div 
                  className="prose prose-sm max-w-none text-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                  data-testid="article-content"
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Loading State */}
      {loading && (
        <div className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-50">
          <div className="bg-background p-6 rounded-lg flex items-center gap-3">
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
            <span className="text-foreground">Loading articles...</span>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="fixed top-4 right-4 bg-destructive/10 border border-destructive/20 p-4 rounded-lg max-w-sm z-50">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
            <div>
              <h4 className="font-medium text-destructive">Error Loading Articles</h4>
              <p className="text-sm text-destructive/80 mt-1">{error}</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={() => window.location.reload()}
                data-testid="button-retry-articles"
              >
                Retry
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}