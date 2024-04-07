import { RespProductDTO } from "@modules/product/dto/product";
import { UserService } from "@modules/user/services/user.service";

export class GetUserFavorites {
  constructor(private readonly userServices: UserService) {}

  async execute(id: string): Promise<RespProductDTO[]> {
    const products = await this.userServices.getFavoriteProducts(id);
    return products.map((p) => p.response());
  }
}
