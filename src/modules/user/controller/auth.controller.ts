import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { LoginUser } from '../use-cases';

@Controller('/auth')
export class AuthController {
  constructor(private readonly userServices: UserService) {}

  @Post('/sign-up')
  async signUp(@Body() dto) {
    const useCase = new LoginUser(this.userServices);

    return useCase.execute();
  }
}
