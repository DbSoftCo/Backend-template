import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { UsersModule } from '@src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './service/passport.locale.service';
import { JwtStrategy } from './service/passport.jwt.service';
import { OtpService } from './service/otp.service';
import { OtpController } from './controller/otp.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '@src/users/entities/user.entity';
import { Otp } from './entities/otp.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature({ entities: [User, Otp] }),
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'jwtConstants.secret',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController, OtpController],
  providers: [AuthService, LocalStrategy, JwtStrategy, OtpService],
})
export class AuthModule {}
