import { Module } from '@nestjs/common';
import { USER_REPOSITORY, UserRepository } from './repository/user.repository';
import { UsersController } from './controller/users.controller';
import { UserService } from './service/user.service';

@Module({
  controllers: [UsersController],
  providers: [
    UserService,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
  ],
  exports: [UserService],
})
export class UsersModule {}
