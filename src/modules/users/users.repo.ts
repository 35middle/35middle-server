import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
import { UserExistException } from './exceptions/userExist.exception';

@Injectable()
export class UsersRepo {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    // strict consistency
    const exist = this.findByEmail(createUserDto.email);

    // conflicts with active customer
    if (exist) throw new UserExistException(createUserDto.email);

    const createdUser = new this.userModel({
      ...createUserDto,
      archivedAt: null,
    });
    return createdUser.save();
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({
      email: email,
    });
  }
}
