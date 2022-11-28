import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UsersRepo } from './users.repo';
import mongoose from 'mongoose';
import { IUser } from './types';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { PasswordNotMatchException } from './exceptions/passwordNotMatch.exception';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepo) {}

  async createUser(
    createUserDto: CreateUserDto,
    accountId: mongoose.Types.ObjectId,
    session?: mongoose.ClientSession,
  ): Promise<IUser> {
    return this.usersRepo.createUser(createUserDto, accountId, session);
  }

  async updateUser(
    id: mongoose.Types.ObjectId,
    updateUserDto: UpdateUserDto,
  ): Promise<IUser> {
    return this.usersRepo.updateUser(id, {
      ...updateUserDto,
    });
  }

  async updatePassword(
    id: mongoose.Types.ObjectId,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<IUser> {
    if (updatePasswordDto.password !== updatePasswordDto.confirmPassword) {
      throw new PasswordNotMatchException();
    }
    return this.usersRepo.updatePassword(id, updatePasswordDto.password);
  }

  async findByEmail(email: string): Promise<IUser> {
    return this.usersRepo.findByEmail(email);
  }

  async findById(id: string): Promise<IUser> {
    return this.usersRepo.findById(id);
  }

  async resetPassword(email: string, password: string): Promise<IUser> {
    const userFound = await this.findByEmail(email);
    if (userFound) {
      return this.usersRepo.resetPassword(email, password);
    } else {
      throw new NotFoundException(`user with ${email} is not found`);
    }
  }
}
