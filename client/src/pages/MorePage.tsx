import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, User, Shield, FileText, Globe, Scale, HeadphonesIcon, ChevronRight, Heart, DollarSign, Flame, Facebook, Instagram, Share, Settings, Play, BookOpen, TrendingUp, Cross } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/lib/translations";
import mountainSunriseImage from '@assets/stock_images/powerful_majestic_mo_95a68c1b.jpg';
import givingHandsImage from '@assets/generated_images/Peaceful_giving_hands_spiritual_77b7a27e.png';

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

const getMenuItems = (t: any) => [
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
    id: "settings",
    title: t.settings,
    description: t.settingsDesc,
    icon: Settings,
    comingSoon: false
  },
  {
    id: "friends",
    title: t.friends,
    description: t.friendsDesc,
    icon: Users,
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
  },
  {
    id: "donate",
    title: t.donate,
    description: t.donateDesc,
    icon: DollarSign,
    comingSoon: false
  }
];

export default function MorePage({ language, onLanguageChange, onNavigate, streakDays = 0 }: MorePageProps) {
  const t = useTranslations(language);
  const menuItems = getMenuItems(t);
  
  const handleMenuClick = (id: string) => {
    console.log(`Menu item clicked: ${id}`);
    // Navigate to the selected page if it's not coming soon
    if (!menuItems.find(item => item.id === id)?.comingSoon) {
      onNavigate?.(id);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header Section - Same style as HomePage */}
      <div className="bg-white px-4 py-6 border-b border-gray-100 ios-safe-top">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold" style={{ 
              color: '#8B4513',
              fontFamily: 'Dancing Script, Brush Script MT, cursive',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
            }} data-testid="text-title-more-features">
              More Features
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center gap-1">
              <Flame className="w-6 h-6 text-red-600 fill-red-600" />
              <span className="text-lg font-bold text-red-600" data-testid="text-streak-count">{streakDays}</span>
            </div>
          </div>
        </div>
        
        {/* App Title */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-3" style={{ 
            fontFamily: 'Dancing Script, Brush Script MT, cursive',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
            color: '#8B4513'
          }}>
            The Gospel in 5 Minutes™
          </h2>
        </div>
        
        {/* Social Media Buttons */}
        <div className="flex justify-center items-center gap-3 mt-4 mb-3">
          <Button asChild variant="default" size="sm" data-testid="button-facebook-more">
            <a 
              href="https://www.facebook.com/TheGospelIn5Minutes" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-600 text-white hover:bg-blue-700"
              aria-label="Follow us on Facebook - Opens in new window"
            >
              <Facebook className="w-3 h-3 mr-1" aria-hidden="true" />
              <span>{t.follow}</span>
            </a>
          </Button>
          <Button asChild variant="default" size="sm" data-testid="button-instagram-more">
            <a 
              href="https://www.instagram.com/thegospelin5minutes" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white"
              aria-label="Follow us on Instagram - Opens in new window"
            >
              <Instagram className="w-3 h-3 mr-1" aria-hidden="true" />
              <span>{t.follow}</span>
            </a>
          </Button>
          <Button 
            variant="default"
            size="sm"
            className="bg-amber-600 text-white"
            data-testid="button-donate-more"
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
            variant="default"
            size="sm"
            className="bg-amber-700 text-white"
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
            <Share className="w-3 h-3 mr-1" aria-hidden="true" />
            {t.share}
          </Button>
        </div>
      </div>

      <div className="max-w-md mx-auto space-y-4">
        {/* Language Selector */}
        <Card className={`
          relative bg-gradient-to-br from-blue-50 to-indigo-50 
          border-4 border-blue-200 
          transition-all duration-300 
          shadow-lg hover:shadow-xl 
          before:absolute before:inset-0 before:rounded-lg 
          before:bg-gradient-to-br before:from-white/30 before:to-transparent 
          before:pointer-events-none
          ring-2 ring-white/40 ring-inset
          outline outline-2 outline-gray-400/30 outline-offset-2
          backdrop-blur-sm
        `}>
          <CardContent className="relative p-4 z-10">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg border-2 border-white/60 ring-1 ring-gray-200/50">
                <Globe className="w-5 h-5 text-blue-600 stroke-[1.5]" />
              </div>
              <h3 className="font-bold text-lg text-gray-800 text-center">{t.language}</h3>
            </div>
            <Select value={language} onValueChange={onLanguageChange}>
              <SelectTrigger data-testid="select-language">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map(lang => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <span className="flex items-center gap-2">
                      <span>{lang.name}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Menu Items */}
        {menuItems.map((item) => {
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
          
          // Special layout for giving tile with background image
          if (item.id === 'giving') {
            return (
              <Card 
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-stone-200 cursor-pointer transition-all duration-300 hover:shadow-xl"
                onClick={() => item.comingSoon ? null : onNavigate?.(item.id)}
                data-testid={`menu-${item.id}`}
              >
                <div className="relative h-32">
                  <img 
                    src={givingHandsImage}
                    alt="Giving Impact"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-600/20 to-transparent" />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between min-h-[40px]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center shadow-lg border-2 border-stone-200/60 ring-1 ring-stone-300/50">
                        <item.icon className="w-5 h-5 text-stone-700 stroke-[1.5]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-base text-gray-800 flex items-center gap-2">
                          {item.title}
                          {item.comingSoon && (
                            <span className="text-xs bg-stone-100 text-stone-600 px-2 py-1 rounded-full font-medium shadow-sm">
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
          shadow-lg hover:shadow-xl 
          before:absolute before:inset-0 before:rounded-lg 
          before:bg-gradient-to-br before:from-white/30 before:to-transparent 
          before:pointer-events-none
          ring-2 ring-white/40 ring-inset
          outline outline-2 outline-gray-400/30 outline-offset-2
          backdrop-blur-sm
        `}>
          <CardContent className="relative p-4 z-10">
            <h2 className="font-bold text-lg text-gray-800 mb-4 flex items-center justify-center gap-2">
              <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg border-2 border-white/60 ring-1 ring-gray-200/50">
                <Scale className="w-5 h-5 text-indigo-600 stroke-[1.5]" />
              </div>
              {t.supportLegal}
            </h2>
            <div className="space-y-4">
              <Button 
                variant="secondary"
                size="default"
                className="w-full justify-between bg-white/80 hover:bg-white text-gray-800 border-white/50"
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
          mt-8 relative bg-gradient-to-br from-amber-50 to-orange-50 
          border-4 border-amber-200 
          transition-all duration-300 
          shadow-lg hover:shadow-xl 
          before:absolute before:inset-0 before:rounded-lg 
          before:bg-gradient-to-br before:from-white/30 before:to-transparent 
          before:pointer-events-none
          ring-2 ring-white/40 ring-inset
          outline outline-2 outline-gray-400/30 outline-offset-2
          backdrop-blur-sm
        `}>
          <CardContent className="relative p-5 text-center z-10">
            <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg border-2 border-white/60 ring-1 ring-gray-200/50">
              <Heart className="w-6 h-6 text-amber-600 stroke-[1.5]" />
            </div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">
              The Gospel in 5 Minutes™
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed mb-1">
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