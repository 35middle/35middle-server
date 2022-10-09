import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
import { UserExistException } from './exceptions/userExist.exception';
import { CreatedUser } from './types';
import { encodePassword } from '../utils/bcrypt';

@Injectable()
export class UsersRepo {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    // strict consistency
    const exist = await this.findByEmail(createUserDto.email);
    console.log(createUserDto.email);
    console.log(exist);

    // conflicts with active customer
    if (exist) throw new UserExistException(createUserDto.email);

    return (
      await this.userModel.create({
        ...createUserDto,
        password: encodePassword(createUserDto.password),
        archivedAt: null,
      })
    ).toObject<CreatedUser>();
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({
      email: email,
    });
  }

  async findById(id: string) {
    return this.userModel.findById(id);
  }

  async resetPassword(email: string, password: string) {
    return this.userModel.findOneAndUpdate(
      { email },
      { password },
      { new: true },
    );
  }
}
