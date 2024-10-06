import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import { Pool } from 'pg';
import * as schema from './drizzle/schemas/schema';
import { DrizzleDb } from './drizzle/types/drizzle';

export const DRIZZLE = Symbol('drizzle-connection');

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: DRIZZLE,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const pool = new Pool({
          host: configService.get<string>('DATABASE_HOST'),
          port: configService.get<number>('DATABASE_PORT'),
          user: configService.get<string>('DATABASE_USER'),
          password: configService.get<string>('DATABASE_PASSWORD'),
          database: configService.get<string>('DATABASE_NAME'),
        });

        const db = drizzle(pool, { schema });
        return db as DrizzleDb;
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DatabaseModule {}
