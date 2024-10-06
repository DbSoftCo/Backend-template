import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const rolesSchema = pgTable('roles', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull().unique(), // Ejemplo: 'admin', 'user', 'moderator'
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
});
