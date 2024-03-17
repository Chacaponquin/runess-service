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

@Controller(ROUTES.CLOTHE.ROOT)
export class ClotheController {
  constructor(private readonly clotheServices: ClotheServices) {}

  @Post(ROUTES.CLOTHE.UPLOAD_IMAGES)
  @UseInterceptors(FilesInterceptor("image"))
  upload(@UploadedFiles() images: Array<Express.Multer.File>) {
    console.log(images);
  }

  @Post(ROUTES.CLOTHE.CREATE)
  create(@Body() dto: CreateClotheDTO) {
    console.log(dto);
  }
}
