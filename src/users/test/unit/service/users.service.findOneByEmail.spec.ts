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
import { faker } from '@faker-js/faker';

describe('UserService findOneByEmail unit test', () => {
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

  it('should return user when user exists for given email', async () => {
    const userEmail = faker.internet.email();
    const mockUsers: Omit<User, 'password'> = {
      email: userEmail,
      role: USER_ROLE.USER,
      username: 'Jose123',
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    repository.findOne.resolves(mockUsers);

    const user = await userService.findOneByEmail(userEmail);

    assert.calledOnce(repository.findOne);
    expect(user).toEqual(mockUsers);
    expect(
      repository.findOne.calledOnceWith(
        { email: { $eq: userEmail } },
        { fields: ['*'] },
      ),
    ).toBe(true);
  });

  it('should throw NotFoundException when no user is found', async () => {
    const userEmail = 'randomEmail@yahoo.com';

    repository.findOne.resolves(null);

    await expect(userService.findOneByEmail(userEmail)).rejects.toThrow(
      NotFoundException,
    );

    assert.calledOnce(repository.findOne);

    expect(
      repository.findOne.calledOnceWith(
        { email: { $eq: userEmail } },
        { fields: ['*'] },
      ),
    ).toBe(true);
  });
});
