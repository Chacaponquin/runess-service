import { RespProductDTO } from "@modules/product/dto/product";
import { MedicineServices } from "@modules/product/services/medicine/medicine.services";

export class GetMedicineSimilars {
  constructor(private readonly services: MedicineServices) {}

  async execute(id: string): Promise<RespProductDTO[]> {
    const result = await this.services.similars(id);
    return result.map((r) => r.response());
  }
}
