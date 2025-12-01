import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const books = sqliteTable('books', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  bookNumber: integer('book_number').notNull(),
  coverImageUrl: text('cover_image_url'),
  summary: text('summary'),
  setting: text('setting'),
  hooplaLink: text('hoopla_link'),
  fableLink: text('fable_link'),
  buyLink: text('buy_link'),
  barnesNobleLink: text('barnes_noble_link'),
  authorWebsiteLink: text('author_website_link'),
  youtubeVideos: text('youtube_videos', { mode: 'json' }),
  createdAt: text('created_at').notNull(),
});

export const characters = sqliteTable('characters', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description'),
  species: text('species'),
  type: text('type'),
  appearsInBooks: text('appears_in_books', { mode: 'json' }),
  createdAt: text('created_at').notNull(),
});

export const reviews = sqliteTable('reviews', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull(),
  bookId: integer('book_id').references(() => books.id).notNull(),
  rating: integer('rating').notNull(),
  reviewText: text('review_text'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const discussions = sqliteTable('discussions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull(),
  bookId: integer('book_id').references(() => books.id).notNull(),
  parentId: integer('parent_id').references(() => discussions.id),
  content: text('content').notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const userPoints = sqliteTable('user_points', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull().unique(),
  totalPoints: integer('total_points').notNull().default(0),
  reviewsCount: integer('reviews_count').notNull().default(0),
  discussionsCount: integer('discussions_count').notNull().default(0),
  updatedAt: text('updated_at').notNull(),
});

export const bookClubKits = sqliteTable('book_club_kits', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  bookId: integer('book_id').references(() => books.id).notNull(),
  title: text('title').notNull(),
  pdfUrl: text('pdf_url').notNull(),
  description: text('description'),
  createdAt: text('created_at').notNull(),
});

export const user = sqliteTable('user', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  emailVerified: integer('email_verified', { mode: 'boolean' }).notNull().default(false),
  name: text('name'),
  image: text('image'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const session = sqliteTable('session', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => user.id),
  expiresAt: text('expires_at').notNull(),
  token: text('token').notNull().unique(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const account = sqliteTable('account', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => user.id),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  expiresAt: text('expires_at'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const verification = sqliteTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: text('expires_at').notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});