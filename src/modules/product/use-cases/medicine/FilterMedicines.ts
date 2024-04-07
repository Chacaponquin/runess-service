import {
  FilterMedicinesDTO,
  RespMedicineDTO,
} from "@modules/product/dto/medicine";
import { MedicineServices } from "@modules/product/services/medicine/medicine.services";

export class FilterMedicines {
  constructor(private readonly services: MedicineServices) {}

  async execute(dto: FilterMedicinesDTO): Promise<RespMedicineDTO[]> {
    const result = await this.services.filter(dto);
    return result.map((r) => r.send());
  }
}
