import { Test, TestingModule } from '@nestjs/testing';
import { TestBed } from '@automock/sinon';
import { User } from '@src/users/entities/user.entity';
import { SinonStubbedInstance, assert } from 'sinon';
import {
  USER_REPOSITORY,
  UserRepository,
} from '@src/users/repository/user.repository';
import { UserService } from '@src/users/service/user.service';
import { NotFoundException } from '@nestjs/common';

describe('UserService update unit test', () => {
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

  // Successfully update user details with valid userId and updateData
  it('should update user details when valid userId and updateData are provided', async () => {
    const mockUserId = 'valid-user-id';
    const mockUpdateData: Partial<User> = { username: 'newUsername' };

    repository.nativeUpdate.resolves();

    await userService.updateUser(mockUserId, mockUpdateData);

    assert.calledOnceWithExactly(
      repository.nativeUpdate,
      { id: { $eq: mockUserId } },
      mockUpdateData,
    );
  });

  // Attempt to update a user with a non-existent userId
  it('should not update user details when userId does not exist', async () => {
    const nonExistentUserId = 'non-existent-user-id';
    const mockUpdateData = { username: 'newUsername' };

    repository.nativeUpdate.rejects(new NotFoundException());

    await expect(
      userService.updateUser(nonExistentUserId, mockUpdateData),
    ).rejects.toThrow(NotFoundException);

    assert.calledOnceWithExactly(
      repository.nativeUpdate,
      { id: { $eq: nonExistentUserId } },
      mockUpdateData,
    );
  });
});
