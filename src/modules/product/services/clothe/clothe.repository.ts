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
import { ClotheMatch } from "@modules/product/infrastructure/mongo/domain";
import { FilterPage } from "@modules/product/domain/page";

@Injectable()
export class ClotheRepository {
  constructor(
    @InjectModel(DB_MOELS.CLOTHE)
    private readonly model: Model<IClothe>,
    private readonly mediaServices: MediaServices,
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

  async remove(id: string): Promise<Clothe | null> {
    const found = await this.model.findByIdAndDelete(id);

    if (found) {
      return this.map(found);
    } else {
      return null;
    }
  }

  async filter(props: FilterClotheProps): Promise<Clothe[]> {
    const page = new FilterPage(props.page);

    const result = await this.model
      .aggregate<IClothe>([
        {
          $lookup: {
            from: DB_MOELS.PRODUCTS,
            localField: "product",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $unwind: "$product",
        },
        {
          $match: new ClotheMatch(props).match,
        },
        { $skip: page.init },
        { $limit: page.final },
      ])
      .exec();

    const data = result.map((c) => this.map(c));

    return data;
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

  private map(clothe: IClothe): Clothe {
    return new Clothe({
      id: clothe._id,
      productId: clothe.product._id,
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
    });
  }
}
