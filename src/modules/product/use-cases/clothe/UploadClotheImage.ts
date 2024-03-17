import { ClotheServices } from "@modules/product/services/clothe.services";

export class UploadClotheImage {
  constructor(private readonly clotheServices: ClotheServices) {}

  async execute(images: Array<Express.Multer.File>): Promise<Array<string>> {
    const all = [] as Array<string>;

    for (const image of images) {
      const url = await this.clotheServices.uploadImage(image);
      all.push(url);
    }

    return all;
  }
}
