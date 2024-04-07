import { ClotheServices } from "@modules/product/services/clothe/clothe.services";

export class DeleteClothe {
  constructor(private readonly clotheServices: ClotheServices) {}

  async execute(id: string): Promise<void> {
    await this.clotheServices.delete(id);
  }
}
