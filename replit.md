# The Gospel in 5 Minutes - Mobile Bible App

## Overview
"The Gospel in 5 Minutes" is a free, mobile-first spiritual wellness application designed to deliver daily Bible verses, emotional scripture guidance, and AI-powered biblical Q&A. Its purpose is to blend the aesthetic of wellness apps with robust Bible study tools, offering meaningful spiritual content in concise, 5-minute sessions. Key capabilities include daily verse delivery, emotion-based scripture recommendations, an AI pastor chat, Bible search, gamified streak tracking, and comprehensive Bible reading plans. The project emphasizes a professional, high-resolution visual experience using spiritually-appropriate imagery.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### UI/UX Decisions
The application uses React 18 with TypeScript and Vite, styled with Tailwind CSS, shadcn/ui, and Radix UI for accessibility. It features a custom color palette (soft blues, warm golds, gentle greens) and typography (Inter, Crimson Text). The design is mobile-first, PWA-ready, and includes native pinch zoom for iOS, full iOS accessibility compliance, and internationalization support for 7 languages. A custom page state system with type-safe `AppNavigate` and `AppPageParams` manages navigation.

### Technical Implementations
The backend uses Express.js with TypeScript, providing RESTful endpoints. Data storage is managed with Drizzle ORM for PostgreSQL (Neon serverless) and client-side `appStore.js` for local data persistence and real-time reactivity. A unified platform-aware notification system handles daily reminders using Capacitor Local Notifications or the Browser Notification API. Browser capability checks and safe wrappers ensure graceful degradation for features reliant on browser APIs.

### Feature Specifications
- **Daily Scripture**: Card-based display with bookmarking, notes, sharing, and copying.
- **Scripture Ticker Widget**: Scrolling verse panel with static focus verse and two high-definition stock photos, using pure CSS animations.
- **AI Pastor Chat**: AI-powered Q&A.
- **AI Verse Simplifier (Plain Meaning)**: Transforms verses into simple language using OpenAI.
- **AI Instant Application (Try This Today)**: Generates actionable steps from verses using OpenAI.
- **Feelings & Scripture**: Emotion-based scripture recommendations.
- **Scripture Memory Helper**: Interactive memorization tool.
- **Topical Bible Search**: Comprehensive topic discovery with 40+ curated topics, voice playback for verses, and AI-powered "How to Live This Today" application generation.
- **Scripture Selector**: Visual dropdown for selecting single verses, ranges, or chapters, with abbreviation toggle and continuous navigation.
- **Bible Version Preference System**: User-selectable Bible versions (KJV, WEB, BBE, ASV) with comparison mode and tap-to-read functionality.
- **Bookmark System with Folders & Notes**: Advanced organization for bookmarked verses with customizable folders and personal notes.
- **Premium Text-to-Speech**: High-quality voice playback with word-by-word highlighting.
- **Streak Tracking & Devotional Progress**: Tracks consecutive days and devotional progress.
- **Bible Reading Plans**: Three plans (1-Year Whole Bible, 6-Month Old/New Testament) with progress tracking.
- **Discipleship Plans System**: 34 comprehensive YouVersion-style multi-day spiritual growth programs with enriched devotionals, reflection questions, prayers, and shareable truths, featuring smart filtering and progress tracking. Topics include salvation, Spirit-filled living, freedom from addiction/temptation/fear, relationships, marriage, parenting, work/calling, purity, suffering, prayer, identity in Christ, serving, spiritual warfare, fasting & spiritual hunger, overcoming depression, breaking people-pleasing, contentment in every circumstance, hearing God's voice, forgiveness & reconciliation, witnessing & evangelism, stewardship & generosity, biblical decision making, and social media & technology.
- **Scripture Image Generator**: Canvas-based system for creating shareable verse images with custom backgrounds, fonts, and colors.

### System Design Choices
The application implements a smart tiered fallback system for Bible APIs (API.Bible → Bolls.life → OpenAI GPT-4o-mini → GetContext.xyz) with real-time usage monitoring and PostgreSQL-backed tracking to manage costs and ensure reliability. Capacitor Live Updates provide over-the-air updates, and an automated script manages iOS versioning.

## External Dependencies

### Third-Party UI Libraries
- **Radix UI**: Accessible UI primitives.
- **Lucide React**: Icon system.
- **class-variance-authority**: Type-safe component variant management.

### Backend Services
- **Neon Database**: Serverless PostgreSQL.
- **ws library**: WebSocket support.

### External APIs
- **API.Bible**: Primary Bible API.
- **Bolls.life**: Fallback Bible API.
- **OpenAI API**: Powers AI Pastor, Verse Simplifier, and Instant Application features.
- **GetContext.xyz**: Backup Christian Context API.
- **SendGrid Email Service**: For daily reminder emails and blog subscriber emails.
- **Translation Services**: For multi-language support.
- **BibleProject (bibleproject.com)**: Provides animated Bible teaching videos via YouTube (implicitly through content, not direct API).

## Recent Changes

### Daily Email Reminders & Progress Tracking (November 20, 2025)
- **Email Infrastructure**: Fully functional daily email reminder system using SendGrid
  - Verified sender email: `info@thegospelin5minutes.org`
  - Daily emails sent at 7:00 AM featuring today's verse, meaning, application, and trivia reminder
  - Beautiful parchment-background email template with white text for readability
  - Visible parchment paper edges with proper padding
  - HTTPS links to published app at `https://thegospelin5minutes.org`
- **Email Personalization**: Smart first name detection and usage
  - Emails use subscriber's first name in greeting ("Good morning, [FirstName]!")
  - Test endpoint checks database (appUsers and subscribers tables) for existing first names
  - Accepts optional firstName parameter for manual override
  - Falls back to "Friend" if no name is found
- **Unsubscribe Feature**: Full unsubscribe functionality with visible link in email footer
  - Dedicated unsubscribe page (`/unsubscribe`) with user-friendly interface
  - Backend endpoint (`/api/unsubscribe-daily-reminder`) handles opt-out requests
  - Updates both `subscribers` and `appUsers` tables to disable emails
- **Subscription Management**: Smart data merging between blog subscribers and daily reminder subscribers
  - "Daily Reminders" button on DailyVerseCard and DailyVerseHeroCard
  - `/api/subscribe-daily-reminder` endpoint captures user's first name
  - Prevents duplicate subscriptions across tables
- **Discipleship Progress Tracking Fix**: Dual-layer completion system ensures reliable progress tracking
  - **Immediate marking**: Items marked complete instantly when users click Next or Next Day buttons
  - **Backup timer**: Items auto-marked after 2 seconds of viewing (catches passive reading without clicking)
  - Handles all navigation patterns: rapid clicking, slow reading, back navigation, exiting mid-day
  - Real-time UI updates via localStorage event dispatching across detail/list views
  - No duplicate marking issues - storage safely ignores redundant writes
- **Bible Trivia Tracking Migration**: Moved from broken server-side storage to reliable client-side localStorage
  - **Per-user tracking**: Each device/browser now maintains its own trivia stats (streaks, crowns, mastery, titles, power-ups)
  - **Defensive programming**: Deep cloning prevents shared reference mutations across React components
  - **Schema validation**: Gracefully handles corrupted or legacy localStorage data with fallback to defaults
  - **Type safety**: All numeric fields validated before use to prevent runtime errors
  - **Data integrity**: Removed unsafe shallow merge helper that could wipe nested objects (mastery, powerUps)
  - Trivia stats fully functional: daily streaks, crowns, Bible mastery scores, title progression, and power-ups

### Native iOS Share Cards (November 23, 2025)
- **Custom ShareCard Plugin**: Native iOS sharing plugin for verse sharing
  - Created `ShareCardPlugin.swift` with UIActivityViewController integration
  - Registered plugin in `AppDelegate.swift` using capacitorDidLoad()
  - TypeScript wrapper at `client/src/plugins/share-card.ts` for web integration
  - Share verses with native iOS share sheet showing verse text and reference
- **Component Integration**: Updated DailyVerseCard and DailyVerseHeroCard components
  - Replaced Web Share API with native ShareCard plugin for better iOS experience
  - Share button now opens native iOS share sheet with formatted verse content
  - Synced with Capacitor using `npx cap sync ios`

### Native iOS Daily Notifications (November 23, 2025)
- **VerseNotifications Plugin**: Native iOS local notifications for daily scripture reminders
  - Created `VerseNotificationsPlugin.swift` using UserNotifications framework
  - Schedules repeating daily notifications at 7:00 AM with verse text and reference
  - Requests notification permissions and handles authorization flow
  - Supports scheduling custom notification times (hour/minute parameters)
  - Includes `cancelAll()` method to disable all pending notifications
  - Registered in `AppDelegate.swift` alongside ShareCardPlugin
  - TypeScript wrapper at `client/src/plugins/verse-notifications.ts` for web integration
- **UI Integration**: Added notification controls to daily verse components
  - "Remind me daily at 7am" button enables native iOS notifications
  - "Turn off reminder" button cancels all scheduled notifications
  - Both buttons available in DailyVerseCard and DailyVerseHeroCard
  - Toast notifications confirm successful scheduling and cancellation
  - Bell and BellOff icons from Lucide React for visual clarity

### Native iOS Scripture Image Cards (November 23, 2025)
- **ScriptureImage Plugin**: Professional native iOS scripture image card generation
  - Created `ScriptureImagePlugin.swift` using UIGraphicsImageRenderer for high-quality rendering
  - Generates beautiful gradient card with centered, auto-fitting verse text
  - Dynamic font sizing ensures text never overflows the card boundaries
  - Professional styling with rounded corners, subtle shadows, and elegant typography
  - Saves as PNG file and returns URL for sharing/display
  - Registered in `AppDelegate.swift` alongside other native plugins
  - TypeScript wrapper at `client/src/plugins/scripture-image.ts`
- **Smart Integration**: Updated ScriptureImageGenerator component with intelligent fallback
  - Native iOS plugin used automatically when on iOS devices for professional cards
  - Falls back to web-based canvas rendering on browsers
  - Seamless user experience across all platforms
  - Maintains all existing customization options for web users

### Native iOS Photo Picker for Custom Backgrounds (November 23, 2025)
- **BackgroundImagePicker Plugin**: Native iOS photo picker for custom scripture backgrounds
  - Created `BackgroundImagePickerPlugin.swift` with UIImagePickerController integration
  - Opens native iOS Photos library for background selection
  - Saves selected photos to app storage with 90% JPEG compression
  - Returns file URL for use in scripture image generation
  - Registered in `AppDelegate.swift` alongside other native plugins
  - TypeScript wrapper at `client/src/plugins/background-image-picker.ts`
- **UI Integration**: Added to Scripture Image Generator backgrounds tab
  - "Pick from Photos (iOS)" button appears only on iOS native platform
  - Integrates seamlessly with existing custom background management
  - Selected photos stored alongside web-uploaded custom backgrounds
  - Maintains full compatibility with existing web upload flow