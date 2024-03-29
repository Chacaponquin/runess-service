import { ROUTES } from "@modules/app/constants";
import { Body, Controller } from "@nestjs/common";
import { ResponseSignInAdminDTO, SignInAdminDTO } from "../dto/admin";
import { SignInAdmin } from "../use-cases";
import { AdminUserServices } from "../services/admin.service";
import { CryptServices } from "@shared/services/crypt.service";
import { UserService } from "../services/user.service";

@Controller(ROUTES.ADMIN_USER.ROOT)
export class AdminController {
  constructor(
    private readonly services: AdminUserServices,
    private readonly cryptServices: CryptServices,
    private readonly userServices: UserService,
  ) {}

  async signIn(@Body() dto: SignInAdminDTO): Promise<ResponseSignInAdminDTO> {
    const useCase = new SignInAdmin(
      this.services,
      this.cryptServices,
      this.userServices,
    );

    return await useCase.execute(dto);
  }
}
