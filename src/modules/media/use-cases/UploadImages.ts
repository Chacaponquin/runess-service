import { MediaServices } from "../services/media.service";

export class UploadImages {
  constructor(private readonly mediaServices: MediaServices) {}

  async execute(images: Array<Express.Multer.File>): Promise<Array<string>> {
    const all = [] as Array<string>;

    for (const image of images) {
      const key = await this.mediaServices.uploadImage(image);
      const newImage = await this.mediaServices.createImage({
        key: key,
        name: image.filename,
        size: image.size,
      });

      all.push(newImage.id);
    }

    return all;
  }
}
