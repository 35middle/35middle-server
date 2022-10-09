import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { EncryptionService } from './encryption/encryption.service';
import { AccountsModule } from '../accounts/accounts.module';

@Module({
  imports: [
    UsersModule,
    AccountsModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600000s' },
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, EncryptionService, LocalStrategy],
})
export class AuthModule {}
