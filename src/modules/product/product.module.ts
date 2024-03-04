import { Module } from "@nestjs/common";
import { DB_MOELS } from "@shared/constants";
import { ClotheSchema, ProductSchema } from "./infrastructure/mongo/schema";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductRepository } from "./services/product-repository";
import { ProductServices } from "./services/product.services";
import { ClotheServices } from "./services/clothe.services";
import { ClotheRepository } from "./services/clothe-repository";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: DB_MOELS.PRODUCTS, useFactory: () => ProductSchema },
      { name: DB_MOELS.CLOTHE, useFactory: () => ClotheSchema },
    ]),
  ],
  providers: [
    ProductRepository,
    ProductServices,
    ClotheServices,
    ClotheRepository,
  ],
  exports: [ProductServices, ClotheServices],
})
export class ProductModule {}
