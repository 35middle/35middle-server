import { Injectable } from '@nestjs/common';
import { AccountsRepo } from './accounts.repo';
import { ClientSession } from 'mongoose';
import { IAccount } from './types';

@Injectable()
export class AccountsService {
  constructor(private readonly accountRepo: AccountsRepo) {}

  async createAccount(session: ClientSession): Promise<IAccount> {
    return this.accountRepo.createAccount(session);
  }
}
