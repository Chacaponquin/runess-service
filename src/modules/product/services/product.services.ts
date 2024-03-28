import { Injectable } from "@nestjs/common";
import { ProductRepository } from "./product.repository";
import { Product } from "../domain";
import { CreateProductProps, UpdateProductProps } from "../interfaces/product";

@Injectable()
export class ProductServices {
  constructor(private readonly repository: ProductRepository) {}

  findById(id: string): Promise<Product | null> {
    return this.repository.findById(id);
  }

  createProduct(props: CreateProductProps) {
    return this.repository.create(props);
  }

  deleteOne(id: string) {
    return this.repository.deleteOne(id);
  }

  update(props: UpdateProductProps) {
    return this.repository.update(props);
  }
}
