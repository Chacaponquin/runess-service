import { CreateMedicineDTO } from "@modules/product/dto/medicine";
import { MedicineServices } from "@modules/product/services/medicine/medicine.services";

export class CreateMedicine {
  constructor(private readonly medicineServices: MedicineServices) {}

  async execute(dto: CreateMedicineDTO) {
    await this.medicineServices.createMedicine(dto);
  }
}
