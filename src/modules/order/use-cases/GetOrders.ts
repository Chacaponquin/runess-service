import { GetDTO, RespOrderDTO } from "../dto/order";
import { OrderService } from "../services/order-service";

export class GetOrders {
  constructor(private readonly services: OrderService) {}

  async execute(dto: GetDTO): Promise<RespOrderDTO[]> {
    const all = await this.services.get(dto.page);

    return all.map((a) => a.send());
  }
}
