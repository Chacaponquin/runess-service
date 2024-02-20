import { HttpException, HttpStatus } from '@nestjs/common';

export class LoginUserError extends HttpException {
  constructor() {
    super('Incorrect email or password', HttpStatus.NOT_FOUND);
  }
}
