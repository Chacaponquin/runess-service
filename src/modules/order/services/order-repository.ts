import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants";
import { Model } from "mongoose";
import { IOrder } from "../infrastructure/mongo/schema";
import { SaveOrderProps } from "../dto/create";
import { Order } from "../domain";

@Injectable()
export class OrderRepository {
  constructor(
    @InjectModel(DB_MOELS.ORDER)
    private readonly model: Model<IOrder>,
  ) {}

  async create(props: SaveOrderProps): Promise<Order> {
    const order = new this.model({
      userPayment: props.userPaymentId,
      orders: props.orders,
    });

    await order.save();

    return this.map(order);
  }

  private map(order: IOrder): Order {
    return new Order({ id: order.id, note: order.note, orders: order.orders });
  }
}
