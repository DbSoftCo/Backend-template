import { Module } from '@nestjs/common';
import { USER_REPOSITORY, UserRepository } from './repository/user.repository';
import { UsersController } from './controller/users.controller';
import { UserService } from './service/user.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from './entities/user.entity';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [User] })],
  controllers: [UsersController],
  providers: [
    UserService,
  ],
  exports: [UserService],
})
export class UsersModule {}
