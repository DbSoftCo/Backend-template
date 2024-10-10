import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../controller/auth.controller';
import { AuthService } from '../../service/auth.service';
import { OptRepository } from '@src/auth/repository/otp.repository';
import { LocalStrategy } from '@src/auth/service/passport.locale.service';
import { JwtStrategy } from '@src/auth/service/passport.jwt.service';
import { OtpService } from '@src/auth/service/otp.service';
import { UserService } from '@src/users/service/user.service';
import { UsersModule } from '@src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import {
  USER_REPOSITORY,
  UserRepository,
} from '@src/users/repository/user.repository';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
          secret: 'jwtConstants.secret',
          signOptions: { expiresIn: '60s' },
        }),
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        UserService,
        {
          provide: USER_REPOSITORY,
          useClass: UserRepository,
        },
        OptRepository,
        LocalStrategy,
        JwtStrategy,
        OtpService,
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
