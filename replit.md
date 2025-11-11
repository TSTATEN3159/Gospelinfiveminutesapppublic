# The Gospel in 5 Minutes - Mobile Bible App

## Overview
"The Gospel in 5 Minutes" is a mobile-first spiritual wellness application delivering daily Bible verses, emotional scripture guidance, and AI-powered biblical Q&A. It aims to combine the peaceful aesthetic of wellness apps with the functionality of Bible apps, offering meaningful spiritual content in digestible 5-minute sessions. Key capabilities include daily verse delivery, emotion-based scripture recommendations, an AI pastor chat, Bible search, gamified streak tracking, and comprehensive Bible reading plans.

## Monetization
- **Business Model**: Completely FREE (no paywall, no purchases required)
- **Download**: Free to download from App Store
- **Access**: All features available immediately upon download
- **IAP System**: Completely removed - all StoreKit code, purchase UI, and paywall logic have been deleted from the codebase (November 2025)
- **All Features Free**: AI Pastor chat, Bible Reading Plans, 365-day devotionals, videos, Bible studies, trivia, full search, bookmarks & notes, Plain Meaning, Instant Application

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite.
- **UI Framework**: Tailwind CSS with shadcn/ui and Radix UI for consistent, accessible design.
- **Design System**: Custom color palette (soft blues, warm golds, gentle greens) and typography (Inter, Crimson Text).
- **State Management**: React hooks for local state, TanStack Query for server state and caching.
- **Navigation**: Custom bottom navigation (Home, Ask, Search, More).
- **Mobile-First Design**: Responsive layout optimized for mobile, gesture-friendly interfaces, PWA-ready, and performance-optimized.
- **Accessibility**: Full iOS compliance including 44pt tap targets, safe area support, VoiceOver, high contrast, and reduced motion adaptations.
- **Internationalization**: ALL 17 pages fully support 7 languages (English, Spanish, French, Portuguese, Chinese, Arabic, Hindi) with 200+ translation keys.
- **Offline Functionality**: Network status indicator, bookmarks, and notes persistence.

### Backend Architecture
- **Server**: Express.js with TypeScript in ESM mode.
- **API Design**: RESTful endpoints (`/api`), structured route registration.
- **Storage Layer**: Abstracted storage interface for database-backed integration.
- **Session Management**: Prepared for session-based authentication.

### Data Storage Solutions
- **Database ORM**: Drizzle ORM for PostgreSQL (Neon serverless database).
- **Schema**: Extensible user authentication and spiritual content schema.
- **Migrations**: Managed by drizzle-kit.
- **Local Storage**: Client-side `appStore.js` utility for user preferences, streak tracking, offline content, bookmarks, personal notes, and reading plan progress tracking.
- **Custom Event System**: appStore dispatches 'readingProgressChanged' events with `{planType, dayNumber}` for real-time cross-component reactivity in reading plans.

### Authentication and Authorization
- **User Registration**: Modal-based registration for personalized experiences.
- **Session Management**: Backend prepared for session-based authentication.

### Core Features & Implementation
- **Paywall System**: PaywallPage shown on first launch, PurchaseContext manages state, restore purchases on MorePage
- **Daily Scripture**: Card-based display with bookmarking, personal notes, sharing, and copying (premium)
- **AI Pastor Chat**: Professional UI for AI-powered Q&A (premium)
- **Plain Meaning (AI Verse Simplifier)**: AI-powered feature that transforms any Bible verse into simple, everyday language while maintaining theological integrity. Uses OpenAI to bridge between Bible text and daily understanding. Accessible via Daily tab (premium)
- **Instant Application (Try This Today)**: AI-powered feature where users enter a verse reference (e.g., "John 3:16"), the app fetches and displays the verse text from API.Bible, then generates specific, actionable steps to live out that verse today. Creates practical, 24-hour doable actions 100% rooted in God's Word and biblical teaching. Accessible via Daily tab (premium)
- **Feelings & Scripture**: Emotion-based guidance (premium)
- **Scripture Memory Helper**: Interactive memorization (premium)
- **Saved Verses Page**: Dedicated page for bookmarked verses (premium)
- **Notes Feature**: CRUD operations for personal reflections on verses (premium)
- **Streak Tracking**: Consecutive days counter with localStorage persistence (premium)
- **Devotional Progress Tracking**: API to mark devotional days complete, track progress, and calculate streaks. Includes content for 365 days (premium)
- **Bible Reading Plans**: Implemented three plans (1-Year Whole Bible, 6-Month Old Testament, 6-Month New Testament) with localStorage-based progress tracking (no authentication required), streak calculation, auto-advancing to incomplete days, real-time UI synchronization via custom events, and on-demand NIV Scripture text display. Users can expand/collapse to read the full Bible text for each day's reading without leaving the app (premium)
- **Bible Videos & Studies**: Integrated video teaching and Bible studies (premium)
- **Bible Trivia**: Interactive Bible trivia game (premium)
- **StoreKit Integration**: Native iOS StoreKit 2 bridge for purchases, TypeScript wrapper, one-time purchase support, transaction verification
- **TestFlight Detection**: Swift Capacitor plugin detects TestFlight builds, shows visual banner on paywall indicating sandbox pricing ($0)
- **Sandbox Purchase Testing**: TestFlight users can test full purchase flow using sandbox Apple IDs - purchases are FREE but flow is identical to production
- **Data Management**: User data export (JSON) and full account deletion capabilities (premium)
- **Apple Store Compliance**: Live Privacy Policy and Terms of Service hosted at `/privacy` and `/terms` endpoints. One-time $3.99 purchase model complies with App Store guidelines

## External Dependencies

### Third-Party UI Libraries
- **Radix UI**: Accessible UI primitives.
- **Lucide React**: Consistent icon system.
- **class-variance-authority**: Type-safe component variant management.

### Backend Services
- **Neon Database**: Serverless PostgreSQL for production.
- **ws library**: WebSocket support for real-time features.

### External APIs
- **Bible API Integration**: For verses, cross-references, and translations.
- **OpenAI API**: AI-powered pastor responses, Q&A, verse simplification (Plain Meaning), and practical application generation (Instant Application). Uses GPT-4o-mini model for cost-effective, high-quality responses.
- **Translation Services**: For multi-language support.
- **Christian Context API** (GetContext.xyz): Provides sermon videos, Christian advice content, and biblical commentary.
- **BibleProject** (bibleproject.com): Provides animated Bible teaching videos via YouTube.

### Development Tools
- **Vite**: Fast development server and optimized builds.
- **ESBuild**: High-performance server-side bundling.
- **TypeScript**: Full type safety.
- **TanStack Query**: Robust data fetching and caching.

### Deployment & Updates
- **Capacitor Live Updates**: Over-the-air (OTA) updates via Ionic Appflow
  - **App ID**: f26e02e6
  - **Channel**: Production
  - **Update Method**: background (non-intrusive updates)
  - **Max Versions**: 3 (keeps last 3 update versions cached)
  - **Implementation**: Background sync on app resume with smart reload blocking during critical operations (login, registration)
  - **Configuration**: capacitor.config.ts plugins.LiveUpdates section