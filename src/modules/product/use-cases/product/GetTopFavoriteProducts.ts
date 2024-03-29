import { ProductServices } from "../../services/product.services";

export class GetTopFavoriteProducts {
  constructor(private readonly productServices: ProductServices) {}

  async execute() {}
}
