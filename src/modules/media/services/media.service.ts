import { Injectable } from "@nestjs/common";
import { MediaRepository } from "./media.repository";
import { CreateImageProps } from "../interfaces/image";

@Injectable()
export class MediaServices {
  constructor(private readonly mediaRepository: MediaRepository) {}

  uploadImage(image: Express.Multer.File) {
    return this.mediaRepository.uploadImage(image);
  }

  createImage(props: CreateImageProps) {
    return this.mediaRepository.createImage(props);
  }

  getImageUrl(key: string): string {
    return this.mediaRepository.getImageUrl(key);
  }
}
