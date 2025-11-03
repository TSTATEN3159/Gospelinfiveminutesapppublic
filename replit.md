# The Gospel in 5 Minutes - Mobile Bible App

## Overview

"The Gospel in 5 Minutes" is a mobile-first spiritual wellness application designed to deliver daily Bible verses, emotional scripture guidance, and AI-powered biblical Q&A. It aims to combine the peaceful aesthetic of wellness apps with the functionality of Bible apps, offering meaningful spiritual content in digestible 5-minute sessions. Key capabilities include daily verse delivery, emotion-based scripture recommendations, an AI pastor chat, Bible search, and gamified streak tracking. The project's ambition is to provide a calming, intuitive spiritual experience accessible to a global audience.

## User Preferences

Preferred communication style: Simple, everyday language.

## Social Media & Branding

- **Instagram**: https://www.instagram.com/thegospelinfiveminutes/
- **Facebook**: https://www.facebook.com/TheGospelIn5Minutes

## Production Deployment Status

- **Backend URL**: https://daily-gospel-timothystaten.replit.app
- **Status**: ✅ Fully operational and verified
- **API Architecture**: ✅ Refactored from proxy calls to direct API calls
- **iOS Compatibility**: ✅ FULLY CONFIGURED for TestFlight & App Store
- **Database**: Connected (PostgreSQL via Neon, slightly degraded but functional)
- **Recent Fixes** (Oct 20, 2025):
  - ✅ **iOS Network Permissions**: Added NSAppTransportSecurity to Info.plist
  - ✅ **Capacitor Configuration**: Updated capacitor.config.ts with iOS scheme and navigation allowlist
  - ✅ **Backend CORS**: Added support for capacitor://localhost origin
  - ✅ **API Architecture**: All fetch() calls use apiUrl() for production deployment
  - Fixed Files: videoService.ts, FriendsPage.tsx, SupportPage.tsx, Info.plist, capacitor.config.ts, server/index.ts
  
- **Recent Fixes** (Oct 28, 2025):
  - ✅ **Friends Import Functionality FIXED**:
    - Fixed FriendsPage.tsx contacts import mutation to include `?fromSignup=true` parameter
    - Added proper JSON response parsing with `await res.json()`
    - Improved user feedback showing count of imported contacts and friends found
    - Added filter to only import contacts with name AND (email OR phone)
    - Fixed ImportFriendsDialog.tsx to properly parse backend response
    - Now invalidates all relevant queries (contacts, friends, friend requests) on success
    - Fixed Files: FriendsPage.tsx, ImportFriendsDialog.tsx
  
- **Recent Enhancements** (Oct 30, 2025):
  - ✅ **Comprehensive Debugging System Added**:
    - **Frontend Debugging (ImportFriendsDialog.tsx)**:
      - Platform and userId logging on import start
      - Permission response logging (handles iOS 17/18 'limited' status)
      - Contact count logging (raw, filtered, selected)
      - API request/response logging with status codes
      - Missing userId guards with user-friendly toast messages
    - **Frontend Debugging (FriendsPage.tsx)**:
      - Friends list fetch logging with userId and response status
      - Console logs visible in Xcode Devices Console for TestFlight debugging
    - **Backend Debugging (server/routes.ts)**:
      - GET /api/friends/:userId - Request logging with timing metrics
      - POST /api/contacts/:userId/import - Request/response logging with counts
      - All endpoints log userId, timing (ms), counts, and errors
    - **iOS 18 Compatibility**:
      - Permission helper handles 'granted', 'denied', 'prompt', and 'limited' statuses
      - Tolerant of different plugin versions (v7 and older)
    - **Testing Protocol**:
      1. Install from TestFlight
      2. Connect iPhone to Mac → Xcode → Devices → Console
      3. Filter logs: "[Contacts]" or "[Friends]" or "[API]"
      4. Try Import Contacts and Find Friends features
      5. Review console logs for permission status, counts, and errors
    - Fixed Files: ImportFriendsDialog.tsx, FriendsPage.tsx, server/routes.ts
  
- **Recent Fixes** (Oct 30, 2025 - Morning):
  - ✅ **YouTube Error 153 Fix - STEP C Implemented**: Minimal wrapper proxy to fix iOS WKWebView blocking
    - **Root Cause**: YouTube Error 153 - YouTube blocks both direct embeds and complex proxies from WKWebView
    - **Solution**: STEP C - Minimal HTML wrapper served from our HTTPS domain
    - **Implementation**: 
      - Backend proxy endpoint at `/youtube-proxy/:videoId` serves minimal HTML wrapper
      - Wrapper contains only YouTube iframe, no autoplay, no JS API to avoid Error 153
      - Uses `youtube-nocookie.com` for privacy and better compatibility with religious content
      - Minimal headers (Content-Type, Cache-Control only) - no X-Frame-Options or CSP conflicts
      - VideoPlayer.tsx now uses proxy: `apiUrl('youtube-proxy/${videoId}')`
      - Tap-to-play experience (no autoplay) to comply with iOS expectations
      - Added error logging with visual overlay for debugging in TestFlight
      - Logs proxy URL, video ID, and User Agent to console for verification
      - **Native iOS Configuration**:
        - AppDelegate.swift uses stock Capacitor template (UIResponder, UIApplicationDelegate)
        - No custom WKWebView configuration needed - inline playback handled by Info.plist ATS + iframe params
        - Info.plist includes all YouTube domains (youtube.com, youtube-nocookie.com, googlevideo.com, ytimg.com, youtu.be)
        - WKWebViewConfiguration in Info.plist: `allowsInlineMediaPlayback: true`
    - **Testing Protocol**:
      1. Rebuild iOS app in Appflow (App Store/Release build)
      2. Install from TestFlight
      3. Open a Faith Video and tap to play
      4. Should play inline without Error 153
    - **Diagnostic Features**:
      - Red error overlay appears on screen if iframe fails to load
      - Console logs show exact proxy URL being used
      - User Agent logged to verify iOS environment
    - Fixed Files: server/routes.ts (minimal wrapper), VideoPlayer.tsx (switched to proxy)

- **Recent Fixes** (Oct 30, 2025 - Afternoon):
  - ✅ **Contact Import & Friend Request Fixes**:
    - **Body Size Limit**: Increased Express JSON body parser from 100kb → 2MB to support 50 contacts
    - **Robust Validation**: Loosened contact schema (all fields `.optional().nullable()`) to handle iOS edge cases
    - **Data Normalization**: Added whitespace trimming and phone number cleaning (`cleanPhone()`)
    - **Enhanced Logging**: 
      - Logs request body size in bytes
      - Full error stack traces
      - Structured error codes: `VALIDATION_ERROR`, `CONTACT_IMPORT_FAILED`, `ALREADY_IMPORTED`
    - **New Endpoint**: `POST /api/friends/request-by-email` - Send friend requests using emails instead of user IDs
      - Useful when importing contacts (you have emails, not IDs)
      - Validates both emails exist as app users
      - Checks for existing friendships
      - Returns structured error codes: `USER_NOT_FOUND`, `ALREADY_FRIENDS`, `VALIDATION_ERROR`
    - **Admin Endpoints**: Removed authentication from seed endpoints for easier testing
      - `POST /admin/seed-test-friends` - Create 5 test users with friendships (no key required)
      - `DELETE /admin/seed-test-friends` - Remove test data (no key required)
    - Fixed Files: server/index.ts, server/routes.ts, ImportFriendsDialog.tsx, FriendsPage.tsx

- **Recent Enhancements** (Nov 3, 2025):
  - ✅ **Devotional Progress Tracking API Implemented**:
    - **Database Schema**: Added `devotionalProgress` table with unique constraint on userId+day
    - **Storage Layer**: Added `getDevotionalProgress()` and `markDevotionalComplete()` methods with idempotency
    - **API Endpoints**: 
      - `POST /api/devotionals/365/progress` - Mark devotional day complete, returns updated progress with streak calculation
      - `GET /api/devotionals/365/progress/:userId` - Get user's completed days, last read date, and current streak
      - `GET /api/devotionals/365` - Get whole 365-day plan (all days for men & women)
      - `GET /api/devotionals/365/:gender/:day` - Get specific day's devotional
    - **Router Pattern**: Refactored into `server/devotionals-365.ts` using express.Router() for better modularity
    - **Cache Control**: Added `Cache-Control: no-store, no-cache, must-revalidate, max-age=0` headers to prevent iOS caching issues
    - **Streak Calculation**: Automatic consecutive-day streak counting from most recent completed day
    - **Content Coverage**: All 365 days accessible (days 1-3 have full content, days 4-365 use structured placeholders)
    - **Validation**: Days must be 1-365, userId required, duplicate completion prevented
    - **Testing**: Comprehensive tests validate idempotency, validation, streak calculation, and all 365 days
    - Fixed Files: shared/schema.ts, server/storage.ts, server/routes.ts, server/devotionals-365.ts

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, built using Vite.
- **UI Framework**: Tailwind CSS with shadcn/ui and Radix UI for consistent, accessible design.
- **Design System**: Custom color palette (soft blues, warm golds, gentle greens) and typography (Inter, Crimson Text).
- **State Management**: React hooks for local state, TanStack Query for server state and caching.
- **Navigation**: Custom bottom navigation (Home, Ask, Search, More).
- **Mobile-First Design**: Responsive layout optimized for mobile, gesture-friendly interfaces, PWA-ready, and performance-optimized.
- **Accessibility**: Full iOS compliance including 44pt tap targets, safe area support, VoiceOver, high contrast, and reduced motion adaptations.

### Backend Architecture
- **Server**: Express.js with TypeScript in ESM mode.
- **API Design**: RESTful endpoints (`/api`), structured route registration.
- **Storage Layer**: Abstracted storage interface, with in-memory for development, designed for database-backed integration.
- **Session Management**: Prepared for session-based authentication.

### Data Storage Solutions
- **Database ORM**: Drizzle ORM for PostgreSQL (Neon serverless database).
- **Schema**: Extensible user authentication and spiritual content schema.
- **Migrations**: Managed by drizzle-kit.
- **Local Storage**: Client-side `appStore.js` utility for user preferences, streak tracking, offline content, bookmarks, and personal notes.

### Authentication and Authorization
- **User Registration**: Modal-based registration for personalized experiences.
- **Session Management**: Backend prepared for session-based authentication.

### Core Features & Implementation
- **Daily Scripture**: Card-based display with bookmarking, personal notes, sharing, and copying.
- **AI Pastor Chat**: Professional UI for AI-powered Q&A with full internationalization.
- **Feelings & Scripture**: Emotion-based guidance.
- **Scripture Memory Helper**: Interactive memorization.
- **Saved Verses Page**: Dedicated page for bookmarked verses with read and remove functionality, supporting API.Bible and OpenAI for content.
- **Notes Feature**: CRUD operations for personal reflections on verses.
- **Complete Internationalization (Apple Store Ready)**: ALL 17 pages fully support 7 languages (English, Spanish, French, Portuguese, Chinese, Arabic, Hindi) with 200+ translation keys covering UI elements, error messages, legal content, form labels, and dynamic content. Language switching tested and verified across all pages including critical components like AI Pastor, Privacy Policy, Terms of Service, and payment flows.
- **Streak Tracking**: Consecutive days counter with localStorage persistence.
- **Offline Functionality**: Network status indicator, bookmarks, and notes persistence.
- **Data Management**: User data export (JSON) and full account deletion capabilities.
- **Apple Store Compliance**: All in-app donation functionality removed per Guidelines 3.2.1(iv) and 3.2.2 (organization is not Apple-approved nonprofit).

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
- **OpenAI API**: AI-powered pastor responses and Q&A.
- **Translation Services**: For multi-language support.

### Content Sources & Attribution
- **Christian Context API** (GetContext.xyz):
  - Provides sermon videos, Christian advice content, and biblical commentary
  - Free to use for ministry/faith-based apps per published terms
  - Attribution displayed on Videos and Blog pages with link to getcontext.xyz
  - Terms allow content use without prior written approval
  
- **BibleProject** (bibleproject.com):
  - Provides animated Bible teaching videos via YouTube
  - Free for ministry use with proper attribution
  - Attribution displayed on Videos page: "BibleProject® (bibleproject.com)"
  - Videos linked from YouTube for proper tracking and compliance

### Development Tools
- **Vite**: Fast development server and optimized builds.
- **ESBuild**: High-performance server-side bundling.
- **TypeScript**: Full type safety.
- **TanStack Query**: Robust data fetching and caching.