import { CreateClotheDTO } from "@modules/product/dto/clothe";
import { ClotheServices } from "@modules/product/services/clothe.services";

export class CreateClothe {
  constructor(private readonly clotheServices: ClotheServices) {}

  execute(dto: CreateClotheDTO) {
    this.clotheServices.createClothe(dto);
  }
}
