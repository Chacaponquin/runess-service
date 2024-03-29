import { Injectable } from "@nestjs/common";
import { IMedicine } from "../infrastructure/mongo/schema";
import { Model } from "mongoose";
import { DB_MOELS } from "@shared/constants";
import { InjectModel } from "@nestjs/mongoose";
import { Medicine } from "../domain";
import { MediaServices } from "@modules/media/services/media.service";

@Injectable()
export class MedicineRepository {
  constructor(
    @InjectModel(DB_MOELS.MEDICINES)
    private readonly model: Model<IMedicine>,
    private readonly mediaServices: MediaServices,
  ) {}

  async create({ productId }: { productId: string }): Promise<Medicine> {
    const newMedicine = new this.model({
      product: productId,
    });
    await newMedicine.save();

    return this.map(newMedicine);
  }

  async remove(id: string): Promise<Medicine | null> {
    const found = await this.model.findByIdAndDelete(id);

    if (found) {
      return this.map(found);
    } else {
      return null;
    }
  }

  private map(medicine: IMedicine): Medicine {
    return new Medicine({
      id: medicine.id,
      productId: medicine.product.id,
      images: medicine.product.images.map((i) => ({
        name: i.name,
        size: i.size,
        source: this.mediaServices.getImageUrl(i.aws_key),
        id: i.id,
      })),
      name: medicine.product.name,
      price: medicine.product.price,
      provider: medicine.product.provider,
    });
  }
}
