import { ProductServices } from "@modules/product/services/product/product.services";
import { CurrentUser } from "@modules/user/domain";
import { DeleteProductFromFavoriteDTO } from "@modules/user/dto/user";
import { UserService } from "@modules/user/services/user.service";

interface Props {
  dto: DeleteProductFromFavoriteDTO;
  user: CurrentUser;
}

export class DeleteProductFromFavorites {
  constructor(
    private readonly services: UserService,
    private readonly productServices: ProductServices,
  ) {}

  async execute({ dto, user }: Props): Promise<void> {
    await this.services.deleteProductFromFavorite({
      userId: user.id,
      productId: dto.productId,
    });

    await this.productServices.minusFavoritesCount(dto.productId);
  }
}
