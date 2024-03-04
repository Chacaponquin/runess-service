import { Module } from "@nestjs/common";
import { ProductMongoRepository } from "./infrastructure/mongo/core/product-mongo-repository";
import { DB_MOELS } from "@shared/constants";
import { ClotheSchema, ProductSchema } from "./infrastructure/mongo/schema";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductRepository } from "./services/product-repository";
import { ProductServices } from "./services/product.services";
import { ClotheServices } from "./services/clothe.services";
import { ClotheMongoRepository } from "./infrastructure/mongo/core/clothe-mongo-repository";
import { ClotheRepository } from "./services/clothe-repository";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: DB_MOELS.PRODUCTS, useFactory: () => ProductSchema },
      { name: DB_MOELS.CLOTHE, useFactory: () => ClotheSchema },
    ]),
  ],
  providers: [
    ProductMongoRepository,
    ProductRepository,
    ProductServices,
    ClotheServices,
    ClotheMongoRepository,
    ClotheRepository,
  ],
  exports: [ProductServices, ClotheServices],
})
export class ProductModule {}
