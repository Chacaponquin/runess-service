import { Injectable } from "@nestjs/common";
import { IClothe } from "../infrastructure/mongo/schema";
import { Model } from "mongoose";
import { DB_MOELS } from "@shared/constants";
import { InjectModel } from "@nestjs/mongoose";
import { EnvService } from "@modules/app/modules/env/services/env.service";
import * as AWS from "aws-sdk";
import * as fs from "fs";
import { schemas } from "chaca";
import { UploadProductImageException } from "../exceptions";
import { Clothe } from "../domain";
import { CreateClotheProps } from "../interfaces/clothe";

@Injectable()
export class ClotheRepository {
  private readonly client = new AWS.S3({
    credentials: {
      accessKeyId: this.envServices.AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: this.envServices.AWS_S3_SECRET_ACCESS_KEY,
    },
    region: this.envServices.AWS_S3_REGION,
  });

  constructor(
    private readonly envServices: EnvService,
    @InjectModel(DB_MOELS.CLOTHE)
    private readonly model: Model<IClothe>,
  ) {}

  async uploadImage(image: Express.Multer.File): Promise<string> {
    const key = schemas.id.uuid().getValue();

    const file = fs.readFileSync(image.path);

    try {
      const params: AWS.S3.PutObjectRequest = {
        Bucket: this.envServices.AWS_S3_BUCKET,
        Key: key,
        Body: file,
        ContentType: image.mimetype,
      };

      await this.client.upload(params).promise();

      fs.unlinkSync(image.path);

      const url = this.client.getSignedUrl("getObject", {
        Key: key,
        Bucket: this.envServices.AWS_S3_BUCKET,
      });

      return url;
    } catch (error) {
      console.log(error);
      throw new UploadProductImageException();
    }
  }

  async create(dto: CreateClotheProps): Promise<Clothe> {
    const newClothe = new this.model({
      product: dto.productId,
      sizes: dto.sizes,
      colors: dto.colors,
    });

    await newClothe.save();

    return this.map(newClothe);
  }

  private map(clothe: IClothe): Clothe {
    return new Clothe({
      id: clothe.id,
      images: clothe.product.images,
      name: clothe.product.name,
      price: clothe.product.price,
      provider: clothe.product.provider,
    });
  }
}
