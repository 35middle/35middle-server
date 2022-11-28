import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
import { UserExistException } from './exceptions/userExist.exception';
import { encodePassword } from '../utils/bcrypt';
import { IUser } from './types';

@Injectable()
export class UsersRepo {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(
    createUserDto: CreateUserDto,
    accountId: mongoose.Types.ObjectId,
    session?: mongoose.ClientSession,
  ): Promise<IUser> {
    // strict consistency
    const exist = await this.findByEmail(createUserDto.email);

    // conflicts with active customer
    if (exist) throw new UserExistException(createUserDto.email);

    const user = new this.userModel({
      ...createUserDto,
      accountId,
      password: await encodePassword(createUserDto.password),
      archivedAt: null,
    });

    return user.save({ session });
  }

  async updateUser(
    userId: mongoose.Types.ObjectId,
    user: Partial<IUser>,
  ): Promise<IUser> {
    return this.userModel.findByIdAndUpdate(userId, user).lean();
  }

  async updatePassword(
    userId: mongoose.Types.ObjectId,
    password: string,
  ): Promise<IUser> {
    return this.userModel
      .findByIdAndUpdate(userId, {
        password: await encodePassword(password),
      })
      .lean();
  }

  async findByEmail(email: string): Promise<IUser> {
    return this.userModel
      .findOne({
        email: email,
      })
      .lean();
  }

  async findById(id: string): Promise<IUser> {
    return this.userModel.findById(id).lean();
  }

  async resetPassword(email: string, password: string): Promise<IUser> {
    return this.userModel
      .findOneAndUpdate(
        { email },
        { password: await encodePassword(password) },
        { new: true },
      )
      .lean();
  }
}
