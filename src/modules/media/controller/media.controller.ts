import { ROUTES } from "@modules/app/constants";
import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { UploadImages } from "../use-cases";
import { MediaServices } from "../services/media.service";

@Controller(ROUTES.MEDIA.ROOT)
export class MediaController {
  constructor(private readonly mediaServices: MediaServices) {}

  @Post(ROUTES.MEDIA.UPLOAD_IMAGES)
  @UseInterceptors(FilesInterceptor("images"))
  async uploadImages(@UploadedFiles() images: Array<Express.Multer.File>) {
    const useCase = new UploadImages(this.mediaServices);
    return await useCase.execute(images);
  }
}
