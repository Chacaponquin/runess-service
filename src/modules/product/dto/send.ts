export interface SendProductDTO {
  id: string;
  name: string;
  price: number;
  images: Array<string>;
  provider: string;
}

export interface SendClotheDTO extends SendProductDTO {
  sizes: Array<string>;
  colors: Array<string>;
}
