import { Body, Controller, Headers, Post, Put } from '@nestjs/common';
import { ForgetPasswordDto } from './dto/forgetPassword.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { ForgetPasswordEntity } from './entity/forgetPassword.entity';
import { ResetPasswordEntity } from './entity/resetPassword.entity';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Controller({
  version: '1',
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('/forget-password')
  async forgetPassword(
    @Body() forgetPasswordDto: ForgetPasswordDto,
  ): Promise<ForgetPasswordEntity> {
    return this.authService.forgetPassword(forgetPasswordDto);
  }

  @Post('/issueToken')
  async issueToken() {
    const xxx = {
      email: 'mengyao@ddd.com',
      _id: '63396a9b1b3f755af1ba2c92',
    };

    const token = this.jwtService.sign(xxx);
    console.log(token);
  }

  @Put('/reset-password')
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
    @Headers('authorization') bearerToken: string,
  ): Promise<ResetPasswordEntity> {
    const jwt = bearerToken.replace('Bearer ', '');
    try {
      this.jwtService.verify(jwt);
      const user = this.jwtService.decode(jwt, { json: true }) as {
        email: string;
        _id: string;
      };
      console.log(user._id);
      console.log(user.email);
      return this.authService.resetPassword(
        resetPasswordDto.password,
        user._id,
      );
    } catch (e) {
      throw e;
    }
  }
}
