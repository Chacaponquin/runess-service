import { PRODUCT_TYPES } from "@modules/product/constants";

export type OrderItemSchema = ClotheItemSchema | MedicineItemSchema;

type ClotheItemSchema = {
  productId: string;
  quantity: number;
  type: PRODUCT_TYPES.CLOTHE;
  size: string;
  color: string;
};

type MedicineItemSchema = {
  productId: string;
  quantity: number;
  type: PRODUCT_TYPES.MEDICINE;
};
