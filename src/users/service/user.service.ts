import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { USER_REPOSITORY, UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {}

  async findOneById(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException();
    return user;
  }
}
