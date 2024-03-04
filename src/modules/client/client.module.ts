import { Module } from "@nestjs/common";
import { ClientServices } from "./services/client.service";
import { ClientRepository } from "./services/client-repository";
import { MongooseModule } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants";
import { ClientSchema } from "./infrastructure/mongo/schema";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: DB_MOELS.CLIENT, useFactory: () => ClientSchema },
    ]),
  ],
  controllers: [],
  providers: [ClientServices, ClientRepository],
  exports: [ClientServices],
})
export class ClientModule {}
