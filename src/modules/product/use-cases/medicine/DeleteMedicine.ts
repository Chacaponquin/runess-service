import { MedicineServices } from "@modules/product/services/medicine.services";

export class DeleteMedicine {
  constructor(private readonly medicineServices: MedicineServices) {}

  async execute(id: string) {
    await this.medicineServices.delete(id);
  }
}
