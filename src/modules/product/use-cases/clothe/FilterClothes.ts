import { FilterClotheDTO, RespClotheDTO } from "@modules/product/dto/clothe";
import { ClotheServices } from "@modules/product/services/clothe/clothe.services";

export class FilterClothes {
  constructor(private readonly services: ClotheServices) {}

  async execute(dto: FilterClotheDTO): Promise<RespClotheDTO[]> {
    const result = await this.services.filter(dto);
    return result.map((r) => r.send());
  }
}
