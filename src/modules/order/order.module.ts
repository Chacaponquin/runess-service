import { Module } from '@nestjs/common';
import { OrderMongoRepository } from './infrastructure/mongo/core/order-mongo-repository';
import { OrderRepository } from './services/order-repository';
import { OrderService } from './services/order-service';

@Module({
  imports: [],
  controllers: [],
  exports: [OrderService],
  providers: [OrderService, OrderRepository, OrderMongoRepository]
})
export class OrderModule {}
