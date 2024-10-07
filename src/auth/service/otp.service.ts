import { Injectable } from '@nestjs/common';
import { OptRepository } from '../repository/otp.repository';
import { UserService } from '@src/users/service/user.service';
import { OtpCreateDto } from '../dto/otp-create.dto';
import { OtpCheckValidDto } from '../dto/otp-check-valid.dto';

@Injectable()
export class OtpService {
  constructor(
    private readonly optRepository: OptRepository,
    private readonly userService: UserService,
  ) {}

  async createCode({ email }: OtpCreateDto) {
    const user = await this.userService.findOneByEmail(email);

    let otpCode: number;
    let isUnique = false;

    const isSmallDatabase = await this.isSmallDatabase();

    while (!isUnique) {
      otpCode = this.generateOtp();

      if (isSmallDatabase) {
        isUnique = await this.checkOptCodeExistInLittleDatabase(otpCode);
      } else {
        isUnique = await this.checkOptCodeExistInLargeDatabase(otpCode);
      }
    }

    const newCode = this.optRepository.insert({ user, code: otpCode });

    return newCode;
  }

  async checkValidOtp({ otp }: OtpCheckValidDto) {
    const code = await this.optRepository.findOne({
      code: { $eq: otp },
    });
    const dateNow = new Date();

    return {
      isValid: dateNow < code.expireAt,
      otpRecord: code,
    };
  }

  private generateOtp(): number {
    return Math.floor(100000 + Math.random() * 900000);
  }

  private async checkOptCodeExistInLittleDatabase(
    otpCode: number,
  ): Promise<boolean> {
    const codes = await this.optRepository.findAll({ fields: ['code'] });
    const existingCodes = codes.map((c) => c.code);

    // Devuelve true si NO existe (es único)
    return !existingCodes.includes(otpCode);
  }

  private async checkOptCodeExistInLargeDatabase(
    otpCode: number,
  ): Promise<boolean> {
    const existingCode = await this.optRepository.findOne({ code: otpCode });

    // Si no existe, el código es único
    return !existingCode;
  }

  private async isSmallDatabase() {
    const ammount = await this.optRepository.count();

    return ammount < 1000;
  }
}
