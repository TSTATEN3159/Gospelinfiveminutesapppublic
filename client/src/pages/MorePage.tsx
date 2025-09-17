import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, User, Shield, FileText, Globe, Scale, HeadphonesIcon, ChevronRight } from "lucide-react";

interface MorePageProps {
  language: string;
  onLanguageChange: (language: string) => void;
  onNavigate?: (page: string) => void;
}

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
];

const menuItems = [
  {
    id: "friends",
    title: "Friends",
    description: "Connect with fellow believers",
    icon: Users,
    comingSoon: true
  },
  {
    id: "profile",
    title: "Profile",
    description: "Manage your account settings",
    icon: User,
    comingSoon: true
  },
  {
    id: "privacy",
    title: "Privacy Statement",
    description: "Learn how we protect your data",
    icon: Shield,
    comingSoon: false
  },
  {
    id: "terms",
    title: "End User Agreement",
    description: "Terms and conditions of use",
    icon: FileText,
    comingSoon: false
  }
];

export default function MorePage({ language, onLanguageChange, onNavigate }: MorePageProps) {
  const handleMenuClick = (id: string) => {
    console.log(`Menu item clicked: ${id}`);
    // todo: implement navigation to each section
  };

  return (
    <div className="pb-20 px-4 py-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-primary">More</h1>
        <p className="text-muted-foreground mt-2">Settings and additional features</p>
      </div>

      <div className="max-w-md mx-auto space-y-4">
        {/* Language Selector */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Globe className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-primary">Language</h3>
            </div>
            <Select value={language} onValueChange={onLanguageChange}>
              <SelectTrigger data-testid="select-language">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map(lang => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <span className="flex items-center gap-2">
                      <span>{lang.flag}</span>
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
            className="cursor-pointer hover-elevate" 
            onClick={() => item.comingSoon ? null : onNavigate?.(item.id)}
            data-testid={`menu-${item.id}`}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between min-h-[44px]">
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-primary flex items-center gap-2">
                      {item.title}
                      {item.comingSoon && (
                        <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded">
                          Coming Soon
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
                {!item.comingSoon && <ChevronRight className="w-5 h-5 text-gray-400" />}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Legal & Support Section */}
        <Card>
          <CardContent className="p-4">
            <h2 className="font-semibold text-primary mb-4 flex items-center gap-2">
              <Scale className="w-5 h-5" />
              Support & Legal
            </h2>
            <div className="space-y-3">
              <button 
                className="w-full flex items-center justify-between p-3 rounded-lg hover-elevate transition-all duration-200 min-h-[44px]" 
                onClick={() => onNavigate?.('support')}
                data-testid="button-support"
              >
                <div className="flex items-center gap-3">
                  <HeadphonesIcon className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-800">Support & Privacy Rights</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* App Info */}
        <Card className="mt-8">
          <CardContent className="p-4 text-center">
            <h3 className="font-bold text-primary text-lg" style={{ fontFamily: 'var(--font-cursive)' }}>
              The Gospel in 5 Minutes
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Bringing God's word to the world
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Version 1.0.0
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}