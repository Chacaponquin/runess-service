import { CryptServices } from "@shared/services/crypt.service";
import { LoginUserDTO } from "../../dto/login";
import { UserService } from "../../services/user.service";
import { LoginUserError } from "../../exceptions";
import { RespCurrentUserDTO } from "@modules/user/dto/user";

export class LoginUser {
  constructor(
    private readonly userServices: UserService,
    private readonly cryptServices: CryptServices,
  ) {}

  async execute(dto: LoginUserDTO): Promise<RespCurrentUserDTO> {
    const found = await this.userServices.findUserByEmail(dto.email);

    if (found) {
      const equal = await this.cryptServices.compare({
        value: dto.password,
        hashed: found.password,
      });

      if (equal) {
        const accessToken = this.userServices.generateAccessToken(found.id);
        const refreshToken = this.userServices.genearteRefreshToken(found.id);

        return {
          accessToken: accessToken,
          refreshToken: refreshToken,
          firstName: found.firstName,
          id: found.id,
          lastName: found.lastName,
          email: found.email,
          favorites: found.favorites,
        };
      }
    }

    throw new LoginUserError();
  }
}
