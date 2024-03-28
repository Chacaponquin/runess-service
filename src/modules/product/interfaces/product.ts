export interface CreateProductProps {
  name: string;
  provider: string;
  originalPrice: number;
  price: number;
  images: Array<string>;
  category: string;
}

export type UpdateProductProps = CreateProductProps & { id: string };
