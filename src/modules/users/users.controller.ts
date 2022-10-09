import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UsersService } from './users.service';
import { MongoIdParams } from '../../utils/MongoIdParams';
import { UserEntity } from './user.entity';
import { ExceptionsLoggerFilter } from '../../filters/exceptionsLogger.filter';

@Controller({
  version: '1',
  path: 'users',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseFilters(ExceptionsLoggerFilter)
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.createUser(createUserDto);
  }

  @Delete(':id')
  delete(@Param() { id }: MongoIdParams): string {
    return `Delete User ${id}`;
  }

  @Put(':id')
  update(@Param() { id }: MongoIdParams): string {
    return `Update User ${id}`;
  }
}
