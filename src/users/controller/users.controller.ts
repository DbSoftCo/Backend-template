import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/user-create.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { ApiValidationErrors } from '@src/utils/decorators/api-validation.decorator';
import { UpdateUserDto } from '../dto/user-update.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @ApiOkResponse({ type: User })
  @Get(':id')
  @ApiValidationErrors()
  async getById(@Param('id', new ParseUUIDPipe()) userId: string) {
    return await this.usersService.findOneById(userId);
  }

  @ApiOkResponse()
  @Get()
  async getAll() {
    return await this.usersService.findAll();
  }

  @ApiCreatedResponse({ type: User })
  @Post('create')
  @ApiValidationErrors()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @ApiOkResponse()
  @Patch('update/:id')
  @ApiValidationErrors()
  async updateUser(
    @Param('id', new ParseUUIDPipe()) userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.updateUser(userId, updateUserDto);
  }
}
