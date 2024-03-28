import { EnvService } from "@modules/app/modules/env/services/env.service";
import { Injectable } from "@nestjs/common";
import * as AWS from "aws-sdk";
import { schemas } from "chaca";
import * as fs from "fs";
import { UploadImageException } from "../exceptions";
import { CreateImageProps } from "../interfaces/image";
import { Image } from "../domain";
import { InjectModel } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants";
import { Model } from "mongoose";
import { IImage } from "../infrastructure/mongo/schemas";

@Injectable()
export class MediaRepository {
  private readonly client = new AWS.S3({
    credentials: {
      accessKeyId: this.envServices.AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: this.envServices.AWS_S3_SECRET_ACCESS_KEY,
    },
    region: this.envServices.AWS_S3_REGION,
  });

  constructor(
    private readonly envServices: EnvService,
    @InjectModel(DB_MOELS.IMAGES)
    private readonly imageModel: Model<IImage>,
  ) {}

  map(image: IImage): Image {
    return new Image({
      id: image.id,
      key: image.aws_key,
      name: image.name,
      size: image.size,
    });
  }

  async createImage(props: CreateImageProps): Promise<Image> {
    const newImage = new this.imageModel({
      name: props.name,
      size: props.size,
      aws_key: props.key,
    });

    await newImage.save();

    return this.map(newImage);
  }

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

      return key;
    } catch (error) {
      throw new UploadImageException();
    }
  }

  getImageUrl(key: string): string {
    const url = this.client.getSignedUrl("getObject", {
      Key: key,
      Bucket: this.envServices.AWS_S3_BUCKET,
    });

    return url;
  }
}
