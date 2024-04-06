import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants";
import { Model } from "mongoose";
import { IProduct } from "../../infrastructure/mongo/schema";
import { Product } from "../../domain";
import {
  CreateProductProps,
  GetSpecificProductsProps,
  UpdateProductProps,
} from "../../interfaces/product";
import { MediaServices } from "@modules/media/services/media.service";
import { SepecificProductsPage } from "@modules/product/domain/page";

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(DB_MOELS.PRODUCTS)
    private readonly model: Model<IProduct>,
    private readonly mediaServices: MediaServices,
  ) {}

  async findById(id: string): Promise<Product | null> {
    const found = await this.model.findById(id);
    return found ? this.map(found) : null;
  }

  async sumFavoritesCount(id: string): Promise<void> {
    const found = await this.model.findById(id);

    if (found) {
      await this.model.findByIdAndUpdate(id, {
        favoritesCount: found.favoritesCount + 1,
      });
    }
  }

  async minusFavoritesCount(id: string): Promise<void> {
    const found = await this.model.findById(id);

    if (found) {
      await this.model.findByIdAndUpdate(id, {
        favoritesCount: found.favoritesCount - 1,
      });
    }
  }

  async populars(props: GetSpecificProductsProps): Promise<Product[]> {
    const page = new SepecificProductsPage(props.page);

    const result = await this.model
      .find({ type: props.type })
      .sort({ favoritesCount: -1 })
      .skip(page.init)
      .limit(page.final);

    return result.map((r) => this.map(r));
  }

  async news(props: GetSpecificProductsProps): Promise<Product[]> {
    const page = new SepecificProductsPage(props.page);

    const result = await this.model
      .find({ type: props.type })
      .sort({ createdAt: -1 })
      .skip(page.init)
      .limit(page.final);

    return result.map((r) => this.map(r));
  }

  async trending(props: GetSpecificProductsProps): Promise<Product[]> {
    const page = new SepecificProductsPage(props.page);

    const result = await this.model
      .find({ type: props.type })
      .skip(page.init)
      .limit(page.final);

    return result.map((r) => this.map(r));
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
      categories: props.categories,
      images: props.images,
      type: props.type,
    });

    await newProduct.save();

    return this.map(newProduct);
  }

  async all(): Promise<Product[]> {
    const result = await this.model.find().populate("product");
    return result.map((r) => this.map(r));
  }

  async update(props: UpdateProductProps) {
    await this.model.findByIdAndUpdate(props.id, {
      name: props.name,
      provider: props.provider,
      originalPrice: props.originalPrice,
      price: props.price,
      categories: props.categories,
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
      categories: product.categories,
      type: product.type,
    });
  }
}
