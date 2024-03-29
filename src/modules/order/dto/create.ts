import { PAYMENT_TYPE } from "@modules/payment/constants";

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
