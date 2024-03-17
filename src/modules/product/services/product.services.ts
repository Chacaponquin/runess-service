import { Injectable } from "@nestjs/common";
import { ProductRepository } from "./product-repository";
import { Product } from "../domain";
import { CreateProductProps } from "../interfaces/product";

@Injectable()
export class ProductServices {
  constructor(private readonly repository: ProductRepository) {}

  findById(id: string): Promise<Product | null> {
    return this.repository.findById(id);
  }

  createProduct(dto: CreateProductProps) {
    return this.repository.create(dto);
  }

  deleteOne(id: string) {
    return this.repository.deleteOne(id);
  }
}
