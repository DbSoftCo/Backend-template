import { Factory } from '@mikro-orm/seeder';
import { faker } from '@faker-js/faker';
import { User } from '@src/users/entities/user.entity';
import { USER_ROLE } from '@src/users/types/user';

export class UserFactory extends Factory<User> {
  model = User;

  definition(): User {
    return {
      password: faker.internet.password(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      role: faker.helpers.enumValue(USER_ROLE),
    };
  }
}
