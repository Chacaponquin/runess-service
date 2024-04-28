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

export interface RespUserOrderProductDTO {
  name: string;
  provider: string;
  id: string;
  price: number;
  image: string;
  quantity: number;
}

export interface RespUserOrderDTO {
  id: string;
  amount: number;
  date: string;
  products: RespUserOrderProductDTO[];
  no: number;
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
