import { ROUTES } from "@modules/app/constants";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
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
  FindMedicineById,
  GetMedicines,
  GetMedicineSimilars,
  GetNewProducts,
  GetTopFavoriteProducts,
  GetTrendingProducts,
  UpdateMedicine,
} from "../use-cases";
import { MedicineServices } from "../services/medicine/medicine.services";
import { GetDTO, GetSpecificProductsDTO, RespProductDTO } from "../dto/product";
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

  @Get(ROUTES.SECTION.FIND)
  async find(@Param("id") id: string): Promise<RespMedicineDTO> {
    const useCase = new FindMedicineById(this.services);
    return await useCase.execute(id);
  }

  @Post()
  async get(@Body() dto: GetDTO): Promise<RespMedicineDTO[]> {
    const useCase = new GetMedicines(this.services);
    return await useCase.execute(dto);
  }

  @Get(ROUTES.SECTION.SIMILARS)
  async similars(@Param("id") id: string): Promise<RespProductDTO[]> {
    const useCase = new GetMedicineSimilars(this.services);
    return await useCase.execute(id);
  }
}
