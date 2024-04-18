import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class EnvService {
  constructor(private readonly configService: ConfigService) {}

  get ACCESS_SECRET_WORD() {
    return this.configService.get<string>("ACCESS_SECRET_WORD");
  }

  get REFRESH_SECRET_WORD() {
    return this.configService.get<string>("REFRESH_SECRET_WORD");
  }

  get MONGO_URI() {
    return this.configService.get<string>("MONGO_URI");
  }

  get ACCESS_TOKEN_EXPIRES_TIME() {
    return this.configService.get<string>("ACCESS_TOKEN_EXPIRES");
  }

  get REFRESH_TOKEN_EXPIRES_TIME() {
    return this.configService.get<string>("REFRESH_TOKEN_EXPIRES");
  }

  get MAIL_HOST() {
    return this.configService.get<string>("MAIL_HOST");
  }

  get MAIL_USER() {
    return this.configService.get<string>("MAIL_USER");
  }

  get MAIL_PASSWORD() {
    return this.configService.get<string>("MAIL_PASSWORD");
  }

  get MAIL_FROM() {
    return this.configService.get<string>("MAIL_FROM");
  }

  get AWS_S3_ACCESS_KEY_ID() {
    return this.configService.get<string>("AWS_ACCESS_KEY_ID") as string;
  }

  get AWS_S3_SECRET_ACCESS_KEY() {
    return this.configService.get<string>("AWS_SECRET_ACCESS_KEY") as string;
  }

  get AWS_S3_REGION() {
    return this.configService.get<string>("S3_REGION") as string;
  }

  get AWS_S3_BUCKET() {
    return this.configService.get<string>("S3_BUCKET") as string;
  }

  get STRIPE_API_SECRET_KEY() {
    return this.configService.get<string>("STRIPE_API_SECRET_KEY");
  }
}
