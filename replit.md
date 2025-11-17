# The Gospel in 5 Minutes - Mobile Bible App

## Overview
"The Gospel in 5 Minutes" is a mobile-first spiritual wellness application designed to deliver daily Bible verses, emotional scripture guidance, and AI-powered biblical Q&A. Its core purpose is to blend the serene aesthetic of wellness applications with the robust functionality of Bible study tools, providing meaningful spiritual content in concise, 5-minute sessions. The project aims to be a completely free platform, offering all features without paywalls or in-app purchases, making spiritual growth accessible to everyone. Key capabilities include daily verse delivery, emotion-based scripture recommendations, an AI pastor chat, Bible search, gamified streak tracking, and comprehensive Bible reading plans.

**Design Philosophy:** Professional polish inspired by The Bible App, featuring exclusively high-resolution stock photography throughout the entire application. All UI sections use authentic, spiritually-appropriate imagery (Bible study scenes, prayer/fellowship, pastoral landscapes, scripture reading) to create a premium, trustworthy visual experience.

**API Cost Management:** Smart tiered fallback system with usage tracking - Bolls.life (unlimited, free) → API.Bible (5,000 requests/day) → OpenAI GPT-4o-mini ($85/month budget) → GetContext.xyz (backup). Real-time usage monitoring via `/api/usage-stats` endpoint. Database-backed tracking prevents overages and optimizes costs.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript and Vite.
- **UI/UX**: Tailwind CSS, shadcn/ui, and Radix UI for accessible design. Custom color palette (soft blues, warm golds, gentle greens) and typography (Inter, Crimson Text). Mobile-first, PWA-ready design with native pinch zoom for iOS.
- **State Management**: React hooks for local state, TanStack Query for server state.
- **Accessibility**: Full iOS compliance (44pt tap targets, safe area support, VoiceOver, high contrast, reduced motion).
- **Internationalization**: Full support for 7 languages (English, Spanish, French, Portuguese, Chinese, Arabic, Hindi) across all 17 pages.
- **Offline Functionality**: Network status indicator, local persistence for bookmarks, notes, and reading progress.

### Backend
- **Server**: Express.js with TypeScript in ESM mode.
- **API Design**: RESTful endpoints.
- **Storage Layer**: Abstracted interface for database integration.
- **Authentication**: Prepared for session-based authentication.

### Data Storage
- **Database**: Drizzle ORM for PostgreSQL (Neon serverless).
- **Local Storage**: Client-side `appStore.js` for user preferences, streak tracking, offline content, bookmarks, notes, and reading plan progress. Custom event system for real-time reactivity.

### Notification System
- **Unified Platform-Aware Notifications**: Manages daily verse and Bible reading plan reminders, adapting between Capacitor Local Notifications for native platforms and Browser Notification API for web. Features atomic scheduling, permission-aware initialization, and separate storage for preferences.

### Core Features
- **Daily Scripture**: Card-based display with bookmarking, notes, sharing, and copying.
- **Scripture Ticker Widget**: Beautiful scrolling verse panel positioned FIRST on the Daily page, featuring a static "focus verse" with continuous scrolling ticker of 25 verses. Includes TWO high-definition stock photos (open Bible with golden sunlight, hands holding Bible) that blend seamlessly on the right side within the tile borders. Uses pure CSS animations (no external dependencies).
- **AI Pastor Chat**: AI-powered Q&A.
- **AI Verse Simplifier (Plain Meaning)**: Transforms Bible verses into simple language using OpenAI. Features professional Book/Chapter/Verse dropdown selector (ScriptureReferencePicker) for easy navigation through all 66 Bible books with accurate chapter counts. Now displayed with premium LiquidGlassFeatureTile component on DailyPage for enhanced visual appeal.
- **AI Instant Application (Try This Today)**: Generates actionable steps from Bible verses using OpenAI. Features professional Book/Chapter/Verse dropdown selector (ScriptureReferencePicker) for easy navigation through all 66 Bible books with accurate chapter counts. Now displayed with premium LiquidGlassFeatureTile component on DailyPage for enhanced visual appeal.
- **Feelings & Scripture**: Emotion-based guidance.
- **Scripture Memory Helper**: Interactive memorization.
- **Topical Bible Search**: Comprehensive topic discovery with 40+ curated Biblical topics (Kingdom of God, Salvation, Faith, Love, Hope, Forgiveness, Prayer, Holy Spirit, Healing, Courage, and more). Features: beautiful dropdown selection, 5-10 KJV verses per topic with full text, **voice playback on each verse** using premium TTS with Listen buttons, **AI-powered "How to Live This Today" application generator** for practical daily obedience (GPT-4o-mini), click-to-load navigation to Scripture Finder, offline functionality, and premium spiritual growth UI. Accessible from Search page with dedicated full-screen topic browser.
- **Scripture Selector**: Visual dropdown interface with three selection modes (Verse, Range, Chapter). Supports single verses (John 3:16), verse ranges (John 3:16-18), and whole chapters (John 3). Features abbreviation toggle (Genesis ↔ Gen), all 66 books with accurate chapter/verse counts stored locally, smart UI that adapts to selected mode, and Previous/Next navigation buttons for continuous Bible reading.
- **ScriptureReferencePicker Component**: Reusable Book/Chapter/Verse dropdown component used in Plain Meaning and Instant Application pages. Features all 66 Bible books (Old and New Testament) with accurate chapter counts (stored in `bibleBooks.ts`), dynamic chapter/verse dropdowns, optional verse range support, type-safe selection interface, and `buildReferenceString()` helper for formatting references (e.g., "John 3:16"). Verse dropdown allows up to 176 verses (Psalm 119 maximum).
- **LiquidGlassFeatureTile Component**: Reusable premium UI component (`client/src/components/LiquidGlassFeatureTile.tsx`) for displaying feature tiles with liquid glass morphism effects. Features: backdrop blur, gradient overlays, customizable accent colors, icon support, responsive sizing, dark mode support with proper text contrast, hover animations, and accessible button semantics. Currently used for Plain Meaning and Instant Application tiles on DailyPage.
- **Bible Version Preference System**: User-selectable Bible versions (KJV, WEB, BBE, ASV) with localStorage persistence. Features version tabs for quick switching, compare mode for side-by-side or vertical verse comparison, and automatic re-fetching when switching versions. Each verse card includes tap-to-read with word-by-word highlighting.
- **Bookmark System with Folders & Notes**: Advanced organization with customizable folders, personal notes, and star-based bookmarking. Features: default "My Verses" folder, create/rename/delete folders, one-click star button on Scripture cards, editable notes for meditation and teaching, click-to-load functionality, timestamps (created/updated), all data persists in localStorage (bibleBookmarks_v2). Two-column layout: folder sidebar with verse counts + bookmarks list with inline note editing.
- **Premium Text-to-Speech with Tap-to-Read**: Capacitor TTS plugin with intelligent voice selection (iOS: Siri Female/Samantha Enhanced; Android: Google Female/Wavenet). Features: automatic selection of highest quality natural female voice (rate: 0.95, pitch: 1.05), user-selectable voices in Voice Settings, tap-to-read on scripture text, and word-by-word highlighting during playback.
- **Saved Verses & Notes**: Dedicated pages for bookmarked verses and personal reflections.
- **Streak Tracking**: Consecutive days counter.
- **Devotional Progress Tracking**: Tracks progress for 365 days of devotionals.
- **Bible Reading Plans**: Three plans (1-Year Whole Bible, 6-Month Old/New Testament) with localStorage-based progress, streak calculation, and NIV text display.
- **Bible Trivia**: Interactive game with randomized questions and global progress tracking.
- **Profile Picture Upload**: LocalStorage-based profile picture management with privacy compliance and UI for upload/deletion.
- **Scripture Image Generator**: Canvas-based system for creating shareable verse images (1290x2796 mobile-optimized). Features intelligent auto-fit text algorithm (scales from baseFontSize down to 18px minimum, handles long words via character-by-character splitting), 25 curated spiritual backgrounds across 4 categories (Spiritual: 10 images including crosses, Bible, prayer hands, heavenly clouds; Nature: 4 mountain/forest scenes; Water: 4 ocean/lake scenes; Sky: 5 sunrise/sunset/starry scenes), customizable font size (30-96px), text color picker, and Bible version label. Accessible via navigation from TopicSearchPage with verse data pre-filled. Download as high-quality PNG.

### Browser Capability Checks & Safe Wrappers
- **Critical Pattern**: All features dependent on browser APIs utilize `capabilities.ts` for detection and `safe` wrappers (e.g., `safeLocalStorage`, `safeShare`) to ensure graceful degradation and provide fallbacks. UI elements are conditionally rendered based on API availability.

## External Dependencies

### Third-Party UI Libraries
- **Radix UI**: Accessible UI primitives.
- **Lucide React**: Icon system.
- **class-variance-authority**: Type-safe component variant management.

### Backend Services
- **Neon Database**: Serverless PostgreSQL.
- **ws library**: WebSocket support.

### External APIs
- **Smart Bible API Fallback Chain**: Tiered system with usage limits - (1) Bolls.life (unlimited, free, primary), (2) API.Bible (5,000 requests/day, tracked), (3) OpenAI GPT-4o-mini ($85/month budget, tracked), (4) GetContext.xyz (backup). Automatic failover ensures 99.9% uptime.
- **API Usage Tracking**: PostgreSQL-backed usage monitoring (`api_usage_log` table) with daily/monthly limits, cost tracking, and real-time stats endpoint (`/api/usage-stats`).
- **OpenAI API**: Powers AI pastor, verse simplification, and practical application generation (GPT-4o-mini). Usage capped at $85/month via tracker.
- **SendGrid Email Service**: Replit connector integration for blog subscriber emails with automatic API key rotation.
- **Translation Services**: Multi-language support.
- **Christian Context API (GetContext.xyz)**: Provides sermon videos, advice, and biblical commentary.
- **BibleProject (bibleproject.com)**: Provides animated Bible teaching videos via YouTube.

### Development Tools
- **Vite**: Fast development and optimized builds.
- **ESBuild**: High-performance server-side bundling.
- **TypeScript**: Type safety.
- **TanStack Query**: Data fetching and caching.

### Deployment & Updates
- **Capacitor Live Updates**: Over-the-air (OTA) updates via Ionic Appflow (background updates, 3 cached versions).
- **iOS Version Management**: Automated version control script (`scripts/version.js`) that synchronizes version numbers across package.json and Info.plist. Supports semantic versioning (major.minor.patch), auto-incrementing build numbers, and provides commands for showing, incrementing, setting, and syncing versions. See VERSION_MANAGEMENT.md for complete usage guide.