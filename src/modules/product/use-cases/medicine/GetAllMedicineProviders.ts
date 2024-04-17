import { MedicineRepository } from "@modules/product/services/medicine/medicine.repository";

export class GetAllMedicineProviders {
  constructor(private readonly medicineRepository: MedicineRepository) {}

  async execute(): Promise<string[]> {
    return await this.medicineRepository.allProviders();
  }
}
