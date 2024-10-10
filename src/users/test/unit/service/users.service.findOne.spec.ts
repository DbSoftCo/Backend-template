import { Test, TestingModule } from '@nestjs/testing';
import { TestBed } from '@automock/sinon';
import { User } from '@src/users/entities/user.entity';
import { SinonStubbedInstance, assert } from 'sinon';
import {
  USER_REPOSITORY,
  UserRepository,
} from '@src/users/repository/user.repository';
import { UserService } from '@src/users/service/user.service';
import { USER_ROLE } from '@src/users/types/user';
import { NotFoundException } from '@nestjs/common';

describe('UserService findOne unit test', () => {
  let userService: UserService;
  let repository: SinonStubbedInstance<UserRepository>;

  beforeEach(async () => {
    (await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: USER_REPOSITORY,
          useClass: UserRepository,
        },
      ],
    }).compile()) satisfies TestingModule;

    const { unit, unitRef } = TestBed.create(UserService).compile();
    userService = unit;
    repository = unitRef.get(USER_REPOSITORY);
  });

  it('should return user when user exists for given ID', async () => {
    const userId = crypto.randomUUID();
    const mockUsers: Omit<User, 'password'> = {
      email: 'asd@gmail.com',
      role: USER_ROLE.USER,
      username: 'Jose123',
      id: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    repository.findOne.resolves(mockUsers);

    const user = await userService.findOneById(userId);

    assert.calledOnce(repository.findOne);
    expect(user).toEqual(mockUsers);
    expect(
      repository.findOne.calledOnceWith(
        { id: { $eq: userId } },
        { fields: ['*'] },
      ),
    ).toBe(true);
  });

  it('should throw NotFoundException when no user is found', async () => {
    const userId = 'randomID';

    repository.findOne.resolves(null);

    await expect(userService.findOneById(userId)).rejects.toThrow(
      NotFoundException,
    );

    assert.calledOnce(repository.findOne);

    expect(
      repository.findOne.calledOnceWith(
        { id: { $eq: userId } },
        { fields: ['*'] },
      ),
    ).toBe(true);
  });

  it('should return user data including password when includePassword is true', async () => {
    const userId = crypto.randomUUID();
    const mockUsers: User = {
      email: 'asd@gmail.com',
      password: 'asdcx12asdz',
      role: USER_ROLE.USER,
      username: 'Jose123',
      id: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    repository.findOne.resolves(mockUsers);

    const user = await userService.findOneById(userId, true);

    assert.calledOnce(repository.findOne);
    expect(user).toHaveProperty('password');
    expect(
      repository.findOne.calledOnceWith(
        { id: { $eq: userId } },
        { fields: ['password', '*'] },
      ),
    ).toBe(true);
  });

  it('should return user data including password when includePassword is true', async () => {
    const userId = crypto.randomUUID();
    const mockUsers: Omit<User, 'password'> = {
      email: 'asd@gmail.com',
      role: USER_ROLE.USER,
      username: 'Jose123',
      id: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    repository.findOne.resolves(mockUsers);

    const user = await userService.findOneById(userId);

    assert.calledOnce(repository.findOne);
    expect(user).not.toHaveProperty('password');
    expect(
      repository.findOne.calledOnceWith(
        { id: { $eq: userId } },
        { fields: ['*'] },
      ),
    ).toBe(true);
  });
});
