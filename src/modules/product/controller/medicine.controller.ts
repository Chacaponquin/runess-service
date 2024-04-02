import { ROUTES } from "@modules/app/constants";
import { Body, Controller, Delete, Param, Post, Put } from "@nestjs/common";
import {
  CreateMedicineDTO,
  FilterMedicinesDTO,
  RespMedicineDTO,
  UpdateMedicineDTO,
} from "../dto/medicine";
import {
  CreateMedicine,
  DeleteMedicine,
  FilterMedicines,
  GetNewProducts,
  GetTopFavoriteProducts,
  GetTrendingProducts,
  UpdateMedicine,
} from "../use-cases";
import { MedicineServices } from "../services/medicine/medicine.services";
import { GetSpecificProductsDTO, RespProductDTO } from "../dto/product";
import { ProductServices } from "../services/product/product.services";
import { PRODUCT_TYPES } from "../constants";

@Controller(ROUTES.MEDICINE.ROOT)
export class MedicineController {
  constructor(
    private readonly services: MedicineServices,
    private readonly productServices: ProductServices,
  ) {}

  @Post(ROUTES.SECTION.CREATE)
  async create(@Body() dto: CreateMedicineDTO): Promise<void> {
    const useCase = new CreateMedicine(this.services);
    await useCase.execute(dto);
  }

  @Put(ROUTES.SECTION.UPDATE)
  async update(
    @Param("id") id: string,
    @Body() dto: UpdateMedicineDTO,
  ): Promise<void> {
    const useCase = new UpdateMedicine(this.services);
    await useCase.execute({ id, dto });
  }

  @Delete(ROUTES.SECTION.REMOVE)
  async delete(@Param("id") id: string): Promise<void> {
    const useCase = new DeleteMedicine(this.services);
    await useCase.execute(id);
  }

  @Post(ROUTES.SECTION.FILTER)
  async filter(@Body() dto: FilterMedicinesDTO): Promise<RespMedicineDTO[]> {
    const useCase = new FilterMedicines(this.services);
    return await useCase.execute(dto);
  }

  @Post(ROUTES.SECTION.TRENDING)
  async trending(
    @Body() dto: GetSpecificProductsDTO,
  ): Promise<RespProductDTO[]> {
    const useCase = new GetTrendingProducts(this.productServices);
    return await useCase.execute(dto, PRODUCT_TYPES.MEDICINE);
  }

  @Post(ROUTES.SECTION.NEW)
  async news(@Body() dto: GetSpecificProductsDTO): Promise<RespProductDTO[]> {
    const useCase = new GetNewProducts(this.productServices);
    return await useCase.execute(dto, PRODUCT_TYPES.MEDICINE);
  }

  @Post(ROUTES.SECTION.POPULAR)
  async populars(
    @Body() dto: GetSpecificProductsDTO,
  ): Promise<RespProductDTO[]> {
    const useCase = new GetTopFavoriteProducts(this.productServices);
    return await useCase.execute(dto, PRODUCT_TYPES.MEDICINE);
  }
}
