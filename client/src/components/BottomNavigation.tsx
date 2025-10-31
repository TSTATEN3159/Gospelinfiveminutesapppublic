import { Home, Book, Search, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

type NavPage = "home" | "ask" | "search" | "more";

interface BottomNavigationProps {
  currentPage: NavPage;
  onPageChange: (page: NavPage) => void;
}

export default function BottomNavigation({ currentPage, onPageChange }: BottomNavigationProps) {
  const navItems = [
    { id: "home" as const, icon: Home, label: "Home" },
    { id: "ask" as const, icon: Book, label: "Ask" },
    { id: "search" as const, icon: Search, label: "Search" },
    { id: "more" as const, icon: MoreHorizontal, label: "More" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50">
      <div className="flex justify-around items-center py-2 px-4 max-w-md mx-auto">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant={currentPage === item.id ? "default" : "ghost"}
            size="sm"
            onClick={() => onPageChange(item.id)}
            className="flex flex-col items-center gap-1 h-auto py-2 px-3"
            data-testid={`nav-${item.id}`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-xs">{item.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}