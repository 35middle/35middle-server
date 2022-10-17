import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  LoggerService,
} from '@nestjs/common';
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

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly accountsService: AccountsService,
    private readonly jwtService: JwtService,
    @InjectConnection() private readonly connection: mongoose.Connection,
    private readonly emailService: EmailService,
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
    host: string,
  ): Promise<ForgetPasswordEntity> {
    const foundUser = await this.usersService.findByEmail(
      forgetPasswordDto.email,
    );

    if (!foundUser) {
      throw new HttpException(
        'User not found',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // if user exist

    /**
     * generate a token from found user
     */
    const jwtToken = await this.jwtService.signAsync({
      _id: foundUser._id,
      email: foundUser.email,
    });

    const magicLink = `${host}/resetPassword?token=${jwtToken}`;

    try {
      await this.emailService.sendForgetPasswordLink(
        foundUser.email,
        magicLink,
      );
      /**
       * send this magic link
       *
       * throw error if not success
       */
      // return ok
      return ForgetPasswordEntity.fromObject({ success: true });
    } catch (e) {
      this.logger.error(`error sending email ${e}`);
      return ForgetPasswordEntity.fromObject({ success: false });
    }
  }

  async resetPassword(
    password: string,
    email: string,
  ): Promise<ResetPasswordEntity> {
    await this.usersService.resetPassword(email, password);
    return ResetPasswordEntity.fromObject({ success: true });
  }
}
