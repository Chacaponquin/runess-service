import { Controller } from "@nestjs/common";
import { ProductServices } from "../services/product.services";
import { ROUTES } from "@modules/app/constants";

@Controller(ROUTES.PRODUCT.ROOT)
export class ProductController {
  constructor(private readonly productServices: ProductServices) {}
}
