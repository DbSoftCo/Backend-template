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

describe('UserService findAll unit test', () => {
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

  it('should return array of users', async () => {
    const mockUsers: User[] = [
      {
        email: 'asd@gmail.com',
        password: 'asdcx12asdz',
        role: USER_ROLE.USER,
        username: 'Jose123',
        id: crypto.randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'asdd@gmail.com',
        password: 'asdcxx12asdz',
        role: USER_ROLE.USER,
        username: 'Josee123',
        id: crypto.randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    repository.findAll.resolves(mockUsers);

    const users = await userService.findAll();

    assert.calledOnce(repository.findAll);
    expect(users).toEqual(mockUsers);
  });
});
