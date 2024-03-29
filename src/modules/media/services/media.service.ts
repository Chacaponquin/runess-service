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

  async deleteImage(id: string): Promise<void> {
    await this.mediaRepository.delete(id);
  }

  getImageUrl(key: string): string {
    return this.mediaRepository.getImageUrl(key);
  }
}
