import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UsersRepo } from './users.repo';
import { UserEntity } from './user.entity';
import mongoose from 'mongoose';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepo) {}

  async createUser(
    createUserDto: CreateUserDto,
    accountId: mongoose.Types.ObjectId,
    session?: mongoose.ClientSession,
  ): Promise<UserEntity> {
    const plainObj = await this.usersRepo.createUser(
      createUserDto,
      accountId,
      session,
    );

    return UserEntity.fromObject(plainObj);
  }

  async findByEmail(email: string) {
    return this.usersRepo.findByEmail(email);
  }

  async findById(id: string): Promise<UserEntity> {
    const plainObj = await this.usersRepo.findById(id);
    return UserEntity.fromObject(plainObj);
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
