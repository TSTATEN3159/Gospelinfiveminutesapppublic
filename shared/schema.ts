import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, pgEnum, unique, uniqueIndex, check, integer } from "drizzle-orm/pg-core";
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

// Bible studies enums
export const studyDifficultyEnum = pgEnum('study_difficulty', ['Beginner', 'Intermediate', 'Advanced']);
export const languageEnum = pgEnum('language', ['en', 'es', 'fr', 'pt', 'zh', 'ar', 'hi']);

// Study topics table - core study metadata
export const studyTopics = pgTable("study_topics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(), // URL-friendly identifier
  defaultLanguage: languageEnum("default_language").notNull().default('en'),
  isFeatured: boolean("is_featured").notNull().default(false),
  isPublished: boolean("is_published").notNull().default(true),
  lessonsCount: integer("lessons_count").notNull(), // Total number of lessons in study
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

// Study translations table - localized study content
export const studyTranslations = pgTable("study_translations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studyId: varchar("study_id").notNull().references(() => studyTopics.id, { onDelete: 'cascade' }),
  language: languageEnum("language").notNull(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // e.g., "Discipleship", "Prayer", "Character"
  duration: text("duration").notNull(), // e.g., "30 days", "14 days"
  difficulty: studyDifficultyEnum("difficulty").notNull(),
  heroImageUrl: text("hero_image_url"),
}, (table) => {
  return {
    uniqueStudyLanguage: unique('unique_study_language').on(table.studyId, table.language),
  };
});

// Study lessons table - lesson metadata
export const studyLessons = pgTable("study_lessons", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studyId: varchar("study_id").notNull().references(() => studyTopics.id, { onDelete: 'cascade' }),
  dayNumber: integer("day_number").notNull(), // 1-based day number
  isPublished: boolean("is_published").notNull().default(true),
  audioUrl: text("audio_url"), // Optional audio version
  videoUrl: text("video_url"), // Optional video version
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
}, (table) => {
  return {
    uniqueStudyDay: unique('unique_study_day').on(table.studyId, table.dayNumber),
  };
});

// Lesson translations table - localized lesson content
export const lessonTranslations = pgTable("lesson_translations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  lessonId: varchar("lesson_id").notNull().references(() => studyLessons.id, { onDelete: 'cascade' }),
  language: languageEnum("language").notNull(),
  title: text("title").notNull(),
  verseReference: text("verse_reference").notNull(), // e.g., "Matthew 11:28-30"
  verseText: text("verse_text").notNull(), // Full verse text
  content: text("content").notNull(), // Main lesson body
  reflectionQuestions: text("reflection_questions").notNull(), // JSON array of questions
  prayer: text("prayer").notNull(), // Closing prayer
}, (table) => {
  return {
    uniqueLessonLanguage: unique('unique_lesson_language').on(table.lessonId, table.language),
  };
});

// Insert schemas and types
export const insertStudyTopicSchema = createInsertSchema(studyTopics).omit({ id: true, createdAt: true, updatedAt: true });
export const insertStudyTranslationSchema = createInsertSchema(studyTranslations).omit({ id: true });
export const insertStudyLessonSchema = createInsertSchema(studyLessons).omit({ id: true, createdAt: true });
export const insertLessonTranslationSchema = createInsertSchema(lessonTranslations).omit({ id: true });

export type InsertStudyTopic = z.infer<typeof insertStudyTopicSchema>;
export type StudyTopic = typeof studyTopics.$inferSelect;
export type InsertStudyTranslation = z.infer<typeof insertStudyTranslationSchema>;
export type StudyTranslation = typeof studyTranslations.$inferSelect;
export type InsertStudyLesson = z.infer<typeof insertStudyLessonSchema>;
export type StudyLesson = typeof studyLessons.$inferSelect;
export type InsertLessonTranslation = z.infer<typeof insertLessonTranslationSchema>;
export type LessonTranslation = typeof lessonTranslations.$inferSelect;

// Bible trivia enums
export const triviaDifficultyEnum = pgEnum('trivia_difficulty', ['easy', 'medium', 'difficult']);

// Trivia questions table - stores all trivia questions
export const triviaQuestions = pgTable("trivia_questions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  language: languageEnum("language").notNull().default('en'),
  difficulty: triviaDifficultyEnum("difficulty").notNull(),
  question: text("question").notNull(),
  options: text("options").array().notNull(), // Array of 4 answer options
  correctAnswer: integer("correct_answer").notNull(), // Index (0-3) of correct option
  verseReference: text("verse_reference"), // Optional Bible verse reference (e.g., "GEN.1.3")
  category: text("category"), // Optional category (e.g., "Old Testament", "New Testament", "Prophets")
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertTriviaQuestionSchema = createInsertSchema(triviaQuestions).omit({ id: true, createdAt: true });

export type InsertTriviaQuestion = z.infer<typeof insertTriviaQuestionSchema>;
export type TriviaQuestion = typeof triviaQuestions.$inferSelect;
