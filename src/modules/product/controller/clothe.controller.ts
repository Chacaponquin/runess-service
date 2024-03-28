import { ROUTES } from "@modules/app/constants";
import { Body, Controller, Post } from "@nestjs/common";
import { ClotheServices } from "../services/clothe.services";
import { CreateClotheDTO } from "../dto/clothe";
import { CreateClothe } from "../use-cases";

@Controller(ROUTES.CLOTHE.ROOT)
export class ClotheController {
  constructor(private readonly clotheServices: ClotheServices) {}

  @Post(ROUTES.CLOTHE.CREATE)
  create(@Body() dto: CreateClotheDTO) {
    const useCase = new CreateClothe(this.clotheServices);
    useCase.execute(dto);
  }
}
