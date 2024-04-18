import { Module } from "@nestjs/common";
import { PaymentService } from "./services/payment-service";
import { PaymentRepository } from "./services/payment-repository";
import { DB_MOELS } from "@shared/constants";
import { MongooseModule } from "@nestjs/mongoose";
import {
  ClientCardPaymentSchema,
  ClientPaymentSchema,
} from "./infrastructure/mongo/schema";

@Module({
  controllers: [],
  exports: [PaymentService],
  imports: [
    MongooseModule.forFeatureAsync([
      { name: DB_MOELS.CLIENT_PAYMENT, useFactory: () => ClientPaymentSchema },
      {
        name: DB_MOELS.CLIENT_CARD_PAYMENT,
        useFactory: () => ClientCardPaymentSchema,
      },
    ]),
  ],
  providers: [PaymentService, PaymentRepository],
})
export class PaymentModule {}
