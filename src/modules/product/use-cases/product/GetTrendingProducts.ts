import { ProductServices } from "../../services/product/product.services";

export class GetTrendingProducts {
  constructor(private readonly productServices: ProductServices) {}

  async execute() {}
}
