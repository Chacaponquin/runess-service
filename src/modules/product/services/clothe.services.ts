import { Injectable } from "@nestjs/common";
import { ClotheRepository } from "./clothe-repository";
import { CreateClotheDTO } from "../dto/clothe";

@Injectable()
export class ClotheServices {
  constructor(private readonly clotheRepository: ClotheRepository) {}

  createClothe(dto: CreateClotheDTO) {
    console.log(dto);
  }

  uploadImage(image: Express.Multer.File) {
    return this.clotheRepository.uploadImage(image);
  }
}
