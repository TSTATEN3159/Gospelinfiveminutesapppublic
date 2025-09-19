import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, User, Shield, FileText, Globe, Scale, HeadphonesIcon, ChevronRight, Heart, DollarSign, Flame, Facebook, Instagram, Share, Settings, Play, BookOpen, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/lib/translations";

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
    <div className="pb-20 px-4 py-6 bg-background min-h-screen">
      <div className="mb-8">
        {/* Page Title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="text-title-more-features">
            More Features
          </h1>
          <p className="text-muted-foreground text-lg">{t.settingsDescription}</p>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center gap-1">
              <Flame className="w-6 h-6 text-destructive fill-destructive" />
              <span className="text-lg font-bold text-destructive" data-testid="text-streak-count">{streakDays}</span>
            </div>
          </div>
        </div>
        
        {/* Social Media Buttons */}
        <div className="flex justify-center items-center gap-3 mt-4 mb-3">
          <Button asChild variant="default" size="sm" data-testid="button-facebook-more">
            <a 
              href="https://www.facebook.com/TheGospelIn5Minutes" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Follow us on Facebook - Opens in new window"
            >
              <Facebook className="w-3 h-3 mr-1" aria-hidden="true" />
              <span>{t.follow}</span>
            </a>
          </Button>
          <Button asChild variant="secondary" size="sm" data-testid="button-instagram-more">
            <a 
              href="https://www.instagram.com/thegospelin5minutes" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Follow us on Instagram - Opens in new window"
            >
              <Instagram className="w-3 h-3 mr-1" aria-hidden="true" />
              <span>{t.follow}</span>
            </a>
          </Button>
          <Button 
            variant="default"
            size="sm"
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
            variant="secondary"
            size="sm"
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
        <Card className="shadow-lg border-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Globe className="w-6 h-6 text-primary" />
              <h3 className="font-bold text-xl text-foreground text-center">{t.language}</h3>
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
        {menuItems.map((item) => (
          <Card 
            key={item.id} 
            className="cursor-pointer hover-elevate shadow-lg border-2" 
            onClick={() => item.comingSoon ? null : onNavigate?.(item.id)}
            data-testid={`menu-${item.id}`}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between min-h-[50px]">
                <div className="flex items-center gap-4">
                  <div className="bg-muted p-3 rounded-full">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                      {item.title}
                      {item.comingSoon && (
                        <span className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full font-medium">
                          {t.comingSoon}
                        </span>
                      )}
                    </h3>
                    <p className="text-base text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
                {!item.comingSoon && <ChevronRight className="w-6 h-6 text-muted-foreground" />}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Legal & Support Section */}
        <Card className="shadow-lg border-2">
          <CardContent className="p-6">
            <h2 className="font-bold text-xl text-foreground mb-6 flex items-center justify-center gap-3">
              <Scale className="w-6 h-6 text-primary" />
              {t.supportLegal}
            </h2>
            <div className="space-y-4">
              <Button 
                variant="secondary"
                size="lg"
                className="w-full justify-between"
                onClick={() => onNavigate?.('support')}
                data-testid="button-support"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-muted p-2 rounded-full">
                    <HeadphonesIcon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium text-foreground text-lg">{t.supportPrivacyRights}</span>
                </div>
                <ChevronRight className="w-6 h-6 text-muted-foreground" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* App Info */}
        <Card className="mt-8 shadow-lg border-2">
          <CardContent className="p-8 text-center">
            <h3 className="font-bold text-2xl text-foreground mb-3">
              The Gospel in 5 Minutes™
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-2">
              {t.appTagline}
            </p>
            <p className="text-sm text-muted-foreground font-medium">
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