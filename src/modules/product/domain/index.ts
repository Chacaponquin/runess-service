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
  images: ProductImage[];
  categories: string[];
  description: string;
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
  readonly images: ProductImage[];
  readonly categories: string[];
  readonly type: PRODUCT_TYPES;
  readonly description: string;

  constructor({
    id,
    name,
    price,
    provider,
    images,
    categories,
    type,
    description,
  }: ProductProps) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.provider = provider;
    this.images = images;
    this.categories = categories;
    this.type = type;
    this.description = description;
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
      description: this.description,
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
}

export class Clothe extends Product {
  readonly colors: string[];
  readonly sizes: string[];

  constructor({ colors, sizes, ...rest }: ClotheProps) {
    super(rest);
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
  constructor(props: ProductProps) {
    super(props);
  }

  send(): RespMedicineDTO {
    return { ...this.response() };
  }
}
