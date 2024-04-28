import { IClient } from "@modules/client/infrastructure/mongo/schema";
import { PAYMENT_TYPE } from "@modules/payment/constants";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants";
import mongoose, { Document } from "mongoose";

@Schema({
  timestamps: true,
  autoCreate: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
class ClientPayment {
  @Prop({ ref: DB_MOELS.CLIENT, type: mongoose.Types.ObjectId, required: true })
  client: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.SchemaTypes.Number, required: true, min: 0 })
  amount: number;

  @Prop({ type: mongoose.SchemaTypes.Number, required: true, min: 0 })
  shipping: number;

  @Prop({ type: mongoose.SchemaTypes.Number, required: true, min: 0 })
  discount: number;

  @Prop({ default: false, type: mongoose.SchemaTypes.Boolean, required: false })
  completed: boolean;

  @Prop({
    enum: [PAYMENT_TYPE.CARD, PAYMENT_TYPE.CASH],
    type: mongoose.SchemaTypes.String,
    required: true,
  })
  paymentType: PAYMENT_TYPE;
}

@Schema({
  timestamps: true,
  autoCreate: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
class CardPayment {
  @Prop({
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: DB_MOELS.CLIENT_PAYMENT,
  })
  clientPayment: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.SchemaTypes.String, required: true })
  accountNo: string;

  @Prop({ type: mongoose.SchemaTypes.String, required: true })
  provider: string;

  @Prop({ type: mongoose.SchemaTypes.String, required: true })
  cvc: string;

  @Prop({ type: mongoose.SchemaTypes.Date, required: true })
  expiration_date: Date;

  @Prop({ type: mongoose.SchemaTypes.String, required: true })
  zip: string;

  @Prop({ type: mongoose.SchemaTypes.String, required: true })
  country: string;
}

export type IClientPayment = ClientPayment & Document;
export type IClientPaymentPopulated = Omit<IClientPayment, "client"> & {
  client: IClient;
};

export type IClientCardPayment = CardPayment & Document;
export type IClientCardPaymentPopulated = Omit<
  IClientCardPayment,
  "clientPayment"
> & { clientPayment: IClientPayment };

export const ClientPaymentSchema = SchemaFactory.createForClass(ClientPayment);
export const ClientCardPaymentSchema =
  SchemaFactory.createForClass(CardPayment);
