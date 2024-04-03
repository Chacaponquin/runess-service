import { CreateUserDTO } from "../../dto/create";
import { UserService } from "../../services/user.service";
import { RespCurrentUserDTO } from "@modules/user/dto/user";

export class CreateUser {
  constructor(private readonly userServices: UserService) {}

  async execute(dto: CreateUserDTO): Promise<RespCurrentUserDTO> {
    const user = await this.userServices.createUser(dto);

    const accessToken = this.userServices.generateAccessToken(user.id);
    const refreshToken = this.userServices.genearteRefreshToken(user.id);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      email: user.email,
      favorites: user.favorites,
      firstName: user.firstName,
      id: user.id,
      lastName: user.lastName,
    };
  }
}
