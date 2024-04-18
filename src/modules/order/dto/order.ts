import { PAYMENT_TYPE } from "@modules/payment/constants";
import { PRODUCT_TYPES } from "@modules/product/constants";
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from "class-validator";

export class CreateOrderDTO {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  note: string;

  @IsArray()
  @ArrayMinSize(1)
  orders: OrderItemDTO[];

  @IsNotEmpty()
  @IsString()
  userId: string | null;

  @IsString()
  @IsNotEmpty()
  type: PAYMENT_TYPE;
}

export type OrderItemDTO =
  | {
      productId: string;
      quantity: number;
      type: PRODUCT_TYPES.CLOTHE;
      size: string;
      color: string;
    }
  | {
      productId: string;
      quantity: number;
      type: PRODUCT_TYPES.MEDICINE;
    };

export interface SaveOrderProps {
  orders: OrderItemDTO[];
  note: string;
}

export class GetDTO {
  @IsNotEmpty()
  @Min(1)
  @IsNumber()
  page: number;
}

export interface RespOrderDTO {
  amount: number;
  id: string;
}

export interface RespCreateOrderDTO {
  paymentId: string;
  clientSecret: string;
}
