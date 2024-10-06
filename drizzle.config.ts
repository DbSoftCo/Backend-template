import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

export default defineConfig({
  schema: './src/database/drizzle/schemas/**.schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.DATABASE_HOST as string,
    port: +process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER as string,
    password: process.env.DATABASE_PASSWORD as string,
    database: process.env.DATABASE_NAME as string,
  },
});
