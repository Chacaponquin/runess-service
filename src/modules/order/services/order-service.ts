import { Injectable } from "@nestjs/common";
import { OrderRepository } from "./order-repository";
import { Order } from "../domain";
import { SaveOrderProps } from "../dto/create";

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  createOrder(dto: SaveOrderProps): Promise<Order> {
    return this.orderRepository.create(dto);
  }
}
