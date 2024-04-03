import { RespMedicineDTO } from "@modules/product/dto/medicine";
import { MedicineServices } from "@modules/product/services/medicine/medicine.services";
import { NotFoundException } from "@nestjs/common";

export class FindMedicineById {
  constructor(private readonly services: MedicineServices) {}

  async execute(id: string): Promise<RespMedicineDTO> {
    const found = await this.services.findByProductId(id);

    if (found) {
      return found.send();
    } else {
      throw new NotFoundException();
    }
  }
}
