import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants";
import { Model } from "mongoose";
import {
  IClientCardPayment,
  IClientPayment,
} from "../infrastructure/mongo/schema";
import { ClientPayment } from "../domain";
import { CreatePaymentProps } from "../interfaces";

@Injectable()
export class PaymentRepository {
  constructor(
    @InjectModel(DB_MOELS.CLIENT_PAYMENT)
    private readonly paymentModel: Model<IClientPayment>,

    @InjectModel(DB_MOELS.CLIENT_CARD_PAYMENT)
    private readonly cardPaymentModel: Model<IClientCardPayment>,
  ) {}

  async deletePayment(id: string): Promise<void> {
    await this.paymentModel.deleteOne({ id: id });
  }

  async createPayment({
    amount,
    clientId,
    paymentType,
  }: CreatePaymentProps): Promise<ClientPayment> {
    const newPayment = new this.paymentModel({
      amount: amount,
      client: clientId,
      paymentType: paymentType,
    });

    await newPayment.save();

    return this.map(newPayment);
  }

  map(p: IClientPayment): ClientPayment {
    return new ClientPayment({
      amount: p.amount,
      completed: p.completed,
      id: p.id,
    });
  }
}
