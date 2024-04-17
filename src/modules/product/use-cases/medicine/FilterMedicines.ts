import { FilterMedicinesDTO } from "@modules/product/dto/medicine";
import { SearchResultDTO } from "@modules/product/dto/product";
import { MedicineRepository } from "@modules/product/services/medicine/medicine.repository";

export class FilterMedicines {
  constructor(private readonly respotiory: MedicineRepository) {}

  async execute(dto: FilterMedicinesDTO): Promise<SearchResultDTO> {
    const result = await this.respotiory.filter(dto);
    return {
      result: result.result.map((r) => r.response()),
      totalPages: result.totalPages,
    };
  }
}
