export interface CreateClotheProps {
  productId: string;
  colors: Array<string>;
  sizes: Array<string>;
}

export type UpdateClotheProps = Omit<CreateClotheProps, "productId"> & {
  id: string;
};
