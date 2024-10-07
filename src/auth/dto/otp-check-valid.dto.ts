import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Max, Min } from 'class-validator';

export class OtpCheckValidDto {
  @ApiProperty({
    description: 'Opt recovery code',
    example: '123456',
    required: true,
    type: Number,
  })
  @IsNumber({}, { message: 'OTP must be a number' }) // Valida que sea un número
  @Min(100000, { message: 'OTP must be at least 6 digits' }) // Mínimo valor posible (100000)
  @Max(999999, { message: 'OTP must be at most 6 digits' }) // Máximo valor posible (999999)
  otp: number; // Ahora se mantiene como número
}
