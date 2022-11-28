import { HttpException, HttpStatus } from '@nestjs/common';

export class PasswordNotMatchException extends HttpException {
  constructor() {
    super(`Confirm password does not match`, HttpStatus.UNAUTHORIZED);
  }
}
