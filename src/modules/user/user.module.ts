import { Module } from "@nestjs/common";
import { UserService } from "./services/user.service";
import { AuthController } from "./controller/auth.controller";
import { UserRepository } from "./services/user.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { DB_MOELS } from "src/shared/constants";
import {
  AdminUserSchema,
  UserMessageSchema,
  UserSchema,
} from "./infrastructure/mongo/schema";
import { CryptServices } from "@shared/services/crypt.service";
import { JwtModule } from "@nestjs/jwt";
import { AdminController } from "./controller/admin.controller";
import { AdminUserRepository } from "./services/admin.repository";
import { AdminUserServices } from "./services/admin.service";
import { UserMessageRepository } from "./services/message.repository";
import { UserController } from "./controller/user.controller";
import { EnvModule } from "@modules/app/modules/env/env.module";
import { EnvService } from "@modules/app/modules/env/services/env.service";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: DB_MOELS.USERS, useFactory: () => UserSchema },
      { name: DB_MOELS.ADMIN_USERS, useFactory: () => AdminUserSchema },
      { name: DB_MOELS.USER_MESSAGES, useFactory: () => UserMessageSchema },
    ]),
    JwtModule.registerAsync({
      imports: [EnvModule],
      useFactory(envServices: EnvService) {
        return {
          global: true,
          secret: envServices.SECRET_WORD,
          signOptions: { expiresIn: envServices.TOKEN_EXPIRES_TIME },
        };
      },
    }),
    ,
  ],
  controllers: [AuthController, AdminController, UserController],
  providers: [
    UserService,
    UserRepository,
    CryptServices,
    AdminUserRepository,
    AdminUserServices,
    UserMessageRepository,
  ],
  exports: [UserService],
})
export class UserModule {}
