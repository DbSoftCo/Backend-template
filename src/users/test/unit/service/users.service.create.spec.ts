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
import { BadRequestException } from '@nestjs/common';

describe('UserService create unit test', () => {
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

  it('should create a new user when email is unique', async () => {
    const newId = crypto.randomUUID();
    const mockUserData: User = {
      id: newId,
      createdAt: new Date(),
      updatedAt: new Date(),
      email: 'unique@domain.com',
      password: 'Password123!',
      role: USER_ROLE.USER,
      username: 'UniqueUser',
    };
    repository.findUserByEmail.resolves(null);
    repository.insert.resolves(newId);

    const result = await userService.create(mockUserData);

    assert.calledOnce(repository.findUserByEmail);
    assert.calledWith(repository.findUserByEmail, mockUserData.email);
    assert.calledOnce(repository.insert);
    assert.calledWith(repository.insert, mockUserData);
    expect(result).toEqual(mockUserData.id);
  });

  // Throws BadRequestException if email already exists in the repository
  it('should throw BadRequestException when email already exists', async () => {
    const mockUserData: User = {
      email: 'existing@domain.com',
      password: 'Password123!',
      role: USER_ROLE.USER,
      username: 'ExistingUser',
    };
    repository.findUserByEmail.resolves(mockUserData);

    await expect(userService.create(mockUserData)).rejects.toThrow(
      BadRequestException,
    );

    assert.calledOnce(repository.findUserByEmail);
    assert.calledWith(repository.findUserByEmail, mockUserData.email);
    assert.notCalled(repository.insert);
  });
});
