import { Home, Book, Search, Calendar, MoreHorizontal, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

type NavPage = "home" | "ask" | "search" | "daily" | "more";

interface BottomNavigationProps {
  currentPage: NavPage;
  onPageChange: (page: NavPage) => void;
}

export default function BottomNavigation({ currentPage, onPageChange }: BottomNavigationProps) {
  const navItems = [
    { id: "home" as const, icon: Home, label: "Home", isPremium: false },
    { id: "ask" as const, icon: Book, label: "Ask", isPremium: true },
    { id: "search" as const, icon: Search, label: "Search", isPremium: false },
    { id: "daily" as const, icon: Calendar, label: "Daily", isPremium: false },
    { id: "more" as const, icon: MoreHorizontal, label: "More", isPremium: false },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-border z-50">
      <div className="flex justify-around items-center py-2 px-4 max-w-md mx-auto">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant={currentPage === item.id ? "default" : "ghost"}
            size="sm"
            onClick={() => onPageChange(item.id)}
            className="flex flex-col items-center gap-1 h-auto py-2 px-3 relative"
            data-testid={`nav-${item.id}`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-xs flex items-center gap-0.5">
              {item.label}
              {item.isPremium && (
                <Crown className="w-2.5 h-2.5 text-amber-500" />
              )}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
}