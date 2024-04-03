import { chaca, schemas } from "chaca";
import { PRODUCT_TYPES } from "../constants";
import { RespClotheDTO } from "../dto/clothe";
import { RespMedicineDTO } from "../dto/medicine";
import { RespProductDTO } from "../dto/product";

interface ProductProps {
  id: string;
  name: string;
  price: number;
  provider: string;
  images: Array<ProductImage>;
  categories: Array<string>;
  type: PRODUCT_TYPES;
}

export interface ProductImage {
  size: number;
  name: string;
  source: string;
  id: string;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export class Product {
  readonly id: string;
  readonly name: string;
  readonly price: number;
  readonly provider: string;
  readonly images: Array<ProductImage>;
  readonly categories: Array<string>;
  readonly type: PRODUCT_TYPES;

  constructor({
    id,
    name,
    price,
    provider,
    images,
    categories,
    type,
  }: ProductProps) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.provider = provider;
    this.images = images;
    this.categories = categories;
    this.type = type;
  }

  response(): RespProductDTO {
    const schema = chaca.schema<ProductImage>({
      id: schemas.id.uuid(),
      name: schemas.lorem.words(),
      source: schemas.image.food(),
      size: schemas.dataType.int({ min: 1000, max: 50000 }),
    });

    return {
      id: this.id,
      images: schema.generate(
        schemas.dataType.int().getValue({ min: 1, max: 10 }),
      ),
      name: this.name,
      price: this.price,
      provider: this.provider,
      categories: this.categories,
      type: this.type,
    };
  }
}

interface ClotheProps extends ProductProps {
  colors: string[];
  sizes: string[];
  productId: string;
}

export class Clothe extends Product {
  readonly productId: string;
  readonly colors: string[];
  readonly sizes: string[];

  constructor({ productId, colors, sizes, ...rest }: ClotheProps) {
    super(rest);
    this.productId = productId;
    this.colors = colors;
    this.sizes = sizes;
  }

  send(): RespClotheDTO {
    return {
      ...this.response(),
      colors: this.colors,
      sizes: this.sizes,
    };
  }
}

export class Medicine extends Product {
  readonly productId: string;

  constructor(props: ProductProps & { productId: string }) {
    super(props);
    this.productId = props.id;
  }

  send(): RespMedicineDTO {
    return { ...this.response() };
  }
}
