import { Injectable } from "@nestjs/common";
import { IClothe } from "../infrastructure/mongo/schema";
import { Model } from "mongoose";
import { DB_MOELS } from "@shared/constants";
import { InjectModel } from "@nestjs/mongoose";
import { EnvService } from "@modules/app/modules/env/services/env.service";
import { Clothe } from "../domain";
import { CreateClotheProps } from "../interfaces/clothe";

@Injectable()
export class ClotheRepository {
  constructor(
    private readonly envServices: EnvService,
    @InjectModel(DB_MOELS.CLOTHE)
    private readonly model: Model<IClothe>,
  ) {}

  async create(dto: CreateClotheProps): Promise<Clothe> {
    const newClothe = new this.model({
      product: dto.productId,
      sizes: dto.sizes,
      colors: dto.colors,
    });

    await newClothe.save();

    return this.map(newClothe);
  }

  private map(clothe: IClothe): Clothe {
    return new Clothe({
      id: clothe.id,
      images: clothe.product.images,
      name: clothe.product.name,
      price: clothe.product.price,
      provider: clothe.product.provider,
    });
  }
}
