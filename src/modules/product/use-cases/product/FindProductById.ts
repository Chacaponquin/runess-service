import { SendProductDTO } from "../../dto/send";
import { ProductServices } from "../../services/product.services";

export class FindProductById {
  constructor(private readonly productServices: ProductServices) {}

  async execute(id: string): Promise<SendProductDTO | null> {
    const found = await this.productServices.findById(id);

    if (found) {
      return {
        id: found.id,
        images: found.images,
        name: found.name,
        price: found.price,
        provider: found.provider,
      };
    } else {
      return null;
    }
  }
}
