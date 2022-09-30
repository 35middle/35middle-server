import { Injectable } from '@nestjs/common';
import { ForgetPasswordDto } from './dto/forgetPassword.dto';
import { ForgetPasswordEntity } from './entity/forgetPassword.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async forgetPassword(
    forgetPasswordDto: ForgetPasswordDto,
  ): Promise<ForgetPasswordEntity> {
    const exist = await this.usersService.findByEmail(forgetPasswordDto.email);

    if (exist) {
      console.log('Notify user to reset password');
    }

    return ForgetPasswordEntity.fromObject({ success: true });
  }
}
