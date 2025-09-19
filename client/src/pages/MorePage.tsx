import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, User, Shield, FileText, Globe, Scale, HeadphonesIcon, ChevronRight, Heart, DollarSign, Flame, Facebook, Instagram, Share, Settings, Play, BookOpen, TrendingUp, Cross } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/lib/translations";
import mountainSunriseImage from '@assets/stock_images/powerful_majestic_mo_95a68c1b.jpg';

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
        <Card className="shadow-lg border-2 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-xl text-gray-800 text-center">{t.language}</h3>
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
              case 'giving': return 'from-green-50 to-emerald-50 bg-green-100 text-green-600';
              case 'videos': return 'from-purple-50 to-violet-50 bg-purple-100 text-purple-600';
              case 'blog': return 'from-orange-50 to-amber-50 bg-orange-100 text-orange-600';
              case 'settings': return 'from-blue-50 to-sky-50 bg-blue-100 text-blue-600';
              case 'friends': return 'from-pink-50 to-rose-50 bg-pink-100 text-pink-600';
              case 'privacy': return 'from-gray-50 to-slate-50 bg-gray-100 text-gray-600';
              case 'terms': return 'from-gray-50 to-slate-50 bg-gray-100 text-gray-600';
              case 'donate': return 'from-yellow-50 to-amber-50 bg-yellow-100 text-yellow-600';
              default: return 'from-gray-50 to-gray-50 bg-gray-100 text-gray-600';
            }
          };
          const colors = getItemColors(item.id);
          const [gradientColors, iconBg, iconColor] = colors.split(' ');
          
          return (
            <Card 
              key={item.id} 
              className={`cursor-pointer hover-elevate shadow-lg border-2 bg-gradient-to-r ${gradientColors}`}
              onClick={() => item.comingSoon ? null : onNavigate?.(item.id)}
              data-testid={`menu-${item.id}`}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between min-h-[50px]">
                  <div className="flex items-center gap-4">
                    <div className={`${iconBg} p-3 rounded-full`}>
                      <item.icon className={`w-6 h-6 ${iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                        {item.title}
                        {item.comingSoon && (
                          <span className="text-xs bg-white/80 text-gray-600 px-3 py-1 rounded-full font-medium">
                            {t.comingSoon}
                          </span>
                        )}
                      </h3>
                      <p className="text-base text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                  {!item.comingSoon && <ChevronRight className="w-6 h-6 text-gray-400" />}
                </div>
              </CardContent>
            </Card>
          )
        })}

        {/* Legal & Support Section */}
        <Card className="shadow-lg border-2 bg-gradient-to-r from-indigo-50 to-blue-50">
          <CardContent className="p-6">
            <h2 className="font-bold text-xl text-gray-800 mb-6 flex items-center justify-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <Scale className="w-6 h-6 text-indigo-600" />
              </div>
              {t.supportLegal}
            </h2>
            <div className="space-y-4">
              <Button 
                variant="secondary"
                size="lg"
                className="w-full justify-between bg-white/80 hover:bg-white text-gray-800 border-white/50"
                onClick={() => onNavigate?.('support')}
                data-testid="button-support"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-indigo-100 p-2 rounded-full">
                    <HeadphonesIcon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <span className="font-medium text-gray-800 text-lg">{t.supportPrivacyRights}</span>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-400" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* App Info */}
        <Card className="mt-8 shadow-lg border-2 bg-gradient-to-r from-amber-50 to-orange-50">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="font-bold text-2xl text-gray-800 mb-3">
              The Gospel in 5 Minutes™
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed mb-2">
              {t.appTagline}
            </p>
            <p className="text-sm text-gray-500 font-medium">
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