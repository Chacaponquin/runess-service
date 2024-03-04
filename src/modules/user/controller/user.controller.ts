import { ROUTES } from "@modules/app/constants";
import { Body, Controller, Post } from "@nestjs/common";
import { CreateContactMessageDTO } from "../dto/create";
import { CreateContactMessage } from "../use-cases";

@Controller(ROUTES.USER.ROOT)
export class UserController {
  @Post(ROUTES.USER.CONTACT)
  async contact(@Body() dto: CreateContactMessageDTO) {
    const useCase = new CreateContactMessage();
    await useCase.execute(dto);
  }
}
