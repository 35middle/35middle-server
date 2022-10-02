import { Injectable } from '@nestjs/common';
import { ForgetPasswordDto } from './dto/forgetPassword.dto';
import { ResetPasswordEntity } from './entity/resetPassword.entity';
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

  async resetPassword(
    password: string,
    id: string,
  ): Promise<ResetPasswordEntity> {
    const user = await this.usersService.findById(id);
    console.log(user);
    if (user) {
      user.password = password;
      console.log('user exist');
      return ResetPasswordEntity.fromObject({ success: true });
    } else {
      throw new Error('user not found');
    }
  }
}
