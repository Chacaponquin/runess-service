import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants";
import { Model } from "mongoose";
import { IProduct } from "../infrastructure/mongo/schema";
import { Product } from "../domain";
import { CreateProductProps, UpdateProductProps } from "../interfaces/product";
import { MediaServices } from "@modules/media/services/media.service";

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(DB_MOELS.PRODUCTS)
    private readonly model: Model<IProduct>,
    private readonly mediaServices: MediaServices,
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

  async deleteOne(id: string): Promise<Product | null> {
    const found = await this.model.findByIdAndDelete(id);
    return found ? this.map(found) : null;
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

  async update(props: UpdateProductProps) {
    await this.model.findByIdAndUpdate(props.id, {
      name: props.name,
      provider: props.provider,
      originalPrice: props.originalPrice,
      price: props.price,
      category: props.category,
      images: props.images,
    });
  }

  private map(product: IProduct): Product {
    return new Product({
      id: product.id,
      name: product.name,
      price: product.price,
      images: product.images.map((i) => ({
        name: i.name,
        size: i.size,
        source: this.mediaServices.getImageUrl(i.aws_key),
        id: i.id,
      })),
      provider: product.provider,
    });
  }
}
