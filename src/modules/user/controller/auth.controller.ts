import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUser } from '../use-cases';
import { CreateUserDTO } from '../dto/create';

@Controller('/auth')
export class AuthController {
  constructor(private readonly userServices: UserService) {}

  @Post('/sign-up')
  async signUp(@Body() dto: CreateUserDTO): Promise<string> {
    const useCase = new CreateUser(this.userServices);
    const token = await useCase.execute(dto);
    return token;
  }
}
