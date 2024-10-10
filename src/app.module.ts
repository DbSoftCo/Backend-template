import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import mikroOrmConfig from '../mikro-orm.config';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    MikroOrmModule.forRoot({ ...mikroOrmConfig, allowGlobalContext: true }),
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
