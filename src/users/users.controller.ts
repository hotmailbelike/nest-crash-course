// ran "nest g controller users" to generate this file

import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiCreatedResponse,
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
  @Get(':id')
  getUserById(@Param('id') id: string): UserEntity {
    return this.usersService.findById(Number(id));
  }

  @ApiCreatedResponse({ type: UserEntity })
  @Post()
  createUser(@Body() body: CreateUserDto): UserEntity {
    return this.usersService.createUser(body);
  }
}
