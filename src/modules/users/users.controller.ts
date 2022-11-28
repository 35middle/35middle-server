import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongoIdParams } from '../../utils/MongoIdParams';
import mongoose from 'mongoose';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';

@Controller({
  version: '1',
  path: 'users',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Delete(':id')
  delete(@Param() { id }: MongoIdParams): string {
    return `Delete User ${id}`;
  }

  @Put(':id')
  update(@Param() { id }: MongoIdParams, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(
      new mongoose.Types.ObjectId(id),
      updateUserDto,
    );
  }

  @Post(':id/updatePassword')
  updatePassword(
    @Param() { id }: MongoIdParams,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.usersService.updatePassword(
      new mongoose.Types.ObjectId(id),
      updatePasswordDto,
    );
  }
}
