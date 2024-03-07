interface Props {
  id: string;
  name: string;
  price: number;
  provider: string;
  images: Array<string>;
}

export class Product {
  id: string;
  name: string;
  price: number;
  provider: string;
  images: Array<string>;

  constructor({ id, name, price, provider, images }: Props) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.provider = provider;
    this.images = images;
  }
}

export class Clothe extends Product {}
