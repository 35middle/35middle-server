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

  // @Get()
  // findAll(): User[] {
  //   return this.usersService.findAll();
  // }
  //
  // @Get(':id')
  // findOneById(@Param() { id }: MongoIdParams): User {
  //   return this.usersService.findOne(id);
  // }

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

  // @Delete(':id')
  // remove(@Param('id') id): string {
  //   return this.usersService.remove(+id);
  // }

  // @Put(':id')
  // update(@Body() updateUserDto: CreateUserDto, @Param('id') id): string {
  //   return `Update ${id} - Email: ${updateUserDto.email}`;
  // }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  // @Patch()
  // update(@Param('id) id: string) {
  //   return this.usersService.update(+id, updateUserDto);
  // }
}
