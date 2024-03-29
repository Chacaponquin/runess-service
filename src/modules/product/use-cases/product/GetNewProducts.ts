import { ProductServices } from "../../services/product.services";

export class GetNewProducts {
  constructor(private readonly productServices: ProductServices) {}

  async execute() {}
}
