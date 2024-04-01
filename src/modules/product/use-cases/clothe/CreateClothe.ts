import { CreateClotheDTO } from "@modules/product/dto/clothe";
import { ClotheServices } from "@modules/product/services/clothe/clothe.services";

export class CreateClothe {
  constructor(private readonly clotheServices: ClotheServices) {}

  async execute(dto: CreateClotheDTO) {
    const clothe = await this.clotheServices.createClothe(dto);
    return clothe;
  }
}
