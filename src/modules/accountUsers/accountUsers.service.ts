import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AccountUserDocument, AccountUser } from './accountUser.schema';
import { CreateAccountUserDto } from './dtos/createAccountUser.dto';
import { UpdateAccountUserDto } from './dtos/updateAccountUser.dto';

@Injectable()
export class AccountUsersService {
  constructor(
    @InjectModel(AccountUser.name)
    private accountUserModel: Model<AccountUserDocument>,
  ) {}

  async findAll() {
    return this.accountUserModel.find();
  }

  async findOne(id: string) {
    const accountUser = await this.accountUserModel.findById(id);

    if (!accountUser) {
      throw new NotFoundException();
    }

    return accountUser;
  }

  create(accountUserData: CreateAccountUserDto) {
    const createdAccountUser = new this.accountUserModel(accountUserData);
    return createdAccountUser.save();
  }

  async update(id: string, accountUserData: UpdateAccountUserDto) {
    const accountUser = await this.accountUserModel
      .findByIdAndUpdate(id, accountUserData)
      .setOptions({ overwrite: true, new: true });
    if (!accountUser) {
      throw new NotFoundException();
    }
    return accountUser;
  }

  async delete(accountUserId: string) {
    const result = await this.accountUserModel.findByIdAndDelete(accountUserId);
    if (!result) {
      throw new NotFoundException();
    }
  }
}
