import { ROUTES } from "@modules/app/constants";
import { Body, Controller, Delete, Param, Post, Put } from "@nestjs/common";
import { ClotheServices } from "../services/clothe.services";
import { CreateClotheDTO, UpdateClotheDTO } from "../dto/clothe";
import { CreateClothe, DeleteClothe, UpdateClothe } from "../use-cases";

@Controller(ROUTES.CLOTHE.ROOT)
export class ClotheController {
  constructor(private readonly clotheServices: ClotheServices) {}

  @Post(ROUTES.CLOTHE.CREATE)
  async create(@Body() dto: CreateClotheDTO) {
    const useCase = new CreateClothe(this.clotheServices);
    await useCase.execute(dto);
  }

  @Put(ROUTES.CLOTHE.UPDATE)
  async update(
    @Param("id") id: string,
    @Body() dto: UpdateClotheDTO,
  ): Promise<void> {
    const useCase = new UpdateClothe(this.clotheServices);
    await useCase.execute({ id: id, dto: dto });
  }

  @Delete(ROUTES.CLOTHE.REMOVE)
  async delete(@Param("id") id: string): Promise<void> {
    const useCase = new DeleteClothe(this.clotheServices);
    await useCase.execute(id);
  }
}
