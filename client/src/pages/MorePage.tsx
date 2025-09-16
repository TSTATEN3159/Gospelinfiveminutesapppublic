import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, User, Shield, FileText, Globe } from "lucide-react";

interface MorePageProps {
  language: string;
  onLanguageChange: (language: string) => void;
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

export default function MorePage({ language, onLanguageChange }: MorePageProps) {
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
            onClick={() => handleMenuClick(item.id)}
            data-testid={`menu-${item.id}`}
          >
            <CardContent className="p-4">
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
            </CardContent>
          </Card>
        ))}

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