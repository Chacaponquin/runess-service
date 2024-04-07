import { IClient } from "@modules/client/infrastructure/mongo/schema";
import { PAYMENT_TYPE } from "@modules/payment/constants";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants";
import mongoose, { Document } from "mongoose";

export type IClientPayment = ClientPayment & Document;
export type IClientCardPayment = CardPayment & Document;

@Schema({
  timestamps: true,
  autoCreate: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
class ClientPayment {
  @Prop({ ref: DB_MOELS.CLIENT, type: mongoose.Types.ObjectId, required: true })
  client: IClient;

  @Prop({ type: mongoose.SchemaTypes.Number, required: true })
  amount: number;

  @Prop({ type: mongoose.SchemaTypes.Date, required: true })
  expiration_date: Date;

  @Prop({ default: false, type: mongoose.SchemaTypes.Boolean })
  completed: boolean;

  @Prop({
    enum: [PAYMENT_TYPE.CARD, PAYMENT_TYPE.CASH],
    type: mongoose.SchemaTypes.String,
    required: true,
  })
  paymentType: PAYMENT_TYPE;
}

class CardPayment {
  @Prop({
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: DB_MOELS.CLIENT_PAYMENT,
  })
  clientPayment: IClientPayment;

  @Prop({ type: mongoose.SchemaTypes.String, required: false, default: null })
  accountNo: string | null;

  @Prop({ type: mongoose.SchemaTypes.String, required: false, default: null })
  provider: string | null;
}

export const ClientPaymentSchema = SchemaFactory.createForClass(ClientPayment);
export const ClientCardPaymentSchema =
  SchemaFactory.createForClass(CardPayment);
