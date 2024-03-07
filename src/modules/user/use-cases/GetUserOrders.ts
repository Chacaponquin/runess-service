import { SendUserOrderDTO } from "../dto/send";

export class GetUserOrders {
  async execute(): Promise<Array<SendUserOrderDTO>> {
    return [];
  }
}
