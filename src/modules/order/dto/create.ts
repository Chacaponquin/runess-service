export interface CreateOrderDTO {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;
  note: string;
  orders: Array<OrderItemDTO>;
  userId: string | null;
}

export interface OrderItemDTO {
  productId: string;
  quantity: number;
}

export interface SaveOrderProps {
  userPaymentId: string;
  orders: Array<{ productId: string; quantity: number }>;
}
