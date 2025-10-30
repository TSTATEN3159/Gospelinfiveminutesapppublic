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
  
- **Recent Fixes** (Oct 30, 2025):
  - ⚠️ **YouTube Embed Testing - STEP A Implemented**: Bypassing proxy to test direct embeds
    - **Current Approach**: Testing direct YouTube embeds (no proxy) to determine root cause
    - **Implementation**: 
      - VideoPlayer.tsx now loads YouTube iframes directly from `youtube-nocookie.com/embed/`
      - Bypasses backend proxy entirely to test if proxy was the blocker
      - Uses optimized embed parameters: `playsinline=1&rel=0&modestbranding=1&mute=1&autoplay=1`
      - iOS autoplay enabled (muted autoplay is allowed on iOS)
      - Added error logging with visual overlay for debugging in TestFlight
      - Logs embed URL, video ID, and User Agent to console for verification
      - **Native iOS Configuration**:
        - AppDelegate.swift reverted to stock Capacitor template (UIResponder, UIApplicationDelegate)
        - No custom WKWebView configuration needed - inline playback handled by iframe params + ATS
        - Removed incompatible CAPAppDelegate and CAPBridgeViewController references
    - **Testing Protocol**:
      1. Rebuild iOS app in Appflow (App Store/Release build)
      2. Install from TestFlight
      3. Open a Faith Video and check if it plays
      4. If it plays: Direct embeds work, proxy was the issue (keep this approach)
      5. If it fails: Check console logs in Xcode Devices for iframe/WebKit errors
    - **Diagnostic Features**:
      - Red error overlay appears on screen if iframe fails to load
      - Console logs show exact embed URL being used
      - User Agent logged to verify iOS environment
    - **Next Steps Based on Results**:
      - If direct embed works: Remove proxy endpoint, keep direct approach
      - If direct embed fails: Analyze console logs and try minimal wrapper (STEP C)
    - **Backend Proxy**: Still available at `/youtube-proxy/:videoId` but NOT currently used by frontend
    - Fixed Files: VideoPlayer.tsx (switched to direct YouTube embeds with error logging)

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