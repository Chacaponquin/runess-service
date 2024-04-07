import { CurrentUser } from "@modules/user/domain";
import { RespCurrentUserDTO } from "@modules/user/dto/user";
import { UserService } from "@modules/user/services/user.service";
import { NotFoundException } from "@nestjs/common";

export class GetUserByToken {
  constructor(private readonly services: UserService) {}

  async execute(user: CurrentUser): Promise<RespCurrentUserDTO> {
    const found = await this.services.findById(user.id);

    if (found) {
      const accessToken = this.services.generateAccessToken(found.id);
      const refreshToken = this.services.genearteRefreshToken(found.id);

      return {
        accessToken: accessToken,
        refreshToken: refreshToken,
        email: found.email,
        favorites: found.favorites,
        firstName: found.firstName,
        id: found.id,
        lastName: found.lastName,
      };
    }

    throw new NotFoundException();
  }
}
