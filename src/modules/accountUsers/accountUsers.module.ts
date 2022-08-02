import { Module } from '@nestjs/common';
import { AccountUsersService } from './accountUsers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountUser, AccountUserSchema } from './accountUser.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AccountUser.name, schema: AccountUserSchema },
    ]),
  ],
  providers: [AccountUsersService],
  exports: [AccountUsersService],
})
export class AccountUsersModule {}
