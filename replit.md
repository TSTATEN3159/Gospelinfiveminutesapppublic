# The Gospel in 5 Minutes - Mobile Bible App

## Overview
"The Gospel in 5 Minutes" is a mobile-first spiritual wellness application designed to deliver daily Bible verses, emotional scripture guidance, and AI-powered biblical Q&A. Its core purpose is to blend the serene aesthetic of wellness applications with the robust functionality of Bible study tools, providing meaningful spiritual content in concise, 5-minute sessions. The project aims to be a completely free platform, offering all features without paywalls or in-app purchases, making spiritual growth accessible to everyone. Key capabilities include daily verse delivery, emotion-based scripture recommendations, an AI pastor chat, Bible search, gamified streak tracking, and comprehensive Bible reading plans.

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
- **AI Pastor Chat**: AI-powered Q&A.
- **AI Verse Simplifier (Plain Meaning)**: Transforms Bible verses into simple language using OpenAI.
- **AI Instant Application (Try This Today)**: Generates actionable steps from Bible verses using OpenAI.
- **Feelings & Scripture**: Emotion-based guidance.
- **Scripture Memory Helper**: Interactive memorization.
- **Saved Verses & Notes**: Dedicated pages for bookmarked verses and personal reflections.
- **Streak Tracking**: Consecutive days counter.
- **Devotional Progress Tracking**: Tracks progress for 365 days of devotionals.
- **Bible Reading Plans**: Three plans (1-Year Whole Bible, 6-Month Old/New Testament) with localStorage-based progress, streak calculation, and NIV text display.
- **Bible Trivia**: Interactive game with randomized questions and global progress tracking.
- **Profile Picture Upload**: LocalStorage-based profile picture management with privacy compliance and UI for upload/deletion.
- **Scripture Image Generator**: Hybrid system (React for live preview, canvas for high-quality export) for creating shareable verse images. Features auto-sizing, 5 professional presets, custom backgrounds, and text customization.

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
- **Bible API Integration**: For verses, cross-references, and translations.
- **OpenAI API**: Powers AI pastor, verse simplification, and practical application generation (GPT-4o-mini).
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