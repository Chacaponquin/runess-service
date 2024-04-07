import { RespProductDTO } from "@modules/product/dto/product";
import { ClotheServices } from "@modules/product/services/clothe/clothe.services";

export class GetClotheSimilars {
  constructor(private readonly services: ClotheServices) {}

  async execute(id: string): Promise<RespProductDTO[]> {
    const data = await this.services.similars(id);
    return data.map((d) => d.response());
  }
}
