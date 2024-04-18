import { ROUTES } from "@modules/app/constants";
import { Body, Controller, Post } from "@nestjs/common";
import { CreateOrder, GetOrders } from "../use-cases";
import { OrderService } from "../services/order-service";
import {
  CreateOrderDTO,
  GetDTO,
  RespCreateOrderDTO,
  RespOrderDTO,
} from "../dto/order";
import { PaymentService } from "@modules/payment/services/payment-service";
import { ClientServices } from "@modules/client/services/client.service";
import { ProductServices } from "@modules/product/services/product/product.services";
import { OrderRepository } from "../services/order-repository";

@Controller(ROUTES.ORDER.ROOT)
export class OrderController {
  constructor(
    private readonly orderServices: OrderService,
    private readonly paymentServices: PaymentService,
    private readonly clientServices: ClientServices,
    private readonly productServices: ProductServices,
    private readonly repository: OrderRepository,
  ) {}

  @Post(ROUTES.ORDER.CREATE)
  async create(@Body() dto: CreateOrderDTO): Promise<RespCreateOrderDTO> {
    const useCase = new CreateOrder(
      this.paymentServices,
      this.clientServices,
      this.productServices,
      this.repository,
    );

    return await useCase.execute(dto);
  }

  @Post(ROUTES.ORDER.GET)
  async get(@Body() dto: GetDTO): Promise<RespOrderDTO[]> {
    const useCase = new GetOrders(this.orderServices);
    return await useCase.execute(dto);
  }
}
