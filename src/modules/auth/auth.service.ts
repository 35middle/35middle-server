import { Injectable, Logger } from '@nestjs/common';
import { ForgetPasswordDto } from './dto/forgetPassword.dto';
import { ResetPasswordEntity } from './entity/resetPassword.entity';
import { ForgetPasswordEntity } from './entity/forgetPassword.entity';
import { UsersService } from '../users/users.service';
import { comparePassword } from '../utils/bcrypt';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { AccountsService } from '../accounts/accounts.service';
import * as mongoose from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { IUser } from '../users/types';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from './services/email.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly accountsService: AccountsService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<IUser> {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const newAccount = await this.accountsService.createAccount(session);
      const newUser = await this.usersService.createUser(
        createUserDto,
        new mongoose.Types.ObjectId(newAccount._id),
        session,
      );

      await session.commitTransaction();
      return newUser;
    } catch (e) {
      await session.abortTransaction();
      throw e;
    } finally {
      await session.endSession();
    }
  }

  async validateUser(email: string, pass: string): Promise<IUser | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && comparePassword(pass, user.password)) {
      return user;
    }
    return null;
  }

  async forgetPassword(
    forgetPasswordDto: ForgetPasswordDto,
  ): Promise<ForgetPasswordEntity> {
    const foundUser = await this.usersService.findByEmail(
      forgetPasswordDto.email,
    );

    if (!foundUser) {
      this.logger.error(`user with ${forgetPasswordDto.email} is not found`);
      return;
    }

    const jwtToken = await this.jwtService.signAsync({
      _id: foundUser._id,
      email: foundUser.email,
    });

    const magicLink = `${this.configService.get(
      'app.appBaseUrl',
    )}/resetPassword?token=${jwtToken}`;

    try {
      await this.emailService.sendForgetPasswordLink(
        foundUser.email,
        magicLink,
      );
    } catch (e) {
      this.logger.error(`error sending email ${e}`);
    }
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
