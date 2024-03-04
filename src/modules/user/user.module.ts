import { Module } from "@nestjs/common";
import { UserService } from "./services/user.service";
import { AuthController } from "./controller/auth.controller";
import { UserMongoRepository } from "./infrastructure/mongo";
import { UserRepository } from "./services/user-repository";
import { MongooseModule } from "@nestjs/mongoose";
import { DB_MOELS } from "src/shared/constants";
import { UserSchema } from "./infrastructure/mongo/schema";
import { CryptServices } from "@shared/services/crypt.service";
import { MailModule } from "@modules/mail/mail.module";
import { ProductModule } from "@modules/product/product.module";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: DB_MOELS.USERS, useFactory: () => UserSchema },
    ]),
    MailModule,
    ProductModule,
  ],
  controllers: [AuthController],
  providers: [UserService, UserMongoRepository, UserRepository, CryptServices],
})
export class UserModule {}
