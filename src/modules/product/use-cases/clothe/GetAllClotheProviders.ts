import { ClotheRepository } from "@modules/product/services/clothe/clothe.repository";

export class GetAllClotheProviders {
  constructor(private readonly clotheRepository: ClotheRepository) {}

  async execute(): Promise<string[]> {
    return await this.clotheRepository.allProviders();
  }
}
