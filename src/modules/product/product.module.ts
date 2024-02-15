import { Module } from '@nestjs/common';
import { ProductMongoRepository } from './infrastructure/mongo/core/product-mongo-repository';
import { DB_MOELS } from '@shared/constants';
import { ProductSchema } from './infrastructure/mongo/schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: DB_MOELS.PRODUCTS, useFactory: () => ProductSchema }
    ])
  ],
  providers: [ProductMongoRepository]
})
export class ProductModule {}
