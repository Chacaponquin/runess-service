import { Injectable } from "@nestjs/common";
import { PaymentRepository } from "./payment-repository";
import { ClientPayment } from "../domain";
import { CreateCardPaymentDTO } from "../dto/create";

@Injectable()
export class PaymentService {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  createClientCardPayment(dto: CreateCardPaymentDTO): Promise<ClientPayment> {
    return this.paymentRepository.createCardPayment(dto);
  }
}
