import { Controller, Delete, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongoIdParams } from '../../utils/MongoIdParams';

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
  update(@Param() { id }: MongoIdParams): string {
    return `Update User ${id}`;
  }
}
