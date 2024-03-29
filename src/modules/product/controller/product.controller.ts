import { Controller, Get, Param } from "@nestjs/common";
import { ProductServices } from "../services/product.services";
import { ROUTES } from "@modules/app/constants";
import { FindProductById } from "../use-cases";

@Controller(ROUTES.PRODUCT.ROOT)
export class ProductController {
  constructor(private readonly productServices: ProductServices) {}

  @Get(ROUTES.PRODUCT.FIND_BY_ID)
  async findById(@Param("id") id: string) {
    const useCase = new FindProductById(this.productServices);
    return await useCase.execute(id);
  }
}
