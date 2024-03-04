import { Module } from "@nestjs/common";
import { OrderMongoRepository } from "./infrastructure/mongo/core/order-mongo-repository";
import { OrderRepository } from "./services/order-repository";
import { OrderService } from "./services/order-service";
import { OrderController } from "./controller/order.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants";
import { OrderSchema } from "./infrastructure/mongo/schema";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: DB_MOELS.ORDER, useFactory: () => OrderSchema },
    ]),
  ],
  controllers: [OrderController],
  exports: [OrderService],
  providers: [OrderService, OrderRepository, OrderMongoRepository],
})
export class OrderModule {}
