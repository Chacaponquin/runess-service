import { Injectable } from "@nestjs/common";
import { ProductRepository } from "./product.repository";
import { Product } from "../../domain";
import {
  CreateProductProps,
  GetSpecificProductsProps,
  UpdateProductProps,
} from "../../interfaces/product";
import { MediaServices } from "@modules/media/services/media.service";
import { Categories, Colors, Providers, Sizes } from "../../constants";

@Injectable()
export class ProductServices {
  readonly providers = new Providers();
  readonly categories = new Categories();
  readonly colors = new Colors();
  readonly sizes = new Sizes();

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

  populars(props: GetSpecificProductsProps): Promise<Product[]> {
    return this.repository.populars(props);
  }

  trending(props: GetSpecificProductsProps): Promise<Product[]> {
    return this.repository.trending(props);
  }

  news(props: GetSpecificProductsProps): Promise<Product[]> {
    return this.repository.news(props);
  }

  update(props: UpdateProductProps) {
    return this.repository.update(props);
  }
}
