import { type User, type InsertUser, type Subscriber, type InsertSubscriber, type AppUser, type InsertAppUser, type Friendship, type InsertFriendship, type Donation, type InsertDonation, users, subscribers, appUsers, friendships, donations } from "@shared/schema";
import { randomUUID } from "crypto";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq, or, and, ilike, sql } from "drizzle-orm";

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
  
  // App User methods
  getAppUser(id: string): Promise<AppUser | undefined>;
  getAppUserByEmail(email: string): Promise<AppUser | undefined>;
  createAppUser(data: InsertAppUser): Promise<AppUser>;
  updateAppUser(id: string, data: Partial<InsertAppUser>): Promise<AppUser>;
  searchAppUsers(query: string): Promise<AppUser[]>;
  deleteAppUser(id: string): Promise<boolean>;
  
  // Friends methods  
  getFriendship(requesterId: string, addresseeId: string): Promise<Friendship | undefined>;
  createFriendRequest(requesterId: string, addresseeId: string): Promise<Friendship>;
  updateFriendshipStatus(friendshipId: string, status: 'pending' | 'accepted' | 'declined' | 'blocked'): Promise<Friendship>;
  getFriends(userId: string): Promise<AppUser[]>;
  getFriendRequests(userId: string): Promise<{incoming: {friendshipId: string, user: AppUser}[], outgoing: {friendshipId: string, user: AppUser}[]}>;
  removeFriend(userId: string, friendId: string): Promise<void>;
  
  // Donation methods
  recordDonation(donation: InsertDonation): Promise<Donation>;
  getAllDonations(): Promise<Donation[]>;
  getDonationByPaymentIntent(paymentIntentId: string): Promise<Donation | undefined>;
  getDonationStats(): Promise<{ totalDonations: number; biblesPurchased: number }>;
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

  // App User methods
  async getAppUser(id: string): Promise<AppUser | undefined> {
    const result = await this.db.select().from(appUsers).where(eq(appUsers.id, id));
    return result[0];
  }

  async getAppUserByEmail(email: string): Promise<AppUser | undefined> {
    const result = await this.db.select().from(appUsers).where(eq(appUsers.email, email));
    return result[0];
  }

  async createAppUser(data: InsertAppUser): Promise<AppUser> {
    const result = await this.db.insert(appUsers).values(data).returning();
    return result[0];
  }

  async updateAppUser(id: string, data: Partial<InsertAppUser>): Promise<AppUser> {
    const result = await this.db
      .update(appUsers)
      .set(data)
      .where(eq(appUsers.id, id))
      .returning();
    return result[0];
  }

  async searchAppUsers(query: string): Promise<AppUser[]> {
    const searchTerm = `%${query}%`;
    const result = await this.db
      .select()
      .from(appUsers)
      .where(
        or(
          ilike(appUsers.firstName, searchTerm),
          ilike(appUsers.lastName, searchTerm),
          ilike(appUsers.email, searchTerm)
        )
      )
      .limit(20);
    return result;
  }

  async deleteAppUser(id: string): Promise<boolean> {
    try {
      // Delete related friendships first to maintain referential integrity
      await this.db
        .delete(friendships)
        .where(
          or(
            eq(friendships.requesterId, id),
            eq(friendships.addresseeId, id)
          )
        );
      
      // Delete the user account
      const result = await this.db
        .delete(appUsers)
        .where(eq(appUsers.id, id))
        .returning();
      
      return result.length > 0;
    } catch (error) {
      console.error('Error deleting app user:', error);
      return false;
    }
  }

  // Friends methods
  async getFriendship(requesterId: string, addresseeId: string): Promise<Friendship | undefined> {
    const result = await this.db
      .select()
      .from(friendships)
      .where(
        or(
          and(eq(friendships.requesterId, requesterId), eq(friendships.addresseeId, addresseeId)),
          and(eq(friendships.requesterId, addresseeId), eq(friendships.addresseeId, requesterId))
        )
      );
    return result[0];
  }

  async createFriendRequest(requesterId: string, addresseeId: string): Promise<Friendship> {
    // Ensure canonical ordering for uniqueness while preserving initiator
    const [sortedRequester, sortedAddressee] = requesterId < addresseeId ? [requesterId, addresseeId] : [addresseeId, requesterId];
    
    const result = await this.db
      .insert(friendships)
      .values({
        requesterId: sortedRequester,
        addresseeId: sortedAddressee,
        initiatorId: requesterId, // Preserve who actually sent the request
        status: "pending"
      })
      .returning();
    return result[0];
  }

  async updateFriendshipStatus(friendshipId: string, status: 'pending' | 'accepted' | 'declined' | 'blocked'): Promise<Friendship> {
    const result = await this.db
      .update(friendships)
      .set({ status: status as any, updatedAt: new Date() })
      .where(eq(friendships.id, friendshipId))
      .returning();
    return result[0];
  }

  async getFriends(userId: string): Promise<AppUser[]> {
    const result = await this.db
      .select({
        id: appUsers.id,
        firstName: appUsers.firstName,
        lastName: appUsers.lastName,
        email: appUsers.email,
        phone: appUsers.phone,
        birthMonth: appUsers.birthMonth,
        birthDay: appUsers.birthDay,
        joinDate: appUsers.joinDate,
        isActive: appUsers.isActive,
      })
      .from(appUsers)
      .innerJoin(
        friendships,
        or(
          and(eq(friendships.requesterId, userId), eq(appUsers.id, friendships.addresseeId)),
          and(eq(friendships.addresseeId, userId), eq(appUsers.id, friendships.requesterId))
        )
      )
      .where(eq(friendships.status, "accepted"));
    return result;
  }

  async getFriendRequests(userId: string): Promise<{incoming: {friendshipId: string, user: AppUser}[], outgoing: {friendshipId: string, user: AppUser}[]}> {
    // Get all pending friendships involving this user
    const allRequests = await this.db
      .select({
        friendshipId: friendships.id,
        initiatorId: friendships.initiatorId,
        requesterId: friendships.requesterId,
        addresseeId: friendships.addresseeId,
        // User data for the other person
        userId: appUsers.id,
        firstName: appUsers.firstName,
        lastName: appUsers.lastName,
        email: appUsers.email,
        phone: appUsers.phone,
        birthMonth: appUsers.birthMonth,
        birthDay: appUsers.birthDay,
        joinDate: appUsers.joinDate,
        isActive: appUsers.isActive,
      })
      .from(friendships)
      .innerJoin(appUsers, 
        or(
          and(eq(friendships.requesterId, userId), eq(appUsers.id, friendships.addresseeId)),
          and(eq(friendships.addresseeId, userId), eq(appUsers.id, friendships.requesterId))
        )
      )
      .where(and(
        or(
          eq(friendships.requesterId, userId),
          eq(friendships.addresseeId, userId)
        ),
        eq(friendships.status, "pending")
      ));

    const incoming: {friendshipId: string, user: AppUser}[] = [];
    const outgoing: {friendshipId: string, user: AppUser}[] = [];

    for (const request of allRequests) {
      const user: AppUser = {
        id: request.userId,
        firstName: request.firstName,
        lastName: request.lastName,
        email: request.email,
        phone: request.phone,
        birthMonth: request.birthMonth,
        birthDay: request.birthDay,
        joinDate: request.joinDate,
        isActive: request.isActive,
      };

      // Use initiatorId to determine direction (not requesterId/addresseeId due to canonical ordering)
      if (request.initiatorId === userId) {
        // User initiated this request -> outgoing
        outgoing.push({ friendshipId: request.friendshipId, user });
      } else {
        // Someone else initiated this request -> incoming
        incoming.push({ friendshipId: request.friendshipId, user });
      }
    }

    return { incoming, outgoing };
  }

  async removeFriend(userId: string, friendId: string): Promise<void> {
    await this.db
      .delete(friendships)
      .where(
        or(
          and(eq(friendships.requesterId, userId), eq(friendships.addresseeId, friendId)),
          and(eq(friendships.requesterId, friendId), eq(friendships.addresseeId, userId))
        )
      );
  }

  // Donation methods
  async recordDonation(donation: InsertDonation): Promise<Donation> {
    const result = await this.db.insert(donations).values(donation).returning();
    return result[0];
  }

  async getAllDonations(): Promise<Donation[]> {
    const result = await this.db.select().from(donations).orderBy(donations.createdAt);
    return result;
  }

  async getDonationByPaymentIntent(paymentIntentId: string): Promise<Donation | undefined> {
    const result = await this.db
      .select()
      .from(donations)
      .where(eq(donations.paymentIntentId, paymentIntentId));
    return result[0];
  }

  async getDonationStats(): Promise<{ totalDonations: number; biblesPurchased: number }> {
    const result = await this.db.select().from(donations).where(eq(donations.status, 'succeeded'));
    const totalCents = result.reduce((sum, donation) => sum + donation.amountCents, 0);
    const totalDonations = totalCents / 100; // Convert cents to dollars
    
    // Each Bible costs $5 (matching Giving Impact), so calculate how many can be funded
    const biblesPurchased = Math.floor(totalDonations / 5);
    
    return {
      totalDonations,
      biblesPurchased
    };
  }
}

// Fallback memory storage for development
export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private subscribersMap: Map<string, Subscriber>;
  private appUsersMap: Map<string, AppUser>;
  private friendshipsMap: Map<string, Friendship>;
  private donationsMap: Map<string, Donation>;

  constructor() {
    this.users = new Map();
    this.subscribersMap = new Map();
    this.appUsersMap = new Map();
    this.friendshipsMap = new Map();
    this.donationsMap = new Map();
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

  // App User methods
  async getAppUser(id: string): Promise<AppUser | undefined> {
    return this.appUsersMap.get(id);
  }

  async getAppUserByEmail(email: string): Promise<AppUser | undefined> {
    return Array.from(this.appUsersMap.values()).find(user => user.email === email);
  }

  async createAppUser(data: InsertAppUser): Promise<AppUser> {
    const id = randomUUID();
    const appUser: AppUser = {
      id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone || null,
      birthMonth: data.birthMonth || null,
      birthDay: data.birthDay || null,
      joinDate: new Date(),
      isActive: true,
    };
    this.appUsersMap.set(id, appUser);
    return appUser;
  }

  async updateAppUser(id: string, data: Partial<InsertAppUser>): Promise<AppUser> {
    const appUser = this.appUsersMap.get(id);
    if (!appUser) {
      throw new Error(`AppUser with id ${id} not found`);
    }
    const updatedUser = { ...appUser, ...data };
    this.appUsersMap.set(id, updatedUser);
    return updatedUser;
  }

  async searchAppUsers(query: string): Promise<AppUser[]> {
    const searchTerm = query.toLowerCase();
    return Array.from(this.appUsersMap.values())
      .filter(user =>
        user.firstName.toLowerCase().includes(searchTerm) ||
        user.lastName.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
      )
      .slice(0, 20);
  }

  async deleteAppUser(id: string): Promise<boolean> {
    try {
      // Delete related friendships first
      const friendshipsToDelete = Array.from(this.friendshipsMap.entries())
        .filter(([_, friendship]) => 
          friendship.requesterId === id || friendship.addresseeId === id
        );
      
      for (const [friendshipId, _] of friendshipsToDelete) {
        this.friendshipsMap.delete(friendshipId);
      }
      
      // Delete the user account
      return this.appUsersMap.delete(id);
    } catch (error) {
      console.error('Error deleting app user:', error);
      return false;
    }
  }

  // Friends methods
  async getFriendship(requesterId: string, addresseeId: string): Promise<Friendship | undefined> {
    return Array.from(this.friendshipsMap.values()).find(friendship =>
      (friendship.requesterId === requesterId && friendship.addresseeId === addresseeId) ||
      (friendship.requesterId === addresseeId && friendship.addresseeId === requesterId)
    );
  }

  async createFriendRequest(requesterId: string, addresseeId: string): Promise<Friendship> {
    const id = randomUUID();
    const friendship: Friendship = {
      id,
      requesterId,
      addresseeId,
      initiatorId: requesterId,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.friendshipsMap.set(id, friendship);
    return friendship;
  }

  async updateFriendshipStatus(friendshipId: string, status: 'pending' | 'accepted' | 'declined' | 'blocked'): Promise<Friendship> {
    const friendship = this.friendshipsMap.get(friendshipId);
    if (!friendship) {
      throw new Error(`Friendship with id ${friendshipId} not found`);
    }
    friendship.status = status;
    friendship.updatedAt = new Date();
    return friendship;
  }

  async getFriends(userId: string): Promise<AppUser[]> {
    const friendships = Array.from(this.friendshipsMap.values())
      .filter(friendship => 
        friendship.status === "accepted" &&
        (friendship.requesterId === userId || friendship.addresseeId === userId)
      );

    const friendIds = friendships.map(friendship =>
      friendship.requesterId === userId ? friendship.addresseeId : friendship.requesterId
    );

    return Array.from(this.appUsersMap.values())
      .filter(user => friendIds.includes(user.id));
  }

  async getFriendRequests(userId: string): Promise<{incoming: {friendshipId: string, user: AppUser}[], outgoing: {friendshipId: string, user: AppUser}[]}> {
    const pendingFriendships = Array.from(this.friendshipsMap.values())
      .filter(friendship => friendship.status === "pending");

    const incoming: {friendshipId: string, user: AppUser}[] = [];
    const outgoing: {friendshipId: string, user: AppUser}[] = [];

    for (const friendship of pendingFriendships) {
      if (friendship.initiatorId === userId) {
        // User initiated this request -> outgoing
        const user = this.appUsersMap.get(friendship.addresseeId);
        if (user) {
          outgoing.push({ friendshipId: friendship.id, user });
        }
      } else if (friendship.requesterId === userId || friendship.addresseeId === userId) {
        // Someone else initiated this request -> incoming
        const otherUserId = friendship.requesterId === userId ? friendship.addresseeId : friendship.requesterId;
        const user = this.appUsersMap.get(otherUserId);
        if (user) {
          incoming.push({ friendshipId: friendship.id, user });
        }
      }
    }

    return { incoming, outgoing };
  }

  async removeFriend(userId: string, friendId: string): Promise<void> {
    for (const [id, friendship] of Array.from(this.friendshipsMap.entries())) {
      if (
        (friendship.requesterId === userId && friendship.addresseeId === friendId) ||
        (friendship.requesterId === friendId && friendship.addresseeId === userId)
      ) {
        this.friendshipsMap.delete(id);
        return;
      }
    }
  }

  // Donation methods
  async recordDonation(insertDonation: InsertDonation): Promise<Donation> {
    const id = randomUUID();
    const donation: Donation = {
      id,
      amountCents: insertDonation.amountCents,
      currency: insertDonation.currency || "USD",
      paymentIntentId: insertDonation.paymentIntentId,
      status: insertDonation.status || "succeeded",
      createdAt: new Date(),
      metadata: insertDonation.metadata || null,
    };
    this.donationsMap.set(id, donation);
    return donation;
  }

  async getAllDonations(): Promise<Donation[]> {
    return Array.from(this.donationsMap.values()).sort((a, b) => 
      a.createdAt.getTime() - b.createdAt.getTime()
    );
  }

  async getDonationByPaymentIntent(paymentIntentId: string): Promise<Donation | undefined> {
    return Array.from(this.donationsMap.values()).find(
      donation => donation.paymentIntentId === paymentIntentId
    );
  }

  async getDonationStats(): Promise<{ totalDonations: number; biblesPurchased: number }> {
    const donations = Array.from(this.donationsMap.values()).filter(d => d.status === 'succeeded');
    const totalCents = donations.reduce((sum, donation) => sum + donation.amountCents, 0);
    const totalDonations = totalCents / 100; // Convert cents to dollars
    
    // Each Bible costs $5 (matching Giving Impact), so calculate how many can be funded
    const biblesPurchased = Math.floor(totalDonations / 5);
    
    return {
      totalDonations,
      biblesPurchased
    };
  }
}

// Use database storage in production, memory storage as fallback
export const storage = process.env.DATABASE_URL ? new DatabaseStorage() : new MemStorage();
