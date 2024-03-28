import { ProductImage } from "../domain";

export interface SendProductDTO {
  id: string;
  name: string;
  price: number;
  images: Array<ProductImage>;
  provider: string;
}

export interface SendClotheDTO extends SendProductDTO {
  sizes: Array<string>;
  colors: Array<string>;
}
