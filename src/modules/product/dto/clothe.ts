import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  MinLength,
} from "class-validator";

export class CreateClotheDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  price: number;

  @IsNotEmpty()
  @IsString()
  provider: string;

  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  @MinLength(1)
  sizes: Array<string>;

  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  @MinLength(1)
  colors: Array<string>;

  @IsNotEmpty()
  @IsString()
  category: string;
}
