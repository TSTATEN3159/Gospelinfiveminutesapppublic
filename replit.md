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

### Friend Invitation System & Faith Videos (November 28, 2025)
- **Friend Invitation System**: Manual invitation flow with token-based tracking
  - New "Invite" tab in Friends page for sending invitations
  - Invitation form with name, email, and optional personal message
  - Token-based invitation tracking with status (pending/accepted/expired/cancelled)
  - Notification banner when invited friends join the app
  - Cancel pending invitations functionality
  - Database tables: `friendInvitations`, `readingActivity`, `userPrivacySettings`
- **Reading Activity Sharing**: Privacy-controlled activity tracking
  - Track reading activity (verses, plans, time spent)
  - Privacy settings for sharing activity with friends
  - Opt-in model for sharing (private by default)
- **Faith Videos Expansion**: Expanded from 5 to 15 themes per category
  - Categories: Sermon, Gospel Tidbits, Christian Advice
  - 30+ total videos with themes: Love, Hope, Peace, Joy, Faith, Forgiveness, Prayer, Salvation, Wisdom, Courage, Mercy, Redemption, Compassion, Patience, Gratitude, Healing, Growth, Service
  - Backend video fetch limit increased to 30

### Apple Platform Features (November 28, 2025)
- **Lock Screen Widgets (iOS 16+)**: Three widget families for lock screen display
  - `accessoryCircular`: Small circular widget showing book abbreviation
  - `accessoryRectangular`: Rectangular widget with verse excerpt and reference
  - `accessoryInline`: Single-line widget for complications
  - Widget data shared via App Groups container
  - Swift WidgetKit implementation in `ios/App/GospelWidget/`
- **iCloud Sync (CloudKit)**: Cross-device sync for user data
  - Syncs bookmarks, notes, reading progress, and settings
  - Custom Capacitor plugin with Swift CloudKit integration
  - Settings page toggle with availability detection
  - Manual "Sync Now" button with last sync timestamp
  - Graceful handling when iCloud is unavailable
  - TypeScript wrapper: `client/src/lib/iCloudSync.ts`
  - Swift plugin: `ios/App/App/Plugins/iCloudSync.swift`
- **Siri Shortcuts**: Voice-activated app features
  - "Hey Siri, what's today's verse?" - Daily verse shortcut
  - "Hey Siri, give me a random verse" - Random verse shortcut
  - "Hey Siri, start prayer time" - Prayer time shortcut
  - "Hey Siri, Bible trivia" - Trivia game shortcut
  - Uses NSUserActivity for shortcut donations
  - Settings page with per-shortcut setup buttons
  - Checkmarks indicate which shortcuts are configured
  - TypeScript wrapper: `client/src/lib/siriShortcuts.ts`
  - Swift plugin: `ios/App/App/Plugins/SiriShortcuts.swift`
- **Live Activities**: Dynamic Island and lock screen verse display
  - Shows daily verse with countdown to midnight (next verse)
  - Dynamic Island compact/expanded views
  - Lock screen persistent display
  - Toggle in Settings to enable/disable
  - Auto-starts when user enables, respects preference on app load
  - TypeScript wrapper: `client/src/lib/liveActivity.ts`
  - Swift plugin: `ios/App/App/Plugins/LiveActivityManager.swift`
  - Widget UI: `ios/App/GospelWidget/LiveActivityWidget.swift`
- **Settings Page Integration**: New "Apple Features" card (iOS only)
  - iCloud Sync toggle with availability check
  - Live Activities toggle with support detection
  - Loading state during availability detection
  - Sync status with last sync time display
  - 2x2 grid of Siri shortcut setup buttons
  - Full error handling with toast notifications
- **Gospel Presentation System**: Complete evangelism feature with strategic placement
  - `GospelPage.tsx`: 4-step immersive presentation (God's Love, Our Problem, God's Solution, Your Response)
  - Step-by-step swiping with beautiful gradients and Scripture backing
  - Decision moment with three clear options: Accept Jesus, Already Know Him, Learn More
  - Guided salvation prayer with progressive text reveal
  - Celebration screen with confetti animation and "What Just Happened" explanation
  - `NewBelieverPage.tsx`: 6 next steps for new believers with progress tracking
  - Homepage integration: Prominent "Good News" card entry point
  - Feelings page integration: Gospel prompt appears for seeking emotions (Lost, Empty, Searching, etc.)
  - Share decision functionality via native share sheet
  - Saves salvation date to localStorage for future reference