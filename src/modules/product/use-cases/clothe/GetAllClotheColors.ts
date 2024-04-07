import { ProductColorDTO } from "@modules/product/dto/clothe";
import { ClotheServices } from "@modules/product/services/clothe/clothe.services";

export class GetAllClotheColors {
  constructor(private readonly services: ClotheServices) {}

  execute(): ProductColorDTO[] {
    return this.services.allColors()
  }
}
