import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UsersRepo } from './users.repo';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepo) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const plainObj = await this.usersRepo.create(createUserDto);

    return UserEntity.fromObject(plainObj);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const plainObj = await this.usersRepo.findByEmail(email);

    return UserEntity.fromObject(plainObj);
  }

  async findById(id: string): Promise<UserEntity> {
    return await this.usersRepo.findById(id);
  }

  async resetPassword(email: string, password: string) {
    const userFound = await this.findByEmail(email);
    if (userFound) {
      return this.usersRepo.resetPassword(email, password);
    } else {
      throw new NotFoundException(`user with ${email} is not found`);
    }
  }
}
