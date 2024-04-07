import {
  ResponseSignInAdminDTO,
  SignInAdminDTO,
} from "@modules/user/dto/admin";
import { LoginUserError } from "@modules/user/exceptions";
import { AdminUserServices } from "@modules/user/services/admin.service";
import { UserService } from "@modules/user/services/user.service";
import { CryptServices } from "@shared/services/crypt.service";

export class SignInAdmin {
  constructor(
    private readonly adminServices: AdminUserServices,
    private readonly cryptServices: CryptServices,
    private readonly userServices: UserService,
  ) {}

  async execute(dto: SignInAdminDTO): Promise<ResponseSignInAdminDTO> {
    const found = await this.adminServices.findByUsername(dto.username);

    if (found) {
      const validate = await this.cryptServices.compare({
        value: dto.password,
        hashed: found.password,
      });

      if (validate) {
        const token = this.userServices.generateAccessToken(found.id);

        return {
          email: found.email,
          id: found.id,
          accessToken: token,
          username: found.username,
        };
      }
    }

    throw new LoginUserError();
  }
}
