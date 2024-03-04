import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants";
import { Model } from "mongoose";
import {
  IClientCardPayment,
  IClientPayment,
} from "../infrastructure/mongo/schema";
import { ClientCardPayment } from "../domain";
import { CreateCardPaymentDTO } from "../dto/create";
import { PAYMENT_TYPE } from "../constants";

@Injectable()
export class PaymentRepository {
  constructor(
    @InjectModel(DB_MOELS.CLIENT_PAYMENT)
    private readonly paymentModel: Model<IClientPayment>,
    @InjectModel(DB_MOELS.CLIENT_PAYMENT)
    private readonly cardPaymentModel: Model<IClientCardPayment>,
  ) {}

  async deletePayment(id: string): Promise<void> {
    await this.paymentModel.deleteOne({ id: id });
  }

  async createCardPayment(
    dto: CreateCardPaymentDTO,
  ): Promise<ClientCardPayment> {
    const payment = new this.paymentModel({
      amount: dto.amount,
      client: dto.clientId,
      expiration_date: new Date(),
      paymentType: PAYMENT_TYPE.CARD,
    });

    await payment.save();

    try {
      const cardPayment = new this.cardPaymentModel({
        clientPayment: payment.id,
      });

      await cardPayment.save();

      return this._mapCard(cardPayment);
    } catch (error) {
      await this.deletePayment(payment.id);
    }
  }

  private _mapCard(card: IClientCardPayment): ClientCardPayment {
    return new ClientCardPayment({
      accountNo: card.accountNo,
      id: card.id,
      amount: card.clientPayment.amount,
      completed: card.clientPayment.completed,
      provider: card.provider,
    });
  }
}
