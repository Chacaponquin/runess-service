import { ProductServices } from "../../services/product/product.services";

export class GetTopFavoriteProducts {
  constructor(private readonly productServices: ProductServices) {}

  async execute() {}
}
