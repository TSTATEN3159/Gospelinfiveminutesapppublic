import { type User, type InsertUser, type Subscriber, type InsertSubscriber, users, subscribers } from "@shared/schema";
import { randomUUID } from "crypto";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";

// Storage interface with user and subscriber management

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  // Subscriber methods
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
  getSubscriber(email: string): Promise<Subscriber | undefined>;
  getAllActiveSubscribers(): Promise<Subscriber[]>;
  unsubscribe(email: string): Promise<boolean>;
  updateLastEmailSent(email: string): Promise<boolean>;
}

// Database storage implementation
export class DatabaseStorage implements IStorage {
  private db;

  constructor() {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL environment variable is required");
    }
    
    // Use HTTP-based Neon client (no WebSockets required)
    const sql = neon(process.env.DATABASE_URL);
    this.db = drizzle(sql);
  }

  async getUser(id: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await this.db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async createSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    const result = await this.db.insert(subscribers).values(insertSubscriber).returning();
    return result[0];
  }

  async getSubscriber(email: string): Promise<Subscriber | undefined> {
    const result = await this.db.select().from(subscribers).where(eq(subscribers.email, email));
    return result[0];
  }

  async getAllActiveSubscribers(): Promise<Subscriber[]> {
    const result = await this.db.select().from(subscribers).where(eq(subscribers.isActive, true));
    return result;
  }

  async unsubscribe(email: string): Promise<boolean> {
    const result = await this.db
      .update(subscribers)
      .set({ isActive: false })
      .where(eq(subscribers.email, email))
      .returning();
    return result.length > 0;
  }

  async updateLastEmailSent(email: string): Promise<boolean> {
    const result = await this.db
      .update(subscribers)
      .set({ lastEmailSent: new Date() })
      .where(eq(subscribers.email, email))
      .returning();
    return result.length > 0;
  }
}

// Fallback memory storage for development
export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private subscribersMap: Map<string, Subscriber>;

  constructor() {
    this.users = new Map();
    this.subscribersMap = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    const id = randomUUID();
    const subscriber: Subscriber = {
      id,
      email: insertSubscriber.email,
      name: insertSubscriber.name || null,
      isActive: true,
      subscribedAt: new Date(),
      lastEmailSent: null,
    };
    this.subscribersMap.set(subscriber.email, subscriber);
    return subscriber;
  }

  async getSubscriber(email: string): Promise<Subscriber | undefined> {
    return this.subscribersMap.get(email);
  }

  async getAllActiveSubscribers(): Promise<Subscriber[]> {
    return Array.from(this.subscribersMap.values()).filter(sub => sub.isActive);
  }

  async unsubscribe(email: string): Promise<boolean> {
    const subscriber = this.subscribersMap.get(email);
    if (subscriber) {
      subscriber.isActive = false;
      return true;
    }
    return false;
  }

  async updateLastEmailSent(email: string): Promise<boolean> {
    const subscriber = this.subscribersMap.get(email);
    if (subscriber) {
      subscriber.lastEmailSent = new Date();
      return true;
    }
    return false;
  }
}

// Use database storage in production, memory storage as fallback
export const storage = process.env.DATABASE_URL ? new DatabaseStorage() : new MemStorage();
