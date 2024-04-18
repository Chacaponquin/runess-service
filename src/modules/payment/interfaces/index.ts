import { PAYMENT_TYPE } from "../constants";

export interface CreatePaymentProps {
  amount: number;
  clientId: string;
  paymentType: PAYMENT_TYPE;
}
