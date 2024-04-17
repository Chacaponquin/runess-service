import { FilterClotheDTO } from "@modules/product/dto/clothe";
import { SearchResultDTO } from "@modules/product/dto/product";
import { ClotheRepository } from "@modules/product/services/clothe/clothe.repository";

export class FilterClothes {
  constructor(private readonly repository: ClotheRepository) {}

  async execute(dto: FilterClotheDTO): Promise<SearchResultDTO> {
    const result = await this.repository.filter(dto);
    return {
      result: result.result.map((r) => r.response()),
      totalPages: result.totalPages,
    };
  }
}
