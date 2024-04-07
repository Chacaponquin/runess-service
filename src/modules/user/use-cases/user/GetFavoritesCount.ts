import { UserService } from "@modules/user/services/user.service";
import { NotFoundException } from "@nestjs/common";

export class GetFavoriteCount {
  constructor(private readonly userServices: UserService) {}

  async execute(id: string) {
    const found = await this.userServices.findById(id);

    if (found) {
      return found.favorites.length;
    } else {
      throw new NotFoundException();
    }
  }
}
