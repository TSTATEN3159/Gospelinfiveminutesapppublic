import { useState, useEffect } from "react";
import GreetingHeader from "../components/GreetingHeader";
import DailyVerseCard from "../components/DailyVerseCard";
import StreakCounter from "../components/StreakCounter";
import BibleStudyPlans from "../components/BibleStudyPlans";
import AskPastor from "../components/AskPastor";
import LiveInstallCounter from "../components/LiveInstallCounter";
import BadgeNotification from "../components/BadgeNotification";
import { VideoPlayer } from "../components/VideoPlayer";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Book, FileText, Cross, Flame, Facebook, Instagram, Loader2, AlertCircle, Heart, Share, Play } from "lucide-react";
import { Share2 } from "lucide-react";
import { Capacitor } from '@capacitor/core';

// Services
import { bibleService, type DailyVerse } from "../services/bibleService";
import { videoService, type VideoItem } from "../services/videoService";

// Images
import sunriseImage from '@assets/generated_images/Peaceful_sunrise_daily_verse_e2a3184e.png';
import mountainLakeImage from '@assets/generated_images/Mountain_lake_sunrise_scripture_98ce5cc4.png';
import forestPathImage from '@assets/generated_images/Forest_path_study_plans_fab1c678.png';
import oceanCliffImage from '@assets/generated_images/Ocean_cliff_pastor_counseling_10177ffd.png';
import spreadWordImage from '@assets/stock_images/spreading_god\'s_word_2db1f7d8.jpg';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  birthMonth: string;
  birthDay: string;
  phone: string;
}

interface HomePageProps {
  user?: User;
  onNavigate?: (page: string, searchQuery?: string) => void;
  onStreakUpdate?: (days: number) => void;
}

export default function HomePage({ user, onNavigate, onStreakUpdate }: HomePageProps) {
  const { toast } = useToast();
  const [showVerseModal, setShowVerseModal] = useState(false);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [showStudyPlans, setShowStudyPlans] = useState(false);
  const [showAskPastor, setShowAskPastor] = useState(false);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [badgeData, setBadgeData] = useState({ type: "", days: 0 });
  const [streakDays, setStreakDays] = useState(0);
  const [dailyVerse, setDailyVerse] = useState<DailyVerse | null>(null);
  const [dailyVideo, setDailyVideo] = useState<VideoItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // iOS platform detection for Apple Store compliance
  const isIOS = Capacitor.getPlatform() === 'ios';

  // Load daily verse from Bible API and daily video
  useEffect(() => {
    const loadDailyContent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get user's preferred Bible version from localStorage
        const savedPreferences = localStorage.getItem("gospelAppPreferences");
        let bibleVersion = 'NIV'; // Default
        if (savedPreferences) {
          try {
            const prefs = JSON.parse(savedPreferences);
            bibleVersion = prefs.bibleVersion || 'NIV';
          } catch (e) {
            console.warn('Could not parse saved preferences');
          }
        }
        
        const verse = await bibleService.getDailyVerse(bibleVersion);
        setDailyVerse(verse);
        
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
      {/* Header Section */}
      <div className="bg-white px-4 py-6 border-b border-gray-100 ios-safe-top">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold" style={{ 
              color: '#8B4513',
              fontFamily: 'Dancing Script, Brush Script MT, cursive',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
            }} aria-label="Welcome to The Gospel in 5 Minutes">
              Welcome!
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center gap-1">
              <Flame className="w-6 h-6 text-red-600 fill-red-600" />
              <span className="text-lg font-bold text-red-600">{streakDays}</span>
            </div>
          </div>
        </div>
        
        {/* App Title */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-3" style={{ 
            fontFamily: 'Dancing Script, Brush Script MT, cursive',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
            color: '#8B4513'
          }} aria-label="The Gospel in 5 Minutes - Daily Bible verses and spiritual guidance">
            The Gospel in 5 Minutes™
          </h2>
        </div>
        
        {/* Social Media Buttons and Donate Button - Same line */}
        <div className="flex justify-center items-center gap-3 mb-3">
          <a 
            href="https://www.facebook.com/TheGospelIn5Minutes" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-full text-xs hover-elevate ios-tap-target"
            data-testid="button-facebook-small"
            aria-label="Follow us on Facebook - Opens in new window"
          >
            <Facebook className="w-3 h-3" aria-hidden="true" />
            <span>Follow</span>
          </a>
          <a 
            href="https://www.instagram.com/thegospelin5minutes" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs hover-elevate ios-tap-target"
            data-testid="button-instagram-small"
            aria-label="Follow us on Instagram - Opens in new window"
          >
            <Instagram className="w-3 h-3" aria-hidden="true" />
            <span>Follow</span>
          </a>
          <Button 
            className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm"
            data-testid="button-donate-home"
            aria-label="Donate to help spread the Gospel"
            onClick={() => onNavigate?.('donate')}
          >
            <Heart className="w-3 h-3 mr-1" aria-hidden="true" />
            Donate
          </Button>
        </div>
        
        {/* Share Button */}
        <div className="flex justify-center mt-3">
          <Button 
            className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-1 rounded-full text-xs font-medium shadow-sm"
            data-testid="button-share-home"
            aria-label="Share The Gospel in 5 Minutes with friends"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'The Gospel in 5 Minutes',
                  text: 'Discover daily Bible verses and spiritual guidance with The Gospel in 5 Minutes app!',
                  url: 'https://www.thegospelin5minutes.org'
                }).catch(console.error);
              } else {
                navigator.clipboard.writeText('https://www.thegospelin5minutes.org').then(() => {
                  console.log('Link copied to clipboard');
                }).catch(console.error);
              }
            }}
          >
            <Share className="w-3 h-3 mr-1" aria-hidden="true" />
            Share The Gospel in 5 Minutes
          </Button>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4 ios-safe-bottom">
        {/* Daily Verse Card with Image */}
        <div 
          className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 cursor-pointer hover-elevate"
          onClick={() => setShowVerseModal(true)}
          data-testid="card-dailyVerse"
          role="button"
          tabIndex={0}
          aria-label="Today's Scripture - Click to view full verse with meaning and application"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setShowVerseModal(true);
            }
          }}
        >
          <div className="flex items-center p-4">
            <div className="flex-1 pr-4">
              <div className="flex items-center mb-2">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-white mr-2">
                  <Book className="w-3 h-3" />
                </div>
                <span className="text-sm font-medium text-gray-700">Daily Verse Experience</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-lg font-bold text-gray-900">
                  Today's Scripture
                </h2>
                <FileText className="w-4 h-4 text-gray-600" />
              </div>
              {loading ? (
                <div className="flex items-center gap-2 text-gray-500">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Loading today's verse...</span>
                </div>
              ) : error ? (
                <div className="flex items-center gap-2 text-red-500">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">Unable to load verse</span>
                </div>
              ) : dailyVerse ? (
                <>
                  <p className="text-sm text-gray-700 mb-1 line-clamp-2">
                    "{dailyVerse.text}"
                  </p>
                  <p className="text-xs text-gray-500 font-medium">
                    {dailyVerse.reference}
                  </p>
                </>
              ) : null}
            </div>
            <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
              <img 
                src={mountainLakeImage}
                alt="Today's Scripture"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Bible Study Section */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg border-2">
          <div className="relative h-40">
            <img 
              src={forestPathImage}
              alt="Bible Studies"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
          <div className="p-4">
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              Bible Studies
            </h2>
            <p className="text-gray-600 text-sm mb-3">
              Explore comprehensive Bible studies with guided reflections and spiritual growth.
            </p>
            <div className="flex justify-between items-center">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-blue-600 p-0 h-auto" 
                onClick={() => onNavigate?.('biblestudies')}
                data-testid="button-browseBibleStudies"
              >
                Browse Studies
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 p-0 h-auto" data-testid="button-dismissStudy">
                Dismiss
              </Button>
            </div>
          </div>
        </div>


        {/* Ask Pastor Section */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg border-2">
          <div className="relative h-40">
            <img 
              src={oceanCliffImage}
              alt="Ask the Pastor"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
          <div className="p-4">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <Cross className="w-4 h-4 text-blue-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-900" data-testid="text-sectionTitle-askPastor">Ask the AI Pastor</h2>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              Get AI-powered biblical guidance and spiritual counsel based on Scripture.
            </p>
            <Button 
              className="w-full bg-blue-600" 
              onClick={() => setShowAskPastor(true)}
              data-testid="button-askPastor"
            >
              Ask a Question
            </Button>
          </div>
        </div>

        {/* Streak Counter Section (Hidden - Just for Logic) */}
        <div className="hidden">
          <StreakCounter onBadgeEarned={handleBadgeEarned} onStreakUpdate={handleStreakUpdate} />
        </div>

        {/* The Gospel, In Their Words Section */}
        {dailyVideo && (
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg border-2">
            <div className="p-4">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <Play className="w-4 h-4 text-blue-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-900" data-testid="text-sectionTitle-gospelInMotion">
                  The Gospel in Motion
                </h2>
              </div>
              
              <div 
                className="flex items-center p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl cursor-pointer hover-elevate mb-3"
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
                    <span className="text-xs text-gray-500">{dailyVideo.duration}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">
                    {dailyVideo.title}
                  </h3>
                  {dailyVideo.subject && (
                    <p className="text-sm text-blue-700 font-medium mb-1">
                      Today's Focus: {dailyVideo.subject}
                    </p>
                  )}
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {dailyVideo.description}
                  </p>
                  {dailyVideo.verseReference && (
                    <p className="text-xs text-gray-500 mt-1 font-medium">
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
              
              <p className="text-gray-600 text-xs text-center">
                Tap to watch today's animated Bible teaching from BibleProject
              </p>
            </div>
          </div>
        )}

        {/* Donation Tile - Help Secure Bibles (Hidden on iOS for App Store compliance) */}
        {!isIOS && (
          <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-2xl p-6 shadow-lg border-2 border-amber-200">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                  <Heart className="w-8 h-8 text-white fill-current" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2" data-testid="heading-donation">
                  Give the Gift of God's Word
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Right now, someone across the world is searching for hope, comfort, and truth. Your $5 gift can help us place a Bible directly into the hands of someone who desperately needs to hear that they are loved, they matter, and they have a purpose. 
                </p>
                <p className="text-sm text-amber-800 dark:text-amber-200 font-semibold mb-1">
                  "Faith comes by hearing, and hearing by the word of God" - Romans 10:17
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 italic">
                  Every dollar goes directly to purchasing and distributing Bibles to those without access.
                </p>
              </div>
              <Button
                onClick={() => {
                  onNavigate?.('donate');
                }}
                className="flex items-center gap-2 bg-amber-600 text-white px-8 py-3 text-base font-semibold mx-auto"
                data-testid="button-donate"
              >
                <Heart className="w-5 h-5 fill-current" />
                <span>Give $5 for a Bible</span>
              </Button>
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Secure donation powered by Stripe</span>
              </div>
            </div>
          </div>
        )}

        {/* Facebook & Live Counter Section */}
        <div className="bg-white rounded-2xl p-4 shadow-lg border-2">
          <div className="flex flex-col items-center space-y-4">
            <div className="text-center">
              <LiveInstallCounter />
            </div>
            <a 
              href="https://www.facebook.com/TheGospelIn5Minutes" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full hover-elevate transition-all duration-200"
              data-testid="button-facebook"
            >
              <Facebook className="w-5 h-5" />
              <span className="font-medium">Follow on Facebook</span>
            </a>
          </div>
        </div>

        {/* Help Spread God's Word Section - Professional Design */}
        <div className="relative overflow-hidden rounded-3xl shadow-lg border-2 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${spreadWordImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/70 to-indigo-900/80"></div>
          
          {/* Content */}
          <div className="relative z-10 p-8">
            <div className="text-center space-y-6">
              {/* Icon and Title */}
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 shadow-2xl">
                  <Share2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2 tracking-wide">
                    Help Spread God's Word
                  </h3>
                  <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mx-auto"></div>
                </div>
              </div>
              
              {/* Description */}
              <div className="space-y-4">
                <p className="text-white/90 text-base leading-relaxed max-w-sm mx-auto font-medium">
                  Share this app with friends and family to help spread the Gospel message around the world.
                </p>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <p className="text-white/95 text-sm italic font-medium">
                    "Go into all the world and preach the gospel to all creation." - Mark 16:15
                  </p>
                </div>
              </div>
              
              {/* CTA Button */}
              <div className="pt-2">
                <Button
                  onClick={async () => {
                    if (navigator.share) {
                      try {
                        await navigator.share({
                          title: 'The Gospel in 5 Minutes',
                          text: 'Get daily Bible verses and spiritual guidance with this amazing app!',
                          url: 'https://www.thegospelin5minutes.org'
                        });
                      } catch (err) {
                        // User cancelled sharing or sharing not supported
                      }
                    } else {
                      // Fallback for browsers that don't support Web Share API
                      try {
                        await navigator.clipboard.writeText('https://www.thegospelin5minutes.org');
                        toast({
                          title: "Link copied!",
                          description: "App link copied to clipboard successfully.",
                        });
                      } catch (err) {
                        toast({
                          title: "Copy failed",
                          description: "Unable to copy link. Please try again.",
                          variant: "destructive",
                        });
                      }
                    }
                  }}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-8 py-4 text-base shadow-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  data-testid="button-share-app"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  <span>Share the Gospel</span>
                </Button>
              </div>
              
              {/* Impact Stats */}
              <div className="flex justify-center items-center gap-2 text-white/80 text-xs">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Join thousands spreading God's Word worldwide</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Professional Website Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">Visit our website for more resources</p>
            <a 
              href="https://www.thegospelin5minutes.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200"
              data-testid="link-website-footer"
              aria-label="Visit The Gospel in 5 Minutes website - Opens in new window"
            >
              www.thegospelin5minutes.org
            </a>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Dialog open={showVerseModal} onOpenChange={setShowVerseModal}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          {dailyVerse && !loading ? (
            <DailyVerseCard 
              verse={dailyVerse} 
              backgroundImage={sunriseImage} 
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

      {/* Ask Pastor Modal */}
      <Dialog open={showAskPastor} onOpenChange={setShowAskPastor}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden p-0">
          <div className="p-6 h-full">
            <AskPastor onClose={() => setShowAskPastor(false)} />
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