import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';
import { v4 as uuid } from 'uuid';
@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      email: '123@qq.com',
      password: '1234',
    },
    {
      id: 2,
      email: '1234@qq.com',
      password: '12345',
    },
  ];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    return this.users.find((user) => user.id === id);
  }

  createUser(createUserDto: CreateUserDto): User {
    const { email, password } = createUserDto;
    const user: User = {
      id: uuid(),
      email,
      password,
    };

    this.users.push(user);
    return user;
  }

  // async create(createUserDto: CreateUserDto) {
  //   const user = User.create(createUserDto);
  //   await user.save();

  //   delete user.password;
  //   return user;
  // }

  // async showById(id: number): Promise<User> {
  //   const user = await this.findById(id);

  //   delete user.password;
  //   return user;
  // }

  // async findById(id: number) {
  //   return await User.findOne(id);
  // }

  // async findByEmail(id: string) {
  //   return await User.findOne({
  //     where: {
  //       email: email,
  //     },
  //   });
  // }
}
