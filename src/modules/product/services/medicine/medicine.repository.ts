import { Injectable } from "@nestjs/common";
import { IMedicine } from "../../infrastructure/mongo/schema";
import { Model } from "mongoose";
import { DB_MOELS } from "@shared/constants";
import { InjectModel } from "@nestjs/mongoose";
import { Medicine } from "../../domain";
import { MediaServices } from "@modules/media/services/media.service";
import { PRODUCT_TYPES } from "../../constants";
import { FilterMedicineProps } from "@modules/product/interfaces/medicine";
import { FilterPage, GetPage } from "@modules/product/domain/page";
import { MedicineMatch } from "@modules/product/infrastructure/mongo/domain";
import { GetProps } from "@modules/product/interfaces/product";

@Injectable()
export class MedicineRepository {
  constructor(
    @InjectModel(DB_MOELS.MEDICINES)
    private readonly model: Model<IMedicine>,
    private readonly mediaServices: MediaServices,
  ) {}

  length(): Promise<number> {
    return this.model.countDocuments();
  }

  async create({ productId }: { productId: string }): Promise<string> {
    const newMedicine = new this.model({
      product: productId,
    });

    await newMedicine.save();

    return newMedicine.id;
  }

  async remove(id: string): Promise<Medicine | null> {
    const found = await this.model.findByIdAndDelete(id);

    if (found) {
      return this.map(found);
    } else {
      return null;
    }
  }

  async get(props: GetProps): Promise<Medicine[]> {
    const page = new GetPage(props.page);

    const result = await this.model
      .find()
      .skip(page.init)
      .limit(page.final)
      .populate("product");

    return result.map((r) => this.map(r));
  }

  async similars(id: string): Promise<Medicine[]> {
    const found = await this.findById(id);

    if (found) {
      const result = await this.model.find().limit(6).populate("product");

      return result.map((r) => this.map(r));
    } else {
      return [];
    }
  }

  async filter(props: FilterMedicineProps): Promise<Medicine[]> {
    const page = new FilterPage(props.page);

    const result = await this.model.aggregate<IMedicine>([
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
        $match: new MedicineMatch(props).match,
      },
      { $skip: page.init },
      { $limit: page.final },
    ]);

    return result.map((c) => this.map(c));
  }

  async findById(id: string): Promise<Medicine | null> {
    const found = await this.model.findOne({ _id: id }).populate("product");
    return found ? this.map(found) : null;
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
      categories: medicine.product.categories,
      type: PRODUCT_TYPES.MEDICINE,
    });
  }
}
