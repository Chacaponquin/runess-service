import { Module } from "@nestjs/common";
import { UserModule } from "./modules/user/user.module";
import { EnvModule } from "./modules/app/modules/env/env.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductModule } from "./modules/product/product.module";
import { OrderModule } from "./modules/order/order.module";
import { PaymentModule } from "./modules/payment/payment.module";
import { ClientModule } from "@modules/client/client.module";
import { MediaModule } from "@modules/media/media.module";

@Module({
  imports: [
    EnvModule,
    MongooseModule.forRoot(process.env.MONGO_URI as string, {}),
    UserModule,
    ProductModule,
    OrderModule,
    PaymentModule,
    ClientModule,
    MediaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
