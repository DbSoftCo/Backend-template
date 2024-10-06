import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE } from 'src/database/database.module';
import { usersSchema } from 'src/database/drizzle/schemas/users.schema';
import { DrizzleDb } from 'src/database/drizzle/types/drizzle';

export const USER_REPOSITORY = Symbol('userRepository');

@Injectable()
export class UserRepository {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDb) {}

  async findById(id: string) {
    return await this.db.query.usersSchema.findFirst({
      where: eq(usersSchema.id, id),
    });
  }

  async findByEmail(email: string) {
    return await this.db.query.usersSchema.findFirst({
      where: eq(usersSchema.email, email),
    });
  }

  async find() {
    return await this.db.query.usersSchema.findMany();
  }
}
