import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { CreateUser, LoginUser } from "../use-cases";
import { CreateUserDTO } from "../dto/create";
import { CryptServices } from "@shared/services/crypt.service";
import { ROUTES } from "@modules/app/constants";
import { LoginUserDTO } from "../dto/login";
import { RespCurrentUserDTO } from "../dto/user";

@Controller(ROUTES.AUTH.ROOT)
export class AuthController {
  constructor(
    private readonly userServices: UserService,
    private readonly cryptServices: CryptServices,
  ) {}

  @Post(ROUTES.AUTH.SIGN_UP)
  async signUp(@Body() dto: CreateUserDTO): Promise<RespCurrentUserDTO> {
    const useCase = new CreateUser(this.userServices);
    const token = await useCase.execute(dto);
    return token;
  }

  @Post(ROUTES.AUTH.LOGIN)
  async login(@Body() dto: LoginUserDTO): Promise<RespCurrentUserDTO> {
    const useCase = new LoginUser(this.userServices, this.cryptServices);
    const token = await useCase.execute(dto);
    return token;
  }
}
