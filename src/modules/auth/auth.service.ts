import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ForgetPasswordDto } from './dto/forgetPassword.dto';
import { ResetPasswordEntity } from './entity/resetPassword.entity';
import { ForgetPasswordEntity } from './entity/forgetPassword.entity';
import { UsersService } from '../users/users.service';
import { EncryptionService } from './encryption/encryption.service';
import { UserEntity } from '../users/user.entity';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly encryptionService: EncryptionService,
  ) {}

  private async getForgetPasswordTokenFromUser(
    user: UserEntity,
  ): Promise<string> {
    return this.encryptionService.encryptText(user._id);
  }

  private async getUserFromForgetPasswordToken(
    token: string,
  ): Promise<UserEntity> {
    const _id = await this.encryptionService.decryptText(token);

    return this.usersService.findById(_id);
  }

  async forgetPassword(
    forgetPasswordDto: ForgetPasswordDto,
  ): Promise<ForgetPasswordEntity> {
    const exist = await this.usersService.findByEmail(forgetPasswordDto.email);

    if (!exist) {
      throw new HttpException(
        'User not found',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // if user exist

    /**
     * generate a token from found user
     */

    const token = await this.getForgetPasswordTokenFromUser(exist);
    // app url maybe from config or env var
    const magicLink = `35middle-app-url/resetPassword?token=${token}`;

    console.log(magicLink);

    /**
     * send this magic link
     *
     * throw error if not success
     */

    // return ok
    return ForgetPasswordEntity.fromObject({ success: true });
  }

  async resetPassword(
    password: string,
    email: string,
  ): Promise<ResetPasswordEntity> {
    await this.usersService.resetPassword(email, password);
    return ResetPasswordEntity.fromObject({ success: true });
  }
}
