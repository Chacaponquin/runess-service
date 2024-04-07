import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from "class-validator";
import { PRODUCT_TYPES } from "../constants";

export class GetDTO {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  page: number;
}

export class GetSpecificProductsDTO {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  page: number;
}

export class ProductFieldsDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @IsNotEmpty()
  @IsString()
  provider: string;

  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  @ArrayMinSize(1)
  images: Array<string>;

  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  @ArrayMinSize(1)
  categories: Array<string>;
}

export class FilterProductDTO {
  @IsNumber()
  @Min(0)
  minPrice: number;

  @IsNumber()
  @Min(0)
  maxPrice: number;

  @IsString()
  name: string;

  @IsString()
  provider: string;

  @IsNumber()
  @Min(1)
  page: number;
}

export interface RespProductDTO {
  id: string;
  name: string;
  price: number;
  images: Array<RespProductImageDTO>;
  categories: string[];
  type: PRODUCT_TYPES;
  provider: string;
}

export interface RespProductImageDTO {
  id: string;
  size: number;
  name: string;
  source: string;
}
