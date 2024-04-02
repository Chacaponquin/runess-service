import { Module } from "@nestjs/common";
import { DB_MOELS } from "@shared/constants";
import {
  ClotheSchema,
  MedicineSchema,
  ProductSchema,
} from "./infrastructure/mongo/schema";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductRepository } from "./services/product/product.repository";
import { ProductServices } from "./services/product/product.services";
import { ClotheServices } from "./services/clothe/clothe.services";
import { ClotheRepository } from "./services/clothe/clothe.repository";
import { ClotheController } from "./controller/clothe.controller";
import { ProductController } from "./controller/product.controller";
import { MedicineController } from "./controller/medicine.controller";
import { MedicineRepository } from "./services/medicine/medicine.repository";
import { MediaModule } from "@modules/media/media.module";
import { MedicineServices } from "./services/medicine/medicine.services";
import { UserModule } from "@modules/user/user.module";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: DB_MOELS.PRODUCTS, useFactory: () => ProductSchema },
      { name: DB_MOELS.CLOTHE, useFactory: () => ClotheSchema },
      { name: DB_MOELS.MEDICINES, useFactory: () => MedicineSchema },
    ]),
    MediaModule,
    UserModule,
  ],
  providers: [
    ProductRepository,
    ProductServices,
    ClotheServices,
    ClotheRepository,
    MedicineRepository,
    MedicineServices,
  ],
  exports: [ProductServices, ClotheServices],
  controllers: [ClotheController, ProductController, MedicineController],
})
export class ProductModule {}
