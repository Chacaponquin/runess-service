import { CryptServices } from "@shared/services/crypt.service";
import { LoginUserDTO } from "../../dto/login";
import { UserService } from "../../services/user.service";
import { LoginUserError } from "../../exceptions";
import { RespLoginUserDTO } from "@modules/user/dto/user";

export class LoginUser {
  constructor(
    private readonly userServices: UserService,
    private readonly cryptServices: CryptServices,
  ) {}

  async execute(dto: LoginUserDTO): Promise<RespLoginUserDTO> {
    const found = await this.userServices.findUserByEmail(dto.email);

    if (found) {
      const equal = await this.cryptServices.compare(
        found.password,
        dto.password,
      );

      if (equal) {
        const token = this.userServices.generateAccessToken(found.id);

        return {
          accessToken: token,
          firstName: found.firstName,
          id: found.id,
          lastName: found.lastName,
        };
      }
    }

    throw new LoginUserError();
  }
}
