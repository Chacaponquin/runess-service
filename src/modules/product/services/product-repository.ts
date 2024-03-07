import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants";
import { Model } from "mongoose";
import { IProduct } from "../infrastructure/mongo/schema";
import { Product } from "../domain";

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(DB_MOELS.PRODUCTS)
    private readonly model: Model<IProduct>,
  ) {}

  async findById(id: string): Promise<Product | null> {
    try {
      const found = await this.model.findById(id);

      if (found) {
        return this.map(found);
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }

  private map(product: IProduct): Product {
    return new Product({
      id: product.id,
      name: product.name,
      price: product.price,
      images: product.images,
      provider: product.provider,
    });
  }
}
