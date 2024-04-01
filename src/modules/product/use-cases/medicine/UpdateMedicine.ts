import { UpdateMedicineDTO } from "@modules/product/dto/medicine";
import { MedicineServices } from "@modules/product/services/medicine/medicine.services";

interface Props {
  id: string;
  dto: UpdateMedicineDTO;
}

export class UpdateMedicine {
  constructor(private readonly medicineServices: MedicineServices) {}

  async execute({ dto, id }: Props) {
    await this.medicineServices.update(id, dto);
  }
}
