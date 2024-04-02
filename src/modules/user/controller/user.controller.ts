import { ROUTES } from "@modules/app/constants";
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common";
import {
  AddProductToFavorites,
  CreateContactMessage,
  DeleteProductFromFavorites,
  GetUserOrders,
} from "../use-cases";
import { CreateContactMessageDTO } from "../dto/message";
import { UserService } from "../services/user.service";
import { UserGuard } from "../guards/user.guard";
import {
  AddProductToFavoriteDTO,
  DeleteProductFromFavoriteDTO,
} from "../dto/user";
import { UserRequest } from "../interfaces/request";

@Controller(ROUTES.USER.ROOT)
export class UserController {
  constructor(private readonly userServices: UserService) {}

  @Post(ROUTES.USER.CONTACT)
  async contact(@Body() dto: CreateContactMessageDTO) {
    const useCase = new CreateContactMessage(this.userServices);
    await useCase.execute(dto);
  }

  @UseGuards(UserGuard)
  @Get(ROUTES.USER.ORDERS)
  async orders() {
    const useCase = new GetUserOrders();
    const orders = await useCase.execute();
    return orders;
  }

  @UseGuards(UserGuard)
  @Put(ROUTES.USER.ADD_PRODUCT_FAVORITE)
  async add(
    @Body() dto: AddProductToFavoriteDTO,
    @Req() req: UserRequest,
  ): Promise<void> {
    const useCase = new AddProductToFavorites(this.userServices);
    await useCase.execute({ productId: dto.productId, user: req.user });
  }

  @UseGuards(UserGuard)
  @Put(ROUTES.USER.DELETE_PRODUCT_FAVORITE)
  async delete(
    @Body() dto: DeleteProductFromFavoriteDTO,
    @Req() req: UserRequest,
  ): Promise<void> {
    const useCase = new DeleteProductFromFavorites(this.userServices);
    await useCase.execute({ dto: dto, user: req.user });
  }
}
