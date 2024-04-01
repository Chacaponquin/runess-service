import { Injectable, OnModuleInit } from "@nestjs/common";
import { ProductServices } from "../product/product.services";
import { MedicineRepository } from "./medicine.repository";
import {
  CreateMedicineDTO,
  FilterMedicinesDTO,
  UpdateMedicineDTO,
} from "../../dto/medicine";
import { chaca, schemas } from "chaca";
import { PRODUCT_TYPES } from "../../constants";
import { Medicine } from "../../domain";

@Injectable()
export class MedicineServices implements OnModuleInit {
  constructor(
    private readonly repository: MedicineRepository,
    private readonly productServices: ProductServices,
  ) {}

  async onModuleInit() {
    let len = await this.repository.length();

    const schema = chaca.schema<CreateMedicineDTO>({
      name: schemas.lorem.words({}),
      price: schemas.dataType.float({ min: 1, max: 100, precision: 2 }),
      provider: chaca.enum(this.productServices.providers.medicines),
      images() {
        return [];
      },
      categories: {
        type: chaca.enum(this.productServices.categories.medicines),
        isArray: { min: 1, max: 3 },
      },
    });

    while (len < 10000) {
      await this.createMedicine(schema.generateObject());
      len++;
    }
  }

  async delete(id: string): Promise<void> {
    const clothe = await this.repository.remove(id);

    if (clothe) {
      await this.productServices.deleteOne(clothe.productId);
    }
  }

  async update(id: string, dto: UpdateMedicineDTO) {
    const found = await this.productServices.findById(id);

    if (found) {
      await this.productServices.update({
        ...dto,
        originalPrice: dto.price,
        id: found.id,
      });
    }
  }

  filter(props: FilterMedicinesDTO): Promise<Medicine[]> {
    return this.repository.filter(props);
  }

  async createMedicine(dto: CreateMedicineDTO): Promise<string> {
    const product = await this.productServices.createProduct({
      images: dto.images,
      name: dto.name,
      originalPrice: dto.price,
      price: dto.price,
      provider: dto.provider,
      categories: dto.categories,
      type: PRODUCT_TYPES.MEDICINE,
    });

    try {
      const id = await this.repository.create({
        productId: product.id,
      });

      return id;
    } catch (error) {
      this.productServices.deleteOne(product.id);
      throw error;
    }
  }
}
