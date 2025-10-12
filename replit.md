# The Gospel in 5 Minutes - Mobile Bible App

## Overview

"The Gospel in 5 Minutes" is a mobile-first spiritual wellness application that provides daily Bible verses, emotional scripture guidance, and AI-powered biblical Q&A. The app combines the peaceful aesthetic of wellness apps like Headspace with the functionality of Bible apps like YouVersion, focusing on delivering meaningful spiritual content in digestible 5-minute sessions.

The application features a clean, card-based interface with soft gradients and spiritual imagery, designed to create a calming user experience. Core functionality includes daily verse delivery, emotion-based scripture recommendations, AI pastor chat, Bible search capabilities, and gamified streak tracking with achievement badges.

## User Preferences

Preferred communication style: Simple, everyday language.

## 📅 Recent Changes (Latest Session)

### Critical Bugs Fixed - October 2025
**App Store Compliance & Data Integrity Fixes**

1. **Privacy Policy & Terms of Service Links Fixed** ✅
   - Added Legal Documents section to Support page
   - Links now accessible: More → Support & Legal → Privacy Policy / Terms
   - Fixed navigation props in App.tsx to support legal page routing
   - App Store review compliance requirement resolved

2. **Notes Persistence Bug Fixed** ✅ (Critical)
   - **Bug**: Notes dialog didn't load existing notes when reopening
   - **Fix**: Added useEffect hook to load notes when dialog opens
   - **Impact**: Users can now edit their saved notes reliably
   - **Enhancement**: Button text now shows "Edit Note" when note exists

3. **Notes Update Duplication Bug Fixed** ✅ (Critical)
   - **Bug**: Updating a note created duplicates instead of updating
   - **Fix**: Modified store.addNote() to check for existing notes before adding
   - **Impact**: Notes now update correctly, preserving createdAt timestamp
   - **Enhancement**: Added updatedAt timestamp when editing notes

4. **API.Bible Search Crash Fixed** ✅
   - **Bug**: TypeError: Cannot read properties of undefined (reading 'map')
   - **Fix**: Added null checking for searchData.data.verses before mapping
   - **Impact**: Bible search gracefully falls back to OpenAI when API.Bible fails
   - **Location**: server/routes.ts line 732

### Testing Completed
- ✅ Homepage features (streak counter, Facebook link)
- ✅ Daily Scripture card (bookmarks, notes, share, copy)
- ✅ Ask the Pastor AI chat (full functionality verified)
- ✅ Legal pages accessibility (all pages accessible)
- ✅ Offline persistence (bookmarks and notes persist across refreshes)

### Files Modified
- `client/src/pages/SupportPage.tsx` - Added Legal Documents section
- `client/src/App.tsx` - Fixed props passing for legal navigation
- `client/src/components/DailyVerseCard.tsx` - Fixed notes loading and state
- `client/src/lib/appStore.js` - Fixed addNote() update logic
- `server/routes.ts` - Added defensive null checking for API responses

## 🎉 MILESTONE: Apple App Store Ready (January 2025)

**STABLE CHECKPOINT - DO NOT LOSE THIS STATE**

### Current Status: ✅ COMPLETE APP STORE COMPLIANCE
The app is now fully compliant with Apple App Store requirements and ready for submission. This represents a stable, production-ready version with:

### ✅ Legal & Privacy Compliance
- **Privacy Policy**: Complete in-app page with data collection disclosure, OpenAI processing details, user rights
- **Terms of Service**: Comprehensive terms covering AI disclaimers, acceptable use, IP rights
- **Support Page**: In-app data deletion, data export, privacy controls, crisis resources
- **Navigation**: All legal pages accessible through More → Support & Legal
- **App Privacy Mapping**: Complete JSON mapping for App Store Connect submission

### ✅ iOS Technical Compliance  
- **44pt Tap Targets**: Enforced globally via CSS for all interactive elements
- **Safe Area Support**: Full iPhone notch/Dynamic Island compatibility using CSS env() variables
- **VoiceOver Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **High Contrast & Reduced Motion**: Automatic adaptation for accessibility preferences
- **Offline Functionality**: Network status indicator with graceful error handling

### ✅ Design & User Experience
- **Clean White Design**: Beautiful nature imagery (mountain lake, forest path, ocean cliff)
- **Cursive App Title**: "The Gospel in 5 Minutes" in Dancing Script font
- **Consecutive Days Counter**: Infinity symbol (∞) with numeric streak tracking
- **Facebook Integration**: Small button linking to https://www.facebook.com/TheGospelIn5Minutes
- **Responsive Layout**: Perfect mobile-first design with proper spacing and typography

### ✅ App Store Assets
- **App Icon**: Professional Christian design ready for 1024×1024 submission
- **Screenshots**: Homepage, Scripture detail, AI Pastor chat mockups
- **Metadata**: Complete App Store descriptions, keywords, age rating documentation

### ✅ Core Functionality (Current State)
- **Homepage**: Welcome header with streak counter and Facebook link
- **Daily Scripture**: Card with verse text and mountain lake imagery with bookmark and notes
- **3-Day Study Plans**: Card with forest path imagery
- **Ask the Pastor**: Professional AI chat with premium UI polish
- **Feelings & Scripture**: Emotion-based guidance with quick-start chips and modern design
- **Scripture Memory Helper**: Interactive memorization with progress tracking and professional polish
- **More Page**: Language selection, legal pages, support access
- **User Registration**: Modal with personal info collection
- **Streak Tracking**: Consecutive days counter with localStorage persistence
- **Donations**: Platform-specific payment processing
  - **iOS**: Apple Pay integration via @capacitor-community/stripe (0% Apple fees for nonprofits)
  - **Web/Android**: Stripe payment forms with card processing
  - Automatic platform detection and routing

### ✅ Offline & Data Management Features
- **Bookmarks**: Save favorite verses with persistent localStorage storage
  - Toggle bookmark button on DailyVerseCard
  - Bookmarks persist across sessions
  - Managed via appStore.js utility
- **Personal Notes**: Add reflections and prayers for any verse
  - Dialog-based note entry with textarea
  - Notes stored with verse reference and timestamp
  - Full CRUD operations via appStore.js
- **Data Export**: Download all user data as JSON file
  - Includes profile, preferences, bookmarks, notes, and streak data
  - Export available in Settings → Data & Privacy
  - Timestamped export files for backup
- **Account Deletion**: Complete data removal with confirmation
  - Alert dialog with detailed deletion warning
  - Clears all localStorage keys comprehensively
  - Persists empty state to prevent data repopulation
  - Navigates to home after successful deletion

### 📋 Implementation Status
- **Frontend**: React/TypeScript with Tailwind CSS and shadcn/ui components
- **State**: LocalStorage for user data, preferences, and streak tracking
- **Navigation**: Bottom nav between Home, Ask, Search, More pages
- **Legal Pages**: Complete Privacy Policy, Terms of Service, Support pages
- **Accessibility**: Full VoiceOver support, keyboard navigation, ARIA labels

**This checkpoint represents a fully App Store compliant version. All future development should preserve this compliance and legal framework.**

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, built using Vite for fast development and optimized bundling
- **UI Framework**: Tailwind CSS with shadcn/ui component library for consistent, accessible design components
- **Design System**: Custom color palette with spiritual themes (soft blues, warm golds, gentle greens) and typography using Inter and Crimson Text fonts
- **State Management**: React hooks for local state, TanStack Query for server state and API caching
- **Navigation**: Custom bottom navigation with four main sections (Home, Ask, Search, More)

### Backend Architecture
- **Server**: Express.js with TypeScript running in ESM mode
- **API Design**: RESTful endpoints with `/api` prefix, structured route registration system
- **Storage Layer**: Abstracted storage interface with in-memory implementation for development, designed to easily swap to database-backed storage
- **Session Management**: Prepared for session-based authentication using connect-pg-simple

### Data Storage Solutions
- **Database ORM**: Drizzle ORM configured for PostgreSQL with Neon serverless database
- **Schema**: Basic user authentication schema with extensible design for spiritual content
- **Migrations**: Database migrations managed through drizzle-kit
- **Local Storage**: Client-side storage for user preferences, streak tracking, and offline functionality
- **appStore.js**: Centralized localStorage utility managing:
  - Today's reading with offline access
  - Bookmarks (verse references array)
  - Personal notes (with reference, text, and timestamp)
  - User profile data (name, email, birthdate)
  - Consistent key naming convention (dg_* prefix)

### Authentication and Authorization
- **User Registration**: Modal-based registration collecting personal information for personalized experience
- **Session Management**: Backend prepared for session-based auth with PostgreSQL session store
- **User Preferences**: Language selection and personalization settings stored locally and server-side

### Mobile-First Design Approach
- **Responsive Layout**: Tailwind breakpoints optimized for mobile devices with desktop fallbacks
- **Touch Interactions**: Gesture-friendly interface with appropriate tap targets and hover states
- **Progressive Web App**: Prepared for PWA capabilities with offline functionality
- **Performance**: Optimized images, lazy loading, and efficient bundle splitting for mobile networks

## External Dependencies

### Third-Party UI Libraries
- **Radix UI**: Comprehensive set of accessible, unstyled UI primitives for complex components
- **Lucide React**: Consistent icon system with spiritual and general-purpose icons
- **class-variance-authority**: Type-safe component variant management for design system consistency

### Backend Services
- **Neon Database**: Serverless PostgreSQL database for production data storage
- **WebSocket Support**: Real-time capabilities for chat features using ws library

### Planned External APIs
- **Bible API Integration**: For fetching verses, cross-references, and multiple translations
- **OpenAI API**: AI-powered pastor responses and biblical question answering
- **Translation Services**: Multi-language support for global spiritual community

### Development Tools
- **Vite**: Fast development server with hot module replacement and optimized production builds
- **ESBuild**: High-performance bundling for server-side code
- **TypeScript**: Full type safety across client and server with shared schema types
- **TanStack Query**: Robust data fetching, caching, and synchronization for API interactions