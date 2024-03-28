import { MediaServices } from "../services/media.service";

export class UploadImages {
  constructor(private readonly mediaServices: MediaServices) {}

  async execute(images: Array<Express.Multer.File>): Promise<Array<string>> {
    const all = [] as Array<string>;

    for (const image of images) {
      const url = await this.mediaServices.uploadImage(image);
      all.push(url);
    }

    return all;
  }
}
