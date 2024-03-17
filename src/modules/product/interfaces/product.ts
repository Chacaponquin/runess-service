export interface CreateProductProps {
  name: string;
  provider: string;
  originalPrice: number;
  price: number;
  images: Array<string>;
}
