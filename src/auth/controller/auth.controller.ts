import {
  Controller,
  Post,
  Body,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LoginAuthDto } from '../dto/login-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@src/utils/guards/jwt.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginAuthDto: LoginAuthDto) {
    const user = await this.authService.validateUser(loginAuthDto);
    return await this.authService.login(user);
  }

  @Patch('change-password-otp')
  async changePasswordWithOtp(
    @Body('email') email: string,
    @Body('otpCode') otpCode: number,
    @Body('newPassword') newPassword: string,
  ) {
    return this.authService.changePasswordWithOtp(email, otpCode, newPassword);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  async changePasswordWithCurrentPassword(
    @Request() req, // Obtener el ID del usuario autenticado desde el JWT
    @Body('currentPassword') currentPassword: string,
    @Body('newPassword') newPassword: string,
  ) {
    const userId = req.user.id;
    return this.authService.changePasswordWithCurrentPassword(
      userId,
      currentPassword,
      newPassword,
    );
  }
}
