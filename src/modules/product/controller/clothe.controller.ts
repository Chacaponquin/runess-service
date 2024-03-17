import { ROUTES } from "@modules/app/constants";
import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { ClotheServices } from "../services/clothe.services";
import { CreateClotheDTO } from "../dto/clothe";
import { CreateClothe, UploadClotheImage } from "../use-cases";

@Controller(ROUTES.CLOTHE.ROOT)
export class ClotheController {
  constructor(private readonly clotheServices: ClotheServices) {}

  @Post(ROUTES.CLOTHE.UPLOAD_IMAGES)
  @UseInterceptors(FilesInterceptor("image"))
  async upload(
    @UploadedFiles() images: Array<Express.Multer.File>,
  ): Promise<Array<string>> {
    const useCase = new UploadClotheImage(this.clotheServices);
    const allUrls = await useCase.execute(images);
    return allUrls;
  }

  @Post(ROUTES.CLOTHE.CREATE)
  create(@Body() dto: CreateClotheDTO) {
    const useCase = new CreateClothe(this.clotheServices);
    useCase.execute(dto);
  }
}
