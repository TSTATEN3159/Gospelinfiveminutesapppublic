import { useState, useEffect, useRef, type MouseEvent } from "react";
import GreetingHeader from "../components/GreetingHeader";
import DailyVerseCard from "../components/DailyVerseCard";
import StreakCounter from "../components/StreakCounter";
import BibleStudyPlans from "../components/BibleStudyPlans";
import BadgeNotification from "../components/BadgeNotification";
import { VideoPlayer } from "../components/VideoPlayer";
import AppLogo from "../components/AppLogo";
import PersonalizedGreeting from "../components/PersonalizedGreeting";
import ProfilePictureUpload from "../components/ProfilePictureUpload";
import { DailyVerseHeroCard } from "../components/DailyVerseHeroCard";
import { KingdomParablesTab } from "../components/KingdomParablesTab";
import { BibleTriviaTile } from "../components/home/BibleTriviaTile";
import AbideTreePreview from "../components/AbideTreePreview";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useTriviaHomeStats } from "@/hooks/useTriviaHomeStats";
import { Book, FileText, Flame, Facebook, Instagram, Loader2, AlertCircle, Heart, Share, Play, BookOpen, Volume2, VolumeX, Crown } from "lucide-react";
import { Share2 } from "lucide-react";
import { Capacitor } from '@capacitor/core';

// Services
import { bibleService, type DailyVerse } from "../services/bibleService";
import { videoService, type VideoItem } from "../services/videoService";
import { useTranslations } from "../lib/translations";
import { widgetUpdater } from "../lib/widgetUpdater";
import { liveActivity } from "../lib/liveActivity";

// Images
import warmBibleDeskImage from '@assets/stock_images/person_writing_journ_f6e312be.jpg';
import mountainLakeImage from '@assets/stock_images/hands_holding_bible__58f7c786.jpg';
import forestPathImage from '@assets/stock_images/forest_path_sunlight_7c167ac0.jpg';
import spreadWordImage from '@assets/stock_images/spreading_god\'s_word_2db1f7d8.jpg';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  birthMonth: string;
  birthDay: string;
  phone?: string;
}

interface HomePageProps {
  user?: User;
  onNavigate?: (page: string, searchQuery?: string) => void;
  onStreakUpdate?: (days: number) => void;
  language?: string;
}

export default function HomePage({ user, onNavigate, onStreakUpdate, language = "en" }: HomePageProps) {
  const { toast } = useToast();
  const t = useTranslations(language);
  const { supported: ttsSupported, isSpeaking, speak, cancel, isInitialized: ttsInitialized } = useTextToSpeech();
  const { streakDays: triviaStreak, dailyCrowns, highestTitle } = useTriviaHomeStats();
  const hasShownTTSWarning = useRef(false);
  const [showVerseModal, setShowVerseModal] = useState(false);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [showStudyPlans, setShowStudyPlans] = useState(false);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [badgeData, setBadgeData] = useState({ type: "", days: 0 });
  const [streakDays, setStreakDays] = useState(0);
  const [dailyVerse, setDailyVerse] = useState<DailyVerse | null>(null);
  const [dailyVideo, setDailyVideo] = useState<VideoItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bibleStudiesStarted, setBibleStudiesStarted] = useState(0);
  
  
  // iOS platform detection for Apple Store compliance
  const isIOS = Capacitor.getPlatform() === 'ios';
  
  const handleTTSClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!dailyVerse) return;
    
    if (isSpeaking) {
      cancel();
    } else {
      const textToSpeak = `${dailyVerse.text}. ${dailyVerse.reference}`;
      speak(textToSpeak, language);
    }
  };

  // Load daily verse from Bible API and daily video
  useEffect(() => {
    if (ttsInitialized && !ttsSupported && !hasShownTTSWarning.current) {
      hasShownTTSWarning.current = true;
      toast({
        title: "Text-to-Speech Unavailable",
        description: t.ttsNotSupported,
        variant: "destructive",
      });
    }
  }, [ttsInitialized, ttsSupported, toast, t.ttsNotSupported]);


  useEffect(() => {
    const loadDailyContent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get user's preferred Bible version from localStorage
        const savedPreferences = localStorage.getItem("gospelAppPreferences");
        let bibleVersion = 'KJV'; // Default (supported: KJV, WEB, ASV, BBE)
        if (savedPreferences) {
          try {
            const prefs = JSON.parse(savedPreferences);
            bibleVersion = prefs.bibleVersion || 'KJV';
          } catch (e) {
            console.warn('Could not parse saved preferences');
          }
        }
        
        const verse = await bibleService.getDailyVerse(bibleVersion);
        setDailyVerse(verse);
        
        // Update iOS widget with daily verse
        if (verse) {
          const theme = widgetUpdater.determineTheme(verse.text, verse.reference);
          await widgetUpdater.updateDailyVerse({
            verse: verse.text,
            reference: verse.reference,
            theme: theme
          });
          console.log(`[Widget] Updated with ${verse.reference} (theme: ${theme})`);
          
          // Start/Update Live Activity countdown to midnight (if user enabled it)
          const liveActivitySupport = await liveActivity.isSupported();
          const liveActivityUserEnabled = localStorage.getItem('liveActivityEnabled') === 'true';
          if (liveActivitySupport.supported && liveActivitySupport.enabled && liveActivityUserEnabled) {
            await liveActivity.startCountdown(verse.text, verse.reference);
            console.log('[LiveActivity] Midnight countdown started');
          }
        }
        
        // Get daily Gospel video using Christian Context API
        const video = await videoService.getDailyGospelVideo();
        setDailyVideo(video);
      } catch (err) {
        setError('Unable to load today\'s content. Please check your connection.');
        console.error('Failed to load daily content:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDailyContent();
  }, []);

  // Load Bible Studies progress
  useEffect(() => {
    const bibleStudiesData = localStorage.getItem("bibleStudiesProgress");
    if (bibleStudiesData) {
      try {
        const progress = JSON.parse(bibleStudiesData);
        const startedCount = Object.keys(progress).filter(key => progress[key]?.started).length;
        setBibleStudiesStarted(startedCount);
      } catch (e) {
        // Fallback: count any localStorage keys starting with study IDs
        const studyIds = ["abide-in-christ", "waiting-on-god", "humility", "absolute-surrender", "with-christ-school-of-prayer", "morning-and-evening", "all-of-grace", "treasury-of-david", "power-through-prayer", "purpose-in-prayer", "weapon-of-prayer", "imitation-of-christ", "practice-presence-of-god", "pilgrims-progress", "christians-secret-happy-life", "answers-to-prayer", "how-to-pray", "union-and-communion", "my-utmost-for-his-highest", "attributes-of-god", "christian-counsel", "experiencing-depths", "serious-call", "religious-affections", "way-to-god", "christian-perfection", "confessions", "lectures-on-revival", "letters-of-newton", "letters-of-rutherford"];
        const started = studyIds.filter(id => localStorage.getItem(`bibleStudy-${id}-progress`)).length;
        setBibleStudiesStarted(started);
      }
    }
  }, []);

  const handleBadgeEarned = (badgeType: string, streakDays: number) => {
    setBadgeData({ type: badgeType, days: streakDays });
    setShowBadgeModal(true);
  };

  const handleStreakUpdate = (days: number) => {
    setStreakDays(days);
    onStreakUpdate?.(days);
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Professional Marketing Header */}
      <div className="bg-background px-4 py-6 border-b border-border ios-safe-top">
        {/* Streak Badge & Profile Picture - Top Right */}
        <div className="flex justify-end items-center gap-2 mb-6">
          <div className="flex items-center gap-1.5 bg-gradient-to-br from-red-50 to-red-100/70 dark:from-red-950 dark:to-red-900 px-2.5 py-1 rounded-full border border-red-200/50 dark:border-red-800/50 shadow-sm">
            <Flame className="w-4 h-4 text-red-600 dark:text-red-400 fill-red-600 dark:fill-red-400" />
            <span className="text-sm font-bold text-red-700 dark:text-red-300">{streakDays}</span>
          </div>
          <ProfilePictureUpload size="md" />
        </div>
        
        {/* Professional Logo - Centered Above Social Buttons */}
        <AppLogo onNavigate={onNavigate} size="medium" className="mb-3" />
        
        {/* Personalized Greeting */}
        <PersonalizedGreeting user={user} language={language} />
        
        {/* Action Buttons - Refined & Professional */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {/* Smaller Social Buttons */}
          <a 
            href="https://www.facebook.com/TheGospelIn5Minutes" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1.5 rounded-md text-xs font-medium shadow-sm hover:shadow-md transition-all ios-tap-target"
            data-testid="button-facebook-small"
            aria-label="Follow us on Facebook - Opens in new window"
          >
            <Facebook className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Follow</span>
          </a>
          <a 
            href="https://www.instagram.com/thegospelinfiveminutes/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-2.5 py-1.5 rounded-md text-xs font-medium shadow-sm hover:shadow-md transition-all ios-tap-target"
            data-testid="button-instagram-small"
            aria-label="Follow us on Instagram - Opens in new window"
          >
            <Instagram className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Follow</span>
          </a>
          
          {/* Share Verse Button - Opens Scripture Image Generator */}
          <Button 
            className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1.5 rounded-md text-xs font-medium shadow-sm hover:shadow-md transition-all"
            data-testid="button-share-home"
            aria-label="Share today's verse with a beautiful design"
            onClick={() => {
              if (dailyVerse) {
                // Store verse data in localStorage for Scripture Image page to read
                localStorage.setItem('pendingVerseShare', JSON.stringify({
                  reference: dailyVerse.reference,
                  text: dailyVerse.text,
                  version: 'KJV'
                }));
                onNavigate?.('image-scripture');
              }
            }}
          >
            <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Share</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="home" className="w-full">
        <div className="px-4 pt-4 pb-2 sticky top-0 z-10" style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg shadow-black/5">
            <TabsTrigger 
              value="home" 
              data-testid="tab-home" 
              className="gap-2 data-[state=active]:bg-white/80 data-[state=active]:dark:bg-white/20 data-[state=active]:shadow-md data-[state=active]:shadow-black/10 data-[state=inactive]:text-gray-600 data-[state=inactive]:dark:text-gray-400 backdrop-blur-md"
            >
              <BookOpen className="w-4 h-4" />
              Home
            </TabsTrigger>
            <TabsTrigger 
              value="kingdom" 
              data-testid="tab-kingdom" 
              className="gap-2 data-[state=active]:bg-white/80 data-[state=active]:dark:bg-white/20 data-[state=active]:shadow-md data-[state=active]:shadow-black/10 data-[state=inactive]:text-gray-600 data-[state=inactive]:dark:text-gray-400 backdrop-blur-md"
            >
              <Crown className="w-4 h-4" />
              Kingdom
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="home" className="px-4 py-4 space-y-4 ios-safe-bottom mt-0">
        {/* Hero Daily Verse Card - Bible App Style */}
        <DailyVerseHeroCard 
          onPress={() => setShowVerseModal(true)}
          reference={dailyVerse?.reference}
          text={dailyVerse?.text}
          loading={loading}
        />

        {/* The Good News - Gospel Invitation Card */}
        <div 
          className="relative overflow-hidden rounded-2xl cursor-pointer active:scale-[0.98] transition-transform"
          onClick={() => onNavigate?.('gospel')}
          data-testid="card-gospel-invitation"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-rose-500" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_50%)]" />
          <div className="relative p-5 text-white">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-1">The Good News</h3>
                <p className="text-white/90 text-sm leading-relaxed mb-3">
                  Discover the message that has changed billions of lives — and could change yours today.
                </p>
                <div className="flex items-center gap-2 text-white/80 text-xs">
                  <span className="bg-white/20 px-2 py-0.5 rounded-full">5 min read</span>
                  <span>•</span>
                  <span>Life-changing</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Abide - My Growth Today Section */}
        <AbideTreePreview />

        {/* Bible Trivia Section - World-Class Design */}
        <BibleTriviaTile 
          streakDays={triviaStreak}
          dailyCrowns={dailyCrowns}
          highestTitle={highestTitle}
          onStart={() => onNavigate?.('bibletrivia')}
        />

        {/* Classical Bible Studies Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border-2 border-gray-200 dark:border-gray-700">
          <div className="relative h-40">
            <img 
              src={forestPathImage}
              alt="Classical Bible Studies"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
          <div className="p-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
              Classical Bible Studies
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
              Explore 30 comprehensive Bible studies from classic Christian authors with guided reflections and spiritual growth.
            </p>
            <div className="flex items-center gap-3 mb-3">
              <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100">
                {bibleStudiesStarted > 0 ? `${bibleStudiesStarted} Started` : '30 Available'}
              </Badge>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {bibleStudiesStarted > 0 && `of 30`}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-blue-600 dark:text-blue-400 p-0 h-auto" 
                onClick={() => onNavigate?.('biblestudies')}
                data-testid="button-browseBibleStudies"
              >
                Browse Studies
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 dark:text-gray-500 p-0 h-auto" data-testid="button-dismissStudy">
                Dismiss
              </Button>
            </div>
          </div>
        </div>

        {/* Streak Counter Section (Hidden - Just for Logic) */}
        <div className="hidden">
          <StreakCounter onBadgeEarned={handleBadgeEarned} onStreakUpdate={handleStreakUpdate} />
        </div>

        {/* The Gospel, In Their Words Section */}
        {dailyVideo && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border-2 border-gray-200 dark:border-gray-700">
            <div className="p-4">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                  <Play className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100" data-testid="text-sectionTitle-gospelInMotion">
                  The Gospel in Motion
                </h2>
              </div>
              
              <div 
                className="flex items-center p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-xl cursor-pointer hover-elevate mb-3"
                onClick={() => setShowVideoPlayer(true)}
                data-testid="card-dailyVideo"
                role="button"
                tabIndex={0}
                aria-label={`Today's video: ${dailyVideo.title} - Click to watch`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setShowVideoPlayer(true);
                  }
                }}
              >
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-blue-600 text-white text-xs">
                      <Play className="w-3 h-3 mr-1" />
                      BibleProject
                    </Badge>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{dailyVideo.duration}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1">
                    {dailyVideo.title}
                  </h3>
                  {dailyVideo.subject && (
                    <p className="text-sm text-blue-700 dark:text-blue-400 font-medium mb-1">
                      Today's Focus: {dailyVideo.subject}
                    </p>
                  )}
                  <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                    {dailyVideo.description}
                  </p>
                  {dailyVideo.verseReference && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
                      {dailyVideo.verseReference}
                    </p>
                  )}
                </div>
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 relative">
                  <img 
                    src={dailyVideo.thumbnail}
                    alt={dailyVideo.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <Play className="w-6 h-6 text-white drop-shadow-lg" />
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 text-xs text-center">
                Tap to watch today's animated Bible teaching from BibleProject
              </p>
            </div>
          </div>
        )}

        {/* Professional Website Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Visit our website for more resources</p>
            <a 
              href="https://www.thegospelin5minutes.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500 text-sm font-medium transition-colors duration-200"
              data-testid="link-website-footer"
              aria-label="Visit The Gospel in 5 Minutes website - Opens in new window"
            >
              www.thegospelin5minutes.org
            </a>
          </div>
        </div>
        </TabsContent>

        <TabsContent value="kingdom" className="px-4 py-4 ios-safe-bottom mt-0">
          <KingdomParablesTab />
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <Dialog open={showVerseModal} onOpenChange={setShowVerseModal}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          {dailyVerse && !loading ? (
            <DailyVerseCard 
              verse={dailyVerse} 
              backgroundImage={warmBibleDeskImage} 
              onNavigate={(page, searchQuery) => {
                setShowVerseModal(false); // Close the modal
                onNavigate?.(page, searchQuery);
              }}
            />
          ) : (
            <div className="p-6 text-center">
              {loading ? (
                <div className="flex items-center gap-2 text-gray-500">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Loading verse...</span>
                </div>
              ) : error ? (
                <div className="flex items-center gap-2 text-red-500">
                  <AlertCircle className="w-4 h-4" />
                  <span>Unable to load verse</span>
                </div>
              ) : (
                <p className="text-gray-500">Loading verse...</p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <BadgeNotification 
        isOpen={showBadgeModal}
        onClose={() => setShowBadgeModal(false)}
        badgeType={badgeData.type}
        streakDays={badgeData.days}
      />

      {/* Bible Study Plans Modal */}
      <Dialog open={showStudyPlans} onOpenChange={setShowStudyPlans}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto p-0">
          <div className="p-6">
            <BibleStudyPlans />
          </div>
        </DialogContent>
      </Dialog>

      {/* Video Player Modal */}
      {dailyVideo && (
        <VideoPlayer 
          video={dailyVideo}
          isOpen={showVideoPlayer}
          onClose={() => setShowVideoPlayer(false)}
        />
      )}
    </div>
  );
}