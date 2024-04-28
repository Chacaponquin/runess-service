import mongoose, { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IClientPayment } from "@modules/payment/infrastructure/mongo/schema";
import { DB_MOELS } from "@shared/constants";
import { OrderItemSchema } from "../interfaces";

@Schema({
  timestamps: true,
  autoCreate: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
class Order {
  @Prop({
    type: mongoose.SchemaTypes.ObjectId,
    required: false,
    default: null,
    ref: DB_MOELS.CLIENT_PAYMENT,
  })
  clientPayment: mongoose.Types.ObjectId | null;

  @Prop({ type: mongoose.SchemaTypes.Array, required: true })
  orders: OrderItemSchema[];

  @Prop({ type: mongoose.SchemaTypes.String, default: "", required: false })
  note: string;

  @Prop({ type: mongoose.SchemaTypes.Number, required: true })
  no: number;
}

export type IOrder = Order & Document;
export type IOrderPopulated = Omit<IOrder, "clientPayment"> & {
  clientPayment: IClientPayment | null;
};

export const OrderSchema = SchemaFactory.createForClass(Order);
