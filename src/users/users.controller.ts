import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Get()
  // findAll(): User[] {
  //   return this.usersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id): User {
  //   return this.usersService.findOne(id);
  // }

  @Get(':id')
  show(@Param('id') id: string) {
    return this.usersService.showById(+id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // @Delete(':id')
  // delete(@Param('id') id): string {
  //   return `Delete ${id}`;
  // }

  // @Put(':id')
  // update(@Body() updateUserDto: CreateUserDto, @Param('id') id): string {
  //   return `Update ${id} - Email: ${updateUserDto.email}`;
  // }
}
