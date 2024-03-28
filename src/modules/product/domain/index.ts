interface ProductProps {
  id: string;
  name: string;
  price: number;
  provider: string;
  images: Array<ProductImage>;
}

export interface ProductImage {
  size: number;
  name: string;
  source: string;
  id: string;
}

export class Product {
  readonly id: string;
  readonly name: string;
  readonly price: number;
  readonly provider: string;
  readonly images: Array<ProductImage>;

  constructor({ id, name, price, provider, images }: ProductProps) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.provider = provider;
    this.images = images;
  }
}

export class Clothe extends Product {
  readonly productId: string;

  constructor(props: ProductProps & { productId: string }) {
    super(props);
    this.productId = props.id;
  }
}

export class Medicine extends Product {
  readonly productId: string;

  constructor(props: ProductProps & { productId: string }) {
    super(props);
    this.productId = props.id;
  }
}
