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
import { ClotheServices } from "../services/clothe/clothe.services";
import {
  CreateClotheDTO,
  FilterClotheDTO,
  RespClotheDTO,
  UpdateClotheDTO,
} from "../dto/clothe";
import {
  CreateClothe,
  DeleteClothe,
  FilterClothes,
  FindClotheById,
  GetAllClothesSizes,
  GetClothes,
  GetNewProducts,
  GetTopFavoriteProducts,
  GetTrendingProducts,
  UpdateClothe,
} from "../use-cases";
import { GetDTO, GetSpecificProductsDTO, RespProductDTO } from "../dto/product";
import { ProductServices } from "../services/product/product.services";
import { PRODUCT_TYPES } from "../constants";

@Controller(ROUTES.CLOTHE.ROOT)
export class ClotheController {
  constructor(
    private readonly clotheServices: ClotheServices,
    private readonly productServices: ProductServices,
  ) {}

  @Post(ROUTES.SECTION.CREATE)
  async create(@Body() dto: CreateClotheDTO): Promise<void> {
    const useCase = new CreateClothe(this.clotheServices);
    await useCase.execute(dto);
  }

  @Put(ROUTES.SECTION.UPDATE)
  async update(
    @Param("id") id: string,
    @Body() dto: UpdateClotheDTO,
  ): Promise<void> {
    const useCase = new UpdateClothe(this.clotheServices);
    await useCase.execute({ id: id, dto: dto });
  }

  @Delete(ROUTES.SECTION.REMOVE)
  async delete(@Param("id") id: string): Promise<void> {
    const useCase = new DeleteClothe(this.clotheServices);
    await useCase.execute(id);
  }

  @Post(ROUTES.SECTION.FILTER)
  async filter(@Body() dto: FilterClotheDTO): Promise<Array<RespClotheDTO>> {
    const useCase = new FilterClothes(this.clotheServices);
    return await useCase.execute(dto);
  }

  @Post(ROUTES.SECTION.TRENDING)
  async trending(
    @Body() dto: GetSpecificProductsDTO,
  ): Promise<RespProductDTO[]> {
    const useCase = new GetTrendingProducts(this.productServices);
    return await useCase.execute(dto, PRODUCT_TYPES.CLOTHE);
  }

  @Post(ROUTES.SECTION.NEW)
  async news(@Body() dto: GetSpecificProductsDTO): Promise<RespProductDTO[]> {
    const useCase = new GetNewProducts(this.productServices);
    return await useCase.execute(dto, PRODUCT_TYPES.CLOTHE);
  }

  @Post(ROUTES.SECTION.POPULAR)
  async populars(
    @Body() dto: GetSpecificProductsDTO,
  ): Promise<RespProductDTO[]> {
    const useCase = new GetTopFavoriteProducts(this.productServices);
    return await useCase.execute(dto, PRODUCT_TYPES.CLOTHE);
  }

  @Post()
  async get(@Body() dto: GetDTO): Promise<RespClotheDTO[]> {
    const useCase = new GetClothes(this.clotheServices);
    return await useCase.execute(dto);
  }

  @Get(ROUTES.CLOTHE.ALL_SIZES)
  async allSizes(): Promise<string[]> {
    const useCase = new GetAllClothesSizes(this.clotheServices);
    return await useCase.execute();
  }

  @Get(ROUTES.SECTION.FIND)
  async find(@Param("id") id: string): Promise<RespClotheDTO> {
    const useCase = new FindClotheById(this.clotheServices);
    return await useCase.execute(id);
  }
}
