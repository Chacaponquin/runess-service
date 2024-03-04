interface Props {
  id: string;
  name: string;
  price: number;
}

export class Product {
  id: string;
  name: string;
  price: number;

  constructor({ id, name, price }: Props) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

export class Clothe extends Product {}
