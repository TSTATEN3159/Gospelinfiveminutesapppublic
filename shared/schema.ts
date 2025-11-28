import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, pgEnum, unique, uniqueIndex, index, check, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Friendship status enum
export const friendshipStatusEnum = pgEnum('friendship_status', ['pending', 'accepted', 'declined', 'blocked']);

// Blog subscribers table
export const subscribers = pgTable("subscribers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  name: text("name"),
  isActive: boolean("is_active").notNull().default(true),
  subscribedAt: timestamp("subscribed_at").notNull().default(sql`now()`),
  lastEmailSent: timestamp("last_email_sent"),
});

export const insertSubscriberSchema = createInsertSchema(subscribers).pick({
  email: true,
  name: true,
});

export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;
export type Subscriber = typeof subscribers.$inferSelect;

// App users table (for friends functionality)
export const appUsers = pgTable("app_users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  birthMonth: text("birth_month"),
  birthDay: text("birth_day"),
  joinDate: timestamp("join_date").notNull().default(sql`now()`),
  isActive: boolean("is_active").notNull().default(true),
  wantsDailyEmail: boolean("wants_daily_email").notNull().default(false),
});

export const insertAppUserSchema = createInsertSchema(appUsers).pick({
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  birthMonth: true,
  birthDay: true,
});

export type InsertAppUser = z.infer<typeof insertAppUserSchema>;
export type AppUser = typeof appUsers.$inferSelect;

// Friends table (handles friend relationships)
export const friendships = pgTable("friendships", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  requesterId: varchar("requester_id").notNull().references(() => appUsers.id),
  addresseeId: varchar("addressee_id").notNull().references(() => appUsers.id),
  initiatorId: varchar("initiator_id").notNull().references(() => appUsers.id),
  status: friendshipStatusEnum("status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
}, (table) => {
  return {
    uniqueFriendship: uniqueIndex('friendships_unique').on(table.requesterId, table.addresseeId),
    canonicalOrder: check('canonical_order', sql`${table.requesterId} < ${table.addresseeId}`),
    noSelfFriending: check('no_self_friending', sql`${table.requesterId} <> ${table.addresseeId}`),
  };
});

export const insertFriendshipSchema = createInsertSchema(friendships).pick({
  requesterId: true,
  addresseeId: true,
}).extend({
  // Optional status, defaults to 'pending' in database
  status: z.enum(['pending', 'accepted', 'declined', 'blocked']).optional(),
});

export type InsertFriendship = z.infer<typeof insertFriendshipSchema>;
export type Friendship = typeof friendships.$inferSelect;

// Donations table - tracks all successful donations for aggregate statistics
export const donations = pgTable("donations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  amountCents: integer("amount_cents").notNull(), // Store as integer cents for precision
  currency: varchar("currency", { length: 3 }).notNull().default("USD"),
  paymentIntentId: text("payment_intent_id").notNull().unique(), // Stripe payment intent ID
  status: varchar("status", { length: 20 }).notNull().default("succeeded"), // Stripe payment status
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  metadata: text("metadata"), // JSON string for additional payment details
});

export const insertDonationSchema = createInsertSchema(donations).pick({
  amountCents: true,
  currency: true,
  paymentIntentId: true,
  status: true,
  metadata: true,
});

export type InsertDonation = z.infer<typeof insertDonationSchema>;
export type Donation = typeof donations.$inferSelect;

// Contacts table - stores imported contacts from device
export const contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  ownerId: varchar("owner_id").notNull().references(() => appUsers.id), // User who imported this contact
  contactId: text("contact_id"), // Device contact ID for updates/deletes
  firstName: text("first_name"),
  lastName: text("last_name"), 
  displayName: text("display_name"),
  email: text("email"),
  phone: text("phone"),
  isAppUser: boolean("is_app_user").notNull().default(false), // Whether this contact is also an app user
  appUserId: varchar("app_user_id").references(() => appUsers.id), // Reference to app user if they exist
  importedAt: timestamp("imported_at").notNull().default(sql`now()`),
  lastSyncedAt: timestamp("last_synced_at").notNull().default(sql`now()`),
});

export const insertContactSchema = createInsertSchema(contacts).pick({
  ownerId: true,
  contactId: true,
  firstName: true,
  lastName: true,
  displayName: true,
  email: true,
  phone: true,
  isAppUser: true,
  appUserId: true,
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;

// Bible verse shares table - tracks verse sharing between friends
export const verseShares = pgTable("verse_shares", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  senderId: varchar("sender_id").notNull().references(() => appUsers.id),
  receiverId: varchar("receiver_id").notNull().references(() => appUsers.id),
  verseText: text("verse_text").notNull(),
  verseReference: text("verse_reference").notNull(),
  imageUrl: text("image_url"), // URL to generated verse image
  message: text("message"), // Optional personal message from sender
  isRead: boolean("is_read").notNull().default(false),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertVerseShareSchema = createInsertSchema(verseShares).pick({
  senderId: true,
  receiverId: true,
  verseText: true,
  verseReference: true,
  imageUrl: true,
  message: true,
});

export type InsertVerseShare = z.infer<typeof insertVerseShareSchema>;
export type VerseShare = typeof verseShares.$inferSelect;

// Bible Reading Plans - Fixed plans for different durations
export const planTypeEnum = pgEnum('plan_type', ['1yr-whole', '6mo-ot', '6mo-nt']);

export const readingPlans = pgTable("reading_plans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  planType: planTypeEnum("plan_type").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  durationDays: integer("duration_days").notNull(),
  totalReadings: integer("total_readings").notNull(),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertReadingPlanSchema = createInsertSchema(readingPlans).pick({
  planType: true,
  title: true,
  description: true,
  durationDays: true,
  totalReadings: true,
});

export type InsertReadingPlan = z.infer<typeof insertReadingPlanSchema>;
export type ReadingPlan = typeof readingPlans.$inferSelect;

// Reading Plan Progress - Tracks which readings users have completed
export const readingProgress = pgTable("reading_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => appUsers.id),
  planType: planTypeEnum("plan_type").notNull(),
  dayNumber: integer("day_number").notNull(), // 1-365 for 1yr, 1-180 for 6mo
  scriptureReferences: text("scripture_references").notNull(), // e.g., "Genesis 1-3"
  completedAt: timestamp("completed_at").notNull().default(sql`now()`),
}, (table) => {
  return {
    uniqueUserPlanDay: uniqueIndex('reading_progress_unique').on(table.userId, table.planType, table.dayNumber),
  };
});

export const insertReadingProgressSchema = createInsertSchema(readingProgress).pick({
  userId: true,
  planType: true,
  dayNumber: true,
  scriptureReferences: true,
});

export type InsertReadingProgress = z.infer<typeof insertReadingProgressSchema>;
export type ReadingProgress = typeof readingProgress.$inferSelect;

// Devotional Progress - Tracks which devotional days users have completed and their streaks
export const devotionalProgress = pgTable("devotional_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => appUsers.id),
  day: integer("day").notNull(), // 1-365
  completedAt: timestamp("completed_at").notNull().default(sql`now()`),
}, (table) => {
  return {
    uniqueUserDay: uniqueIndex('devotional_progress_unique').on(table.userId, table.day),
  };
});

export const insertDevotionalProgressSchema = createInsertSchema(devotionalProgress).pick({
  userId: true,
  day: true,
});

export type InsertDevotionalProgress = z.infer<typeof insertDevotionalProgressSchema>;
export type DevotionalProgress = typeof devotionalProgress.$inferSelect;

// Text position enum for verse images
export const textPositionEnum = pgEnum('text_position', ['top', 'center', 'bottom']);

// Verse Image Templates - Stores compact render settings for generated Scripture images
export const verseImages = pgTable("verse_images", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => appUsers.id, { onDelete: 'cascade' }), // Optional - null if anonymous/guest
  verseText: text("verse_text").notNull(),
  verseReference: text("verse_reference").notNull(),
  backgroundId: text("background_id").notNull(), // e.g., 'mountain', 'ocean', 'storm', 'sky', 'bridge', 'lake'
  textPosition: textPositionEnum("text_position").notNull().default('center'),
  textColor: text("text_color").notNull().default('#FFFFFF'),
  fontSize: integer("font_size").notNull().default(32),
  fontFamily: text("font_family").notNull().default('Crimson Text'),
  textShadow: boolean("text_shadow").notNull().default(true),
  imageUrl: text("image_url"), // PNG URL if generated and stored
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
}, (table) => {
  return {
    userIdCreatedAtIdx: index('verse_images_user_created_idx').on(table.userId, table.createdAt),
  };
});

export const insertVerseImageSchema = createInsertSchema(verseImages).pick({
  userId: true,
  verseText: true,
  verseReference: true,
  backgroundId: true,
  textPosition: true,
  textColor: true,
  fontSize: true,
  fontFamily: true,
  textShadow: true,
  imageUrl: true,
});

export type InsertVerseImage = z.infer<typeof insertVerseImageSchema>;
export type VerseImage = typeof verseImages.$inferSelect;

// Community Posts - Public feed of shared verse images (opt-in only)
export const communityPosts = pgTable("community_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => appUsers.id, { onDelete: 'cascade' }), // Optional - null if anonymous
  userName: text("user_name"), // Display name for anonymous users
  verseImageId: varchar("verse_image_id").notNull().references(() => verseImages.id, { onDelete: 'cascade' }),
  caption: text("caption"), // Optional user caption/reflection
  isPublic: boolean("is_public").notNull().default(false), // User must opt-in
  userConsent: boolean("user_consent").notNull().default(false), // Explicit consent to share
  consentAt: timestamp("consent_at"), // When user gave consent (for audit trail)
  viewCount: integer("view_count").notNull().default(0),
  likeCount: integer("like_count").notNull().default(0),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  expiresAt: timestamp("expires_at").notNull().default(sql`now() + interval '30 days'`), // 30-day retention
  isReported: boolean("is_reported").notNull().default(false), // Abuse flag
}, (table) => {
  return {
    publicExpiresIdx: index('community_posts_public_expires_idx').on(table.isPublic, table.expiresAt),
    userCreatedIdx: index('community_posts_user_created_idx').on(table.userId, table.createdAt),
    // CHECK: is_public requires user_consent
    publicRequiresConsent: check('public_requires_consent', sql`(NOT ${table.isPublic}) OR ${table.userConsent}`),
    // CHECK: anonymous posts must supply user_name
    anonymousRequiresName: check('anonymous_requires_name', sql`${table.userId} IS NOT NULL OR ${table.userName} IS NOT NULL`),
  };
});

export const insertCommunityPostSchema = createInsertSchema(communityPosts).pick({
  userId: true,
  userName: true,
  verseImageId: true,
  caption: true,
  isPublic: true,
  userConsent: true,
  consentAt: true,
});

export type InsertCommunityPost = z.infer<typeof insertCommunityPostSchema>;
export type CommunityPost = typeof communityPosts.$inferSelect;

// Abuse Reports - Track reports on community posts for moderation
export const abuseReports = pgTable("abuse_reports", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  communityPostId: varchar("community_post_id").notNull().references(() => communityPosts.id, { onDelete: 'cascade' }),
  reporterId: varchar("reporter_id").references(() => appUsers.id, { onDelete: 'set null' }), // Optional - can be anonymous
  reason: text("reason").notNull(), // e.g., 'inappropriate', 'spam', 'offensive'
  details: text("details"), // Additional context from reporter
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertAbuseReportSchema = createInsertSchema(abuseReports).pick({
  communityPostId: true,
  reporterId: true,
  reason: true,
  details: true,
});

export type InsertAbuseReport = z.infer<typeof insertAbuseReportSchema>;
export type AbuseReport = typeof abuseReports.$inferSelect;

// API Usage Log - Track external API usage for rate limiting
export const apiUsageLog = pgTable("api_usage_log", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  service: text("service").notNull(), // 'api_bible', 'openai', 'bolls', 'getcontext'
  endpoint: text("endpoint").notNull(), // e.g., 'gpt-4o-mini', 'verse_lookup'
  success: boolean("success").notNull().default(true),
  costUsd: text("cost_usd").notNull().default('0'), // Store as text for precision
  metadata: text("metadata"), // JSON string with additional details
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
}, (table) => {
  return {
    serviceCreatedIdx: index('api_usage_log_service_created_idx').on(table.service, table.createdAt),
    createdIdx: index('api_usage_log_created_idx').on(table.createdAt),
  };
});

export const insertApiUsageLogSchema = createInsertSchema(apiUsageLog).pick({
  service: true,
  endpoint: true,
  success: true,
  costUsd: true,
  metadata: true,
});

export type InsertApiUsageLog = z.infer<typeof insertApiUsageLogSchema>;
export type ApiUsageLog = typeof apiUsageLog.$inferSelect;

// Bible Trivia Stats - Track user progress, streaks, titles, mastery, and power-ups
export const triviaStats = pgTable("trivia_stats", {
  userId: varchar("user_id").primaryKey(),
  displayName: text("display_name").notNull().default("Guest"),
  dailyStreak: integer("daily_streak").notNull().default(0),
  lastDailyDate: text("last_daily_date"),
  dailyCrowns: integer("daily_crowns").notNull().default(0),
  highestTitle: text("highest_title").notNull().default("None"),
  
  // Mastery percentages (0-100)
  masteryOldTestament: integer("mastery_old_testament").notNull().default(0),
  masteryGospels: integer("mastery_gospels").notNull().default(0),
  masteryEpistles: integer("mastery_epistles").notNull().default(0),
  masteryProphecy: integer("mastery_prophecy").notNull().default(0),
  masteryPeopleOfGod: integer("mastery_people_of_god").notNull().default(0),
  masteryGeography: integer("mastery_geography").notNull().default(0),
  
  // Power-ups inventory
  powerUpSecondChance: integer("power_up_second_chance").notNull().default(3),
  powerUpRevealScripture: integer("power_up_reveal_scripture").notNull().default(2),
  powerUpRemoveTwo: integer("power_up_remove_two").notNull().default(2),
  
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

export const insertTriviaStatsSchema = createInsertSchema(triviaStats).pick({
  userId: true,
  displayName: true,
});

export type InsertTriviaStats = z.infer<typeof insertTriviaStatsSchema>;
export type TriviaStatsRecord = typeof triviaStats.$inferSelect;

// Friend invitation status enum
export const invitationStatusEnum = pgEnum('invitation_status', ['pending', 'accepted', 'expired', 'cancelled']);

// Friend Invitations - Manual friend invitation system
export const friendInvitations = pgTable("friend_invitations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  inviterUserId: varchar("inviter_user_id").notNull().references(() => appUsers.id),
  inviteeName: text("invitee_name").notNull(), // First name of the invited friend
  inviteeEmail: text("invitee_email").notNull(), // Email of the invited friend
  status: invitationStatusEnum("status").notNull().default("pending"),
  inviteToken: varchar("invite_token").notNull().unique(), // Unique token for tracking invitation
  message: text("message"), // Optional personal message
  notifiedOnJoin: boolean("notified_on_join").notNull().default(false), // Whether inviter was notified when friend joined
  joinedUserId: varchar("joined_user_id").references(() => appUsers.id), // The user ID when they join
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  expiresAt: timestamp("expires_at").notNull().default(sql`now() + interval '30 days'`),
}, (table) => {
  return {
    inviterEmailIdx: index('friend_invitations_inviter_email_idx').on(table.inviterUserId, table.inviteeEmail),
  };
});

export const insertFriendInvitationSchema = createInsertSchema(friendInvitations).pick({
  inviterUserId: true,
  inviteeName: true,
  inviteeEmail: true,
  message: true,
});

export type InsertFriendInvitation = z.infer<typeof insertFriendInvitationSchema>;
export type FriendInvitation = typeof friendInvitations.$inferSelect;

// Reading Activity - Tracks what users are reading for sharing with friends
export const readingActivity = pgTable("reading_activity", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => appUsers.id),
  activityType: text("activity_type").notNull(), // 'verse_read', 'devotional', 'plan_progress', 'bible_study'
  reference: text("reference").notNull(), // e.g., "John 3:16", "Day 5 of Salvation Plan"
  details: text("details"), // JSON with additional context
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
}, (table) => {
  return {
    userCreatedIdx: index('reading_activity_user_created_idx').on(table.userId, table.createdAt),
  };
});

export const insertReadingActivitySchema = createInsertSchema(readingActivity).pick({
  userId: true,
  activityType: true,
  reference: true,
  details: true,
});

export type InsertReadingActivity = z.infer<typeof insertReadingActivitySchema>;
export type ReadingActivity = typeof readingActivity.$inferSelect;

// User Privacy Settings - Controls what friends can see
export const userPrivacySettings = pgTable("user_privacy_settings", {
  userId: varchar("user_id").primaryKey().references(() => appUsers.id),
  shareReadingActivity: boolean("share_reading_activity").notNull().default(false), // Allow friends to see reading activity
  shareDevotionalProgress: boolean("share_devotional_progress").notNull().default(false),
  sharePlanProgress: boolean("share_plan_progress").notNull().default(false),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

export const insertUserPrivacySettingsSchema = createInsertSchema(userPrivacySettings).pick({
  userId: true,
  shareReadingActivity: true,
  shareDevotionalProgress: true,
  sharePlanProgress: true,
});

export type InsertUserPrivacySettings = z.infer<typeof insertUserPrivacySettingsSchema>;
export type UserPrivacySettings = typeof userPrivacySettings.$inferSelect;
