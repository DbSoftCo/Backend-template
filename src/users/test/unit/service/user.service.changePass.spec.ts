import { Test, TestingModule } from '@nestjs/testing';
import { TestBed } from '@automock/sinon';
import { SinonStubbedInstance, assert } from 'sinon';
import * as bcryptjs from 'bcryptjs';
import {
  USER_REPOSITORY,
  UserRepository,
} from '@src/users/repository/user.repository';
import { UserService } from '@src/users/service/user.service';
import { NotFoundException } from '@nestjs/common';
import { hashSync } from 'bcryptjs';

describe('UserService change password unit test', () => {
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

    vi.mock('bcryptjs', () => ({
      hashSync: () => 'mockedHashedPassword', // Mockea la función hashSync
    }));
  });

  it('should hash and update the password when user ID is valid', async () => {
    const userId = crypto.randomUUID();
    const password = 'newPassword123';
    const hashedPassword = 'mockedHashedPassword'; // Valor mockeado para el hash

    const repository = {
      nativeUpdate: vi.fn().mockResolvedValue(1), // Simula que nativeUpdate devuelve 1
    };

    const userService = {
      changePassword: async (id, newPassword) => {
        const hash = bcryptjs.hashSync(newPassword, 10); // Usará el valor mockeado
        return repository.nativeUpdate({ id: { $eq: id } }, { password: hash });
      },
    };

    const response = await userService.changePassword(userId, password);

    // Verifica que el repositorio se llamó con los valores correctos
    expect(repository.nativeUpdate).toHaveBeenCalledWith(
      { id: { $eq: userId } },
      { password: hashedPassword }, // Verifica que se usa el valor mockeado
    );

    // Verifica que la respuesta es la esperada
    expect(response).toEqual(1);
  });

  // Handles non-existent user ID gracefully
  it('should handle non-existent user ID gracefully', async () => {
    const userId = 'non-existent-user-id';
    const password = 'newPassword123';

    repository.nativeUpdate.rejects(new NotFoundException());

    await expect(userService.changePassword(userId, password)).rejects.toThrow(
      NotFoundException,
    );

    assert.calledOnceWithExactly(
      repository.nativeUpdate,
      { id: { $eq: userId } },
      { password: hashSync(password, 10) },
    );
  });
});
