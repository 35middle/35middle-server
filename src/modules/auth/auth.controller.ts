import {
  Body,
  Controller,
  Headers,
  Post,
  Put,
  UseGuards,
  Request,
  Res,
  Get,
} from '@nestjs/common';
import { ForgetPasswordDto } from './dto/forgetPassword.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { ForgetPasswordEntity } from './entity/forgetPassword.entity';
import { ResetPasswordEntity } from './entity/resetPassword.entity';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { JwtGuard } from '../../guards/jwt.guard';
import { UserEntity } from '../users/user.entity';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller({
  version: '1',
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = this.authService.register(createUserDto);
    return UserEntity.fromObject(user);
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req, @Res({ passthrough: true }) response: Response) {
    const { access_token, user } = await this.authService.login(req.user);
    response.cookie('access_token', access_token, {
      httpOnly: true,
    });
    return UserEntity.fromObject(user);
  }

  @Post('/forget-password')
  async forgetPassword(
    @Body() forgetPasswordDto: ForgetPasswordDto,
  ): Promise<ForgetPasswordEntity> {
    return this.authService.forgetPassword(forgetPasswordDto);
  }

  @Post('/issueToken')
  async issueToken() {
    const xxx = {
      email: 'teste@gmail.com',
      _id: '63428f156e0de472554af05c',
    };

    const token = this.jwtService.sign(xxx);
    console.log(token);
  }

  @Put('/reset-password')
  @UseGuards(JwtGuard)
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
    @Headers('authorization') bearerToken: string,
  ): Promise<ResetPasswordEntity> {
    const jwt = bearerToken.replace('Bearer ', '');
    try {
      const user = this.jwtService.decode(jwt, { json: true }) as {
        email: string;
        _id: string;
      };
      return this.authService.resetPassword(
        resetPasswordDto.password,
        user.email,
      );
    } catch (e) {
      throw e;
    }
  }

  @Get('/me')
  @UseGuards(JwtGuard)
  async getMe(
    @Headers('authorization') bearerToken: string,
  ): Promise<UserEntity> {
    const jwt = bearerToken.replace('Bearer ', '');
    try {
      const { sub } = this.jwtService.decode(jwt, { json: true }) as {
        email: string;
        sub: string;
      };
      return this.authService.getMe(sub);
    } catch (e) {
      throw e;
    }
  }
}
