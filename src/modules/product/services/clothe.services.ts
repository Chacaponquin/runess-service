import { Injectable } from "@nestjs/common";
import { ClotheRepository } from "./clothe-repository";
import { CreateClotheDTO } from "../dto/clothe";
import { Clothe } from "../domain";
import { ProductServices } from "./product.services";

@Injectable()
export class ClotheServices {
  constructor(
    private readonly clotheRepository: ClotheRepository,
    private readonly productServices: ProductServices,
  ) {}

  async createClothe(dto: CreateClotheDTO): Promise<Clothe> {
    const product = await this.productServices.createProduct({
      images: dto.images,
      name: dto.name,
      originalPrice: dto.price,
      price: dto.price,
      provider: dto.provider,
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

  uploadImage(image: Express.Multer.File) {
    return this.clotheRepository.uploadImage(image);
  }
}
