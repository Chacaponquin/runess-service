import { UpdateClotheDTO } from "@modules/product/dto/clothe";
import { ClotheServices } from "@modules/product/services/clothe/clothe.services";

interface Props {
  id: string;
  dto: UpdateClotheDTO;
}

export class UpdateClothe {
  constructor(private readonly clotheServices: ClotheServices) {}

  async execute({ id, dto }: Props) {
    await this.clotheServices.update(id, dto);
  }
}
