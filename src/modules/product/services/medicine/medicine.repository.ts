import { Injectable } from "@nestjs/common";
import { IMedicine } from "../../infrastructure/mongo/schema";
import { Model } from "mongoose";
import { DB_MOELS } from "@shared/constants";
import { InjectModel } from "@nestjs/mongoose";
import { Medicine } from "../../domain";
import { MediaServices } from "@modules/media/services/media.service";
import { FILTER_ORDER, PRODUCT_TYPES } from "../../constants";
import { FilterMedicineProps } from "@modules/product/interfaces/medicine";
import { FilterPage } from "@modules/product/domain/page";
import { GetProps, SearchResult } from "@modules/product/interfaces/product";
import { GetPage } from "@shared/domain/page";
import { ComparationService } from "@shared/services/comparation.service";
import { SimilarProduct } from "@modules/product/domain/similar";
import { MedicineMatch } from "@modules/product/infrastructure/mongo/domain/Match";
import { MedicineSort } from "@modules/product/infrastructure/mongo/domain/Sort";

@Injectable()
export class MedicineRepository {
  constructor(
    @InjectModel(DB_MOELS.MEDICINES)
    private readonly model: Model<IMedicine>,
    private readonly mediaServices: MediaServices,
    private readonly compareServices: ComparationService,
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
    const found = await this.model.findOne({ product: id });

    if (found) {
      const result = await this.model.find().limit(6).populate("product");

      return result.map((r) => this.map(r));
    } else {
      return [];
    }
  }

  async filter({
    maxPrice,
    minPrice,
    name,
    page: ipage,
    providers,
    order,
  }: FilterMedicineProps): Promise<SearchResult> {
    const page = new FilterPage(ipage);

    const match = new MedicineMatch({ maxPrice, minPrice, providers });
    const sort = new MedicineSort(order);

    const result = await this.model.aggregate([
      {
        $lookup: {
          from: DB_MOELS.PRODUCTS,
          localField: "product",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: {
          path: "$product",
          preserveNullAndEmptyArrays: false,
        },
      },
      { $match: match.value },
      {
        $sort: sort.value,
      },
    ]);

    const all = result.slice(page.init, page.final);
    if (order === FILTER_ORDER.NAME) {
      const products = all
        .map((c) => {
          return new SimilarProduct({
            product: c,
            similarity: this.compareServices.compare(name, c.product.name),
          });
        })
        .sort((b, a) => b.similarity - a.similarity)
        .map((c) => this.map(c.product));

      return {
        result: products,
        totalPages: page.total(result.length),
      };
    } else {
      return {
        result: all.map((c) => this.map(c)),
        totalPages: page.total(result.length),
      };
    }
  }

  async findById(id: string): Promise<Medicine | null> {
    const found = await this.model.findOne({ product: id }).populate("product");
    return found ? this.map(found) : null;
  }

  async findByProductId(id: string): Promise<Medicine | null> {
    const found = await this.model.findOne({ product: id }).populate("product");
    return found ? this.map(found) : null;
  }

  private map(medicine: IMedicine): Medicine {
    return new Medicine({
      id: medicine.product._id,
      images: medicine.product.images.map((i) => ({
        name: i.name,
        size: i.size,
        source: this.mediaServices.getImageUrl(i.aws_key),
        id: i._id,
      })),
      name: medicine.product.name,
      price: medicine.product.price,
      provider: medicine.product.provider,
      categories: medicine.product.categories,
      type: PRODUCT_TYPES.MEDICINE,
      description: medicine.product.description,
    });
  }
}
