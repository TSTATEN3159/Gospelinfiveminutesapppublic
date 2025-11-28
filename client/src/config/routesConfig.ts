// Routes configuration for navigation
// Adapted from ChatGPT's suggestion to work with our state-based navigation

export type AppPage = 
  | "home" 
  | "search" 
  | "daily" 
  | "more" 
  | "privacy" 
  | "terms" 
  | "support" 
  | "videos" 
  | "blog" 
  | "settings" 
  | "friends" 
  | "biblestudies" 
  | "bibletrivia" 
  | "savedverses" 
  | "bookmarks" 
  | "glassdemo" 
  | "devotionals" 
  | "reading-plans" 
  | "reading-plan-detail" 
  | "screenshot-tool" 
  | "plain-meaning" 
  | "instant-application" 
  | "voice-settings" 
  | "topic-search" 
  | "image-scripture" 
  | "discipleship-list" 
  | "discipleship-plan" 
  | "discipleship-reading" 
  | "unsubscribe" 
  | "abide";

export interface RouteConfig {
  page: AppPage;
  label: string;
  backTarget: AppPage;
  homeTarget: AppPage;
  showBack: boolean;
  showHome: boolean;
  showNext: boolean;
  nextTarget?: AppPage;
  nextLabel?: string;
}

// Define all app routes with their navigation targets
export const appRoutes: RouteConfig[] = [
  // Main tabs (no back button needed)
  { page: "home", label: "Home", backTarget: "home", homeTarget: "home", showBack: false, showHome: false, showNext: false },
  { page: "search", label: "Search", backTarget: "home", homeTarget: "home", showBack: false, showHome: false, showNext: false },
  { page: "daily", label: "Daily", backTarget: "home", homeTarget: "home", showBack: false, showHome: false, showNext: false },
  { page: "more", label: "More", backTarget: "home", homeTarget: "home", showBack: false, showHome: false, showNext: false },
  
  // Pages accessible from More tab
  { page: "settings", label: "Settings", backTarget: "more", homeTarget: "home", showBack: true, showHome: true, showNext: false },
  { page: "friends", label: "Friends", backTarget: "more", homeTarget: "home", showBack: true, showHome: true, showNext: false },
  { page: "videos", label: "Faith Videos", backTarget: "more", homeTarget: "home", showBack: true, showHome: true, showNext: false },
  { page: "blog", label: "Blog", backTarget: "more", homeTarget: "home", showBack: true, showHome: true, showNext: false },
  { page: "biblestudies", label: "Bible Studies", backTarget: "more", homeTarget: "home", showBack: true, showHome: true, showNext: false },
  { page: "bibletrivia", label: "Bible Trivia", backTarget: "more", homeTarget: "home", showBack: true, showHome: true, showNext: false },
  { page: "savedverses", label: "Saved Verses", backTarget: "more", homeTarget: "home", showBack: true, showHome: true, showNext: false },
  { page: "bookmarks", label: "Bookmarks", backTarget: "more", homeTarget: "home", showBack: true, showHome: true, showNext: false },
  { page: "support", label: "Support", backTarget: "more", homeTarget: "home", showBack: true, showHome: true, showNext: false },
  { page: "privacy", label: "Privacy Policy", backTarget: "more", homeTarget: "home", showBack: true, showHome: true, showNext: false },
  { page: "terms", label: "Terms of Service", backTarget: "more", homeTarget: "home", showBack: true, showHome: true, showNext: false },
  { page: "image-scripture", label: "Scripture Image", backTarget: "more", homeTarget: "home", showBack: true, showHome: true, showNext: false },
  { page: "screenshot-tool", label: "Screenshot Tool", backTarget: "more", homeTarget: "home", showBack: true, showHome: true, showNext: false },
  
  // Pages accessible from Daily tab
  { page: "plain-meaning", label: "Plain Meaning", backTarget: "daily", homeTarget: "home", showBack: true, showHome: true, showNext: false },
  { page: "instant-application", label: "Try This Today", backTarget: "daily", homeTarget: "home", showBack: true, showHome: true, showNext: false },
  { page: "abide", label: "Abide", backTarget: "home", homeTarget: "home", showBack: true, showHome: true, showNext: false },
  
  // Pages accessible from Search tab
  { page: "topic-search", label: "Topical Search", backTarget: "search", homeTarget: "home", showBack: true, showHome: true, showNext: false },
  
  // Reading Plans flow
  { page: "reading-plans", label: "Reading Plans", backTarget: "more", homeTarget: "home", showBack: true, showHome: true, showNext: false },
  { page: "reading-plan-detail", label: "Plan Details", backTarget: "reading-plans", homeTarget: "home", showBack: true, showHome: true, showNext: false },
  
  // Discipleship Plans flow
  { page: "discipleship-list", label: "Discipleship", backTarget: "more", homeTarget: "home", showBack: true, showHome: true, showNext: false },
  { page: "discipleship-plan", label: "Plan Details", backTarget: "discipleship-list", homeTarget: "home", showBack: true, showHome: true, showNext: false },
  { page: "discipleship-reading", label: "Day Reading", backTarget: "discipleship-plan", homeTarget: "home", showBack: true, showHome: true, showNext: false },
  
  // Devotionals
  { page: "devotionals", label: "Devotionals", backTarget: "more", homeTarget: "home", showBack: true, showHome: true, showNext: false },
  
  // Voice Settings
  { page: "voice-settings", label: "Voice Settings", backTarget: "settings", homeTarget: "home", showBack: true, showHome: true, showNext: false },
  
  // Utility pages
  { page: "unsubscribe", label: "Unsubscribe", backTarget: "home", homeTarget: "home", showBack: true, showHome: true, showNext: false },
  { page: "glassdemo", label: "Glass Demo", backTarget: "more", homeTarget: "home", showBack: true, showHome: true, showNext: false },
];

// Helper function to get route config by page name
export function getRouteConfig(page: AppPage): RouteConfig | undefined {
  return appRoutes.find(route => route.page === page);
}

// Helper function to get route index
export function getRouteIndex(page: AppPage): number {
  return appRoutes.findIndex(route => route.page === page);
}
