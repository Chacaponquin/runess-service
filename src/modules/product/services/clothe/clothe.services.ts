import { Injectable, OnModuleInit } from "@nestjs/common";
import { ClotheRepository } from "./clothe.repository";
import { CreateClotheDTO, UpdateClotheDTO } from "../../dto/clothe";
import { ProductServices } from "../product/product.services";
import { chaca, schemas } from "chaca";
import { PRODUCT_TYPES } from "../../constants";
import { Clothe, ProductColor } from "../../domain";
import { GetProps } from "@modules/product/interfaces/product";

@Injectable()
export class ClotheServices implements OnModuleInit {
  constructor(
    private readonly clotheRepository: ClotheRepository,
    private readonly productServices: ProductServices,
  ) {}

  async onModuleInit() {
    let len = await this.clotheRepository.length();

    const schema = chaca.schema<CreateClotheDTO>({
      name: schemas.lorem.words({}),
      price: schemas.dataType.float({ min: 1, max: 100, precision: 2 }),
      provider: chaca.enum(this.productServices.providers.clothes),
      images() {
        return [];
      },
      categories: {
        type: chaca.enum(this.productServices.categories.clothes),
        isArray: { min: 1, max: 3 },
      },
      colors: {
        type: chaca.enum(this.productServices.colors.values.map((v) => v.name)),
        isArray: { min: 1, max: 5 },
      },
      sizes: {
        type: chaca.enum(["S", "XS", "XL", "2XL", "3XL"]),
        isArray: { min: 1, max: 4 },
      },
    });

    while (len < 10000) {
      await this.createClothe(schema.generateObject());
      len++;
    }
  }

  async delete(id: string): Promise<void> {
    await this.clotheRepository.remove(id);
    await this.productServices.deleteOne(id);
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
        id: clothe.id,
      });
    }
  }

  findById(id: string): Promise<Clothe | null> {
    return this.clotheRepository.findById(id);
  }

  similars(id: string): Promise<Clothe[]> {
    return this.clotheRepository.similars(id);
  }

  async createClothe(dto: CreateClotheDTO): Promise<string> {
    const product = await this.productServices.createProduct({
      images: dto.images,
      name: dto.name,
      originalPrice: dto.price,
      price: dto.price,
      provider: dto.provider,
      categories: dto.categories,
      type: PRODUCT_TYPES.CLOTHE,
      description: dto.description,
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

  get(props: GetProps): Promise<Clothe[]> {
    return this.clotheRepository.get(props);
  }

  allSizes(): Promise<string[]> {
    return this.clotheRepository.allSizes();
  }

  allColors(): ProductColor[] {
    return this.productServices.colors.values;
  }
}
