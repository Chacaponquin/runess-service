import { ROUTES } from "@modules/app/constants";
import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateContactMessage, GetUserOrders } from "../use-cases";
import { CreateContactMessageDTO } from "../dto/message";
import { UserService } from "../services/user.service";

@Controller(ROUTES.USER.ROOT)
export class UserController {
  constructor(private readonly userServices: UserService) {}

  @Post(ROUTES.USER.CONTACT)
  async contact(@Body() dto: CreateContactMessageDTO) {
    const useCase = new CreateContactMessage(this.userServices);
    await useCase.execute(dto);
  }

  @Get(ROUTES.USER.ORDERS)
  async orders() {
    const useCase = new GetUserOrders();
    const orders = await useCase.execute();
    return orders;
  }
}
