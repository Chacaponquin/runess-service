interface Props {
  id: string;
  orders: Array<OrderItem>;
  note: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
}

export class Order {
  id: string;
  orders: Array<OrderItem>;
  note: string;

  constructor({ id, note, orders }: Props) {
    this.orders = orders;
    this.id = id;
    this.note = note;
  }
}
