import { Module } from '@nestjs/common';
import { OptRepository } from './repository/otp.repository';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { UsersModule } from '@src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './service/passport.locale.service';
import { JwtStrategy } from './service/passport.jwt.service';
import { OtpService } from './service/otp.service';
import { OtpController } from './controller/otp.controller';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'jwtConstants.secret',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController, OtpController],
  providers: [
    AuthService,
    OptRepository,
    LocalStrategy,
    JwtStrategy,
    OtpService,
  ],
})
export class AuthModule {}
