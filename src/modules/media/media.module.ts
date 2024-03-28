import { Module } from "@nestjs/common";
import { MediaServices } from "./services/media.service";
import { MediaController } from "./controller/media.controller";
import { MediaRepository } from "./controller/media.repository";

@Module({
  controllers: [MediaController],
  exports: [MediaServices, MediaRepository],
  imports: [],
  providers: [MediaServices, MediaRepository],
})
export class MediaModule {}
