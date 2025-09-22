import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, Search, Clock, Users, BookOpen, Star, ChevronRight, Play } from "lucide-react";

interface BibleStudyProps {
  currentUserId: string;
  language: string;
  onNavigate?: (page: string) => void;
}

interface BibleStudy {
  id: string;
  title: string;
  author: string;
  description: string;
  category: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  lessons: number;
  imageUrl?: string;
  featured?: boolean;
}

const sampleStudies: BibleStudy[] = [
  {
    id: "1",
    title: "Walking with Jesus: A 30-Day Journey",
    author: "Dr. Sarah Mitchell",
    description: "Discover the profound joy and peace that comes from walking daily with our Savior. This comprehensive study explores Christ's teachings and how they transform our everyday lives through practical application and deep reflection.",
    category: "Discipleship",
    duration: "30 days",
    difficulty: "Beginner",
    lessons: 30,
    featured: true
  },
  {
    id: "2",
    title: "Faith in Times of Trial",
    author: "Pastor Mark Johnson",
    description: "Learn how biblical characters overcame adversity through unwavering faith and trust in God's plan.",
    category: "Encouragement",
    duration: "14 days",
    difficulty: "Intermediate",
    lessons: 14
  },
  {
    id: "3",
    title: "The Fruit of the Spirit",
    author: "Rev. Lisa Thompson",
    description: "A deep dive into Galatians 5:22-23, exploring how to cultivate spiritual fruit in your daily walk.",
    category: "Character",
    duration: "21 days",
    difficulty: "Intermediate",
    lessons: 21
  },
  {
    id: "4",
    title: "Prayer That Changes Everything",
    author: "Bishop James Wilson",
    description: "Transform your prayer life and experience God's power through effective, biblical prayer principles.",
    category: "Prayer",
    duration: "10 days",
    difficulty: "Beginner",
    lessons: 10
  },
  {
    id: "5",
    title: "Understanding Biblical Prophecy",
    author: "Dr. Michael Roberts",
    description: "Explore the prophetic books of the Bible and their relevance to our modern world and future hope.",
    category: "Prophecy",
    duration: "45 days",
    difficulty: "Advanced",
    lessons: 45
  },
  {
    id: "6",
    title: "Love Like Jesus",
    author: "Rev. Grace Adams",
    description: "Learn to love others with the sacrificial, unconditional love that Jesus demonstrated throughout His ministry.",
    category: "Love",
    duration: "7 days",
    difficulty: "Beginner",
    lessons: 7
  }
];

export default function BibleStudiesPage({ currentUserId, language, onNavigate }: BibleStudyProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStudy, setSelectedStudy] = useState<BibleStudy | null>(null);
  const [showStudyDetail, setShowStudyDetail] = useState(false);

  const categories = ["All", "Discipleship", "Encouragement", "Character", "Prayer", "Prophecy", "Love"];

  const filteredStudies = sampleStudies.filter(study => {
    const matchesSearch = study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         study.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         study.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || study.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredStudy = filteredStudies.find(study => study.featured);
  const otherStudies = filteredStudies.filter(study => !study.featured);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "Intermediate": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "Advanced": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-background dark:to-muted/20">
      {/* Header */}
      <div className="bg-white dark:bg-background px-4 py-6 border-b border-gray-100 dark:border-border ios-safe-top shadow-sm">
        <div className="flex items-center mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate?.('home')}
            className="mr-3"
            data-testid="button-back-bible-studies"
            aria-label="Go back to Home page"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1 text-center">
            <h1 className="text-2xl font-bold text-amber-800 dark:text-amber-300" style={{ 
              fontFamily: 'Dancing Script, Brush Script MT, cursive'
            }}>
              Bible Studies
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Grow deeper in your faith journey</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Featured Articles Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-foreground">Featured Studies</h2>
          <Button 
            variant="ghost" 
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
              document.getElementById("studies-grid")?.scrollIntoView({ behavior: "smooth" });
            }}
            data-testid="button-browse-all-studies"
          >
            Browse all Studies
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* Search and Filter */}
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search Bible studies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-studies"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    data-testid={`button-category-${category.toLowerCase()}`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Featured Study */}
        {featuredStudy && (
          <Card className="shadow-lg border-0 overflow-hidden hover-elevate transition-all duration-300 cursor-pointer" data-testid={`featured-study-${featuredStudy.id}`}>
            <div className="md:flex">
              <div className="md:w-1/3 h-64 md:h-auto bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/40 flex items-center justify-center relative">
                <div className="text-center p-8">
                  <BookOpen className="w-16 h-16 text-amber-600 dark:text-amber-400 mx-auto mb-4" />
                  <Badge className="bg-amber-600 text-white">Featured</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Star className="w-6 h-6 text-amber-500 fill-current" />
                </div>
              </div>
              <div className="md:w-2/3 p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary" className={getDifficultyColor(featuredStudy.difficulty)}>
                    {featuredStudy.difficulty}
                  </Badge>
                  <Badge variant="outline">{featuredStudy.category}</Badge>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-2">
                  {featuredStudy.title}
                </h3>
                
                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-3 uppercase tracking-wide">
                  {featuredStudy.author}
                </p>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {featuredStudy.description}
                </p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {featuredStudy.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {featuredStudy.lessons} lessons
                  </div>
                </div>
                
                <Button 
                  className="bg-amber-600 hover:bg-amber-700 text-white" 
                  onClick={() => {
                    setSelectedStudy(featuredStudy);
                    setShowStudyDetail(true);
                  }}
                  data-testid={`button-start-study-${featuredStudy.id}`}
                >
                  Start Study
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Other Studies Grid */}
        {otherStudies.length > 0 && (
          <div id="studies-grid">
            <h3 className="text-xl font-bold text-gray-900 dark:text-foreground mb-6">More Studies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherStudies.map((study) => (
                <Card 
                  key={study.id} 
                  className="shadow-md hover-elevate transition-all duration-300 cursor-pointer" 
                  onClick={() => {
                    setSelectedStudy(study);
                    setShowStudyDetail(true);
                  }}
                  data-testid={`study-card-${study.id}`}
                >
                  <div className="h-40 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="secondary" className={getDifficultyColor(study.difficulty)}>
                        {study.difficulty}
                      </Badge>
                      <Badge variant="outline">{study.category}</Badge>
                    </div>
                    
                    <h4 className="font-bold text-gray-900 dark:text-foreground mb-2">
                      {study.title}
                    </h4>
                    
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-2 uppercase tracking-wide">
                      {study.author}
                    </p>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                      {study.description}
                    </p>
                    
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {study.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        {study.lessons}
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full" 
                      variant="outline" 
                      onClick={() => {
                        setSelectedStudy(study);
                        setShowStudyDetail(true);
                      }}
                      data-testid={`button-view-study-${study.id}`}
                    >
                      View Study
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredStudies.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">No studies found</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your search terms or category filter
            </p>
          </div>
        )}
      </div>

      {/* Study Detail Modal */}
      <Dialog open={showStudyDetail} onOpenChange={setShowStudyDetail}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedStudy && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/40 rounded-full flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <DialogTitle className="text-xl font-bold">{selectedStudy.title}</DialogTitle>
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium uppercase tracking-wide">
                      {selectedStudy.author}
                    </p>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className={getDifficultyColor(selectedStudy.difficulty)}>
                    {selectedStudy.difficulty}
                  </Badge>
                  <Badge variant="outline">{selectedStudy.category}</Badge>
                </div>
                
                <DialogDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {selectedStudy.description}
                </DialogDescription>
                
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{selectedStudy.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{selectedStudy.lessons} lessons</span>
                  </div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">What You'll Learn:</h4>
                  <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
                    <li>• Deep biblical insights and practical applications</li>
                    <li>• Guided reflection questions for personal growth</li>
                    <li>• Scripture memorization and meditation techniques</li>
                    <li>• Community discussion points for group study</li>
                  </ul>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    className="flex-1 bg-amber-600 hover:bg-amber-700 text-white"
                    onClick={() => {
                      setShowStudyDetail(false);
                      // Here you would navigate to the actual study content
                      console.log(`Starting study: ${selectedStudy.title}`);
                    }}
                    data-testid={`button-start-study-detail-${selectedStudy.id}`}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Study
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowStudyDetail(false)}
                    data-testid="button-close-study-detail"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}