import { Module } from "@nestjs/common";
import { MailServices } from "./services/mail.services";
import { EnvService } from "@modules/app/modules/env/services/env.service";
import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import * as path from "path";

@Module({
  controllers: [],
  exports: [MailServices],
  providers: [MailServices],
  imports: [
    MailerModule.forRootAsync({
      useFactory: (envServices: EnvService) => ({
        transport: {
          host: envServices.MAIL_HOST,
          secure: false,
          auth: {
            user: envServices.MAIL_USER,
            pass: envServices.MAIL_PASSWORD,
          },
        },
        defaults: {
          from: `"No Reply" <${envServices.MAIL_FROM}>`,
        },
        template: {
          dir: path.join(__dirname, "templates"),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [],
    }),
  ],
})
export class MailModule {}
