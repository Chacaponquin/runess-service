import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class EnvService {
  constructor(private readonly configService: ConfigService) {}

  public get SECRET_WORD() {
    return this.configService.get<string>("SECRET_WORD");
  }

  public get TOKEN_EXPIRES_TIME() {
    return this.configService.get<string>("CURRENT_USER_TOKEN_EXPIRES");
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

  public get AWS_S3_ACCESS_KEY_ID() {
    return this.configService.get<string>("AWS_ACCESS_KEY_ID") as string;
  }

  public get AWS_S3_SECRET_ACCESS_KEY() {
    return this.configService.get<string>("AWS_SECRET_ACCESS_KEY") as string;
  }

  public get AWS_S3_REGION() {
    return this.configService.get<string>("S3_REGION") as string;
  }

  public get AWS_S3_BUCKET() {
    return this.configService.get<string>("S3_BUCKET") as string;
  }
}
