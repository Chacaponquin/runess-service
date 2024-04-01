import { ROUTES } from "@modules/app/constants";
import { Body, Controller, Post } from "@nestjs/common";
import { CreateOrder } from "../use-cases";
import { OrderService } from "../services/order-service";
import { CreateOrderDTO } from "../dto/create";
import { PaymentService } from "@modules/payment/services/payment-service";
import { ClientServices } from "@modules/client/services/client.service";
import { ProductServices } from "@modules/product/services/product/product.services";

@Controller(ROUTES.ORDER.ROOT)
export class OrderController {
  constructor(
    private readonly orderServices: OrderService,
    private readonly paymentServices: PaymentService,
    private readonly clientServices: ClientServices,
    private readonly productServices: ProductServices,
  ) {}

  @Post(ROUTES.ORDER.CREATE)
  async create(@Body() dto: CreateOrderDTO) {
    const useCase = new CreateOrder(
      this.orderServices,
      this.paymentServices,
      this.clientServices,
      this.productServices,
    );

    return await useCase.execute(dto);
  }
}
