import {
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { MongoIdParams } from '../../utils/MongoIdParams';
import { JwtGuard } from '../../guards/jwt.guard';
import { UserEntity } from './user.entity';
import { JwtService } from '@nestjs/jwt';

@Controller({
  version: '1',
  path: 'users',
})
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  @Get('/getme')
  @UseGuards(JwtGuard)
  async getme(
    @Headers('authorization') bearerToken: string,
  ): Promise<UserEntity> {
    const jwt = bearerToken.replace('Bearer ', '');
    try {
      const userEmail = this.jwtService.decode(jwt, { json: true }) as {
        email: string;
      };
      return await UserEntity.fromObject(
        this.usersService.findByEmail(userEmail.email),
      );
    } catch (e) {
      throw e;
    }
  }

  @Delete(':id')
  delete(@Param() { id }: MongoIdParams): string {
    return `Delete User ${id}`;
  }

  @Put(':id')
  update(@Param() { id }: MongoIdParams): string {
    return `Update User ${id}`;
  }
}
