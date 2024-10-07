import { EntityRepository } from '@mikro-orm/postgresql';
import { User } from '../entities/user.entity';

export const USER_REPOSITORY = Symbol('userRepository');

export class UserRepository extends EntityRepository<User> {
  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.findOne({ email });
  }
}
