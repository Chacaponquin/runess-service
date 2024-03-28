import { Injectable } from "@nestjs/common";
import { MediaRepository } from "../controller/media.repository";

@Injectable()
export class MediaServices {
  constructor(private readonly mediaRepository: MediaRepository) {}

  uploadImage(image: Express.Multer.File) {
    return this.mediaRepository.uploadImage(image);
  }
}
