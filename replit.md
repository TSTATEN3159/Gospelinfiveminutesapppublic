# The Gospel in 5 Minutes - Mobile Bible App

## Overview

"The Gospel in 5 Minutes" is a mobile-first spiritual wellness application designed to deliver daily Bible verses, emotional scripture guidance, and AI-powered biblical Q&A. It aims to combine the peaceful aesthetic of wellness apps with the functionality of Bible apps, offering meaningful spiritual content in digestible 5-minute sessions. Key capabilities include daily verse delivery, emotion-based scripture recommendations, an AI pastor chat, Bible search, and gamified streak tracking. The project's ambition is to provide a calming, intuitive spiritual experience accessible to a global audience.

## User Preferences

Preferred communication style: Simple, everyday language.

## Social Media & Branding

- **Instagram**: https://www.instagram.com/thegospelinfiveminutes/
- **Facebook**: https://www.facebook.com/TheGospelIn5Minutes

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