import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from './accounts.schema';
import { AccountsService } from './accounts.service';
import { AccountsRepo } from './accounts.repo';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
  ],
  controllers: [],
  providers: [AccountsService, AccountsRepo],
  exports: [AccountsService],
})
export class AccountsModule {}
