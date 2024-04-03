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
    const foundByEmail = await this.adminServices.findByUsername(dto.username);

    if (foundByEmail) {
      const validate = await this.cryptServices.compare({
        value: foundByEmail.password,
        hashed: dto.password,
      });

      if (validate) {
        const token = this.userServices.generateAccessToken(foundByEmail.id);

        return {
          email: foundByEmail.email,
          id: foundByEmail.id,
          token: token,
          username: foundByEmail.username,
        };
      }
    }

    throw new LoginUserError();
  }
}
