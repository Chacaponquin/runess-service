import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants";
import { Model } from "mongoose";
import { IOrder } from "../infrastructure/mongo/schema";
import { SaveOrderProps } from "../dto/create";
import { Order } from "../domain";

@Injectable({})
export class OrderRepository {
  constructor(
    @InjectModel(DB_MOELS.ORDER)
    private readonly model: Model<IOrder>,
  ) {}

  async create(props: SaveOrderProps): Promise<Order> {
    const order = new this.model({
      clientPayment: props.clientPaymentId,
      orders: props.orders,
    });

    await order.save();

    return this.map(order);
  }

  async ordersByUser(userId: string): Promise<Array<Order>> {
    const result = await this.model.find().populate("clientPayment");
    return result.map((r) => this.map(r));
  }

  private map(order: IOrder): Order {
    return new Order({ id: order.id, note: order.note, orders: order.orders });
  }
}
