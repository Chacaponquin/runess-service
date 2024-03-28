import { Injectable } from "@nestjs/common";
import { IClothe } from "../infrastructure/mongo/schema";
import { Model } from "mongoose";
import { DB_MOELS } from "@shared/constants";
import { InjectModel } from "@nestjs/mongoose";
import { Clothe } from "../domain";
import { CreateClotheProps, UpdateClotheProps } from "../interfaces/clothe";
import { MediaServices } from "@modules/media/services/media.service";

@Injectable()
export class ClotheRepository {
  constructor(
    @InjectModel(DB_MOELS.CLOTHE)
    private readonly model: Model<IClothe>,
    private readonly mediaServices: MediaServices,
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

  async remove(id: string): Promise<Clothe | null> {
    const found = await this.model.findByIdAndDelete(id);

    if (found) {
      return this.map(found);
    } else {
      return null;
    }
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
      id: clothe.id,
      productId: clothe.product.id,
      images: clothe.product.images.map((i) => ({
        name: i.name,
        size: i.size,
        source: this.mediaServices.getImageUrl(i.aws_key),
        id: i.id,
      })),
      name: clothe.product.name,
      price: clothe.product.price,
      provider: clothe.product.provider,
    });
  }
}
