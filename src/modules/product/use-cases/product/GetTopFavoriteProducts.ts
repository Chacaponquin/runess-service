import { GetSpecificProductsDTO } from "@modules/product/dto/product";
import { ProductServices } from "../../services/product/product.services";
import { PRODUCT_TYPES } from "@modules/product/constants";

export class GetTopFavoriteProducts {
  constructor(private readonly productServices: ProductServices) {}

  async execute(dto: GetSpecificProductsDTO, type: PRODUCT_TYPES) {
    const result = await this.productServices.populars({
      page: dto.page,
      type: type,
    });

    return result.map((r) => r.response());
  }
}
