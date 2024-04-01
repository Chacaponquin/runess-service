import { PRODUCT_TYPES } from "../constants";
import { FilterProductDTO } from "../dto/product";

export interface CreateProductProps {
  name: string;
  provider: string;
  originalPrice: number;
  price: number;
  images: Array<string>;
  categories: Array<string>;
  type: PRODUCT_TYPES;
}

export type UpdateProductProps = Omit<CreateProductProps, "type"> & {
  id: string;
};

export interface FilterProductProps extends FilterProductDTO {}
