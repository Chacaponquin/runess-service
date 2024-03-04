import { Injectable } from "@nestjs/common";
import { ProductRepository } from "./product-repository";
import { Product } from "../domain";

@Injectable()
export class ProductServices {
  constructor(private readonly repository: ProductRepository) {}

  findById(id: string): Promise<Product | null> {
    return this.repository.findById(id);
  }
}
