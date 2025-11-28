import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, Cross, Sparkles, BookOpen, ArrowRight, Share2, Check, Home, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Share } from '@capacitor/share';
import { Capacitor } from '@capacitor/core';

// Stock images for Gospel presentation
import sunriseImage from '@assets/stock_images/beautiful_sunrise_go_5ee50391.jpg';
import stormCloudsImage from '@assets/stock_images/dramatic_storm_cloud_d3bb5316.jpg';
import woodenCrossImage from '@assets/stock_images/wooden_cross_mountai_a2b55c31.jpg';
import prayingHandsImage from '@assets/stock_images/person_praying_hands_0c7284fd.jpg';
import worshipHandsImage from '@assets/stock_images/church_worship_hands_478f58d8.jpg';
import peoplePrayingImage from '@assets/stock_images/people_praying_toget_0e6a8b15.jpg';
import churchInteriorImage from '@assets/stock_images/modern_church_interi_1e9df37b.jpg';
import crossSilhouetteImage from '@assets/stock_images/cross_silhouette_sun_9382d340.jpg';

interface GospelStep {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  scripture: string;
  reference: string;
  icon: 'heart' | 'cross' | 'sparkles' | 'refresh' | 'book';
  gradient: string;
  image: string;
}

const gospelSteps: GospelStep[] = [
  {
    id: 1,
    title: "God Loves You",
    subtitle: "You were created for a purpose",
    content: "Before you were born, God knew you. He created you with intention, purpose, and deep love. You are not an accident—you are a masterpiece, designed by the Creator of the universe who wants a relationship with you.",
    scripture: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
    reference: "John 3:16",
    icon: 'heart',
    gradient: 'from-rose-500 to-pink-600',
    image: sunriseImage
  },
  {
    id: 2,
    title: "We Have a Problem",
    subtitle: "Sin separated us from God",
    content: "But something went wrong. Every one of us has sinned—we've all fallen short of God's perfect standard. Our sin creates a gap between us and God, a separation that we cannot bridge on our own, no matter how hard we try.",
    scripture: "For all have sinned, and come short of the glory of God.",
    reference: "Romans 3:23",
    icon: 'cross',
    gradient: 'from-slate-600 to-slate-800',
    image: stormCloudsImage
  },
  {
    id: 3,
    title: "God Made a Way",
    subtitle: "Jesus paid the price for you",
    content: "Here's the Good News: God didn't leave us hopeless! He sent His Son, Jesus Christ, to live a perfect life and die on the cross in our place. Jesus took the punishment we deserved. Three days later, He rose from the dead, conquering sin and death forever!",
    scripture: "But God commendeth his love toward us, in that, while we were yet sinners, Christ died for us.",
    reference: "Romans 5:8",
    icon: 'sparkles',
    gradient: 'from-amber-500 to-orange-600',
    image: woodenCrossImage
  },
  {
    id: 4,
    title: "Repentance & New Life",
    subtitle: "A changed heart, a transformed life",
    content: "True faith requires godly sorrow—a sincere recognition that our sin grieves God. Following Jesus means turning away from sin, not just feeling sorry. A genuine disciple's life is transformed. You cannot continue living in sin while claiming to follow Christ. The Good News is that God gives you His Holy Spirit to empower this transformation from the inside out!",
    scripture: "Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new.",
    reference: "2 Corinthians 5:17",
    icon: 'refresh',
    gradient: 'from-violet-500 to-purple-600',
    image: prayingHandsImage
  },
  {
    id: 5,
    title: "Your Response",
    subtitle: "It's your choice",
    content: "Salvation is a gift—you can't earn it or work for it. All you need to do is believe in Jesus, confess that you're a sinner in need of a Savior, repent and turn from your old ways, and invite Him into your life. When you do, everything changes. Your sins are forgiven, you become a child of God, and you receive eternal life.",
    scripture: "That if thou shalt confess with thy mouth the Lord Jesus, and shalt believe in thine heart that God hath raised him from the dead, thou shalt be saved.",
    reference: "Romans 10:9",
    icon: 'book',
    gradient: 'from-emerald-500 to-teal-600',
    image: worshipHandsImage
  }
];

interface GospelPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export default function GospelPage({ onNavigate }: GospelPageProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showDecision, setShowDecision] = useState(false);
  const [showPrayer, setShowPrayer] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [prayerStep, setPrayerStep] = useState(0);
  const [hasAccepted, setHasAccepted] = useState(() => 
    localStorage.getItem('hasAcceptedChrist') === 'true'
  );
  const { toast } = useToast();

  const prayerLines = [
    "Dear God,",
    "I know that I am a sinner and need Your forgiveness.",
    "I believe that Jesus Christ died for my sins and rose again.",
    "I want to turn from my sins and follow You.",
    "I invite Jesus into my heart and life as my Lord and Savior.",
    "Thank You for forgiving me and giving me eternal life.",
    "Help me to live for You from this day forward.",
    "In Jesus' name I pray, Amen."
  ];

  const nextStep = () => {
    if (currentStep < gospelSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowDecision(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleAcceptJesus = () => {
    setShowDecision(false);
    setShowPrayer(true);
    setPrayerStep(0);
    setHasAccepted(true);
  };

  const nextPrayerLine = () => {
    if (prayerStep < prayerLines.length - 1) {
      setPrayerStep(prev => prev + 1);
    } else {
      // Prayer complete!
      setShowPrayer(false);
      setShowCelebration(true);
      // Save decision date
      localStorage.setItem('salvationDate', new Date().toISOString());
      localStorage.setItem('hasAcceptedChrist', 'true');
    }
  };

  const handleShare = async () => {
    const shareText = "Today I made the most important decision of my life - I accepted Jesus Christ as my Lord and Savior! #NewLife #BornAgain";
    
    if (Capacitor.isNativePlatform()) {
      try {
        await Share.share({
          title: 'I Accepted Jesus!',
          text: shareText,
          dialogTitle: 'Share Your Decision'
        });
      } catch (e) {
        console.log('Share cancelled');
      }
    } else {
      if (navigator.share) {
        try {
          await navigator.share({ text: shareText });
        } catch (e) {
          console.log('Share cancelled');
        }
      } else {
        await navigator.clipboard.writeText(shareText);
        toast({
          title: "Copied to Clipboard",
          description: "Share your testimony with others!",
        });
      }
    }
  };

  const IconComponent = ({ icon }: { icon: string }) => {
    switch (icon) {
      case 'heart': return <Heart className="w-12 h-12" />;
      case 'cross': return <Cross className="w-12 h-12" />;
      case 'sparkles': return <Sparkles className="w-12 h-12" />;
      case 'refresh': return <RefreshCw className="w-12 h-12" />;
      case 'book': return <BookOpen className="w-12 h-12" />;
      default: return <Heart className="w-12 h-12" />;
    }
  };

  // Celebration confetti effect
  useEffect(() => {
    if (showCelebration) {
      const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
      const confettiCount = 100;
      
      for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
          const confetti = document.createElement('div');
          confetti.className = 'confetti';
          confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}vw;
            top: -10px;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            animation: confettiFall ${2 + Math.random() * 3}s linear forwards;
            z-index: 1000;
            pointer-events: none;
          `;
          document.body.appendChild(confetti);
          setTimeout(() => confetti.remove(), 5000);
        }, i * 30);
      }
    }
  }, [showCelebration]);

  // Main Gospel Presentation
  if (!showDecision && !showPrayer && !showCelebration) {
    const step = gospelSteps[currentStep];
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-lg border-b border-white/10">
          <div className="flex items-center justify-between p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate('home')}
              className="text-white hover:bg-white/10"
              data-testid="button-gospel-back"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-lg font-semibold">The Good News</h1>
            <div className="w-10" />
          </div>
          
          {/* Progress indicator */}
          <div className="flex gap-2 px-4 pb-3">
            {gospelSteps.map((_, idx) => (
              <div
                key={idx}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  idx <= currentStep ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="pb-32"
          >
            {/* Hero Image */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={step.image}
                alt={step.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-transparent to-slate-900" />
              
              {/* Icon overlay */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-2xl border-4 border-slate-900`}>
                  <IconComponent icon={step.icon} />
                </div>
              </div>
            </div>

            {/* Text content with padding for icon */}
            <div className="px-6 pt-14">
              {/* Step number */}
              <p className="text-center text-white/60 text-sm mb-2">
                Step {step.id} of {gospelSteps.length}
              </p>

              {/* Title */}
              <h2 className="text-3xl font-bold text-center mb-2">
                {step.title}
              </h2>
              
              <p className="text-white/70 text-center mb-6">
                {step.subtitle}
              </p>

              {/* Main content */}
              <p className="text-lg leading-relaxed text-white/90 mb-6">
                {step.content}
              </p>

              {/* Scripture */}
              <Card className="bg-white/10 border-white/20 p-6">
                <p className="text-lg italic text-white/90 mb-3 font-serif leading-relaxed">
                  "{step.scripture}"
                </p>
                <p className="text-right text-amber-400 font-medium">
                  — {step.reference}
                </p>
              </Card>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-900 via-slate-900 to-transparent">
          <div className="flex gap-4 max-w-md mx-auto">
            {currentStep > 0 && (
              <Button
                variant="outline"
                onClick={prevStep}
                className="flex-1 h-14 border-white/30 text-white hover:bg-white/10"
                data-testid="button-gospel-prev"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Back
              </Button>
            )}
            <Button
              onClick={nextStep}
              className={`flex-1 h-14 bg-gradient-to-r ${step.gradient} hover:opacity-90 text-white font-semibold`}
              data-testid="button-gospel-next"
            >
              {currentStep === gospelSteps.length - 1 ? 'Continue' : 'Next'}
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Decision Point
  if (showDecision) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-purple-900 text-white p-6 flex flex-col">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowDecision(false)}
          className="self-start text-white hover:bg-white/10 mb-8"
          data-testid="button-decision-back"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>

        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-2xl">
              <Cross className="w-10 h-10 text-white" />
            </div>

            {hasAccepted ? (
              <>
                <h2 className="text-3xl font-bold mb-4">
                  Welcome Back, Believer!
                </h2>
                
                <p className="text-xl text-white/80 mb-8">
                  You've already made the best decision of your life. Now let's keep growing together!
                </p>

                <div className="space-y-4">
                  <Button
                    onClick={() => onNavigate('newBeliever')}
                    className="w-full h-14 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold"
                    data-testid="button-continue-growing"
                  >
                    <ArrowRight className="w-5 h-5 mr-2" />
                    Continue Growing
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => onNavigate('discipleship-list')}
                    className="w-full h-14 border-white/40 text-white hover:bg-white/10"
                    data-testid="button-discipleship-plans"
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    Explore Discipleship Plans
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={() => onNavigate('home')}
                    className="w-full h-12 text-white/70 hover:text-white hover:bg-white/10"
                    data-testid="button-go-home"
                  >
                    <Home className="w-5 h-5 mr-2" />
                    Return Home
                  </Button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold mb-4">
                  The Question That Changes Everything
                </h2>
                
                <p className="text-xl text-white/80 mb-2">
                  Jesus is knocking at the door of your heart.
                </p>
                
                <p className="text-lg text-white/70 mb-8 italic">
                  "Behold, I stand at the door, and knock: if any man hear my voice, and open the door, I will come in to him."
                  <span className="block mt-2 text-amber-400 not-italic">— Revelation 3:20</span>
                </p>

                <p className="text-white/90 mb-10">
                  Would you like to open that door today and receive Jesus as your Lord and Savior?
                </p>

                <div className="space-y-4">
                  <Button
                    onClick={handleAcceptJesus}
                    className="w-full h-16 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-lg font-bold shadow-2xl"
                    data-testid="button-accept-jesus"
                  >
                    <Heart className="w-6 h-6 mr-3" />
                    Yes, I Want to Receive Jesus
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => {
                      localStorage.setItem('hasAcceptedChrist', 'true');
                      setHasAccepted(true);
                      toast({
                        title: "We're So Glad!",
                        description: "Keep growing in your faith with our discipleship plans!",
                      });
                      onNavigate('discipleship-list');
                    }}
                    className="w-full h-14 border-white/40 text-white hover:bg-white/10"
                    data-testid="button-already-believer"
                  >
                    <Check className="w-5 h-5 mr-2" />
                    I Already Know Jesus
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={() => {
                      setShowDecision(false);
                      setCurrentStep(0);
                    }}
                    className="w-full h-12 text-white/70 hover:text-white hover:bg-white/10"
                    data-testid="button-learn-more"
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    I Want to Learn More
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

  // Guided Prayer
  if (showPrayer) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-indigo-900 text-white p-6 flex flex-col">
        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-white/60 mb-6">
              Let's pray together. Read each line and make it your own prayer:
            </p>

            <div className="mb-8 space-y-4">
              {prayerLines.slice(0, prayerStep + 1).map((line, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-xl font-serif ${
                    idx === prayerStep ? 'text-amber-400' : 'text-white/60'
                  }`}
                >
                  {line}
                </motion.p>
              ))}
            </div>

            {/* Progress */}
            <div className="flex gap-1 justify-center mb-8">
              {prayerLines.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full ${
                    idx <= prayerStep ? 'bg-amber-400' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </motion.div>

          <Button
            onClick={nextPrayerLine}
            className="h-16 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-lg font-semibold"
            data-testid="button-prayer-continue"
          >
            {prayerStep === prayerLines.length - 1 ? (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Complete Prayer
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    );
  }

  // Celebration!
  if (showCelebration) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-800 to-teal-900 text-white p-6 flex flex-col">
        <style>{`
          @keyframes confettiFall {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
          }
        `}</style>
        
        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto text-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-2xl">
              <Sparkles className="w-12 h-12 text-white" />
            </div>

            <h1 className="text-4xl font-bold mb-4">
              Welcome to God's Family!
            </h1>
            
            <p className="text-xl text-white/90 mb-2">
              Heaven is rejoicing over you right now!
            </p>
            
            <p className="text-white/70 mb-8 italic">
              "I say unto you, there is joy in the presence of the angels of God over one sinner that repenteth."
              <span className="block mt-1 text-amber-400 not-italic text-sm">— Luke 15:10</span>
            </p>

            <Card className="bg-white/10 border-white/20 p-6 mb-8 text-left">
              <h3 className="font-bold text-lg mb-3 text-amber-400">What Just Happened?</h3>
              <ul className="space-y-2 text-white/90">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Your sins are completely forgiven</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>You've become a child of God</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>The Holy Spirit now lives in you</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>You have eternal life with God</span>
                </li>
              </ul>
            </Card>
          </motion.div>

          <div className="space-y-3">
            <Button
              onClick={handleShare}
              className="w-full h-14 bg-white/20 hover:bg-white/30 text-white"
              data-testid="button-share-decision"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share My Decision
            </Button>

            <Button
              onClick={() => onNavigate('newBeliever')}
              className="w-full h-14 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold"
              data-testid="button-whats-next"
            >
              What's Next for Me?
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <Button
              variant="ghost"
              onClick={() => onNavigate('home')}
              className="w-full h-12 text-white/70 hover:text-white hover:bg-white/10"
              data-testid="button-gospel-home"
            >
              <Home className="w-5 h-5 mr-2" />
              Return Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
