// ran "nest g service users" to generate this file

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: UserEntity[] = [
    { id: 0, name: 'Fish' },
    { id: 1, name: 'Tish' },
  ];

  findAll(): UserEntity[] {
    return this.users;
  }

  findById(userId: number): UserEntity {
    return this.users.find((user) => user.id === userId);
  }

  createUser(createUserDto: CreateUserDto): UserEntity {
    const newUser = { id: this.users.length, ...createUserDto };
    this.users.push(newUser);
    return newUser;
  }

  searchByName(name: string): UserEntity {
    return this.users.find((user) => user.name.includes(name));
  }
}
