import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { User } from '../entities/user.entity';
import { USER_ROLE } from '../types/user';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto implements User {
  @ApiProperty({
    description: 'The email of the user',
    example: 'asd@domain.com',
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
  @IsStrongPassword({
    minLength: 6,
    minUppercase: 1,
    minNumbers: 1,
    minLowercase: 1,
    minSymbols: 1,
  })
  password: string;

  @ApiProperty({
    description: 'The role of the user',
    enum: USER_ROLE,
  })
  @IsEnum(USER_ROLE)
  role: USER_ROLE;

  @ApiProperty({
    description: 'Username',
  })
  @IsString()
  @IsNotEmpty()
  username: string;
}
