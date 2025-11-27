import { Home, Search, Calendar, Sprout, MoreHorizontal } from "lucide-react";

type NavPage = "home" | "discipleship-list" | "search" | "daily" | "more";

interface BottomNavigationProps {
  currentPage: NavPage;
  onPageChange: (page: NavPage) => void;
}

export default function BottomNavigation({ currentPage, onPageChange }: BottomNavigationProps) {
  const navItems = [
    { id: "home" as const, icon: Home, label: "Home" },
    { id: "discipleship-list" as const, icon: Sprout, label: "Disciple" },
    { id: "search" as const, icon: Search, label: "Search" },
    { id: "daily" as const, icon: Calendar, label: "Daily" },
    { id: "more" as const, icon: MoreHorizontal, label: "More" },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 border-t border-slate-800 bg-black/85 backdrop-blur-xl z-50"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="mx-auto flex h-16 max-w-xl items-center justify-around px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onPageChange(item.id)}
              className="flex flex-col items-center justify-center text-xs focus:outline-none"
              data-testid={`nav-${item.id}`}
            >
              <div
                className={`
                  flex h-9 w-9 items-center justify-center rounded-full
                  transition-transform duration-150
                  ${isActive ? "scale-110 bg-amber-500/15" : "scale-100"}
                `}
              >
                <Icon
                  className={
                    isActive
                      ? "h-5 w-5 text-amber-400"
                      : "h-5 w-5 text-slate-300"
                  }
                />
              </div>
              <span
                className={
                  isActive
                    ? "mt-1 text-[11px] font-semibold text-amber-300"
                    : "mt-1 text-[11px] text-slate-300"
                }
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
