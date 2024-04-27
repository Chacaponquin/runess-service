import { Injectable } from "@nestjs/common";
import { IClothe } from "../../infrastructure/mongo/schema";
import { Model } from "mongoose";
import { DB_MOELS } from "@shared/constants";
import { InjectModel } from "@nestjs/mongoose";
import { Clothe } from "../../domain";
import {
  CreateClotheProps,
  FilterClotheProps,
  UpdateClotheProps,
} from "../../interfaces/clothe";
import { MediaServices } from "@modules/media/services/media.service";
import { PRODUCT_TYPES } from "../../constants";
import { FilterPage } from "@modules/product/domain/page";
import { GetProps, SearchResult } from "@modules/product/interfaces/product";
import { GetPage } from "@shared/domain/page";
import { ComparationService } from "@shared/services/comparation.service";
import { SimilarProduct } from "@modules/product/domain/similar";

@Injectable()
export class ClotheRepository {
  constructor(
    @InjectModel(DB_MOELS.CLOTHE)
    private readonly model: Model<IClothe>,
    private readonly mediaServices: MediaServices,
    private readonly compareServices: ComparationService,
  ) {}

  length(): Promise<number> {
    return this.model.countDocuments();
  }

  async create(dto: CreateClotheProps): Promise<string> {
    const newClothe = new this.model({
      product: dto.productId,
      sizes: dto.sizes,
      colors: dto.colors,
    });

    await newClothe.save();

    return newClothe.id;
  }

  async remove(id: string): Promise<void> {
    await this.model.findOneAndDelete({ product: id });
  }

  async allProviders(): Promise<string[]> {
    const all = [] as string[];
    const result = await this.model.find().populate("product");

    for (const r of result) {
      const provider = r.product.provider;

      if (!all.includes(provider)) all.push(provider);
    }

    return all;
  }

  async filter({
    providers,
    name,
    colors,
    maxPrice,
    minPrice,
    page: ipage,
    sizes,
  }: FilterClotheProps): Promise<SearchResult> {
    const page = new FilterPage(ipage);

    const match = {
      price: {
        $lte: maxPrice,
        $gte: minPrice,
      },
    } as Record<string, unknown>;

    if (providers.length > 0) {
      match.provider = { $in: providers };
    }

    if (colors.length > 0) {
      match.colors = colors;
    }

    if (sizes.length > 0) {
      match.sizes = sizes;
    }

    const result = await this.model
      .find()
      .populate({ path: "product", match: match });

    const notNull = result.filter((r) => r.product !== null);

    const products = notNull
      .slice(page.init, page.final)
      .map((c) => {
        return new SimilarProduct({
          product: c,
          similarity: this.compareServices.compare(name, c.product.name),
        });
      })
      .sort((a, b) => b.similarity - a.similarity)
      .map((c) => this.map(c.product));

    return { result: products, totalPages: page.total(notNull.length) };
  }

  async update(props: UpdateClotheProps): Promise<Clothe | null> {
    const found = await this.model.findByIdAndUpdate(props.id, {
      sizes: props.sizes,
      colors: props.colors,
    });

    if (found) {
      return this.map(found);
    } else {
      return null;
    }
  }

  async get(props: GetProps): Promise<Clothe[]> {
    const page = new GetPage(props.page);

    const result = await this.model
      .find()
      .skip(page.init)
      .limit(page.final)
      .populate("product");

    return result.map((r) => this.map(r));
  }

  async allSizes(): Promise<string[]> {
    const result = await this.model.find();

    const sizes = [] as Array<string>;

    for (const clothe of result) {
      clothe.sizes.forEach((s) => {
        if (!sizes.includes(s)) {
          sizes.push(s);
        }
      });
    }

    return sizes;
  }

  async similars(id: string): Promise<Clothe[]> {
    const found = await this.model.findOne({ product: id });

    if (found) {
      const result = await this.model.find().limit(6).populate("product");

      return result.map((r) => this.map(r));
    } else {
      return [];
    }
  }

  async findById(id: string): Promise<Clothe | null> {
    const found = await this.model.findOne({ product: id }).populate("product");
    return found ? this.map(found) : null;
  }

  async findByProductId(id: string): Promise<Clothe | null> {
    const found = await this.model.findOne({ product: id }).populate("product");
    return found ? this.map(found) : null;
  }

  private map(clothe: IClothe): Clothe {
    return new Clothe({
      id: clothe.product._id,
      images: clothe.product.images.map((i) => ({
        name: i.name,
        size: i.size,
        source: this.mediaServices.getImageUrl(i.aws_key),
        id: i._id,
      })),
      name: clothe.product.name,
      price: clothe.product.price,
      provider: clothe.product.provider,
      categories: clothe.product.categories,
      type: PRODUCT_TYPES.CLOTHE,
      colors: clothe.colors,
      sizes: clothe.sizes,
      description: clothe.product.description,
    });
  }
}
