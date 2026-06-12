import { pgTable, uuid, varchar, text, timestamp, boolean, jsonb } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const oauthClients = pgTable('oauth_clients', {
  id: uuid('id').defaultRandom().primaryKey(),
  clientId: varchar('client_id').notNull().unique(),
  clientSecret: text('client_secret').notNull(),
  name: varchar('name').notNull(),
  redirectUris: jsonb('redirect_uris').notNull(), // array of strings
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const authorizationCodes = pgTable('authorization_codes', {
  id: uuid('id').defaultRandom().primaryKey(),
  code: varchar('code').notNull().unique(),
  clientId: uuid('client_id').notNull().references(() => oauthClients.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  scope: text('scope'),
  redirectUri: varchar('redirect_uri'), // To validate against when token is requested
  nonce: varchar('nonce'),
  expiresAt: timestamp('expires_at').notNull(),
});

export const sessions = pgTable('sessions', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  expiresAt: timestamp('expires_at').notNull(),
});

export const signingKeys = pgTable('signing_keys', {
  id: uuid('id').defaultRandom().primaryKey(),
  kid: varchar('kid').notNull().unique(),
  privateKey: text('private_key').notNull(),
  publicKey: text('public_key').notNull(),
  active: boolean('active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
