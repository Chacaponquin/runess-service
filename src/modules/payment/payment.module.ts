import { Module } from '@nestjs/common';
import { PaymentService } from './services/payment-service';
import { PaymentMongoRepository } from './infrastructure/mongo/core/payment-mongo-repository';
import { PaymentRepository } from './services/payment-repository';

@Module({
  controllers: [],
  exports: [PaymentService],
  imports: [],
  providers: [PaymentService, PaymentMongoRepository, PaymentRepository]
})
export class PaymentModule {}
