import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { Account, AccountDocument } from './accounts.schema';
import { IAccount } from './types';

@Injectable()
export class AccountsRepo {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
  ) {}

  async createAccount(session: ClientSession): Promise<IAccount> {
    const account = new this.accountModel({
      companyName: 'test company',
      companyEmail: '',
      companyMobile: '',
      archivedAt: null,
    });
    return account.save({ session });
  }
}
