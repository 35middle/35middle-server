import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    const user = User.create(createUserDto);
    await user.save();

    delete user.password;
    return user;
  }

  async showById(id: number): Promise<User> {
    const user = await this.findById(id);

    delete user.password;
    return user;
  }

  async findById(id: number) {
    return await User.findOne(id);
  }

  async findByEmail(id: string) {
    return await User.findOne({
      where: {
        email: email
      }
    });
  }
  // private readonly users: User[] = [
  //   {
  //     id: 1,
  //     email: '123@qq.com',
  //     password: '123456',
  //   },
  //   {
  //     id: 2,
  //     email: '1234@qq.com',
  //     password: '1234567',
  //   },
  // ];

  // findAll(): User[] {
  //   return this.users;
  // }

  // findOne(id: string): User[] {
  //   return this.users.find(user => user.id === id);
  // }
}
