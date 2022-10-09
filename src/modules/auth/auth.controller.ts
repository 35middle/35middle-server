import { Body, Controller, Post } from '@nestjs/common';
import { ForgetPasswordDto } from './dto/forgetPassword.dto';
import { ForgetPasswordEntity } from './entity/forgetPassword.entity';
import { AuthService } from './auth.service';

@Controller({
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/forget-password')
  async forgetPassword(
    @Body() forgetPasswordDto: ForgetPasswordDto,
  ): Promise<ForgetPasswordEntity> {
    return this.authService.forgetPassword(forgetPasswordDto);
  }
}
