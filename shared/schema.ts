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
