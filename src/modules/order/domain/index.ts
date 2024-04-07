import { RespOrderDTO } from "../dto/order";

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
  readonly id: string;
  readonly orders: Array<OrderItem>;
  readonly note: string;

  constructor({ id, note, orders }: Props) {
    this.orders = orders;
    this.id = id;
    this.note = note;
  }

  send(): RespOrderDTO {
    return { amount: 10, id: this.id };
  }
}
