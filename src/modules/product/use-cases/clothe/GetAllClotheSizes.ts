import { ClotheServices } from "@modules/product/services/clothe/clothe.services";

export class GetAllClothesSizes {
  constructor(private readonly services: ClotheServices) {}

  async execute(): Promise<string[]> {
    return await this.services.allSizes();
  }
}
