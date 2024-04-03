import { IsNotEmpty, IsString } from "class-validator";

export interface RespCurrentUserDTO {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  favorites: Array<string>;
  accessToken: string;
  refreshToken: string;
}

export interface SendUserOrderDTO {
  amount: number;
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
