import { ProductServices } from "../../services/product/product.services";

export class GetNewProducts {
  constructor(private readonly productServices: ProductServices) {}

  async execute() {}
}
