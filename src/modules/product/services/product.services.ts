import { Injectable } from "@nestjs/common";
import { ProductRepository } from "./product.repository";
import { Product } from "../domain";
import { CreateProductProps, UpdateProductProps } from "../interfaces/product";
import { MediaServices } from "@modules/media/services/media.service";

@Injectable()
export class ProductServices {
  constructor(
    private readonly repository: ProductRepository,
    private readonly mediaServices: MediaServices,
  ) {}

  findById(id: string): Promise<Product | null> {
    return this.repository.findById(id);
  }

  createProduct(props: CreateProductProps) {
    return this.repository.create(props);
  }

  async deleteOne(id: string): Promise<void> {
    const product = await this.repository.deleteOne(id);

    if (product) {
      for (const image of product.images) {
        await this.mediaServices.deleteImage(image.id);
      }
    }
  }

  update(props: UpdateProductProps) {
    return this.repository.update(props);
  }
}
