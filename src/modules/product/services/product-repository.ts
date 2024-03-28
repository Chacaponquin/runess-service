import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants";
import { Model } from "mongoose";
import { IProduct } from "../infrastructure/mongo/schema";
import { Product } from "../domain";
import { CreateProductProps } from "../interfaces/product";

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

  async deleteOne(id: string) {
    await this.model.findByIdAndDelete(id);
  }

  async create(props: CreateProductProps): Promise<Product> {
    const newProduct = new this.model({
      name: props.name,
      provider: props.provider,
      originalPrice: props.originalPrice,
      price: props.price,
      category: props.category,
      images: props.images,
    });

    await newProduct.save();

    return this.map(newProduct);
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
