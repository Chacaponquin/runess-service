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
  GetFavoriteCount,
  GetOrdersCount,
  GetUserByToken,
  GetUserFavorites,
  GetUserOrders,
} from "../use-cases";
import { CreateContactMessageDTO } from "../dto/message";
import { UserService } from "../services/user.service";
import { UserAccessGuard, UserRefreshGuard } from "../guards/user.guard";
import {
  AddProductToFavoriteDTO,
  DeleteProductFromFavoriteDTO,
  RespCurrentUserDTO,
} from "../dto/user";
import { UserRequest } from "../interfaces/request";
import { ProductServices } from "@modules/product/services/product/product.services";
import { RespProductDTO } from "@modules/product/dto/product";

@Controller(ROUTES.USER.ROOT)
export class UserController {
  constructor(
    private readonly userServices: UserService,
    private readonly productServices: ProductServices,
  ) {}

  @Post(ROUTES.USER.CONTACT)
  async contact(@Body() dto: CreateContactMessageDTO) {
    const useCase = new CreateContactMessage(this.userServices);
    await useCase.execute(dto);
  }

  @UseGuards(UserAccessGuard)
  @Get(ROUTES.USER.ORDERS)
  async orders() {
    const useCase = new GetUserOrders();
    const orders = await useCase.execute();
    return orders;
  }

  @UseGuards(UserAccessGuard)
  @Get(ROUTES.USER.FAVORITES)
  async favorites(@Req() req: UserRequest): Promise<RespProductDTO[]> {
    const useCase = new GetUserFavorites(this.userServices);
    return await useCase.execute(req.user.id);
  }

  @UseGuards(UserAccessGuard)
  @Get(ROUTES.USER.FAVORITES_COUNT)
  async favoriteCount(@Req() req: UserRequest): Promise<number> {
    const useCase = new GetFavoriteCount(this.userServices);
    return await useCase.execute(req.user.id);
  }

  @UseGuards(UserAccessGuard)
  @Get(ROUTES.USER.ORDERS_COUNT)
  async orderCount(@Req() req: UserRequest): Promise<number> {
    const useCase = new GetOrdersCount(this.userServices);
    return await useCase.execute(req.user.id);
  }

  @UseGuards(UserAccessGuard)
  @Put(ROUTES.USER.ADD_PRODUCT_FAVORITE)
  async add(
    @Body() dto: AddProductToFavoriteDTO,
    @Req() req: UserRequest,
  ): Promise<void> {
    const useCase = new AddProductToFavorites(
      this.userServices,
      this.productServices,
    );

    await useCase.execute({ productId: dto.productId, user: req.user });
  }

  @UseGuards(UserAccessGuard)
  @Put(ROUTES.USER.DELETE_PRODUCT_FAVORITE)
  async delete(
    @Body() dto: DeleteProductFromFavoriteDTO,
    @Req() req: UserRequest,
  ): Promise<void> {
    const useCase = new DeleteProductFromFavorites(
      this.userServices,
      this.productServices,
    );

    await useCase.execute({ dto: dto, user: req.user });
  }

  @UseGuards(UserRefreshGuard)
  @Get(ROUTES.USER.REFRESH)
  async refresh(@Req() req: UserRequest): Promise<RespCurrentUserDTO> {
    const useCase = new GetUserByToken(this.userServices);
    return await useCase.execute(req.user);
  }
}
