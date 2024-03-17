import { Module } from "@nestjs/common";
import { DB_MOELS } from "@shared/constants";
import { ClotheSchema, ProductSchema } from "./infrastructure/mongo/schema";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductRepository } from "./services/product-repository";
import { ProductServices } from "./services/product.services";
import { ClotheServices } from "./services/clothe.services";
import { ClotheRepository } from "./services/clothe-repository";
import { MulterModule } from "@nestjs/platform-express";
import { ClotheController } from "./controller/clothe.controller";
import { ProductController } from "./controller/product.controller";

@Module({
  imports: [
    MulterModule.register({
      dest: "./temp",
    }),

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
  controllers: [ClotheController, ProductController],
})
export class ProductModule {}
