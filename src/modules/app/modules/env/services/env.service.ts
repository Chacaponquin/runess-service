import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvService {
  constructor(private readonly configService: ConfigService) {}

  public get SECRET_WORD() {
    return this.configService.get<string>('SECRET_WORD');
  }

  public get TOKEN_EXPIRES_TIME() {
    return this.configService.get<string>('CURRENT_USER_TOKEN_EXPIRES');
  }

  get MAIL_HOST() {
    return this.configService.get<string>('MAIL_HOST');
  }

  get MAIL_USER() {
    return this.configService.get<string>('MAIL_USER');
  }

  get MAIL_PASSWORD() {
    return this.configService.get<string>('MAIL_PASSWORD');
  }

  get MAIL_FROM() {
    return this.configService.get<string>('MAIL_FROM');
  }
}
