import { Injectable } from "@nestjs/common";
import { ClotheRepository } from "./clothe.repository";
import { CreateClotheDTO, UpdateClotheDTO } from "../dto/clothe";
import { Clothe } from "../domain";
import { ProductServices } from "./product.services";

@Injectable()
export class ClotheServices {
  constructor(
    private readonly clotheRepository: ClotheRepository,
    private readonly productServices: ProductServices,
  ) {}

  async delete(id: string): Promise<void> {
    const clothe = await this.clotheRepository.remove(id);

    if (clothe) {
      await this.productServices.deleteOne(clothe.productId);
    }
  }

  async update(id: string, props: UpdateClotheDTO) {
    const clothe = await this.clotheRepository.update({
      id: id,
      colors: props.colors,
      sizes: props.sizes,
    });

    if (clothe) {
      await this.productServices.update({
        ...props,
        originalPrice: props.price,
        id: clothe.productId,
      });
    }
  }

  async createClothe(dto: CreateClotheDTO): Promise<Clothe> {
    const product = await this.productServices.createProduct({
      images: dto.images,
      name: dto.name,
      originalPrice: dto.price,
      price: dto.price,
      provider: dto.provider,
      category: dto.category,
    });

    try {
      const clothe = await this.clotheRepository.create({
        productId: product.id,
        colors: dto.colors,
        sizes: dto.sizes,
      });

      return clothe;
    } catch (error) {
      this.productServices.deleteOne(product.id);
      throw error;
    }
  }
}
