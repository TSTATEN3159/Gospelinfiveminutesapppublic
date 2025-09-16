# The Gospel in 5 Minutes - Mobile Bible App

## Overview

"The Gospel in 5 Minutes" is a mobile-first spiritual wellness application that provides daily Bible verses, emotional scripture guidance, and AI-powered biblical Q&A. The app combines the peaceful aesthetic of wellness apps like Headspace with the functionality of Bible apps like YouVersion, focusing on delivering meaningful spiritual content in digestible 5-minute sessions.

The application features a clean, card-based interface with soft gradients and spiritual imagery, designed to create a calming user experience. Core functionality includes daily verse delivery, emotion-based scripture recommendations, AI pastor chat, Bible search capabilities, and gamified streak tracking with achievement badges.

## User Preferences

Preferred communication style: Simple, everyday language.

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