import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from "class-validator";
import { FilterProductDTO, ProductFieldsDTO, RespProductDTO } from "./product";

export class CreateClotheDTO extends ProductFieldsDTO {
  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  @ArrayMinSize(1)
  sizes: Array<string>;

  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  @ArrayMinSize(1)
  colors: Array<string>;
}

export class UpdateClotheDTO extends CreateClotheDTO {}

export class FilterClotheDTO extends FilterProductDTO {
  @IsArray()
  @IsString({ each: true })
  colors: string[];

  @IsArray()
  @IsString({ each: true })
  sizes: string[];
}

export type RespClotheDTO = Omit<RespProductDTO, "type"> & {
  colors: string[];
  sizes: string[];
};

export interface ProductColorDTO {
  name: string;
  hex: string;
}
