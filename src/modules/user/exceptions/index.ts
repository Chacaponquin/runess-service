import { HttpException, HttpStatus } from "@nestjs/common";

export class LoginUserError extends HttpException {
  constructor() {
    super("Incorrect email or password", HttpStatus.NOT_FOUND);
  }
}

export class RepeatUserError extends HttpException {
  constructor() {
    super("Aldready existis an user with that email", HttpStatus.CONFLICT);
  }
}
