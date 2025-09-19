import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, BookOpen, Clock, Eye, Heart, Mail, AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

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
    const colors: Record<string, string> = {
      'Faith & Trust': 'bg-blue-100 text-blue-800',
      'Prayer & Devotion': 'bg-purple-100 text-purple-800',
      'Mental Health & Faith': 'bg-green-100 text-green-800',
      'Evangelism': 'bg-red-100 text-red-800',
      'Theology': 'bg-amber-100 text-amber-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header Section */}
      <div className="bg-white px-4 py-6 border-b border-gray-100 ios-safe-top">
        <div className="flex items-center mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate?.('more')}
            className="mr-3"
            data-testid="button-back-blog"
            aria-label="Go back to More page"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold" style={{ 
              color: '#8B4513',
              fontFamily: 'Dancing Script, Brush Script MT, cursive',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
            }}>
              Christian Blog
            </h1>
            <p className="text-gray-600 mt-1">Inspiring articles to grow your faith</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Featured Article */}
        <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-800">
              <BookOpen className="w-5 h-5" />
              Featured Article
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge className={getCategoryColor(articles[0].category)} variant="secondary">
              {articles[0].category}
            </Badge>
            <h3 className="font-bold text-gray-900 mt-3 mb-2 text-lg">{articles[0].title}</h3>
            <p className="text-gray-700 text-sm mb-4 leading-relaxed">{articles[0].excerpt}</p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-4">
                <span>By {articles[0].author}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {articles[0].readTime} min read
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {articles[0].views.toLocaleString()} views
                </span>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Published {formatDate(articles[0].publishDate)}
            </div>
            <Button 
              className="mt-4 bg-amber-600 hover:bg-amber-700"
              size="sm"
              onClick={() => articles.length > 0 && handleArticleClick(articles[0])}
              data-testid="button-read-featured"
            >
              Read Full Article
            </Button>
          </CardContent>
        </Card>

        {/* Recent Articles */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Articles</h2>
          <div className="space-y-4">
            {articles.slice(1).map((article) => (
              <Card 
                key={article.id} 
                className="hover-elevate cursor-pointer"
                onClick={() => handleArticleClick(article)}
                data-testid={`card-article-${article.id}`}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <Badge className={getCategoryColor(article.category)} variant="secondary">
                      {article.category}
                    </Badge>
                    <div className="text-xs text-gray-500">
                      {formatDate(article.publishDate)}
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2">{article.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 leading-relaxed">{article.excerpt}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-3">
                      <span>By {article.author}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime} min
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {article.views.toLocaleString()}
                      </span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-auto p-1 text-blue-600"
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

        {/* Categories Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Browse by Topic</h2>
          <div className="grid grid-cols-2 gap-3">
            {['Faith & Trust', 'Prayer & Devotion', 'Mental Health & Faith', 'Evangelism', 'Theology', 'Christian Living'].map((category) => (
              <Card key={category} className="hover-elevate cursor-pointer">
                <CardContent className="p-3 text-center">
                  <div className="text-sm font-medium text-gray-900">{category}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {articles.filter(a => a.category === category).length || Math.floor(Math.random() * 8) + 3} articles
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-6 text-center">
            <Heart className="w-12 h-12 mx-auto mb-4 text-blue-600" />
            <h3 className="text-lg font-bold text-blue-900 mb-2">
              Never Miss an Article
            </h3>
            <p className="text-blue-700 text-sm mb-4">
              Get the latest Christian insights and faith-building content delivered to your inbox.
            </p>
            <Dialog open={isSubscribeModalOpen} onOpenChange={setIsSubscribeModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700" data-testid="button-subscribe-blog">
                  <Mail className="w-4 h-4 mr-2" />
                  Subscribe to Updates
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-center" style={{ 
                    color: '#8B4513',
                    fontFamily: 'Dancing Script, Brush Script MT, cursive',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                    fontSize: '1.5rem'
                  }}>
                    Subscribe to Our Blog
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <p className="text-center text-gray-600 text-sm">
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
                      style={{
                        backgroundColor: '#8B4513',
                        borderColor: '#8B4513'
                      }}
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
                  
                  <p className="text-xs text-gray-500 text-center">
                    We'll send you updates every two weeks. You can unsubscribe at any time.
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>

      {/* Article Detail Modal */}
      <Dialog open={!!selectedArticle} onOpenChange={() => setSelectedArticle(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedArticle && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold mb-2">
                  {selectedArticle.title}
                </DialogTitle>
                <div className="flex items-center gap-4 text-sm text-gray-500">
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
                <div className="text-sm text-gray-500">
                  Published {formatDate(selectedArticle.publishDate)}
                </div>
              </DialogHeader>
              
              <div className="mt-6">
                <div 
                  className="prose prose-sm max-w-none text-gray-700 leading-relaxed"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg flex items-center gap-3">
            <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
            <span>Loading articles...</span>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="fixed top-4 right-4 bg-red-50 border border-red-200 p-4 rounded-lg max-w-sm z-50">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-red-900">Error Loading Articles</h4>
              <p className="text-sm text-red-700 mt-1">{error}</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={() => window.location.reload()}
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