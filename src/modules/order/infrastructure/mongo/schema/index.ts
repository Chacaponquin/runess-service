import mongoose, { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IUserPayment } from "@modules/payment/infrastructure/mongo/schema";

export type IOrder = Order & Document;

export interface OrderItem {
  product_id: string;
  quantity: number;
}

@Schema({
  timestamps: true,
  autoCreate: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Order {
  @Prop({ type: mongoose.SchemaTypes.String, required: true })
  user_payment: IUserPayment;

  @Prop({ type: mongoose.SchemaTypes.Array, required: true })
  orders: Array<OrderItem>;
}

const OrderSchema = SchemaFactory.createForClass(Order);

export { OrderSchema };
