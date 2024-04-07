import { PAYMENT_TYPE } from "@modules/payment/constants";
import { IsNotEmpty, IsNumber, Min } from "class-validator";

export interface CreateOrderDTO {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;
  note: string;
  orders: Array<OrderItemDTO>;
  userId: string | null;
  type: PAYMENT_TYPE;
}

export interface OrderItemDTO {
  productId: string;
  quantity: number;
}

export interface SaveOrderProps {
  clientPaymentId: string;
  orders: Array<{ productId: string; quantity: number }>;
}

export class GetDTO {
  @IsNotEmpty()
  @Min(1)
  @IsNumber()
  page: number;
}

export interface RespOrderDTO {
  amount: number;
  id: string;
}
