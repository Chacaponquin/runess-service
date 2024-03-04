import { ROUTES } from "@modules/app/constants";
import { Controller, Post } from "@nestjs/common";

@Controller(ROUTES.ORDER.ROOT)
export class OrderController {
  @Post(ROUTES.ORDER.CREATE)
  async create() {}
}
