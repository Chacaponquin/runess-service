import { RespMedicineDTO } from "@modules/product/dto/medicine";
import { GetDTO } from "@modules/product/dto/product";
import { MedicineServices } from "@modules/product/services/medicine/medicine.services";

export class GetMedicines {
  constructor(private readonly services: MedicineServices) {}

  async execute(dto: GetDTO): Promise<RespMedicineDTO[]> {
    const result = await this.services.get(dto);
    return result.map((r) => r.send());
  }
}
