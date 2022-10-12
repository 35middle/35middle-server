import { Injectable } from '@nestjs/common';
import { AccountsRepo } from './accounts.repo';
import { AccountEntity } from './account.entity';
import { ClientSession } from 'mongoose';

@Injectable()
export class AccountsService {
  constructor(private readonly accountRepo: AccountsRepo) {}

  async createAccount(session: ClientSession): Promise<AccountEntity> {
    const plainObj = await this.accountRepo.createAccount(session);

    return AccountEntity.fromObject(plainObj);
  }
}
