import { RespProductDTO } from "@modules/product/dto/product";
import { ProductServices } from "../../services/product/product.services";

export class FindProductById {
  constructor(private readonly productServices: ProductServices) {}

  async execute(id: string): Promise<RespProductDTO | null> {
    const found = await this.productServices.findById(id);

    if (found) {
      return found.response();
    } else {
      return null;
    }
  }
}
