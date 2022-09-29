import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UsersRepo } from './users.repo';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepo) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const plainObj = await this.usersRepo.create(createUserDto);
    return UserEntity.fromObject(plainObj);
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
