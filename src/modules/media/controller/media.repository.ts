import { EnvService } from "@modules/app/modules/env/services/env.service";
import { Injectable } from "@nestjs/common";
import * as AWS from "aws-sdk";
import { schemas } from "chaca";
import * as fs from "fs";
import { UploadImageException } from "../exceptions";

@Injectable()
export class MediaRepository {
  private readonly client = new AWS.S3({
    credentials: {
      accessKeyId: this.envServices.AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: this.envServices.AWS_S3_SECRET_ACCESS_KEY,
    },
    region: this.envServices.AWS_S3_REGION,
  });

  constructor(private readonly envServices: EnvService) {}

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
      throw new UploadImageException();
    }
  }
}
