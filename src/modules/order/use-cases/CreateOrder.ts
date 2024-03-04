import { PaymentService } from "@modules/payment/services/payment-service";
import { CreateOrderDTO, OrderItemDTO } from "../dto/create";
import { OrderService } from "../services/order-service";
import { ClientServices } from "@modules/client/services/client.service";
import { ProductServices } from "@modules/product/services/product.services";
import { OrderMissingProductException } from "../exceptions";

export class CreateOrder {
  constructor(
    private readonly orderServices: OrderService,
    private readonly paymentServices: PaymentService,
    private readonly clientServices: ClientServices,
    private readonly productServices: ProductServices,
  ) {}

  async execute(dto: CreateOrderDTO): Promise<string> {
    const client = await this.clientServices.createClient(dto);

    const amout = await this._calculateAmount(dto.orders);
    const cardPayment = await this.paymentServices.createClientCardPayment({
      amount: amout,
      clientId: client.id,
    });

    await this.orderServices.createOrder({
      orders: dto.orders,
      userPaymentId: cardPayment.id,
    });

    return "";
  }

  async _calculateAmount(orders: Array<OrderItemDTO>): Promise<number> {
    let amount = 0;

    for (const order of orders) {
      const foundProduct = await this.productServices.findById(order.productId);

      if (foundProduct) {
        amount += order.quantity * foundProduct.price;
      } else {
        throw new OrderMissingProductException();
      }
    }

    return amount;
  }
}
