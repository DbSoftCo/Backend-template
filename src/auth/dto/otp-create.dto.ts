import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class OtpCreateDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'asd@domain.com',
    required: true,
  })
  @IsEmail()
  email: string;
}
