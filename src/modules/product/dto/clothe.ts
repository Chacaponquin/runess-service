import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from "class-validator";
import { ProductFieldsDTO } from "./product";

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
