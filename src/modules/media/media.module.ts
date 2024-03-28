import { Module } from "@nestjs/common";
import { MediaServices } from "./services/media.service";
import { MediaController } from "./controller/media.controller";
import { MediaRepository } from "./services/media.repository";
import { MulterModule } from "@nestjs/platform-express";
import { MongooseModule } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants";
import { ImageSchema } from "./infrastructure/mongo/schemas";

@Module({
  controllers: [MediaController],
  exports: [MediaServices],
  imports: [
    MulterModule.register({
      dest: "./temp",
    }),

    MongooseModule.forFeatureAsync([
      { name: DB_MOELS.IMAGES, useFactory: () => ImageSchema },
    ]),
  ],
  providers: [MediaServices, MediaRepository],
})
export class MediaModule {}
