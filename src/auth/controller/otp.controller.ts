import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { OtpCreateDto } from '../dto/otp-create.dto';
import { OtpService } from '../service/otp.service';
import { OtpCheckValidDto } from '../dto/otp-check-valid.dto';

@ApiTags('Otp Recovery Password')
@Controller('otp')
export class OtpController {
  constructor(private readonly otpSercvice: OtpService) {}

  @ApiCreatedResponse()
  @Post('generate-otp')
  async generateOtp(@Body() email: OtpCreateDto) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }

    return await this.otpSercvice.createCode(email);
  }

  @ApiOkResponse()
  @Post('validate-otp')
  async validateOtp(@Body() code: OtpCheckValidDto) {
    const { isValid, otpRecord } = await this.otpSercvice.checkValidOtp(code);

    if (!isValid) throw new BadRequestException('Otp invalid or not exist');

    return {
      message: 'OTP is valid',
      valid: true,
      otp: otpRecord,
    };
  }
}
