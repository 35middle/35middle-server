/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): User[] {
    return this.usersService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  // @Get('/:id')
  // getUserById(@Param('id') id: string): User {
  //   return this.usersService.getUserById(id);
  // }

  // @Post()
  // createUser(@Body() createUserDto: CreateUserDto): User {
  //   return this.usersService.createUser(CreateUserDto);
  // }

  @Post(':id')
  create(@Body() createUserDto: CreateUserDto): string {
    return `Email ${createUserDto.email} Password: ${createUserDto.password}`;
  }

  // @Delete(':id')
  // remove(@Param('id') id): string {
  //   return this.usersService.remove(+id);
  // }

  @Put(':id')
  update(@Body() updateUserDto: CreateUserDto, @Param('id') id): string {
    return `Update ${id} - Email: ${updateUserDto.email}`;
  }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  // @Patch()
  // update(@Param('id) id: string) {
  //   return this.usersService.update(+id, updateUserDto);
  // }
}
