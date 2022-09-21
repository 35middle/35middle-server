import { Injectable } from '@nestjs/common';
import { User } from './models/user.model';
// import { v4 as uuid } from 'uuid';
// import { CreateUserDto } from './dto/create-user.dto';
@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      email: '123@qq.com',
      password: '1234',
    },
  ];

  findAll(): User[] {
    return this.users;
  }

  // getUserById(id: string): User {
  //   return this.users.find((user) => user.id === id);
  // }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // createUser(createUserDto: CreateUserDto): User {
  //   const { email, password } = CreateUserDto;
  //   const user: User = {
  //     id: uuid(),
  //     email,
  //     password,
  //     status: UserStatus.ACTIVE,
  //   };

  //   this.users.push(user);
  //   return user;
  // }

  // findOne(id: string): User[] {
  //   return this.users.find((user) => user.id === id);
  // }

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
