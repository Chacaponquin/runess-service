import { PRODUCT_TYPES } from "../constants";
import { Product } from "../domain";
import { FilterProductDTO } from "../dto/product";

export interface CreateProductProps {
  name: string;
  provider: string;
  originalPrice: number;
  price: number;
  images: Array<string>;
  categories: Array<string>;
  type: PRODUCT_TYPES;
  description: string;
}

export type UpdateProductProps = Omit<CreateProductProps, "type"> & {
  id: string;
};

export interface FilterProductProps extends FilterProductDTO {}

export interface GetSpecificProductsProps {
  type: PRODUCT_TYPES;
  page: number;
}

export interface GetProps {
  page: number;
}

export interface SearchResult {
  result: Product[];
  totalPages: number;
}
