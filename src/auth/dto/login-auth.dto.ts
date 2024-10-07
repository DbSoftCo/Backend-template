import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class LoginAuthDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'asd@domain.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description:
      'The password of the user. Must be strong and meet security criteria.',
    minimum: 6,
    example: 'Password123!',
    required: true,
  })
  password: string;
}
