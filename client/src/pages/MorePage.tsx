import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, User, Shield, FileText, Globe, Scale, HeadphonesIcon, ChevronRight, Heart, DollarSign, Flame, Facebook, Instagram, Share, Settings, Play, BookOpen, TrendingUp, Cross, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/lib/translations";
import { Capacitor } from '@capacitor/core';
import givingHandsImage from '@assets/generated_images/Peaceful_giving_hands_spiritual_77b7a27e.png';
import mountainTopImage from '@assets/generated_images/Vibrant_mountain_top_vista_d60cfc2f.png';
import holyBibleImage from '@assets/generated_images/Holy_Bible_peaceful_scripture_f5e43a22.png';
import blogWritingImage from '@assets/generated_images/Christian_blog_writing_peaceful_d5bc4ecc.png';
import friendsFellowship from '@assets/generated_images/Spiritual_friends_community_fellowship_c29d9bfe.png';
import donateImage from '@assets/generated_images/Peaceful_donation_charitable_giving_84a34ad2.png';

interface MorePageProps {
  language: string;
  onLanguageChange: (language: string) => void;
  onNavigate?: (page: string) => void;
  streakDays?: number;
}

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "pt", name: "Português" },
  { code: "zh", name: "中文" },
  { code: "ar", name: "العربية" },
  { code: "hi", name: "हिन्दी" },
];

const getMainMenuItems = (t: any, isIOS = false) => {
  const items = [
    {
      id: "savedverses",
      title: "Saved Verses",
      description: "View your bookmarked scripture passages",
      icon: BookmarkCheck,
      comingSoon: false
    },
    {
      id: "donate",
      title: t.donate,
      description: isIOS ? t.donateDescApplePay || "Support our mission via Apple Pay" : t.donateDesc,
      icon: Heart,
      comingSoon: false
    },
  {
    id: "giving",
    title: t.givingImpact,
    description: t.givingImpactDesc,
    icon: TrendingUp,
    comingSoon: false
  },
  {
    id: "videos",
    title: t.faithVideos,
    description: t.faithVideosDesc,
    icon: Play,
    comingSoon: false
  },
  {
    id: "blog",
    title: t.christianBlog,
    description: t.christianBlogDesc,
    icon: BookOpen,
    comingSoon: false
    },
    {
      id: "friends",
      title: t.friends,
      description: t.friendsDesc,
      icon: Users,
      comingSoon: false
    }
  ];
  
  // Apple Pay now enabled - all items available on iOS
  return items;
};

const getSettingsMenuItems = (t: any) => [
  {
    id: "settings",
    title: t.settings,
    description: t.settingsDesc,
    icon: Settings,
    comingSoon: false
  },
  {
    id: "privacy",
    title: t.privacyStatement,
    description: t.privacyStatementDesc,
    icon: Shield,
    comingSoon: false
  },
  {
    id: "terms",
    title: t.endUserAgreement,
    description: t.endUserAgreementDesc,
    icon: FileText,
    comingSoon: false
  }
];

export default function MorePage({ language, onLanguageChange, onNavigate, streakDays = 0 }: MorePageProps) {
  const t = useTranslations(language);
  
  // iOS platform detection for Apple Store compliance
  const isIOS = Capacitor.getPlatform() === 'ios';
  
  const mainMenuItems = getMainMenuItems(t, isIOS);
  const settingsMenuItems = getSettingsMenuItems(t);
  
  const handleMenuClick = (id: string) => {
    console.log(`Menu item clicked: ${id}`);
    // Navigate to the selected page if it's not coming soon
    const allItems = [...mainMenuItems, ...settingsMenuItems];
    if (!allItems.find(item => item.id === id)?.comingSoon) {
      onNavigate?.(id);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Professional Marketing Header */}
      <div className="bg-gradient-to-b from-white via-gray-50/30 to-white px-4 py-6 border-b border-gray-200 ios-safe-top">
        {/* Top Row: Title + Streak Badge */}
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-lg font-medium text-gray-700" data-testid="text-title-more-features">
            More Features
          </h1>
          <div className="flex items-center gap-1.5 bg-gradient-to-br from-red-50 to-red-100/70 px-2.5 py-1 rounded-full border border-red-200/50 shadow-sm">
            <Flame className="w-4 h-4 text-red-600 fill-red-600" />
            <span className="text-sm font-bold text-red-700" data-testid="text-streak-count">{streakDays}</span>
          </div>
        </div>
        
        {/* App Title - Larger & Prominent */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-amber-900 tracking-tight" style={{ 
            fontFamily: 'Dancing Script, Brush Script MT, cursive'
          }}>
            The Gospel in 5 Minutes™
          </h2>
        </div>
        
        {/* Action Buttons - Refined & Professional */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {/* Smaller Social Buttons */}
          <a 
            href="https://www.facebook.com/TheGospelIn5Minutes" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1.5 rounded-md text-xs font-medium shadow-sm hover:shadow-md transition-all ios-tap-target"
            data-testid="button-facebook-more"
            aria-label="Follow us on Facebook - Opens in new window"
          >
            <Facebook className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t.follow}</span>
          </a>
          <a 
            href="https://www.instagram.com/thegospelinfiveminutes/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-2.5 py-1.5 rounded-md text-xs font-medium shadow-sm hover:shadow-md transition-all ios-tap-target"
            data-testid="button-instagram-more"
            aria-label="Follow us on Instagram - Opens in new window"
          >
            <Instagram className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t.follow}</span>
          </a>
          
          {/* Donate Button (Hidden on iOS for App Store compliance) */}
          {!isIOS && (
            <Button 
              className="flex items-center gap-1 bg-amber-600 hover:bg-amber-700 text-white px-2.5 py-1.5 rounded-md text-xs font-medium shadow-sm hover:shadow-md transition-all"
              data-testid="button-donate-more"
              aria-label="Donate to help spread the Gospel"
              onClick={() => onNavigate?.('donate')}
            >
              <Heart className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Donate</span>
            </Button>
          )}
          
          {/* Share Button - Professional Green */}
          <Button 
            className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1.5 rounded-md text-xs font-medium shadow-sm hover:shadow-md transition-all"
            data-testid="button-share-more"
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
            <Share className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t.share}</span>
          </Button>
        </div>
      </div>

      <div className="max-w-sm mx-auto space-y-3 px-4">
        {/* Language Selector */}
        <Card className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-blue-200 hover-elevate">
          <div className="relative h-24">
            <img 
              src={mountainTopImage}
              alt="Language Selection"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 via-blue-600/20 to-transparent" />
          </div>
          <CardContent className="p-4">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shadow-md border-2 border-blue-200/60">
                <Globe className="w-4 h-4 text-blue-700" />
              </div>
              <h3 className="font-bold text-base text-gray-800">{t.language}</h3>
            </div>
            <Select value={language} onValueChange={onLanguageChange}>
              <SelectTrigger data-testid="select-language">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map(lang => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Main Menu Items */}
        {mainMenuItems.map((item) => {
          const getItemColors = (id: string) => {
            switch(id) {
              case 'giving': return {
                gradient: 'from-stone-50 to-amber-50',
                borderColor: 'border-stone-200',
                iconColor: 'text-stone-600'
              };
              case 'videos': return {
                gradient: 'from-purple-50 to-violet-50',
                borderColor: 'border-purple-200',
                iconColor: 'text-purple-600'
              };
              case 'blog': return {
                gradient: 'from-orange-50 to-amber-50',
                borderColor: 'border-orange-200',
                iconColor: 'text-orange-600'
              };
              case 'settings': return {
                gradient: 'from-blue-50 to-sky-50',
                borderColor: 'border-blue-200',
                iconColor: 'text-blue-600'
              };
              case 'friends': return {
                gradient: 'from-pink-50 to-rose-50',
                borderColor: 'border-pink-200',
                iconColor: 'text-pink-600'
              };
              case 'donate': return {
                gradient: 'from-amber-50 to-orange-50',
                borderColor: 'border-amber-200',
                iconColor: 'text-amber-600'
              };
              default: return {
                gradient: 'from-indigo-50 to-blue-50',
                borderColor: 'border-indigo-200',
                iconColor: 'text-indigo-600'
              };
            }
          };
          const colors = getItemColors(item.id);
          
          // Get background image and overlay colors for each tile
          const getTileImage = (id: string) => {
            switch(id) {
              case 'savedverses': return { image: holyBibleImage, overlay: 'from-blue-900/70 via-blue-600/20', border: 'border-blue-200', iconBg: 'bg-blue-100', iconBorder: 'border-blue-200/60', iconRing: 'ring-blue-300/50', iconColor: 'text-blue-700' };
              case 'giving': return { image: givingHandsImage, overlay: 'from-stone-900/70 via-stone-600/20', border: 'border-stone-200', iconBg: 'bg-stone-100', iconBorder: 'border-stone-200/60', iconRing: 'ring-stone-300/50', iconColor: 'text-stone-700' };
              case 'videos': return { image: holyBibleImage, overlay: 'from-purple-900/70 via-purple-600/20', border: 'border-purple-200', iconBg: 'bg-purple-100', iconBorder: 'border-purple-200/60', iconRing: 'ring-purple-300/50', iconColor: 'text-purple-700' };
              case 'blog': return { image: blogWritingImage, overlay: 'from-orange-900/70 via-orange-600/20', border: 'border-orange-200', iconBg: 'bg-orange-100', iconBorder: 'border-orange-200/60', iconRing: 'ring-orange-300/50', iconColor: 'text-orange-700' };
              case 'donate': return { image: donateImage, overlay: 'from-amber-900/70 via-amber-600/20', border: 'border-amber-200', iconBg: 'bg-amber-100', iconBorder: 'border-amber-200/60', iconRing: 'ring-amber-300/50', iconColor: 'text-amber-700' };
              case 'friends': return { image: friendsFellowship, overlay: 'from-pink-900/70 via-pink-600/20', border: 'border-pink-200', iconBg: 'bg-pink-100', iconBorder: 'border-pink-200/60', iconRing: 'ring-pink-300/50', iconColor: 'text-pink-700' };
              default: return null;
            }
          };
          
          const tileImage = getTileImage(item.id);
          
          // Special layout for tiles with background images
          if (tileImage) {
            return (
              <Card 
                key={item.id}
                className={`bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border-2 ${tileImage.border} cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 ring-4 ring-white/50 hover:ring-white/70 backdrop-blur-sm`}
                onClick={() => item.comingSoon ? null : handleMenuClick(item.id)}
                data-testid={`menu-${item.id}`}
              >
                <div className="relative h-24">
                  <img 
                    src={tileImage.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${tileImage.overlay} to-transparent`} />
                </div>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between min-h-[32px]">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 ${tileImage.iconBg} rounded-full flex items-center justify-center shadow-lg border-2 ${tileImage.iconBorder} ring-1 ${tileImage.iconRing}`}>
                        <item.icon className={`w-4 h-4 ${tileImage.iconColor} stroke-[1.5]`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-sm text-gray-800 flex items-center gap-1">
                          {item.title}
                          {item.comingSoon && (
                            <span className={`text-xs ${tileImage.iconBg} text-gray-600 px-2 py-1 rounded-full font-medium shadow-sm`}>
                              {t.comingSoon}
                            </span>
                          )}
                        </h3>
                        <p className="text-xs text-gray-700 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                    {!item.comingSoon && <ChevronRight className="w-4 h-4 text-gray-500" />}
                  </div>
                </CardContent>
              </Card>
            );
          }
          
          // Regular tile layout for other items
          return (
            <Card 
              key={item.id} 
              className={`
                relative bg-gradient-to-br ${colors.gradient} 
                border-4 ${colors.borderColor} 
                hover-elevate cursor-pointer 
                transition-all duration-300 
                shadow-lg hover:shadow-xl 
                before:absolute before:inset-0 before:rounded-lg 
                before:bg-gradient-to-br before:from-white/30 before:to-transparent 
                before:pointer-events-none
                ring-2 ring-white/40 ring-inset
                outline outline-2 outline-gray-400/30 outline-offset-2
                backdrop-blur-sm
                transform hover:scale-[1.02]
                ${item.comingSoon ? 'opacity-70' : ''}
              `}
              onClick={() => item.comingSoon ? null : onNavigate?.(item.id)}
              data-testid={`menu-${item.id}`}
            >
              <CardContent className="relative p-4 z-10">
                <div className="flex items-center justify-between min-h-[40px]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg border-2 border-white/60 ring-1 ring-gray-200/50">
                      <item.icon className={`w-5 h-5 ${colors.iconColor} stroke-[1.5]`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-base text-gray-800 flex items-center gap-2">
                        {item.title}
                        {item.comingSoon && (
                          <span className="text-xs bg-white/90 text-gray-600 px-2 py-1 rounded-full font-medium shadow-sm">
                            {t.comingSoon}
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-gray-700 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                  {!item.comingSoon && <ChevronRight className="w-5 h-5 text-gray-500" />}
                </div>
              </CardContent>
            </Card>
          )
        })}

        {/* Legal & Support Section */}
        <Card className={`
          relative bg-gradient-to-br from-indigo-50 to-blue-50 
          border-4 border-indigo-200 
          transition-all duration-300 
          shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] 
          before:absolute before:inset-0 before:rounded-lg 
          before:bg-gradient-to-br before:from-white/30 before:to-transparent 
          before:pointer-events-none
          ring-4 ring-white/40 ring-inset hover:ring-white/60
          outline outline-2 outline-gray-400/30 outline-offset-2
          backdrop-blur-sm transform hover:scale-[1.01] hover:-translate-y-0.5
        `}>
          <CardContent className="relative p-3 z-10">
            <h2 className="font-bold text-base text-gray-800 mb-3 flex items-center justify-center gap-2">
              <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-lg border-2 border-white/60 ring-1 ring-gray-200/50">
                <Scale className="w-4 h-4 text-indigo-600 stroke-[1.5]" />
              </div>
              {t.supportLegal}
            </h2>
            <div className="space-y-4">
              <Button 
                variant="ghost"
                size="default"
                className="w-full justify-between bg-white/80 hover:bg-white text-gray-800 border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-0.5 ring-2 ring-indigo-200/50 hover:ring-indigo-300/70"
                onClick={() => onNavigate?.('support')}
                data-testid="button-support"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-100 p-2 rounded-full">
                    <HeadphonesIcon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <span className="font-medium text-gray-800 text-base">{t.supportPrivacyRights}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* App Info */}
        <Card className={`
          mt-6 relative bg-gradient-to-br from-amber-50 to-orange-50 
          border-4 border-amber-200 
          transition-all duration-300 
          shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] 
          before:absolute before:inset-0 before:rounded-lg 
          before:bg-gradient-to-br before:from-white/30 before:to-transparent 
          before:pointer-events-none
          ring-4 ring-white/40 ring-inset hover:ring-white/60
          outline outline-2 outline-gray-400/30 outline-offset-2
          backdrop-blur-sm transform hover:scale-[1.01] hover:-translate-y-0.5
        `}>
          <CardContent className="relative p-4 text-center z-10">
            <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg border-2 border-white/60 ring-1 ring-gray-200/50">
              <Heart className="w-5 h-5 text-amber-600 stroke-[1.5]" />
            </div>
            <h3 className="font-bold text-base text-gray-800 mb-1">
              The Gospel in 5 Minutes™
            </h3>
            <p className="text-xs text-gray-700 leading-relaxed mb-1">
              {t.appTagline}
            </p>
            <p className="text-xs text-gray-600 font-medium">
              {t.version}
            </p>
          </CardContent>
        </Card>
        
        {/* Professional Website Footer */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">{t.visitWebsite}</p>
            <a 
              href="https://www.thegospelin5minutes.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary text-sm font-medium transition-colors duration-200"
              data-testid="link-website-footer-more"
              aria-label="Visit The Gospel in 5 Minutes website - Opens in new window"
            >
              www.thegospelin5minutes.org
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}