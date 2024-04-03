import { Module } from "@nestjs/common";
import { UserModule } from "./modules/user/user.module";
import { EnvModule } from "./modules/app/modules/env/env.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductModule } from "./modules/product/product.module";
import { OrderModule } from "./modules/order/order.module";
import { PaymentModule } from "./modules/payment/payment.module";
import { ClientModule } from "@modules/client/client.module";
import { MediaModule } from "@modules/media/media.module";
import { EnvService } from "@modules/app/modules/env/services/env.service";

@Module({
  imports: [
    EnvModule,
    MongooseModule.forRootAsync({
      imports: [EnvModule],
      useFactory(envService: EnvService) {
        return { uri: envService.MONGO_URI };
      },
      inject: [EnvService],
    }),
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
