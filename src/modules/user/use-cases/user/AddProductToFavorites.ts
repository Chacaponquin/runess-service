import { ProductServices } from "@modules/product/services/product/product.services";
import { CurrentUser } from "@modules/user/domain";
import { UserService } from "@modules/user/services/user.service";

interface Props {
  user: CurrentUser;
  productId: string;
}

export class AddProductToFavorites {
  constructor(
    private readonly services: UserService,
    private readonly productServices: ProductServices,
  ) {}

  async execute({ productId, user }: Props): Promise<void> {
    await this.services.addProductToFavorite({
      productId: productId,
      userId: user.id,
    });

    await this.productServices.sumFavoritesCount(productId);
  }
}
