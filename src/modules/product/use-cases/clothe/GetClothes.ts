import { RespClotheDTO } from "@modules/product/dto/clothe";
import { GetDTO } from "@modules/product/dto/product";
import { ClotheServices } from "@modules/product/services/clothe/clothe.services";

export class GetClothes {
  constructor(private readonly services: ClotheServices) {}

  async execute(dto: GetDTO): Promise<RespClotheDTO[]> {
    const data = await this.services.get(dto);
    return data.map((d) => d.send());
  }
}
