import { Injectable } from "@nestjs/common";
import { OrderRepository } from "./order-repository";
import { Order } from "../domain";

@Injectable()
export class OrderService {
  constructor(private readonly repository: OrderRepository) {}

 

  ordersByUser(userId: string): Promise<Array<Order>> {
    return this.repository.ordersByUser(userId);
  }

  get(page: number): Promise<Order[]> {
    return this.repository.get(page);
  }
}
