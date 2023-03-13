// ran "nest g controller users" to generate this file

import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOkResponse({ type: UserEntity, isArray: true })
  @Get()
  getUsers(): UserEntity[] {
    return this.usersService.findAll();
  }

  @ApiOkResponse({ type: UserEntity })
  @ApiQuery({ name: 'name', required: true })
  @Get('searchByName')
  searchByName(@Query('name') name: string): UserEntity {
    return this.usersService.searchByName(name);
  }

  @ApiOkResponse({ type: UserEntity, description: 'Gets a User by their ID' })
  @ApiNotFoundResponse()
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number): UserEntity {
    const user = this.usersService.findById(id);

    if (!user) throw new NotFoundException();

    return user;
  }

  @ApiCreatedResponse({ type: UserEntity })
  @ApiBadRequestResponse()
  @Post()
  createUser(@Body() body: CreateUserDto): UserEntity {
    return this.usersService.createUser(body);
  }
}
