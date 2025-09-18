import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Clock, Eye, Heart } from "lucide-react";

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
  // Initial 5 Christian articles as requested
  const articles: BlogArticle[] = [
    {
      id: '1',
      title: 'Walking by Faith, Not by Sight',
      excerpt: 'Discover how to trust God\'s plan even when the path ahead seems uncertain. Learn biblical principles for navigating life\'s challenges with unwavering faith.',
      content: '...',
      author: 'Pastor David Chen',
      publishDate: '2024-01-15',
      readTime: 4,
      views: 2340,
      category: 'Faith & Trust'
    },
    {
      id: '2',
      title: 'The Power of Daily Prayer in Your Christian Walk',
      excerpt: 'Transform your spiritual life through consistent prayer. Explore practical tips and biblical foundations for developing a meaningful prayer routine.',
      content: '...',
      author: 'Sarah Martinez',
      publishDate: '2024-01-12',
      readTime: 6,
      views: 3150,
      category: 'Prayer & Devotion'
    },
    {
      id: '3',
      title: 'Finding God\'s Peace in Times of Anxiety',
      excerpt: 'When worry overwhelms, God offers perfect peace. Learn how to cast your anxieties on Him and experience the calm that surpasses understanding.',
      content: '...',
      author: 'Rev. Michael Johnson',
      publishDate: '2024-01-10',
      readTime: 5,
      views: 4520,
      category: 'Mental Health & Faith'
    },
    {
      id: '4',
      title: 'Living Out the Great Commission in Your Daily Life',
      excerpt: 'Every Christian is called to share the Gospel. Discover practical ways to be a witness for Christ in your workplace, community, and relationships.',
      content: '...',
      author: 'Jessica Thompson',
      publishDate: '2024-01-08',
      readTime: 7,
      views: 1890,
      category: 'Evangelism'
    },
    {
      id: '5',
      title: 'Understanding Grace: God\'s Unmerited Favor',
      excerpt: 'Grace is at the heart of the Gospel message. Explore the depth of God\'s grace and how it transforms our lives and relationships with others.',
      content: '...',
      author: 'Pastor Robert Williams',
      publishDate: '2024-01-05',
      readTime: 8,
      views: 5670,
      category: 'Theology'
    }
  ];

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
              <Card key={article.id} className="hover-elevate cursor-pointer">
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
                    <Button variant="ghost" size="sm" className="h-auto p-1 text-blue-600">
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
            <Button className="bg-blue-600 hover:bg-blue-700">
              Subscribe to Updates
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}