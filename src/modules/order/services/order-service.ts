import { Injectable } from "@nestjs/common";
import { OrderRepository } from "./order-repository";
import { Order } from "../domain";
import { SaveOrderProps } from "../dto/order";

@Injectable()
export class OrderService {
  constructor(private readonly repository: OrderRepository) {}

  createOrder(dto: SaveOrderProps): Promise<Order> {
    return this.repository.create(dto);
  }

  ordersByUser(userId: string): Promise<Array<Order>> {
    return this.repository.ordersByUser(userId);
  }

  get(page: number): Promise<Order[]> {
    return this.repository.get(page);
  }
}
