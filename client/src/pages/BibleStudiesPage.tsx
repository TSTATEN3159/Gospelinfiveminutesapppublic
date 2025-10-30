import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, Search, Clock, Users, BookOpen, Star, ChevronRight, Play, ChevronLeft } from "lucide-react";
import { useTranslations } from "@/lib/translations";

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

interface StudyLesson {
  id: number;
  title: string;
  content: string;
  verse: string;
  verseText: string;
  reflection: string[];
  prayer: string;
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

// Function to generate lessons for any study
const generateLessons = (study: BibleStudy): StudyLesson[] => {
  const lessonTitles = [
    "Beginning Your Journey", "Learning to Trust", "Finding Joy", "Growing in Faith",
    "Prayer and Devotion", "Walking in Love", "Overcoming Challenges", "Understanding Grace",
    "Building Character", "Sharing Your Faith", "Finding Peace", "Seeking Wisdom",
    "Serving Others", "Spiritual Discipline", "God's Promises", "Living with Purpose",
    "Cultivating Hope", "Embracing Change", "Finding Strength", "Understanding Scripture",
    "Walking in Truth", "Pursuing Holiness", "Celebrating Victory", "Enduring Trials",
    "Growing Deeper", "Reflecting Christ", "Living Boldly", "Trusting God's Timing",
    "Experiencing Freedom", "Maturing in Faith", "Walking in Power", "Finishing Strong"
  ];

  const verses = [
    { ref: "Matthew 11:28-30", text: "Come to me, all you who are weary and burdened, and I will give you rest." },
    { ref: "Proverbs 3:5-6", text: "Trust in the Lord with all your heart and lean not on your own understanding." },
    { ref: "Nehemiah 8:10", text: "The joy of the Lord is your strength." },
    { ref: "Romans 8:28", text: "And we know that in all things God works for the good of those who love him." },
    { ref: "Philippians 4:6-7", text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God." },
    { ref: "1 John 4:19", text: "We love because he first loved us." },
    { ref: "James 1:2-4", text: "Consider it pure joy, my brothers and sisters, whenever you face trials of many kinds." },
    { ref: "Ephesians 2:8-9", text: "For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God." },
    { ref: "Galatians 5:22-23", text: "But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control." },
    { ref: "Matthew 28:19-20", text: "Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit." }
  ];

  return Array.from({ length: study.lessons }, (_, i) => ({
    id: i + 1,
    title: lessonTitles[i % lessonTitles.length] || `Day ${i + 1} Lesson`,
    content: `Welcome to Day ${i + 1} of "${study.title}". ${study.description} Today we continue our journey of spiritual growth and deeper understanding of God's Word. Each day brings new opportunities to grow closer to Christ and discover His perfect will for our lives.`,
    verse: verses[i % verses.length].ref,
    verseText: verses[i % verses.length].text,
    reflection: [
      `How does today's scripture apply to your current life situation?`,
      `What is God teaching you through this lesson?`,
      `How can you put this into practice today?`
    ],
    prayer: `Heavenly Father, thank You for Day ${i + 1} of this journey. Help me to apply what I've learned today and to grow closer to You. Guide my steps and fill me with Your wisdom. In Jesus' name, Amen.`
  }));
};

export default function BibleStudiesPage({ currentUserId, language = "en", onNavigate }: BibleStudyProps) {
  const t = useTranslations(language);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(t.allCategory);
  const [selectedStudy, setSelectedStudy] = useState<BibleStudy | null>(null);
  const [showStudyDetail, setShowStudyDetail] = useState(false);
  const [showStudyLesson, setShowStudyLesson] = useState(false);
  const [showLessonList, setShowLessonList] = useState(false);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [currentLessons, setCurrentLessons] = useState<StudyLesson[]>([]);

  const categories = [t.allCategory, t.discipleship, t.encouragement, t.character, t.prayer, t.prophecy, t.love];

  const filteredStudies = sampleStudies.filter(study => {
    const matchesSearch = study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         study.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         study.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === t.allCategory || study.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredStudy = filteredStudies.find(study => study.featured);
  const otherStudies = filteredStudies.filter(study => !study.featured);

  const getDifficultyLevel = (difficulty: string) => {
    if (difficulty === "Beginner") return t.beginner;
    if (difficulty === "Intermediate") return t.intermediate;
    if (difficulty === "Advanced") return t.advanced;
    return difficulty;
  };

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
            className="mr-3 h-11 w-11 bg-amber-100/80 dark:bg-amber-900/50 hover:bg-amber-200 dark:hover:bg-amber-800 shadow-lg hover:shadow-xl transition-all duration-300 rounded-full"
            data-testid="button-back-bible-studies"
            aria-label="Go back to Home page"
          >
            <ArrowLeft className="w-5 h-5 text-amber-700 dark:text-amber-300" />
          </Button>
          <div className="flex-1 text-center">
            <h1 className="text-2xl font-bold text-amber-800 dark:text-amber-300" style={{ 
              fontFamily: 'Dancing Script, Brush Script MT, cursive'
            }}>
              {t.bibleStudiesTitle}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">{t.bibleStudiesSubtitle}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Featured Articles Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-foreground">{t.featuredStudies}</h2>
          <Button 
            variant="ghost" 
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            onClick={() => {
              setSelectedCategory(t.allCategory);
              setSearchQuery("");
              document.getElementById("studies-grid")?.scrollIntoView({ behavior: "smooth" });
            }}
            data-testid="button-browse-all-studies"
          >
            {t.browseAllStudies}
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
                  placeholder={t.searchBibleStudies}
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
                  <Badge className="bg-amber-600 text-white">{t.featured}</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Star className="w-6 h-6 text-amber-500 fill-current" />
                </div>
              </div>
              <div className="md:w-2/3 p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary" className={getDifficultyColor(featuredStudy.difficulty)}>
                    {getDifficultyLevel(featuredStudy.difficulty)}
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
                    {featuredStudy.lessons} {t.lessons}
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
                  {t.startStudy}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Other Studies Grid */}
        {otherStudies.length > 0 && (
          <div id="studies-grid">
            <h3 className="text-xl font-bold text-gray-900 dark:text-foreground mb-6">{t.moreStudies}</h3>
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
                        {getDifficultyLevel(study.difficulty)}
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
                      {t.viewStudy}
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
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">{t.noStudiesFound}</h3>
            <p className="text-gray-500 dark:text-gray-400">
              {t.adjustSearchTerms}
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
                    {getDifficultyLevel(selectedStudy.difficulty)}
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
                    <span className="text-sm text-gray-600 dark:text-gray-300">{selectedStudy.lessons} {t.lessons}</span>
                  </div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">{t.whatYouLearn}</h4>
                  <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
                    <li>• {t.deepBiblicalInsights}</li>
                    <li>• {t.guidedReflectionQuestions}</li>
                    <li>• {t.scriptureMemorization}</li>
                    <li>• {t.communityDiscussionPoints}</li>
                  </ul>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    className="flex-1 bg-amber-600 hover:bg-amber-700 text-white"
                    onClick={() => {
                      const lessons = generateLessons(selectedStudy);
                      setCurrentLessons(lessons);
                      setShowStudyDetail(false);
                      setShowLessonList(true);
                      console.log(`Starting study: ${selectedStudy.title} with ${lessons.length} lessons`);
                    }}
                    data-testid={`button-start-study-detail-${selectedStudy.id}`}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {t.startStudy}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowStudyDetail(false)}
                    data-testid="button-close-study-detail"
                  >
                    {t.close}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Lesson List Modal (Day Selector) */}
      <Dialog open={showLessonList} onOpenChange={setShowLessonList}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedStudy && currentLessons.length > 0 && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setShowLessonList(false);
                      setShowStudyDetail(true);
                    }}
                    className="h-11 w-11 bg-accent/50 dark:bg-accent/30 hover:bg-accent dark:hover:bg-accent shadow-md hover:shadow-lg transition-all duration-300 rounded-full"
                    aria-label="Go back to study details"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                  <div>
                    <DialogTitle className="text-xl font-bold">{selectedStudy.title}</DialogTitle>
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                      Select a day to begin
                    </p>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300">
                  Choose which day you'd like to study. You can start from Day 1 or jump to any lesson.
                </p>

                {/* Day Grid */}
                <div className="grid grid-cols-5 sm:grid-cols-7 gap-2">
                  {currentLessons.map((lesson, index) => (
                    <Button
                      key={lesson.id}
                      variant="outline"
                      className="h-14 flex flex-col items-center justify-center hover:bg-amber-100 dark:hover:bg-amber-900/30 hover:border-amber-600"
                      onClick={() => {
                        setCurrentLessonIndex(index);
                        setShowLessonList(false);
                        setShowStudyLesson(true);
                      }}
                      data-testid={`button-select-day-${lesson.id}`}
                    >
                      <span className="text-xs text-gray-500 dark:text-gray-400">Day</span>
                      <span className="text-lg font-bold">{lesson.id}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Study Lesson Modal */}
      <Dialog open={showStudyLesson} onOpenChange={setShowStudyLesson}>
        <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto">
          {selectedStudy && currentLessons[currentLessonIndex] && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowStudyLesson(false)}
                      data-testid="button-close-lesson"
                      className="h-11 w-11 bg-accent/50 dark:bg-accent/30 hover:bg-accent dark:hover:bg-accent shadow-md hover:shadow-lg transition-all duration-300 rounded-full"
                      aria-label="Close lesson"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div>
                      <DialogTitle className="text-xl font-bold">{selectedStudy.title}</DialogTitle>
                      <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                        {t.lessonOf} {currentLessonIndex + 1} / {currentLessons.length}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {t.day} {currentLessonIndex + 1}
                  </Badge>
                </div>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Lesson Title */}
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-foreground">
                    {currentLessons[currentLessonIndex].title}
                  </h2>
                </div>

                {/* Main Content */}
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {currentLessons[currentLessonIndex].content}
                  </p>
                </div>

                {/* Bible Verse */}
                <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                  <CardContent className="p-6">
                    <div className="text-center space-y-3">
                      <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                        {t.todaysScripture}
                      </h3>
                      <div className="bg-white dark:bg-blue-950/50 rounded-lg p-4">
                        <p className="text-blue-800 dark:text-blue-200 italic leading-relaxed mb-3">
                          "{currentLessons[currentLessonIndex].verseText}"
                        </p>
                        <p className="text-blue-600 dark:text-blue-300 font-medium">
                          — {currentLessons[currentLessonIndex].verse}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Reflection Questions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900 dark:text-foreground">
                      {t.reflectionQuestions}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {currentLessons[currentLessonIndex].reflection.map((question, idx) => (
                        <li key={idx} className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full flex items-center justify-center text-sm font-medium">
                            {idx + 1}
                          </span>
                          <span className="text-gray-700 dark:text-gray-300">{question}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Prayer */}
                <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-900 dark:text-green-100">
                      {t.todaysPrayer}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-green-800 dark:text-green-200 italic leading-relaxed">
                      {currentLessons[currentLessonIndex].prayer}
                    </p>
                  </CardContent>
                </Card>

                {/* Navigation */}
                <div className="flex justify-between items-center pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentLessonIndex(Math.max(0, currentLessonIndex - 1))}
                    disabled={currentLessonIndex === 0}
                    data-testid="button-previous-lesson"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    {t.previousLesson}
                  </Button>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Progress: {currentLessonIndex + 1} / {currentLessons.length}
                    </p>
                    <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-1">
                      <div 
                        className="h-2 bg-amber-600 rounded-full transition-all duration-300"
                        style={{ width: `${((currentLessonIndex + 1) / currentLessons.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      if (currentLessonIndex < currentLessons.length - 1) {
                        setCurrentLessonIndex(currentLessonIndex + 1);
                      } else {
                        // Study completed
                        setShowStudyLesson(false);
                        alert(t.lessonCompleted + " " + t.greatProgress);
                      }
                    }}
                    data-testid="button-next-lesson"
                  >
                    {currentLessonIndex < currentLessons.length - 1 ? t.nextLesson : t.completeLesson}
                    <ChevronRight className="w-4 h-4 ml-2" />
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