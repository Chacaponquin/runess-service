import { ROUTES } from "@modules/app/constants";
import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateContactMessageDTO } from "../dto/create";
import { CreateContactMessage, GetUserOrders } from "../use-cases";

@Controller(ROUTES.USER.ROOT)
export class UserController {
  @Post(ROUTES.USER.CONTACT)
  async contact(@Body() dto: CreateContactMessageDTO) {
    const useCase = new CreateContactMessage();
    await useCase.execute(dto);
  }

  @Get(ROUTES.USER.ORDERS)
  async orders() {
    const useCase = new GetUserOrders();
    const orders = await useCase.execute();
    return orders;
  }
}
