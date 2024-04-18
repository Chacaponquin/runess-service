import { PaymentService } from "@modules/payment/services/payment-service";
import { CreateOrderDTO, OrderItemDTO, RespCreateOrderDTO } from "../dto/order";
import { ClientServices } from "@modules/client/services/client.service";
import { ProductServices } from "@modules/product/services/product/product.services";
import { OrderMissingProductException } from "../exceptions";
import { OrderRepository } from "../services/order-repository";

export class CreateOrder {
  constructor(
    private readonly paymentServices: PaymentService,
    private readonly clientServices: ClientServices,
    private readonly productServices: ProductServices,
    private readonly orderRepository: OrderRepository,
  ) {}

  async execute(dto: CreateOrderDTO): Promise<RespCreateOrderDTO> {
    const client = await this.clientServices.createClient({
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      phone: dto.phone,
      userId: dto.userId,
    });

    const amount = await this.calculateAmount(dto.orders);
    const clientSecret = await this.paymentServices.createPaymentSession({
      amount: amount,
    });

    const payment = await this.paymentServices.createPayment({
      amount: amount,
      clientId: client.id,
      paymentType: dto.type,
    });

    await this.orderRepository.create({ orders: dto.orders, note: dto.note });

    return { clientSecret: clientSecret, paymentId: payment.id };
  }

  private async calculateAmount(orders: OrderItemDTO[]): Promise<number> {
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
