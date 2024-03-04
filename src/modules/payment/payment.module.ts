import { Module } from "@nestjs/common";
import { PaymentService } from "./services/payment-service";
import { PaymentMongoRepository } from "./infrastructure/mongo/core/payment-mongo-repository";
import { PaymentRepository } from "./services/payment-repository";
import { DB_MOELS } from "@shared/constants";
import { MongooseModule } from "@nestjs/mongoose";
import { UserPaymentSchema } from "./infrastructure/mongo/schema";

@Module({
  controllers: [],
  exports: [PaymentService],
  imports: [
    MongooseModule.forFeatureAsync([
      { name: DB_MOELS.USER_PAYMENT, useFactory: () => UserPaymentSchema },
    ]),
  ],
  providers: [PaymentService, PaymentMongoRepository, PaymentRepository],
})
export class PaymentModule {}
