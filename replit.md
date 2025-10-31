# The Gospel in 5 Minutes - Mobile Bible App

## Overview
"The Gospel in 5 Minutes" is a mobile-first spiritual wellness application delivering daily Bible verses, emotional scripture guidance, and AI-powered biblical Q&A. It aims to offer meaningful spiritual content in digestible 5-minute sessions, combining wellness app aesthetics with Bible app functionality. Key capabilities include daily verse delivery, emotion-based scripture recommendations, an AI pastor chat, Bible search, and gamified streak tracking. The project's ambition is to provide a calming, intuitive spiritual experience accessible globally.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, built using Vite.
- **UI Framework**: Tailwind CSS with shadcn/ui and Radix UI for consistent, accessible design.
- **Design System**: Custom color palette (soft blues, warm golds, gentle greens) and typography (Inter, Crimson Text).
- **State Management**: React hooks for local state, TanStack Query for server state and caching.
- **Navigation**: Custom bottom navigation (Home, Ask, Search, More).
- **Mobile-First Design**: Responsive layout optimized for mobile, gesture-friendly interfaces, PWA-ready.
- **Accessibility**: Full iOS compliance (44pt tap targets, safe area, VoiceOver, high contrast, reduced motion).

### Backend Architecture
- **Server**: Express.js with TypeScript in ESM mode.
- **API Design**: RESTful endpoints (`/api`), structured route registration.
- **Storage Layer**: Abstracted storage interface, designed for database-backed integration.
- **Session Management**: Prepared for session-based authentication.

### Data Storage Solutions
- **Database ORM**: Drizzle ORM for PostgreSQL (Neon serverless database).
- **Schema**: Extensible user authentication and spiritual content schema.
- **Migrations**: Managed by drizzle-kit.
- **Local Storage**: Client-side utility for user preferences, streak tracking, offline content, bookmarks, and personal notes.

### Authentication and Authorization
- **User Registration**: Modal-based registration for personalized experiences.

### Core Features & Implementation
- **Daily Scripture**: Card-based display with bookmarking, personal notes, sharing, copying.
- **AI Pastor Chat**: Professional UI for AI-powered Q&A with full internationalization.
- **Feelings & Scripture**: Emotion-based guidance.
- **Scripture Memory Helper**: Interactive memorization.
- **Saved Verses Page**: Dedicated page for bookmarked verses.
- **Notes Feature**: CRUD operations for personal reflections on verses.
- **Complete Internationalization**: All 17 pages support 7 languages (English, Spanish, French, Portuguese, Chinese, Arabic, Hindi) with 200+ translation keys.
- **Streak Tracking**: Consecutive days counter.
- **Offline Functionality**: Network status indicator, bookmarks, and notes persistence.
- **Data Management**: User data export (JSON) and full account deletion.
- **Dynamic Bible Trivia System**: Database-backed, dynamic questions with hints, multi-language support, and random selection.
- **Bible Reading Plans System**: 
  - 3-table architecture for plans, daily readings, and user progress tracking
  - Three complete plans with full 365-day reading schedules:
    - **Bible in 1 Year**: Complete OT + NT chronologically over 365 days
    - **Old Testament in 1 Year**: Genesis through Malachi with all 39 OT books
    - **New Testament in 1 Year**: Matthew through Revelation (4 complete cycles for deep study)
  - Guest preview mode: Non-authenticated users can view Day 1 content for all plans
  - Authenticated tracking: Signed-in users can mark days complete and track progress
  - Accessible via More page → Bible Reading Plans menu item with green-themed tile
  - All plans have complete daily readings with titles and scripture references
- **Push Notification System**: Capacitor native local notifications using `on: { hour, minute }` for recurring daily devotional and reading plan reminders. ID-based notification management (1=devotional, 2=reading plan, 999=streak alerts). Architect-verified for iOS/Android compatibility with `allowWhileIdle` for Android Doze mode.

## External Dependencies

### Third-Party UI Libraries
- **Radix UI**: Accessible UI primitives.
- **Lucide React**: Consistent icon system.
- **class-variance-authority**: Type-safe component variant management.

### Backend Services
- **Neon Database**: Serverless PostgreSQL for production.
- **ws library**: WebSocket support.

### External APIs
- **Bible API Integration**: For verses, cross-references, and translations.
- **OpenAI API**: AI-powered pastor responses and Q&A.
- **Translation Services**: For multi-language support.
- **YouTube**: For embedding Bible teaching videos (via a minimal wrapper proxy to resolve Error 153).

### Content Sources & Attribution
- **Christian Context API** (GetContext.xyz): Provides sermon videos, advice, and commentary.
- **BibleProject** (bibleproject.com): Provides animated Bible teaching videos.

### Development Tools
- **Vite**: Fast development server and optimized builds.
- **ESBuild**: High-performance server-side bundling.
- **TypeScript**: Full type safety.
- **TanStack Query**: Robust data fetching and caching.