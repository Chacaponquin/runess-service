import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { UserConfirmationDTO } from "../dto";

@Injectable()
export class MailServices {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserConfirmation(dto: UserConfirmationDTO) {
    await this.mailerService.sendMail({
      to: dto.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: "Welcome to Nice App! Confirm your Email",
      template: "./confirmation",
      context: {
        name: dto.name,
      },
    });
  }
}
