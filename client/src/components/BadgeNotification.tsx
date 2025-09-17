import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy, Star, Crown, Heart, Flame, Award, Sparkles } from "lucide-react";

interface BadgeNotificationProps {
  isOpen: boolean;
  onClose: () => void;
  badgeType: string;
  streakDays: number;
}

export default function BadgeNotification({ isOpen, onClose, badgeType, streakDays }: BadgeNotificationProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      // Auto-hide confetti after animation
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const getBadgeIcon = () => {
    switch (badgeType) {
      case "Saint": return <Crown className="w-16 h-16 text-yellow-500" />;
      case "Devoted": return <Award className="w-16 h-16 text-purple-500" />;
      case "Faithful": return <Trophy className="w-16 h-16 text-blue-500" />;
      case "Committed": return <Star className="w-16 h-16 text-green-500" />;
      case "Steadfast": return <Heart className="w-16 h-16 text-red-500" />;
      case "Consistent": return <Flame className="w-16 h-16 text-orange-500" />;
      case "Beginner": return <Trophy className="w-16 h-16 text-gray-500" />;
      default: return <Trophy className="w-16 h-16 text-primary" />;
    }
  };

  const getBadgeMessage = () => {
    switch (badgeType) {
      case "Saint": return "You are a true saint! 365 days of devotion!";
      case "Devoted": return "Incredibly devoted! 100 days of faith!";
      case "Faithful": return "Faithful servant! 60 days strong!";
      case "Committed": return "Committed believer! 30 days of dedication!";
      case "Steadfast": return "Steadfast in faith! 14 days consecutively!";
      case "Consistent": return "Consistent seeker! A full week complete!";
      case "Beginner": return "Great start! 3 days of spiritual growth!";
      default: return "Badge earned for your dedication!";
    }
  };

  const getBadgeColor = () => {
    switch (badgeType) {
      case "Saint": return "from-yellow-400 to-orange-400";
      case "Devoted": return "from-purple-400 to-pink-400";
      case "Faithful": return "from-blue-400 to-indigo-400";
      case "Committed": return "from-green-400 to-emerald-400";
      case "Steadfast": return "from-red-400 to-rose-400";
      case "Consistent": return "from-orange-400 to-yellow-400";
      case "Beginner": return "from-gray-400 to-slate-400";
      default: return "from-primary to-accent";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm text-center">
        <DialogHeader>
          <DialogTitle className="sr-only">
            {badgeType} Badge Earned
          </DialogTitle>
        </DialogHeader>
        <div className={`relative p-6 rounded-lg bg-gradient-to-br ${getBadgeColor()}`}>
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="animate-bounce absolute top-2 left-4 text-yellow-400">
                <Star className="w-4 h-4" />
              </div>
              <div className="animate-bounce absolute top-4 right-6 text-yellow-400" style={{ animationDelay: '0.2s' }}>
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="animate-bounce absolute bottom-4 left-6 text-yellow-400" style={{ animationDelay: '0.4s' }}>
                <Star className="w-3 h-3" />
              </div>
              <div className="animate-bounce absolute bottom-2 right-4 text-yellow-400" style={{ animationDelay: '0.6s' }}>
                <Sparkles className="w-3 h-3" />
              </div>
            </div>
          )}
          <div className="relative">
            <div className="flex justify-center mb-4">
              {getBadgeIcon()}
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {badgeType} Badge Earned!
            </h2>
            <p className="text-white/90 mb-4">
              {getBadgeMessage()}
            </p>
            <div className="text-3xl font-bold text-white mb-4">
              {streakDays} Days
            </div>
          </div>
        </div>
        <Button 
          onClick={onClose} 
          className="mt-4" 
          data-testid="button-badge-close"
        >
          Continue Journey
        </Button>
      </DialogContent>
    </Dialog>
  );
}