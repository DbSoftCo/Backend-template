import { IsEmail } from 'class-validator';
import {
  Entity,
  EntityRepositoryType,
  Enum,
  Property,
} from '@mikro-orm/postgresql';
import { UserRepository } from '../repository/user.repository';
import { USER_ROLE } from '../types/user';
import { BaseEntity } from '@src/common/entities/base.entity';
import { hashSync } from 'bcryptjs';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';

@ApiExtraModels(BaseEntity)
@Entity({ repository: () => UserRepository })
export class User extends BaseEntity {
  [EntityRepositoryType]?: UserRepository;

  @ApiProperty({
    description: 'The username',
    example: faker.internet.userName(),
  })
  @Property({ type: String, index: true, unique: true })
  username: string;

  @ApiProperty({
    description: 'The username',
    example: faker.internet.email(),
  })
  @Property({ type: String, hidden: true, index: true, unique: true })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The user password',
    example: faker.internet.password(),
  })
  @Property({ type: String, hidden: true })
  password: string;

  @ApiProperty({
    description: 'The user role',
    example: faker.helpers.enumValue(USER_ROLE),
    enum: USER_ROLE,
    type: String,
  })
  @Enum(() => USER_ROLE)
  role!: USER_ROLE; // string enum

  constructor(
    username: string,
    email: string,
    password: string,
    role: USER_ROLE,
  ) {
    super();
    this.username = username;
    this.email = email;
    this.password = hashSync(password, 10);
    this.role = role;
  }
}
