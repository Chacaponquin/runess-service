import mongoose, { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IClientPayment } from "@modules/payment/infrastructure/mongo/schema";
import { DB_MOELS } from "@shared/constants";

export type IOrder = Order & Document;

export interface OrderItem {
  productId: string;
  quantity: number;
}

@Schema({
  timestamps: true,
  autoCreate: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Order {
  @Prop({
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: DB_MOELS.CLIENT_PAYMENT,
  })
  clientPayment: IClientPayment;

  @Prop({ type: mongoose.SchemaTypes.Array, required: true })
  orders: Array<OrderItem>;

  @Prop({ type: mongoose.SchemaTypes.String, default: "", required: false })
  note: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
