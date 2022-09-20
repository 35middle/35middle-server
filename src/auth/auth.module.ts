import { Module } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';

@Module({
  imports: [],
  providers: [AuthService],
})
export class AuthModule {}
