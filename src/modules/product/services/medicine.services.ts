import { Injectable } from "@nestjs/common";
import { Clothe } from "../domain";
import { ProductServices } from "./product.services";
import { MedicineRepository } from "./medicine.repository";
import { CreateMedicineDTO, UpdateMedicineDTO } from "../dto/medicine";

@Injectable()
export class MedicineServices {
  constructor(
    private readonly repository: MedicineRepository,
    private readonly productServices: ProductServices,
  ) {}

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

  async createMedicine(dto: CreateMedicineDTO): Promise<Clothe> {
    const product = await this.productServices.createProduct({
      images: dto.images,
      name: dto.name,
      originalPrice: dto.price,
      price: dto.price,
      provider: dto.provider,
      category: dto.category,
    });

    try {
      const clothe = await this.repository.create({
        productId: product.id,
      });

      return clothe;
    } catch (error) {
      this.productServices.deleteOne(product.id);
      throw error;
    }
  }
}
