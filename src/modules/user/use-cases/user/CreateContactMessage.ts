import { CreateContactMessageDTO } from "@modules/user/dto/message";
import { UserService } from "@modules/user/services/user.service";

export class CreateContactMessage {
  constructor(private readonly userServices: UserService) {}

  async execute(dto: CreateContactMessageDTO): Promise<void> {
    await this.userServices.createMessage(dto);
  }
}
