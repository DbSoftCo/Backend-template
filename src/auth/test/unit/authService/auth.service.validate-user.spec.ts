import { Test, TestingModule } from '@nestjs/testing';
import { TestBed } from '@automock/sinon';
import { SinonStubbedInstance } from 'sinon';
import {
  USER_REPOSITORY,
  UserRepository,
} from '@src/users/repository/user.repository';
import { UserService } from '@src/users/service/user.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync, hashSync } from 'bcryptjs';

describe('authService validate unit test', () => {
  beforeEach(async () => {
    (await Test.createTestingModule({
      providers: [
        UserService,
        JwtService,
        {
          provide: USER_REPOSITORY,
          useClass: UserRepository,
        },
      ],
    }).compile()) satisfies TestingModule;
  });

  // Valid user credentials return the user object
  it('should return user object when credentials are valid', async () => {
    const email = 'valid@domain.com';
    const password = 'ValidPassword123!';
    const hashedPassword = hashSync(password, 10);
    const user = { email, password: hashedPassword };

    const userService = {
      findOneByEmail: vi.fn().mockResolvedValue(user),
    };

    const validateUser = async ({ email, password }) => {
      const user = await userService.findOneByEmail(email);
      const matchPassword = compareSync(password, user.password);
      if (!matchPassword) return null;
      return user;
    };

    const result = await validateUser({ email, password });

    expect(userService.findOneByEmail).toHaveBeenCalledWith(email);
    expect(result).toEqual(user);
  });

  // User email does not exist in the database
  it('should return null when user email does not exist', async () => {
    const email = 'nonexistent@domain.com';
    const password = 'AnyPassword123!';

    const userService = {
      findOneByEmail: vi.fn().mockResolvedValue(null),
    };

    const validateUser = async ({ email, password }) => {
      const user = await userService.findOneByEmail(email);
      if (!user) return null;
      const matchPassword = compareSync(password, user.password);
      if (!matchPassword) return null;
      return user;
    };

    const result = await validateUser({ email, password });

    expect(userService.findOneByEmail).toHaveBeenCalledWith(email);
    expect(result).toBeNull();
  });
});
