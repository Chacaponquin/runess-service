import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from "class-validator";

export class CreateClotheDTO {
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
  sizes: Array<string>;

  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  @ArrayMinSize(1)
  colors: Array<string>;

  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  @ArrayMinSize(1)
  images: Array<string>;

  @IsNotEmpty()
  @IsString()
  category: string;
}
