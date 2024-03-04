import { Injectable } from "@nestjs/common";
import { ProductRepository } from "./product-repository";

@Injectable()
export class ProductServices {
  constructor(private readonly repository: ProductRepository) {}

  async;
}
