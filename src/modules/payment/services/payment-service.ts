import { Injectable } from "@nestjs/common";
import Stripe from "stripe";
import { EnvService } from "@modules/app/modules/env/services/env.service";
import { PaymentRepository } from "./payment-repository";
import { ClientPayment } from "../domain";
import { CreatePaymentProps } from "../interfaces";

interface CreatePaymentSessionProps {
  amount: number;
}

@Injectable()
export class PaymentService {
  private readonly stripe = new Stripe(this.envServices.STRIPE_API_SECRET_KEY, {
    apiVersion: "2024-04-10",
  });

  constructor(
    private readonly envServices: EnvService,
    private readonly repository: PaymentRepository,
  ) {}

  async createPaymentSession({
    amount,
  }: CreatePaymentSessionProps): Promise<string> {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return paymentIntent.client_secret;
  }

  createPayment(props: CreatePaymentProps): Promise<ClientPayment> {
    return this.repository.createPayment(props);
  }
}
