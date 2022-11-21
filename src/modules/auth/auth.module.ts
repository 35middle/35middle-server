import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './strategy/local.strategy';
import { AccountsModule } from '../accounts/accounts.module';
import { EmailService } from './services/email.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, UsersModule, AccountsModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, EmailService],
})
export class AuthModule {}
