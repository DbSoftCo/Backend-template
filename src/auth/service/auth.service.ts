import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OtpRepository } from '../repository/otp.repository';
import { UserService } from '@src/users/service/user.service';
import { compareSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from '@src/users/entities/user.entity';
import { LoginAuthDto } from '../dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly optRepository: OtpRepository,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: LoginAuthDto): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    const matchPassword = compareSync(password, user.password);
    if (!matchPassword) return null;
    return user;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      data: user,
    };
  }

  async changePasswordWithOtp(
    email: string,
    otpCode: number,
    newPassword: string,
  ) {
    // Busca al usuario por su email
    const user = await this.userService.findOneByEmail(email);

    // Busca el código OTP
    const otp = await this.optRepository.findOne({ code: otpCode });
    if (!otp) {
      throw new BadRequestException('Invalid OTP');
    }

    // Verifica si el OTP es válido (no ha expirado)
    const isValidOtp = await this.checkValidOtp(otpCode);
    if (!isValidOtp) {
      throw new BadRequestException('OTP has expired or is invalid');
    }

    await this.userService.changePassword(user.id, newPassword);
  }

  async changePasswordWithCurrentPassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ) {
    const user = await this.userService.findOneById(userId, true);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatch = compareSync(currentPassword, user.password);
    if (!isMatch) {
      throw new BadRequestException('Current password is incorrect');
    }

    await this.userService.changePassword(user.id, newPassword);
  }

  private async checkValidOtp(code: number) {
    const otp = await this.optRepository.findOne({ code });
    if (!otp) {
      throw new BadRequestException('OTP not found');
    }
    const dateNow = new Date();
    return dateNow < otp.expireAt; // Verifica que no haya expirado
  }
}
