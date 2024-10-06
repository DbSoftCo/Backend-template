import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { usersSchema } from './users.schema';

export const otpSchema = pgTable('roles', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .references(() => usersSchema.id)
    .notNull(),
  otpCode: text('otp_code').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  expiresAt: timestamp('expires_at').notNull(), // Tiempo de expiración del OTP
  used: boolean('used').default(false),
});
