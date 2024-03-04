import { Module } from "@nestjs/common";
import { UserService } from "./services/user.service";
import { AuthController } from "./controller/auth.controller";
import { UserRepository } from "./services/user-repository";
import { MongooseModule } from "@nestjs/mongoose";
import { DB_MOELS } from "src/shared/constants";
import { UserSchema } from "./infrastructure/mongo/schema";
import { CryptServices } from "@shared/services/crypt.service";
import { ProductModule } from "@modules/product/product.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: DB_MOELS.USERS, useFactory: () => UserSchema },
    ]),
    ProductModule,
    JwtModule,
  ],
  controllers: [AuthController],
  providers: [UserService, UserRepository, CryptServices],
})
export class UserModule {}
