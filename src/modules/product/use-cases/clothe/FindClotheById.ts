import { RespClotheDTO } from "@modules/product/dto/clothe";
import { ClotheServices } from "@modules/product/services/clothe/clothe.services";
import { NotFoundException } from "@nestjs/common";

export class FindClotheById {
  constructor(private readonly services: ClotheServices) {}

  async execute(id: string): Promise<RespClotheDTO> {
    const found = await this.services.findByProductId(id);

    if (found) {
      return found.send();
    } else {
      throw new NotFoundException();
    }
  }
}
