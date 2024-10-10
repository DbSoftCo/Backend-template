import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { USER_REPOSITORY, UserRepository } from '../repository/user.repository';
import { CreateUserDto } from '../dto/user-create.dto';
import { UpdateUserDto } from '../dto/user-update.dto';
import { hashSync } from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async findOneById(id: string, includePassword = false) {
    const fields = includePassword
      ? (['password', '*'] as const)
      : (['*'] as const);

    const user = await this.userRepository.findOne(
      { id: { $eq: id } },
      { fields },
    );
    if (!user) throw new NotFoundException();
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOne(
      { email: { $eq: email } },
      { fields: ['*'] },
    );
    if (!user) throw new NotFoundException('User not found!');
    return user;
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async create(userData: CreateUserDto) {
    const user = await this.userRepository.findUserByEmail(userData.email);
    if (user)
      throw new BadRequestException(
        `User with emial: ${userData.email}. Already exists`,
      );

    return await this.userRepository.insert(userData);
  }

  async updateUser(userId: string, updateData: UpdateUserDto) {
    await this.userRepository.nativeUpdate({ id: { $eq: userId } }, updateData);
  }

  async changePassword(userId: string, password: string) {
    const hashedPassword = hashSync(password, 10);

    await this.userRepository.nativeUpdate(
      { id: { $eq: userId } },
      { password: hashedPassword },
    );
  }
}
