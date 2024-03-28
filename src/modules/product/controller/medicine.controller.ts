import { ROUTES } from "@modules/app/constants";
import { Body, Controller, Delete, Param, Post, Put } from "@nestjs/common";
import { CreateMedicineDTO, UpdateMedicineDTO } from "../dto/medicine";
import { CreateMedicine, DeleteMedicine, UpdateMedicine } from "../use-cases";
import { MedicineServices } from "../services/medicine.services";

@Controller(ROUTES.MEDICINE.ROOT)
export class MedicineController {
  constructor(private readonly services: MedicineServices) {}

  @Post(ROUTES.MEDICINE.CREATE)
  async create(@Body() dto: CreateMedicineDTO): Promise<void> {
    const useCase = new CreateMedicine(this.services);
    await useCase.execute(dto);
  }

  @Put(ROUTES.MEDICINE.UPDATE)
  async update(
    @Param("id") id: string,
    @Body() dto: UpdateMedicineDTO,
  ): Promise<void> {
    const useCase = new UpdateMedicine(this.services);
    await useCase.execute({ id, dto });
  }

  @Delete(ROUTES.MEDICINE.REMOVE)
  async delete(@Param("id") id: string): Promise<void> {
    const useCase = new DeleteMedicine(this.services);
    await useCase.execute(id);
  }
}
