import { Module } from "@nestjs/common";
import { OrderRepository } from "./services/order-repository";
import { OrderService } from "./services/order-service";
import { OrderController } from "./controller/order.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants";
import { OrderSchema } from "./infrastructure/mongo/schema";
import { ClientModule } from "@modules/client/client.module";
import { ProductModule } from "@modules/product/product.module";
import { PaymentModule } from "@modules/payment/payment.module";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: DB_MOELS.ORDER, useFactory: () => OrderSchema },
    ]),
    ClientModule,
    ProductModule,
    PaymentModule,
  ],
  controllers: [OrderController],
  exports: [OrderService],
  providers: [OrderService, OrderRepository],
})
export class OrderModule {}
