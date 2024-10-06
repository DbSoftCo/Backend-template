import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { USER_REPOSITORY, UserRepository } from './repository/user.repository';
import { UsersController } from './controller/users.controller';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
  ],
})
export class UsersModule {}
