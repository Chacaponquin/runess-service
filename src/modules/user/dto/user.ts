import { IsNotEmpty, IsString } from "class-validator";

export interface SendUserDTO {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  favorites: Array<string>;
}

export interface SendUserOrderDTO {
  amount: number;
}

export interface RespLoginUserDTO {
  id: string;
  firstName: string;
  lastName: string;
  accessToken: string;
}

export class AddProductToFavoriteDTO {
  @IsNotEmpty()
  @IsString()
  productId: string;
}

export class DeleteProductFromFavoriteDTO {
  @IsNotEmpty()
  @IsString()
  productId: string;
}
