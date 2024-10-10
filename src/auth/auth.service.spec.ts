import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './service/auth.service';
import { OptRepository } from './repository/otp.repository';
import { OtpService } from './service/otp.service';
import { JwtService } from '@nestjs/jwt';
import { LocalStrategy } from './service/passport.locale.service';
import { JwtStrategy } from './service/passport.jwt.service';
import { UserService } from '@src/users/service/user.service';
import { UsersModule } from '@src/users/users.module';
import {
  USER_REPOSITORY,
  UserRepository,
} from '@src/users/repository/user.repository';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
      providers: [
        AuthService,
        OptRepository,
        UserService,
        JwtService,
        {
          provide: USER_REPOSITORY,
          useClass: UserRepository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
